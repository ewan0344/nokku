import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import RelicsPage from './pages/RelicsPage';
import VisitedPage from './pages/VisitedPage';
import TreasureHuntPage from './pages/TreasureHuntPage';

import { CulturalJourneyProvider } from './context/CulturalJourneyContext';

export default function App() {
  return (
    <CulturalJourneyProvider>
      <BrowserRouter>
        <Routes>

          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Main Pages */}
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/relics" element={<RelicsPage />} />
          <Route path="/visited" element={<VisitedPage />} />

          {/* Treasure Hunt */}
          <Route
            path="/treasure-hunt/:huntId"
            element={<TreasureHuntPage />}
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />

        </Routes>
      </BrowserRouter>
    </CulturalJourneyProvider>
  );
}