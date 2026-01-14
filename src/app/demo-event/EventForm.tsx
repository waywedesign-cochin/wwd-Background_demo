'use client';

import '../css/demo-events.css'

type Event = {
  name: string;
  date: string;
  notes: string;
};

type Props = {
  event: Event;
  onChange: (event: Event) => void;
};

export default function EventForm({ event, onChange }: Props) {
  return (
    <div className="eventForm">
      <h3>Event Details</h3>

      <div className="formRow">
        <label>Event Name</label>
        <input
          type="text"
          placeholder="Wedding Reception"
          value={event.name}
          onChange={(e) =>
            onChange({ ...event, name: e.target.value })
          }
        />
      </div>

      <div className="formRow">
        <label>Event Date</label>
        <input
          type="date"
          value={event.date}
          onChange={(e) =>
            onChange({ ...event, date: e.target.value })
          }
        />
      </div>

      <div className="formRow">
        <label>Notes (Optional)</label>
        <textarea
          placeholder="Special instructions or notes..."
          value={event.notes}
          onChange={(e) =>
            onChange({ ...event, notes: e.target.value })
          }
        />
      </div>
    </div>
  );
}
