import { Route, Get, Query, Post, Body, Put, Path, Delete } from "tsoa";
import BookService from "../services/BookService";
import { BookInterface } from "../interfaces/books";

@Route("books")
export class BookController {
  @Get("/")
  public async getBooks(
    @Query() page: number = 1,
    @Query() limit: number = 10
  ): Promise<BookInterface[]> {
    const offset = (page - 1) * limit;
    return BookService.getBooks(offset, limit);
  }

  @Get("/search")
  public async searchBooks(@Query() query: string): Promise<BookInterface[]> {
    return BookService.searchBooks(query);
  }

  @Get("{id}")
  public async getBookById(@Path() id: number): Promise<BookInterface | null> {
    return BookService.getBookById(id);
  }

  @Post("/")
  public async createBook(
    @Body() book: Partial<BookInterface>
  ): Promise<BookInterface | null> {
    try {
      console.log("book: in body", book);
      return await BookService.createBook(book);
    } catch (err) {
      console.error("Error creating book:", err);
      return null;
    }
  }

  @Put("{id}")
  public async updateBook(
    @Path() id: number,
    @Body() book: Partial<BookInterface>
  ): Promise<BookInterface | null> {
    return BookService.updateBook(id, book);
  }

  @Delete("{id}")
  public async deleteBook(@Path() id: number): Promise<void> {
    return BookService.deleteBook(id);
  }
 
}
