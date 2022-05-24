import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentServices } from 'src/services/enrollment.service';
import { StudentsServices } from 'src/services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentsServices,
    private enrollmentService: EnrollmentServices,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents();
  }

  @ResolveField()
  enrollment(@Parent() student: Student) {
    return this.enrollmentService.getEnrollmentByStudentId(student.id);
  }
}
