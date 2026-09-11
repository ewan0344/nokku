import React from 'react';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

const TreasureClue = ({ hunt, clue }) => {
  const {
    isPlaceVisited,
    isTreasureClueCompleted,
    completeTreasureClue
  } = useCulturalJourney();

  const visited = isPlaceVisited(clue.locationId);
  const completed = isTreasureClueCompleted(hunt.id, clue.id);

  const handleComplete = () => {
    if (!visited || completed) return;

    completeTreasureClue(hunt, clue);
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '16px',
        border: completed
          ? '2px solid #22c55e'
          : '1px solid #e5e7eb',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <h3 style={{ margin: 0 }}>
          {clue.title}
        </h3>

        <span
          style={{
            background: completed ? '#dcfce7' : '#f3f4f6',
            padding: '6px 10px',
            borderRadius: '20px',
            fontSize: '13px'
          }}
        >
          {completed ? '✓ Completed' : `+${clue.reward} XP`}
        </span>
      </div>

      <p style={{ color: '#555', lineHeight: '1.6' }}>
        {clue.clue}
      </p>

      {!visited && !completed && (
        <p style={{ color: '#b45309', fontSize: '14px' }}>
          📍 Visit the location first to unlock this clue.
        </p>
      )}

      {visited && !completed && (
        <button
          onClick={handleComplete}
          style={{
            background: '#111827',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Unlock Clue
        </button>
      )}

      {completed && (
        <div
          style={{
            color: '#16a34a',
            fontWeight: '600',
            marginTop: '10px'
          }}
        >
          🏆 Treasure clue unlocked!
        </div>
      )}
    </div>
  );
};

export default TreasureClue;