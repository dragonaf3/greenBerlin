import React from 'react';
import { Link } from 'react-router-dom';

const AboutScreen: React.FC = () => {
    return (
        <div className="container mx-auto p-4 flex-1">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Über Green Berlin</h1>
                    <p className="text-xl text-base-content/70">
                        Entdecken Sie nachhaltige Orte in Berlin
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Mission */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Unsere Mission
                            </h2>
                            <p className="text-base-content/70">
                                Green Berlin ist eine Plattform zur Erfassung und Dokumentation nachhaltiger, 
                                umweltfreundlicher und grüner Orte in Berlin. Unser Ziel ist es, Menschen dabei 
                                zu helfen, bewusste Entscheidungen für eine nachhaltigere Stadt zu treffen.
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Funktionen
                            </h2>
                            <ul className="space-y-2 text-base-content/70">
                                <li>• Standorte mit detaillierten Informationen erfassen</li>
                                <li>• Bilder und Beschreibungen hinzufügen</li>
                                <li>• Kategorisierung und Tags für bessere Übersicht</li>
                                <li>• Benutzerbasierte Verwaltung von Standorten</li>
                                <li>• Responsive Design für alle Geräte</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Technical Info */}
                <div className="card bg-base-100 shadow-xl mb-12">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Technische Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Frontend</h3>
                                <ul className="text-sm text-base-content/70 space-y-1">
                                    <li>• React 18 mit TypeScript</li>
                                    <li>• React Router für Navigation</li>
                                    <li>• DaisyUI für moderne UI-Komponenten</li>
                                    <li>• Tailwind CSS für Styling</li>
                                    <li>• Vite als Build-Tool</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Backend</h3>
                                <ul className="text-sm text-base-content/70 space-y-1">
                                    <li>• NestJS Framework</li>
                                    <li>• MongoDB mit Mongoose</li>
                                    <li>• JWT-basierte Authentifizierung</li>
                                    <li>• bcrypt für Passwort-Hashing</li>
                                    <li>• Multer für File-Uploads</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">Impressum & Datenschutz</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold mb-3">Verantwortlich für den Inhalt</h3>
                                <address className="text-base-content/70 not-italic">
                                    Green Berlin Team<br />
                                    Musterstraße 123<br />
                                    10117 Berlin<br />
                                    Deutschland<br /><br />
                                    E-Mail: info@greenberlin.de<br />
                                    Telefon: +49 30 12345678
                                </address>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-3">Datenschutz</h3>
                                <p className="text-base-content/70 text-sm mb-3">
                                    Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Diese Anwendung sammelt 
                                    nur die für die Funktionalität erforderlichen Daten.
                                </p>
                                <p className="text-base-content/70 text-sm">
                                    <strong>Erhobene Daten:</strong><br />
                                    • Benutzername und Passwort (verschlüsselt)<br />
                                    • Optional: E-Mail, Vor- und Nachname<br />
                                    • Standortdaten, die Sie eingeben<br />
                                    • Hochgeladene Bilder
                                </p>
                            </div>
                        </div>

                        <div className="divider my-6"></div>

                        <div className="text-sm text-base-content/60">
                            <p>
                                <strong>Haftungsausschluss:</strong> Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. 
                                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-12">
                    <Link to="/" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Zurück zur Hauptseite
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;