export function updatedAtTimeStampZ() {
  const now = new Date();

  // Format: YYYY-MM-DD
  const date = now.toISOString().slice(0, 10);

  // Format: HH:mm:ss
  const time = now.toTimeString().slice(0, 8);

  // Get microsecond-style padded milliseconds (e.g., 819000)
  const ms = String(now.getMilliseconds()).padStart(3, "0") + "000";

  return `${date} ${time}.${ms}+00`;
}
