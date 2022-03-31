import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/post.model";

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальное значение', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'user@mail.ru', description: 'Уникальное значение, почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: 'login', description: 'Логин пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    login: string

    @ApiProperty({example: 'psPOAKODKkdlsak1515', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}
