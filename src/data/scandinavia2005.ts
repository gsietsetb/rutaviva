export interface TripStop {
  id: string
  number: number
  name: string
  country: string
  flag: string
  dates: string
  day: number
  nights: number
  coords: [number, number]
  description: string
  photo: string
  costs: { label: string; amount: number; icon: string }[]
  highlights: string[]
  weather: string
}

export interface TravelSegment {
  km: number
  hours: number
  mode: 'drive' | 'ferry'
}

export const routeCoordinates: [number, number][] = [
  [2.1734, 41.3851],
  [2.55, 41.72],
  [2.82, 41.98],
  [2.8825, 42.3956],
  [2.8948, 42.6887],
  [3.003, 43.1842],
  [3.8767, 43.6108],
  [4.3601, 43.8367],
  [4.806, 43.9493],
  [4.891, 44.9334],
  [4.8357, 45.764],
  [5.2254, 46.2056],
  [6.0242, 47.2378],
  [7.3359, 47.7508],
  [7.8421, 47.999],
  [7.9425, 48.4726],
  [8.4037, 49.0069],
  [8.466, 49.4875],
  [8.6821, 50.1109],
  [9.4797, 51.3127],
  [9.732, 52.3759],
  [9.9937, 53.5511],
  [10.6865, 53.8655],
  [11.2187, 54.4947],
  [11.3506, 54.656],
  [11.5024, 54.7769],
  [11.6347, 54.7992],
  [11.87, 54.77],
  [11.91, 55.01],
  [12.17, 55.46],
  [12.65, 55.57],
  [13.0038, 55.605],
  [13.16, 55.375],
  [13.82, 55.4295],
  [14.0537, 55.3836],
  [14.08, 55.55],
  [14.15, 56.03],
  [13.7167, 56.2833],
  [13.59, 56.46],
  [13.94, 56.83],
  [14.04, 57.19],
  [14.0833, 57.5],
  [14.16, 57.78],
  [15.62, 58.41],
  [14.886, 58.4497],
  [15.04, 58.54],
  [15.2134, 59.2753],
  [15.04, 59.52],
  [16.18, 60.14],
  [14.9, 60.73],
  [15.1167, 60.8833],
  [14.5333, 61.0],
  [14.6167, 61.1167],
  [14.35, 62.03],
  [15.66, 62.52],
  [14.6357, 63.1792],
  [13.08, 63.39],
  [12.1, 63.32],
  [10.3951, 63.4305],
  [11.495, 64.015],
  [13.19, 65.84],
  [14.14, 66.31],
  [15.35, 66.56],
  [15.4, 67.26],
  [17.43, 68.44],
  [18.9551, 69.6492],
  [23.27, 69.9689],
  [25.97, 70.9827],
  [25.7838, 71.1685],
  [25.66, 71.1122],
]

export const stops: TripStop[] = [
  {
    id: 'barcelona',
    number: 1,
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    dates: '1 ago',
    day: 1,
    nights: 0,
    coords: [2.1734, 41.3851],
    description:
      'Salimos a las 7:00 AM con 40.114 km en el Fieracan®. Objetivo: Knivskjellodden, 71°11\'8"N.',
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 60, icon: '⛽' },
      { label: 'Peajes', amount: 25, icon: '🛣️' },
      { label: 'Comida', amount: 20, icon: '🍽️' },
    ],
    highlights: ['Punto de partida', 'Fieracan® con 40.114 km'],
    weather: '☀️ 28°C',
  },
  {
    id: 'mulhouse',
    number: 2,
    name: 'Mulhouse',
    country: 'Francia',
    flag: '🇫🇷',
    dates: '1 ago',
    day: 1,
    nights: 1,
    coords: [7.3359, 47.7508],
    description:
      'Primera etapa cubierta: 1.011 km en 12 horas vía Lyon. Lloviznas suaves en Perpignan. Hotel Ibis Fillature.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop',
    costs: [
      { label: 'Hotel Ibis', amount: 52, icon: '🏨' },
      { label: 'Gasolina', amount: 85, icon: '⛽' },
      { label: 'Peajes', amount: 45, icon: '🛣️' },
      { label: 'Comida', amount: 35, icon: '🍽️' },
    ],
    highlights: ['1.011 km en 12h', 'Cruce La Jonquera', 'Lloviznas Perpignan'],
    weather: '🌧️ 22°C',
  },
  {
    id: 'sakskobing',
    number: 3,
    name: 'Sakskobing',
    country: 'Dinamarca',
    flag: '🇩🇰',
    dates: '2 ago',
    day: 2,
    nights: 1,
    coords: [11.6347, 54.7992],
    description:
      'Cruzamos toda Alemania. Lluvia torrencial al mediodía. Ferry de 25-30 min a Dinamarca. Hostales llenos, encontramos cabaña.',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    costs: [
      { label: 'Cabaña', amount: 38, icon: '🏨' },
      { label: 'Gasolina', amount: 80, icon: '⛽' },
      { label: 'Ferry', amount: 35, icon: '⛴️' },
      { label: 'Comida', amount: 40, icon: '🍽️' },
    ],
    highlights: ['950 km en 12h', 'Ferry a Dinamarca', 'Lluvia torrencial'],
    weather: '🌧️ 18°C',
  },
  {
    id: 'ales-stenar',
    number: 4,
    name: 'Ales Stenar',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '3 ago',
    day: 3,
    nights: 0,
    coords: [14.0537, 55.3836],
    description:
      'Monumento megalítico prehistórico cerca de Ystad. Punto sur de nuestra travesía escandinava. 18°C, día soleado excepcional.',
    photo: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 30, icon: '⛽' },
      { label: 'Comida', amount: 25, icon: '🍽️' },
    ],
    highlights: ['Monumento megalítico', 'Punto más sur Escandinavia', '18°C excepcional'],
    weather: '☀️ 18°C',
  },
  {
    id: 'bjarnum',
    number: 5,
    name: 'Lago de Bjarnum',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '3-4 ago',
    day: 3,
    nights: 1,
    coords: [13.7167, 56.2833],
    description:
      'Bosques de hayas y robles surrealistas. Lago de cuento de hadas con playa arenosa. Ánades reales y nenúfares. Acampada libre.',
    photo: 'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=600&h=400&fit=crop',
    costs: [
      { label: 'Camping libre', amount: 0, icon: '⛺' },
      { label: 'Leña/provisiones', amount: 12, icon: '🔥' },
      { label: 'Comida', amount: 20, icon: '🍽️' },
    ],
    highlights: ['Camping libre', 'Lago de cuento de hadas', 'Ánades y nenúfares'],
    weather: '☀️ 16°C',
  },
  {
    id: 'orebro',
    number: 6,
    name: 'Vadstena & Örebro',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '4 ago',
    day: 4,
    nights: 1,
    coords: [15.2134, 59.2753],
    description:
      'Castillo de Vadstena y el más fotografiado de Suecia en Örebro. Paseo en tándem por el casco antiguo. Recolección de bolets.',
    photo: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop',
    costs: [
      { label: 'Alojamiento', amount: 45, icon: '🏨' },
      { label: 'Gasolina', amount: 40, icon: '⛽' },
      { label: 'Tándem', amount: 12, icon: '🚲' },
      { label: 'Comida', amount: 35, icon: '🍽️' },
    ],
    highlights: ['Castillo más fotografiado', 'Tándem casco antiguo', 'Bolets frescos'],
    weather: '⛅ 17°C',
  },
  {
    id: 'rattvik',
    number: 7,
    name: 'Rättvik',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '5 ago',
    day: 5,
    nights: 1,
    coords: [15.1167, 60.8833],
    description:
      'Feria "Week of the Old Cars": Cadillacs de colores saltones, Elvis, Rodel-Run. Embarcadero más largo de Suecia (625m). Alojamiento vikingo.',
    photo: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
    costs: [
      { label: 'Hostal vikingo', amount: 42, icon: '🏨' },
      { label: 'Gasolina', amount: 25, icon: '⛽' },
      { label: 'Rodel-Run', amount: 15, icon: '🎢' },
      { label: 'Comida', amount: 30, icon: '🍽️' },
    ],
    highlights: ['Cadillacs vintage', 'Embarcadero 625m', 'Alojamiento vikingo'],
    weather: '☀️ 19°C',
  },
  {
    id: 'orsa',
    number: 8,
    name: 'Parque de Orsa',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '5 ago',
    day: 5,
    nights: 1,
    coords: [14.6167, 61.1167],
    description:
      'Osos ocupan 3/4 del terreno. Lobos, linces (sin avistar) y gulo-gulo. Acampada junto al río.',
    photo: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=600&h=400&fit=crop',
    costs: [
      { label: 'Entrada parque', amount: 28, icon: '🎟️' },
      { label: 'Camping río', amount: 15, icon: '⛺' },
      { label: 'Comida', amount: 25, icon: '🍽️' },
    ],
    highlights: ['Osos pardos', 'Lobos y gulo-gulo', 'Camping junto al río'],
    weather: '⛅ 15°C',
  },
  {
    id: 'ostersund',
    number: 9,
    name: 'Östersund (Jamtli)',
    country: 'Suecia',
    flag: '🇸🇪',
    dates: '6 ago',
    day: 6,
    nights: 1,
    coords: [14.6357, 63.1792],
    description:
      'Parque Jamtli: reconstrucción de aldeas de hace 150 años. Museo desde la prehistoria. Casa de compositor sueco. Iglesia de madera.',
    photo: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
    costs: [
      { label: 'Camping', amount: 18, icon: '⛺' },
      { label: 'Gasolina', amount: 35, icon: '⛽' },
      { label: 'Jamtli', amount: 18, icon: '🎟️' },
      { label: 'Comida', amount: 30, icon: '🍽️' },
    ],
    highlights: ['Jamtli: pueblo histórico', 'Museo prehistoria-hoy', 'Iglesia de madera'],
    weather: '☀️ 14°C',
  },
  {
    id: 'circulo-polar',
    number: 10,
    name: 'Círculo Polar Ártico',
    country: 'Noruega',
    flag: '🇳🇴',
    dates: '8 ago',
    day: 8,
    nights: 1,
    coords: [15.35, 66.56],
    description:
      'Cruce del Círculo Polar Ártico. Sol de medianoche. Fiordos profundos, montañas al mar. La luz que no se extingue.',
    photo: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&h=400&fit=crop',
    costs: [
      { label: 'Cabaña', amount: 55, icon: '🏨' },
      { label: 'Gasolina', amount: 90, icon: '⛽' },
      { label: 'Comida', amount: 45, icon: '🍽️' },
      { label: 'Peajes', amount: 20, icon: '🛣️' },
    ],
    highlights: ['Sol de medianoche', 'Cruce Círculo Polar', 'Fiordos noruegos'],
    weather: '☀️ 12°C',
  },
  {
    id: 'tromso',
    number: 11,
    name: 'Tromsø',
    country: 'Noruega',
    flag: '🇳🇴',
    dates: '9 ago',
    day: 9,
    nights: 1,
    coords: [18.9551, 69.6492],
    description:
      'La "Puerta del Ártico". Catedral ártica, puerto pesquero. Última ciudad grande antes del fin del mundo.',
    photo: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=600&h=400&fit=crop',
    costs: [
      { label: 'Hotel', amount: 68, icon: '🏨' },
      { label: 'Gasolina', amount: 70, icon: '⛽' },
      { label: 'Comida', amount: 50, icon: '🍽️' },
      { label: 'Cerveza', amount: 15, icon: '🍺' },
    ],
    highlights: ['Catedral Ártica', 'Puerto pesquero', 'Puerta del Ártico'],
    weather: '⛅ 10°C',
  },
  {
    id: 'nordkapp',
    number: 12,
    name: 'Knivskjellodden',
    country: 'Noruega',
    flag: '🇳🇴',
    dates: '10 ago',
    day: 10,
    nights: 0,
    coords: [25.66, 71.1122],
    description:
      'El punto más septentrional de Europa continental. 71°11\'8"N. 11.000 km desde Barcelona. Objetivo cumplido.',
    photo: 'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?w=600&h=400&fit=crop',
    costs: [
      { label: 'Gasolina', amount: 80, icon: '⛽' },
      { label: 'Entrada Nordkapp', amount: 25, icon: '🎟️' },
      { label: 'Comida', amount: 40, icon: '🍽️' },
    ],
    highlights: ['71°11\'8"N', '11.000 km recorridos', 'Objetivo cumplido'],
    weather: '🌤️ 8°C',
  },
]

export const segments: TravelSegment[] = [
  { km: 1011, hours: 12, mode: 'drive' },
  { km: 950, hours: 12, mode: 'drive' },
  { km: 350, hours: 4, mode: 'drive' },
  { km: 120, hours: 1.5, mode: 'drive' },
  { km: 380, hours: 4.5, mode: 'drive' },
  { km: 200, hours: 2.5, mode: 'drive' },
  { km: 25, hours: 0.5, mode: 'drive' },
  { km: 250, hours: 3, mode: 'drive' },
  { km: 550, hours: 7, mode: 'drive' },
  { km: 500, hours: 7, mode: 'drive' },
  { km: 500, hours: 7, mode: 'drive' },
]

export const routeMeta = {
  title: 'Escandinavia 2005',
  subtitle: 'Barcelona → Knivskjellodden',
  totalKm: 11000,
  totalDays: 14,
  countries: ['España', 'Francia', 'Alemania', 'Dinamarca', 'Suecia', 'Noruega'],
  travelers: ['Valentín', 'Francesca', 'Guillermo'],
  vehicle: 'Fieracan®',
  year: 2005,
}

export function getTotalCost(): number {
  return stops.reduce((sum, s) => sum + s.costs.reduce((c, item) => c + item.amount, 0), 0)
}

export function getCostByCategory(): { label: string; total: number; color: string }[] {
  const cats: Record<string, number> = {}
  for (const s of stops) {
    for (const c of s.costs) {
      const key = c.icon + ' ' + c.label.replace(/^(Hotel|Hostal|Cabaña|Alojamiento|Camping).*/, 'Alojamiento').replace(/^(Camping libre|Camping río|Camping)$/, 'Camping')
      cats[key] = (cats[key] || 0) + c.amount
    }
  }
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#f97316', '#ec4899']
  return Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .map(([label, total], i) => ({ label, total, color: colors[i % colors.length] }))
}

export const stopRouteIndices = [0, 13, 26, 34, 37, 46, 50, 52, 55, 62, 65, 69]
