/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductParam{
  title: string
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProject() {
    return this.prisma.product.findMany();
  }

  async createProduct({title}: CreateProductParam){
    const slug = slugify(title, {
      lower: true
    })

    const productWithSameSlug = await this.prisma.product.findUnique({where: {
      slug
    }})

    if(productWithSameSlug){
      throw new Error("Another product with same slug already exist")
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug  
      }
    })
  }
}
