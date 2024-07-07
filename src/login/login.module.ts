import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
