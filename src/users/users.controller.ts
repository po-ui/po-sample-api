import { Controller, Post, Body, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';

import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryType } from './password-recovery-type.enum';
import { AuthenticationService } from './authentication.service';
import { PasswordRecoverySmsDto } from './dto/password-recovery-sms.dto';
import { ValidateCodeSmsDto } from './dto/validate-code-sms.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { ValidateCodeSmsResponseDto } from './dto/validate-code-sms-response.dto';

import {
  SMS_SUCCESS as smsSuccess,
} from './password-recovery.data';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
    private readonly authenticationService: AuthenticationService
  ) {}

  @ApiResponse({ status: 200, type: PasswordRecoverySmsDto })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Invalid number, type again' })
  @ApiQuery({ name: 'type', required: false, enum: PasswordRecoveryType })
  @Post()
  async passwordRecovery(@Query('type') type, @Body() passwordRecoveryDto: PasswordRecoveryDto, @Res() response: Response) {
    const passwordRecovery = await this.passwordRecoveryService.passwordRecovery(type, passwordRecoveryDto);
    const successStatus = this.passwordRecoveryService.setStatusCode(type);

    response.status(successStatus).send(passwordRecovery)
  }

  @ApiResponse({ status: 200, type: ValidateCodeSmsResponseDto })
  @ApiResponse({ status: 404, description: 'Invalid Sms code, type again' })
  @Post(`validation|${smsSuccess.urlValidationCode}`)
  async smsValidation(@Body() codeSmsToValidate: ValidateCodeSmsDto, @Res() response: Response) {
    const smsValidation = await this.passwordRecoveryService.smsValidation(codeSmsToValidate);

    response.status(200).send(smsValidation)
  }

  @Post('authentication')
  async authentication(@Body() data) {
    return await this.authenticationService.authentication(data);
  }
}
