import { useState } from 'react';
import type { Location } from '../../types';

interface Props {
    location: Location;
}

export const LocationCard = ({ location }: Props) => {
    const [likes, setLikes] = useState(0);

    // Wenn IMAGE vorhanden, baue vollständige URL:
    const imgUrl = location.image
        ? location.image.startsWith('http')
            ? location.image
            : `${import.meta.env.VITE_API_URL}${location.image}`
        : null;

    return (
        <div className="location-card">
            {/* Bild oder Fallback */}
            {imgUrl ? (
                <img src={imgUrl} alt={location.name} />
            ) : (
                <div className="no-image">No image!</div>
            )}

            {/* Inhalt */}
            <h2>{location.name}</h2>

            {location.description && (
                <p className="description">{location.description}</p>
            )}

            <p>
                {location.street}, {location.zip} {location.city}
            </p>
            <p>Category: {location.category}</p>

            {/* Like-Button */}
            <button onClick={() => setLikes(likes + 1)} className="btn-like">
                👍 Like ({likes})
            </button>
        </div>
    );
};
