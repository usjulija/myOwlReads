import React, { Component } from 'react'
import Book from './Book'

function ListBooks(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <Book
              books={props.books}
              book={book}
              key={book.id}
              changeShelf={props.changeShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ListBooks
