import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse } from 'csv';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Readable } from 'stream';
import { MeasuresParser, MeasuresService } from './measures.service';

@Controller('measures')
export class MeasuresController {
  constructor(private measuresService: MeasuresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('measures'))
  create(@UploadedFile() file: Express.Multer.File) {
    // Here, I get the contents of the file.
    Readable.from(file.buffer)
      .pipe(
        parse({
          delimiter: ',',
          columns: true,
        }),
      )
      .on('data', async (data: any) => {
        try {
          const measure = MeasuresParser.parse(data);
          await this.measuresService.create(measure);
        } catch (error: any) {
          console.log(error);
        }
      });
  }
}
