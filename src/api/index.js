//keep all api calls
import { DeleteSweep } from "@material-ui/icons";
import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359'
    },
    headers: {
      'X-RapidAPI-Key': '133ea77deemsh8258430ed30e8d9p14cb0fjsna9cb654234a9',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

export const getPlacesData = async (sw, ne) => {
    try {
        const {data: {data}} = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
              },
              headers: {
                'X-RapidAPI-Key': '133ea77deemsh8258430ed30e8d9p14cb0fjsna9cb654234a9',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}