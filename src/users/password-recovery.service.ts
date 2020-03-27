import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {
  USER as user,
  EMAIL_ERROR as emailError,
  EMAIL_SUCCESS as emailSuccess,
  SMS_ERROR as smsError,
  SMS_SUCCESS as smsSuccess,
  SMS_VALIDATION_ERROR as smsValidationError,
  SMS_VALIDATION_SUCCESS as smsValidationSuccess
} from './password-recovery.data';

@Injectable()
export class PasswordRecoveryService {

  smsType = 'sms';
  emailType = 'email';

  passwordRecovery(type, data) {
    const result = type === this.smsType ? this.recoverBySms(data) : this.recoverByEmail(data);

    return Promise.resolve(result);
  }

  setStatusCode(type): number {
    return type === 'sms' ? HttpStatus.OK : HttpStatus.NO_CONTENT;
  }

  smsValidation(data: any) {
    if (user.smsCodeValidation !== data.code || user.hash !== data.hash) {
      throw new HttpException(smsValidationError, HttpStatus.BAD_REQUEST);
    }

    return Promise.resolve(smsValidationSuccess);
  }

  private recoverByEmail(data) {
    if (user.email !== data.email) {
      throw new HttpException(emailError, HttpStatus.NOT_FOUND);
    }

    user.retry = data.retry || 0;
    return emailSuccess;
  }

  private recoverBySms(data) {
    if (user.sms !== data.sms) {
      throw new HttpException(smsError, HttpStatus.NOT_FOUND);
    }

    return smsSuccess;
  }
}
