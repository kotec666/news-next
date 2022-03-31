import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import {InjectModel} from "@nestjs/sequelize"
import {Post} from "./post.model"
import {FilesService, FileType} from "../files/files.service"
import {SearchPostDto} from "./dto/search-post.dto"
import {Op} from "sequelize"


@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Post) private postRepository: typeof Post,
      private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image) {
    const picturePath = this.fileService.createFile(FileType.IMAGE, image)
     const post = await this.postRepository.create({ ...dto, image: picturePath })
     return post
  }

  async findAll(dto: SearchPostDto) {
    if(dto.search) {
      let offset = Number(dto.page) * Number(dto._limit) - Number(dto._limit)
      const posts = await this.postRepository.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${dto.search}%`
          }
        }, offset: +offset, limit: +dto._limit
      })
      return posts
    } else {
      let offset = Number(dto.page) * Number(dto._limit) - Number(dto._limit)
      const posts = await this.postRepository.findAndCountAll({
        offset: +offset, limit: +dto._limit
      })
      return posts
    }
  }

  async findOne(id: number) {
    const posts = await this.postRepository.findOne({ where: { id: id } })
    return posts
  }

  async update(id: number, dto: UpdatePostDto, image) {
    const posts = await this.postRepository.findOne({ where: { id: id } })
    const picturePath = this.fileService.createFile(FileType.IMAGE, image)
    posts.content = dto.content
    posts.title = dto.title
    posts.image = picturePath
    await posts.save()
    return posts
  }

  async remove(id: number) {
    const posts = await this.postRepository.destroy({ where: { id: id } })
    return posts
  }
}
