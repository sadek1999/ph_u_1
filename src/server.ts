import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let port=3000;



async function main() {
    await mongoose.connect(config.db_url as string);
    
    
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
      })
  }

 main()