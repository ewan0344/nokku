/**
 * Nokku Treasure Hunts
 * Only uses existing verified cultural locations.
 */

const treasureHunts = [
  {
    id: 'kerala-heritage-hunt',
    title: 'Kannur Heritage Hunt',
    description:
      'Explore the history, food, and living traditions of Kannur.',
    reward: 250,

    clues: [
      {
        id: 'clue-1',
        locationId: 'st-angelo-fort',
        title: 'The Coastal Fortress',
        clue:
          'Begin your journey at the historic fort overlooking the Arabian Sea.',
        reward: 50
      },

      {
        id: 'clue-2',
        locationId: 'thalassery-fort',
        title: 'The Spice Route',
        clue:
          'Your next discovery lies in the historic coastal town connected with the spice trade.',
        reward: 50
      },

      {
        id: 'clue-3',
        locationId: 'arakkal-palace',
        title: 'The Royal Legacy',
        clue:
          'Discover the historic royal seat of Kerala’s only Muslim royal dynasty.',
        reward: 50
      },

      {
        id: 'clue-4',
        locationId: 'thalassery-biryani',
        title: 'A Taste of Malabar',
        clue:
          'Your next treasure is not a monument. Find the famous rice dish associated with Thalassery.',
        reward: 50
      },

      {
        id: 'clue-5',
        locationId: 'theyyam-centres',
        title: 'The Living Tradition',
        clue:
          'Complete your hunt by discovering the ritual art tradition deeply connected with North Malabar.',
        reward: 50
      }
    ]
  }
];

export default treasureHunts;