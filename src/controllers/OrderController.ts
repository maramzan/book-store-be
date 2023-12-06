import { Body, Post, Route, Path, Get } from "tsoa";
import BookService from "../services/BookService";
import OrderService from "../services/OrderService";
import { Book } from "@prisma/client";
import AuthService from "../services/AuthService";

interface PurchaseRequest {
  userId: number;
  bookId: number;
}

interface CancelRequest {
  userId: number;
}

@Route("orders")
export class OrderController {
  @Post("purchase")
  public async purchaseBook(@Body() request: PurchaseRequest) {
    try {
      console.log("request", request);
      const user = await AuthService.findUserById(request.userId);
      console.log("user", user);
      if (!user) throw new Error("User not found");

      const book = (await BookService.getBookById(request.bookId)) as Book;

      if (user.points < book.point) {
        throw new Error("Not enough points");
      }

      console.log("book", book);

      const order = await OrderService.createOrder({
        userId: request.userId,
        bookId: request.bookId,
      });

      console.log("order", order);

      await AuthService.deductPoints(request.userId, book.point);

      return order;
    } catch (error) {
      return error;
    }
  }

  @Post("cancel/{orderId}")
  public async cancelOrder(
    @Path() orderId: number,
    @Body() request: CancelRequest
  ) {
    console.log("request", orderId);
    const order = await OrderService.findOrderById(orderId);

    if (!order) throw new Error("Order not found");

    if (order.userId !== request.userId) {
      throw new Error("Unauthorized");
    }

    await OrderService.cancelOrder(orderId);
    await AuthService.addPoints(request.userId, order.book.point);

    return order;
  }

  @Get("user/{userId}")
  public async getOrdersByUserId(@Path() userId: number) {
    return OrderService.getOrdersByUserId(userId);
  }
}
