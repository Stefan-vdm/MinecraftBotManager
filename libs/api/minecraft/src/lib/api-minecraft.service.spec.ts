import { Test } from '@nestjs/testing';
import { ApiMinecraftService } from './api-minecraft.service';

describe('ApiMinecraftService', () => {
  let service: ApiMinecraftService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiMinecraftService],
    }).compile();

    service = module.get(ApiMinecraftService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
