import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class EnrollmentServices {
  constructor(private prisma: PrismaService) {}

  listEnrollment() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  getEnrollmentByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
