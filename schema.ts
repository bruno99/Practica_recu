import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

const Schema = gql`

enum Role{
   CLIENT 
   DRIVER
   ADMIN 
 }
   
type Trip{
driver: User!
client: User!
car: Car!
_id: ID!
}


type Car{
driver: User!
plate: String!
available: Boolean!
}


type User{
   email: String!
   role: Role!
   token: String!
   car: Car
   trips: [Trip!]
}

input UserInput{
   email: String!
   role: Role!
   password: String!

type Queries {
   getTrips: [Trip!]!
   getCars: [Car!]!
   getDrivers: [User!]!
   getClients: [User!]!
}
type Mutations{
   addUser(data: UserInput): User!
   login(email: String, password: String): User!
   logout: Boolean!
   addCar(plate:String): Car!
   setAvaliability(av: Boolean!): Car!
   rentCar: Trip!
}

export { Schema as default};
