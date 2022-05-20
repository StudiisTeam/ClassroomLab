import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Controller('test')
export class TestController {
  constructor(private prisma: PrismaService) {}
  @Get('ok')
  hello() {
    return this.prisma.customers.findMany();
  }
}
