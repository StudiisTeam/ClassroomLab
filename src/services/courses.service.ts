import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesServices {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const courseAlreadExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadExists) {
      throw new Error('Course Alread exists');
    }
    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
