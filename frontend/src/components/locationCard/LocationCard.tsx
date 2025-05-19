import {useState} from 'react';
import type {Location} from '../../types';

interface Props {
    location: Location;
}

export const LocationCard = ({location}: Props) => {
    const [likes, setLikes] = useState(0);
    return (
        <div className="location-card">
            <h2>{location.name}</h2>
            <p>{location.street}, {location.zip} {location.city}</p>
            <p>Category: {location.category}</p>
            {location.image
                ? <img src={location.image} alt={location.name}/>
                : <div className="no-image">No image!</div>
            }
            <button onClick={() => setLikes(likes + 1)} className="btn-like">
                👍 Like ({likes})
            </button>
        </div>
    );
};
