import type {Location} from "../types";

export const fetchLocations = async (): Promise<Location[]> => {
    const res = await fetch("http://localhost:3000/locations"); //TODO: API des Backends einfügen
    return res.json();
};