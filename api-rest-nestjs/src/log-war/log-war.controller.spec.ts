import { Test, TestingModule } from '@nestjs/testing';
import { LogWarController } from './log-war.controller';
import { LogWarService } from './log-war.service';

describe('LogWarController', () => {
  let controller: LogWarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogWarController],
      providers: [LogWarService],
    }).compile();

    controller = module.get<LogWarController>(LogWarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
