/* ============================================
   三周年纪念网页 - 完整交互逻辑 (含背景音乐)
   ============================================ */

/* ===== 照片数据 ===== */
const PHOTOS = [
  { src: "1.jpg", date: "第一天", text: "从这里开始" },
  { src: "2.jpg", date: "某一天", text: "一起走过的路" },
  { src: "3.jpg", date: "今天", text: "还在继续" },
  { src: "4.jpg", date: "永远", text: "从第一扇窗口到未来每一扇窗，我都想和你一起看" }
];

let currentPhotoIndex = 0;
let autoPlayTimer = null;
let currentSeason = "spring";

/* ===== 音乐系统 ===== */
const MUSIC_FILES = {
  spring: "music/spring.mp3",
  summer: "music/summer.mp3",
  autumn: "music/autumn.mp3",
  winter: "music/winter.mp3"
};

let bgmAudio = null;
let musicEnabled = false;
let musicStarted = false;

function initMusic() {
  if (bgmAudio) return;
  bgmAudio = new Audio();
  bgmAudio.loop = true;
  bgmAudio.volume = 0.35; // 默认音量
  bgmAudio.preload = "auto";
}

function loadSeasonMusic(season) {
  initMusic();
  const src = MUSIC_FILES[season];
  if (!src) return;

  // 如果当前正在播同一首，不重新加载
  if (bgmAudio.src && bgmAudio.src.includes(src) && !bgmAudio.paused) {
    return;
  }

  // 淡出当前
  fadeOutAudio(() => {
    bgmAudio.src = src;
    bgmAudio.load();

    if (musicEnabled) {
      bgmAudio.play().then(() => {
        fadeInAudio();
        musicStarted = true;
        updateMusicBtn();
        showMusicHint(getSeasonName(season) + " · 正在播放");
      }).catch(err => {
        console.log("自动播放被浏览器拦截，需用户点击");
        updateMusicBtn();
      });
    }
  });
}

function fadeOutAudio(callback) {
  if (!bgmAudio || bgmAudio.paused || bgmAudio.volume <= 0.05) {
    if (callback) callback();
    return;
  }
  let v = bgmAudio.volume;
  const step = setInterval(() => {
    v -= 0.08;
    if (v <= 0.05) {
      clearInterval(step);
      bgmAudio.volume = 0;
      if (callback) callback();
    } else {
      bgmAudio.volume = v;
    }
  }, 60);
}

function fadeInAudio() {
  if (!bgmAudio) return;
  bgmAudio.volume = 0;
  let v = 0;
  const target = 0.35;
  const step = setInterval(() => {
    v += 0.05;
    if (v >= target) {
      clearInterval(step);
      bgmAudio.volume = target;
    } else {
      bgmAudio.volume = v;
    }
  }, 80);
}

function toggleMusic() {
  initMusic();
  musicEnabled = !musicEnabled;

  if (musicEnabled) {
    // 第一次点击：加载当前季节音乐
    if (!musicStarted) {
      loadSeasonMusic(currentSeason);
    } else {
      bgmAudio.play().then(() => {
        fadeInAudio();
        updateMusicBtn();
        showMusicHint("音乐已开启");
      }).catch(() => {
        showMusicHint("播放失败，请重试");
      });
    }
  } else {
    fadeOutAudio(() => {
      bgmAudio.pause();
      updateMusicBtn();
      showMusicHint("音乐已暂停");
    });
  }
}

function updateMusicBtn() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  if (musicEnabled && !bgmAudio.paused) {
    btn.classList.add("playing");
    btn.classList.remove("muted");
    btn.textContent = "🎵";
  } else if (musicEnabled) {
    btn.classList.remove("playing");
    btn.classList.add("muted");
    btn.textContent = "🎵";
  } else {
    btn.classList.remove("playing");
    btn.classList.add("muted");
    btn.textContent = "🔇";
  }
}

function showMusicHint(text) {
  let hint = document.querySelector(".music-hint");
  if (!hint) {
    hint = document.createElement("div");
    hint.className = "music-hint";
    document.body.appendChild(hint);
  }
  hint.textContent = text;
  hint.classList.add("show");
  clearTimeout(hint._timer);
  hint._timer = setTimeout(() => hint.classList.remove("show"), 2500);
}

function getSeasonName(s) {
  return { spring: "春", summer: "夏", autumn: "秋", winter: "冬" }[s] || s;
}

/* ===== 季节切换 ===== */
function setSeason(season, btnObj) {
  currentSeason = season;
  document.body.className = "season-" + season;

  document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
  if (btnObj) {
    btnObj.classList.add("active");
  } else {
    const defaultBtn = document.querySelector(`.season-btn[data-season="${season}"]`);
    if (defaultBtn) defaultBtn.classList.add("active");
  }

  switchBgPhoto(season);

  // ★ 切换季节音乐
  loadSeasonMusic(season);

  protectTopButtons();
}

function switchBgPhoto(season) {
  const bgMap = { spring: "spring.jpg", summer: "summer.jpg", autumn: "autumn.jpg", winter: "winter.jpg" };
  const bg = document.querySelector(".bg-photo");
  if (bg) bg.style.backgroundImage = `url(${bgMap[season]})`;
}

/* ===== 自动轮播 ===== */
function toggleAutoPlay() {
  const btn = document.getElementById("autoPlayBtn");
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
    if (btn) btn.classList.remove("playing");
    showMusicHint("轮播已停止");
  } else {
    if (btn) btn.classList.add("playing");
    const seasons = ["spring", "summer", "autumn", "winter"];
    let idx = seasons.indexOf(currentSeason);
    autoPlayTimer = setInterval(() => {
      idx = (idx + 1) % 4;
      const next = seasons[idx];
      const btnObj = document.querySelector(`.season-btn[data-season="${next}"]`);
      setSeason(next, btnObj);
    }, 2500);
    showMusicHint("自动轮播中...");
  }
  protectTopButtons();
}

/* ===== 顶部按钮强制保护 ===== */
function protectTopButtons() {
  document.querySelectorAll(".season-btn, .auto-play-btn").forEach(btn => {
    btn.style.pointerEvents = "auto";
    btn.style.zIndex = "9999";
    btn.style.cursor = "pointer";
  });
  const switcher = document.querySelector(".season-switcher");
  if (switcher) {
    switcher.style.pointerEvents = "auto";
    switcher.style.zIndex = "9998";
  }
  // 音乐按钮也保护
  const musicBtn = document.getElementById("musicBtn");
  if (musicBtn) {
    musicBtn.style.pointerEvents = "auto";
    musicBtn.style.zIndex = "10000";
  }
}

/* ===== 照片弹窗 ===== */
function openPhoto() {
  const modal = document.getElementById("photoModal");
  if (modal) {
    modal.classList.add("show");
    showPhoto(0);
    const nav = document.querySelector(".nav-cards");
    if (nav) nav.style.pointerEvents = "none";
    protectTopButtons();
  }
  
}

function showPhoto(index) {
  currentPhotoIndex = index;
  const photo = PHOTOS[index];
  const modalPhoto = document.getElementById("modalPhoto");
  const storyDate = document.querySelector(".photo-story .story-date");
  const storyText = document.querySelector(".photo-story .story-text");
  if (modalPhoto) modalPhoto.src = photo.src;
  if (storyDate) storyDate.textContent = photo.date;
  if (storyText) {
    storyText.style.opacity = "0";
    setTimeout(() => { storyText.textContent = photo.text; storyText.style.opacity = "1"; }, 200);
  }
  updateDots();
}

function updateDots() {
  const dotsContainer = document.getElementById("photoDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  PHOTOS.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "photo-dot" + (i === currentPhotoIndex ? " active" : "");
    dot.onclick = () => showPhoto(i);
    dotsContainer.appendChild(dot);
  });
}

function prevPhoto() {
  let idx = currentPhotoIndex - 1;
  if (idx < 0) idx = PHOTOS.length - 1;
  showPhoto(idx);
  const frame = document.getElementById("modalFrame");
  if (frame) { frame.style.transform = "translateX(-20px)"; frame.style.opacity = "0.5"; setTimeout(() => { frame.style.transform = "translateX(0)"; frame.style.opacity = "1"; }, 100); }
  protectTopButtons();
}

function nextPhoto() {
  let idx = currentPhotoIndex + 1;
  if (idx >= PHOTOS.length) idx = 0;
  showPhoto(idx);
  const frame = document.getElementById("modalFrame");
  if (frame) { frame.style.transform = "translateX(20px)"; frame.style.opacity = "0.5"; setTimeout(() => { frame.style.transform = "translateX(0)"; frame.style.opacity = "1"; }, 100); }
  protectTopButtons();
}

function closePhoto() {
  const modal = document.getElementById("photoModal");
  if (modal) modal.classList.remove("show");
  const nav = document.querySelector(".nav-cards");
  if (nav) nav.style.pointerEvents = "auto";
  protectTopButtons();
}

/* ===== 初始化 ===== */
document.addEventListener("DOMContentLoaded", () => {
  setSeason("spring", document.querySelector('.season-btn[data-season="spring"]'));
  protectTopButtons();
  initMusic();

  const tree = document.getElementById("tree");
  if (tree) tree.addEventListener("click", openPhoto);

  const content = document.querySelector(".photo-modal-content");
  if (content) content.addEventListener("click", e => e.stopPropagation());

  document.addEventListener("keydown", e => {
    const modal = document.getElementById("photoModal");
    if (!modal || !modal.classList.contains("show")) return;
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "Escape") closePhoto();
  });

  updateDots();
  setTimeout(protectTopButtons, 100);

  // 用户首次交互后尝试自动播放音乐（浏览器策略）
  let userInteracted = false;
  const unlockAudio = () => {
    if (userInteracted) return;
    userInteracted = true;
    if (musicEnabled) loadSeasonMusic(currentSeason);
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("touchstart", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };
  document.addEventListener("click", unlockAudio);
  document.addEventListener("touchstart", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
});
