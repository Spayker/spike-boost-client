/**
 * Component with global constants to be used by all app components
 */
export default {

    // Server Dedicated Related Info

    // SpikeBoost GE account: create new account
    // 148.251.138.115:6000/accounts/ 
    GE_SERVER_CREATE_NEW_ACCOUNT_URL_ADDRESS:  'http://148.251.138.115:6000/accounts/',

    // SpikeBoost GE auth: get account token
    // http://148.251.138.115:5000/mservicet/oauth/token
    GE_SERVER_GET_ACCOUNT_TOKEN_URL_ADDRESS:    'http://148.251.138.115:5000/mservicet/oauth/token',

    // SpikeBoost GE auth srvice: basic address of user auth
    GE_SERVER_USER_AUTH_URL_ADDRESS: 'http://148.251.138.115:5000/mservicet/auth/update',
    
    // Async Storage Keys
    ACCESS_TOKEN_KEY:   '@AccessToken',
    USERNAME_TOKEN_KEY: '@UserNameToken',
    USERNAME_KEY: '@UserName',
    USER_EMAIL_KEY: '@UserEmail',
    USER_PASSWORD_KEY: '@UserPassword',
    

    // Service section
    SERVICES_KEY:       '@Services',

    // Account section
    ACCOUNTS_KEY:       '@Accounts',

    // AUTH PROCESS DATA
    AUTHORIZED_STATE:   'authorized',
    UNAUTHORIZED_STATE: 'unauthorized'


};