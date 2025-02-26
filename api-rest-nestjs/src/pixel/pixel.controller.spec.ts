import { Test, TestingModule } from '@nestjs/testing';
import { PixelController } from './pixel.controller';
import { PixelService } from './pixel.service';

describe('PixelController', () => {
  let controller: PixelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PixelController],
      providers: [PixelService],
    }).compile();

    controller = module.get<PixelController>(PixelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
