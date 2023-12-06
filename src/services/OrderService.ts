import { Order, Prisma } from '@prisma/client';
import { prisma } from '../prismaClient/prisma-client';

type OrderWithBook = Prisma.OrderGetPayload<{
    include: { book: true }
  }>;
 class OrderService {
  public async createOrder(order: { userId: number; bookId: number }): Promise<Order> {
    return prisma.order.create({
      data: {
        userId: order.userId,
        bookId: order.bookId,
        status: 'PURCHASED',
      },
    });
  }

  public async findOrderById(id: number): Promise<OrderWithBook | null> {
    return prisma.order.findUnique({
      where: { id },
      include: { book: true },
    });
  }

  public async cancelOrder(id: number): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  public async getOrdersByUserId(userId: number): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
    });
  }

}

export default new OrderService();