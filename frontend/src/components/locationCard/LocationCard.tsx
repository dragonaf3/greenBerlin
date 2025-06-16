import { useState } from 'react';
import type { Location } from '../../types';
import noImage from '../../assets/noImage.png';

interface Props {
    location: Location;
}

export const LocationCard = ({ location }: Props) => {
    const [likes, setLikes] = useState(0);

    // Wenn IMAGE vorhanden, baue vollständige URL,
    // sonst Fallback auf das lokale noImage.png
    const imgUrl = location.image
        ? location.image.startsWith('http')
            ? location.image
            : `${import.meta.env.VITE_API_URL}${location.image}`
        : noImage;

    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <figure>
                <img
                    src={imgUrl}
                    alt={location.name ?? 'No image available'}
                    className="w-full h-48 object-cover"
                />
            </figure>
            
            <div className="card-body flex-1 flex flex-col">
                <h2 className="card-title text-primary">{location.name}</h2>

                {location.description && (
                    <p className="text-base-content/70 flex-grow text-sm">{location.description}</p>
                )}

                <div className="text-sm text-base-content/60 space-y-1">
                    <p>{location.street}, {location.zip} {location.city}</p>
                    <p>Category: {location.category}</p>
                </div>

                <div className="card-actions justify-start mt-auto">
                    <button
                        onClick={() => setLikes((l) => l + 1)}
                        className="btn btn-primary btn-sm"
                    >
                        👍 Like ({likes})
                    </button>
                </div>
            </div>
        </div>
    );
};
