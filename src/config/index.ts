import dotenv from 'dotenv'
dotenv.config()

export default{
    port:process.env.PORT ,
    db_url:process.env.DB_URL,
    saltRound:process.env.BCRYPT_SALT_ROUND ,
    default_password:process.env.DEFAULT_PASSWORD
}