import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency/currency.entity';
import { UsersModule } from './users/users.module';
import { user } from './users/user.entidy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CurrencyModule,
    TypeOrmModule.forRoot({
      host: 'localhost',
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'minha_senha',
      database: 'currency_db',
      synchronize: true,
      entities: [Currency, user],
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
