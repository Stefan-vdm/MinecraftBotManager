import { Test } from '@nestjs/testing';
import { ApiMinecraftController } from './api-minecraft.controller';
import { ApiMinecraftService } from './api-minecraft.service';

describe('ApiMinecraftController', () => {
  let controller: ApiMinecraftController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiMinecraftService],
      controllers: [ApiMinecraftController],
    }).compile();

    controller = module.get(ApiMinecraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
