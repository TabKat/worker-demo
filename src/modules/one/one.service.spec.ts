import { Test, TestingModule } from '@nestjs/testing';
import { OneService } from './one.service';

describe('OneService', () => {
  let service: OneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneService],
    }).compile();

    service = module.get<OneService>(OneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
