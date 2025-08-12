import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-24 w-24 mx-auto text-error" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-error mb-4">Oops!</h1>
                <h2 className="text-2xl font-semibold mb-6">Es ist ein Fehler aufgetreten</h2>
                
                <div className="bg-base-200 rounded-lg p-6 mb-8">
                    <p className="text-base-content/70 mb-4">
                        Es tut uns leid, aber etwas ist schiefgelaufen. Dies kann verschiedene Ursachen haben:
                    </p>
                    <ul className="text-left text-base-content/60 text-sm space-y-2">
                        <li>• Die angeforderte Seite konnte nicht gefunden werden</li>
                        <li>• Verbindungsprobleme zum Server</li>
                        <li>• Sie haben keine Berechtigung für diese Aktion</li>
                        <li>• Ein technischer Fehler ist aufgetreten</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                            onClick={handleGoBack}
                            className="btn btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Zurück
                        </button>
                        
                        <Link to="/locations" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Zur Startseite
                        </Link>
                    </div>

                    <p className="text-sm text-base-content/50">
                        Falls das Problem weiterhin besteht, wenden Sie sich an den Support.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorScreen;