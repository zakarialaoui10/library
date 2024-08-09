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
let remove;
let buttonStatus;

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

myLibrary[0] = new Book("The Hobbit", "John Ronald Reuel Tolkien", 320, "Not read yet");

function addBookToLibrary(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);
};

function toogleReadStatus(index, currentBtn) {
    if (myLibrary[index].read == "Read") {
        myLibrary[index].read = "Not read yet";
        currentBtn.textContent = myLibrary[index].read;   
    } else if (myLibrary[index].read == "Not read yet") {
        myLibrary[index].read = "Read";
        console.log(myLibrary[index].read);
        currentBtn.textContent = myLibrary[index].read;
    }
}

function displayBookToLibrary() {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `card-id-${[myLibrary.length - 1]}`);
        card.innerHTML = `<p><strong>Title:</strong> ${myLibrary[myLibrary.length - 1].title}</p>
        <p><strong>Author:</strong> ${myLibrary[myLibrary.length - 1].author}</p>
        <p><strong>Pages:</strong> ${myLibrary[myLibrary.length - 1].pages}</p>`;

        let statusParagraph = document.createElement("p");
        statusParagraph.classList.add("status-paragraph");
        statusParagraph.innerHTML = "<strong>Status:</strong>";
        card.appendChild(statusParagraph);

        buttonStatus = document.createElement("button");
        buttonStatus.classList.add("button-status");
        buttonStatus.textContent = myLibrary[myLibrary.length - 1].read;
        buttonStatus.dataset.index = myLibrary.length - 1;

        statusParagraph.appendChild(buttonStatus);

        remove = document.createElement("button");
        remove.innerText = "Remove";
        remove.classList.add("remove-button");
        remove.dataset.index = myLibrary.length - 1;
        card.appendChild(remove);

        remove.addEventListener("click", (event) => {
            const clickedButton = event.target;
            let index = clickedButton.dataset.index;
            myLibrary.splice(index, 1);

            let removedCard = document.querySelector(`#card-id-${index}`);
            removedCard.replaceChildren();
            removedCard.remove();
        });

        buttonStatus.addEventListener("click", (event) => {
            const clickedButton = event.target;
            let index = clickedButton.dataset.index;
            toogleReadStatus(index, clickedButton);
        });
        
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
    let read = "Not read yet";
    if (readRadio) {
        read = readRadio.value;
    }

    if (!title || !author || isNaN(pages) || pages < 1) {
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBookToLibrary();

    form.reset();
    dialog.close();
});

displayBookToLibrary();
