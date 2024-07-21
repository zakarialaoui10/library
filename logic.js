const myLibrary = [];
const container = document.querySelector(".book-card-container");
const dialog = document.querySelector("dialog");
const newBook = document.querySelector("#new-book");
const closeButton = document.querySelector("#close-button");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (this.read == true) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    };
}

myLibrary[0] = new Book("The Hobbit", "John Ronald Reuel Tolkien", 320, false);

function addBookToLibrary(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);
};

function displayBookToLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<p><strong>Title:</strong> ${myLibrary[i].title}</p>
        <p><strong>Author:</strong> ${myLibrary[i].author}</p>
        <p><strong>Pages:</strong> ${myLibrary[i].pages}</p>
        <p><strong>Read:</strong> ${myLibrary[i].read}</p>`;
        container.appendChild(card);
    }
}

newBook.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
})

displayBookToLibrary();
