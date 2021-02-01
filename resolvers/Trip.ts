import { Collection } from  "https://deno.land/x/mongo@v0.13.0/ts/collection.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import { CarSchema, Role, UserSchema } from "../mongo/schema.ts";
import { IContext } from "../types.ts";



const Trip = {
   driver: async (parent: {driver: string}, args: any, ctx: IContext):Promise<UserSchema> => {
      const email = parent.driver;
      const db = ctx.db;
      const UsersCollection: Collection<UserSchema> = db.collection<UserSchema>("Users"):
      const driver = await UserCollection.findOne({email, role: Role.DRIVER});
      if(driver) return driver;
      throw GQLError("Driver not found");
   },
   client: async (parent: {client: string}, args: any, ctx: IContext):Promise<UserSchema> => {
      const email = parent.client;
      const db = ctx.db;
      const UsersCollection: Collection<UserSchema> = db.collection<UserSchema>("Users"):
      const client = await UsersCollection.findOne({email, role: Role.CLIENT});
      if(client) return client;
      throw GQLError("Client not found");
   },
   car: async (parent: {car: string}, args: any, ctx: IContext):Promise<CarSchema> => {
      const plate = parent.car;
      const db = ctx.db;
      const CarsCollection: Collection<CarrSchema> = db.collection<CarSchema>("Cars"):
      const plate = await CarsCollection.findOne({plate});
      if(car) return car;
      throw GQLError("Car not found");
   },
   
};
