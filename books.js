
let books = [];

function verifySession () {
    let table = document.getElementById("table");
    let list = sessionStorage.getItem("books");
    if (list === null || list === "[]") {
        table.style.visibility = "hidden";
    } else {
        table.style.visibility = "visible";
    }
}

function addBook() {
    books = JSON.parse(sessionStorage.getItem("books")) || [];
    let newBook = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        price: document.getElementById("price").value,
        publishDate: document.getElementById("publishDate").value,
        description: document.getElementById("description").value
    };
    if (newBook.title == "" || newBook.author == "" || newBook.genre == "" || newBook.price == ""
    || newBook.publishDate == "" || newBook.description == "") {
        alert ("You should enter the details");
        return;
    }
    books.push(newBook);
    saveData();
    showBookList(books);
}

function saveData () {
    sessionStorage.setItem("books", JSON.stringify(books));
}

function deleteBook (index) {
    books.splice(index, 1);
    saveData();
}

function editBook(index) {
    // get book details from the selected row
    const row = document.querySelectorAll('tr')[index+1]; // add 1 to index to account for the header row
    const title = row.querySelectorAll('td')[0].innerText;
    const author = row.querySelectorAll('td')[1].innerText;
    const genre = row.querySelectorAll('td')[2].innerText;
    const price = row.querySelectorAll('td')[3].innerText;
    const publishDate = row.querySelectorAll('td')[4].innerText;
    const description = row.querySelectorAll('td')[5].innerText;
    
    // hide the "Add Book" button
    document.getElementById("addButton").style.visibility = "hidden";

    // fill the input fields with the current data
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("genre").value = genre;
    document.getElementById("price").value = price;
    document.getElementById("publishDate").value = publishDate;
    document.getElementById("description").value = description;
    

    // add a "Save" button to allow the user to update the book details
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("save-button", "btn", "btn-outline-success");
    row.querySelectorAll('td')[6].innerHTML = ""; // clear the "Operations" cell
    row.querySelectorAll('td')[6].appendChild(saveButton);
  
    // add an event listener to the "Save" button
    saveButton.addEventListener('click', () => {
      // update the book details in the books array and in the UI
      const updatedBook = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        price: document.getElementById("price").value,
        publishDate: document.getElementById("publishDate").value,
        description: document.getElementById("description").value
      };
      if (updatedBook.title == "" || updatedBook.author == "" || updatedBook.genre == "" || updatedBook.price == ""
          || updatedBook.publishDate == "" || updatedBook.description == "") {
        alert ("You should enter the details");
        return;
      }
      books[index] = updatedBook;
      saveData();
      document.getElementById("addButton").style.visibility = "visible";
      showBookList(books);
    //   END of event listener for "Save" button
    });

    // add a "Cancel" button to allow the user to cancel editing
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("cancel-button", "btn", "btn-outline-secondary");
    // insert "Cancel" button before "Save" button
    row.querySelectorAll('td')[6].insertBefore(cancelButton, row.querySelectorAll('td')[6].querySelector(".save-button"));

    // add an event listener to the "Cancel" button
    cancelButton.addEventListener('click', () => {
        showBookList(books);
        document.getElementById("addButton").style.visibility = "visible";
    });
}


// function to show a book
function showBook (book, index) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", `row-${index}`);
    // create new table cells
    const title = document.createElement("td");
    const author = document.createElement("td");
    const genre = document.createElement("td");
    const price = document.createElement("td");
    const publishDate = document.createElement("td");
    const description = document.createElement("td");
    const operations = document.createElement("td");
    // every cell will contain the inputs' values
    title.innerText =  book.title;
    author.innerText = book.author;
    genre.innerText = book.genre;
    price.innerText = book.price;
    publishDate.innerText = book.publishDate;
    description.innerText = book.description;
    // create buttons inside the table
    const editItem = document.createElement("button");
    const deleteItem = document.createElement("button");
    editItem.innerText = "Edit";
    deleteItem.innerText = "Delete";
    // add classes to buttons
    editItem.classList.add("edit-button", "btn", "btn-outline-success");
    deleteItem.classList.add("delete-button", "btn", "btn-outline-danger");
    // append both buttons into the last cell from row
    operations.appendChild(editItem);
    operations.appendChild(deleteItem);

    // making the buttons functional
    editItem.addEventListener('click', () => {
        editBook(index);
    });
    deleteItem.addEventListener('click', () => {
        deleteBook(index);
        showBookList(books);
    });

    // append all elements into a table row
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(genre);
    tr.appendChild(price);
    tr.appendChild(publishDate);
    tr.appendChild(description);
    tr.appendChild(operations);
    const tableBody = document.getElementById("table-body");
    // append table row into table body
    tableBody.appendChild(tr);
    // after reading the inputs' values, delete it from UI
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("price").value = "";
    document.getElementById("publishDate").value = "";
    document.getElementById("description").value = "";
}

// use for-loop to call showBook() function on every book
function showBookList (books) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML="";
    for (let i = 0; i < books.length; i++) {
        showBook(books[i], i);
    }
    verifySession();
}

function getStoredBooks () {
    books = JSON.parse(sessionStorage.getItem("books")) || [];
}
getStoredBooks();

showBookList(books);

