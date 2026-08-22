// src/utils/packingGenerator.js
// ─────────────────────────────────────────────────────────────
// Business rules for auto-generating personalized checklists
// ─────────────────────────────────────────────────────────────

export function generatePackingList(trip, weatherData = {}) {
  const days = trip.days || 3;
  const travelers = trip.travelerCount || 1;
  const destination = (trip.to || '').toLowerCase();
  
  // Analyze itinerary activities
  let beachActivitiesCount = 0;
  let hikeActivitiesCount = 0;
  let foodToursCount = 0;
  let sightseeingCount = 0;

  if (trip.itinerary) {
    trip.itinerary.forEach((dayObj) => {
      dayObj.activities.forEach((act) => {
        const name = (act.name || '').toLowerCase();
        const type = (act.type || '').toLowerCase();
        if (name.includes('beach') || name.includes('water sport') || name.includes('surf')) beachActivitiesCount++;
        if (name.includes('trek') || name.includes('hike') || name.includes('climb')) hikeActivitiesCount++;
        if (name.includes('food') || name.includes('cook') || name.includes('dine') || name.includes('dinner')) foodToursCount++;
        if (type === 'sightseeing') sightseeingCount++;
      });
    });
  }

  // Analyze weather data
  let rainyDaysCount = 0;
  let hotDaysCount = 0;
  let coldDaysCount = 0;

  Object.values(weatherData).forEach((w) => {
    const cond = (w.condition || '').toLowerCase();
    if (cond.includes('rain') || cond.includes('storm')) rainyDaysCount++;
    if (cond.includes('hot') || w.maxTemp > 32) hotDaysCount++;
    if (cond.includes('cold') || w.maxTemp < 15) coldDaysCount++;
  });

  const list = [];

  // Helper to add item
  const addItem = (name, category, initialQty, isEssential, why, tags = []) => {
    list.push({
      id: `${category.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      category,
      quantity: initialQty,
      packed: false,
      isEssential,
      why,
      tags
    });
  };

  // 1. Essentials
  addItem('Toothbrush & Toothpaste', 'Toiletries', 1, true, 'Every trip essential.');
  addItem('Shampoo & Shower Gel', 'Toiletries', 1, false, 'Stay fresh during your trip.');
  addItem('Phone Charger', 'Electronics', 1, true, 'Crucial for keeping devices powered.');
  addItem('Power Bank', 'Electronics', 1, false, 'Day 2 includes extended outside sightseeing hours.', ['essential']);
  addItem('Wallet & Cash/Cards', 'Documents', 1, true, 'Core payment methods.', ['essential']);
  addItem('Medications & First Aid', 'Health & Safety', 1, true, 'Safety and health preparedness.', ['essential']);

  // International Check
  const isInternational = destination.includes('maldives') || destination.includes('bali') || destination.includes('europe') || destination.includes('london') || destination.includes('dubai');
  if (isInternational) {
    addItem('Passport', 'Documents', 1, true, 'Required for international entry.', ['essential']);
    addItem('Visa Copy', 'Documents', 1, true, 'Required travel permit documentation.', ['essential']);
    addItem('Travel Insurance', 'Documents', 1, true, 'Mandatory travel safety policy.');
    addItem('Universal Travel Adapter', 'Electronics', 1, true, 'Adapts to international socket systems.');
  }

  // 2. Clothing (Dynamic quantities based on duration)
  addItem('T-Shirts', 'Clothing', Math.max(3, days - 1), false, `Based on your ${days}-day trip duration.`);
  addItem('Shorts/Jeans', 'Clothing', Math.max(2, Math.round(days / 2)), false, `Sufficient trousers for ${days} days.`);
  addItem('Undergarments', 'Clothing', days, true, `One set per traveler for each of the ${days} days.`);
  addItem('Socks', 'Clothing', days, false, `Fresh socks for each day of travel.`);
  addItem('Nightwear', 'Clothing', Math.max(1, Math.ceil(days / 3)), false, 'For sleeping comfort.');

  // 3. Weather-dependent Additions
  if (rainyDaysCount > 0) {
    addItem('Umbrella', 'Weather Essentials', 1, true, `Rain is expected on ${rainyDaysCount} days.`, ['weather']);
    addItem('Raincoat/Poncho', 'Weather Essentials', 1, false, `Keep dry during Day 3 precipitation.`, ['weather']);
    addItem('Waterproof Footwear', 'Footwear', 1, false, 'Protects feet during monsoon downpours.', ['weather']);
    addItem('Waterproof Phone Pouch', 'Weather Essentials', 1, false, 'Shields device during wet activities.', ['weather']);
  }

  if (hotDaysCount > 0 || destination.includes('goa') || destination.includes('kerala')) {
    addItem('Sunscreen SPF 50', 'Weather Essentials', 1, true, 'Essential to prevent UV sunburn and skin damage.', ['weather']);
    addItem('Sunglasses', 'Weather Essentials', 1, false, 'Protects eyes from heavy solar glare.', ['weather']);
    addItem('Sun Hat / Cap', 'Weather Essentials', 1, false, 'Keeps direct sun off face.', ['weather']);
  }

  if (coldDaysCount > 0 || destination.includes('manali') || destination.includes('ladakh')) {
    addItem('Heavy Winter Jacket', 'Weather Essentials', 1, true, 'For sub-zero or low temperature weather.', ['weather']);
    addItem('Thermals Layer', 'Clothing', Math.max(1, Math.round(days / 3)), true, 'Insulating base layer.', ['weather']);
    addItem('Gloves', 'Weather Essentials', 1, false, 'Keeps fingers warm in the cold.', ['weather']);
    addItem('Warm Woolen Socks', 'Footwear', Math.max(2, Math.round(days / 2)), false, 'Keeps toes warm.', ['weather']);
  }

  // 4. Activity-dependent Additions
  if (beachActivitiesCount > 0) {
    addItem('Swimwear', 'Activity Gear', 1, true, `You have ${beachActivitiesCount} beach activities planned.`, ['activity']);
    addItem('Beach Towel', 'Activity Gear', 1, false, 'For drying off after swimming.', ['activity']);
    addItem('Flip-Flops / Slides', 'Footwear', 1, false, 'Easy footwear choice on wet sand.', ['activity']);
  }

  if (hikeActivitiesCount > 0) {
    addItem('Hiking Shoes / Boots', 'Footwear', 1, true, `Required for your planned ${hikeActivitiesCount} trekking/hiking activity.`, ['activity']);
    addItem('Small Backpack (Daypack)', 'Activity Gear', 1, false, 'To carry water and safety items on trail.', ['activity']);
    addItem('Reusable Water Bottle', 'Activity Gear', 1, true, 'Stay hydrated while trekking.', ['activity']);
  }

  if (sightseeingCount > 0) {
    addItem('Comfortable Walking Shoes', 'Footwear', 1, true, `Recommended because your itinerary includes ${sightseeingCount} sightseeing activities.`, ['activity']);
  }

  return list;
}
