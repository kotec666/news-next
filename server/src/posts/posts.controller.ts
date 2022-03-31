import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards, Query
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import {JwtAuthGuard} from "../auth/jwt.auth.guard"
import {RolesGuard} from "../auth/roles.guard"
import { Post as PostType } from './post.model'
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger"
import {FileInterceptor} from "@nestjs/platform-express"
import {Roles} from "../auth/roles-auth.decorator"
import {SearchPostDto} from "./dto/search-post.dto";

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Создание новости' })
  @ApiResponse({status: 201, type: PostType})
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.create(dto, image)
  }

  @ApiOperation({ summary: 'Получение всех новостей / по искомому слову' })
  @ApiResponse({status: 200, type: [PostType]})
  @Get()
  findAll(@Query() dto: SearchPostDto) {
    return this.postsService.findAll(dto)
  }

  @ApiOperation({ summary: 'Получение одной новости' })
  @ApiResponse({status: 200, type: PostType})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @ApiOperation({ summary: 'Изменение новости' })
  @ApiResponse({status: 200, type: PostType})
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @UploadedFile() image) {
    return this.postsService.update(+id, dto, image)
  }

  @ApiOperation({ summary: 'Удаление новости' })
  @ApiResponse({status: 200, type: PostType})
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
