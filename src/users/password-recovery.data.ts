export const USER = {
  email: 'mail@mail.com',
  sms: '99999999999',
  retry: '',
  smsCodeValidation: '999999',
  hash: 'xpto:999999',
  urlChangePassword:
    'https://portinari.io/documentation/po-page-change-password'
};

export const EMAIL_SUCCESS = {
  totvs_messages: [
    {
      type: 'success',
      code: '204',
      detail:
        'Email with the password recovery link have been successfully sent'
    }
  ]
};

export const EMAIL_ERROR = {
  result: {
    code: '404',
    message: 'Invalid email'
  }
};

export const SMS_SUCCESS = {
  hash: 'xpto:999999',
  urlValidationCode: 'urlValidationCode',
  totvs_messages: [
    {
      type: 'success',
      code: '204',
      detail: 'SMS sent successfully'
    }
  ]
};

export const SMS_ERROR = {
  result: {
    code: '404',
    message: 'Invalid telephone'
  }
};

export const SMS_VALIDATION_SUCCESS = {
  totvs_messages: [
    {
      type: 'success',
      code: 200,
      detail: 'SMS code valid',
      hash: 'xpto:999999',
      urlValidationCode: 'urlValidationCode'
    }
  ]
};

export const SMS_VALIDATION_ERROR = {
  result: {
    code: '404',
    message: 'Invalid Sms code, type again'
  }
};
