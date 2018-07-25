import React, { Component } from 'react'
import noCover from './icons/no-cover.png'
import readingCover from './icons/reading.png'
import interestedCover from './icons/interested.png'
import readCover from './icons/read.png'
import addMeCover from './icons/add.png'


class Book extends Component {
  state = {
    bookShelfLabel: readingCover
  }

  componentWillMount() {
    let bookShelfLabel = this.props.book.shelf === 'currentlyReading' ? readingCover : (this.props.book.shelf === 'wantToRead' ? interestedCover : (this.props.book.shelf === 'read' ? readCover : addMeCover))
    this.setState( {bookShelfLabel: bookShelfLabel} )
  }

  render () {
    let bookCover = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail ? this.props.book.imageLinks.thumbnail : noCover
    let bookTitle = this.props.book.title ? this.props.book.title : ''

    return(
      <li key={this.props.book.id}>
        <div className="book">
          <img className="shelf-label" src={this.state.bookShelfLabel} alt="shelf label"/>
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage: `url(${bookCover})` }}></div>
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf}
                onChange={(event) => {this.props.changeShelf(this.props.book, event)}}
                >
                <option value="move" disabled>Move to...</option>
                <option value="none">None</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookTitle}</div>
          {this.props.book.authors && this.props.book.authors.map((author, index) => (
            <div
              className="book-authors"
              key={index}>
                {author}
            </div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book
