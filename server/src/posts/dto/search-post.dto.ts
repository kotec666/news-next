import {ApiProperty} from "@nestjs/swagger"
import {IsNotEmpty} from "class-validator"

export class SearchPostDto {

    @ApiProperty({example: 'заголовок - 1', description: 'имя заголовка новости', required: false})
    search?: string

    @ApiProperty({example: '1', description: 'Номер страницы', required: true})
    @IsNotEmpty({message: 'Поле обязательно для заполнения'})
    page: string

    @ApiProperty({example: '20', description: 'кол-во элементов на страницу', required: true})
    @IsNotEmpty({message: 'Поле обязательно для заполнения'})
    _limit: number
}
