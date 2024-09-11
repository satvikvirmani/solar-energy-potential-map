'use client'

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Rectangle } from '@react-google-maps/api';

const LocationMap = ({ pos, bbox }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: pos[0],
        lng: pos[1]
    };

    const rectangleBounds = {
        north: bbox.lat2,
        south: bbox.lat1,
        east: bbox.lon2,
        west: bbox.lon1,
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center} />
                {bbox && <Rectangle bounds={rectangleBounds} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default LocationMap;