import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import {
  USER_AUTHENTICATE as userLogin,
  EMAIL_ERROR as emailError,
  USER_LOGGED_SUCCESS as loggedSuccess,
  PASSWORD_ERROR as passwordError
} from './password-recovery.data';

import * as atob from 'atob'
@Injectable()
export class AuthenticationService {

  authentication(data) {
    const result = this.authenticate(data);

    return Promise.resolve(result);
  }

  private authenticate(data) {
    if (userLogin.login !== data.login) {
      throw new HttpException(emailError, HttpStatus.NOT_FOUND);
    }
    const password = atob(data.password)
    if (userLogin.password !== password) {
      throw new HttpException(passwordError, HttpStatus.NOT_FOUND);
    }

    return loggedSuccess;
  }


}
