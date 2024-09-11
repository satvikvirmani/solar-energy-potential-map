'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Rectangle = dynamic(() => import("react-leaflet").then(mod => mod.Rectangle), { ssr: false });

const LocationMap = ({ pos, bbox }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    
    return (
        <MapContainer className='w-full h-96' center={pos} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pos} />
            {bbox && <Rectangle bounds={[[bbox.lat1, bbox.lon1], [bbox.lat2, bbox.lon2]]} />}
        </MapContainer>
    );
}

export default LocationMap;