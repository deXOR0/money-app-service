import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shared/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [TypeOrmModule],
})
export class CategoryModule {}
