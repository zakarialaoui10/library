const myLibrary = [];
const container = document.querySelector(".book-card-container");
const dialog = document.querySelector("dialog");
const newBook = document.querySelector("#new-book");
const closeButton = document.querySelector("#close-button");
const submit = document.querySelector("#submit");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const form = document.querySelector("#form");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

myLibrary.push(
    new Book("The Hobbit", "John Ronald Reuel Tolkien", 320, "Not read yet")
)

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(
        new Book(title, author, pages, read)
    )
};


function toggleReadStatus(index, currentBtn) {
    const book = myLibrary[index];
    book.read = book.read === "Read" ? "Not read yet" : "Read";
    currentBtn.textContent = book.read;
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
        toggleReadStatus(event.target.dataset.index, event.target);
    });

    removeButton.addEventListener("click", (event) => {
        removeBook(event.target.dataset.index);
    });

    card.append(title, author, pages, statusParagraph, removeButton);
    return card;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    document.querySelector(`#card-id-${index}`).remove();

    // Update remaining card indexes
    document.querySelectorAll(".card").forEach((card, newIndex) => {
        card.id = `card-id-${newIndex}`;
        card.querySelector(".button-status").dataset.index = newIndex;
        card.querySelector(".remove-button").dataset.index = newIndex;
    });
}

function displayBookToLibrary() {
    const book = myLibrary.at(-1);
    if (!book) return;

    const card = createBookCard(book, myLibrary.length - 1);
    container.appendChild(card);
}


newBook.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

submit.addEventListener("click", () => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const readRadio = document.querySelector('input[name="option"]:checked'); 
    const read = readRadio ? readRadio.value : "Not read yet";

    if (!title || !author || isNaN(pages) || pages < 1) {
        alert("Please fill out all fields .");
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBookToLibrary();

    form.reset();
    dialog.close();
});

displayBookToLibrary();
