import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/custom-typeorm.decorator';
import { CreateSellerDto } from 'src/entities/dtos/create-seller.dto';
import { SellerEntity } from 'src/entities/seller.entity';

@CustomRepository(SellerEntity)
export class SellerRepository extends Repository<SellerEntity> {
  async saveSeller(createSellerDto: CreateSellerDto): Promise<void> {
    await this.insert(createSellerDto);
  }

  async findById(id: number): Promise<SellerEntity> {
    const [user] = await this.find({
      where: { id },
      withDeleted: true,
      take: 1,
    });
    return user;
  }

  async findByEmail(email: string): Promise<SellerEntity> {
    const [user] = await this.find({
      where: { email },
      withDeleted: true,
      take: 1,
    });
    return user;
  }

  async deleteById(id: number): Promise<void> {
    await this.delete({ id });
  }
}
