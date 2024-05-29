document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('opinionForm');
  const clearButton = document.getElementById('clearTable');

  const initialData = [

    {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },
      {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },
      {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },
      {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },
      {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },
      {
        imie: 'Jan', 
        nazwisko: 'Kowalski',
        opinie: 'Bardzo interesujące zajęcia.',
        Ocena_pomocna: 'Wysoka',
        Ocena_prow: 'Doskonała',
        Data_opinii: '2023-01-15',
        Data_Zajec: '2023-01-10'
      },

  ];

  let tableData = loadTableData();

form.addEventListener('submit', function(event) {

    event.preventDefault();

    const newOpinion = {

        imie: document.getElementById('imie').value,
        nazwisko: document.getElementById('nazwisko').value,
        opinie: document.getElementById('opinie').value,
        Ocena_pomocna: document.getElementById('Ocena_pomocna').value,
        Ocena_prow: document.getElementById('Ocena_prow').value,
        Data_opinii: document.getElementById('Data_opinii').value,
        Data_Zajec: document.getElementById('Data_Zajec').value

};

    tableData.push(newOpinion);
    localStorage.setItem('opinions', JSON.stringify(tableData.slice(initialData.length)));

    refreshTable();
    form.reset();

});

clearButton.addEventListener('click', function() {

    localStorage.removeItem('opinions');
    tableData = loadTableData(); 
    refreshTable();

});

function loadTableData() {

    const storedData = JSON.parse(localStorage.getItem('opinions')) || [];
    return [...initialData, ...storedData];

}

function refreshTable() {
    const tableBody = document.getElementById('Tabela_opini').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    insertDataIntoTable(tableData);
}

function insertDataIntoTable(data) {

    const tableBody = document.getElementById('Tabela_opini').getElementsByTagName('tbody')[0];

    data.forEach(rowData => {
      const newRow = document.createElement('tr');
      Object.values(rowData).forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        newRow.appendChild(cell);
      });
      tableBody.appendChild(newRow);
    });

  }

  refreshTable();
  
});