import React from 'react';
import { useNavigate } from 'react-router-dom';
import treasureHunts from '../data/treasureHunts';
import TreasureClue from '../components/TreasureClue';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

const TreasureHuntPage = () => {
  const navigate = useNavigate();

  const { treasureHuntProgress } = useCulturalJourney();

  const hunt = treasureHunts[0];

  const completedClues =
    treasureHuntProgress[hunt.id]?.completedClues || [];

  const progress = Math.round(
    (completedClues.length / hunt.clues.length) * 100
  );

  const isCompleted =
    completedClues.length === hunt.clues.length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            marginBottom: '20px'
          }}
        >
          ← Back
        </button>

        {/* Header */}
        <div
          style={{
            background: '#111827',
            color: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '30px'
          }}
        >
          <div style={{ fontSize: '40px' }}>
            🗺️
          </div>

          <h1
            style={{
              margin: '10px 0',
              fontSize: '32px'
            }}
          >
            {hunt.title}
          </h1>

          <p
            style={{
              color: '#d1d5db',
              lineHeight: '1.6',
              fontSize: '16px'
            }}
          >
            {hunt.description}
          </p>

          {/* Progress */}
          <div style={{ marginTop: '25px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}
            >
              <span>Hunt Progress</span>

              <strong>
                {completedClues.length}/{hunt.clues.length}
              </strong>
            </div>

            <div
              style={{
                width: '100%',
                height: '12px',
                background: '#374151',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#22c55e',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <p
              style={{
                marginTop: '8px',
                color: '#d1d5db',
                fontSize: '14px'
              }}
            >
              {progress}% completed
            </p>
          </div>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div
            style={{
              background: '#dcfce7',
              border: '2px solid #22c55e',
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '25px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '35px' }}>
              🏆
            </div>

            <h2 style={{ color: '#15803d' }}>
              Treasure Hunt Completed!
            </h2>

            <p style={{ color: '#166534' }}>
              You discovered all the cultural treasures of this hunt.
            </p>

            <strong style={{ color: '#166534' }}>
              +{hunt.reward} Heritage Points
            </strong>
          </div>
        )}

        {/* Clues */}
        <h2 style={{ marginBottom: '20px' }}>
          🔎 Your Clues
        </h2>

        {hunt.clues.map((clue, index) => (
          <div key={clue.id}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: '8px'
              }}
            >
              CLUE {index + 1}
            </div>

            <TreasureClue
              hunt={hunt}
              clue={clue}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreasureHuntPage;