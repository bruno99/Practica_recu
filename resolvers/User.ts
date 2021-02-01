import { Collection } from  "https://deno.land/x/mongo@v0.13.0/ts/collection.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import { TripSchema, CarSchema } from "../mongo/schema.ts";
import { IContext } from "../types.ts";

const User = {
    trips: async(parent: {email: string}, args:any, ctx: IContext):Promise<TripSchema[]> =>{
        const db = ctx.db;
        const TripsCollection:Collection<TripSchema> = db.collection<TripSchema>("Trips");
        const email = parent.email;
        
        return await TripCollection.find({$ort: [{driver: email}, {client: email}]});
        
    },
    
    car: async(parent: {email: string}, args: any, ctx: IContext):Promise<CarSchema> =>{
       const db = ctx.db;
       const CarsCollection: Collection<CarSchema> = db.collection<CarSchema>("Cars");
       const car = await CarsCollection.findOne({driver: parent.email });
       if(car) return car;
       throw new GQLError("Driver not found")
    
    }

}
