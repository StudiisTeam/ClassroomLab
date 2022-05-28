import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCourseAndStudentParams {
  studentId: string;
  courseId: string;
}
interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
}

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

  getByCourseIdAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
        canceledAt: null,
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

  createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    console.log(courseId, studentId);

    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }
}
