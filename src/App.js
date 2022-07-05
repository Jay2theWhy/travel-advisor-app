import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/map/Map";


const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    
    const [isLoading, setIsLoading] = useState(false);

    // rating and type filtering
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    // get initial coordinates of user
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, []);

    // fetch new data when rating changes
    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    // fetch new coordinates and bounds every time map is changed
    useEffect(() => {
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data);
                setFilteredPlaces([]);
                setIsLoading(false);
            })
    }, [type, coordinates, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        childClicked={childClicked}
                        isLoading={isLoading}
                        rating={rating}
                        setRating={setRating}
                        type={type}
                        setType={setType}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        setChildClicked={setChildClicked}
                    /> 
                </Grid>
                
            </Grid>
        </>
    )
}

export default App;