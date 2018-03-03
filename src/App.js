import React from "react";
import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelfList from "./components/BookShelfList";
import SearchBook from "./components/SearchBook";
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      books: [],
      loading: true
    };
  }
  

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ 
        books: books,
        loading: false });
    });
  }


  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      this.setState(state => ({
        books: state.books.map(bvar => {
          if (bvar.title === book.title) {
            bvar.shelf = shelf;
            return bvar;
          } else {
            return bvar;
          }
        }),
        loading: false
      }))
    );
   this.componentDidMount();
  };

  render() {
    // console.log(this.state);
    const state = this.state;
    const currentlyReading = state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = state.books.filter(book => book.shelf === "wantToRead");
    const read = state.books.filter(book => book.shelf === "read");

    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <div className="list-books-title">
                <h1>The Library Project</h1>
              </div>
              {!state.loading ? (
                <BookShelfList
                  currentlyReading={currentlyReading}
                  wantToRead={wantToRead}
                  read={read}
                  onShelfChange={this.onShelfChange}
                />
              ) : (
                <div className="loader" />
              )}
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBook
              onShelfChange={this.onShelfChange}
              history={history}
              books={currentlyReading.concat(wantToRead, read)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
