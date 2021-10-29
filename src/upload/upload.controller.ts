import { Controller, Body, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UploadService } from './upload.service';
import { FileDto } from './dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiTags('upload')
  @ApiResponse({ status: 201, type: FileDto })
  @UseInterceptors(FileInterceptor('files'))
  @Post('/addFile')
  async addFile(@UploadedFile() file: Express.Multer.File | any) {
    return await this.uploadService.add(file);
  }

  @ApiTags('upload')
  @UseInterceptors(FileInterceptor('files'))
  @Get('/getFile')
  async getFileAllFile() {
    return await this.uploadService.findAll();
  }
}
