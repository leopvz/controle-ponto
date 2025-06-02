// auth.js

// Inicializa a proteção de rota nas páginas protegidas
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // Redireciona se não estiver logado
    window.location.href = "login.html";
  }
});
