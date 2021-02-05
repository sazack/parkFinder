/* There are many fields in the dataset with multi level nested objects,
with respect to timefreame  function choses certain fields over others
and only select first element in case of array of objects
 */

import {renderConstantPool} from '@angular/compiler-cli/ngcc/src/rendering/renderer';

export class ObjectDestructor {
  constructor() {}
  async restructureResponse(collection) {
    const finalObject  = [];
    const keyList = Object.keys(collection[0]);
    for (const key of keyList){
      for (const record of collection) {
        // deleteing this fields as geospatial fields are better suited to be displayed on Maps than table
        // Same with Directions, if the latlong could have been displayed on a map we could have just used Gmaps module for direction
        // activities had a separate end point and could have been a part of a subpage
        // fullName serves the purpose of the name field
        delete record.directionsInfo;
        delete record.latitude;
        delete record.longitude;
        delete record.latLong;
        delete record.directionsInfo;
        delete record.weatherInfo;
        delete record.topics;
        delete record.url;
        delete record.images;
        delete record.directionsUrl;
        delete record.name;
        delete record.parkCode;
        delete record.id;
        delete record.activities;
        //destructuring the multi level nesting to simplify the table. some of the multilevel objects could be a
        // separate request if the project is expanded and can be presentaed in a modal
        if (Array.isArray(record[key]) || typeof (record[key]) === 'object') {
          switch (key) {
            case 'entranceFees':
              if (record.entranceFees.length > 0){
                record.entranceFees = record.entranceFees[0].cost;
              } else {
                record.entranceFees = 'N/A';
              }
              break;
            case 'contacts':
              if (record.contacts.phoneNumbers.length > 0 ) {
              record.contacts = record.contacts.phoneNumbers[0].phoneNumber;
              } else {
                record.contacts = 'N/A';
              }
              break;
            case 'operatingHours':
              if (record.operatingHours.length > 0){
                record.operatingHours = record.operatingHours[0].standardHours;
              }
              break;
            case 'addresses':
              if (record.addresses.length > 0) {
                record.addresses = record.addresses[0].line1 + record.addresses[0].line2 + record.addresses[0].line3 +
                  record.addresses[0].city + ' ' + record.addresses[0].stateCode + ' ' + record.addresses[0].postalCode;
              }
              break;
            default:
              record[key] = record[key][0];
          }
        }
      }
    }
    return collection;
  }
}
