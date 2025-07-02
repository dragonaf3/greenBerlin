import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import LoginScreen from './components/loginScreen/LoginScreen';
import LocationsListScreen from './components/locationsListScreen/LocationsListScreen';
import LocationDetailScreen from './components/locationDetailScreen/LocationDetailScreen';
import UpdateLocationScreen from './components/updateLocationScreen/UpdateLocationScreen';
import CreateLocationScreen from './components/createLocationScreen/CreateLocationScreen';
import AboutScreen from './components/aboutScreen/AboutScreen';
import PrivacyScreen from './components/privacyScreen/PrivacyScreen';
import ErrorScreen from './components/errorScreen/ErrorScreen';
import './App.css';

const AppContent: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            <Header />
            <main className="flex-1 flex flex-col">
                <Routes>
                    <Route 
                        path="/login" 
                        element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/locations" replace />} 
                    />
                    <Route 
                        path="/locations" 
                        element={
                            <ProtectedRoute>
                                <LocationsListScreen />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/locations/:id" 
                        element={
                            <ProtectedRoute>
                                <LocationDetailScreen />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/locations/edit/:id" 
                        element={
                            <ProtectedRoute>
                                <UpdateLocationScreen />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/locations/add" 
                        element={
                            <ProtectedRoute>
                                <CreateLocationScreen />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/privacy" element={<PrivacyScreen />} />
                    <Route path="/error" element={<ErrorScreen />} />
                    <Route 
                        path="/" 
                        element={<Navigate to={isAuthenticated ? "/locations" : "/login"} replace />} 
                    />
                    <Route path="*" element={<Navigate to="/error" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;