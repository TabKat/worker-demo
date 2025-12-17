import { Test, TestingModule } from '@nestjs/testing';
import { OneController } from './one.controller';

describe('OneController', () => {
  let controller: OneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneController],
    }).compile();

    controller = module.get<OneController>(OneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
