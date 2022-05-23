import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { Product } from 'src/http/models/product';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-products-inputs';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProject();
  }

  @Mutation(() => Product)
  //@UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
