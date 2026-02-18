import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Map, { Source, Layer, Marker, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { trips, stopRouteIndices, getTotalCost } from '../data/myTrips'

const TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function bearing(c1: [number, number], c2: [number, number]) {
  const dLon = ((c2[0] - c1[0]) * Math.PI) / 180
  const lat1 = (c1[1] * Math.PI) / 180
  const lat2 = (c2[1] * Math.PI) / 180
  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

function modeEmoji(mode: string) {
  switch (mode) {
    case 'fly': return '✈️'
    case 'train': return '🚂'
    case 'ferry': return '⛴️'
    case 'walk': return '🚶'
    default: return '🚗'
  }
}

function Counter({ value }: { value: number }) {
  const [n, setN] = useState(0)
  const prev = useRef(0)
  useEffect(() => {
    const from = prev.current
    const diff = value - from
    if (!diff) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 800, 1)
      setN(Math.round(from + diff * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    prev.current = value
  }, [value])
  return <>{n.toLocaleString()}</>
}

export default function RouteViewer() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const trip = useMemo(() => trips.find((t) => t.id === slug) ?? trips[0], [slug])

  const [activeStop, setActiveStop] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [cardExpanded, setCardExpanded] = useState(true)
  const [animating, setAnimating] = useState(false)

  // Animated traveler position
  const [travelerPos, setTravelerPos] = useState<[number, number]>(trip.stops[0].coords)
  const [travelerBearing, setTravelerBearing] = useState(0)
  const [drawnRouteIdx, setDrawnRouteIdx] = useState(0) // how far the route is drawn
  const animRef = useRef(0)
  const playRef = useRef(false)

  useEffect(() => {
    setActiveStop(0)
    setTravelerPos(trip.stops[0].coords)
    setDrawnRouteIdx(0)
  }, [trip])

  const stop = trip.stops[activeStop]
  const seg = activeStop > 0 ? trip.segments[activeStop - 1] : null
  const indices = stopRouteIndices[trip.id] ?? []

  const currentKm = trip.stops
    .slice(0, activeStop + 1)
    .flatMap((_, i) => (trip.segments[i - 1] ? [trip.segments[i - 1].km] : []))
    .reduce((a, b) => a + b, 0)
  const currentCost = trip.stops
    .slice(0, activeStop + 1)
    .reduce((s, st) => s + st.costs.reduce((c, item) => c + item.amount, 0), 0)
  const totalBudget = getTotalCost(trip)

  const drawnRouteGeoJSON = useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: trip.routeCoordinates.slice(0, drawnRouteIdx + 1),
    },
  }), [drawnRouteIdx, trip.routeCoordinates])

  const fullRouteGeoJSON = useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: trip.routeCoordinates,
    },
  }), [trip.routeCoordinates])

  const [viewState, setViewState] = useState({
    longitude: stop.coords[0],
    latitude: stop.coords[1],
    zoom: 6,
    pitch: 30,
    bearing: 0,
  })

  // Animate traveler along route from one stop to the next
  const animateToStop = useCallback(
    (targetStopIdx: number) => {
      cancelAnimationFrame(animRef.current)
      const fromIdx = indices[Math.max(0, targetStopIdx - 1)] ?? 0
      const toIdx = indices[targetStopIdx] ?? 0
      if (fromIdx >= toIdx) {
        setTravelerPos(trip.stops[targetStopIdx].coords)
        setDrawnRouteIdx(toIdx)
        setAnimating(false)
        return
      }

      const coords = trip.routeCoordinates
      const segCount = toIdx - fromIdx
      const mode = targetStopIdx > 0 ? trip.segments[targetStopIdx - 1]?.mode ?? 'drive' : 'drive'
      // Much slower: 8-12s per segment depending on distance
      const durationMs = mode === 'fly' ? 6000 : Math.max(6000, Math.min(12000, segCount * 300))
      const startTime = performance.now()

      setAnimating(true)

      const tick = (now: number) => {
        const elapsed = now - startTime
        const rawT = Math.min(elapsed / durationMs, 1)
        const t = rawT < 0.5 ? 2 * rawT * rawT : -1 + (4 - 2 * rawT) * rawT

        const floatIdx = fromIdx + t * segCount
        const i = Math.min(Math.floor(floatIdx), coords.length - 2)
        const frac = floatIdx - i

        const pos: [number, number] = [
          lerp(coords[i][0], coords[i + 1]?.[0] ?? coords[i][0], frac),
          lerp(coords[i][1], coords[i + 1]?.[1] ?? coords[i][1], frac),
        ]

        setTravelerPos(pos)
        setDrawnRouteIdx(Math.floor(floatIdx))

        if (i < coords.length - 2) {
          const b = bearing(coords[i], coords[i + 1])
          setTravelerBearing(b)
        }

        // Camera: very gentle follow, mostly stable — overview feel
        setViewState((prev) => ({
          ...prev,
          longitude: lerp(prev.longitude, pos[0], 0.02),
          latitude: lerp(prev.latitude, pos[1], 0.02),
          zoom: lerp(prev.zoom, mode === 'fly' ? 4.5 : 6.5, 0.005),
          pitch: lerp(prev.pitch, 35, 0.005),
          bearing: lerp(prev.bearing, 0, 0.008),
        }))

        if (rawT < 1) {
          animRef.current = requestAnimationFrame(tick)
        } else {
          setAnimating(false)
          setTravelerPos(trip.stops[targetStopIdx].coords)
          setDrawnRouteIdx(toIdx)
          const s = trip.stops[targetStopIdx]
          setViewState((prev) => ({
            ...prev,
            longitude: s.coords[0],
            latitude: s.coords[1],
            zoom: 8,
            pitch: 35,
            bearing: 0,
          }))
        }
      }
      animRef.current = requestAnimationFrame(tick)
    },
    [indices, trip],
  )

  // When activeStop changes, animate to it
  const prevStop = useRef(0)
  useEffect(() => {
    if (activeStop !== prevStop.current) {
      if (activeStop > prevStop.current) {
        animateToStop(activeStop)
      } else {
        const idx = indices[activeStop] ?? 0
        setTravelerPos(trip.stops[activeStop].coords)
        setDrawnRouteIdx(idx)
        const s = trip.stops[activeStop]
        setViewState((prev) => ({
          ...prev,
          longitude: s.coords[0],
          latitude: s.coords[1],
          zoom: 7,
          pitch: 30,
          bearing: 0,
        }))
      }
      prevStop.current = activeStop
    }
  }, [activeStop, animateToStop, indices, trip])

  // Auto-play: advance after animation finishes + pause
  useEffect(() => {
    playRef.current = playing
    if (!playing) return
    const check = () => {
      if (!playRef.current) return
      setActiveStop((prev) => {
        if (prev >= trip.stops.length - 1) {
          setPlaying(false)
          return prev
        }
        return prev + 1
      })
    }
    const timer = setTimeout(check, animating ? 500 : 4000)
    return () => clearTimeout(timer)
  }, [playing, animating, activeStop, trip.stops.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setActiveStop((i) => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setActiveStop((i) => Math.min(trip.stops.length - 1, i + 1))
      else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [trip.stops.length])

  const costTotal = stop.costs.reduce((s, c) => s + c.amount, 0)
  const currentMode = seg?.mode ?? 'drive'

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => { if (!animating) setViewState(evt.viewState) }}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: '100%', height: '100%' }}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        fog={{
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6,
        }}
        maxPitch={85}
        reuseMaps
      >
        <NavigationControl position="bottom-right" showCompass visualizePitch />
        <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

        {/* Ghost route (full path, dashed) */}
        <Source id="route-full" type="geojson" data={fullRouteGeoJSON}>
          <Layer id="route-ghost" type="line" paint={{
            'line-color': '#94a3b8',
            'line-width': 2.5,
            'line-opacity': 0.3,
            'line-dasharray': [2, 3],
          }} />
        </Source>

        {/* Drawn route (animated, solid glow) */}
        <Source id="route-drawn" type="geojson" data={drawnRouteGeoJSON}>
          <Layer id="route-glow" type="line" paint={{
            'line-color': '#f59e0b',
            'line-width': 16,
            'line-blur': 10,
            'line-opacity': 0.4,
          }} />
          <Layer id="route-border" type="line" paint={{
            'line-color': '#ffffff',
            'line-width': 6,
            'line-opacity': 0.7,
          }} />
          <Layer id="route-line" type="line" paint={{
            'line-color': '#fbbf24',
            'line-width': 4,
            'line-opacity': 1,
          }} />
        </Source>

        {/* Stop markers (numbered circles) */}
        {trip.stops.map((s, i) => (
          <Marker key={s.id} longitude={s.coords[0]} latitude={s.coords[1]}
                  anchor="center" onClick={(e) => { e.originalEvent.stopPropagation(); setActiveStop(i) }}>
            <div className={`flex items-center justify-center rounded-full border-[3px] border-white font-extrabold cursor-pointer transition-all duration-500 ${
              i === activeStop
                ? 'w-11 h-11 bg-amber-400 text-gray-900 shadow-[0_0_24px_rgba(245,158,11,.7)] text-base z-20'
                : i <= (drawnRouteIdx >= (indices[i] ?? Infinity) ? i : -1)
                  ? 'w-7 h-7 bg-amber-400/80 text-gray-900 shadow-lg text-xs'
                  : 'w-7 h-7 bg-white/80 text-gray-600 shadow-md text-xs opacity-60'
            }`}>
              {s.number}
            </div>
          </Marker>
        ))}

        {/* ★ ANIMATED TRAVELER MARKER ★ */}
        <Marker longitude={travelerPos[0]} latitude={travelerPos[1]} anchor="center">
          <div className="relative"
               style={{ transform: `rotate(${travelerBearing}deg)`, transition: animating ? 'none' : 'transform 0.5s' }}>
            {/* Pulse ring */}
            <div className="absolute inset-0 -m-3 rounded-full bg-amber-400/30 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 -m-2 rounded-full bg-amber-400/20" />
            {/* Vehicle emoji */}
            <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_20px_rgba(245,158,11,.8),0_4px_12px_rgba(0,0,0,.4)] flex items-center justify-center text-xl z-30 border-2 border-amber-400"
                 style={{ transform: `rotate(${-travelerBearing}deg)` }}>
              {modeEmoji(currentMode)}
            </div>
          </div>
        </Marker>
      </Map>

      {/* ══ TOP BAR ══ */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-center justify-between px-4 py-3 pointer-events-auto"
             style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,.2) 80%, transparent 100%)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">{trip.title}</h1>
              <p className="text-[10px] text-white/50">{trip.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <div className="text-center">
              <div className="text-amber-400 font-bold font-mono text-sm"><Counter value={currentKm} /></div>
              <div className="text-[9px] text-white/40">km</div>
            </div>
            <div className="text-center">
              <div className="text-amber-400 font-bold font-mono text-sm">€<Counter value={currentCost} /></div>
              <div className="text-[9px] text-white/40">de €{totalBudget}</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm">Día {stop.day}</div>
              <div className="text-[9px] text-white/40">de {trip.totalDays}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PROGRESS BAR ══ */}
      <div className="absolute top-[52px] left-0 right-0 z-20 h-[3px] bg-black/20">
        <div className="h-full bg-amber-400 transition-all duration-1000 ease-out rounded-full"
             style={{ width: `${((activeStop + 1) / trip.stops.length) * 100}%` }} />
      </div>

      {/* ══ STOP CARD ══ */}
      <div className={`absolute z-20 transition-all duration-500 ${
        cardExpanded ? 'bottom-4 left-4 w-[360px] max-w-[calc(100vw-2rem)]' : 'bottom-4 left-4 w-[280px]'
      }`}>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
             style={{ background: 'rgba(10,10,26,0.88)', backdropFilter: 'blur(24px)' }}>

          <div className="relative cursor-pointer" onClick={() => setCardExpanded(!cardExpanded)}>
            <img src={stop.photo} alt={stop.name} className="w-full h-36 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-gray-900 shadow-lg">
                {stop.number}
              </span>
              <span className="text-white/80 text-xs bg-black/40 backdrop-blur px-2 py-0.5 rounded-full">
                {stop.flag} {stop.country}
              </span>
            </div>
            <div className="absolute top-3 right-3 text-xs text-white/70 bg-black/40 backdrop-blur px-2 py-0.5 rounded-full">
              {stop.weather}
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h2 className="text-lg font-bold text-white">{stop.name}</h2>
              <p className="text-white/50 text-[11px] mt-0.5">
                {stop.dates} · Día {stop.day}
                {stop.nights > 0 && ` · ${stop.nights} noche${stop.nights > 1 ? 's' : ''}`}
                {seg && ` · ${seg.km} km ${modeEmoji(seg.mode)}`}
              </p>
            </div>
          </div>

          {cardExpanded && (
            <div className="p-3">
              <p className="text-gray-300 text-sm leading-relaxed mb-2">{stop.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {stop.costs.map((c) => (
                  <span key={c.label} className="inline-flex items-center gap-1 text-xs bg-white/5 rounded-full px-2 py-0.5 text-gray-200">
                    {c.icon} €{c.amount}
                  </span>
                ))}
                <span className="inline-flex items-center text-xs font-bold text-amber-400 ml-auto">€{costTotal}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {stop.highlights.map((h) => (
                  <span key={h} className="text-[10px] text-amber-400/80 bg-amber-400/10 rounded px-1.5 py-0.5 border border-amber-400/10">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center border-t border-white/5 px-3 py-2">
            <button onClick={() => setActiveStop((i) => Math.max(0, i - 1))} disabled={activeStop === 0 || animating}
                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-default">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => setPlaying(!playing)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-1.5 transition-all cursor-pointer ${
                      playing ? 'bg-amber-400 text-gray-900' : 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30'
                    }`}>
              {playing ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              )}
            </button>
            <button onClick={() => setActiveStop((i) => Math.min(trip.stops.length - 1, i + 1))} disabled={activeStop === trip.stops.length - 1 || animating}
                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-default">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Speed indicator */}
            {animating && (
              <span className="text-xs text-amber-400/60 ml-2 animate-pulse">
                {modeEmoji(currentMode)} en ruta...
              </span>
            )}

            <div className="flex-1" />
            <div className="flex gap-0.5">
              {trip.stops.map((_, i) => (
                <button key={i} onClick={() => { if (!animating) setActiveStop(i) }}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          i === activeStop ? 'bg-amber-400 scale-150' : i < activeStop ? 'bg-amber-400/50' : 'bg-white/15'
                        }`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ RIGHT TIMELINE ══ */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
        {trip.stops.map((s, i) => (
          <button key={s.id} onClick={() => { if (!animating) setActiveStop(i) }}
                  className="group relative flex items-center cursor-pointer transition-all duration-300">
            <span className={`absolute right-full mr-2 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg ${
              i === activeStop ? 'text-amber-400' : 'text-white/70'
            }`}>
              {s.name}
            </span>
            <span className={`w-2.5 h-2.5 rounded-full border-2 transition-all ${
              i === activeStop
                ? 'bg-amber-400 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,.5)] scale-125'
                : i < activeStop
                  ? 'bg-amber-400/50 border-amber-400/50'
                  : 'bg-transparent border-white/25'
            }`} />
          </button>
        ))}
      </div>

      {/* ══ TRIP SELECTOR ══ */}
      {trips.length > 1 && (
        <div className="absolute top-16 left-4 z-20 flex gap-1.5">
          {trips.map((t) => (
            <button key={t.id}
                    onClick={() => navigate(`/route/${t.id}`)}
                    className={`text-[11px] px-3 py-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                      t.id === trip.id
                        ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                        : 'bg-black/30 border-white/10 text-white/60 hover:text-white hover:bg-black/50'
                    }`}>
              {t.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
