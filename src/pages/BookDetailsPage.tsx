import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/bookApi';
import { Book } from '../types/Book';
import BookViewer from '../components/BookViewer';
import './BookDetailsPage.css';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showViewer, setShowViewer] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      setShowViewer(false);
      
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

    // Reset viewer state when component unmounts or ID changes
    return () => {
      setShowViewer(false);
    };
  }, [id]);

  // Handle case when id changes
  useEffect(() => {
    if (id) {
      setShowViewer(false);
    }
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
  const canBeRead = accessInfo?.viewability === 'ALL_PAGES' || accessInfo?.viewability === 'PARTIAL';
  
  // If the book cannot be viewed, don't even attempt to show the viewer
  if (showViewer && !canBeRead) {
    setShowViewer(false);
  }

  return (
    <div className="book-details-page">
      <Link to="/" className="back-button">← Back to Search</Link>
      
      {showViewer && id ? (
        <div className="embedded-reader-container">
          <button className="close-viewer-button" onClick={() => setShowViewer(false)}>
            ← Back to Book Details
          </button>
          <BookViewer bookId={id} />
        </div>
      ) : (
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
              {canBeRead && (
                <button 
                  onClick={() => setShowViewer(true)}
                  className="read-button"
                >
                  Read in App
                </button>
              )}
              
              {readerLink && (
                <a 
                  href={readerLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-button-external"
                >
                  Read on Google Books
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
      )}
    </div>
  );
};

export default BookDetailsPage; 