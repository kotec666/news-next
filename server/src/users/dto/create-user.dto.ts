import {ApiProperty} from "@nestjs/swagger"
import {IsEmail, IsString, Length} from "class-validator"

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта', required: true})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 55, {message: 'Не меньше 4 и не больше 55'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string

    @ApiProperty({example: 'login', description: 'Логин', required: true})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 24, {message: 'Не меньше 4 и не больше 24'})
    readonly login: string

    @ApiProperty({example: 'sadjlk15151', description: 'Пароль', required: true})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 24, {message: 'Не меньше 4 и не больше 24'})
    readonly password: string
}
