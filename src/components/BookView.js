import React from 'react';
import { observer } from 'mobx-react';

const shelves = [
    {'value': 'currentlyReading', 'label': 'Currently Reading' },
    {'value': 'wantToRead', 'label': 'Want to Read' },
    {'value': 'read', 'label': 'Read' },
    {'value': 'none', 'label': 'None' }
];

class BookView extends React.Component {

    componentDidMount() {
        this.props.store.fetchAllBooks();
    }

    changeShelf = (e) => {
        const book = this.props.book;
        book.shelf = e.target.value;
        this.props.onEdit();
    }

    render() {
        const book = this.props.book;
        const ownBook = this.props.store.getBook(book.id);
        let bookShelf = null;
        if(ownBook) {
            bookShelf = ownBook.shelf;
        }

        let imgStyle = {
            width: 128,
            height: 192,
            backgroundImage:  'url(' + (book.imageLinks ? book.imageLinks["thumbnail"] : '') + ')'
        };
        const selectedShelf = bookShelf ? bookShelf : 'none';
        return (
            <li key={book.id}>
                <div className="book" key={book.id}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={imgStyle}
                    />
                    <div className="book-shelf-changer">
                      <select onChange={this.changeShelf} defaultValue={selectedShelf}>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        {
                            shelves
                            .map(shelf => {
                                return <option key={shelf['value']} value={shelf['value']}>{shelf['label']}</option>;
                            })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                </div>
              </li>
        )
    }
}

BookView = observer(BookView);

export default BookView;
