import { IsNumber, IsString, IsNotEmpty } from 'class-validator';


export class ConvertCurrencyDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    from: string;
    
    @IsString()
    @IsNotEmpty()
    to: string;

}