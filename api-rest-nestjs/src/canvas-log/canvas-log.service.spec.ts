import { Test, TestingModule } from '@nestjs/testing';
import { CanvasLogService } from './canvas-log.service';

describe('CanvasLogService', () => {
  let service: CanvasLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanvasLogService],
    }).compile();

    service = module.get<CanvasLogService>(CanvasLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
