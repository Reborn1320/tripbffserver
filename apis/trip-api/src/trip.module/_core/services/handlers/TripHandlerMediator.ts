import { ITrip } from "../../models/ITrip";
import { TripEvent } from "../events";

import { ITripRepository2 } from "../../models/ITripRepository2";
import { ITripsRepository } from "../../models/ITripsRepository";

import _ from "lodash";
import createInfographic from "../reducers/createInfographic";
import finishCreateInfographic from "../reducers/finishCreateInfographic";
import { removeLocation } from "../reducers/removeLocation";
import { addLocation } from "../reducers/addLocation";
import { TripCreatedEvent, TripUpdatedEvent } from "../events/TripEvents";
import { updateTripDateRange } from "../reducers/updateTripDateRange";
import { updateTripName } from "../reducers/updateTripName";
import { updateLocationFeeling } from "../reducers/updateLocationFeeling";
import { updateLocationActivity } from "../reducers/updateLocationActivity";
import { updateLocationAddress } from "../reducers/updateLocationAddress";
import { addTripLocationImage } from "../reducers/addTripLocationImage";
import { removeTripLocationImages } from "../reducers/removeTripLocationImages";
import { favorTripLocationImage } from "../reducers/favorTripLocationImage";
import { updateLocationHighlight } from "../reducers/updateLocationHighlight";
import { updateLocationDescription } from "../reducers/updateLocationDescription";
import finishShareInfographic from "../reducers/finishShareInfographic";

import { createTrip } from "./createTrip";
import { deleteTrip } from "./deleteTrip";

const tripHandlers: { [id: string]: Function } = {
  TripCreated: createTrip,
  TripDeleted: deleteTrip,
};

/**
 * This is also a mediator
 *
 * @export
 * @class TripReducers
 */
export class TripHandlerMediator {
  constructor(
    private TripRepository: ITripRepository2,
    private TripsRepository: ITripsRepository
  ) {}

  public async handle(event: TripEvent) {
    const func = tripHandlers[event.type];
    if (!func) {
      console.log(`event type ${event.type} does not supported yet`);
      return false;
    }

    await func(event, this.TripRepository, this.TripsRepository);
    return true;
  }
}
