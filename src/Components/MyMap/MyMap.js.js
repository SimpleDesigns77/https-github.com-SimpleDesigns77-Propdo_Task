import React, { useRef, useEffect, useContext } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import Geocoder from '../Geocoder/Geocoder';
import DataContext from '../../Context/LocationContext'
import './MyMap.scss'

const MyMap = () => {
    const { lat, setLat, lng, setLng } = useContext(DataContext);
    const locationRef = useRef();

    useEffect(() => {
        if (locationRef?.current) {
            locationRef.current.flyTo({
                center: [lng, lat],
                zoom: 10
            });
        }
    }, [lng, lat])

    return (
        <div className='app_flex'>
            <Map
                ref={locationRef}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    center: [lng, lat],
                    zoom: 8
                }}
                style={{ width: '80vw', height: '70vh' }}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                onClick={(e) => {
                    setLat(e.lngLat.lat);
                    setLng(e.lngLat.lng);
                }}

            >
                <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={(e) => {
                        setLat(e.lngLat.lat);
                        setLng(e.lngLat.lng);
                    }}
                />
                <NavigationControl position='bottom-right' />
                <GeolocateControl
                    position='top-left'
                    trackUserLocation
                    onGeolocate={(e) => {
                        setLat(e.coords.latitude);
                        setLng(e.coords.longitude);
                    }}
                />
                <Geocoder />
            </Map>
            <div className='app_flex'>
                <div className='app_input'>
                    <label htmlFor='latitude'>latitude </label>
                    <input id='latitude' type='text' placeholder='insert latitude' value={lat} onChange={(e) => setLat(e.target.value)} />
                </div>
                <div className='app_input'>
                    <label htmlFor='longitude'>longitude </label>
                    <input id='longitude' type='text' placeholder='insert longitude' value={lng} onChange={(e) => setLng(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyMap;

