import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import InfoSearch from './InfoSearch'

class Search extends Component {
  state = {
    query: '',
    newBooks: [],
    isOpen: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (books.length > 0){
          books.map(book => (this.props.books.filter((item) => item.id === book.id).map((item) => book.shelf = item.shelf)))

          this.setState({newBooks: books })

        } else {
          this.setState({newBooks: []})
        }
      })
    } else this.setState({newBooks: []})
  }

  toggleSearch = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
            <button className="info-search" onClick={this.toggleSearch}></button>
            <InfoSearch
              show={this.state.isOpen}
              onClose={this.toggleSearch}>
                Ooops, the serach is limited to the following terms:
                'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
            </InfoSearch>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.newBooks.map((book) => (
                <Book
                  book={ book }
                  key={ book.id }
                  changeShelf={this.props.changeShelf}
                />
              ))}
            </ol>
          </div>
      </div>
    )
  }
}

export default Search
