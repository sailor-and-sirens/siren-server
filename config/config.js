// SERVER
exports.port = process.env.PORT || 3000;
exports.debug = false;
exports.log = false;

// DATABASE CONFIGURATION
exports.dbEnv = process.env.NODE_ENV || 'development';
exports.dbName = process.env.SIREN_DB_PROD || process.env.SIREN_DB_DEV;
exports.dbUrl = process.env.DATABASE_URL;
exports.dbUser = process.env.POSTGRES_USER;
exports.dbPwd = process.env.POSTGRES_PWD;
exports.dbChangeSchema = false;
exports.dbForceSync = {force: true};

// FACEBOOK INTEGRATION
exports.fbAppId = process.env.SIREN_FB_APP_ID;
