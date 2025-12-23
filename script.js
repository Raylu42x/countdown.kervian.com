const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  label: document.getElementById("targetLabel"),
  date: document.getElementById("dateInput"),
  time: document.getElementById("timeInput"),
  tz: document.getElementById("timezoneSelect"),
  settings: document.getElementById("settings")
};

document.getElementById("openSettings").onclick = () => els.settings.showModal();
document.getElementById("save").onclick = saveSettings;
document.getElementById("share").onclick = shareLink;

/* ------------------ Time Zones ------------------ */

Intl.supportedValuesOf("timeZone").forEach(z => {
  const o = document.createElement("option");
  o.value = z;
  o.textContent = z;
  els.tz.appendChild(o);
});

/* ------------------ State ------------------ */

const params = new URLSearchParams(location.search);

let state = {
  date: params.get("date") || "2025-12-25",
  time: params.get("time") || "08:00",
  tz: params.get("tz") || Intl.DateTimeFormat().resolvedOptions().timeZone
};

els.date.value = state.date;
els.time.value = state.time;
els.tz.value = state.tz;

/* ------------------ Core Logic ------------------ */

// Converts date+time in a TZ → UTC timestamp
function toUTC(date, time, tz) {
  const parts = new Date(`${date}T${time}:00`);
  const locale = parts.toLocaleString("en-US", { timeZone: tz });
  return new Date(locale).getTime();
}

function updateCountdown() {
  const now = Date.now();
  const targetUTC = toUTC(state.date, state.time, state.tz);
  const diff = targetUTC - now;

  if (diff <= 0) return;

  els.days.textContent = Math.floor(diff / 86400000);
  els.hours.textContent = Math.floor(diff / 3600000) % 24;
  els.minutes.textContent = Math.floor(diff / 60000) % 60;
  els.seconds.textContent = Math.floor(diff / 1000) % 60;

  els.label.textContent =
    `Counting down to ${state.date} at ${state.time} (${state.tz})`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ------------------ Actions ------------------ */

function saveSettings() {
  state.date = els.date.value;
  state.time = els.time.value;
  state.tz = els.tz.value;
  els.settings.close();
}

function shareLink() {
  const url = new URL(location.href);
  url.search = new URLSearchParams(state).toString();
  navigator.clipboard.writeText(url.toString());
  alert("Share link copied");
}
