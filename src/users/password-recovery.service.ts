import { Injectable, HttpException } from '@nestjs/common';

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
  errorStatus = 401;

  passwordRecovery(type, data) {

    const result = type === this.smsType ? this.recoverBySms(data) : this.recoverByEmail(data);

    return Promise.resolve(result);
  }

  smsValidation(data: any) {
    if (user.smsCodeValidation !== data.code) {
      throw new HttpException(smsValidationError, this.errorStatus);
    }

    return Promise.resolve(smsValidationSuccess);
  }

  private recoverByEmail(data) {
    if (user.email !== data.email) {
      throw new HttpException(emailError, this.errorStatus);
    }

    user.retry = data.retry || 0;
    return emailSuccess;
  }

  private recoverBySms(data) {
    if (user.sms !== data.sms) {
      throw new HttpException(smsError, this.errorStatus);
    }

    return smsSuccess;
  }
}
