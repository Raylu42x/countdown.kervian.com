const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const targetLabel = document.getElementById("targetLabel");

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const timezoneSelect = document.getElementById("timezoneSelect");

const settings = document.getElementById("settings");

document.getElementById("openSettings").onclick = () => settings.showModal();
document.getElementById("save").onclick = saveSettings;
document.getElementById("share").onclick = shareLink;

const timeZones = Intl.supportedValuesOf("timeZone");

timeZones.forEach(tz => {
  const opt = document.createElement("option");
  opt.value = tz;
  opt.textContent = tz;
  timezoneSelect.appendChild(opt);
});

const params = new URLSearchParams(location.search);

let targetDate = params.get("date") || "2025-12-25";
let targetTime = params.get("time") || "08:00";
let targetZone = params.get("tz") || Intl.DateTimeFormat().resolvedOptions().timeZone;

dateInput.value = targetDate;
timeInput.value = targetTime;
timezoneSelect.value = targetZone;

function saveSettings() {
  targetDate = dateInput.value;
  targetTime = timeInput.value;
  targetZone = timezoneSelect.value;
  settings.close();
}

function shareLink() {
  const url = `${location.origin}${location.pathname}?date=${targetDate}&time=${targetTime}&tz=${encodeURIComponent(targetZone)}`;
  navigator.clipboard.writeText(url);
  alert("Share link copied to clipboard");
}

function updateCountdown() {
  const now = new Date();
  const target = new Date(
    new Date(`${targetDate}T${targetTime}:00`).toLocaleString("en-US", { timeZone: targetZone })
  );

  const diff = target - now;

  if (diff <= 0) return;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  daysEl.textContent = d;
  hoursEl.textContent = h;
  minutesEl.textContent = m;
  secondsEl.textContent = s;

  targetLabel.textContent = `Counting down to ${targetDate} at ${targetTime} (${targetZone})`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
