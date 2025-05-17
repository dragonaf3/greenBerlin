import { useEffect, useState } from "react";
import { fetchLocations } from "../../data/fetchLocations";
import type {Location} from "../../types";
import { LocationCard } from "../locationCard/LocationCard";

export const LocationList = () => {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        fetchLocations().then(setLocations);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {locations.map(loc => <LocationCard key={loc.id} location={loc} />)}
        </div>
    );
};