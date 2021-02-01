Import {Collection, Database} from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import { IContext, IUser } from "../types.ts"

 
export const Query = {
   getTrips: async (parent: any, args: any, ctx: IContext): Promise<TripSchema[]> => {
      const {user, db} = {...ctx};
      
      const TripsCollection: Collection<TripSchema> = db.collection("Trips");
      const trips = await TripsCollection.find();
      
      return trips;
   },
   getCars: async(parent: any, args; aby, ctx: IContext): Promise<CarSchema[]> => {
      const { db } = {...ctx};
      
      const CarsCollection:Collection<CarSchema> = db.collection<CarSchema>("Cars");
      
      return await CarsCollection.find();
      
   
   
}
