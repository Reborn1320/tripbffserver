import { LeafTransformer } from "./typings";
import _ from "lodash";
import { InfographicRendererConfig } from "../plugins/index.renderer";

export const leafLocationImage: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    const imgUri =
      trip.locations[cursor.location].signedUrl &&
      !_.isEmpty(trip.locations[cursor.location].signedUrl)
        ? trip.locations[cursor.location].signedUrl
        : "./data/images/EmptyImage01.jpg";

    return {
      ...c,
      type: "image",
      url: imgUri,
    } as InfographicRendererConfig.Block;
  },
};
