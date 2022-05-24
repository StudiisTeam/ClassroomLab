import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesServices } from 'src/services/courses.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolve {
  constructor(private courseService: CoursesServices) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  course() {
    return this.courseService.listAllCourses();
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}
