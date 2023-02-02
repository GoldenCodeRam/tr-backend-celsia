import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const MeasuresParser = z.object({
  ConnectionDeviceId: z.string(),
  EventProcessedUtcTime: z.string(),
  HEFESTO_ID: z.string(),
  timestamp: z.string(),
  'var-name': z.string(),
  value: z.preprocess((val: string) => parseInt(val), z.number()),
  plugin: z.string(),
  request: z.string(),
  var_name_1: z.string(),
  device: z.preprocess((val: string) => parseInt(val), z.number()),
});

@Injectable()
export class MeasuresService {
  constructor(private prisma: PrismaService) {}

  async create(measuresDto: z.infer<typeof MeasuresParser>) {
    try {
      // This is why we need a parser like Zod.
      await this.prisma.measurement.create({
        data: {
          connectionDeviceId: measuresDto.ConnectionDeviceId,
          eventProcessedUtcTime: new Date(measuresDto.EventProcessedUtcTime),
          hefestoId: measuresDto.HEFESTO_ID,
          timestamp: new Date(measuresDto.timestamp),
          varName: measuresDto['var-name'],
          value: measuresDto.value,
          plugin: measuresDto.plugin,
          request: measuresDto.request,
          varName1: measuresDto.var_name_1,
          device: measuresDto.device,
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  }
}
