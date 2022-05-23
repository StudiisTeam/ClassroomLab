import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Customer } from 'src/http/models/customer';
import { CustomersService } from 'src/services/customers.service';
import { PurchaseService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomersService,
    private purchaseService: PurchaseService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchase(@Parent() customer: Customer) {
    return this.purchaseService.listAllPurchasesByCustomer(customer.id);
  }
}
