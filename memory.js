/* ============================================
   我们的故事 - 回忆时间线
   ============================================ */

/* ===== 故事数据（在这里添加你的内容） ===== */
const MEMORIES = [
    {
    date: "2024 · 8 · 5",
    title: "这是属于我们的演唱会",
    text: "歌声在我们耳边萦绕，我们没人在意，只想更靠近你一点",
    images: ["img/memory1_1.jpg"],
    season: "summer",
    song: { name: "我们的歌 · 2024", file: "song/1.m4a" }
  }, 
  {
    date: "2024 · 8 · 13",
    title: "我们暧昧的去爬山",
    text: "你说「好啊」的时候，我就知道这辈子稳了。那天风很大，你的手很小。",
    images: ["img/memory1_2.jpg", "img/memory1_3.jpg"],
    season: "summer",
    song: { name: "我们的歌 · 2024", file: "song/2.m4a" }
  },
  {
    date: "2024 · 8 · 15",
    title: "第一次分别",
    text: "你躺在我怀里时，当时的我有没有后悔送你上车的时候没有记录下来。",
    images: ["img/memory3_1.jpg", "img/memory3_2.jpg","img/memory3_3.jpg", "img/memory3_4.jpg"],
    season: "summer",
    song: { name: "想见面", file: "song/4.m4a" }
  },
  {
    date: "2024 · 9 · 1",
    title: "真的好担心你",
    text: "严厉的谴责你，不要理你了！！！",
    images: ["img/memory5_1.jpg","img/memory5_2.jpg","img/memory5_3.jpg"],
    season: "autumn",
    song: { name: "不想理你", file: "song/3.m4a" }
  },
  {
    date: "2024 · 9 · 18",
    title: "众人赏天上月，我赏心中明月。",
    text: "大大方方的接受大家的祝福，我这颗铁树也是会开花滴！！！",
    images: ["img/memory4_1.jpg","img/memory4_2.jpg","img/memory4_3.jpg"],
    season: "autumn",
    song: { name: "我的月亮", file: "song/7.m4a" }
  },
  {
    date: "2024 · 9 · 25",
    title: "毕业快乐",
    text: "如果可以的话，毕业不是一个很快乐的事情，你庆幸有我吗",
    images: ["img/memory6_1.jpg","img/memory6_2.jpg","img/memory6_3.jpg"],
    season: "autumn",
    song: { name: "永远的小朋友", file: "song/5.m4a" }
  },
  {
    date: "2024 · 10 · 16",
    title: "生日快乐",
    text: "可否再许我以后无数个秋天。",
    images: ["img/memory7_1.jpg","img/memory7_2.jpg","img/memory7_3.jpg","img/memory7_4.jpg","img/memory7_5.jpg"],
    season: "winter",
    song: { name: "生日快乐", file: "song/6.m4a" }
  },
   {
    date: "2024 · 冬天",
    title: "不想上班的bb",
    text: "恶狠狠的说：“不想上班！！！”",
    images: ["img/memory8_1.jpg","img/memory8_2.jpg","img/memory8_3.jpg","img/memory8_4.jpg","img/memory8_5.jpg",
        "img/memory8_6.jpg"],
    season: "winter",
    song: { name: "去死吧工作", file: "song/9.m4a" }
  },
  {
    date: "2024 · 12",
    title: "下雪那天还没有到，我先到了",
    text: "你把手塞进我口袋，说「好暖」。其实心跳更快的是我。",
    images: ["img/memory9_1.jpg","img/memory9_2.jpg","img/memory9_3.jpg","img/memory9_4.jpg"],
    season: "winter",
    song: { name: "小雪", file: "song/8.m4a" }
  },
  {
    date: "2025 · 12· 16",
    title: "蛋炒饭！！！不，我们的第一次跨年",
    text: "就说我厉不厉害哼哼",
    images: ["img/memory10_1.jpg","img/memory10_2.jpg","img/memory10_3.jpg","img/memory10_4.jpg","img/memory10_5.jpg"],
    season: "winter",
    song: { name: "哼哼", file: "song/11.m4a" }
  },
  {
    date: "2025 · 训练营",
    title: "要不要那么幸福的一百天",
    text: "就喜欢和香香软软的小张同学黏在一起。",
    images: ["img/memory11_1.jpg","img/memory11_2.jpg","img/memory11_3.jpg","img/memory11_4.jpg","img/memory11_5.jpg",
      "img/memory11_6.jpg","img/memory11_7.jpg","img/memory11_8.jpg","img/memory11_9.jpg","img/memory11_10.jpg",
      "img/memory11_11.jpg","img/memory11_12.jpg","img/memory11_13.jpg"
    ],
    season: "winter",
    song: { name: "100分", file: "song/10.m4a" }
  },
  {
    date: "2025 · 新年",
    title: "我的新年！！！不，我们的新年年",
    text: "新年快乐宝贝媳妇儿",
    images: ["img/memory12_1.jpg"],
    season: "winter",
    song: { name: "新年 · 烟花",  file: "song/12.m4a"  }
  },
  {
    date: "2026 · 现在",
    title: "三年了",
    text: "教室窗口换了几茬人，我们还在。从第一扇窗到未来每一扇窗，我都想和你一起看。我想和你有一个家。",
    images: [],
    season: "spring",
    song: { name: "主题曲",  file: "song/13.m4a"  }
  }
];

/* ===== 季节配色（跟随全局） ===== */
const SEASON_BG = {
  spring: "#0d0a12", summer: "#060d08", autumn: "#0f0a04", winter: "#04060c"
};

/* ===== 渲染时间线 ===== */
function renderTimeline() {
  const container = document.getElementById("timeline");
  if (!container) return;

  container.innerHTML = "";
  MEMORIES.forEach((mem, idx) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.style.animationDelay = (idx * 0.12) + "s";

    // 图片网格
    const imgCount = mem.images ? mem.images.length : 0;
    let imagesHTML = "";
    if (imgCount > 0) {
      imagesHTML = `<div class="mem-images count-${Math.min(imgCount, 6)}">`;
      mem.images.forEach((src, i) => {
        imagesHTML += `<img class="mem-img" src="${src}" alt="${mem.title} ${i+1}" onclick="openLightbox(${idx}, ${i})" onerror="this.style.display='none'">`;
      });
      imagesHTML += `</div>`;
    }

    // 歌曲
    let songHTML = "";
    if (mem.song) {
      songHTML = `
        <div class="mem-song">
          <button class="play-btn" onclick="toggleMemorySong('${mem.song.file}', this)">▶</button>
          <span>♪ ${mem.song.name}</span>
        </div>`;
    }

    card.innerHTML = `
      <span class="season-tag ${mem.season}">${getSeasonIcon(mem.season)} ${getSeasonName(mem.season)}</span>
      <div class="mem-date">${mem.date}</div>
      <div class="mem-story-title">${mem.title}</div>
      <div class="mem-text">${mem.text}</div>
      ${imagesHTML}
      ${songHTML}
    `;
    container.appendChild(card);
  });
}

function getSeasonIcon(s) { return { spring: "🌸", summer: "🌿", autumn: "🍂", winter: "❄️" }[s] || ""; }
function getSeasonName(s) { return { spring: "春天", summer: "夏天", autumn: "秋天", winter: "冬天" }[s] || ""; }

/* ===== Lightbox 图片放大 ===== */
let lightboxData = { memoryIdx: 0, imgIdx: 0 };

function openLightbox(memIdx, imgIdx) {
  lightboxData = { memoryIdx: memIdx, imgIdx: imgIdx };
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  img.src = MEMORIES[memIdx].images[imgIdx];
  lb.classList.add("show");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
}

function lightboxPrev() {
  const mem = MEMORIES[lightboxData.memoryIdx];
  lightboxData.imgIdx = (lightboxData.imgIdx - 1 + mem.images.length) % mem.images.length;
  document.getElementById("lightboxImg").src = mem.images[lightboxData.imgIdx];
}
function lightboxNext() {
  const mem = MEMORIES[lightboxData.memoryIdx];
  lightboxData.imgIdx = (lightboxData.imgIdx + 1) % mem.images.length;
  document.getElementById("lightboxImg").src = mem.images[lightboxData.imgIdx];
}

// 键盘控制 lightbox
document.addEventListener("keydown", e => {
  const lb = document.getElementById("lightbox");
  if (!lb.classList.contains("show")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxPrev();
  if (e.key === "ArrowRight") lightboxNext();
});

/* ===== 回忆歌曲播放 ===== */
let memAudio = null;
let currentSongBtn = null;

function toggleMemorySong(file, btn) {
  if (!memAudio) memAudio = new Audio();
  
  if (memAudio.src.includes(file) && !memAudio.paused) {
    memAudio.pause();
    btn.textContent = "▶";
  } else {
    // 停止其他正在播的
    if (currentSongBtn && currentSongBtn !== btn) currentSongBtn.textContent = "▶";
    
    memAudio.src = file;
    memAudio.play().then(() => {
      btn.textContent = "⏸";
      currentSongBtn = btn;
    }).catch(() => console.log("播放失败"));
  }
}

/* ===== 回到顶部 ===== */
function initBackTop() {
  const btn = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) btn.classList.add("show");
    else btn.classList.remove("show");
  });
}

/* ===== 初始化 ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  initBackTop();

  // 背景跟随最后一条的季节
  const lastSeason = MEMORIES[MEMORIES.length - 1].season;
  document.body.style.background = SEASON_BG[lastSeason];
});