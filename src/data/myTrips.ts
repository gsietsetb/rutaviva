export interface TripStop {
  id: string
  number: number
  name: string
  country: string
  flag: string
  dates: string
  day: number
  nights: number
  coords: [number, number] // [lon, lat]
  description: string
  photo: string
  costs: { label: string; amount: number; icon: string }[]
  highlights: string[]
  weather: string
}

export interface TravelSegment {
  km: number
  hours: number
  mode: 'drive' | 'ferry' | 'fly' | 'walk' | 'train'
}

export interface Trip {
  id: string
  title: string
  subtitle: string
  totalKm: number
  totalDays: number
  countries: string[]
  travelers: string[]
  year: number
  stops: TripStop[]
  segments: TravelSegment[]
  routeCoordinates: [number, number][]
}

// ────────────────────────────────────────────────────────────
//  TRIP 1: ANDALUCÍA — NAVIDADES 2025/2026
//  Extracted from Google Location History
// ────────────────────────────────────────────────────────────

const andaluciaStops: TripStop[] = [
  {
    id: 'barcelona-start',
    number: 1,
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    dates: '26 dic',
    day: 1,
    nights: 0,
    coords: [2.1527, 41.3751],
    description: 'Salida temprano dirección sur. Primer gran road trip navideño por la España profunda.',
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 65, icon: '⛽' },
      { label: 'Peajes', amount: 30, icon: '🛣️' },
    ],
    highlights: ['Punto de partida', 'AP-2 dirección Zaragoza'],
    weather: '☀️ 12°C',
  },
  {
    id: 'talavera',
    number: 2,
    name: 'Talavera de la Reina',
    country: 'España',
    flag: '🇪🇸',
    dates: '26 dic',
    day: 1,
    nights: 1,
    coords: [-4.8310, 39.9600],
    description: 'Parada nocturna tras 600km. Ciudad de la cerámica, paso obligado en la autovía de Extremadura.',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    costs: [
      { label: 'Hotel', amount: 55, icon: '🏨' },
      { label: 'Cena', amount: 25, icon: '🍽️' },
      { label: 'Gasolina', amount: 40, icon: '⛽' },
    ],
    highlights: ['Cerámica de Talavera', 'Parada en ruta'],
    weather: '🌙 5°C',
  },
  {
    id: 'caceres',
    number: 3,
    name: 'Cáceres',
    country: 'España',
    flag: '🇪🇸',
    dates: '27 dic',
    day: 2,
    nights: 0,
    coords: [-6.3781, 39.4704],
    description: 'Casco antiguo medieval Patrimonio UNESCO. Callejuelas, palacios renacentistas y la Plaza Mayor al atardecer.',
    photo: 'https://images.unsplash.com/photo-1588614959060-4d144f28b331?w=600&h=400&fit=crop',
    costs: [
      { label: 'Comida', amount: 22, icon: '🍽️' },
      { label: 'Gasolina', amount: 30, icon: '⛽' },
    ],
    highlights: ['Casco antiguo UNESCO', 'Plaza Mayor', 'Palacios renacentistas'],
    weather: '⛅ 10°C',
  },
  {
    id: 'zafra',
    number: 4,
    name: 'Zafra',
    country: 'España',
    flag: '🇪🇸',
    dates: '27 dic - 4 ene',
    day: 2,
    nights: 8,
    coords: [-6.2068, 38.3000],
    description: 'Base del viaje. "La Sevilla Chica" — pueblo con encanto, plaza porticada, Parador en el Alcázar. Navidades en familia.',
    photo: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=600&h=400&fit=crop',
    costs: [
      { label: 'Alojamiento', amount: 0, icon: '🏠' },
      { label: 'Comida', amount: 180, icon: '🍽️' },
      { label: 'Compras', amount: 45, icon: '🛍️' },
    ],
    highlights: ['Navidad en familia', 'Plaza Grande', 'Alcázar de Zafra', 'Nochevieja'],
    weather: '⛅ 12°C',
  },
  {
    id: 'fregenal',
    number: 5,
    name: 'Fregenal de la Sierra',
    country: 'España',
    flag: '🇪🇸',
    dates: '29 dic',
    day: 4,
    nights: 0,
    coords: [-6.6530, 38.1698],
    description: 'Pueblo en la Sierra Sur de Badajoz. Castillo templario con plaza de toros dentro. Jamón ibérico de bellota.',
    photo: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 15, icon: '⛽' },
      { label: 'Jamón', amount: 35, icon: '🥩' },
      { label: 'Tapas', amount: 18, icon: '🍺' },
    ],
    highlights: ['Castillo templario', 'Jamón ibérico', 'Sierra sur extremeña'],
    weather: '☀️ 14°C',
  },
  {
    id: 'sevilla',
    number: 6,
    name: 'Sevilla',
    country: 'España',
    flag: '🇪🇸',
    dates: '30 dic',
    day: 5,
    nights: 0,
    coords: [-5.9931, 37.3862],
    description: 'Día completo en Sevilla. Plaza de España, Alcázar, Catedral, paseo por Triana. La ciudad más bonita del sur.',
    photo: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 30, icon: '⛽' },
      { label: 'Entradas', amount: 28, icon: '🎟️' },
      { label: 'Comida', amount: 35, icon: '🍽️' },
      { label: 'Cerveza', amount: 12, icon: '🍺' },
    ],
    highlights: ['Plaza de España', 'Real Alcázar', 'Catedral', 'Barrio de Triana'],
    weather: '☀️ 16°C',
  },
  {
    id: 'merida',
    number: 7,
    name: 'Mérida',
    country: 'España',
    flag: '🇪🇸',
    dates: '3 ene',
    day: 9,
    nights: 0,
    coords: [-6.3396, 38.9163],
    description: 'La Roma española. Teatro romano, anfiteatro, puente sobre el Guadiana. Augusta Emerita en todo su esplendor.',
    photo: 'https://images.unsplash.com/photo-1566232392379-afd9298e6a46?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 20, icon: '⛽' },
      { label: 'Entradas', amount: 15, icon: '🎟️' },
      { label: 'Comida', amount: 22, icon: '🍽️' },
    ],
    highlights: ['Teatro romano', 'Anfiteatro', 'Puente romano', 'Templo de Diana'],
    weather: '⛅ 11°C',
  },
  {
    id: 'pozoblanco',
    number: 8,
    name: 'Pozoblanco',
    country: 'España',
    flag: '🇪🇸',
    dates: '4 ene',
    day: 10,
    nights: 0,
    coords: [-4.8367, 38.3512],
    description: 'Parada en la sierra de Córdoba. Los Pedroches — dehesas interminables de encinas y ganado ibérico.',
    photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 45, icon: '⛽' },
      { label: 'Comida', amount: 18, icon: '🍽️' },
    ],
    highlights: ['Sierra de los Pedroches', 'Dehesas de encinas'],
    weather: '☀️ 9°C',
  },
  {
    id: 'valencia',
    number: 9,
    name: 'Valencia',
    country: 'España',
    flag: '🇪🇸',
    dates: '5 ene',
    day: 11,
    nights: 0,
    coords: [-0.4050, 39.4927],
    description: 'Breve parada en Valencia de camino a casa. Noche de Reyes en la Costa Dorada.',
    photo: 'https://images.unsplash.com/photo-1599890758261-47239a4d0b9c?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 50, icon: '⛽' },
      { label: 'Peajes', amount: 25, icon: '🛣️' },
      { label: 'Comida', amount: 20, icon: '🍽️' },
    ],
    highlights: ['Parada en ruta', 'Víspera de Reyes'],
    weather: '☀️ 14°C',
  },
  {
    id: 'barcelona-end',
    number: 10,
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    dates: '5 ene',
    day: 11,
    nights: 0,
    coords: [2.7119, 41.6410],
    description: 'Vuelta a casa justo para Reyes. 11 días, ~2.500 km, Extremadura entera explorada.',
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    costs: [
      { label: 'Peajes', amount: 15, icon: '🛣️' },
    ],
    highlights: ['Fin del viaje', 'Noche de Reyes en casa'],
    weather: '🌙 8°C',
  },
]

const andaluciaSegments: TravelSegment[] = [
  { km: 600, hours: 6, mode: 'drive' },
  { km: 200, hours: 2.5, mode: 'drive' },
  { km: 110, hours: 1.5, mode: 'drive' },
  { km: 55, hours: 0.75, mode: 'drive' },
  { km: 180, hours: 2, mode: 'drive' },
  { km: 110, hours: 1.5, mode: 'drive' },
  { km: 70, hours: 1, mode: 'drive' },
  { km: 250, hours: 3, mode: 'drive' },
  { km: 350, hours: 3.5, mode: 'drive' },
]

const andaluciaRoute: [number, number][] = [[2.15267,41.37507],[1.32237,41.34004],[1.19002,41.38811],[-1.3386,41.49605],[-1.54829,41.39494],[-1.58192,41.37248],[-2.42624,41.1516],[-4.82683,39.96184],[-4.82975,39.95991],[-4.82765,39.96093],[-4.82646,39.95926],[-4.83199,39.96025],[-5.83344,39.54298],[-5.87957,39.45916],[-5.88139,39.46053],[-6.28195,39.46339],[-6.37899,39.4697],[-6.37732,39.47113],[-6.37133,39.47507],[-6.37378,39.47355],[-6.37677,39.47218],[-6.37814,39.4704],[-6.34071,38.40285],[-6.20681,38.3],[-6.2104,38.29899],[-6.22006,38.29737],[-6.20674,38.29933],[-6.16486,38.36019],[-6.20772,38.30121],[-6.20891,38.27523],[-6.20934,38.26905],[-6.20794,38.27679],[-6.20675,38.29998],[-6.49979,38.12807],[-6.52886,38.11983],[-6.53937,38.12989],[-6.65196,38.16884],[-6.65394,38.16797],[-6.64837,38.16794],[-6.55932,38.14617],[-6.40252,38.23378],[-6.20672,38.29903],[-6.17565,37.7442],[-6.14629,37.63501],[-6.00931,37.38992],[-6.00576,37.39783],[-5.99581,37.39107],[-5.99311,37.38582],[-5.98907,37.38856],[-5.99284,37.39],[-5.99311,37.38582],[-5.99585,37.38385],[-5.99372,37.38288],[-5.99633,37.3808],[-6.00125,37.38269],[-6.0057,37.38445],[-6.01068,37.38808],[-6.00492,37.39796],[-6.27466,38.13546],[-6.20672,38.29908],[-6.21259,38.30203],[-6.22112,38.30442],[-6.20798,38.29924],[-6.27499,38.38055],[-6.41649,38.4233],[-6.41911,38.42597],[-6.41631,38.42356],[-6.24659,38.37029],[-6.20786,38.30093],[-6.20667,38.29867],[-6.21002,38.29841],[-6.20723,38.29962],[-6.12081,38.31049],[-6.01318,38.23941],[-6.02802,38.25314],[-6.20669,38.29967],[-6.20949,38.29734],[-6.20683,38.29986],[-6.58375,38.15867],[-6.68757,38.1479],[-6.69003,38.14815],[-6.65404,38.17048],[-6.77349,38.31981],[-6.77171,38.31831],[-6.37961,38.20987],[-6.20711,38.30036],[-6.36124,38.85211],[-6.33962,38.91633],[-6.34139,38.91757],[-6.34421,38.91645],[-6.34219,38.91716],[-6.33955,38.91694],[-6.3439,38.91735],[-6.34761,38.9155],[-6.34156,38.91746],[-6.34305,38.41286],[-6.2073,38.29967],[-4.9656,38.3899],[-4.83673,38.35116],[-4.76966,38.42245],[-4.67187,38.48073],[-2.29799,39.48106],[-2.15991,39.48477],[-1.62646,39.516],[-1.44035,39.53632],[-0.54052,39.48865],[-0.4066,39.49271],[-0.40452,39.49207],[0.51394,40.66814],[0.5746,40.71574],[2.02072,41.39955],[2.12592,41.35733],[2.1701,41.44282],[2.1768,41.44519],[2.46154,41.55798],[2.58285,41.58727],[2.71189,41.64098]]

// Map stop indices to route coordinate indices
const andaluciaStopIndices = [0, 7, 16, 23, 33, 42, 87, 97, 104, 116]

// ────────────────────────────────────────────────────────────
//  TRIP 2: LISBOA — SAN VALENTÍN 2026
// ────────────────────────────────────────────────────────────

const lisboaStops: TripStop[] = [
  {
    id: 'bcn-fly',
    number: 1,
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    dates: '12 feb',
    day: 1,
    nights: 0,
    coords: [2.0738, 41.2868],
    description: 'Vuelo BCN → Lisboa. Escapada de San Valentín a la capital portuguesa.',
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    costs: [
      { label: 'Vuelo', amount: 85, icon: '✈️' },
    ],
    highlights: ['Aeropuerto El Prat', 'Vuelo low-cost'],
    weather: '⛅ 10°C',
  },
  {
    id: 'lisboa-arrive',
    number: 2,
    name: 'Lisboa Centro',
    country: 'Portugal',
    flag: '🇵🇹',
    dates: '12-14 feb',
    day: 1,
    nights: 3,
    coords: [-9.1400, 38.7110],
    description: 'Llegada por metro al centro. Hotel en la Baixa. Calles empedradas, tranvías amarillos y fado por la noche.',
    photo: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop',
    costs: [
      { label: 'Hotel 3n', amount: 210, icon: '🏨' },
      { label: 'Metro', amount: 8, icon: '🚇' },
      { label: 'Cenas', amount: 95, icon: '🍽️' },
    ],
    highlights: ['Baixa-Chiado', 'Tranvía 28', 'Fado en Alfama'],
    weather: '🌤️ 15°C',
  },
  {
    id: 'belem',
    number: 3,
    name: 'Belém',
    country: 'Portugal',
    flag: '🇵🇹',
    dates: '12 feb',
    day: 1,
    nights: 0,
    coords: [-9.1762, 38.7015],
    description: 'Torre de Belém al atardecer. Pastéis de nata en la fábrica original. Monasterio de los Jerónimos.',
    photo: 'https://images.unsplash.com/photo-1548707309-dcebeab426c8?w=600&h=400&fit=crop',
    costs: [
      { label: 'Pastéis', amount: 6, icon: '🥐' },
      { label: 'Entradas', amount: 18, icon: '🎟️' },
    ],
    highlights: ['Torre de Belém', 'Pastéis de Belém', 'Monasterio Jerónimos'],
    weather: '🌅 14°C',
  },
  {
    id: 'alfama',
    number: 4,
    name: 'Alfama',
    country: 'Portugal',
    flag: '🇵🇹',
    dates: '14 feb',
    day: 3,
    nights: 0,
    coords: [-9.1335, 38.7139],
    description: 'San Valentín en el barrio más antiguo de Lisboa. Miradouro das Portas do Sol, Castelo de São Jorge.',
    photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
    costs: [
      { label: 'Castelo', amount: 10, icon: '🏰' },
      { label: 'Comida', amount: 35, icon: '🍽️' },
      { label: 'Ginjinha', amount: 4, icon: '🍷' },
    ],
    highlights: ['San Valentín', 'Castelo São Jorge', 'Miradouro', 'Ginjinha'],
    weather: '☀️ 16°C',
  },
  {
    id: 'sintra',
    number: 5,
    name: 'Sintra',
    country: 'Portugal',
    flag: '🇵🇹',
    dates: '15 feb',
    day: 4,
    nights: 0,
    coords: [-9.3907, 38.7987],
    description: 'Excursión a Sintra: Palacio da Pena, colores imposibles entre la niebla. Cabo da Roca — el punto más occidental de Europa.',
    photo: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?w=600&h=400&fit=crop',
    costs: [
      { label: 'Tren', amount: 5, icon: '🚂' },
      { label: 'Entradas', amount: 20, icon: '🎟️' },
      { label: 'Comida', amount: 22, icon: '🍽️' },
    ],
    highlights: ['Palacio da Pena', 'Quinta da Regaleira', 'Cabo da Roca'],
    weather: '🌫️ 12°C',
  },
  {
    id: 'bcn-return',
    number: 6,
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    dates: '15 feb',
    day: 4,
    nights: 0,
    coords: [2.0738, 41.2887],
    description: 'Vuelta a casa. 4 días de Lisboa que saben a poco. Volveremos.',
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    costs: [
      { label: 'Vuelo', amount: 75, icon: '✈️' },
    ],
    highlights: ['Vuelta a casa'],
    weather: '🌙 9°C',
  },
]

const lisboaSegments: TravelSegment[] = [
  { km: 1005, hours: 2.5, mode: 'fly' },
  { km: 5, hours: 0.3, mode: 'train' },
  { km: 3, hours: 0.25, mode: 'walk' },
  { km: 10, hours: 0.5, mode: 'train' },
  { km: 30, hours: 1, mode: 'train' },
]

const lisboaRoute: [number, number][] = [[2.16099,41.37184],[2.14841,41.37434],[2.13574,41.36501],[2.07377,41.28682],[2.08001,41.29834],[2.08019,41.2905],[-9.13093,38.76749],[-9.13198,38.77884],[-9.12898,38.76977],[-9.13293,38.73699],[-9.13409,38.73726],[-9.14219,38.71059],[-9.1397,38.71157],[-9.14492,38.70644],[-9.17462,38.70145],[-9.17622,38.70063],[-9.17716,38.70009],[-9.17529,38.70085],[-9.14444,38.70751],[-9.14299,38.70727],[-9.14011,38.70982],[-9.13959,38.71102],[-9.14132,38.71073],[-9.14253,38.71063],[-9.14347,38.71352],[-9.14294,38.71201],[-9.14199,38.71062],[-9.13959,38.71102],[-9.13295,38.70983],[-9.13348,38.71391],[-9.13295,38.70983],[-9.1327,38.708],[-9.14351,38.70558],[-9.1453,38.70595],[-9.14405,38.70607],[-9.19802,38.6961],[-9.2005,38.69719],[-9.20323,38.69751],[-9.19978,38.69733],[-9.14665,38.7063],[-9.1453,38.70595],[-9.13548,38.70871],[-9.13745,38.71025],[-9.14211,38.7134],[-9.14541,38.71331],[-9.13959,38.71102],[-9.13981,38.71305],[-9.14105,38.71434],[-9.14097,38.71538],[-9.1409,38.71422],[-9.23476,38.75919],[-9.23578,38.75962],[-9.28364,38.75153],[-9.38673,38.79867],[-9.38942,38.79665],[-9.39066,38.79766],[-9.39531,38.79558],[-9.39602,38.79631],[-9.3968,38.79481],[-9.39578,38.79525],[-9.39602,38.79631],[-9.39483,38.7954],[-9.39152,38.79611],[-9.39066,38.79766],[-9.38543,38.79948],[-9.34144,38.79751],[-9.14157,38.71521],[-9.14105,38.71434],[-9.13866,38.71398],[-9.12854,38.76931],[-9.13198,38.77884],[-9.12898,38.76977],[-9.13715,38.76437],[2.07375,41.28868]]

const lisboaStopIndices = [0, 11, 14, 28, 53, 73]

// ────────────────────────────────────────────────────────────

export const trips: Trip[] = [
  {
    id: 'andalucia-navidades-2025',
    title: 'Andalucía & Extremadura',
    subtitle: 'Barcelona → Zafra → Sevilla → Mérida',
    totalKm: 2500,
    totalDays: 11,
    countries: ['España'],
    travelers: ['Guillermo'],
    year: 2025,
    stops: andaluciaStops,
    segments: andaluciaSegments,
    routeCoordinates: andaluciaRoute,
  },
  {
    id: 'lisboa-sanvalentin-2026',
    title: 'Lisboa — San Valentín',
    subtitle: 'Barcelona ✈ Lisboa → Belém → Sintra',
    totalKm: 1050,
    totalDays: 4,
    countries: ['España', 'Portugal'],
    travelers: ['Guillermo'],
    year: 2026,
    stops: lisboaStops,
    segments: lisboaSegments,
    routeCoordinates: lisboaRoute,
  },
]

export const stopRouteIndices: Record<string, number[]> = {
  'andalucia-navidades-2025': andaluciaStopIndices,
  'lisboa-sanvalentin-2026': lisboaStopIndices,
}

export function getTotalCost(trip: Trip): number {
  return trip.stops.reduce(
    (sum, s) => sum + s.costs.reduce((c, item) => c + item.amount, 0),
    0,
  )
}
