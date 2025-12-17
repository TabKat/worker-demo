import { Injectable } from '@nestjs/common';
import { doCalc } from '../shared/utils/dummy';

@Injectable()
export class TwoService {
  processMultipleFiles(files: Express.Multer.File[]) {
    let count = 0;
    for (const file of files) {
      count += this.processFile(file);
    }
    return count;
  }
  processFile(file: Express.Multer.File) {
    let count = 0;

    const stream = Buffer.from(file.buffer);

    for (const line of stream) {
      const len = doCalc(stream, line);
      count += len;
    }

    return count;
  }
}
