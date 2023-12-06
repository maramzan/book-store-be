import { Users } from '@prisma/client';
import { prisma } from '../prismaClient/prisma-client';

 class AuthService {
  public async createUser(user: Partial<Users>): Promise<Users> {
    return prisma.users.create({
      data: user as Users,
    });
  }

  public async findUserByEmail(email: string): Promise<Users | null> {
    return prisma.users.findUnique({
      where: { email },
    });
  }

public async findUserById(id: number): Promise<Users | null> {
    return prisma.users.findUnique({
      where: { id },
    });
  }

  public async deductPoints(userId: number, points: number): Promise<Users> {
    return prisma.users.update({
      where: { id: userId },
      data: { points: { decrement: points } },
    });
  }

  public async addPoints(userId: number, points: number): Promise<Users> {
    return prisma.users.update({
      where: { id: userId },
      data: { points: { increment: points } },
    });
  }
}

export default new AuthService();