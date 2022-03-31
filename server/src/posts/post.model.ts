import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger"
import {User} from "../users/users.model"


interface PostCreationAttrs {
    title: string
    content: string
    userId: string
    image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальное значение', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Заголовок новости', description: 'Заголовок новости'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @ApiProperty({example: 'описание новости', description: 'описание новости'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @ApiProperty({example: 'image/sakdlaksld.jpg', description: 'Файл - изображение'})
    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User
}
