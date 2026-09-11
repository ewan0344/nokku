/**
 * Future-ready Cultural Location Database
 * Structured to allow adding additional states, districts, and categories seamlessly.
 */
export const CULTURAL_LOCATIONS = [
  // 🟢 LIVING / CULTURAL HERITAGE (Green 3D Arrow)
  {
    id: 'st-angelo-fort',
    name: 'St. Angelo Fort',
    category: 'heritage',
    status: 'living',
    markerType: 'green-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Kannur, Kerala',
    coordinates: { x: 38, y: 56 },
    shortDesc: 'Historical coastal fort with significant historical and cultural importance.',
    fullDesc: 'Facing the Arabian Sea, this imposing triangular stone fort was constructed in 1505 by Francisco de Almeida. It holds monumental historical value across Portuguese, Dutch, Arakkal, and British historical eras with massive laterite ramparts, moats, and coastal lighthouse views.',
    tags: ['Historical', 'Coastal Architecture', 'Laterite Monument'],
    image: '/st.angelo.jpg'
  },
  {
    id: 'thalassery-fort',
    name: 'Thalassery Fort',
    category: 'heritage',
    status: 'living',
    markerType: 'green-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Thalassery, Kannur, Kerala',
    coordinates: { x: 70, y: 78 },
    shortDesc: 'Colonial coastal cliff citadel central to the spice trade and Malabar maritime history.',
    fullDesc: 'Erected in 1708 by the British East India Company on a cliff overlooking the Malabar coast, Thalassery Fort features massive laterite walls, secret tunnels to the sea, and carved entrance portals that witnessed historic battles during Hyder Ali and Tipu Sultan\'s campaigns.',
    tags: ['Maritime Heritage', 'Spice Trade', 'Colonial History']
  },
  {
    id: 'arakkal-palace',
    name: 'Arakkal Palace',
    category: 'heritage',
    status: 'living',
    markerType: 'green-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Ayikkara, Kannur, Kerala',
    coordinates: { x: 48, y: 62 },
    shortDesc: 'The historic royal seat of Kerala\'s only Muslim royal dynasty.',
    fullDesc: 'The ancestral palace complex (Arakkal Kettu) of the Arakkal Ali Rajas, who ruled coastal Kannur and the Lakshadweep islands. The durbar hall, wooden architecture, maritime artifacts, and royal heirlooms represent a unique syncretic chapter in Kerala\'s maritime heritage.',
    tags: ['Royal Dynasty', 'Islamic Architecture', 'Maritime Heritage'],
    image: '/araakal.jpg'
  },
  {
    id: 'ezhimala',
    name: 'Ezhimala',
    category: 'heritage',
    status: 'living',
    markerType: 'green-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Payyanur / Ezhimala, Kannur, Kerala',
    coordinates: { x: 22, y: 26 },
    shortDesc: 'Ancient coastal hill prominent in Sangam literature and maritime trade.',
    fullDesc: 'A dramatic coastal hill jutting into the Arabian Sea, celebrated in ancient Sangam literature as the capital of the Mooshika kings. It was a primary navigational landmark for ancient Roman, Arab, and Chinese sea merchants, and today hosts historic shrines, medicinal herbs, and coastal vistas.',
    tags: ['Ancient Sangam Era', 'Coastal Landmark', 'Mooshika Dynasty']
  },

  // 🍽️ FOOD / CUISINE (3D Food Marker)
  {
    id: 'thalassery-biryani',
    name: 'Thalassery Biryani',
    category: 'food',
    status: 'food',
    markerType: 'food',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Thalassery, Kannur, Kerala',
    coordinates: { x: 74, y: 68 },
    shortDesc: 'A famous Malabar-style biryani associated with the Thalassery region.',
    fullDesc: 'Renowned throughout South Asia, Thalassery Biryani is prepared with short-grain fragrant Khyma (Jeerakasala) rice rather than Basmati, slow-cooked through the traditional Dum method using indigenous Malabar spices, ghee, caramelized onions, and tender marinated meat.',
    tags: ['Malabar Cuisine', 'Dum Cooking', 'Jeerakasala Rice'],
    image: '/thalaserry.jpg'
  },
  {
    id: 'pathiri',
    name: 'Pathiri',
    category: 'food',
    status: 'food',
    markerType: 'food',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Kannur, Kerala',
    coordinates: { x: 44, y: 46 },
    shortDesc: 'A traditional Kerala flatbread commonly associated with Malabar cuisine.',
    fullDesc: 'An iconic delicacy of the North Malabar region, Pathiri is an exquisitely thin, soft round flatbread crafted from roasted rice flour. Expertly rolled and roasted without oil, it is traditionally served during celebrations and paired with rich coconut milk stews or spicy gravies.',
    tags: ['Rice Flour Flatbread', 'Malabar Tradition', 'Culinary Craft'],
    image: '/pathiri.jpg'
  },

  // 🔴 AT-RISK / DECLINING CULTURE (Red 3D Arrow)
  {
    id: 'theyyam-centres',
    name: 'Theyyam Centres of Kannur',
    category: 'tradition',
    status: 'at-risk',
    markerType: 'red-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Kannur, Kerala',
    coordinates: { x: 55, y: 34 },
    shortDesc: 'Traditional ritual performance culture associated with northern Kerala.',
    fullDesc: `Kannur is widely regarded as one of the major centres of Theyyam, a traditional ritual art form of North Malabar. Theyyam combines dance, music, storytelling, ritual and visual art, with performers wearing elaborate costumes, large headgear and detailed face paintings.

Different Theyyam forms are connected with local deities, legends, ancestral traditions and stories that have been passed down through generations. Performances are usually held in sacred groves, temples and traditional family shrines.

Theyyam is more than a performance for entertainment; it is a living cultural tradition that connects communities with their history, beliefs and oral traditions. Its continuation depends heavily on the transmission of knowledge and skills from one generation to the next.`,
    tags: ['AT-RISK CULTURE', 'Ritual Art', 'Sacred Groves', 'Living Oral Tradition'],
     image: '/theyyam.jpg'
  },
  {
    id: 'shaaliya-porattu',
    name: 'Shaaliya Porattu',
    category: 'tradition',
    status: 'at-risk',
    markerType: 'red-arrow',
    state: 'Kerala',
    district: 'Kannur',
    locationStr: 'Kannur, Kerala',
    coordinates: { x: 62, y: 48 },
    shortDesc: 'Traditional cultural performance/tradition. Its popularity is declining.',
    fullDesc: 'A centuries-old theatrical folk ritual performance preserved predominantly by the traditional Saliya (weaver) community of North Malabar. Characterized by dramatic masks, satirical oral verses, and community storytelling, this vanishing folk art now counts only a handful of active elder troupes.',
    tags: ['AT-RISK CULTURE', 'Folk Theatre', 'Weaver Heritage', 'Vanishing Tradition'],
   
  }
];
