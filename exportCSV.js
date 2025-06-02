// exportCSV.js

function exportTableToCSV(tableId, filename = '') {
  const table = document.getElementById(tableId);
  if (!table) return alert("Tabela não encontrada!");

  let csv = [];
  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {
    let cols = row.querySelectorAll('td, th');
    let rowData = [];
    cols.forEach(col => rowData.push('"' + col.innerText.replace(/"/g, '""') + '"'));
    csv.push(rowData.join(','));
  });

  // Cria e baixa o arquivo
  let csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
  let downloadLink = document.createElement("a");
  downloadLink.download = filename || "export.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
