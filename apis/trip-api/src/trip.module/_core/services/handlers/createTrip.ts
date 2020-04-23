import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { TripCreatedEvent } from "../events/TripEvents";
import { ITripRepository2 } from "../../models/ITripRepository2";
import { TripsMinimizedReducer } from "../mirroredReducers/TripsMinimizedReducer";
import { ITripsRepository } from "../../models/ITripsRepository";

export async function createTrip(
  e: TripCreatedEvent,
  tripRepository: ITripRepository2,
  tripsRepository: ITripsRepository
): Promise<ITrip> {
  const trip = {
    tripId: e.tripId,
    name: e.name,
    fromDate: e.fromDate,
    toDate: e.toDate,
    locations: [],
    infographics: [],
    isDeleted: false,
    createdById: e.ownerId,
    canContribute: false,
    isPublic: e.isPublic,
  };

  await tripRepository.create(e.ownerId, trip);
  
  const tripMinimizedReducer = new TripsMinimizedReducer();
  const minimizedState = await tripMinimizedReducer.transform(trip);

  await tripsRepository.create(e.ownerId, minimizedState);

  return trip;
}
