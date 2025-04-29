import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { id, volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png';
  
  return (
    <Link to={`/book/${id}`} className="book-card">
      <div className="book-card-image">
        <img src={thumbnail} alt={volumeInfo.title} />
      </div>
      <div className="book-card-content">
        <h3 className="book-title">{volumeInfo.title}</h3>
        {volumeInfo.authors && (
          <p className="book-authors">{volumeInfo.authors.join(', ')}</p>
        )}
        {volumeInfo.publishedDate && (
          <p className="book-year">{volumeInfo.publishedDate.split('-')[0]}</p>
        )}
      </div>
    </Link>
  );
};

export default BookCard; 