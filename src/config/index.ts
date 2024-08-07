import dotenv from 'dotenv'
dotenv.config()

export default{
    node_dev:process.env.NODE_DEV,
    port:process.env.PORT ,
    db_url:process.env.DB_URL,
    saltRound:process.env.BCRYPT_SALT_ROUND ,
    default_password:process.env.DEFAULT_PASSWORD,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET
}