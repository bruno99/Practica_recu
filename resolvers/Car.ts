import { Collection } from  "https://deno.land/x/mongo@v0.13.0/ts/collection.ts";
import { CarSchema } from "../mongo/schema.ts";
import { IContext } from "../types.ts";



const Car = {
    driver: async(parent: { driver: string }, args: any, ctx: IContext):Promise<UserSchema> => {
        const db = ctx.db;
        const UsersCollection: Collection<UserSchema> = db.collection>UserSchema>("Users");
        const driver = await UserCollection.finOne({email: parent.driver, role: Role.DRIVER
        
        if(driver) return driver;
        throw new GQLError("Driver not found");
    }
}
