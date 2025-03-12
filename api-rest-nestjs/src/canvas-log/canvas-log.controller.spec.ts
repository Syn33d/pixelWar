import { Test, TestingModule } from '@nestjs/testing';
import { CanvasLogController } from './canvas-log.controller';
import { CanvasLogService } from './canvas-log.service';

describe('CanvasLogController', () => {
  let controller: CanvasLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanvasLogController],
      providers: [CanvasLogService],
    }).compile();

    controller = module.get<CanvasLogController>(CanvasLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
