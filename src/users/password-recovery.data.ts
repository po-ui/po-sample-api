export const USER = {
  email: 'mail@mail.com',
  sms: '99999999999',
  retry: '',
  smsCodeValidation: '999999',
  hash: 'xpto:999999',
  urlChangePassword: 'https://po-ui.io/documentation/po-page-change-password'
};

export const EMAIL_SUCCESS = {
  _messages: [
    {
      type: 'success',
      code: '204',
      detail: 'Email with the password recovery link have been successfully sent'
    }
  ]
};

export const EMAIL_ERROR = {
  code: '404',
  message: 'Invalid email'
};

export const PASSWORD_ERROR = {
  code: '404',
  message: 'Invalid password'
};

export const SMS_SUCCESS = {
  hash: 'xpto:999999',
  urlValidationCode: 'urlValidationCode',
  _messages: [
    {
      type: 'success',
      code: '204',
      detail: 'SMS sent successfully'
    }
  ]
};

export const SMS_ERROR = {
  code: '404',
  message: 'Invalid telephone'
};

export const SMS_VALIDATION_SUCCESS = {
  _messages: [
    {
      type: 'success',
      code: 200,
      detail: 'SMS code valid'
    }
  ],
  token: 'token',
  urlChangePassword: 'https://po-ui.io/documentation/po-page-change-password'
};


export const SMS_VALIDATION_ERROR = {
  code: '400',
  message: 'Invalid Sms code, type again'
};

export const USER_AUTHENTICATE = {
  login: 'admin',
  password: 'admin'
};

export const USER_LOGGED_SUCCESS = {
  user: 'admin',
  name: 'Administrador'
};
