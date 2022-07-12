//keep all api calls
import { DeleteSweep } from "@material-ui/icons";
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
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

export const getWeatherData = async (lat, lng) => {
    try {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
            params: { lon: lng, lat: lat },
            headers: {
            'X-RapidAPI-Key': '133ea77deemsh8258430ed30e8d9p14cb0fjsna9cb654234a9',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
            }
        });

    return data;

    } catch (error){
        console.log(error)
    }
}