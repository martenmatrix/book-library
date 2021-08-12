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

function displayEachBook() {
    const bookSection = document.querySelector('#books');

    myLibrary.forEach(book => {
        //create the informations box
        let currentBook = document.createElement('div');
        currentBook.id = book.title;
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
        } 
    );
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);
displayEachBook();

console.log(theHobbit.info());