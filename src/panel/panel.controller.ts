import { Controller, Get } from '@nestjs/common';

import { PanelService } from './panel.service';

@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get('/users')
  getUsers() {
    return this.panelService.getUsers();
  }
}
