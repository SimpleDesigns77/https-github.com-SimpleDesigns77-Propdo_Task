import React, { useContext } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useControl } from 'react-map-gl';
import DataContext from '../../Context/LocationContext'

const REACT_APP_MAP_TOKEN =
    'pk.eyJ1Ijoiam9obmF0aGFubWVlcmYxMTIyIiwiYSI6ImNsM2s1bDgxbTAweXozaW56NDhvbTM3ZXAifQ.aPxOdLuRHKeak6rRc04EHA'

const Geocoder = () => {
    const { setLat, setLng } = useContext(DataContext);
    const cl = new MapboxGeocoder({
        accessToken: REACT_APP_MAP_TOKEN,
        marker: false,
        collapsed: false

    })
    useControl(() => cl)
    cl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        setLng(coords[0]);
        setLat(coords[1]);
    })

    return (
        <div>Geocoder</div>
    )
}

export default Geocoder;