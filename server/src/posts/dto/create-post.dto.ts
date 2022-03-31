import {IsNotEmpty, IsNumber, IsString} from "class-validator"
import {ApiProperty} from "@nestjs/swagger"

export class CreatePostDto {

    @ApiProperty({example: 'Заголовок', description: 'Заголовок новости', required: true})
    @IsNotEmpty({message: 'Поле обязательно для заполнения'})
    readonly title: string

    @ApiProperty({example: 'описание ', description: 'описание новости', required: true})
    @IsNotEmpty({message: 'Поле обязательно для заполнения'})
    readonly content: string

    @ApiProperty({example: '1', description: 'ID пользователя, создавшего новость', required: true})
    @IsNotEmpty({message: 'Поле обязательно для заполнения'})
    @IsString({message: 'Должно быть строкой'})
    readonly userId: string
}
