import { UserSchema } from "./mongo/schema.ts"
import {Database} from "https://deno.land/x/mongo@v0.13.0/mod.ts";


export type IUser = UserSchema;
export interfacee IContext {
   db: Database;
   user: IUser;
}
  
