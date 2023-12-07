// services/BookService.ts
import { BookInterface } from "../interfaces/books";
import BookRepository from "../repositories/BookRepository";

class BookService {
  async getBooks(offset: number, limit: number) {
    const books = await BookRepository.findBooks(offset, limit);
    const totalBooksCount = await BookRepository.countBooks();
    const totalPages = Math.ceil(totalBooksCount / limit);

    return {
      books,
      totalPages,
    };
  }

  async getBookById(id: number) {
    return BookRepository.findBookById(id);
  }

  async createBook(book: Partial<BookInterface>) {
    return BookRepository.createBook(book);
  }

  async updateBook(id: number, book: any) {
    return BookRepository.updateBook(id, book);
  }

  async deleteBook(id: number) {
    BookRepository.deleteBook(id);
    return;
  }
  async searchBooks(query: string) {
    return BookRepository.searchBooks(query);
  }
}

export default new BookService();
