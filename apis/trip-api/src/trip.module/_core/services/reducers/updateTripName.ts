import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { TripNameUpdatedEvent } from "../events/TripEvents";

export function updateTripName(
  prevState: ITrip,
  command: TripNameUpdatedEvent
): ITrip {
  const { name, isPublic } = command;

  return {
    ...prevState,
    name: name,
    isPublic: isPublic,
  };
}
