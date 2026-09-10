import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import RelicsPage from './pages/RelicsPage';
import VisitedPage from './pages/VisitedPage';
import { CulturalJourneyProvider } from './context/CulturalJourneyContext';

export default function App() {
  return (
    <CulturalJourneyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/relics" element={<RelicsPage />} />
          <Route path="/visited" element={<VisitedPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </CulturalJourneyProvider>
  );
}
