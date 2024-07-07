import { Module } from '@nestjs/common';

import { PanelModule } from './panel/panel.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [PanelModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
