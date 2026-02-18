import { useNavigate } from 'react-router-dom'
import { trips, getTotalCost } from '../data/myTrips'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }}
        />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-midnight">R</div>
          <span className="text-lg font-semibold tracking-tight">Ruta Viva</span>
        </div>
        <span className="text-sm text-gray-500">Importado de Google Location History</span>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Tus viajes reales
        </div>

        <h1 className="text-5xl sm:text-7xl font-serif font-bold leading-tight mb-6">
          Tu vida en un{' '}
          <span className="text-gradient">mapa interactivo</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Importamos tu Google Location History y detectamos automáticamente tus viajes.
          Cada ruta cobra vida con mapa 3D, estadísticas y fotos.
        </p>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20 space-y-6">
        {trips.map((trip) => {
          const total = getTotalCost(trip)
          return (
            <div key={trip.id}
                 className="rounded-3xl overflow-hidden border border-white/5 glow-amber cursor-pointer hover:border-amber-500/20 transition-all hover:scale-[1.01]"
                 onClick={() => navigate(`/route/${trip.id}`)}>
              <div className="bg-midnight-light p-8 sm:p-10">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">{trip.title}</h3>
                    <p className="text-gray-400 mt-1">{trip.subtitle}</p>
                  </div>
                  <span className="text-sm text-amber-400 font-mono">{trip.year}</span>
                </div>

                <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
                  {trip.stops.slice(0, 6).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-1 shrink-0">
                      <span className="px-2.5 py-1 rounded-full bg-midnight-surface text-xs text-gray-300 border border-white/5">
                        {s.flag} {s.name}
                      </span>
                      {i < Math.min(5, trip.stops.length - 1) && (
                        <svg className="w-3 h-3 text-amber-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      )}
                    </div>
                  ))}
                  {trip.stops.length > 6 && (
                    <span className="text-xs text-gray-500">+{trip.stops.length - 6} más</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Kilómetros', value: trip.totalKm.toLocaleString() },
                    { label: 'Días', value: trip.totalDays.toString() },
                    { label: 'Paradas', value: trip.stops.length.toString() },
                    { label: 'Presupuesto', value: `€${total}` },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-midnight/50 rounded-xl p-3 border border-white/5">
                      <div className="text-xl font-bold text-amber-400 font-mono">{stat.value}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-amber-400 text-sm font-medium">
                  <span>Explorar viaje</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-gray-500">
        <p>Ruta Viva · Detectado automáticamente desde Google Location History · 2026</p>
      </footer>
    </div>
  )
}
