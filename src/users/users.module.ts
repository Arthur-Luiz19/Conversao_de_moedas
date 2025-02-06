import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entidy';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([user]),
    JwtModule.register({
        secret: 'your_secret_key'
    })
],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
