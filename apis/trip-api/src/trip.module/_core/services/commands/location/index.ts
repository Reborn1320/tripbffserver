import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { UpdateLocationFeelingCommand, UpdateLocationFeeling } from "./updateFeeling"
import { CommandFunc } from "../_commandHandler";
import { UpdateLocationActivityCommand, UpdateLocationActivity } from "./updateActivity";
import { UpdateLocationAddressCommand, UpdateLocationAddress } from "./updateLocationAddress";

export type LocationCommand = RemoveLocationCommand | 
                              AddLocationCommand | 
                              UpdateLocationFeelingCommand |
                              UpdateLocationActivityCommand |
                              UpdateLocationAddressCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  UpdateLocationFeeling,
  UpdateLocationActivity,
  UpdateLocationAddress
]