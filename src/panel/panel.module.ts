import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PanelService } from './panel.service';
import { ConfigModule } from '../config/config.module';
import { PanelController } from './panel.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [PanelController],
  providers: [PanelService],
})
export class PanelModule {}
