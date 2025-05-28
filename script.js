// Este arquivo contém toda a lógica do sistema de ponto da Papelprint
// Inclui login, validação por localização, captura de selfie, registro, painel admin, filtro e exportação

// Usuários pré-cadastrados
const users = {
  'emerson': { password: '123456', fullName: 'Emerson Caldeira', isAdmin: false },
  'flavio': { password: '123456', fullName: 'Flávio Furtado', isAdmin: false },
  'elias': { password: '123456', fullName: 'Elias Almo', isAdmin: false },
  'admin': { password: 'adm@papel12', fullName: 'Administrador', isAdmin: true }
};

const LATITUDE = -23.477944;
const LONGITUDE = -46.651000;
const RAIO_METROS = 50;
let currentUser = null;
let punchRecords = JSON.parse(localStorage.getItem('punchRecords') || '[]');

// Elementos principais
const loginPage = document.getElementById('login-page');
const employeePage = document.getElementById('employee-page');
const adminPage = document.getElementById('admin-page');

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

const welcomeMessage = document.getElementById('welcome-message');
const currentDatetime = document.getElementById('current-datetime');
const punchBtn = document.getElementById('punch-btn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const cancelCamera = document.getElementById('cancel-camera');
const cameraSection = document.getElementById('camera-section');
const ticketSection = document.getElementById('ticket-section');
const ticketName = document.getElementById('ticket-name');
const ticketDate = document.getElementById('ticket-date');
const ticketTime = document.getElementById('ticket-time');
const ticketPhoto = document.getElementById('ticket-photo');
const locationStatus = document.getElementById('location-status');
const newPunchBtn = document.getElementById('new-punch-btn');
const logoutBtn = document.getElementById('logout-btn');

const adminLogoutBtn = document.getElementById('admin-logout-btn');
const employeeFilter = document.getElementById('employee-filter');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const applyFilters = document.getElementById('apply-filters');
const exportCsv = document.getElementById('export-csv');
const punchRecordsTable = document.getElementById('punch-records');

// Utilitários
function showPage(page) {
  loginPage.classList.add('oculto');
  employeePage.classList.add('oculto');
  adminPage.classList.add('oculto');
  page.classList.remove('oculto');
}

function updateClock() {
  setInterval(() => {
    const now = new Date();
    currentDatetime.textContent = now.toLocaleString('pt-BR');
  }, 1000);
}

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.toLowerCase();
  const password = passwordInput.value;

  if (users[username] && users[username].password === password) {
    currentUser = users[username];
    currentUser.username = username;
    loginError.classList.add('oculto');
    loginForm.reset();

    if (currentUser.isAdmin) {
      showPage(adminPage);
      renderTable(punchRecords);
    } else {
      showPage(employeePage);
      welcomeMessage.textContent = `Bem-vindo, ${currentUser.fullName}`;
      updateClock();
    }
  } else {
    loginError.classList.remove('oculto');
  }
});

// Logout
if (logoutBtn) logoutBtn.onclick = () => showPage(loginPage);
if (adminLogoutBtn) adminLogoutBtn.onclick = () => showPage(loginPage);

// Funcionário: Bater ponto
if (punchBtn) punchBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const d = distance(pos.coords.latitude, pos.coords.longitude, LATITUDE, LONGITUDE);
    const locationValid = d <= RAIO_METROS;
    startCamera(locationValid);
  }, () => alert('Permita o acesso à localização'));
};

function startCamera(locationValid) {
  cameraSection.classList.remove('oculto');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      captureBtn.onclick = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imgData = canvas.toDataURL();
        const now = new Date();

        const registro = {
          id: Date.now(),
          name: currentUser.fullName,
          date: now,
          photo: imgData,
          isLocationValid: locationValid
        };

        punchRecords.push(registro);
        localStorage.setItem('punchRecords', JSON.stringify(punchRecords));

        ticketName.textContent = `Nome: ${registro.name}`;
        ticketDate.textContent = `Data: ${now.toLocaleDateString('pt-BR')}`;
        ticketTime.textContent = `Hora: ${now.toLocaleTimeString('pt-BR')}`;
        ticketPhoto.src = imgData;
        locationStatus.textContent = locationValid ? 'Localização verificada ✓' : 'Localização fora do raio ✗';

        cameraSection.classList.add('oculto');
        ticketSection.classList.remove('oculto');

        video.srcObject.getTracks().forEach(track => track.stop());
      };
    });
}

if (cancelCamera) cancelCamera.onclick = () => {
  cameraSection.classList.add('oculto');
  video.srcObject.getTracks().forEach(track => track.stop());
};

if (newPunchBtn) newPunchBtn.onclick = () => {
  ticketSection.classList.add('oculto');
};

// Admin
function renderTable(data) {
  punchRecordsTable.innerHTML = '';
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  for (let r of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${new Date(r.date).toLocaleDateString('pt-BR')}</td>
      <td>${new Date(r.date).toLocaleTimeString('pt-BR')}</td>
      <td><img src="${r.photo}" class="thumbnail"></td>
      <td>${r.isLocationValid ? 'Válida ✓' : 'Inválida ✗'}</td>
      <td><button onclick="deletar(${r.id})">Excluir</button></td>
    `;
    punchRecordsTable.appendChild(tr);
  }
}

function deletar(id) {
  if (confirm('Excluir registro?')) {
    punchRecords = punchRecords.filter(r => r.id !== id);
    localStorage.setItem('punchRecords', JSON.stringify(punchRecords));
    renderTable(punchRecords);
  }
}

if (applyFilters) applyFilters.onclick = () => {
  const filtro = punchRecords.filter(r => {
    const data = new Date(r.date);
    const afterStart = !startDate.value || data >= new Date(startDate.value);
    const beforeEnd = !endDate.value || data <= new Date(endDate.value + 'T23:59:59');
    const matchName = !employeeFilter.value || r.name === employeeFilter.value;
    return afterStart && beforeEnd && matchName;
  });
  renderTable(filtro);
};

if (exportCsv) exportCsv.onclick = () => {
  let csv = 'Nome,Data,Hora,Localização\n';
  punchRecords.forEach(r => {
    const linha = `${r.name},${new Date(r.date).toLocaleDateString('pt-BR')},${new Date(r.date).toLocaleTimeString('pt-BR')},${r.isLocationValid ? 'Sim' : 'Não'}`;
    csv += linha + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'registros_ponto.csv';
  link.click();
};
