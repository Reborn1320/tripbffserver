import { Moment } from "moment";

export interface ITrip {
  id: string,
  name: string,
  fromDate: Moment,
  toDate: Moment,
  locations: Array<ITripLocation>
}

export interface ITripLocation {
    locationId: string,
    location: {
        long: number,
        lat: number,
        address: string,
    },
    fromTime: Moment,
    toTime: Moment,
    images: Array<ITripLocationImage>
}

export interface ITripLocationImage {
    imageId: string,
    url: string, //url stored in local mobile
    externalStorageId?: string, //this id will exist after image binary is uploaded to server
}