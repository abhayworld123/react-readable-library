import React, {Component} from 'react';

export default class Book extends Component {
    onBookShelfChange = (e) => {
        const shelf = e.target.value;
        this.props.onShelfChange(this.props.book, shelf);
    };

    render() {
        const {book} = this.props;
        if (!book.imageLinks){
            book.imageLinks={};
                }
        if(!book.authors){
            book.authors=[];
        }

         var fallback='http://www.janklowandnesbit.co.uk/sites/default/files/imagecache/large/imagefield_default_images/default_book_cover.jpg';    

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 190,
                        background: 'url("'+book.imageLinks.thumbnail+'"), url("'+fallback+'")'

                       
                    }}/>
                    
                    <div className="book-shelf-changer">
                        <select onChange={this.onBookShelfChange}  defaultValue='none'>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>);
    }
}
