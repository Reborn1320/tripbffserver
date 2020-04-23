import { ITrip } from "./ITrip";

export interface ITripRepository2 {
  create: (ownerId: string, payload: ITrip) => Promise<ITrip>;
  update: (ownerId: string, tripId: string, payload: any) => Promise<ITrip>;
}
