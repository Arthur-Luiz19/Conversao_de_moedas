import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from './currency.entity';
import { ConvertCurrencyDto } from './convert-currency.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) { }

    @ApiOperation({summary: 'Converte uma moeda para a outra'})
    @ApiQuery({name: 'from', description: 'Moeda de origem', example: 'USD'})
    @ApiQuery({name: 'to', description: 'Moeda de destino', example: 'BRL'})
    @ApiQuery({name: 'amount', description: 'Valor a ser convertido', example: 100})

    @Get('convert')
    async convertCurrency(
        @Query() query: ConvertCurrencyDto,): Promise<{ convertedAmount: number }> {
            const { amount, from, to } = query;
            const convertedAmount = await this.currencyService.convertCurrency(
                amount,
                from,
                to,
            );
        return { convertedAmount };
    }


    @Get('list')
    @ApiOperation({summary: 'Lista todas as moedas disponíveis'})
    @ApiQuery({name: 'currency', description: 'Moedas disponíveis', example: 'USD'})
    async getAvailableCurrencies(): Promise<string[]> {
        return this.currencyService.getAvaliableCurrencies();
    }

    @Post()
    @ApiOperation({summary: 'Registra novas moedas'})
    @ApiQuery({name: 'code', description: 'O código da moeda', example: 'USD'})
    @ApiQuery({name: 'rate', description: 'A taxa de conversão', example: '0.70'})
    async createCurrency(
        @Body('code') code: string,
        @Body('rate') rate: number,
    ): Promise<Currency> {
        return await this.currencyService.createCurrency(code, rate);
    }
} 
