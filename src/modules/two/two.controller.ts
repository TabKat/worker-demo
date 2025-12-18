import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TwoService } from './two.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('two')
export class TwoController {
  private readonly logger = new Logger(TwoController.name);

  constructor(private readonly service: TwoService) {}

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
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const start = Date.now();

    try {
      const result = await this.service.processMultipleFiles(files);

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
