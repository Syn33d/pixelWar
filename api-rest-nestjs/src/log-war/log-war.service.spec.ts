import { Test, TestingModule } from '@nestjs/testing';
import { LogWarService } from './log-war.service';

describe('LogWarService', () => {
  let service: LogWarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogWarService],
    }).compile();

    service = module.get<LogWarService>(LogWarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
