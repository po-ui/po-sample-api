import { Test, TestingModule } from '@nestjs/testing';
import { BeforeEditController } from './before-edit.controller';

describe('BeforeEdit Controller', () => {
  let controller: BeforeEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeforeEditController],
    }).compile();

    controller = module.get<BeforeEditController>(BeforeEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
