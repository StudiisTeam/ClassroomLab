/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentServices } from 'src/services/enrollment.service';
import { StudentsServices } from 'src/services/students.service';

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentService: StudentsServices,
    private courseService: CoursesServices,
    private enrollementService: EnrollmentServices
  ){}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentService.getStudentByAuthUserId(payload.customer.authUserId)
    
    if(!student){
      student = await this.studentService.createStudent({
        authUserId: payload.customer.authUserId
      })
    }

    let course = await this.courseService.getCourseBySlug(payload.product.slug)

    if(!course){
      course = await this.courseService.createCourse({
        title: payload.product.title
      })
    }

    await this.enrollementService.createEnrollment({
      studentId: student.id,
      courseId: course.id
    })
  }
}
