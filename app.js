class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
}

    static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
    `;

    list.appendChild(row);
}

    static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('main');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

    static clearFields() {
        document.querySelector('#book-title').value = '';
        document.querySelector('#book-author').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;

    if(title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
    } else {
    const book = new Book(title, author);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Added', 'success');
    UI.clearFields();
    }
});


