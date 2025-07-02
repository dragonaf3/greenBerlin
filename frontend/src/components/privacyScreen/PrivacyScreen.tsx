import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyScreen: React.FC = () => {
    return (
        <div className="container mx-auto p-4 flex-1">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Datenschutz</h1>
                    <p className="text-xl text-base-content/70">
                        Informationen zum Umgang mit Ihren Daten
                    </p>
                </div>

                {/* Privacy Policy */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Datenschutzerklärung
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Allgemeine Informationen</h3>
                                <p className="text-base-content/70 mb-3">
                                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung 
                                    informiert Sie darüber, wie wir mit Ihren Daten in unserer Green Berlin Anwendung umgehen.
                                </p>
                                <p className="text-base-content/70">
                                    Diese Anwendung sammelt nur die für die Funktionalität erforderlichen Daten und 
                                    behandelt diese vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Erhobene Daten</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Benutzerdaten:</h4>
                                        <ul className="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                                            <li>Benutzername (erforderlich)</li>
                                            <li>Passwort (verschlüsselt gespeichert)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Standortdaten:</h4>
                                        <ul className="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                                            <li>Von Ihnen eingegebene Standortinformationen</li>
                                            <li>Beschreibungen und Kategorien</li>
                                            <li>Hochgeladene Bilder</li>
                                            <li>Geografische Koordinaten (falls angegeben)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Zweck der Datenverarbeitung</h3>
                                <ul className="text-base-content/70 space-y-2 list-disc list-inside">
                                    <li>Bereitstellung der Anwendungsfunktionalität</li>
                                    <li>Benutzerauthentifizierung und -autorisierung</li>
                                    <li>Verwaltung und Anzeige von Standortdaten</li>
                                    <li>Technische Administration der Anwendung</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Datensicherheit</h3>
                                <p className="text-base-content/70 mb-3">
                                    Wir verwenden moderne Sicherheitsmaßnahmen zum Schutz Ihrer Daten:
                                </p>
                                <ul className="text-base-content/70 space-y-1 list-disc list-inside">
                                    <li>Passwörter werden mit bcrypt verschlüsselt</li>
                                    <li>JWT-basierte Authentifizierung</li>
                                    <li>Sichere Datenübertragung</li>
                                    <li>Rollenbasierte Zugriffskontrolle</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Ihre Rechte</h3>
                                <p className="text-base-content/70 mb-3">
                                    Sie haben folgende Rechte bezüglich Ihrer Daten:
                                </p>
                                <ul className="text-base-content/70 space-y-1 list-disc list-inside">
                                    <li>Auskunft über gespeicherte Daten</li>
                                    <li>Berichtigung unrichtiger Daten</li>
                                    <li>Löschung Ihrer Daten</li>
                                    <li>Einschränkung der Verarbeitung</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Kontakt</h3>
                                <p className="text-base-content/70">
                                    Bei Fragen zum Datenschutz wenden Sie sich an:<br />
                                    <strong>Green Berlin Team</strong><br />
                                    E-Mail: privacy@greenberlin.de<br />
                                    Telefon: +49 30 12345678
                                </p>
                            </div>
                        </div>

                        <div className="divider my-8"></div>

                        <div className="text-sm text-base-content/60">
                            <p>
                                <strong>Stand:</strong> Juli 2025<br />
                                Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden. 
                                Wesentliche Änderungen werden Ihnen mitgeteilt.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center">
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

export default PrivacyScreen;