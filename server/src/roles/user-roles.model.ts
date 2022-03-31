import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger"
import {User} from "../users/users.model";
import {Role} from "./roles.model";


@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '1', description: 'Уникальное значение', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: '1', description: 'id роли'})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: string

    @ApiProperty({example: '2', description: 'id пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: string

}
