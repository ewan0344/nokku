import React, { createContext, useContext, useState, useEffect } from 'react';
import { Award, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

const CulturalJourneyContext = createContext();

export function CulturalJourneyProvider({ children }) {
  // Persistent state backed by localStorage
  const [heritagePoints, setHeritagePoints] = useState(() => {
    const saved = localStorage.getItem('nokku_heritage_points');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [visitedPlaces, setVisitedPlaces] = useState(() => {
    const saved = localStorage.getItem('nokku_visited_places');
    return saved ? JSON.parse(saved) : [];
  });

  const [unlockedRelics, setUnlockedRelics] = useState(() => {
    const saved = localStorage.getItem('nokku_unlocked_relics');
    return saved ? JSON.parse(saved) : [];
  });

  const [verificationState, setVerificationState] = useState(() => {
    // If Theyyam is already verified in visitedPlaces, initialize to 'confirmed'
    const saved = localStorage.getItem('nokku_visited_places');
    if (saved) {
      try {
        const places = JSON.parse(saved);
        if (places.some(p => p.id === 'theyyam-centres')) return 'confirmed';
      } catch (e) {}
    }
    return 'idle'; // 'idle' | 'checking' | 'confirmed'
  });

  const [toastNotification, setToastNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('nokku_heritage_points', heritagePoints.toString());
  }, [heritagePoints]);

  useEffect(() => {
    localStorage.setItem('nokku_visited_places', JSON.stringify(visitedPlaces));
  }, [visitedPlaces]);

  useEffect(() => {
    localStorage.setItem('nokku_unlocked_relics', JSON.stringify(unlockedRelics));
  }, [unlockedRelics]);

  const isTheyyamVerified = visitedPlaces.some(p => p.id === 'theyyam-centres');

  // Prototype verification flow for Theyyam Centres of Kannur
  const verifyTheyyamVisit = () => {
    if (isTheyyamVerified || verificationState === 'checking') return;

    setVerificationState('checking');

    // Simulate visit verification delay (2.4s)
    setTimeout(() => {
      setVerificationState('confirmed');

      // 1. Add Theyyam to visited places
      const theyyamVisit = {
        id: 'theyyam-centres',
        name: 'Theyyam Centres of Kannur',
        district: 'Kannur',
        state: 'Kerala',
        locationStr: 'Kannur, Kerala',
        category: 'tradition',
        status: 'at-risk',
        verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isPrototype: true,
        shortDesc: 'Ancient sacred ritual dance and theatrical performance culture of North Malabar.'
      };

      setVisitedPlaces(prev => {
        if (prev.some(p => p.id === 'theyyam-centres')) return prev;
        return [...prev, theyyamVisit];
      });

      // 2. Unlock "Heritage Guardian" achievement
      const relic = {
        id: 'heritage-guardian',
        title: 'HERITAGE GUARDIAN',
        subtitle: 'At-Risk Cultural Defender',
        description: 'Visited your first at-risk cultural tradition.',
        unlockedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pointsReward: 100,
        badgeType: 'guardian'
      };

      setUnlockedRelics(prev => {
        if (prev.some(r => r.id === 'heritage-guardian')) return prev;
        return [...prev, relic];
      });

      // 3. Add +100 points
      setHeritagePoints(prev => prev + 100);

      // 4. Trigger celebration toast
      setToastNotification({
        title: '+100 Heritage Points',
        subtitle: 'Heritage Guardian unlocked!',
      });

      // Auto dismiss toast after 4.5s
      setTimeout(() => {
        setToastNotification(null);
      }, 4500);

    }, 2400);
  };

  // Reset entire prototype demo progress back to initial state
  const resetDemoProgress = () => {
    setHeritagePoints(0);
    setVisitedPlaces([]);
    setUnlockedRelics([]);
    setVerificationState('idle');
    localStorage.removeItem('nokku_heritage_points');
    localStorage.removeItem('nokku_visited_places');
    localStorage.removeItem('nokku_unlocked_relics');

    setToastNotification({
      title: 'Demo reset successfully',
      subtitle: 'Prototype visit, points and achievement have been reset.',
    });

    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  return (
    <CulturalJourneyContext.Provider
      value={{
        heritagePoints,
        visitedPlaces,
        unlockedRelics,
        isTheyyamVerified,
        verificationState,
        verifyTheyyamVisit,
        resetDemoProgress,
        toastNotification,
        dismissToast: () => setToastNotification(null)
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#14171A] text-white px-6 py-4 rounded-3xl shadow-2xl border border-white/10 flex items-center space-x-4 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-md w-[90%] sm:w-auto">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-[#D8612F] flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Award className="w-6 h-6 animate-bounce" />
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-black text-amber-400 tracking-wide flex items-center space-x-1.5">
              <span>{toastNotification.title}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="text-xs font-semibold text-gray-200 mt-0.5 leading-snug">
              {toastNotification.subtitle}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            className="text-gray-400 hover:text-white text-xs font-bold pl-2 flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}
    </CulturalJourneyContext.Provider>
  );
}

export function useCulturalJourney() {
  const context = useContext(CulturalJourneyContext);
  if (!context) {
    throw new Error('useCulturalJourney must be used within a CulturalJourneyProvider');
  }
  return context;
}
