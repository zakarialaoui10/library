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
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);
};


function toggleReadStatus(index, currentBtn) {
    const book = myLibrary[index];
    book.read = book.read === "Read" ? "Not read yet" : "Read";
    currentBtn.textContent = book.read;
}


function displayBookToLibrary() {
        let remove;
        let buttonStatus;
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `card-id-${[myLibrary.length - 1]}`);
        card.innerHTML = `<p><strong>Title:</strong> ${myLibrary.at(-1).title}</p>
        <p><strong>Author:</strong> ${myLibrary.at(-1).author}</p>
        <p><strong>Pages:</strong> ${myLibrary.at(-1).pages}</p>`;

        let statusParagraph = document.createElement("p");
        statusParagraph.classList.add("status-paragraph");
        statusParagraph.innerHTML = "<strong>Status:</strong>";
        card.appendChild(statusParagraph);

        buttonStatus = document.createElement("button");
        buttonStatus.classList.add("button-status");
        buttonStatus.textContent = myLibrary.at(-1).read;
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
            console.log(myLibrary);

            let removedCard = document.querySelector(`#card-id-${index}`);
            removedCard.replaceChildren();
            removedCard.remove();

            const cards = document.querySelectorAll('.card');
            cards.forEach((card, newIndex) => {
                card.id = `card-id-${newIndex}`;
                card.querySelector('.button-status').dataset.index = newIndex;
                card.querySelector('.remove-button').dataset.index = newIndex;
            });
        });

        buttonStatus.addEventListener("click", (event) => {
            const clickedButton = event.target;
            let index = clickedButton.dataset.index;
            toggleReadStatus(index, clickedButton);
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
        alert("Please fill out all fields correctly.");
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBookToLibrary();

    form.reset();
    dialog.close();
});

displayBookToLibrary();
