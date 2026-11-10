/* EDIT THIS: his birthday, midnight, in HIS time zone (+08:00 = Malaysia) */
const BIRTHDAY = new Date("2026-11-10T00:00:00+08:00");

const lock = document.getElementById("lock");
const site = document.getElementById("site");
const unlocked = () => { lock.style.display = "none"; site.style.display = "block"; decorate(); };

/* Add ?preview to the link while you test */
if (new URLSearchParams(location.search).has("preview")) unlocked();

function tick(){
  const left = BIRTHDAY - new Date();
  if (left <= 0){ unlocked(); return; }
  const s = Math.floor(left / 1000);
  document.getElementById("d").textContent = Math.floor(s / 86400);
  document.getElementById("h").textContent = Math.floor(s % 86400 / 3600);
  document.getElementById("m").textContent = Math.floor(s % 3600 / 60);
  document.getElementById("s").textContent = s % 60;
  setTimeout(tick, 1000);
}

/* swaying flowers in the corners of every page section */
const NS = "http://www.w3.org/2000/svg";
function flower(size, d){
  const el = document.createElementNS(NS, "svg");
  el.setAttribute("viewBox", "0 0 100 100");
  el.innerHTML = '<use href="#f"/>';
  el.style.width = el.style.height = size + "px";
  el.style.setProperty("--d", d + "s");
  return el;
}
let decorated = false;
function decorate(){
  if (decorated) return; decorated = true;
  document.querySelectorAll(".deco").forEach((box, i) => {
    box.style.position = "relative";
    [[-14,-18,64,0],[null,-22,48,-3,-10],[-18,null,44,-6,null,-14],[null,null,70,-9,-16,-20]].forEach((c, k) => {
      const f = flower(c[2], -(k * 3 + i));
      f.classList.add("fl");
      f.style.left = c[0] === null || c[0] === undefined ? "auto" : c[0] + "px";
      f.style.right = c[0] === null ? (c[4] ?? -12) + "px" : "auto";
      f.style.top = c[1] === null ? "auto" : c[1] + "px";
      f.style.bottom = c[1] === null ? (c[5] ?? -14) + "px" : "auto";
      box.appendChild(f);
    });
  });
}
/* flowers drifting down the screen */
const rain = document.getElementById("rain");
for (let i = 0; i < 12; i++){
  const f = flower(22 + Math.random() * 22, 0);
  f.style.left = Math.random() * 100 + "%";
  f.style.setProperty("--t", 12 + Math.random() * 10 + "s");
  f.style.setProperty("--d", -Math.random() * 20 + "s");
  f.style.setProperty("--x", (Math.random() * 120 - 60) + "px");
  rain.appendChild(f);
}
/* EDIT THESE: paste your links between the quotes. Leave "" to hide that section. */
const SCRAPBOOK_URL = "";   // e.g. a Canva, Google Drive, Google Slides or Flipbook link
const SPOTIFY_URL   = "https://open.spotify.com/playlist/3lXswz5wIyUz0MJM6N8EZR?si=d98ffed62ef348a5";   // Spotify playlist, album or song link (Share > Copy link)

(function(){
  if (SCRAPBOOK_URL){
    document.getElementById("scrapbookLink").href = SCRAPBOOK_URL;
    document.getElementById("scrapbook").hidden = false;
  }
  const m = SPOTIFY_URL.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|playlist|album)\/([A-Za-z0-9]+)/);
  if (m){
    document.getElementById("spotifyLink").href = SPOTIFY_URL;
    document.getElementById("player").innerHTML =
      '<iframe title="Spotify player" src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] +
      '" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
    document.getElementById("songs").hidden = false;
  }
})();

/* birthday cake: blow out the candles */
(function(){
  const box = document.getElementById("cakeBox"), btn = document.getElementById("blow"), txt = document.getElementById("wishText");
  btn.addEventListener("click", () => {
    const out = !box.classList.contains("out");
    box.classList.toggle("out", out);
    btn.textContent = out ? "Light them again" : "Blow out the candles";
    txt.textContent = out ? "Happy birthday, Hakeemi. I hope your wish comes true." : "Close your eyes, think of one wish, then blow out the candles.";
    if (out && !matchMedia("(prefers-reduced-motion: reduce)").matches){
      for (let i = 0; i < 14; i++){
        const f = flower(34, -i);
        f.classList.add("burst");
        const a = Math.random() * Math.PI * 2, r = 90 + Math.random() * 90;
        f.style.setProperty("--bx", Math.cos(a) * r + "px");
        f.style.setProperty("--by", Math.sin(a) * r - 20 + "px");
        f.style.animationDelay = "0s"; f.style.animationName = "burst,tint";
        box.appendChild(f);
        setTimeout(() => f.remove(), 1900);
      }
    }
  });
})();

/* hero: bunting flags and floating hearts */
(function(){
  const bunting = document.getElementById("bunting");
  for (let i = 0; i < 14; i++){
    const flag = document.createElement("span");
    flag.style.setProperty("--d", -i * 0.35 + "s");
    bunting.appendChild(flag);
  }
  const hero = document.querySelector(".hero");
  const colours = ["#8a2f3a", "#d96b8a", "#7d8a4f", "#e0a050"];
  for (let i = 0; i < 9; i++){
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "\u2665";
    heart.style.left = Math.random() * 95 + "%";
    heart.style.fontSize = 16 + Math.random() * 22 + "px";
    heart.style.color = colours[i % colours.length];
    heart.style.setProperty("--t", 9 + Math.random() * 6 + "s");
    heart.style.setProperty("--d", -Math.random() * 12 + "s");
    heart.style.setProperty("--x", Math.random() * 80 - 40 + "px");
    hero.appendChild(heart);
  }
})();

/* scrapbook decorations: stickers, washi tape and little labels */
(function(){
  const put = (parent, o) => {
    const e = document.createElement("span");
    e.className = "stk"; e.setAttribute("aria-hidden", "true");
    e.style.setProperty("--img", "var(--" + o[0] + ")");
    e.style.setProperty("--s", o[4]);
    e.style.setProperty("--rot", o[5] + "deg");
    e.style.setProperty("--d", -Math.random() * 3 + "s");
    e.style.top = o[2] + "%";
    e.style[o[1] === "r" ? "right" : "left"] = o[3] + "%";
    parent.appendChild(e);
  };
  /* [sticker, side, top %, side %, size px, rotation] */
  const hero = [
    ["cherry","l",22,5,84,-14], ["sparkle","r",30,6,64,10], ["heart","l",68,7,80,-8],
    ["star","r",70,8,78,16], ["butterfly","r",12,4,70,12], ["smile","l",44,3,66,-10]
  ];
  const lock = [
    ["heart","l",18,8,70,-10], ["sparkle","r",14,10,60,12],
    ["cherry","r",74,8,80,12], ["bow","l",72,9,80,-12]
  ];
  const bands = [
    [["daisy","l",36,2,72,-10], ["strawberry","r",30,2,70,12], ["notea","l",68,3,84,-8], ["sparkle","r",62,5,54,20]],
    [["butterfly","l",30,2,76,-12], ["cherry","r",44,3,74,10], ["ticket","l",70,4,90,-10], ["smile","r",68,3,70,12]],
    [["strawberry","l",34,3,72,-10], ["sparkle-pink","r",26,3,60,14], ["daisy","r",64,4,80,10], ["noteb","l",74,5,80,-12]],
    [["smile","l",28,3,72,-12], ["heart","r",34,3,74,12], ["daisy","l",66,6,72,-8], ["butterfly","r",64,4,74,14]],
    [["butterfly","l",26,3,76,-12], ["ticket","r",40,2,88,10], ["strawberry","l",68,5,72,-10], ["sparkle","r",70,6,56,18]],
    [["daisy","l",30,3,76,-10], ["cherry","r",30,2,74,12], ["notea","l",66,4,82,-8], ["smile","r",66,4,70,12]],
    [["sparkle-pink","l",32,3,62,-12], ["butterfly","r",28,3,74,12], ["strawberry","l",68,5,72,-10], ["daisy","r",66,4,78,10]],
    [["daisy","l",30,3,76,-10], ["heart","r",34,3,70,12], ["strawberry","l",70,4,70,-10], ["sparkle","r",66,5,58,18]],
    [["sparkle-pink","l",30,3,62,-10], ["butterfly","r",34,3,74,12], ["daisy","l",72,4,74,-8], ["heart","r",68,5,66,16]],
    [["heart","l",28,3,72,-12], ["ticket","r",40,3,88,10], ["daisy","l",66,6,76,-8], ["sparkle","r",68,5,58,16]]
  ];
  const chips = ["forever \u2665","you + me","my fave","xoxo","always","mine","hehe","for you","open me","so us"];
  hero.forEach(o => put(document.querySelector(".hero"), o));
  lock.forEach(o => put(document.getElementById("lock"), o));
  document.querySelectorAll(".band").forEach((b, i) => {
    (bands[i] || []).forEach(o => put(b, o));
    const c = document.createElement("span");
    c.className = "chip"; c.textContent = chips[i % chips.length];
    b.appendChild(c);
  });
  document.querySelectorAll(".sheet").forEach((sh, i) => {
    const t = document.createElement("i");
    t.className = "tape " + (i % 2 ? "r" : "l") + " t" + (i % 3 + 1);
    t.setAttribute("aria-hidden", "true");
    sh.appendChild(t);
  });
})();

/* greeting card: tap to open */
(function(){
  const card = document.getElementById("card3d"), hint = document.getElementById("cardHint");
  if (!card) return;
  const toggle = () => {
    const open = !card.classList.contains("open");
    card.classList.toggle("open", open);
    card.setAttribute("aria-expanded", open);
    card.setAttribute("aria-label", open ? "Close the card" : "Open the card");
    hint.textContent = open ? "tap the card to close it" : "tap the card to open it";
    if (open && !matchMedia("(prefers-reduced-motion: reduce)").matches){
      for (let i = 0; i < 14; i++){
        const f = flower(34, -i);
        f.classList.add("burst");
        const a = Math.random() * Math.PI * 2, r = 90 + Math.random() * 90;
        f.style.top = "45%";
        f.style.setProperty("--bx", Math.cos(a) * r + "px");
        f.style.setProperty("--by", Math.sin(a) * r - 20 + "px");
        f.style.animationDelay = "0s"; f.style.animationName = "burst,tint";
        card.appendChild(f);
        setTimeout(() => f.remove(), 1900);
      }
    }
  };
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " "){ e.preventDefault(); toggle(); }
  });
})();

decorate();
tick();