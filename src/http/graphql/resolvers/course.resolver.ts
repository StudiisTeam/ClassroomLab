import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentServices } from 'src/services/enrollment.service';
import { StudentsServices } from 'src/services/students.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolve {
  constructor(
    private courseService: CoursesServices,
    private enrollmentService: EnrollmentServices,
    private studentService: StudentsServices,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);
    if (!student) {
      throw new Error('Student not found');
    }
    const enrollment = await this.enrollmentService.getByCourseIdAndStudentId({
      studentId: student.id,
      courseId: id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.courseService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}
