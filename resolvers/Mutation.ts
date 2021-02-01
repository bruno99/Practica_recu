import { Collection, Database } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

import { CarSchema, UserSchema, Trip Schema } from "../mongo/schema.ts";
import { IContext, ITrip, ICar, IUser } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface IRentCarArgs {
  trip: {
    id: string;
    client: string;
    driver: string;
    car: string;
  };
}
interface ISetAvaliabilityArgs {
  car: {
    plate:string;
    driver: string;
    available: string;
  };
}
export interface IAddCarArgs {
  car: {
    plate: string;
    driver: string;
    available: boolean;
  };
}

const Mutation = {
  rentCar: async (
    parent: any,
    args: IRentCarArgs,
    ctx: IContext
  ): Promise<boolean> => {
    try {
      console.log("Estoy aquí");
      const db: Database = ctx.db;
      const tripsCollection: Collection<TripSchema> = db.collection<TripSchema>(
        "Trips"
      );

      console.log(`id: ${args.trips.id}`);
      const found = await tripsCollection.findOne({ id: args.trips.id });
      if (found) throw new GQLError("trip con id que ya existe en la DB");

      const {id, client, cdriver, car } = args.trip;
      const trip {
        id,
        client: ctx.user.email,
        driver: ctx.user.email,
      };
      await tripsCollection.insertOne(trip);
      return true;
    } catch (e) {
      throw new GQLError(e);
    }
  },
 
 setAvaliability: async (
    parent: any,
    args: ISetAvaliabilityArgs,
    ctx: IContext
  ): Promise<boolean> => {
    try {
      const db: Database = ctx.db;
      const carCollection: Collection<CarSchema> = db.collection<arSchema>(
        "Cars"
      );

      const found = await carsCollection.find({ id: args.car.id });
      if (!found) throw new GQLError("car does not exist");

      const { plate, driver, status } = args.car;
      const car = {
        plate,
        driver: ctx.user.email,
        available,
      };
 if(args.car.status == "FALSE){
  await carsCollection.updateOne({ id: args.id }, { available: "TRUE" });
  }else{
  await carsCollection.updateOne({ id: args.id }, { available: "FALSE" });
  }
      return true;
    } catch (e) {
      throw new GQLError(e);
    }
  },

  
  addCar: async (
    parent: any,
    args: IAddCarArgs,
    ctx: IContext,
    info: any
  ): Promise<boolean> => {
    try {
      const db: Database = ctx.db;
      const carsCollection = db.collection<CarSchema>("CarsCollection");
      const usersCollection = db.collection<UsuarioSchema>("UsersCollection");

      const found = await carsCollection.findOne({
        plate: args.car.plate,
      });
      if (found) throw new GQLError("Car already exists");

      const car = {
        plate: args.car.plate,
        driver: ctx.user.email,
        available: args.car.available,
      };
      await carsCollection.insertOne(car);

      await usersCollection.updateOne(
        { email: ctx.user.email },
        { $set: { car: args.car.plate } }
      );

      return true;
    } catch (e) {
      console.log(e);
      throw new GQLError(e);
    }
  },
  addUser: async (
    parent: any,
    args: { email: string; password: string },
    ctx: IContext
  ):Promise<Boolean> => {
    try {
      const exists = await ctx.db
        .collection<UserSchema>("Users")
        .findOne({ email: args.email });
      if (exists) {
        throw new GQLError(`User with email ${args.email} already exists`);
      }
      await ctx.db
        .collection<UserSchema>("Users")
        .insertOne({ email: args.email, password: args.password, token: "" });
      return true;
    } catch (e) {
      throw new GQLError(e);
    }
  },

  login: async (
    parent: any,
    args: { email: string; password: string },
    ctx: IContext
  ): Promise<string> => {
    try {
      const exists = await ctx.db
        .collection<UserSchema>("Users")
        .findOne({ email: args.email, password: args.password });
      if (exists) {
        const token = v4.generate();
        await ctx.db
          .collection<UserSchema>("Users")
          .updateOne({ email: args.email }, { $set: { token } });
        setTimeout(() => {
          ctx.db
            .collection<UserSchema>("Users")
            .updateOne({ email: args.email }, { $set: { token: "" } });
        }, 60 * 60 * 1000);
        return token;
      } else {
        throw new GQLError("User and password do not match");
      }
    } catch (e) {
      throw new GQLError(e);
    }
  },

  logout: async (parent: any, args: {}, ctx: IContext): Promise<boolean> => {
    try {
      const exists = await ctx.db
        .collection<UserSchema>("Users")
        .findOne({ email: ctx.user.email, token: ctx.user.token });
      if (exists) {
        await ctx.db
          .collection<UserSchema>("Users")
          .updateOne({ email: ctx.user.email }, { $set: { token: "" } });
        return true;
      } else {
        throw new GQLError("Unexpected error");
      }
    } catch (e) {
      throw new GQLError(e);
    }
  },


};

export {Mutation }
