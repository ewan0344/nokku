import React from 'react';
import Navbar from '../components/Navbar';
import IndiaMap from '../components/IndiaMap';

export default function MapPage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FCFCFD] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-1 pb-2 flex flex-col overflow-hidden">
        <IndiaMap />
      </main>
    </div>
  );
}
