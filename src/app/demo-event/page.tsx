/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { products } from './data';
import ProductGrid from './ProductGrid';
import EventForm from './EventForm';
import { generateEventPDF } from './pdf';
import SelectedPanel from './SelectedPanel';
import '../css/demo-events.css';

export default function DemoEventPage() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const [event, setEvent] = useState({
    name: '',
    date: '',
    notes: '',
  });

  /* ---------------- PRODUCT TOGGLE ---------------- */
  const toggleProduct = (product: any) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  /* ---------------- CATEGORY FILTER ---------------- */
  const categories = ['All', 'Decor', 'Furniture', 'Lighting'];
  const [filter, setFilter] = useState('All');

  const filteredProducts =
    filter === 'All'
      ? products
      : products.filter((p) => p.category === filter);

  /* ---------------- PDF + EVENT HISTORY ---------------- */
  const handlePDF = async (
    event: { name: string; date: string; notes: string },
    selectedProducts: any[]
  ) => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const history = JSON.parse(
        localStorage.getItem('eventHistory') || '[]'
      );

      history.unshift({
        ...event,
        products: selectedProducts,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem('eventHistory', JSON.stringify(history));

      const blob = await generateEventPDF(
        event,
        selectedProducts,
        setProgress
      );

      // ✅ Force browser download popup
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${event.name.replace(/\s+/g, '_')}_event_products.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setToast('PDF downloaded successfully');
    } catch (err) {
      setToast('Failed to generate PDF');
      console.error(err);
    } finally {
      setIsDownloading(false);
      setTimeout(() => setToast(''), 3000);
    }
  };




  const updateQty = (id: number, change: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, qty: Math.max(1, (p.qty || 1) + change) }
          : p
      )
    );
  };


  return (
    <div className="container">
      {/* ---------- HEADER ---------- */}
      <header className="header">
        <h2>Event Product Selection (Demo)</h2>
        <p>Create an event and select required products</p>
      </header>

      {/* ---------- EVENT FORM ---------- */}
      <EventForm event={event} onChange={setEvent} />

      {/* ---------- SUMMARY BAR ---------- */}
      <div className="summary">
        <span>
          <strong>{selectedProducts.length}</strong> items selected
        </span>
        <button
          className="pdfButton"
          disabled={isDownloading || !event.name}
          onClick={() => handlePDF(event, selectedProducts)}
        >
          {isDownloading
            ? `Generating PDF… ${progress}%`
            : 'Download PDF'}
        </button>




        {event.name && (
          <span className="eventTag">Event: {event.name}</span>
        )}
      </div>

      {/* ---------- FILTERS ---------- */}
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={filter === c ? 'activeFilter' : ''}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ---------- PRODUCT GRID (FIXED) ---------- */}

      <ProductGrid
        products={filteredProducts}
        selected={selectedProducts}
        onToggle={toggleProduct}
        onQtyChange={updateQty}
      />


      {/* ---------- STICKY SELECTED PANEL ---------- */}
      <SelectedPanel
        products={selectedProducts}
        onDownload={() => generateEventPDF(event, selectedProducts)}
      />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
