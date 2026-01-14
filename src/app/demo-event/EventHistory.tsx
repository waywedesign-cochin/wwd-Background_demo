/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import '../css/demo-events.css'

export default function EventHistory() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem('eventHistory') || '[]'
    );
    setEvents(data);
  }, []);

  if (!events.length) return null;

  return (
    <div className="history">
      <h3>Event History</h3>

      {events.map((e, i) => (
        <div key={i} className="historyItem">
          <strong>{e.name}</strong>
          <span>{e.date}</span>
          <small>{e.products.length} items</small>
        </div>
      ))}
    </div>
  );
}
