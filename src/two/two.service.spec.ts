import { Test, TestingModule } from '@nestjs/testing';
import { TwoService } from './two.service';

describe('TwoService', () => {
  let service: TwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoService],
    }).compile();

    service = module.get<TwoService>(TwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
