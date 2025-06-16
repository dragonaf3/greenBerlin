import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username.trim() || !password.trim()) {
            setError('Benutzername und Passwort sind erforderlich');
            setLoading(false);
            return;
        }

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/locations');
            } else {
                setError('Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.');
            }
        } catch (err) {
            setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-primary">Green Berlin</h1>
                        <p className="text-base-content/70 mt-2">Anmelden um fortzufahren</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Benutzername *</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Benutzername eingeben"
                                className="input input-bordered w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Passwort *</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Passwort eingeben"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Anmeldung läuft...' : 'Anmelden'}
                            </button>
                        </div>
                    </form>

                    <div className="divider">Testdaten</div>
                    <div className="text-xs text-base-content/60 text-center">
                        <p><strong>Testbenutzer:</strong></p>
                        <p>Benutzername: qa-tester</p>
                        <p>Passwort: password</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;