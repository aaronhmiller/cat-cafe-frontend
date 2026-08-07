import { useSignal } from "@preact/signals";
import type { Tea } from "../lib/types.ts";

export default function ReservationForm({ teas }: { teas: Tea[] }) {
  const date = useSignal("");
  const slots = useSignal<string[]>([]);
  const message = useSignal("");

  async function loadSlots(nextDate: string) {
    date.value = nextDate;
    slots.value = nextDate
      ? await fetch(`/api/availability?date=${nextDate}`).then((r) => r.json())
        .then((x) => x.slots)
      : [];
  }

  function submit(event: Event) {
    event.preventDefault();
    message.value =
      "Starter form is ready; connect user authentication to submit reservations.";
  }

  return (
    <form onSubmit={submit}>
      <label>
        Date<input
          type="date"
          name="date"
          required
          value={date}
          onInput={(e) => loadSlots(e.currentTarget.value)}
        />
      </label>
      <label>
        Time<select name="start_time" required>
          <option value="">Choose a time</option>
          {slots.value.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </label>
      <label>
        Guests<select name="guest_count">
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}
          </option>)}
        </select>
      </label>
      <label>
        Complimentary herbal tea<select name="tea_id">
          <option value="">No tea</option>
          {teas.map((tea) => (
            <option key={tea.id} value={tea.id}>{tea.name}</option>
          ))}
        </select>
      </label>
      <label>
        Notes<textarea
          name="notes"
          maxLength={500}
          placeholder="Window seat if possible."
        />
      </label>
      <button type="submit">Book visit</button>
      {message.value && <p class="notice">{message}</p>}
    </form>
  );
}
