import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {resolve} from 'path';
import {ObjectDestructor} from '../helpers/object.destructor';


export class ParkModelClass {
  constructor( ) {}
  async getAllParks(){
    const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=200&api_key=ruSZdExTr3vsjpc86dQaUihn45GgnTVHiQqo29cH');
    if (response) {
      //using object destructor to simplify the contents sent to the front end
      const objDes =  new ObjectDestructor();
      const result = await objDes.restructureResponse(response.data.data);
      return result;
    }
  }
}
