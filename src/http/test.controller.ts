import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Controller('test')
export class TestController {
  constructor(private prisma: PrismaService) {}
  @Get('ok')
  @UseGuards(AuthorizationGuard)
  hello() {
    return this.prisma.student.findMany();
  }
}
