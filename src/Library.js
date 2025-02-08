import { Book } from "./Book.js";
class Library {
    constructor(...initialBooks) {
        this.books = [];
        this.container = document.querySelector(".book-card-container");
        initialBooks.forEach(book=>this.addBook(book.title, book.author, book.pages, book.read))
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
        const card = createBookCard(this, book, index);
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

function createBookCard(Library, book, index) {
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
        Library.books[bookIndex].toggleReadStatus();
        event.target.textContent = Library.books[bookIndex].read;
    });
    
    removeButton.addEventListener("click", (event) => {
        Library.removeBook(event.target.dataset.index);
    });
    
    card.append(title, author, pages, statusParagraph, removeButton);
    return card;
}

export{
    Library
}