import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import Logo from './icons/logo.svg'

class BooksApp extends Component {
  state = {
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books: books }));
  }

  changeShelf = (bookID, event) => {
    BooksAPI.update(bookID, event.target.value).then(()=> {
      BooksAPI.getAll().then((books) => this.setState({ books: books }))

    })
  }

  render() {
    let currentlyReading = this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})
    let wantToRead = this.state.books.filter((book) => {return book.shelf === 'wantToRead'})
    let read = this.state.books.filter((book) => {return book.shelf === 'read'})
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <img src={Logo} height="60" alt="owl"/>
              <h1>OWLReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  books={currentlyReading}
                  shelfName="Currently Reading"
                  changeShelf={this.changeShelf.bind(this)}/>
                <ListBooks
                  books={wantToRead}
                  shelfName="Want to Read"
                  changeShelf={this.changeShelf.bind(this)}/>
                <ListBooks
                  books={read}
                  shelfName="Read"
                  changeShelf={this.changeShelf.bind(this)}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/search" render={() => (
          <Search
            books ={this.state.books}
            changeShelf={this.changeShelf.bind(this)} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
