import { ITrip } from "../../models/ITrip";
import { TripLocationUpdatedActivityEvent } from "../events";
import _ from "lodash";

export function updateLocationActivity(
  prevState: ITrip,
  event: TripLocationUpdatedActivityEvent
): ITrip {

  return {
    ...prevState,
    locations: prevState.locations.map(item => {
        return item.locationId !== event.locationId ? item : {
            ...item,
            activity: {
                activityId: event.activityId,
                label: event.activityLabel,
                icon: event.activityIcon
            }
        }
    })
  };
}