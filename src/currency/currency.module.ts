import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CurrencyController],
    providers: [CurrencyService],
    imports: [TypeOrmModule.forFeature([Currency]), AuthModule],
})
export class CurrencyModule {}
