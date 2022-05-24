import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentServices } from 'src/services/enrollment.service';
import { StudentsServices } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentServices: EnrollmentServices,
    private courseService: CoursesServices,
    private studentService: StudentsServices,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollment() {
    return this.enrollmentServices.listEnrollment();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.courseService.getCourseById(enrollment.courseId);
  }
}
