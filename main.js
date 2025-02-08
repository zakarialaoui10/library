import { Library } from "./src/Library.js";
import { Book } from "./src/Book.js";
const myLibrary = new Library(
    new Book("The Hobbit", "John Ronald Reuel Tolkien", 320, "Not read yet"),
);

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
// myLibrary.addBook("The Hobbit", "John Ronald Reuel Tolkien", 320, "Not read yet");
