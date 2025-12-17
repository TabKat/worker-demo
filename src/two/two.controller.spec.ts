import { Test, TestingModule } from '@nestjs/testing';
import { TwoController } from './two.controller';

describe('TwoController', () => {
  let controller: TwoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoController],
    }).compile();

    controller = module.get<TwoController>(TwoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
