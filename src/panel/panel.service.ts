import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '../config/config.service';

@Injectable()
export class PanelService {
  private userManagementEndpoint: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.userManagementEndpoint = configService.getUserManagementUrl();
  }

  async getUsers() {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.userManagementEndpoint}/users`, {
          maxRedirects: 0,
          validateStatus: (status) => status < 400,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data;
  }
}
