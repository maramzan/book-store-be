import { Body, Post, Route } from "tsoa";
import bcrypt from "bcrypt";
import AuthService from "../services/AuthService";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

type LoginRequest = {
  email: string;
  password: string;
};

@Route("auth")
export class AuthController {

  private generateToken(user: Users) {
    return jwt.sign({ id: user.id }, process.env["JWT_SECRET"] as string, {
      expiresIn: "12h",
    });
  }

  @Post("register")
  public async register(@Body() request: Partial<Users>) {
    console.log("request", request);
    const hashedPassword = await bcrypt.hash(request.password as string, 10);
    const user = await AuthService.createUser({
      ...request,
      password: hashedPassword,
    });
    const token = this.generateToken(user);
    return { user, token };
  }

  @Post("login")
  public async login(@Body() request: LoginRequest) {
    const user = await AuthService.findUserByEmail(request.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Here you should generate and return a JWT token for the user.

    const token = this.generateToken(user);

    return { user, token };
  }
}
