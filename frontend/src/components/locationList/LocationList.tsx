import {useEffect, useState} from 'react';
import {fetchLocations} from '../../data/fetchLocations';
import {LocationCard} from '../locationCard/LocationCard';
import type {Location} from '../../types';

export const LocationList = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    useEffect(() => {
        fetchLocations().then(setLocations);
    }, []);
    return (
        <div className="location-list">
            {locations.map(loc => <LocationCard key={loc.id} location={loc}/>)}
        </div>
    );
};
