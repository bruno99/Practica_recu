import {Database} from "https://deno.land/x/mongo@v0.12.1/mod.ts";
Import {Collection, Database} from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import { IContext, IUser, ITrip, ICar } from "../types.ts"
import { CarSchema, UserSchema, TripSchema } from "../mongo/schema.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";



 interface IGetCarArgs {
  plate: string;
}

interface IGetStatusArgs {
  avialable: available;
}

export const Query = {
 
  getCar: async(parent: any, args; aby, ctx: IContext): Promise<CarSchema[]> => {
       const db: Database = ctx.db;
      const carsCollection = db.collection<CarSchema>("Cars");
      const cars = await coarsCollection.find();
      const result = cars.map((t) => {
        return {
          ...t,
          plate: t.plate.toString(),
        };
      });
      return result;
    } catch (e) {
      throw new GQLError(e);
   },
 
 
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
   },
 getDrivers: async(parent: any, args: any, ctx: IContext); Promise<UserSchema[]> => {
     const db = ctx.db;
 
     const UserCollection: Collection>UserSchema> = db.collection<UserSchema>("Users");
 
     return await UserCollection.find({ role: Role:DRIVER });
 },
  getClients: async(parent: any, args: any, ctx: IContext); Promise<UserSchema[]> => {
     const db = ctx.db;
 
     const UserCollection: Collection>UserSchema> = db.collection<UserSchema>("Users");
 
     return await UserCollection.find({ role: Role:CLIENT });
 },
   getStatus: async ( parent: any, args: IGetCarArgs, ctx: IContext): Promise<CarSchema>[] | null> => {
 
      const db: Database = ctx.db;
      const cars = db.collection<CarSchema>("Cars");
      const car: CarSchema | null = await cars.findOne({ available: args.available });

      let available: string;
      if (car) {
        available = car.available.toString();
        return {...car, available};
      }

      return null;
    catch (e) {
      throw new GQLError(e);
    }
  },
 
      
   
};

export {Query}
