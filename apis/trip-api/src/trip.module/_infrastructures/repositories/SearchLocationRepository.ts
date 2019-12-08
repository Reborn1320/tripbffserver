import { ISearchLocationRepository } from "../../_core/models/ISearchLocationRepository";
import { SearchLocationDocument, ISearchLocationDocument } from "../models/SearchLocationModel";
import { ISearchLocationModel } from "../models/ISearchLocationModel";
import { ISearchLocation } from "../../_core/models/ISearchLocation";
import { DocumentQuery } from "mongoose";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export class SearchLocationRepository implements ISearchLocationRepository {
    toLocation(o: ISearchLocationModel): ISearchLocation {
        return {
            title: o.title,
            address: o.address,
            long: o.long,
            lat: o.lat
        }
    }

    public async list(query: string) {
        var locations: ISearchLocationDocument[] = [];

        if (query) {  
            var queryItems = query.split(' '),                
                queries: string[] = [],
                allQueryArrays: any[] = [];

            queryItems.forEach(item => {                
                item = item.toLowerCase();

                if (item.startsWith('d')) {
                    var newItem = item.replace('d', 'đ');
                    allQueryArrays.push([item, newItem]);
                }
                else {
                    allQueryArrays.push([item]);
                }
            });            

            var queries = this.allPossibleCases(allQueryArrays),
                numberOfQuery = queries.length;

            for (var i = 0; i < numberOfQuery; i++) {
                var phrase = "\"" + queries[i] + "\"";      
                var searchLocations = 
                    await SearchLocationDocument.find({ $text: { $search: phrase } }, { score: { $meta: "textScore" } })
                                                .sort( { score: { $meta: "textScore" } })
                                                .limit(6);   
                locations = locations.concat(searchLocations);
            }          
            
            if (locations.length > 6)
                locations = locations.slice(0, 6);
        }
        else {
            locations = await SearchLocationDocument.find();
        }
                
        return locations.map(f => this.toLocation(f));
    } 
    
    private allPossibleCases(arr: any[]) {
        var result: string[] = [];

        if (arr.length == 1) {
          result = arr[0];
        } 
        else {
          var allCasesOfRest: string[] = this.allPossibleCases(arr.slice(1));  // recur with the rest of array
          
          for (var i = 0; i < allCasesOfRest.length; i++) {
            for (var j = 0; j < arr[0].length; j++) {
              result.push(arr[0][j] + " " + allCasesOfRest[i]);
            }
          }
        }
      
        return result;
    }

    public async insertMany(locations: Array<ISearchLocation>) {        
        var searchLocationDocuments = locations.map(f => {
            return new SearchLocationDocument({
                title: f.title,
                address: f.address,
                long: f.long,
                lat: f.lat
            });
        });
        SearchLocationDocument.insertMany(searchLocationDocuments);
    }    
}

export default SearchLocationRepository