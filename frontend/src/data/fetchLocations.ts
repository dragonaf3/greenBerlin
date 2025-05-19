import type {Location} from "../types";

export const fetchLocations = async (): Promise<Location[]> => {
    const res = await fetch('/api/locations');
    return res.json();
};