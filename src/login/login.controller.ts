import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  loginUser(@Body() body: LoginDto) {
    return this.loginService.loginUser(body);
  }
}
