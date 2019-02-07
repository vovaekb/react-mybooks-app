import { observable, action, decorate, computed } from 'mobx';
import * as BooksAPI from './BooksAPI';

class BooksStore {
    books = [];
    book = {};
    searchBooks = [];
    loading = false;
    noResults = true;
    query = null;

    setFilter(val) {
        this.query = val;
    }

    fetchAllBooks() {
        BooksAPI.getAll().then(data => { this.books = data });
    }

    fetch(id) {
        BooksAPI.get(id).then(response => { this.book = response; });
    }

    update(book, shelf) {
        BooksAPI.update(book, shelf).then(response => response);
    }

    fetchSearchResults = async() => {
        if(!this.query) {
            this.noResults = true;
            return;
        }

        this.startAsync();
        await BooksAPI.search(this.query).then(data => {
            if (data['error']) {
                this.loading = false;
                this.noResults = true;
            }
            else 
            {
                this.searchBooks = data;
                this.loading = false;
                this.noResults = !this.searchBooks.length;
            }
        });
    }

    startAsync() {
        this.loading = true;
        this.errors = {};
    }

    get getBook() {
        return (id) => { return this.books.filter(book => book.id === id)[0]; }
    }

    get getCurrentlyReadingBooks() {
        return this.books.filter(book => book.shelf === 'currentlyReading');
    }

    get getWantToReadBooks() {
        return this.books.filter(book => book.shelf === 'wantToRead');
    }

    get getReadBooks() {
        return this.books.filter(book => book.shelf === 'read');
    }

}

decorate(BooksStore, {
    books: observable,
    loading: observable,
    noResults: observable,
    fetchAllBooks: action,
    fetch: action,
    fetchSearchResults: action,
    update: action,
    getCurrentlyReadingBooks: computed,
    getWantToReadBooks: computed,
    getReadBooks: computed,
    getBook: computed
})

export default BooksStore;