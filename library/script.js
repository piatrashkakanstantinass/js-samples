"use strict";
let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const myLibraryTable = document.querySelector(".library-table tbody");

    function deleteBook(index) {
        myLibrary.splice(index, 1);
        updateLibraryTable();
    }

    function updateLibraryTable() {
        for(let e = myLibraryTable.firstChild; e; e = myLibraryTable.firstChild) {
            myLibraryTable.removeChild(e);
        }
        myLibrary.forEach((book, index) => {
            let bookRow = document.createElement("tr");
            bookRow.setAttribute("data-index", index);

            let titleCell = document.createElement("td");
            titleCell.textContent = book.title;

            let authorCell = document.createElement("td");
            authorCell.textContent = book.author;

            let pagesCell = document.createElement("td");
            pagesCell.textContent = book.pages;

            let readCell = document.createElement("td");
            readCell.textContent = book.read ? "Yes" : "No";

            let deleteCell = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.textContent = "Delete";
            deleteCell.append(deleteButton);

            deleteButton.addEventListener("click", () => {
                let index = +bookRow.getAttribute("data-index");
                if (index >= 0 && index < myLibrary.length && Number.isInteger(index))
                    deleteBook(index);
            });

            let toggleReadCell = document.createElement("td");
            let toggleReadButton = document.createElement("button");
            toggleReadButton.textContent = "Toggle";
            toggleReadButton.setAttribute("type", "button");
            toggleReadButton.addEventListener("click", () => {
                let index = +bookRow.getAttribute("data-index");
                if (index >= 0 && index < myLibrary.length && Number.isInteger(index)) {
                    myLibrary[index].read = !myLibrary[index].read;
                    updateLibraryTable();
                }
            });
            toggleReadCell.append(toggleReadButton);

            bookRow.append(titleCell, authorCell, pagesCell, readCell, deleteCell, toggleReadCell);
            myLibraryTable.append(bookRow);
        });
    }

    function addBookToLibrary(book) {
        myLibrary.push(book);
        updateLibraryTable();
    }

    const addBookButton = document.querySelector("#submit-book");
    const newBookTitle = document.querySelector("#book-title");
    const newBookAuthor = document.querySelector("#book-author");
    const newBookPages = document.querySelector("#book-pages");
    const newBookRead = document.querySelector("#book-read");
    addBookButton.addEventListener("click", () => {
        let title = newBookTitle.value;
        let author = newBookAuthor.value;
        let pages = Number.isNaN(newBookPages.valueAsNumber) ? 0 : newBookPages.valueAsNumber.toFixed();
        let read = newBookRead.checked;
        addBookToLibrary(new Book(title, author, pages, read));
    });

    updateLibraryTable();

    addBookToLibrary(new Book("Harry Potter", "Test Author", 123, true));
    addBookToLibrary(new Book("Chronicles of Jack Smith", "Test Author 2", 234, false));
});