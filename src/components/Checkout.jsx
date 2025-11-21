import React, { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Checkout() {
  const [wilayas, setWilayas] = useState([])
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState({ label: 'Par défaut', full_name: '', phone: '', wilaya: '', commune: '', street: '' })
  const [fee, setFee] = useState(0)
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    fetch(`${API}/delivery/fees`).then(r=>r.json()).then(list=>{
      setWilayas(list.map(f => f.wilaya))
    })
  }, [])

  // Mock cart for demo
  useEffect(()=>{
    const demo = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(demo)
  }, [])

  useEffect(()=>{
    if (address.wilaya) {
      fetch(`${API}/delivery/fee?wilaya=${encodeURIComponent(address.wilaya)}`)
        .then(r=>r.json()).then(d=>setFee(d.fee)).catch(()=>setFee(0))
    }
  }, [address.wilaya])

  const subtotal = useMemo(()=> cart.reduce((s,i)=> s + i.price * i.quantity, 0), [cart])
  const total = useMemo(()=> subtotal + (fee || 0), [subtotal, fee])

  const placeOrder = async () => {
    const payload = {
      user_id: 'demo-user',
      items: cart.map(c => ({ product_id: c._id, title: c.title, price: c.price, quantity: c.quantity || 1, image: c.images?.[0] })),
      address,
      wilaya: address.wilaya,
    }
    const res = await fetch(`${API}/orders/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setOrder(data)
    if (data.order_id) localStorage.removeItem('cart')
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-white text-2xl font-bold">Paiement à la livraison</h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-4">
            <h3 className="text-white font-semibold mb-3">Adresse de livraison</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded bg-slate-900/60 px-3 py-2 text-blue-100" placeholder="Nom complet" value={address.full_name} onChange={e=>setAddress({...address, full_name:e.target.value})} />
              <input className="rounded bg-slate-900/60 px-3 py-2 text-blue-100" placeholder="Téléphone" value={address.phone} onChange={e=>setAddress({...address, phone:e.target.value})} />
              <select className="rounded bg-slate-900/60 px-3 py-2 text-blue-100" value={address.wilaya} onChange={e=>setAddress({...address, wilaya:e.target.value})}>
                <option value="">-- Wilaya --</option>
                {wilayas.map(w=> <option key={w} value={w}>{w}</option>)}
              </select>
              <input className="rounded bg-slate-900/60 px-3 py-2 text-blue-100" placeholder="Commune" value={address.commune} onChange={e=>setAddress({...address, commune:e.target.value})} />
              <input className="rounded bg-slate-900/60 px-3 py-2 text-blue-100 sm:col-span-2" placeholder="Adresse" value={address.street} onChange={e=>setAddress({...address, street:e.target.value})} />
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-4">
            <h3 className="text-white font-semibold mb-3">Votre Panier</h3>
            {cart.length === 0 && <p className="text-blue-200/70">Votre panier est vide.</p>}
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item._id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={item.images?.[0] || '/placeholder.png'} alt="" className="h-14 w-14 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-xs text-blue-200/70">{item.price} DZD</p>
                    </div>
                  </div>
                  <span className="text-blue-200">x{item.quantity || 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-4 h-max">
          <h3 className="text-white font-semibold mb-4">Récapitulatif</h3>
          <div className="space-y-2 text-blue-100">
            <div className="flex justify-between"><span>Total Produits</span><span>{subtotal} DZD</span></div>
            <div className="flex justify-between"><span>Frais de Livraison</span><span>{fee} DZD</span></div>
            <div className="border-t border-white/10 my-2"></div>
            <div className="flex justify-between font-bold text-white"><span>Total à Payer</span><span>{total} DZD</span></div>
          </div>
          <button disabled={!address.wilaya || cart.length===0} onClick={placeOrder} className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50">Confirmer la commande</button>
          {order && <p className="mt-3 text-blue-200">Commande créée. ID: {order.order_id}</p>}
        </div>
      </div>
    </section>
  )
}
