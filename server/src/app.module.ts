import {Module} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import {User} from "./users/users.model"
import { RolesModule } from './roles/roles.module'
import {Role} from "./roles/roles.model"
import {UserRoles} from "./roles/user-roles.model"
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import {Post} from "./posts/post.model"
import { FilesModule } from './files/files.module'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
