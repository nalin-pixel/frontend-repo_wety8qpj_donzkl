import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  const search = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    const res = await fetch(`${API}/products?${params.toString()}`)
    const data = await res.json()
    setProducts(data)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <form onSubmit={search} className="flex-1">
          <div className="flex gap-3">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche produits..." className="w-full rounded-xl bg-slate-800/60 px-4 py-3 text-blue-100 placeholder-blue-200/50 outline-none ring-1 ring-blue-500/20" />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl bg-slate-800/60 px-4 py-3 text-blue-100 outline-none ring-1 ring-blue-500/20">
              <option value="">Toutes catégories</option>
              <option value="lentilles">Lentilles de contact</option>
              <option value="solutions">Solutions d'entretien</option>
              <option value="lunettes_medicales">Lunettes médicales</option>
              <option value="lunettes_soleil">Lunettes de soleil</option>
            </select>
            <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500">Rechercher</button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p=> (
          <div key={p._id} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-4">
            <img src={p.images?.[0] || '/placeholder.png'} alt={p.title} className="h-40 w-full rounded-xl object-cover" />
            <h3 className="mt-3 text-white font-semibold">{p.title}</h3>
            <p className="text-blue-200/70 text-sm line-clamp-2">{p.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-blue-100 font-bold">{p.price} DZD</span>
              <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200">{p.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
