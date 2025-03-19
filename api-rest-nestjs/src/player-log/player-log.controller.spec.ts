import { Test, TestingModule } from '@nestjs/testing';
import { PlayerLogController } from './player-log.controller';
import { PlayerLogService } from './player-log.service';

describe('PlayerLogController', () => {
  let controller: PlayerLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerLogController],
      providers: [PlayerLogService],
    }).compile();

    controller = module.get<PlayerLogController>(PlayerLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
