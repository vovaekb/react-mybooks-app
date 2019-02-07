import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import BookView from './BookView';

class Search extends Component {

  componentDidMount() {
    this.props.store.noResults = true;
  }

  searchBooks = (e) => {
    const query = e.target.value;
    this.props.store.setFilter(query);
    this.props.store.fetchSearchResults();
  }
    render() {
      const { searchBooks, loading, noResults } = this.props.store;

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => this.props.history.push('/')}>
              Close
              </button>
            <div className="search-books-input-wrapper">
              {
                /*NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms in SEARCH_TERMS.MD

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.*/
              }
              <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
            </div>
          </div>
          <div className="search-books-results">
            {loading
              ? (<h2>Loading</h2>)
              : (noResults
                ? (<h2>No results</h2>)
                : (<ol className="books-grid">
                  {searchBooks.map(book =>
                    <BookView key={book.id} book={book} store={this.props.store} onEdit={() => this.props.store.update(book, book.shelf)} />
                  )}
                </ol>)
              )}
          </div>
        </div>
      );
    }
}

Search = observer(Search);

export default withRouter(Search);