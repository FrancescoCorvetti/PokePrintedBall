'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  ShoppingCart,
  Cpu,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  TrendingUp,
  Clock,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react';
import { productsData } from '@/data/products';
import { Product, StockStatus } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  date: string;
  items: string;
  total: number;
  paymentMethod: string;
  status: 'In elaborazione' | 'In stampa 3D' | 'Spedito' | 'Consegnato';
}

const INITIAL_DEMO_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-2026-8941',
    customerName: 'Marco Bellini',
    email: 'm.bellini@gmail.com',
    date: 'Oggi, 11:42',
    items: '1x Master Ball (+ Stand)',
    total: 33.80,
    paymentMethod: 'Stripe (Carta)',
    status: 'In stampa 3D',
  },
  {
    id: 'ORD-2026-8940',
    customerName: 'Sara De Luca',
    email: 'sara.dl@libero.it',
    date: 'Oggi, 09:15',
    items: '1x Poké Ball Lampada, 1x Great Ball',
    total: 61.80,
    paymentMethod: 'Apple Pay',
    status: 'In elaborazione',
  },
  {
    id: 'ORD-2026-8939',
    customerName: 'Davide Morandi',
    email: 'davide.m@outlook.it',
    date: 'Ieri, 18:20',
    items: '1x Poké Ball Classica (Incisa)',
    total: 27.40,
    paymentMethod: 'Stripe (Carta)',
    status: 'Spedito',
  },
  {
    id: 'ORD-2026-8938',
    customerName: 'Chiara Rinaldi',
    email: 'chiara.r@gmail.com',
    date: 'Ieri, 14:05',
    items: '1x Luxury Ball [Drop 01/50]',
    total: 36.80,
    paymentMethod: 'Google Pay',
    status: 'Spedito',
  },
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_DEMO_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [shippingFreeThreshold, setShippingFreeThreshold] = useState('49.00');
  const [shippingFlatCost, setShippingFlatCost] = useState('4.90');
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Edit Product Modal/State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStockStatus, setEditStockStatus] = useState<StockStatus>('in_stock');
  const [editBadge, setEditBadge] = useState('');

  const handleStartEdit = (p: Product) => {
    setEditingProduct(p);
    setEditPrice(p.price.toFixed(2));
    setEditStockStatus(p.stockStatus);
    setEditBadge(p.badge || '');
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    const newPrice = parseFloat(editPrice) || editingProduct.price;
    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingProduct.id
          ? {
              ...item,
              price: newPrice,
              stockStatus: editStockStatus,
              badge: editBadge.trim() || undefined,
            }
          : item
      )
    );
    setEditingProduct(null);
  };

  const handleCycleOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nextStatus: AdminOrder['status'] =
          ord.status === 'In elaborazione'
            ? 'In stampa 3D'
            : ord.status === 'In stampa 3D'
            ? 'Spedito'
            : ord.status === 'Spedito'
            ? 'Consegnato'
            : 'In elaborazione';
        return { ...ord, status: nextStatus };
      })
    );
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-[10px] font-mono font-bold text-red-400 border border-red-500/20 uppercase">
                ADMINISTRATION &bull; BACKOFFICE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                PRODUZIONE ATTIVA
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1.5">
              Pannello Gestionale Poke3D
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Controllo prezzi catalogo, disponibilità lotti di stampa, gestione ordini e tag NFC crittografici.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full">
              <Link href="/shop">Torna allo Store</Link>
            </Button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Totale Modelli a Catalogo</span>
              <Package className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{products.length}</p>
            <p className="text-[11px] text-zinc-500">8 modelli attivi in home page</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Ordini Registrati</span>
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">{orders.length}</p>
            <p className="text-[11px] text-zinc-500">2 in stampa 3D attiva</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Tempo Medio Stampa</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">4h 45m</p>
            <p className="text-[11px] text-zinc-500">Risoluzione 0.16mm FDM</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Chip NFC Assegnati</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">100%</p>
            <p className="text-[11px] text-zinc-500">Hash SHA-256 univoco</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-[#141419] border border-zinc-800">
            <TabsTrigger value="products" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
              Catalogo Prodotti ({products.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
              Ordini ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
              Impostazioni & Spedizioni
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PRODUCTS CATALOG */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtra per nome o categoria..."
                  className="pl-9 bg-[#141419] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-10"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#121217] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#16161d] text-zinc-400 font-mono border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Prodotto</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Prezzo (€)</th>
                      <th className="py-3 px-4">Disponibilità</th>
                      <th className="py-3 px-4">Badge</th>
                      <th className="py-3 px-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4 text-zinc-400" />
                            </div>
                            <div>
                              <p className="font-bold text-white">{p.name}</p>
                              <p className="text-[11px] text-zinc-500 font-mono">{p.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-400 capitalize">
                          {p.category}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          €{p.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            p.stockStatus === 'in_stock'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            {p.stockStatus === 'in_stock' ? 'In Stock' : 'Su Ordinazione'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {p.badge ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono border border-red-500/30">
                              {p.badge}
                            </span>
                          ) : (
                            <span className="text-zinc-600">&mdash;</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEdit(p)}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 px-2.5"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                            <span>Modifica</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: ORDERS */}
          <TabsContent value="orders" className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-[#121217] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#16161d] text-zinc-400 font-mono border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">ID Ordine</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Articoli</th>
                      <th className="py-3 px-4">Totale</th>
                      <th className="py-3 px-4">Pagamento</th>
                      <th className="py-3 px-4">Stato Ordine</th>
                      <th className="py-3 px-4 text-right">Azione</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {ord.id}
                          <span className="block text-[10px] text-zinc-500 font-normal">{ord.date}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white">{ord.customerName}</p>
                          <p className="text-[11px] text-zinc-500">{ord.email}</p>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-300">
                          {ord.items}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          €{ord.total.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400">
                          {ord.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                            ord.status === 'Spedito'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : ord.status === 'In stampa 3D'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : ord.status === 'Consegnato'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleCycleOrderStatus(ord.id)}
                            className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 text-[11px] h-7 px-2.5 rounded-full"
                          >
                            Avanza Stato
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: SETTINGS & SHIPPING */}
          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-xl p-6 sm:p-8 rounded-2xl bg-[#121217] border border-zinc-800 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Configurazione Spedizioni E-commerce</h3>
                <p className="text-xs text-zinc-400">
                  Regola i parametri applicati automaticamente al carrello e al checkout per i clienti italiani.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Soglia Spedizione Gratuita (€)
                  </label>
                  <Input
                    value={shippingFreeThreshold}
                    onChange={(e) => setShippingFreeThreshold(e.target.value)}
                    className="bg-[#181820] border-zinc-800 text-white font-mono text-xs h-10 max-w-xs"
                  />
                  <span className="text-[11px] text-zinc-500">Gli ordini con subtotale pari o superiore a questa cifra avranno spedizione gratis.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Costo Spedizione Standard Corriere Espresso (€)
                  </label>
                  <Input
                    value={shippingFlatCost}
                    onChange={(e) => setShippingFlatCost(e.target.value)}
                    className="bg-[#181820] border-zinc-800 text-white font-mono text-xs h-10 max-w-xs"
                  />
                  <span className="text-[11px] text-zinc-500">Costo applicato quando il subtotale è inferiore alla soglia gratuita.</span>
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setSavedSettingsNotice(true);
                      setTimeout(() => setSavedSettingsNotice(false), 2500);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold"
                  >
                    {savedSettingsNotice ? 'Impostazioni Salvate!' : 'Salva Configurazione'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal / Inline Editor for Product */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                  MODIFICA PRODOTTO &bull; {editingProduct.id}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {editingProduct.name}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Prezzo al pubblico (€)
                  </label>
                  <Input
                    type="number"
                    step="0.10"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="bg-[#181820] border-zinc-800 text-white font-mono text-xs h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Badge Promozionale
                  </label>
                  <Input
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                    placeholder="Es. BESTSELLER, NOVITÀ, PIÙ VENDUTO..."
                    className="bg-[#181820] border-zinc-800 text-white text-xs h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Stato Disponibilità Magazzino
                  </label>
                  <select
                    value={editStockStatus}
                    onChange={(e) => setEditStockStatus(e.target.value as StockStatus)}
                    className="w-full bg-[#181820] border border-zinc-800 rounded-md p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="in_stock">In Stock (Disponibile)</option>
                    <option value="made_to_order">Su Ordinazione</option>
                    <option value="sold_out">Esaurito</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                  className="border-zinc-800 text-zinc-300 hover:text-white rounded-full text-xs"
                >
                  Annulla
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold"
                >
                  Salva Modifiche
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
