import { Injectable } from '@nestjs/common';
import { Currency } from './currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
    
    constructor(
        @InjectRepository(Currency)
        private currencyRepository: Repository<Currency>,
    ){}

    async getAvaliableCurrencies(): Promise<string[]> {
        const currencies = await this.currencyRepository.find();
        return currencies.map((currency) => currency.code)
    }
    async convertCurrency(amount: number, from: string, to: string): Promise<number> {
            const fromCurrency = await this.currencyRepository.findOne({
                where: {code: from}
            })

            const toCurrency = await this.currencyRepository.findOne({
                where: {code: to}
            })

        if(!fromCurrency || !toCurrency){
            throw new Error("Currency not found");
        }

        const convertedAmount = (amount / fromCurrency.rate) * toCurrency.rate;
        return convertedAmount;
    }

    async createCurrency(code: string, rate: number): Promise<Currency>{
        const currency = this.currencyRepository.create({code, rate});
        await this.currencyRepository.save(currency)

        return currency;
    }
}
