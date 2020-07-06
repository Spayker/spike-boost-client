export default {

    // Server Dedicated Related Info

    // B2G GE account: create new account
    // 148.251.138.115:6000/accounts/ 
    GE_SERVER_CREATE_NEW_ACCOUNT_URL_ADDRESS:  'http://148.251.138.115:6000/accounts/',

    // B2G GE account: get account token
    // http://148.251.138.115:5000/mservicet/oauth/token
    GE_SERVER_GET_ACCOUNT_TOKEN_URL_ADDRESS:    'http://148.251.138.115:5000/mservicet/oauth/token',

    // B2G GE account: post new training
    // http://148.251.138.115:6000/accounts/trainings/
    GE_SERVER_POST_NEW_TRAINING_URL_ADDRESS:    'http://148.251.138.115:6000/accounts/trainings/',

    
    // Async Storage Keys
    ACCESS_TOKEN_KEY:   '@AccessToken',
    USERNAME_TOKEN_KEY: '@UserName',
    
    // Device section
    DEVICES_KEY:        '@Devices',

    // Service section
    SERVICES_KEY:       '@Services',

    // Account section
    ACCOUNTS_KEY:       '@Accounts',

    // AUTH PROCESS DATA
    AUTHORIZED_STATE:   'authorized',
    UNAUTHORIZED_STATE: 'unauthorized'


};