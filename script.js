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

document.getElementById("openSettings").onclick =
  () => els.settings.showModal();

document.getElementById("save").onclick = () => {
  state.date = els.date.value;
  state.time = els.time.value;
  state.tz = els.tz.value;
  els.settings.close();
};

/* ---------- Time Zones ---------- */

Intl.supportedValuesOf("timeZone").forEach(z => {
  const o = document.createElement("option");
  o.value = z;
  o.textContent = z;
  els.tz.appendChild(o);
});

/* ---------- State ---------- */

let state = {
  date: "2025-12-25",
  time: "08:00",
  tz: Intl.DateTimeFormat().resolvedOptions().timeZone
};

els.date.value = state.date;
els.time.value = state.time;
els.tz.value = state.tz;

/* ---------- Countdown ---------- */

function toUTC(date, time, tz) {
  const local = new Date(`${date}T${time}:00`);
  return new Date(
    local.toLocaleString("en-US", { timeZone: tz })
  ).getTime();
}

function updateCountdown() {
  const now = Date.now();
  const target = toUTC(state.date, state.time, state.tz);
  const diff = target - now;

  if (diff <= 0) return;

  const hoursLeft = diff / 3600000;

  document.body.classList.toggle("final12", hoursLeft <= 12);
  document.body.classList.toggle("final1", hoursLeft <= 1);

  els.days.textContent = Math.floor(diff / 86400000);
  els.hours.textContent = Math.floor(diff / 3600000) % 24;
  els.minutes.textContent = Math.floor(diff / 60000) % 60;
  els.seconds.textContent = Math.floor(diff / 1000) % 60;

  els.label.textContent =
    `Counting down to ${state.date} at ${state.time}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- Snow ---------- */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let flakes = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

window.onresize = resize;
resize();

function makeFlake() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    r: Math.random() * 3 + 1,
    s: Math.random() * 1 + 0.5
  };
}

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (flakes.length < 200) flakes.push(makeFlake());

  flakes.forEach(f => {
    f.y += f.s;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  });

  flakes = flakes.filter(f => f.y < canvas.height + 10);
  requestAnimationFrame(snow);
}

snow();
