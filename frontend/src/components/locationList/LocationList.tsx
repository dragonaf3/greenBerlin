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
        <div className="flex-1 p-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                    {locations.map(loc => <LocationCard key={loc.id} location={loc}/>)}
                </div>
            </div>
        </div>
    );
};
