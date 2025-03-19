import { Test, TestingModule } from '@nestjs/testing';
import { PlayerLogService } from './player-log.service';

describe('PlayerLogService', () => {
  let service: PlayerLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerLogService],
    }).compile();

    service = module.get<PlayerLogService>(PlayerLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
