import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ProductController } from 'src/controllers/product.controller';
import { CompanyEntity } from 'src/entities/company.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductService } from 'src/services/product.service';
import { GetProductResponse } from 'src/types/get-product-response.type';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  let repository: ProductRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ProductService>(ProductService);
    controller = module.get<ProductController>(ProductController);
    controller = module.get<ProductController>(ProductController);
  });

  /**
   * @todo
   * 회사가 존재한다는 전제로 테스트 한다.
   
   * 상품 테스트 코드는 회사에 독립적으로 진행될 수 있어야 한다.
   * 허가 칼럼 추가
   */
  describe(' 상품은 이미 등록되어 있어야 한다.', () => {
    /**
     * GET products?page=1&limit=15&category=&sellerId=&
     *
     * @todo 엔드포인트를 2개 가질 수도 있다.
     * GET categories/:categoryId/products?page=1&limit=15 ...
     *
     */
    describe('buyer의 상품 조회 로직을 테스트 한다.', () => {
      it.todo('상품에 어떤 페이지도 주지 않을 경우 1페이지가 나와야 한다.');

      /**
       * 대표 가격은 입력한 옵션 중 자동으로 최솟값이 들어가야 한다.
       *  - 여기서 말하는 입력한 옵션이란, 품절과 판매가 중단된, 그리고 삭제된 옵션을 모두 제외한 후의 최솟값이다.
       *  - 즉, '반드시 현재 구매 가능한 상태' 중의 최솟값을 말한다.
       *
       *   representivePrice: number;
       */

      it.todo('상품 조회시 대표가격이 노출된다.');

      /**
       * 이미지는 등록 순으로 정렬되어야 하며, 리스트에서는 이미지가 1장이면 되기 때문에 썸네일로 제공되어야 한다.
       *    - 이미지는 가장 먼저 등록된 것을 썸네일로 삼는다.
       *
       * @todo 이미지 컬럼을 별도의 테이블로 분리
       */
      it.todo('상품 조회시 썸네일이 노출되어야 한다.');

      /**
       * @todo 상품에 대한 리뷰시스템를 추가한다.
       * 리뷰 테이블을 별도로 두고 아래 정보는 조인해서 조회한다.
       * 한 명의 유저가 기록할 때마다 수정하려면 너무 많은 연산이 필요하기 떄문에 미리 저장해둔다.
       *
       * 상품에 대한 리뷰 별점을 의미한다.
       * rating : number;
       *
       * 상품에 대한 리뷰 작성수를 의미한다.
       * reviewCount : number;
       */
      it.todo('상품 조회시 별점이 노출되어야 한다.');
      it.todo('상품 조회시 리뷰수가 노출되어야 한다.');

      // it('category 별 조회가 가능해야 한다.', async () => {
      //   const 조회할_카테고리_값 = 1;
      //   const productList: GetProductResponse = await controller.getProductList({
      //     ...
      //     categoryId: 조회할_카테고리_값,
      //   });

      //   expect(typeof productList.data.productList.length === 'number').toBe(true);
      //   expect(productList.data.productList.every((el) => el.categoryId === 조회할_카테고리_값)).toBe(true);

      //   /**
      //    * 컨트롤러의 개수 제한을 넘어선 숫자로 검증을 다시 했을 때도 동일해야 한다.
      //    * 우연의 일치로 하필 조회한 데이터가 전부 카테고리 아이디와 일치했을 가능성을 배제하기 위해 서비스로 20페이지를 체크한다.
      //    */
      //   const productListByProductService = await service.find({
      //     page: 1,
      //     limit: 300,
      //   });

      //   expect(productListByProductService.every((el) => el.categoryId === 조회할_카테고리_값)).toBe(true);
      // });
    });

    /**
     * GET products/:id
     */
    describe('상품의 상세 페이지 조회를 검증한다.', () => {
      /**
       * 상품의 이름을 포함한 기본적인 정보 전부와
       * 옵션 10개, 선택 옵션 10개를 가져온다.
       *
       * 이렇게 옵션을 미리 가져 오는 이유는 상품 조회, 페이지 이동, 옵션 조회 등 API가 나뉘는 것을 방지하기 위함이다.
       * 이렇게 한 번의 요청으로 가져온 후 이후 필요한 데이터를 추가적인 API로 가져오는 게 성능 상 유리하다.
       */
      it.todo('상품의 상세 페이지를 조회할수 있어야한다.');

      /**
       * 추천 상품의 기준은 편의 상 동일 카테고리를 기준으로 한다.
       */
      it.todo('상품 상세 페이지 조회 시에는 상품의 추천 상품 10개가 함께 보여져야 한다.');
    });

    describe('GET products/:id/options?required=', () => {
      /**
       * 상품의 옵션 조회 시 쿼리로 받은 requried true, false를 통해
       * 선택 옵션과 그렇지 않은 경우를 구분할 수 있어야 한다.
       *
       * 당연히 페이지네이션이어야 하며, 1페이지가 default로 조회되어야 한다.
       * 상품의 최초 조회 시 상품의 옵션들이 조회되기 때문에 서비스 로직은 재사용될 수 있어야 한다.
       */
      it.todo('상품의 옵션을 페이지네이션으로 조회한다.');

      /**
       * 입력 옵션이 존재할 경우 배열에 담겨서 보여진다.
       * 없을 경우 빈 배열이며, 빈 배열이면 데이터가 빈 것이 아니라 입력 옵션이 없는 것과 동일하게 처리될 것이다.
       */
      it.todo('필수 옵션의 경우, 선택 옵션과 달리 입력 옵션이 있을 경우 입력 옵션들이 함께 보여져야 한다.');

      /**
       * 즉, 먼저 생긴 옵션이 가장 위에 보여져야 한다.
       */
      it.todo('옵션은 id 값을 기준으로 정렬되어 보여져야 한다.');

      /**
       * 먼 미래에 도전했으면 하는 사항.
       *
       * 예를 들어 '홍길동' 인지, 영문 이름으로 'hong-gil-dong'인지, 아니면 숫자만 받는지 등 조건이 있을 것이다.
       * 해당 조건들을 따로 칼럼으로 가지고 있다면 더 대응의 폭이 넓어질 것이다.
       */
      it.todo('입력 옵션에는 어떠한 정규식 패턴을 사용할 것인지를 의미하는 Enum 칼럼이 존재해야 한다.');
    });
  });
});
