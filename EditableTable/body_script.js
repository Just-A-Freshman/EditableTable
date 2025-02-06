function addRow() {
    let table = document.getElementById("mainTable");
    let row = table.insertRow(-1);
    let columns_count = table.rows[0].cells.length;
    for (let i = 0; i < columns_count - 1; i++) {
        cell = row.insertCell(i);
        cell.innerText = '-';
        cell.title = cell.innerText;
        cell.addEventListener("dblclick", modifyRow);
    }
    cell = row.insertCell(columns_count - 1);
    cell.innerHTML = "<button class='edit' onclick='deleteRow(this)'}>Delete</button>";
}

function deleteRow(button) {
    let request = window.confirm("Are you sure you want to delete this row?");
    if (request) {
        let row = button.parentNode.parentNode;
        row.remove();
    }
}

function modifyRow(event) {
    const input = document.createElement('input');
    const editable = event.target;
    input.type = 'text';
    input.value = editable.innerText;
    editable.innerText = '';
    editable.appendChild(input);
    input.addEventListener('blur', function () {
        editable.innerText = input.value;
        editable.title = input.value;
    });
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
    input.focus();
}

function selectRow() {
    let searchInput = document.getElementById("search");
    let searchColumn = document.getElementById("columns").value;
    let columnIndex = getColumnIndex(searchColumn);
    let table = document.getElementById("mainTable");
    let rows = table.getElementsByTagName("tr");
    let highlightedRow = document.getElementById("highlighted");
    if (highlightedRow) {
        highlightedRow.id = '';
        highlightedRow.style.backgroundColor = '';
    }
    let last_found_index = highlightedRow ? highlightedRow.rowIndex : 0;
    last_found_index = last_found_index === rows.length - 1 ? 0 : last_found_index;

    for (let i = last_found_index + 1; i < rows.length; i++) {
        colCell = rows[i].querySelectorAll('td')[columnIndex];
        console.log(colCell);
        if (colCell.innerText.includes(searchInput.value)) {
            let row = colCell.parentNode;
            row.style.backgroundColor = '#F2C09B';
            row.id = 'highlighted';
            row.scrollIntoView({ behavior:'smooth', block: 'center' });
            return;
        }
    }
    if (last_found_index === 0) {
        window.alert("Not found!");
    }
}

function getColumnIndex(columnName) {
    const table = document.getElementById("mainTable");
    const headers = table.querySelectorAll("th");
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].textContent.trim() === columnName) {
            return i;
        }
    }
    throw new Error(`col "${columnName}" not found`);
}


function add_command() {
    document.getElementById("add").addEventListener("click", addRow)
    document.addEventListener('DOMContentLoaded', function () {
        const clearButton = document.getElementById('close-btn');
        const searchInput = document.getElementById('search');
        clearButton.addEventListener('click', function () {
            console.log(searchInput.value);
            searchInput.value = '';
        });
    });
    document.getElementById('selectForm').addEventListener('submit', function (event) {
        event.preventDefault();
        selectRow();
    });
}


add_command()

