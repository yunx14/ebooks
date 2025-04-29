import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/bookApi';
import { Book } from '../types/Book';
import './BookDetailsPage.css';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  const { volumeInfo, accessInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;
  const readerLink = accessInfo?.webReaderLink;

  return (
    <div className="book-details-page">
      <Link to="/" className="back-button">← Back to Search</Link>
      
      <div className="book-details-container">
        <div className="book-cover">
          {thumbnail ? (
            <img src={thumbnail} alt={volumeInfo.title} />
          ) : (
            <div className="no-cover">No Cover Available</div>
          )}
        </div>
        
        <div className="book-info">
          <h1 className="book-title">{volumeInfo.title}</h1>
          
          {volumeInfo.authors && (
            <div className="book-authors">
              By {volumeInfo.authors.join(', ')}
            </div>
          )}
          
          {volumeInfo.publishedDate && (
            <div className="book-published">
              Published: {volumeInfo.publishedDate}
            </div>
          )}
          
          {volumeInfo.publisher && (
            <div className="book-publisher">
              Publisher: {volumeInfo.publisher}
            </div>
          )}
          
          {volumeInfo.description && (
            <div className="book-description">
              <h3>Description</h3>
              <p>{volumeInfo.description}</p>
            </div>
          )}

          <div className="book-actions">
            {readerLink && (
              <a 
                href={readerLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="read-button"
              >
                Read Book
              </a>
            )}
            
            {volumeInfo.previewLink && (
              <a 
                href={volumeInfo.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="preview-button"
              >
                Preview Book
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage; 