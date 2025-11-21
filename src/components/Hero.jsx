import React from 'react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Hub Santé Visuelle
            </h1>
            <p className="mt-4 text-blue-200/80">
              Achetez vos produits optiques, suivez vos commandes et réservez un rendez-vous chez un ophtalmologue. Paiement à la livraison partout en Algérie.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-3xl" />
            <img src="/hero-glasses.png" alt="Glasses" className="w-full rounded-2xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
