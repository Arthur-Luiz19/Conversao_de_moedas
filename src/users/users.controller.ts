import { Controller, Post, Body, UnauthorizedException } from'@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    @Post('signup')
    @ApiOperation({summary: 'Cadastro de usuário'})
    @ApiQuery({name: 'body', description: 'Objeto que armazena as propriedades para o cadastro', example: 'userName, password'})
    async signup(@Body() body: {userName:string, password:string}){
        const user = await this.usersService.createUser(
            body.userName,
            body.password,
        )
        return{message: 'User created successfully', UserId: user.id};
    }

    @Post('login')
    @ApiOperation({summary: 'Realiza o login de usuário'})
    @ApiQuery({name: 'body', description: 'Objeto que armazena duas propriedades para login', example: "userName, password"})
    async login(@Body() body: {userName:string, password:string}){
        const user = await this.usersService.validateUser(
            body.userName,
            body.password,
        )
        if(!user){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = {userName:user.userName, sub:user.id};

        return{
            access_token: this.jwtService.sign(payload),
        }
    }
}
