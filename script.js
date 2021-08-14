
const modal = document.querySelector('#book-input-modal');
const modalForm = document.querySelector('#book-input-modal form')
const bookSection = document.querySelector('#added-books');


let currentTimer;
let myLibrary = [];

function Book(title, author, amountPages, isRead) {
    this.title = title;
    this.author = author;
    this.amountPages = amountPages;
    this.isRead = isRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.amountPages} pages, ${this.isRead ? 'read' : 'not read yet'}`;
    };
};

function addBookToLibrary(object) {
    myLibrary.push(object);
};

function removeBookFromLibrary(bookTitle) {
    const objectToRemove = myLibrary.find(currentBook => currentBook.title === bookTitle);

    // returns if title is not found in one of the objects of myLibrary
    if (objectToRemove === undefined) return;
    const indexOfObject = myLibrary.indexOf(objectToRemove);

    myLibrary.splice(indexOfObject, 1);
};

function resetDispay() {
    const allBooksDivs = document.querySelectorAll('#books #added-books .book');
    allBooksDivs.forEach(bookDiv => bookDiv.remove());
};

function displayEachBook() {

    myLibrary.forEach(book => {
        //create the informations box
        let currentBook = document.createElement('div');
        currentBook.setAttribute('data-title', book.title);
        currentBook.classList.add('book');

        //create the elements for the information box
        let currentTitle = document.createElement('p');
        currentTitle.classList.add('book-title');
        currentTitle.textContent = book.title;

        let horizontalRule = document.createElement('hr');

        let currentAuthor = document.createElement('p');
        currentAuthor.classList.add('book-author');
        currentAuthor.textContent = `by ${book.author}`

        let currentPages = document.createElement('p');
        currentPages.classList.add('book-pages');
        currentPages.textContent = `${book.amountPages} pages`;

        //add the elements to the page
        bookSection.appendChild(currentBook);

        currentBook.appendChild(currentTitle);
        currentBook.appendChild(currentTitle);
        currentBook.appendChild(horizontalRule);
        currentBook.appendChild(currentAuthor);
        currentBook.appendChild(currentPages);

        //add event listener for deletion
        currentBook.addEventListener('mousedown', startTimer);
        currentBook.addEventListener('mouseup', stopTimer);
        } 
    );
};

function startTimer(e) {
    currentTimer = Date.now();
};

//stops the timer and deletes the element, if div was pressed for 5 seconds
function stopTimer(e) {
    currentTimer = Date.now() - currentTimer;

    if (currentTimer > 3000) {
        e.target.remove();
        removeBookFromLibrary(e.target.dataset.title);
    };
};


function refreshDisplay() {
    resetDispay();
    displayEachBook();
};

function closeModal() {
    modal.style.display = 'none';
};

function showModal() {
    modal.style.display = 'block';
};

function getBookFromInput() {
    const titleInput = document.querySelector('#input-book-title').value;
    const authorInput = document.querySelector('#input-book-author').value;
    const pagesInput = document.querySelector('#input-book-pages').value;
    const isReadInput = document.querySelector('#read').checked;

    return new Book(titleInput, authorInput, pagesInput, isReadInput);
};

function submitBookForm(e) {
    e.preventDefault();
    let newBook = getBookFromInput();
    addBookToLibrary(newBook);

    closeModal();
    refreshDisplay();
};

function addEventListeners() {
    const bookForm = document.querySelector('.book-input');
    bookForm.addEventListener('submit', submitBookForm);

    const closeModalButton = document.querySelector('#close-button');
    closeModalButton.addEventListener('click', () => closeModal());

    const showModalDiv = document.querySelector('#add-book');
    showModalDiv.addEventListener('click', () => showModal());
};

addEventListeners();
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);
displayEachBook();