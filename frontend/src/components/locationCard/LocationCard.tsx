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
        <div className="location-card">
            {/* Bild (entweder remote oder lokales noImage.png) */}
            <img
                src={imgUrl}
                alt={location.name ?? 'No image available'}
            />

            {/* Inhalt */}
            <div className="card-content">
                <h2>{location.name}</h2>

                {location.description && (
                    <p className="description">{location.description}</p>
                )}

                <p>
                    {location.street}, {location.zip} {location.city}
                </p>

                <p>Category: {location.category}</p>

                {/* Like-Button */}
                <button
                    onClick={() => setLikes((l) => l + 1)}
                    className="btn-like"
                >
                    👍 Like ({likes})
                </button>
            </div>
        </div>
    );
};
