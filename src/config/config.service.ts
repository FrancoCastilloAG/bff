import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfig) {}

  getAppPort(): number {
    return this._checkVarExists<number>('PORT');
  }

  getUserManagementUrl(): string {
    return this._checkVarExists<string>('USER_MANAGEMENT_URL');
  }

  private _checkVarExists<T>(name: any): T {
    const envVar = this.configService.get<T>(name);
    if (!envVar) {
      throw Error(`No value setted for environment var '${name}'.`);
    }
    return envVar;
  }
}
