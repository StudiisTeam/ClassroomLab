import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Product } from 'src/http/models/product';
import { ProductsService } from 'src/services/products.service';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}
  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProject();
  }
}
