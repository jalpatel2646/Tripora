// src/data/aiTripMockData.js
// ─────────────────────────────────────────────────────────────
// Mock AI generation engine.
// To connect a real API: replace generateAITrip() with an
// async function that calls Gemini / OpenAI and returns the
// same shape as the mock response below.
// ─────────────────────────────────────────────────────────────

const DESTINATION_DATA = {
  goa: {
    title: 'Goa Adventure',
    region: 'Goa, India',
    accommodation: {
      budget:   { name: 'Beach Hostel',             perNight: 800  },
      balanced: { name: 'Boutique Beach Hotel',     perNight: 2200 },
      luxury:   { name: '5-Star Beachfront Resort', perNight: 6500 },
    },
    transport:      { flight: 4500, train: 1200, bus: 650, car: 3500, any: 4500 },
    localTransport: 400,
    food:           { budget: 350, balanced: 600, luxury: 1200 },
    activities: [
      // ── first day ──────────────────────────────────────────
      { id:'g-f1', time:'10:30 AM', name:'Arrive in Goa', category:'Travel', location:'Dabolim Airport', description:'Land at Goa airport and taxi to your hotel.', duration:'2.5 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'g-f2', time:'01:30 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in, freshen up and relax before exploring.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'g-f3', time:'04:30 PM', name:'Baga Beach Evening', category:'Sightseeing', location:'Baga Beach, North Goa', description:'Stroll along Baga Beach and catch the golden sunset.', duration:'2 hrs', estimatedCost:0, tags:['Beaches','Relaxation','Photography'], day:'first' },
      { id:'g-f4', time:'07:30 PM', name:'Seafood Shack Dinner', category:'Food', location:'Baga Beach', description:'Freshly grilled seafood at a classic beachside shack.', duration:'1.5 hrs', estimatedCost:800, tags:['Food','Local Experiences'], day:'first' },
      // ── middle days ────────────────────────────────────────
      { id:'g-m1', time:'09:00 AM', name:'Water Sports at Baga', category:'Adventure', location:'Baga Beach', description:'Parasailing, jet skiing and banana boat rides on the Arabian Sea.', duration:'2 hrs', estimatedCost:1800, tags:['Adventure','Beaches'], day:'middle' },
      { id:'g-m2', time:'10:00 AM', name:'Old Goa Churches', category:'Culture', location:'Old Goa', description:'UNESCO-listed Basilica of Bom Jesus and Se Cathedral.', duration:'2 hrs', estimatedCost:50, tags:['History','Culture','Photography'], day:'middle' },
      { id:'g-m3', time:'01:00 PM', name:'Local Goan Lunch', category:'Food', location:'North Goa', description:'Fish curry rice, prawn balchão and local Goan xacuti.', duration:'1 hr', estimatedCost:700, tags:['Food','Local Experiences'], day:'middle' },
      { id:'g-m4', time:'03:30 PM', name:'Chapora Fort', category:'History', location:'Chapora, North Goa', description:'17th century Portuguese fort with panoramic coastal views.', duration:'1.5 hrs', estimatedCost:0, tags:['History','Photography','Culture'], day:'middle' },
      { id:'g-m5', time:'09:00 PM', name:"Tito's Lane Nightlife", category:'Nightlife', location:'Baga, North Goa', description:"Experience Goa's vibrant nightlife at the iconic Tito's.", duration:'3 hrs', estimatedCost:1500, tags:['Nightlife'], day:'middle' },
      { id:'g-m6', time:'08:00 AM', name:'Dudhsagar Waterfall Trek', category:'Adventure', location:'Mollem National Park', description:"Trek through lush forest to one of India's tallest waterfalls.", duration:'4 hrs', estimatedCost:1200, tags:['Adventure','Nature','Photography'], day:'middle' },
      { id:'g-m7', time:'11:00 AM', name:'Anjuna Flea Market', category:'Shopping', location:'Anjuna Beach', description:'Browse handicrafts, clothes and souvenirs at the famous weekly flea market.', duration:'2 hrs', estimatedCost:600, tags:['Shopping','Local Experiences'], day:'middle' },
      { id:'g-m8', time:'10:00 AM', name:'Spice Plantation Tour', category:'Nature', location:'Ponda, Goa', description:'Guided tour of a working spice plantation with a traditional Goan lunch.', duration:'3 hrs', estimatedCost:600, tags:['Nature','Food','Local Experiences'], day:'middle' },
      { id:'g-m9', time:'05:30 PM', name:'Mandovi Sunset Cruise', category:'Relaxation', location:'Mandovi River', description:'River cruise with live music, cocktails and a stunning Goan sunset.', duration:'2 hrs', estimatedCost:1200, tags:['Relaxation','Photography'], day:'middle' },
      { id:'g-m10',time:'11:00 AM', name:'Calangute Beach', category:'Beaches', location:'Calangute', description:"Goa's most popular beach — great for swimming and sunbathing.", duration:'2 hrs', estimatedCost:400, tags:['Shopping','Beaches'], day:'middle' },
      // ── last day ───────────────────────────────────────────
      { id:'g-l1', time:'08:00 AM', name:'Morning Beach Walk', category:'Relaxation', location:'Beach', description:'A peaceful last-morning walk along the shore.', duration:'1 hr', estimatedCost:0, tags:['Relaxation','Beaches'], day:'last' },
      { id:'g-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and transfer to airport.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'g-l3', time:'02:00 PM', name:'Departure Flight', category:'Travel', location:'Dabolim Airport', description:'Board your return flight home.', duration:'3 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },

  jaipur: {
    title: 'Royal Jaipur',
    region: 'Rajasthan, India',
    accommodation: {
      budget:   { name: 'Heritage Guest House',    perNight: 700  },
      balanced: { name: 'Boutique Heritage Hotel', perNight: 2000 },
      luxury:   { name: 'Palace Heritage Hotel',   perNight: 8000 },
    },
    transport:      { flight: 3500, train: 800, bus: 500, car: 2500, any: 3500 },
    localTransport: 350,
    food:           { budget: 300, balanced: 500, luxury: 1000 },
    activities: [
      { id:'j-f1', time:'11:00 AM', name:'Arrive in Jaipur', category:'Travel', location:'Jaipur Airport / Station', description:'Arrive in the Pink City and transfer to your hotel.', duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'j-f2', time:'01:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and settle into your heritage accommodation.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'j-f3', time:'03:30 PM', name:'Hawa Mahal', category:'Sightseeing', location:'Pink City, Jaipur', description:"The iconic Palace of Winds — Jaipur's most photographed monument.", duration:'1.5 hrs', estimatedCost:50, tags:['History','Photography','Culture'], day:'first' },
      { id:'j-f4', time:'07:00 PM', name:'Chokhi Dhani Dinner', category:'Food', location:'Chokhi Dhani Village', description:'Authentic Rajasthani thali with folk music and puppet shows.', duration:'3 hrs', estimatedCost:1000, tags:['Food','Culture','Local Experiences'], day:'first' },
      { id:'j-m1', time:'09:00 AM', name:'Amer Fort', category:'History', location:'Amer, Jaipur', description:'Majestic 16th century fort built in pale yellow sandstone with stunning interiors.', duration:'3 hrs', estimatedCost:100, tags:['History','Photography','Culture'], day:'middle' },
      { id:'j-m2', time:'10:00 AM', name:'Elephant Ride at Amer', category:'Adventure', location:'Amer Fort', description:'Traditional elephant ride up to the grand fort entrance.', duration:'45 mins', estimatedCost:1000, tags:['Adventure','Local Experiences'], day:'middle' },
      { id:'j-m3', time:'01:00 PM', name:'City Palace Museum', category:'Culture', location:'City Palace, Jaipur', description:'Royal palace complex housing magnificent Mewar artifacts and royal collections.', duration:'2 hrs', estimatedCost:130, tags:['History','Culture','Photography'], day:'middle' },
      { id:'j-m4', time:'03:30 PM', name:'Johri Bazaar Shopping', category:'Shopping', location:'Johri Bazaar', description:'Browse traditional jewelry, gemstones and vibrant Rajasthani textiles.', duration:'2 hrs', estimatedCost:2000, tags:['Shopping','Local Experiences'], day:'middle' },
      { id:'j-m5', time:'06:30 AM', name:'Jaigarh Fort Sunrise', category:'Adventure', location:'Jaigarh Fort', description:'Early morning visit with sweeping panoramic views over Jaipur city.', duration:'2 hrs', estimatedCost:70, tags:['Adventure','Photography'], day:'middle' },
      { id:'j-m6', time:'05:00 PM', name:'Nahargarh Fort Sunset', category:'Sightseeing', location:'Nahargarh Fort', description:'Watch the Pink City glow at sunset from the highest vantage point.', duration:'2 hrs', estimatedCost:50, tags:['Photography','Relaxation'], day:'middle' },
      { id:'j-m7', time:'11:00 AM', name:'Block Printing Workshop', category:'Culture', location:'Sanganer, Jaipur', description:'Learn traditional Rajasthani block printing from master artisans.', duration:'2 hrs', estimatedCost:500, tags:['Culture','Local Experiences'], day:'middle' },
      { id:'j-m8', time:'10:00 AM', name:'Jantar Mantar Observatory', category:'History', location:'Jantar Mantar', description:'UNESCO-listed astronomical observatory built in 1724 by Maharaja Jai Singh.', duration:'1.5 hrs', estimatedCost:70, tags:['History','Photography'], day:'middle' },
      { id:'j-l1', time:'08:30 AM', name:'Morning Chai & Market', category:'Food', location:'Old City Bazaar', description:'Start the day with roadside masala chai and spicy local street snacks.', duration:'1 hr', estimatedCost:100, tags:['Food','Local Experiences'], day:'last' },
      { id:'j-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and transfer to station / airport.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'j-l3', time:'01:00 PM', name:'Departure', category:'Travel', location:'Jaipur Airport / Station', description:'Head home with wonderful Rajasthani memories.', duration:'2 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },

  manali: {
    title: 'Manali Escape',
    region: 'Himachal Pradesh, India',
    accommodation: {
      budget:   { name: 'Mountain Hostel',   perNight: 600  },
      balanced: { name: 'Riverside Cottage', perNight: 1800 },
      luxury:   { name: 'Mountain Resort',   perNight: 5500 },
    },
    transport:      { flight: 5000, train: 1500, bus: 700, car: 4000, any: 5000 },
    localTransport: 500,
    food:           { budget: 300, balanced: 500, luxury: 900 },
    activities: [
      { id:'mn-f1', time:'12:00 PM', name:'Arrive in Manali', category:'Travel', location:'Manali Bus Stand', description:'Arrive in the Kullu Valley and transfer to your hotel.', duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'mn-f2', time:'02:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and rest after the mountain journey.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'mn-f3', time:'04:30 PM', name:'Mall Road Evening', category:'Sightseeing', location:'Mall Road', description:"Stroll along Manali's vibrant Mall Road with snow-capped peaks all around.", duration:'2 hrs', estimatedCost:300, tags:['Shopping','Local Experiences'], day:'first' },
      { id:'mn-f4', time:'07:30 PM', name:"Dinner at Johnson's Cafe", category:'Food', location:'Mall Road', description:'Cozy mountain restaurant with excellent trout, pasta and local cuisine.', duration:'1.5 hrs', estimatedCost:700, tags:['Food'], day:'first' },
      { id:'mn-m1', time:'09:00 AM', name:'Solang Valley Snow Activities', category:'Adventure', location:'Solang Valley', description:'Skiing, zorbing and cable car rides with jaw-dropping mountain views.', duration:'4 hrs', estimatedCost:2000, tags:['Adventure','Photography'], day:'middle' },
      { id:'mn-m2', time:'02:00 PM', name:'Hadimba Temple', category:'Culture', location:'Old Manali', description:'Ancient wooden temple dedicated to the goddess Hadimba, surrounded by cedar forest.', duration:'1.5 hrs', estimatedCost:0, tags:['Culture','History','Photography'], day:'middle' },
      { id:'mn-m3', time:'07:00 AM', name:'Rohtang Pass Excursion', category:'Adventure', location:'Rohtang Pass', description:'Breathtaking high-altitude pass with snow even in summer.', duration:'Full Day', estimatedCost:1500, tags:['Adventure','Photography','Nature'], day:'middle' },
      { id:'mn-m4', time:'10:00 AM', name:'Beas River Rafting', category:'Adventure', location:'Beas River', description:'White water rafting through scenic mountain gorges.', duration:'2 hrs', estimatedCost:800, tags:['Adventure','Nature'], day:'middle' },
      { id:'mn-m5', time:'03:00 PM', name:'Old Manali Village Walk', category:'Relaxation', location:'Old Manali', description:'Explore the bohemian Old Manali with cozy cafes and local artisan shops.', duration:'2 hrs', estimatedCost:400, tags:['Relaxation','Local Experiences'], day:'middle' },
      { id:'mn-m6', time:'10:00 AM', name:'Naggar Castle', category:'History', location:'Naggar', description:'15th century castle with sweeping views over the Kullu Valley.', duration:'2 hrs', estimatedCost:50, tags:['History','Photography'], day:'middle' },
      { id:'mn-m7', time:'11:00 AM', name:'Vashisht Hot Springs', category:'Relaxation', location:'Vashisht Village', description:'Relax in natural sulphur hot springs and visit the ancient temple.', duration:'1.5 hrs', estimatedCost:0, tags:['Relaxation','Culture'], day:'middle' },
      { id:'mn-l1', time:'06:30 AM', name:'Sunrise Mountain View', category:'Nature', location:'Viewpoint', description:'Watch the sunrise paint the snow-capped Himalayan peaks in gold.', duration:'1 hr', estimatedCost:0, tags:['Photography','Nature'], day:'last' },
      { id:'mn-l2', time:'10:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and pack up for the journey home.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'mn-l3', time:'12:00 PM', name:'Departure', category:'Travel', location:'Manali Bus Stand', description:'Head back home with amazing mountain memories.', duration:'3 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },

  mumbai: {
    title: 'Mumbai Experience',
    region: 'Maharashtra, India',
    accommodation: {
      budget:   { name: 'Budget Hotel',      perNight: 1200  },
      balanced: { name: 'City Hotel',        perNight: 3500  },
      luxury:   { name: '5-Star City Hotel', perNight: 12000 },
    },
    transport:      { flight: 3000, train: 600, bus: 400, car: 2000, any: 3000 },
    localTransport: 600,
    food:           { budget: 400, balanced: 700, luxury: 1500 },
    activities: [
      { id:'mu-f1', time:'11:00 AM', name:'Arrive in Mumbai', category:'Travel', location:'CSMI Airport / CST Station', description:'Arrive in the city of dreams.', duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'mu-f2', time:'01:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and freshen up.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'mu-f3', time:'04:00 PM', name:'Gateway of India', category:'Sightseeing', location:'Apollo Bunder, Colaba', description:"Iconic arch monument with stunning harbor views and Mumbai's energy.", duration:'1.5 hrs', estimatedCost:0, tags:['History','Photography'], day:'first' },
      { id:'mu-f4', time:'06:00 PM', name:'Marine Drive Sunset', category:'Relaxation', location:'Marine Drive', description:"Walk along the Queen's Necklace as the sun dips into the Arabian Sea.", duration:'1.5 hrs', estimatedCost:0, tags:['Relaxation','Photography'], day:'first' },
      { id:'mu-m1', time:'09:30 AM', name:'Elephanta Caves', category:'History', location:'Elephanta Island', description:'UNESCO heritage rock-cut cave temples reached by a scenic ferry ride.', duration:'3 hrs', estimatedCost:600, tags:['History','Culture','Photography'], day:'middle' },
      { id:'mu-m2', time:'11:00 AM', name:'Dharavi Guided Tour', category:'Local Experiences', location:'Dharavi', description:"An eye-opening guided tour of Asia's largest urban settlement.", duration:'2 hrs', estimatedCost:800, tags:['Local Experiences','Culture'], day:'middle' },
      { id:'mu-m3', time:'05:00 PM', name:'Colaba Causeway Shopping', category:'Shopping', location:'Colaba', description:"Browse antiques, clothes and curios at Mumbai's famous street market.", duration:'2 hrs', estimatedCost:1000, tags:['Shopping'], day:'middle' },
      { id:'mu-m4', time:'08:00 PM', name:'Mohammed Ali Road Street Food', category:'Food', location:'Mohammed Ali Road', description:"Mumbai's legendary street food — nihari, kebabs, pav bhaji and kulfi.", duration:'2 hrs', estimatedCost:400, tags:['Food','Local Experiences'], day:'middle' },
      { id:'mu-m5', time:'10:00 AM', name:'Bollywood Studio Tour', category:'Culture', location:"Film City, Goregaon", description:"Go behind the scenes at India's biggest film production hub.", duration:'3 hrs', estimatedCost:1500, tags:['Culture','Local Experiences'], day:'middle' },
      { id:'mu-m6', time:'09:00 PM', name:'Bandra Sea Link Night Drive', category:'Sightseeing', location:'Bandra', description:'Drive across the iconic cable-stayed bridge lit up at night.', duration:'1 hr', estimatedCost:100, tags:['Photography','Sightseeing'], day:'middle' },
      { id:'mu-m7', time:'10:00 AM', name:'CST Railway Station Tour', category:'History', location:'CST, Mumbai', description:'Tour the stunning UNESCO-listed Victorian-Gothic railway station.', duration:'1 hr', estimatedCost:0, tags:['History','Photography'], day:'middle' },
      { id:'mu-l1', time:'08:30 AM', name:'Irani Cafe Breakfast', category:'Food', location:'South Mumbai', description:'Classic Mumbai breakfast: bun maska, omelette and cutting chai.', duration:'1 hr', estimatedCost:200, tags:['Food','Local Experiences'], day:'last' },
      { id:'mu-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and transfer to airport.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'mu-l3', time:'01:00 PM', name:'Departure', category:'Travel', location:'CSMI Airport / CST Station', description:"Head home with Mumbai's energy in your soul.", duration:'2 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },

  kerala: {
    title: "Kerala Backwaters",
    region: "Kerala, India",
    accommodation: {
      budget:   { name: 'Homestay',          perNight: 800  },
      balanced: { name: 'Lake View Resort',  perNight: 2500 },
      luxury:   { name: 'Premium Houseboat', perNight: 7000 },
    },
    transport:      { flight: 4000, train: 900, bus: 600, car: 3000, any: 4000 },
    localTransport: 400,
    food:           { budget: 300, balanced: 500, luxury: 1000 },
    activities: [
      { id:'ke-f1', time:'11:00 AM', name:'Arrive in Kochi', category:'Travel', location:'Cochin Airport', description:'Arrive in Kerala and transfer to your hotel.', duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'ke-f2', time:'01:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and settle in at your lakeside retreat.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'ke-f3', time:'04:00 PM', name:'Fort Kochi Walking Tour', category:'Culture', location:'Fort Kochi', description:'Stroll colonial streets with Dutch, Portuguese and British architecture.', duration:'2 hrs', estimatedCost:0, tags:['History','Culture','Photography'], day:'first' },
      { id:'ke-f4', time:'06:00 PM', name:'Chinese Fishing Nets Sunset', category:'Sightseeing', location:'Fort Kochi Waterfront', description:'Watch the iconic cantilevered fishing nets against a blazing Kerala sunset.', duration:'1.5 hrs', estimatedCost:0, tags:['Photography','Local Experiences'], day:'first' },
      { id:'ke-m1', time:'10:00 AM', name:'Alleppey Houseboat Cruise', category:'Relaxation', location:'Alleppey Backwaters', description:"Cruise the famous Kerala backwater network on a traditional houseboat.", duration:'Full Day', estimatedCost:4000, tags:['Relaxation','Nature','Photography'], day:'middle' },
      { id:'ke-m2', time:'06:30 PM', name:'Kathakali Performance', category:'Culture', location:'Cultural Centre, Kochi', description:'Classical Kerala dance-drama with elaborate costumes and mesmerising makeup.', duration:'2 hrs', estimatedCost:350, tags:['Culture','Local Experiences'], day:'middle' },
      { id:'ke-m3', time:'08:00 AM', name:'Periyar Tiger Reserve Safari', category:'Wildlife', location:'Thekkady', description:'Boat safari on the jungle lake spotting wild elephants and rare birds.', duration:'3 hrs', estimatedCost:600, tags:['Wildlife','Nature','Adventure'], day:'middle' },
      { id:'ke-m4', time:'09:00 AM', name:'Munnar Tea Plantation', category:'Nature', location:'Munnar Hills', description:'Tour the rolling emerald tea estates with sweeping hill views.', duration:'3 hrs', estimatedCost:300, tags:['Nature','Photography'], day:'middle' },
      { id:'ke-m5', time:'02:00 PM', name:'Ayurvedic Massage', category:'Relaxation', location:'Ayurveda Centre', description:'Traditional Kerala Ayurvedic full-body massage for deep relaxation.', duration:'1.5 hrs', estimatedCost:1500, tags:['Relaxation'], day:'middle' },
      { id:'ke-m6', time:'01:00 PM', name:'Kerala Sadya Lunch', category:'Food', location:'Local Restaurant', description:'Traditional 24-dish feast served on a fresh banana leaf.', duration:'1 hr', estimatedCost:400, tags:['Food','Local Experiences'], day:'middle' },
      { id:'ke-m7', time:'09:00 AM', name:'Cherai Beach Morning', category:'Beaches', location:'Cherai, Kochi', description:'Pristine beach with backwaters on one side and sea on the other.', duration:'3 hrs', estimatedCost:0, tags:['Beaches','Relaxation','Photography'], day:'middle' },
      { id:'ke-l1', time:'07:00 AM', name:'Backwater Morning Walk', category:'Nature', location:'Alleppey', description:'Peaceful sunrise walk along the canal banks.', duration:'1 hr', estimatedCost:0, tags:['Nature','Relaxation'], day:'last' },
      { id:'ke-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:"Checkout and transfer to Cochin airport.", duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'ke-l3', time:'01:00 PM', name:'Departure', category:'Travel', location:'Cochin Airport', description:"Fly home refreshed from God's Own Country.", duration:'2 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },

  udaipur: {
    title: 'Udaipur Royale',
    region: 'Rajasthan, India',
    accommodation: {
      budget:   { name: 'Lakeside Guesthouse',  perNight: 800   },
      balanced: { name: 'Heritage Lake Hotel',  perNight: 2800  },
      luxury:   { name: 'Palace on the Lake',   perNight: 10000 },
    },
    transport:      { flight: 4000, train: 1000, bus: 600, car: 3000, any: 4000 },
    localTransport: 400,
    food:           { budget: 300, balanced: 600, luxury: 1200 },
    activities: [
      { id:'ud-f1', time:'11:00 AM', name:'Arrive in Udaipur', category:'Travel', location:'Maharana Pratap Airport', description:'Arrive in the City of Lakes and transfer to your hotel.', duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'ud-f2', time:'01:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and enjoy the stunning lake views.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'ud-f3', time:'04:00 PM', name:'Lake Pichola Boat Ride', category:'Sightseeing', location:'Lake Pichola', description:'Boat ride on the iconic lake with views of the illuminated City Palace.', duration:'1 hr', estimatedCost:400, tags:['Photography','Relaxation'], day:'first' },
      { id:'ud-f4', time:'07:30 PM', name:'Lakeside Dinner at Ambrai', category:'Food', location:'Ambrai Restaurant', description:'Rajasthani thali with panoramic City Palace and lake views.', duration:'2 hrs', estimatedCost:1000, tags:['Food','Local Experiences'], day:'first' },
      { id:'ud-m1', time:'09:00 AM', name:'City Palace Museum', category:'History', location:'City Palace, Udaipur', description:'Magnificent Mewar dynasty palace complex with royal exhibits and lake views.', duration:'2.5 hrs', estimatedCost:300, tags:['History','Photography','Culture'], day:'middle' },
      { id:'ud-m2', time:'12:00 PM', name:"Saheliyon ki Bari Garden", category:'Culture', location:"Saheliyon ki Bari", description:'Beautiful garden of maids with fountains and marble elephants.', duration:'1.5 hrs', estimatedCost:50, tags:['Culture','Photography'], day:'middle' },
      { id:'ud-m3', time:'10:00 AM', name:'Old City Haveli Walk', category:'History', location:'Old City, Udaipur', description:"Walk through the narrow lanes of Udaipur's ancient havelis.", duration:'2 hrs', estimatedCost:0, tags:['History','Photography'], day:'middle' },
      { id:'ud-m4', time:'02:00 PM', name:'Miniature Painting Workshop', category:'Culture', location:'Art Studio, Old City', description:'Learn Rajasthani miniature painting from a master artist.', duration:'2 hrs', estimatedCost:500, tags:['Culture','Local Experiences'], day:'middle' },
      { id:'ud-m5', time:'08:00 AM', name:'Kumbhalgarh Fort Day Trip', category:'Adventure', location:'Kumbhalgarh', description:"Explore the fort with the world's second-longest wall.", duration:'Full Day', estimatedCost:800, tags:['History','Adventure','Photography'], day:'middle' },
      { id:'ud-m6', time:'06:00 PM', name:'Fateh Sagar Lake Sunset', category:'Relaxation', location:'Fateh Sagar Lake', description:'Watch the golden sunset over the tranquil Fateh Sagar Lake.', duration:'1 hr', estimatedCost:0, tags:['Photography','Relaxation'], day:'middle' },
      { id:'ud-m7', time:'11:00 AM', name:'Udaipur Local Market', category:'Shopping', location:'Hathi Pol Bazaar', description:'Browse traditional Rajasthani crafts, textiles and silver jewelry.', duration:'2 hrs', estimatedCost:1500, tags:['Shopping','Local Experiences'], day:'middle' },
      { id:'ud-l1', time:'07:00 AM', name:'Morning Yoga by the Lake', category:'Relaxation', location:'Lakeside', description:'Peaceful morning yoga session with lake and palace views.', duration:'1 hr', estimatedCost:200, tags:['Relaxation','Nature'], day:'last' },
      { id:'ud-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and transfer to airport.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'ud-l3', time:'01:00 PM', name:'Departure', category:'Travel', location:'Maharana Pratap Airport', description:'Head home with magical Udaipur memories.', duration:'2 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function normalizeKey(dest) {
  const d = (dest || '').toLowerCase().trim();
  if (d.includes('goa'))                              return 'goa';
  if (d.includes('jaipur'))                           return 'jaipur';
  if (d.includes('manali'))                           return 'manali';
  if (d.includes('mumbai') || d.includes('bombay'))   return 'mumbai';
  if (d.includes('kerala') || d.includes('kochi'))    return 'kerala';
  if (d.includes('udaipur'))                          return 'udaipur';
  return d;
}

function getGenericDest(destination) {
  return {
    title: `${destination} Journey`,
    region: destination,
    accommodation: {
      budget:   { name: 'Budget Hotel',  perNight: 900  },
      balanced: { name: 'City Hotel',    perNight: 2200 },
      luxury:   { name: 'Luxury Hotel',  perNight: 7000 },
    },
    transport:      { flight: 4000, train: 1000, bus: 600, car: 2500, any: 4000 },
    localTransport: 450,
    food:           { budget: 350, balanced: 600, luxury: 1200 },
    activities: [
      { id:'ge-f1', time:'11:00 AM', name:`Arrive in ${destination}`, category:'Travel', location:`${destination} Airport / Station`, description:`Arrive in ${destination} and transfer to your hotel.`, duration:'2 hrs', estimatedCost:0, tags:['arrival'], day:'first' },
      { id:'ge-f2', time:'01:00 PM', name:'Hotel Check-in', category:'Stay', location:'Hotel', description:'Check in and freshen up.', duration:'1 hr', estimatedCost:0, tags:['checkin'], day:'first' },
      { id:'ge-f3', time:'03:30 PM', name:`${destination} City Tour`, category:'Sightseeing', location:destination, description:`Explore the highlights of ${destination} with a guided city tour.`, duration:'3 hrs', estimatedCost:500, tags:['Sightseeing','Photography'], day:'first' },
      { id:'ge-f4', time:'07:30 PM', name:'Dinner at Local Restaurant', category:'Food', location:destination, description:`Sample the authentic local cuisine of ${destination}.`, duration:'1.5 hrs', estimatedCost:600, tags:['Food','Local Experiences'], day:'first' },
      { id:'ge-m1', time:'09:00 AM', name:'Historical Monument', category:'History', location:destination, description:`Visit the most famous historical site in ${destination}.`, duration:'2 hrs', estimatedCost:200, tags:['History','Culture','Photography'], day:'middle' },
      { id:'ge-m2', time:'11:30 AM', name:'Local Market Walk', category:'Shopping', location:destination, description:'Browse local handicrafts and souvenirs.', duration:'2 hrs', estimatedCost:800, tags:['Shopping','Local Experiences'], day:'middle' },
      { id:'ge-m3', time:'01:30 PM', name:'Street Food Experience', category:'Food', location:destination, description:'Taste the best local street food and regional delicacies.', duration:'1.5 hrs', estimatedCost:400, tags:['Food','Local Experiences'], day:'middle' },
      { id:'ge-m4', time:'04:00 PM', name:'Nature & Scenery', category:'Nature', location:destination, description:`Visit the most scenic natural spot in and around ${destination}.`, duration:'2 hrs', estimatedCost:0, tags:['Nature','Photography'], day:'middle' },
      { id:'ge-m5', time:'07:00 PM', name:'Cultural Evening', category:'Culture', location:destination, description:'Experience the local cultural heritage through music and dance.', duration:'2 hrs', estimatedCost:500, tags:['Culture','Local Experiences'], day:'middle' },
      { id:'ge-m6', time:'10:00 AM', name:'Adventure Activity', category:'Adventure', location:destination, description:`Try the top adventure activity ${destination} is known for.`, duration:'3 hrs', estimatedCost:1500, tags:['Adventure','Nature'], day:'middle' },
      { id:'ge-l1', time:'09:00 AM', name:'Morning Exploration', category:'Sightseeing', location:destination, description:'A final morning exploring any remaining sights.', duration:'2 hrs', estimatedCost:300, tags:['Sightseeing'], day:'last' },
      { id:'ge-l2', time:'11:00 AM', name:'Hotel Checkout', category:'Stay', location:'Hotel', description:'Checkout and transfer.', duration:'1 hr', estimatedCost:0, tags:['checkout'], day:'last' },
      { id:'ge-l3', time:'01:00 PM', name:'Departure', category:'Travel', location:`${destination} Airport / Station`, description:`Head home with wonderful ${destination} memories.`, duration:'2 hrs', estimatedCost:0, tags:['departure'], day:'last' },
    ],
  };
}

function getDayTitle(day, total) {
  if (day === 1)      return 'Arrival & First Impressions';
  if (day === total)  return 'Departure Day';
  const mid = ['Exploration & Discovery','Adventure & Culture','Local Experiences','Hidden Gems','Deep Dive Day','Scenic Excursion','Cultural Immersion','Leisure & Relaxation'];
  return mid[(day - 2) % mid.length];
}

function buildItinerary(pool, days, interests, pace, travelers, version) {
  const paceMap = { relaxed: 3, balanced: 4, packed: 5 };
  const perDay = paceMap[pace] || 4;

  const firstDay = pool.filter(a => a.day === 'first');
  const lastDay  = pool.filter(a => a.day === 'last');
  let   middle   = pool.filter(a => a.day === 'middle');

  // Score by interest match, then rotate for regenerate variety
  middle = [...middle].sort((a, b) => {
    const sB = b.tags.filter(t => interests.includes(t)).length;
    const sA = a.tags.filter(t => interests.includes(t)).length;
    return sB - sA;
  });
  if (version > 1) {
    const r = (version - 1) % Math.max(1, middle.length);
    middle = [...middle.slice(r), ...middle.slice(0, r)];
  }

  const withCost = (acts) => acts.map(a => ({
    ...a,
    totalCost: a.estimatedCost * travelers,
  }));

  const itinerary = [];

  // Day 1
  itinerary.push({
    day: 1,
    title: getDayTitle(1, days),
    activities: withCost(firstDay),
    dayTotal: firstDay.reduce((s, a) => s + a.estimatedCost * travelers, 0),
  });

  // Middle days
  let idx = 0;
  for (let d = 2; d <= days - 1; d++) {
    const acts = [];
    for (let i = 0; i < perDay; i++) {
      if (idx < middle.length) {
        const a = middle[idx++];
        acts.push({ ...a, id: `${a.id}-d${d}`, totalCost: a.estimatedCost * travelers });
      }
    }
    itinerary.push({
      day: d,
      title: getDayTitle(d, days),
      activities: acts,
      dayTotal: acts.reduce((s, a) => s + a.totalCost, 0),
    });
  }

  // Last day
  if (days > 1) {
    itinerary.push({
      day: days,
      title: getDayTitle(days, days),
      activities: withCost(lastDay),
      dayTotal: lastDay.reduce((s, a) => s + a.estimatedCost * travelers, 0),
    });
  }

  return itinerary;
}

function computeScore(total, budget, itinerary, interests, pace) {
  const budgetFit        = Math.min(100, Math.max(0, Math.round(100 - Math.max(0, (total - budget) / budget * 100))));
  const activityBalance  = Math.min(100, 65 + Math.min(35, interests.length * 5));
  const paceScore        = { relaxed: 88, balanced: 93, packed: 80 }[pace] || 85;
  const routeEfficiency  = 85;
  const overall          = Math.round((budgetFit + activityBalance + paceScore + routeEfficiency) / 4);

  const insights = [];
  if (total <= budget)       insights.push({ type: 'good',    text: 'Trip stays within your budget' });
  if (interests.length >= 3) insights.push({ type: 'good',    text: 'Good variety of activities matching your interests' });
  if (pace === 'packed')     insights.push({ type: 'warning', text: 'Packed schedule — consider some breathing room' });
  if (total > budget)        insights.push({ type: 'warning', text: `₹${(total - budget).toLocaleString('en-IN')} over budget` });
  const busyDay = itinerary.find(d => d.activities.length >= 5);
  if (busyDay)               insights.push({ type: 'warning', text: `Day ${busyDay.day} is a busy one — plan for extra energy` });

  return { overall, breakdown: { budgetFit, activityBalance, travelPace: paceScore, routeEfficiency }, insights };
}

function buildSummary(to, interests, style, budget, travelers, days, pace) {
  const top3  = interests.slice(0, 3).map(s => s.toLowerCase()).join(', ') || 'travel';
  const sMap  = { budget: 'budget-friendly', balanced: 'well-balanced', luxury: 'premium' };
  const pMap  = { relaxed: 'at a relaxed pace', balanced: 'at a comfortable pace', packed: 'on a packed adventure' };
  return `Curated around your love of ${top3}, this ${days}-day ${sMap[style] || 'balanced'} journey through ${to} has been designed ${pMap[pace] || 'comfortably'} — keeping everything within your ₹${budget.toLocaleString('en-IN')} budget.`;
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export function generateAITrip(formData, version = 0) {
  const {
    from, to, startDate, endDate,
    budget, travelStyle = 'balanced',
    travelerCount = 1, interests = [],
    pace = 'balanced',
    transport: transportMode = 'any',
  } = formData;

  const start  = new Date(startDate);
  const end    = new Date(endDate);
  const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const days   = nights + 1;

  const key      = normalizeKey(to);
  const destData = DESTINATION_DATA[key] || getGenericDest(to);

  // ── Budget breakdown ─────────────────────────────────────
  const transportCost     = (destData.transport[transportMode] || destData.transport.any) * 2;
  const rooms             = Math.max(1, Math.ceil(travelerCount / 2));
  const stayPerNight      = (destData.accommodation[travelStyle] || destData.accommodation.balanced).perNight;
  const stayCost          = stayPerNight * nights * rooms;
  const foodCost          = (destData.food[travelStyle] || destData.food.balanced) * travelerCount * days;
  const localTransport    = destData.localTransport * travelerCount * days;

  const itinerary         = buildItinerary(destData.activities, days, interests, pace, travelerCount, version);
  const activitiesCost    = itinerary.reduce((s, d) => s + d.dayTotal, 0);
  const totalEstimated    = transportCost + stayCost + foodCost + localTransport + activitiesCost;
  const remaining         = budget - totalEstimated;

  return {
    id:           Date.now(),
    version:      version + 1,
    title:        destData.title,
    from,
    to,
    startDate,
    endDate,
    days,
    nights,
    travelerCount,
    travelStyle,
    interests,
    pace,
    itinerary,
    budgetBreakdown: { transport: transportCost, stay: stayCost, food: foodCost, activities: activitiesCost, localTransport },
    totalEstimated,
    budget,
    remaining,
    isOverBudget: remaining < 0,
    tripScore:    computeScore(totalEstimated, budget, itinerary, interests, pace),
    aiSummary:    buildSummary(to, interests, travelStyle, budget, travelerCount, days, pace),
  };
}

export function regenerateAITrip(formData, currentVersion) {
  return generateAITrip(formData, currentVersion);
}

export function optimizeBudget(trip) {
  // Reduce stay cost (downgrade one tier)
  const styles  = ['budget', 'balanced', 'luxury'];
  const current = styles.indexOf(trip.travelStyle);
  const newStyle = styles[Math.max(0, current - 1)];
  const savings  = newStyle !== trip.travelStyle
    ? Math.round(trip.budgetBreakdown.stay * 0.3)
    : Math.round(trip.budgetBreakdown.activities * 0.15);

  return {
    ...trip,
    totalEstimated: trip.totalEstimated - savings,
    remaining:      trip.remaining + savings,
    isOverBudget:   (trip.remaining + savings) < 0,
    optimized:      true,
    optimizationNote: `Hotel downgraded to a more budget-friendly option. Saved ₹${savings.toLocaleString('en-IN')}.`,
    budgetBreakdown: {
      ...trip.budgetBreakdown,
      stay: trip.budgetBreakdown.stay - savings,
    },
  };
}
