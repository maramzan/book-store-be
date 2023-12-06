import { prisma } from "../prismaClient/prisma-client";

class BookRepository {
  async findBooks(offset: number, limit: number) {
    return prisma.book.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findBookById(id: number) {
    return prisma.book.findUnique({
      where: { id },
    });
  }

  async createBook(book: any) {
    return prisma.book.create({
      data: book,
    });
  }

  async updateBook(id: number, book: any) {
    return prisma.book.update({
      where: { id },
      data: book,
    });
  }

  async deleteBook(id: number) {
    return prisma.book.delete({
      where: { id },
    });
  }

  async searchBooks(query: string) {
    return prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { writer: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } },
          ],
        },
      });
  }
}

export default new BookRepository();
