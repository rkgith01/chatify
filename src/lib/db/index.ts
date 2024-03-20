// import { NeonQueryFunction, neon, neonConfig } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

// neonConfig.fetchConnectionCache = true;

// let dbString  = process.env.DATABASE_URL!
// // console.log(dbString)

// if(!dbString){
//     throw new Error ("Database url not found")
// }
// const sql: NeonQueryFunction<boolean, boolean> = neon(dbString!) 

// export const db = drizzle(sql)

import { NeonQueryFunction, neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";


// neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("database url not found");
}

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

if(!db){
    throw new Error("Database url not found");
}

