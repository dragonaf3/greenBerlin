import { useState } from "react";
import type {Location} from "../../types";

interface Props {
    location: Location;
}

export const LocationCard = ({ location }: Props) => {
    const [likes, setLikes] = useState(0);

    return (
        <div className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-bold text-blue-800">{location.title}</h2>
            <p>{location.street}, {location.zip} {location.city}</p>
            <p>Category: {location.category}</p>
            {location.image
                ? <img src={location.image} alt={location.title} className="w-full max-h-48 object-cover mt-2" />
                : <p className="text-red-500 mt-2">No image!</p>
            }
            <button onClick={() => setLikes(likes + 1)} className="mt-2 bg-green-500 text-white px-4 py-1 rounded">
                👍 Like ({likes})
            </button>
        </div>
    );
};