import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entidy';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(user) private usersRepository: Repository<user>,){}

    async createUser(userName: string, password: string): Promise<user>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.usersRepository.create({ userName, password: hashedPassword });
        return this.usersRepository.save(newUser);
    }

    async findByUsername(userName: string): Promise<user | undefined>{
        return this.usersRepository.findOne({where: {userName}});
    }

    async validateUser(username: string, pass: string): Promise<user | null>{
        const user = await this.findByUsername(username);
        if(user && await bcrypt.compare(pass, user.password)){
            return user;
        }
        return null;
    }
}
