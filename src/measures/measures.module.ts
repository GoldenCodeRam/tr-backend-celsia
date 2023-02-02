import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  providers: [MeasuresService, PrismaService],
  controllers: [MeasuresController],
  exports: [MeasuresService],
})
export class MeasuresModule {}
