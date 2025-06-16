import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiService, type Location } from '../../services/api';
import noImage from '../../assets/noImage.png';

const LocationDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocation = async () => {
            if (!id) {
                navigate('/error');
                return;
            }

            try {
                setError('');
                const data = await apiService.getLocation(id);
                setLocation(data);
            } catch (err) {
                console.error('Error fetching location:', err);
                setError('Fehler beim Laden des Standorts');
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id, navigate]);

    const canEdit = location && user && (location.user === user._id);

    const handleDelete = async () => {
        if (!location || !token || !canEdit) return;

        const confirmed = window.confirm(
            `Sind Sie sicher, dass Sie "${location.name}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
        );

        if (!confirmed) return;

        setDeleteLoading(true);
        try {
            await apiService.deleteLocation(location._id, token);
            navigate('/locations');
        } catch (err) {
            console.error('Error deleting location:', err);
            setError('Fehler beim Löschen des Standorts');
        } finally {
            setDeleteLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unbekannt';
        return new Date(dateString).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCoordinates = (lat?: number, lng?: number) => {
        if (lat === undefined || lng === undefined) return null;
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="container mx-auto p-4 flex-1">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Standort nicht gefunden</h1>
                    <Link to="/locations" className="btn btn-primary">
                        Zurück zur Liste
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex-1">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">{location.name}</h1>
                    {location.category && (
                        <div className="badge badge-secondary badge-lg">{location.category}</div>
                    )}
                </div>
                <div className="flex gap-2">
                    <Link to="/locations" className="btn btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Zurück zur Liste
                    </Link>
                    {canEdit && (
                        <>
                            <Link to={`/locations/edit/${location._id}`} className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Bearbeiten
                            </Link>
                            <button 
                                onClick={handleDelete}
                                className={`btn btn-error ${deleteLoading ? 'loading' : ''}`}
                                disabled={deleteLoading}
                            >
                                {!deleteLoading && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                )}
                                Löschen
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="alert alert-error mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Image */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img 
                                src={location.image ? `http://localhost:8000${location.image}` : noImage} 
                                alt={location.name}
                                className="w-full h-64 lg:h-96 object-cover"
                            />
                        </figure>
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Details</h2>
                            
                            <div className="space-y-3">
                                {location.description && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Beschreibung</h3>
                                        <p className="text-base-content/70">{location.description}</p>
                                    </div>
                                )}

                                {(location.street || location.city) && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Adresse</h3>
                                        <p className="text-base-content/70">
                                            {location.street && `${location.street}`}
                                            {location.street && (location.zip || location.city) && <br />}
                                            {location.zip && `${location.zip} `}
                                            {location.city}
                                            {location.country && location.country !== 'Germany' && (
                                                <><br />{location.country}</>
                                            )}
                                        </p>
                                    </div>
                                )}

                                {formatCoordinates(location.latitude, location.longitude) && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Koordinaten</h3>
                                        <p className="text-base-content/70 font-mono text-sm">
                                            {formatCoordinates(location.latitude, location.longitude)}
                                        </p>
                                    </div>
                                )}

                                {location.danger && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Gefahrenhinweis</h3>
                                        <p className="text-warning">{location.danger}</p>
                                    </div>
                                )}

                                {location.time_category && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Zeitkategorie</h3>
                                        <div className="badge badge-outline">
                                            {location.time_category === 'permanent' && 'Dauerhaft'}
                                            {location.time_category === 'temporary' && 'Temporär'}
                                            {location.time_category === 'seasonal' && 'Saisonal'}
                                        </div>
                                    </div>
                                )}

                                {location.tags && location.tags.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-base-content/80">Tags</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {location.tags.map((tag, index) => (
                                                <span key={index} className="badge badge-outline">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="divider"></div>

                                <div className="text-sm text-base-content/60">
                                    <p><strong>Erstellt:</strong> {formatDate(location.createdAt)}</p>
                                    {location.updatedAt && location.updatedAt !== location.createdAt && (
                                        <p><strong>Aktualisiert:</strong> {formatDate(location.updatedAt)}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetailScreen;