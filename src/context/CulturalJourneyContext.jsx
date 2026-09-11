import React, { createContext, useContext, useState, useEffect } from 'react';
import { Award, Sparkles } from 'lucide-react';

const CulturalJourneyContext = createContext();

export function CulturalJourneyProvider({ children }) {

  // =========================================================
  // HERITAGE POINTS
  // =========================================================
  const [heritagePoints, setHeritagePoints] = useState(() => {
    const saved = localStorage.getItem('nokku_heritage_points');
    return saved !== null ? parseInt(saved, 10) : 0;
  });


  // =========================================================
  // VISITED PLACES
  // =========================================================
  const [visitedPlaces, setVisitedPlaces] = useState(() => {
    const saved = localStorage.getItem('nokku_visited_places');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });


  // =========================================================
  // UNLOCKED RELICS
  // =========================================================
  const [unlockedRelics, setUnlockedRelics] = useState(() => {
    const saved = localStorage.getItem('nokku_unlocked_relics');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });


  // =========================================================
  // THEYYAM VERIFICATION
  // =========================================================
  const [verificationState, setVerificationState] = useState(() => {

    const saved = localStorage.getItem('nokku_visited_places');

    if (saved) {
      try {
        const places = JSON.parse(saved);

        if (
          places.some(
            place => place.id === 'theyyam-centres'
          )
        ) {
          return 'confirmed';
        }

      } catch (error) {}
    }

    return 'idle';
  });


  // =========================================================
  // TOAST
  // =========================================================
  const [toastNotification, setToastNotification] = useState(null);


  // =========================================================
  // SAVE HERITAGE POINTS
  // =========================================================
  useEffect(() => {
    localStorage.setItem(
      'nokku_heritage_points',
      heritagePoints.toString()
    );
  }, [heritagePoints]);


  // =========================================================
  // SAVE VISITED PLACES
  // =========================================================
  useEffect(() => {
    localStorage.setItem(
      'nokku_visited_places',
      JSON.stringify(visitedPlaces)
    );
  }, [visitedPlaces]);


  // =========================================================
  // SAVE RELICS
  // =========================================================
  useEffect(() => {
    localStorage.setItem(
      'nokku_unlocked_relics',
      JSON.stringify(unlockedRelics)
    );
  }, [unlockedRelics]);


  // =========================================================
  // CHECK IF THEYYAM IS VERIFIED
  // =========================================================
  const isTheyyamVerified = visitedPlaces.some(
    place => place.id === 'theyyam-centres'
  );


  // =========================================================
  // CHECK IF ANY PLACE IS VISITED
  // =========================================================
  const isPlaceVisited = (placeId) => {
    return visitedPlaces.some(
      place => place.id === placeId
    );
  };


  // =========================================================
  // GENERAL MARK PLACE AS VISITED
  // =========================================================
  //
  // This works for:
  // - Heritage
  // - Food
  // - At-Risk Culture
  // - Any future location
  //
  // =========================================================

  const markPlaceVisited = (place) => {

    if (!place || !place.id) {
      console.error(
        'Cannot mark place as visited: missing place or id'
      );
      return;
    }


    // Don't add the same place twice
    if (isPlaceVisited(place.id)) {

      setToastNotification({
        title: 'Already visited',
        subtitle: `${place.name} is already in your visited places.`,
      });

      setTimeout(() => {
        setToastNotification(null);
      }, 3000);

      return;
    }


    // Create the visited-place object
    const visitedPlace = {

      id: place.id,

      name:
        place.name ||
        place.title ||
        'Unknown Place',

      district:
        place.district ||
        '',

      state:
        place.state ||
        'Kerala',

      locationStr:
        place.locationStr ||
        place.location ||
        place.address ||
        '',

      category:
        place.category ||
        'heritage',

      status:
        place.status ||
        'normal',

      shortDesc:
        place.shortDesc ||
        place.description ||
        '',

      image:
        place.image ||
        place.imageUrl ||
        null,

      visitedDate:
        new Date().toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }
        ),

      // Used to know this was added by the general visit system
      isUserVisited: true
    };


    // Add place to visited list
    setVisitedPlaces(prev => [
      ...prev,
      visitedPlace
    ]);


    // =======================================================
    // POINTS
    // =======================================================

    // Give 10 points for a normal visit
    setHeritagePoints(prev => prev + 10);


    // =======================================================
    // TOAST MESSAGE
    // =======================================================

    setToastNotification({
      title: '+10 Heritage Points',
      subtitle: `${visitedPlace.name} added to your visited places.`,
    });


    setTimeout(() => {
      setToastNotification(null);
    }, 4000);

  };


  // =========================================================
  // REMOVE PLACE FROM VISITED
  // =========================================================

  const removeVisitedPlace = (placeId) => {

    setVisitedPlaces(prev =>
      prev.filter(
        place => place.id !== placeId
      )
    );

  };


  // =========================================================
  // THEYYAM SPECIAL VERIFICATION
  // =========================================================

  const verifyTheyyamVisit = () => {

    if (
      isTheyyamVerified ||
      verificationState === 'checking'
    ) {
      return;
    }


    setVerificationState('checking');


    // Simulate verification
    setTimeout(() => {

      setVerificationState('confirmed');


      // =====================================================
      // ADD THEYYAM
      // =====================================================

      const theyyamVisit = {

        id: 'theyyam-centres',

        name: 'Theyyam Centres of Kannur',

        district: 'Kannur',

        state: 'Kerala',

        locationStr: 'Kannur, Kerala',

        category: 'tradition',

        status: 'at-risk',

        verifiedDate:
          new Date().toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }
          ),

        isPrototype: true,

        shortDesc:
          'Ancient sacred ritual dance and theatrical performance culture of North Malabar.'

      };


      setVisitedPlaces(prev => {

        if (
          prev.some(
            place => place.id === 'theyyam-centres'
          )
        ) {
          return prev;
        }

        return [
          ...prev,
          theyyamVisit
        ];

      });


      // =====================================================
      // HERITAGE GUARDIAN
      // =====================================================

      const relic = {

        id: 'heritage-guardian',

        title: 'HERITAGE GUARDIAN',

        subtitle: 'At-Risk Cultural Defender',

        description:
          'Visited your first at-risk cultural tradition.',

        unlockedAt:
          new Date().toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }
          ),

        pointsReward: 100,

        badgeType: 'guardian'

      };


      setUnlockedRelics(prev => {

        if (
          prev.some(
            relicItem =>
              relicItem.id === 'heritage-guardian'
          )
        ) {
          return prev;
        }

        return [
          ...prev,
          relic
        ];

      });


      // =====================================================
      // +100 POINTS
      // =====================================================

      setHeritagePoints(prev => prev + 100);


      // =====================================================
      // TOAST
      // =====================================================

      setToastNotification({

        title: '+100 Heritage Points',

        subtitle:
          'Heritage Guardian unlocked!',

      });


      setTimeout(() => {

        setToastNotification(null);

      }, 4500);

    }, 2400);

  };


  // =========================================================
  // RESET EVERYTHING
  // =========================================================

  const resetDemoProgress = () => {

    setHeritagePoints(0);

    setVisitedPlaces([]);

    setUnlockedRelics([]);

    setVerificationState('idle');


    localStorage.removeItem(
      'nokku_heritage_points'
    );

    localStorage.removeItem(
      'nokku_visited_places'
    );

    localStorage.removeItem(
      'nokku_unlocked_relics'
    );


    setToastNotification({

      title: 'Demo reset successfully',

      subtitle:
        'Prototype visit, points and achievement have been reset.',

    });


    setTimeout(() => {

      setToastNotification(null);

    }, 4000);

  };


  // =========================================================
  // PROVIDER
  // =========================================================

  return (

    <CulturalJourneyContext.Provider

      value={{

        // Points
        heritagePoints,

        // Visited places
        visitedPlaces,

        isPlaceVisited,

        markPlaceVisited,

        removeVisitedPlace,

        // Relics
        unlockedRelics,

        // Theyyam
        isTheyyamVerified,

        verificationState,

        verifyTheyyamVisit,

        // Reset
        resetDemoProgress,

        // Toast
        toastNotification,

        dismissToast: () =>
          setToastNotification(null)

      }}

    >

      {children}


      {/* =====================================================
          GLOBAL TOAST
      ===================================================== */}

      {toastNotification && (

        <div
          className="
            fixed
            bottom-8
            left-1/2
            -translate-x-1/2
            z-50
            bg-[#14171A]
            text-white
            px-6
            py-4
            rounded-3xl
            shadow-2xl
            border
            border-white/10
            flex
            items-center
            space-x-4
            max-w-md
            w-[90%]
            sm:w-auto
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-gradient-to-tr
              from-amber-500
              to-[#D8612F]
              flex
              items-center
              justify-center
              text-white
              shadow-md
              flex-shrink-0
            "
          >

            <Award className="w-6 h-6" />

          </div>


          <div className="text-left flex-1">

            <div
              className="
                text-sm
                font-black
                text-amber-400
                tracking-wide
                flex
                items-center
                space-x-1.5
              "
            >

              <span>
                {toastNotification.title}
              </span>

              <Sparkles
                className="
                  w-3.5
                  h-3.5
                  text-amber-300
                "
              />

            </div>


            <div
              className="
                text-xs
                font-semibold
                text-gray-200
                mt-0.5
                leading-snug
              "
            >

              {toastNotification.subtitle}

            </div>

          </div>


          <button

            type="button"

            onClick={() =>
              setToastNotification(null)
            }

            className="
              text-gray-400
              hover:text-white
              text-xs
              font-bold
              pl-2
              flex-shrink-0
            "

          >

            ✕

          </button>

        </div>

      )}

    </CulturalJourneyContext.Provider>

  );
}


// ===========================================================
// HOOK
// ===========================================================

export function useCulturalJourney() {

  const context =
    useContext(CulturalJourneyContext);


  if (!context) {

    throw new Error(
      'useCulturalJourney must be used within a CulturalJourneyProvider'
    );

  }

  return context;

}