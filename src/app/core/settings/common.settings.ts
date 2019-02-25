export class SETTINGS {
  public static HTTP_PREFIX = 'http://localhost:7575';

  public static ENDPOINTS = {
    userLogin: {
      url: SETTINGS.HTTP_PREFIX + '/api/auth/signin',
      type: 'POST'
    },
    saveUser: {
      url: SETTINGS.HTTP_PREFIX + '/api/auth/signup',
      type: 'POST'
    }
  }
}
