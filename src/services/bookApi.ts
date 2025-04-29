import axios from 'axios';
import { Book } from '../types/Book';

const API_BASE_URL = 'https://www.googleapis.com/books/v1';

export interface SearchBooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export const searchBooks = async (query: string): Promise<SearchBooksResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/volumes`, {
      params: {
        q: query,
        maxResults: 40
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/volumes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
}; 