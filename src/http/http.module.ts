import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentServices } from 'src/services/enrollment.service';
import { StudentsServices } from 'src/services/students.service';
import { CourseResolve } from './graphql/resolvers/course.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver';
import { StudentResolver } from './graphql/resolvers/student.resolver';
import { TestController } from './test.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [TestController],
  providers: [
    StudentResolver,
    StudentsServices,
    CourseResolve,
    CoursesServices,
    EnrollmentResolver,
    EnrollmentServices,
  ],
})
export class HttpModule {}
