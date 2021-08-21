
const modal = document.querySelector('#book-input-modal');
const modalForm = document.querySelector('#book-input-modal form')
const bookSection = document.querySelector('#added-books');


let currentTime;
let myLibrary = [];

function updateCookies() {
    let myLibraryJSON = JSON.stringify(myLibrary);
    localStorage.setItem('booklist', myLibraryJSON);
};

//if array available sets it to the above created empty array
function checkCookies() {
    if (localStorage.getItem('booklist')) {
        myLibraryJSON = localStorage.getItem('booklist');
        myLibraryObjects = JSON.parse(myLibraryJSON);
        myLibraryObjects.forEach(book => {
            let currentBook = new Book(book.title, book.author, book.amountPages, book.isRead);
            addBookToLibrary(currentBook);
        });
    };
};

class Book {
    constructor(title, author, amountPages, isRead) {
        this.title = title;
        this.author = author;
        this.amountPages = amountPages;
        this.isRead = isRead;
    };

    get info()  {
        return `${this.title} by ${this.author}, ${this.amountPages} pages, ${this.isRead ? 'read' : 'not read yet'}`;
    };
};

function addBookToLibrary(object) {
    myLibrary.push(object);
};

function removeBookFromLibrary(object) {
    const indexOfObject = myLibrary.indexOf(object);
    myLibrary.splice(indexOfObject, 1);
};

function getObjectFromTitle(bookTitle) {
    const object = myLibrary.find(currentBook => currentBook.title === bookTitle);
    return object;
};

function resetDispay() {
    const allBooksDivs = document.querySelectorAll('#books #added-books .book');
    allBooksDivs.forEach(bookDiv => bookDiv.remove());
};

Book.prototype.toggleRead = function() {
    if (this.isRead === true) {
        this.isRead = false;
    } else {
        this.isRead = true;
    };
};

function displayEachBook() {

    myLibrary.forEach(book => {
        //create the informations box
        let currentBook = document.createElement('div');
        currentBook.setAttribute('data-title', book.title);
        currentBook.classList.add('book');

        //add read class, if book was read
        if (book.isRead) currentBook.classList.add('read');

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

//stops the timer and deletes the element, if div was pressed for 2.8 seconds
//if timer is less than 1 second, counts the book as read
function stopTimer(e) {
    currentTimer = Date.now() - currentTimer;

    let object = getObjectFromTitle(e.target.dataset.title);
    if (currentTimer >= 2700) {
        e.target.remove();
        removeBookFromLibrary(object);
        updateCookies();
    } else if (currentTimer <= 1000) {
        object.toggleRead();
        refreshDisplay();
        updateCookies();
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
    updateCookies();
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
checkCookies();
displayEachBook();