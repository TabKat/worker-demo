import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';

@Injectable()
export class TwoService {
  async processMultipleFiles(files: Express.Multer.File[]): Promise<number> {
    const results = await Promise.all(
      files.map((file) => this.processFile(file)),
    );
    return results.reduce((sum, value) => sum + value, 0);
  }

  processFile(file: Express.Multer.File): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, 'two.worker.js'));

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
      });

      worker.postMessage(file.buffer);
    });
  }
}
