import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete as DeleteBlog,
} from '@nestjs/common';
import { CmsHeadlessApiService } from './cms-headless-api.service';
import { CreateCmsHeadlessApiDto } from './dto/create-cms-headless-api.dto';
import { UpdateCmsHeadlessApiDto } from './dto/update-cms-headless-api.dto';

@Controller('cms-headless-api')
export class CmsHeadlessApiController {
  constructor(private readonly cmsHeadlessApiService: CmsHeadlessApiService) {}

  @Post('blog')
  createBlog(@Body() createCmsHeadlessApiDto: CreateCmsHeadlessApiDto) {
    return this.cmsHeadlessApiService.createBlog(createCmsHeadlessApiDto);
  }

  @Get('blog')
  findAllBlogs() {
    return this.cmsHeadlessApiService.findAllBlogs();
  }

  @Get('blog/:id')
  findOneBlog(@Param('id') id: string) {
    return this.cmsHeadlessApiService.findOneBlog(id);
  }

  @Patch('blog/:id')
  updateBlog(
    @Param('id') id: string,
    @Body() updateCmsHeadlessApiDto: UpdateCmsHeadlessApiDto,
  ) {
    return this.cmsHeadlessApiService.updateBlog(+id, updateCmsHeadlessApiDto);
  }

  @DeleteBlog('blog/:id')
  remove(@Param('id') id: string) {
    return this.cmsHeadlessApiService.removeBlog(+id);
  }
}
