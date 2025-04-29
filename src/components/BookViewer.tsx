import React, { useEffect, useRef, useState } from 'react';
import './BookViewer.css';

interface BookViewerProps {
  bookId: string;
}

declare global {
  interface Window {
    google?: {
      books?: {
        load: (callback: () => void) => void;
        Viewer: new (element: HTMLElement) => {
          load: (bookId: string) => void;
        };
      };
    };
    googleBooksApiLoaded?: boolean;
  }
}

const BookViewer: React.FC<BookViewerProps> = ({ bookId }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to initialize the viewer once the API is loaded
    const initViewer = () => {
      if (window.google && window.google.books && viewerRef.current) {
        try {
          viewerInstance.current = new window.google.books.Viewer(viewerRef.current);
          viewerInstance.current.load(bookId);
          window.googleBooksApiLoaded = true;
        } catch (err) {
          console.error('Error initializing Google Books viewer:', err);
          setError('Failed to load the book viewer. Please try again later.');
        }
      }
    };

    // Function to load the Google Books API script
    const loadGoogleBooksApi = () => {
      if (window.googleBooksApiLoaded) {
        setIsApiLoaded(true);
        initViewer();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-books-script';
      script.src = 'https://www.google.com/books/jsapi.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google && window.google.books) {
          window.google.books.load(() => {
            setIsApiLoaded(true);
            initViewer();
          });
        } else {
          setError('Google Books API failed to load properly. Please refresh the page.');
        }
      };
      
      script.onerror = () => {
        setError('Failed to load Google Books API. Please check your internet connection and refresh.');
      };
      
      document.body.appendChild(script);
    };

    // Check if the script is already loaded
    const existingScript = document.getElementById('google-books-script');
    if (existingScript) {
      if (window.google && window.google.books) {
        setIsApiLoaded(true);
        initViewer();
      } else {
        // Script exists but API not initialized - wait a bit more
        const timeout = setTimeout(() => {
          if (window.google && window.google.books) {
            setIsApiLoaded(true);
            initViewer();
          } else {
            loadGoogleBooksApi();
          }
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      loadGoogleBooksApi();
    }

    return () => {
      // Clean up
      viewerInstance.current = null;
    };
  }, [bookId]);

  if (error) {
    return (
      <div className="book-viewer-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="book-viewer-container">
      {!isApiLoaded && (
        <div className="book-viewer-loading">
          <p>Loading book viewer...</p>
        </div>
      )}
      <div ref={viewerRef} className="book-viewer"></div>
    </div>
  );
};

export default BookViewer; 