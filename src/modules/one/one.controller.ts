import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { OneService } from './one.service';

@Controller('one')
export class OneController {
  private readonly logger = new Logger(OneController.name);

  constructor(private readonly service: OneService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const start = Date.now();
    try {
      const result = this.service.processMultipleFiles(files);

      const end = Date.now();
      this.logger.log(`Processing time: ${end - start} ms`);

      return {
        result,
        processingTimeMs: end - start,
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(
        'Failed to process uploaded files',
      );
    }
  }
}
