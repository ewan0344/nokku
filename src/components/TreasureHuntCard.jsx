import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

const TreasureHuntCard = ({ hunt }) => {
  const navigate = useNavigate();
  const { treasureHuntProgress } = useCulturalJourney();

  const completedClues =
    treasureHuntProgress[hunt.id]?.completedClues || [];

  const totalClues = hunt.clues.length;
  const completedCount = completedClues.length;

  const progressPercentage =
    totalClues > 0
      ? (completedCount / totalClues) * 100
      : 0;

  const isCompleted = completedCount === totalClues;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '15px'
        }}
      >
        <div>
          <h2 style={{ margin: '0 0 8px' }}>
            🗺️ {hunt.title}
          </h2>

          <p
            style={{
              color: '#666',
              margin: 0,
              lineHeight: '1.5'
            }}
          >
            {hunt.description}
          </p>
        </div>

        {isCompleted && (
          <span
            style={{
              background: '#dcfce7',
              color: '#15803d',
              padding: '7px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            ✓ Completed
          </span>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px'
          }}
        >
          <span>Hunt Progress</span>

          <strong>
            {completedCount}/{totalClues} clues
          </strong>
        </div>

        <div
          style={{
            width: '100%',
            height: '10px',
            background: '#e5e7eb',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              background: '#22c55e',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <span
          style={{
            fontSize: '14px',
            color: '#555'
          }}
        >
          🏆 Reward: {hunt.reward} Heritage Points
        </span>

        <button
          onClick={() =>
            navigate(`/treasure-hunt/${hunt.id}`)
          }
          style={{
            background: '#111827',
            color: '#ffffff',
            border: 'none',
            padding: '11px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {isCompleted ? 'View Hunt' : 'Start Hunt'}
        </button>
      </div>
    </div>
  );
};

export default TreasureHuntCard;