import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { TripDeletedEvent } from "../events/TripEvents";
import { ITripRepository2 } from "../../models/ITripRepository2";
import { TripsMinimizedReducer } from "../mirroredReducers/TripsMinimizedReducer";
import { ITripsRepository } from "../../models/ITripsRepository";

export async function deleteTrip(
  e: TripDeletedEvent,
  tripRepository: ITripRepository2,
  tripsRepository: ITripsRepository
): Promise<ITrip> {
  const { isDeleted } = e;

  const tripId = e.tripId;
  const ownerId = e.ownerId;
  const payload = {
    ownerId,
    isDeleted
  }
  let state = await tripRepository.update(ownerId, tripId, payload);

  const tripMinimizedReducer = new TripsMinimizedReducer();
  const minimizedState = await tripMinimizedReducer.transform(state);

  await tripsRepository.update(ownerId, minimizedState);

  return state;
}
