class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = this.read === "Read" ? "Not read yet" : "Read";
    }
}

class Library {
    constructor() {
        this.books = [];
        this.container = document.querySelector(".book-card-container");
    }

    addBook(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.books.push(book);
        this.displayBook(book, this.books.length - 1);
    }

    removeBook(index) {
        this.books.splice(index, 1);
        document.querySelector(`#card-id-${index}`).remove();
        document.querySelectorAll(".card").forEach((card, newIndex) => {
            card.id = `card-id-${newIndex}`;
            card.querySelector(".button-status").dataset.index = newIndex;
            card.querySelector(".remove-button").dataset.index = newIndex;
        });
    }

    displayBook(book, index) {
        const card = createBookCard(book, index);
        this.container.appendChild(card);
    }
}

function createElement(tag, className = "", textContent = "", attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (textContent) element.textContent = textContent;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
}

function createBookCard(book, index) {
    const card = createElement("div", "card", "", { id: `card-id-${index}` });
    
    const title = createElement("p", "", `Title: ${book.title}`);
    const author = createElement("p", "", `Author: ${book.author}`);
    const pages = createElement("p", "", `Pages: ${book.pages}`);
    
    const statusParagraph = createElement("p", "status-paragraph", "Status: ");
    const buttonStatus = createElement("button", "button-status", book.read, { "data-index": index });
    statusParagraph.appendChild(buttonStatus);
    
    const removeButton = createElement("button", "remove-button", "Remove", { "data-index": index });
    
    buttonStatus.addEventListener("click", (event) => {
        const bookIndex = event.target.dataset.index;
        myLibrary.books[bookIndex].toggleReadStatus();
        event.target.textContent = myLibrary.books[bookIndex].read;
    });
    
    removeButton.addEventListener("click", (event) => {
        myLibrary.removeBook(event.target.dataset.index);
    });
    
    card.append(title, author, pages, statusParagraph, removeButton);
    return card;
}

const myLibrary = new Library();

const dialog = document.querySelector("dialog");
const newBook = document.querySelector("#new-book");
const closeButton = document.querySelector("#close-button");
const submit = document.querySelector("#submit");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const form = document.querySelector("#form");

newBook.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

submit.addEventListener("click", () => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const readRadio = document.querySelector('input[name="option"]:checked');
    const read = readRadio ? readRadio.value : "Not read yet";
    
    if (!title || !author || isNaN(pages) || pages < 1) {
        alert("Please fill out all fields.");
        return;
    }
    
    myLibrary.addBook(title, author, pages, read);
    form.reset();
    dialog.close();
});

// Add initial book
myLibrary.addBook("The Hobbit", "John Ronald Reuel Tolkien", 320, "Not read yet");
