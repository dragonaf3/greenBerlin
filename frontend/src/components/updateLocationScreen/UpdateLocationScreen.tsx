import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiService, type Location } from '../../services/api';

const UpdateLocationScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [originalLocation, setOriginalLocation] = useState<Location | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        street: '',
        zip: '',
        city: '',
        country: 'Germany',
        category: '',
        danger: '',
        time_category: 'permanent',
        latitude: '',
        longitude: '',
        tags: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
                const location = await apiService.getLocation(id);
                
                // Check if user can edit this location
                const locationUserId = typeof location.user === 'string' ? location.user : location.user?._id;
                if (!user || locationUserId !== user._id) {
                    navigate('/error');
                    return;
                }

                setOriginalLocation(location);
                setFormData({
                    name: location.name || '',
                    description: location.description || '',
                    street: location.street || '',
                    zip: location.zip || '',
                    city: location.city || '',
                    country: location.country || 'Germany',
                    category: location.category || '',
                    danger: location.danger || '',
                    time_category: location.time_category || 'permanent',
                    latitude: location.latitude?.toString() || '',
                    longitude: location.longitude?.toString() || '',
                    tags: location.tags?.join(', ') || ''
                });
            } catch (err) {
                console.error('Error fetching location:', err);
                setError('Fehler beim Laden des Standorts');
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id, navigate, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!originalLocation || !token) return;

        setSaving(true);
        setError('');

        try {
            const submitData = new FormData();
            
            // Add form fields
            submitData.append('name', formData.name);
            if (formData.description) submitData.append('description', formData.description);
            if (formData.street) submitData.append('street', formData.street);
            if (formData.zip) submitData.append('zip', formData.zip);
            if (formData.city) submitData.append('city', formData.city);
            if (formData.country) submitData.append('country', formData.country);
            if (formData.category) submitData.append('category', formData.category);
            if (formData.danger) submitData.append('danger', formData.danger);
            submitData.append('time_category', formData.time_category);
            if (formData.latitude) submitData.append('latitude', formData.latitude);
            if (formData.longitude) submitData.append('longitude', formData.longitude);
            
            // Handle tags
            if (formData.tags.trim()) {
                const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                submitData.append('tags', JSON.stringify(tagsArray));
            }

            // Add file if selected
            if (selectedFile) {
                submitData.append('image', selectedFile);
            }

            await apiService.updateLocation(originalLocation._id, submitData, token);
            navigate(`/locations/${originalLocation._id}`);
        } catch (err) {
            console.error('Error updating location:', err);
            setError('Fehler beim Aktualisieren des Standorts');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!originalLocation) {
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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Standort bearbeiten</h1>
                    <p className="text-base-content/70 mt-1">
                        Bearbeiten Sie "{originalLocation.name}"
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link 
                        to={`/locations/${originalLocation._id}`} 
                        className="btn btn-outline"
                    >
                        Abbrechen
                    </Link>
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

            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Grundinformationen</h2>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name *</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name des Standorts"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Kategorie</span>
                            </label>
                            <input
                                type="text"
                                name="category"
                                placeholder="z.B. Park, Restaurant, Sehenswürdigkeit"
                                className="input input-bordered"
                                value={formData.category}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Beschreibung</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Beschreibung des Standorts"
                                className="textarea textarea-bordered h-24"
                                value={formData.description}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Adresse</h2>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Straße</span>
                            </label>
                            <input
                                type="text"
                                name="street"
                                placeholder="Straße und Hausnummer"
                                className="input input-bordered"
                                value={formData.street}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PLZ</span>
                            </label>
                            <input
                                type="text"
                                name="zip"
                                placeholder="Postleitzahl"
                                className="input input-bordered"
                                value={formData.zip}
                                onChange={handleInputChange}
                                pattern="[0-9]{5}"
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Stadt</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Stadt"
                                className="input input-bordered"
                                value={formData.city}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Land</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Land"
                                className="input input-bordered"
                                value={formData.country}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        {/* Coordinates */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Koordinaten</h2>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Breitengrad</span>
                            </label>
                            <input
                                type="number"
                                name="latitude"
                                placeholder="z.B. 52.5200"
                                className="input input-bordered"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                step="any"
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Längengrad</span>
                            </label>
                            <input
                                type="number"
                                name="longitude"
                                placeholder="z.B. 13.4050"
                                className="input input-bordered"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                step="any"
                                disabled={saving}
                            />
                        </div>

                        {/* Additional Information */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Zusätzliche Informationen</h2>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Zeitkategorie</span>
                            </label>
                            <select
                                name="time_category"
                                className="select select-bordered"
                                value={formData.time_category}
                                onChange={handleInputChange}
                                disabled={saving}
                            >
                                <option value="permanent">Dauerhaft</option>
                                <option value="temporary">Temporär</option>
                                <option value="seasonal">Saisonal</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Tags durch Komma getrennt"
                                className="input input-bordered"
                                value={formData.tags}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Gefahrenhinweis</span>
                            </label>
                            <textarea
                                name="danger"
                                placeholder="Warnung oder Gefahrenhinweis"
                                className="textarea textarea-bordered h-20"
                                value={formData.danger}
                                onChange={handleInputChange}
                                disabled={saving}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Bild</h2>
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Neues Bild hochladen (optional)</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                onChange={handleFileChange}
                                accept="image/*"
                                disabled={saving}
                            />
                            <div className="label">
                                <span className="label-text-alt">
                                    {originalLocation.image 
                                        ? 'Ein neues Bild wird das vorhandene ersetzen' 
                                        : 'JPG, PNG oder GIF (max. 5MB)'
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Current Image Preview */}
                        {originalLocation.image && (
                            <div className="md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Aktuelles Bild</span>
                                </label>
                                <div className="w-32 h-32">
                                    <img 
                                        src={`http://localhost:8000${originalLocation.image}`} 
                                        alt="Aktuelles Bild"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="card-actions justify-end mt-8">
                        <Link 
                            to={`/locations/${originalLocation._id}`} 
                            className="btn btn-outline"
                        >
                            Abbrechen
                        </Link>
                        <button 
                            type="submit" 
                            className={`btn btn-primary ${saving ? 'loading' : ''}`}
                            disabled={saving}
                        >
                            {saving ? 'Speichern...' : 'Änderungen speichern'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateLocationScreen;