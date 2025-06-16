import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiService, type Location } from '../../services/api';
import noImage from '../../assets/noImage.png';

const LocationsListScreen: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const fetchLocations = useCallback(async () => {
        try {
            setError('');
            const data = await apiService.getLocations();
            setLocations(data);
        } catch (err) {
            console.error('Error fetching locations:', err);
            setError('Fehler beim Laden der Standorte');
            navigate('/error');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchLocations();

        // Set up automatic refresh every 120 seconds
        const interval = setInterval(fetchLocations, 120000);

        // Cleanup function
        return () => clearInterval(interval);
    }, [fetchLocations]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unbekannt';
        return new Date(dateString).toLocaleDateString('de-DE');
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex-1">
            {/* Welcome Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Standorte</h1>
                    <p className="text-base-content/70 mt-1">
                        Willkommen, {user?.name || user?.username}!
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/locations/add" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Standort hinzufügen
                    </Link>
                    <button onClick={handleLogout} className="btn btn-outline">
                        Abmelden
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Locations Grid */}
            {locations.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-base-content/50 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Keine Standorte vorhanden</h3>
                    <p className="text-base-content/70 mb-4">
                        Erstellen Sie den ersten Standort für Ihr Projekt.
                    </p>
                    <Link to="/locations/add" className="btn btn-primary">
                        Ersten Standort erstellen
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location) => (
                        <div key={location._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <figure className="h-48">
                                <img 
                                    src={location.image ? `http://localhost:8000${location.image}` : noImage} 
                                    alt={location.name}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {location.name}
                                    {location.category && (
                                        <div className="badge badge-secondary">{location.category}</div>
                                    )}
                                </h2>
                                
                                {location.description && (
                                    <p className="text-base-content/70 line-clamp-3">{location.description}</p>
                                )}
                                
                                <div className="text-sm text-base-content/60 mt-2">
                                    {location.street && location.city && (
                                        <p className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {location.street}, {location.zip} {location.city}
                                        </p>
                                    )}
                                    <p className="flex items-center gap-1 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Erstellt: {formatDate(location.createdAt)}
                                    </p>
                                </div>

                                {location.tags && location.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {location.tags.map((tag, index) => (
                                            <span key={index} className="badge badge-outline badge-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="card-actions justify-end mt-4">
                                    <Link 
                                        to={`/locations/${location._id}`} 
                                        className="btn btn-primary btn-sm"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Refresh Info */}
            <div className="text-center mt-8 text-sm text-base-content/50">
                <p>Die Liste wird automatisch alle 2 Minuten aktualisiert</p>
            </div>
        </div>
    );
};

export default LocationsListScreen;