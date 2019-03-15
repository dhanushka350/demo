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
    },
    getUser: {
      url: SETTINGS.HTTP_PREFIX + '/api/user',
      type: 'GET'
    },
    getUserDetails: {
      url: SETTINGS.HTTP_PREFIX + '/api/users/get-user',
      type: 'GET'
    },
    updateUserDetails: {
      url: SETTINGS.HTTP_PREFIX + '/api/update',
      type: 'POST'
    },
    getCityList: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/city/list',
      type: 'GET'
    },
    getCategoryList: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/category/list',
      type: 'GET'
    },
    getUserList: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/user/list',
      type: 'GET'
    },
    getAdvertisements: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/advertisements',
      type: 'GET'
    },
    activateAllPending: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/activate/all/pending',
      type: 'GET'
    },
    updateAdvertisementStatus: {
      url: SETTINGS.HTTP_PREFIX + '/api/administrator/update/advertisement/status',
      type: 'GET'
    },
    saveAdvertisement: {
      url: SETTINGS.HTTP_PREFIX + '/api/advertisement/create',
      type: 'POST'
    },
    savePackages: {
      url: SETTINGS.HTTP_PREFIX + '/api/advertisement/create/package',
      type: 'POST'
    },
    userAdvertisements: {
      url: SETTINGS.HTTP_PREFIX + '/api/advertisement/list',
      type: 'GET'
    },
    uploadMediaFiles: {
      url: SETTINGS.HTTP_PREFIX + '/api/gallery/uploadFile',
      type: 'POST'
    },
    retriveMediaFile: {
      url: SETTINGS.HTTP_PREFIX + '/api/gallery/downloadFile/',
      type: 'GET'
    },
  };
}
