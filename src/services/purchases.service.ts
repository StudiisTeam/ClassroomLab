import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
