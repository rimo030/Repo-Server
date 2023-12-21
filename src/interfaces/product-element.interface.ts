import { ProductEntity } from 'src/entities/product.entity';

export interface ProductElement
  extends Pick<
    ProductEntity,
    | 'id'
    | 'sellerId'
    | 'bundleId'
    | 'categoryId'
    | 'companyId'
    | 'isSale'
    | 'name'
    | 'deliveryType'
    | 'deliveryCharge'
    | 'img'
  > {
  salePrice: number;

  /**
   * 상품에 대한 썸네일을 의미한다.
   * thumbnail: string;
   */

  /**
   * 상품에 대한 리뷰 별점을 의미한다.
   * rating : number;
   *
   * 상품에 대한 리뷰 작성수를 의미한다.
   * reviewCount : number;
   */
}
