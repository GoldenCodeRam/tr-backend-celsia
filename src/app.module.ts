import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { MeasuresService } from './measures/measures.service';
import { MeasuresModule } from './measures/measures.module';
import { MeasuresController } from './measures/measures.controller';

@Module({
  imports: [AuthModule, UsersModule, MeasuresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, MeasuresService],
})
export class AppModule {}
