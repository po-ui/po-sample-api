import { Test, TestingModule } from '@nestjs/testing';
import { BeforeNewController } from './before-new.controller';

describe('BeforeNew Controller', () => {
  let controller: BeforeNewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeforeNewController],
    }).compile();

    controller = module.get<BeforeNewController>(BeforeNewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
