import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { LoginParams } from './params/login.param';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoginService {
  private userManagementEndpoint: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.userManagementEndpoint = configService.getUserManagementUrl();
  }

  async loginUser(params: LoginParams) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${this.userManagementEndpoint}/auth/login`, params, {
          validateStatus: (status) => status < 400,
        })
        .pipe(),
    );
    return data;
  }
}
