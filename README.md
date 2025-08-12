# GreenBerlin

Eine moderne Webanwendung zur Verwaltung und Entdeckung grüner Standorte in Berlin. Das Projekt besteht aus einem React-Frontend und einem NestJS-Backend.

## 👥 Team
- Alexander Fiebig (Matrikelnummer: 586885)
- Georg Schwachula (Matrikelnummer: 587316)

## 🌟 Funktionen

- **Benutzerauthentifizierung**: JWT-basierte Anmeldung und Registrierung
- **Standortverwaltung**: Erstellen, Bearbeiten, Anzeigen und Löschen von Standorten
- **Bildupload**: Unterstützung für Standortbilder
- **Responsive Design**: Mobile-first Ansatz mit TailwindCSS
- **API-Dokumentation**: Automatisch generierte Swagger-Dokumentation
- **Moderne UI**: DaisyUI-Komponenten für eine ansprechende Benutzeroberfläche

## 🏗️ Projektstruktur

```
greenBerlin/
├── frontend/          # React Frontend
│   ├── src/
│   │   ├── components/    # React-Komponenten
│   │   ├── contexts/      # React Context (Auth)
│   │   ├── services/      # API-Services
│   │   └── assets/        # Statische Assets
│   ├── public/            # Öffentliche Dateien
│   └── package.json       # Frontend-Dependencies
│
├── backend/           # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Authentifizierung
│   │   ├── users/         # Benutzerverwaltung
│   │   ├── locations/     # Standortverwaltung
│   │   ├── shared/        # Gemeinsame Module
│   │   └── config/        # Konfigurationsdateien
│   ├── public/uploads/    # Hochgeladene Bilder
│   └── package.json       # Backend-Dependencies
│
└── README.md          # Diese Datei
```

## 🚀 Schnellstart

### Voraussetzungen

- Node.js (v18 oder höher)
- npm oder yarn
- MongoDB (lokal oder remote)

### Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd greenBerlin
   ```

2. **Backend einrichten**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend einrichten**
   ```bash
   cd frontend
   npm install
   ```

### Umgebungsvariablen

Erstelle eine `.env`-Datei im Backend-Verzeichnis:

```env
# MongoDB-Verbindung
MONGODB_URI=mongodb://localhost:27017/greenberlin

# JWT-Konfiguration
JWT_SECRET=dein_geheimer_jwt_schlüssel
JWT_EXPIRES_IN=7d

# Server-Konfiguration
PORT=8000
```

### Entwicklung starten

1. **Backend starten** (Port 8000)
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Frontend starten** (Port 5173)
   ```bash
   cd frontend
   npm run dev
   ```

Die Anwendung ist dann unter http://localhost:5173 verfügbar.

## 🛠️ Technologie-Stack

### Frontend
- **React 19** - UI-Framework
- **TypeScript** - Typisierte JavaScript-Entwicklung
- **React Router** - Client-seitige Routing
- **TailwindCSS** - Utility-first CSS-Framework
- **DaisyUI** - UI-Komponenten für TailwindCSS
- **Vite** - Build-Tool und Entwicklungsserver

### Backend
- **NestJS** - Node.js-Framework
- **TypeScript** - Typisierte JavaScript-Entwicklung
- **MongoDB** - NoSQL-Datenbank
- **Mongoose** - MongoDB-Object-Modeling
- **Passport.js** - Authentifizierung
- **JWT** - JSON Web Tokens
- **Swagger** - API-Dokumentation
- **Multer** - File-Upload-Middleware

## 📊 API-Endpunkte

### Authentifizierung
- `POST /auth/login` - Benutzer anmelden
- `POST /auth/register` - Neuen Benutzer registrieren

### Standorte
- `GET /locations` - Alle Standorte abrufen
- `GET /locations/:id` - Einzelnen Standort abrufen
- `POST /locations` - Neuen Standort erstellen (Auth erforderlich)
- `PUT /locations/:id` - Standort aktualisieren (Auth erforderlich)
- `DELETE /locations/:id` - Standort löschen (Auth erforderlich)

### Benutzer
- `POST /users` - Neuen Benutzer erstellen
- `GET /users/:id` - Benutzerdetails abrufen

## 🗄️ Datenmodelle

### Location (Standort)
```typescript
{
  name: string;           // Pflichtfeld
  description?: string;   // Beschreibung
  street?: string;        // Straße
  zip?: string;          // Postleitzahl
  city?: string;         // Stadt
  country?: string;      // Land (Standard: "Germany")
  category?: string;     // Kategorie
  danger?: string;       // Gefahrenhinweise
  temporary?: boolean;   // Temporär? (Standard: false)
  time_category?: string; // Zeitkategorie ('permanent', 'temporary', 'seasonal')
  latitude?: number;     // Breitengrad
  longitude?: number;    // Längengrad
  image?: string;        // Bildpfad
  tags?: string[];       // Tags
  user?: ObjectId;       // Benutzer-ID (Referenz)
  date?: Date;          // Erstellungsdatum
  incident_id?: number;  // Eindeutige Incident-ID
}
```

### User (Benutzer)
```typescript
{
  username: string;      // Eindeutiger Benutzername
  password: string;      // Gehashtes Passwort
  email?: string;        // E-Mail-Adresse
  firstName?: string;    // Vorname
  lastName?: string;     // Nachname
  role?: string;         // Rolle (Standard: "user")
  name?: string;         // Vollständiger Name
  avatar?: string;       // Avatar-Pfad (Standard: "none")
  id?: number;          // Eindeutige Benutzer-ID
}
```

## 🧪 Testing

### Backend-Tests
```bash
cd backend
npm run test        # Unit-Tests
npm run test:e2e    # End-to-End-Tests
npm run test:cov    # Test-Coverage
```

### Frontend-Tests
```bash
cd frontend
npm run test        # Tests ausführen
```

## 🔧 Scripts

### Backend
- `npm run start` - Produktion starten
- `npm run start:dev` - Entwicklungsserver mit Hot-Reload
- `npm run start:debug` - Debug-Modus
- `npm run build` - Projekt bauen
- `npm run lint` - Code-Linting
- `npm run format` - Code-Formatierung

### Frontend
- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Projekt für Produktion bauen
- `npm run preview` - Build-Vorschau
- `npm run lint` - Code-Linting

## 🔐 Sicherheit

- **JWT-Authentifizierung**: Sichere Token-basierte Authentifizierung
- **Password-Hashing**: Passwörter werden mit bcrypt gehashed
- **CORS**: Cross-Origin Resource Sharing aktiviert
- **Validation**: Input-Validierung mit class-validator
- **Protected Routes**: Frontend-Routes sind authentifizierungsgeschützt

## 📱 Features

### Benutzeroberfläche
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Dark/Light Theme**: Mit DaisyUI-Theming-System
- **Loading States**: Benutzerfreundliche Ladezustände
- **Error Handling**: Umfassende Fehlerbehandlung
- **Protected Routes**: Automatische Weiterleitung bei fehlender Authentifizierung

### Standortverwaltung
- **CRUD-Operationen**: Vollständige Verwaltung von Standorten
- **Bildupload**: Unterstützung für JPG, PNG, WebP
- **Kategorisierung**: Flexible Kategorien und Tags
- **Geolocation**: Koordinaten-Unterstützung
- **Temporäre Standorte**: Zeitbasierte Kategorisierung

## 🚀 Deployment

### Entwicklung
1. MongoDB-Server starten
2. Backend starten: `npm run start:dev`
3. Frontend starten: `npm run dev`

### Produktion
1. Backend bauen: `npm run build`
2. Frontend bauen: `npm run build`
3. Backend starten: `npm run start:prod`
4. Frontend-Build über Webserver bereitstellen

## 🏃‍♂️ Quick Commands

```bash
# Komplettes Setup
git clone <repo-url>
cd greenBerlin

# Backend
cd backend && npm install && npm run start:dev

# Frontend (neues Terminal)
cd frontend && npm install && npm run dev
```

Die Anwendung ist dann unter http://localhost:5173 verfügbar!
