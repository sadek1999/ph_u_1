import dotenv from 'dotenv'

dotenv.config()

export default{
    node_dev:process.env.NODE_DEV,
    port:process.env.PORT ,
    db_url:process.env.DB_URL,
    saltRound:process.env.BCRYPT_SALT_ROUND ,
    default_password:process.env.DEFAULT_PASSWORD,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_access_expire_in:process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_expire_in:process.env.JWT_REFRESH_EXPIRE_IN,
   jwt_reset_password_ui_link:process.env.RESET_PASSWORD_UI_LINK,
}