import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/custom-typeorm.decorator';
import { ProductRequiredOptionEntity } from 'src/entities/product-required-option.entity';
import { CreateProductOptionsDto } from 'src/seller/dto/create.product.options.dto';
import { GetProductRequiredOptionDto } from 'src/seller/dto/get.product.required.option.dto';

@CustomRepository(ProductRequiredOptionEntity)
export class ProductRequiredOptionRepository extends Repository<ProductRequiredOptionEntity> {
  async saveRequiredOption(
    productId: number,
    createProductOptionsDto: CreateProductOptionsDto,
  ): Promise<ProductRequiredOptionEntity> {
    return await this.save({ productId, ...createProductOptionsDto });
  }

  async findById(id: number): Promise<ProductRequiredOptionEntity | null> {
    return await this.findOneBy({ id });
  }

  async getRequiredOption(id: number): Promise<GetProductRequiredOptionDto | null> {
    return await this.findOne({
      select: {
        id: true,
        productId: true,
        name: true,
        price: true,
        isSale: true,
      },
      where: {
        id,
      },
    });
  }

  async getMiniumPriceRows(productIds: number[]): Promise<{ productId: number; minimumPrice: number }[]> {
    return await this.createQueryBuilder('pro')
      .select('pro.productId as productId')
      .addSelect('MIN(pro.price) as minimumPrice')
      .where('pro.productId IN (:...productIds)', { productIds })
      .groupBy('pro.productId')
      .getRawMany();
  }

  async getRequiredOptionJoinInputOptions(
    productId: number,
    skip: number,
    take: number,
  ): Promise<[GetProductRequiredOptionDto[], number]> {
    return await this.findAndCount({
      select: {
        id: true,
        productId: true,
        name: true,
        price: true,
        isSale: true,
        productInputOptions: {
          id: true,
          productRequiredOptionId: true,
          name: true,
          value: true,
          description: true,
          isRequired: true,
        },
      },
      order: {
        id: 'ASC',
      },
      relations: { productInputOptions: true },
      where: {
        productId,
        isSale: true,
      },
      skip,
      take,
    });
  }
}
