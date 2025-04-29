import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { searchBooks, SearchBooksResponse } from '../services/bookApi';

interface UseBookSearchResult {
  books: Book[];
  loading: boolean;
  error: Error | null;
  totalItems: number;
  searchFor: (query: string) => void;
}

const useBookSearch = (initialQuery: string = ''): UseBookSearchResult => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  const searchFor = (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) {
        setBooks([]);
        setTotalItems(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response: SearchBooksResponse = await searchBooks(query);
        setBooks(response.items || []);
        setTotalItems(response.totalItems);
      } catch (err) {
        setError(err as Error);
        setBooks([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, loading, error, totalItems, searchFor };
};

export default useBookSearch; 