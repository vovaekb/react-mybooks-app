import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import BookView from './BookView';

class Index extends React.Component {
  componentDidMount() {
    this.props.store.fetchAllBooks();
  }
  render() {
    const currentlyReadingBooks = this.props.store.getCurrentlyReadingBooks;
    const wantToReadBooks = this.props.store.getWantToReadBooks;
    const readBooks = this.props.store.getReadBooks;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map(book =>
                    <BookView key={book.id} book={book} store={this.props.store} onEdit={() => this.props.store.update(book, book.shelf)} />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map(book => 
                    <BookView key={book.id} book={book} store={this.props.store} onEdit={() => this.props.store.update(book, book.shelf)} />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map(book =>
                    <BookView key={book.id} book={book} store={this.props.store} onEdit={() => this.props.store.update(book, book.shelf)} />
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => { this.props.history.push('/search') }}>Search</button>
        </div>
      </div>
    );
  }
}

Index = observer(Index);

export default withRouter(Index);