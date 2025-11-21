import React from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Checkout from './components/Checkout'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <header className="relative z-10 border-b border-blue-500/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" className="h-8 w-8" />
            <span className="font-semibold">Optic Hub DZ</span>
          </div>
          <nav className="flex gap-6 text-blue-200">
            <a href="#catalog">Catalogue</a>
            <a href="#checkout">Checkout</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <Hero />
        <div id="catalog"><Catalog /></div>
        <div id="checkout"><Checkout /></div>
      </main>

      <footer className="relative z-10 border-t border-blue-500/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-blue-300/70">Paiement à la livraison • Livraison nationale • Santé visuelle</div>
      </footer>
    </div>
  )
}

export default App
