
export enum Role {
DRIVER = "CLIENT",
CLIENT = "DRIVER",
ADMIN = "ADMIN",
}
export interface ClientSchema{
     email: string;
     role: Role,
     password: string,
     token: string,
     
}
export interface CarSchema{
    plate: string;
    driver: string;
    available: boolean;
}

export interface TripSchema{
    _id: { $oid: string },
    driver: string,
    client: string;
    car: string;
}
