import React from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import useBookSearch from '../hooks/useBookSearch';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { books, loading, error, totalItems, searchFor } = useBookSearch();

  return (
    <div className="home-page">
      <h1 className="page-title">Find Your Next Book</h1>
      
      <SearchBar onSearch={searchFor} />

      {loading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">Error: {error.message}</div>}
      
      {!loading && !error && books.length > 0 && (
        <>
          <div className="results-count">
            Found {totalItems} books
          </div>
          
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card-container">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          <p>Start by searching for a book above.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage; 