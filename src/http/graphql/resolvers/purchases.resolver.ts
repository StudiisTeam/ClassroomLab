import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from 'src/http/models/product';
import { Purchase } from 'src/http/models/purchase';
import { ProductsService } from 'src/services/products.service';
import { PurchaseService } from 'src/services/purchases.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchaseService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId);
  }
}
