import { Server } from "hapi";
import { Err } from "../_shared/utils";
import { IoC } from "./IoC";
import { CUtils } from "./ControllerUtils";
import uuid4 from 'uuid/v4';
import { IHighlight } from "./_core/models/ITrip";
import moment = require("moment");

const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;
const dataSourceQueryHandler = IoC.dataSourceQueryHandler;
const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    const locationsSchema = Joi.array().items(
      Joi.object({
        name: Joi.string(),
        fromTime: Joi.string(),
        toTime: Joi.string(),
        location: Joi.object({
          long: Joi.number().required(),
          lat: Joi.number().required(),
          address: Joi.string()
        }),
        images: Joi.array().items(
          Joi.object({
            url: Joi.string().required(),
            time: Joi.date().required()
          })
        )
      })
    );

    const locationSchema = Joi.object({
      name: Joi.string(),
      fromTime: Joi.string(),
      toTime: Joi.string(),
      location: Joi.object({
        long: Joi.number(),
        lat: Joi.number(),
        
        address: Joi.string()
      }),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string()
        })
      )
    })

    //todo merge 2 addLocation into one endpoint
    server.route({
      method: "POST",
      path: "/trips/{id}/locations",
      handler: async function(request) {
        try {
          console.log("POST", request.url.path);
          var selectedLocations = request.payload as any;
          // console.log("selectedLocations", selectedLocations);
          var tripId = request.params.id;
          const ownerId = CUtils.getUserId(request);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "importTrip",
            ownerId,
            tripId: tripId,
            locations: selectedLocations
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId);
            if (!queryResult) return Err("can't get data after import trip");

            // console.log(queryResult);
            return queryResult;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: POST /trips/{id}/locations");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationsSchema
        }
      }
    });

    server.route({
      method: "POST",
      path: "/trips/{id}/locations/addLocation",
      handler: async function(request) {
        try {
          console.log("POST", request.url);
          var selectedLocation = request.payload as any;
          var tripId = request.params.id;
          const ownerId = CUtils.getUserId(request);
          
          selectedLocation.locationId = uuid4();

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "AddLocation",
            ownerId,
            tripId: tripId.toString(),
            location: selectedLocation
          });

          commandResult.data = selectedLocation.locationId;
          return commandResult;
        } catch (error) {
          console.log("ERROR: POST /trips/{id}/locations/addLocation");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationSchema
        }
      }
    });

    server.route({
      method: "DELETE",
      path: "/trips/{tripId}/locations/{locationId}",
      handler: async function(request) {
        try {
          console.log("DELETE", request.url.path);
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;

          const ownerId = CUtils.getUserId(request);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "RemoveLocation",
            ownerId,
            tripId,
            locationId,
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId.toString());
            if (!queryResult) return Err("can't get data after import trip");

            // console.log(queryResult);
            return queryResult;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: DELETE /trips/{tripId}/locations/{locationId}");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/feeling",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var feeling = request.payload as any;
          console.log('feeling: ' + JSON.stringify(feeling));

          if (feeling) {
            const ownerId = CUtils.getUserId(request);
  
            var commandResult = await tripCommandHandler.exec({
              type: "UpdateLocationFeeling",
              ownerId,
              tripId,
              locationId,
              feelingId: feeling.feelingId,
              label_en: feeling.label_en,
              label_vi: feeling.label_vi,
              feelingIcon: feeling.icon
            });
  
            if (commandResult.isSucceed) 
              return "Success!";

            console.log("err: " + commandResult.errors);
            return commandResult.errors;
          }
          else {
            return "Selected feeling does not exists!";
          }
        } catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/feeling");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });    
 
    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/activity",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var activity = request.payload as any;

          if (activity) {
            const ownerId = CUtils.getUserId(request);

            var commandResult = await tripCommandHandler.exec({
              type: "UpdateLocationActivity",
              ownerId,
              tripId,
              locationId,
              activityId: activity.activityId,
              label_en: activity.label_en,
              label_vi: activity.label_vi,
              activityIcon: activity.icon
            });
  
            if (commandResult.isSucceed) 
              return "Success!";

            console.log("err: " + commandResult.errors);
            return commandResult.errors;
          }
          else {
            return "Selected activity does not exists!";
          }
        } catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/activity");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });    

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/highlights",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var highlights = request.payload as Array<IHighlight>;
          console.log('selected highlights: ' + JSON.stringify(highlights));
          
          if (highlights) {
            const ownerId = CUtils.getUserId(request);
    
            var commandResult = await tripCommandHandler.exec({
              type: "UpdateLocationHighlight",
              ownerId,
              tripId,
              locationId,
              highlights
            });
  
            if (commandResult.isSucceed) 
              return "Success!";
  
            console.log("err: " + commandResult.errors);
            return commandResult.errors;
          }
          else 
            return "Please select at least 1 highlight!";
        } catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/highlights");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });    

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/description",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var { description } = request.payload as any;    

          const ownerId = CUtils.getUserId(request);
    
          var commandResult = await tripCommandHandler.exec({
            type: "UpdateLocationDescription",
            ownerId,
            tripId,
            locationId,
            description
          });
  
          if (commandResult.isSucceed) 
            return "Success!";

          console.log("err: " + commandResult.errors);
          return commandResult.errors;           
        } catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/description");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });    

    server.route({
      method: "GET",
      path: "/trips/{id}/locations",
      handler: async function(request) {
        try {
          var tripId = request.params.id;
          const userId = CUtils.getUserId(request);          
          var queryResult = await tripQueryHandler.GetById(userId, tripId.toString());
          if (!queryResult) return Err("can't get data after import trip");
          return queryResult;

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        }
      }
    });

    //todo change the way we handle uploadImage
    //todo + add preUploadImage - return to s3 with signed url
    //todo + uploadImage is only for UPDATE EXTERNAL STORAGE ID
    //todo + get image now redirect to a s3 signed url
    //todo + the same for thumbnail:
    //       + download the image
    //       + build a thumbnail
    //       + upload thumbnail image
    //       + then return s3 signed url

    server.route({
      method: "GET",
      path: "/trips/{tripId}/preUploadImage",
      handler: async function(request) {
        console.log("GET /trips/{tripId}/preUploadImage");

        try {
          const { tripId } = request.params;
          const { mimeType } = request.query as any;

          var category = `trips/${tripId}`;
          const result = await IoC.fileService.signUpload(category, mimeType);
          console.log("signed result", result);
          return result;

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "POST",
      path: "/trips/{tripId}/uploadImage",
      handler: async function(request) {
        console.log("POST /trips/{tripId}/uploadImage");

        try {
          const { tripId } = request.params;
          const {
            locationId,
            imageId,
            fullPath
          } = request.payload as any;
          const ownerId = CUtils.getUserId(request);

          const { externalId } = await IoC.fileService.save(fullPath);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "uploadImage",
            ownerId,
            tripId,
            locationId,
            imageId,
            externalStorageId: externalId
          });

          if (commandResult.isSucceed) {
            var thumbnailExternalUrl = await tripQueryHandler.getThumbnailUrlByExternalId(externalId);
            var externalUrl = await tripQueryHandler.getExternalUrlByExternalId(externalId);
            return { externalId, thumbnailExternalUrl, externalUrl };
          }
    
          return commandResult.errors;

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"]
      }
    });

    // server.route({
    //   method: "GET",
    //   path: "/trips/{tripId}/images/{imageId}",
    //   handler: async function (request, h) {
    //     console.log("/asd");
    //     const { tripId, imageId } = request.params;

    //     var category = `trips/${tripId}/${imageId}.jpg`;
    //     const result = await IoC.fileService.signGet(category);
    //     return h.redirect(result);
    //   }
    // });

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/address",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var { name, address, long, lat } = request.payload as any;

          const ownerId = CUtils.getUserId(request);

          var commandResult = await tripCommandHandler.exec({
            type: "UpdateLocationAddress",
            ownerId,
            tripId,
            locationId,
            name,
            address,
            long,
            lat
          });

          if (commandResult.isSucceed) 
            return "Success!";

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        }
        catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/address");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/images/{imageId}",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var imageId: string = request.params.imageId;

          var { isFavorite } = request.payload as any;

          const ownerId = CUtils.getUserId(request);

          var commandResult = await tripCommandHandler.exec({
            type: "FavoriteLocationImage",
            ownerId,
            tripId,
            locationId,
            imageId,
            isFavorite,
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId);
            if (!queryResult) return Err("can't get data after update trip location image");
            return queryResult;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        }
        catch (error) {
          console.log("ERROR: PATCH /trips/{tripId}/locations/{locationId}/images/{imageId}");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: {
            isFavorite: Joi.boolean().description("mark the image favorite/highlighted or not"),
          }
        }
      }
    });

    server.route({
      method: "POST",
      path: "/trips/{tripId}/locations/{locationId}/images",
      handler: async function(request) {
        try {
          const tripId: string = request.params.tripId;
          const locationId: string = request.params.locationId;
          const { url, time } = request.payload as any;

          const ownerId = CUtils.getUserId(request);
          const imageId = uuid4();


          var commandResult = await tripCommandHandler.exec({
            type: "AddLocationImage",
            ownerId,
            tripId,
            locationId,
            imageId, url, time: moment(time)
          });

          if (commandResult.isSucceed) {
            return imageId;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        }
        catch (error) {
          console.log("ERROR: POST /trips/{tripId}/locations/{locationId}/images");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: {
            url: Joi.string().description("storage url in mobile device"),
            time: Joi.string().description("time taken"),
          }
        }
      }
    });

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/locations/{locationId}/images",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          console.log(request.payload);
          var { deletingIds } = request.payload as any;

          const ownerId = CUtils.getUserId(request);

          var commandResult = await tripCommandHandler.exec({
            type: "RemoveLocationImages",
            ownerId,
            tripId,
            locationId,
            imageIds: deletingIds,
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId);
            if (!queryResult) return Err("can't get data after import trip");
            const newLoc = queryResult.locations.find(loc => loc.locationId == locationId);
            console.log(newLoc && newLoc.images.length)
            return newLoc;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        }
        catch (error) {
          console.log("ERROR: DELETE /trips/{tripId}/locations/{locationId}/images");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: {
            deletingIds: Joi.array().description("delete image with list of ids"),
          }
        }
      }
    });
  }
};
