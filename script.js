"use strict";

/* ============ DỮ LIỆU ============ */
// Ảnh để trong thư mục images/. Nếu chưa có ảnh, trang sẽ hiện màu nền thay thế.
const places = [
  { name: "Hồ Xuân Hương", type: "thien-nhien", img: "ho-xuan-huong.webp", colors: ["#6f9aa6", "#3d6672"],
    desc: "Hồ nằm giữa trung tâm thành phố, đi bộ hoặc đạp xe quanh hồ mất khoảng một giờ.",
    meta: "Trung tâm thành phố" },
  { name: "Đồi chè Cầu Đất", type: "thien-nhien", img: "doi-che-cau-dat.webp", colors: ["#7fa66b", "#41693a"],
    desc: "Đồi chè xanh, nổi tiếng với cảnh săn mây vào sáng sớm.",
    meta: "Cách trung tâm khoảng 25 km" },
  { name: "Thác Datanla", type: "thien-nhien", img: "thac-datanla.jpg", colors: ["#5f8f7d", "#2b5546"],
    desc: "Thác nằm trong rừng thông, có máng trượt và đường mòn đi bộ xuống thác.",
    meta: "Đèo Prenn, cách trung tâm khoảng 5 km" },
  { name: "Núi Langbiang", type: "thien-nhien", img: "nui-liangbiang.jpg", colors: ["#8aa17a", "#4b6542"],
    desc: "Đỉnh cao hơn 2.100 m, đứng trên đỉnh nhìn được toàn cảnh cao nguyên.",
    meta: "Cách trung tâm khoảng 12 km" },
  { name: "Ga Đà Lạt", type: "van-hoa", img: "ga-dalat.webp", colors: ["#c9a46a", "#8a6a36"],
    desc: "Nhà ga xây từ năm 1938, có kiến trúc độc đáo và là một trong những nhà ga cổ đẹp nhất Việt Nam.",
    meta: "Đường Quang Trung" },
  { name: "Dinh Bảo Đại", type: "van-hoa", img: "dinh-bao-dai-da-lat.jpg", colors: ["#b58b6b", "#6e4d37"],
    desc: "Dinh thự của vua Bảo Đại, giữ lại nhiều đồ dùng và bố cục nội thất thời trước.",
    meta: "Trên đồi, phía nam thành phố" },
  { name: "Chợ Đà Lạt và chợ đêm", type: "am-thuc", img: "cho-dem-dalat.webp", colors: ["#d98a5e", "#9c4f2a"],
    desc: "Chỗ để thử bánh tráng nướng, sữa đậu nành nóng, mứt, atiso và các loại rau củ địa phương.",
    meta: "Mở sớm; chợ đêm từ chiều tối" },
  { name: "Lẩu gà lá é", type: "am-thuc", img: "lau-ga.jpg", colors: ["#c9b15c", "#857325"],
    desc: "Món lẩu nước dùng thơm lá é, thích hợp ăn buổi tối khi trời se lạnh.",
    meta: "Có ở nhiều quán trong trung tâm" }
];

const itineraries = {
  "2n1d": [
    { when: "Ngày 1, sáng", what: "Hồ Xuân Hương và ga Đà Lạt", note: "Đi dạo quanh hồ, sau đó tham quan nhà ga cổ." },
    { when: "Ngày 1, chiều", what: "Dinh Bảo Đại và Thác Datanla", note: "Tham quan dinh thự rồi lên đèo Prenn xem thác." },
    { when: "Ngày 1, tối", what: "Chợ đêm", note: "Ăn bánh tráng nướng, uống sữa đậu nành nóng, mua quà." },
    { when: "Ngày 2, sáng sớm", what: "Đồi chè Cầu Đất", note: "Xuất phát sớm để kịp thấy mây." },
    { when: "Ngày 2, trưa", what: "Ăn trưa và mua đặc sản", note: "Mứt, trà atiso, cà phê trước khi ra về." }
  ],
  "3n2d": [
    { when: "Ngày 1", what: "Hồ Xuân Hương, ga Đà Lạt, chợ đêm", note: "Ngày nhẹ để làm quen thành phố." },
    { when: "Ngày 2, sáng", what: "Núi Langbiang", note: "Đi sớm để tránh nắng và đông người." },
    { when: "Ngày 2, chiều", what: "Dinh Bảo Đại, Thác Datanla", note: "Hai điểm gần nhau trên cùng hướng đi." },
    { when: "Ngày 2, tối", what: "Lẩu gà lá é", note: "Bữa tối ấm bụng sau một ngày đi nhiều." },
    { when: "Ngày 3, sáng sớm", what: "Đồi chè Cầu Đất", note: "Săn mây và chụp ảnh đồi chè." },
    { when: "Ngày 3, trưa", what: "Mua đặc sản rồi về", note: "Chợ Đà Lạt là chỗ tiện nhất để mua quà." }
  ]
};

/* ============ TIỆN ÍCH ============ */
// Gắn ảnh thật (nếu có) lên trên màu nền thay thế
function setBackground(el, place) {
  el.style.backgroundImage =
    `url("images/${place.img}"), linear-gradient(135deg, ${place.colors[0]}, ${place.colors[1]})`;
}

const $ = (selector) => document.querySelector(selector);

/* ============ MENU ĐIỆN THOẠI ============ */
const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  }
});

/* ============ ĐIỂM ĐẾN + BỘ LỌC ============ */
const cardsBox = $("#cards");
const filterBox = $("#filters");

function renderCards(filter) {
  const list = filter === "all" ? places : places.filter((p) => p.type === filter);
  cardsBox.innerHTML = "";

  if (list.length === 0) {
    cardsBox.innerHTML = '<p class="empty">Chưa có điểm đến nào trong nhóm này.</p>';
    return;
  }

  list.forEach((place) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img" role="img" aria-label="${place.name}"></div>
      <div class="card-body">
        <h3>${place.name}</h3>
        <p>${place.desc}</p>
        <span class="card-meta">${place.meta}</span>
      </div>`;
    setBackground(card.querySelector(".card-img"), place);
    cardsBox.appendChild(card);
  });
}

filterBox.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filterBox.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  renderCards(chip.dataset.filter);
});

/* ============ LỊCH TRÌNH ============ */
const timeline = $("#timeline");
const tabBox = $("#tabs");

function renderTimeline(key) {
  timeline.innerHTML = itineraries[key]
    .map((step) => `<li><strong>${step.when}: ${step.what}</strong><span>${step.note}</span></li>`)
    .join("");
}

tabBox.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  tabBox.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  renderTimeline(tab.dataset.day);
});

/* ============ THƯ VIỆN ẢNH + LIGHTBOX ============ */
const gallery = $("#gallery");
const lightbox = $("#lightbox");
const lbImg = $("#lbImg");
const lbCap = $("#lbCap");
let current = 0;

places.slice(0, 6).forEach((place, index) => {
  const btn = document.createElement("button");
  btn.className = "thumb";
  btn.setAttribute("aria-label", "Xem ảnh " + place.name);
  btn.innerHTML = `<span>${place.name}</span>`;
  setBackground(btn, place);
  btn.addEventListener("click", () => openLightbox(index));
  gallery.appendChild(btn);
});

const galleryCount = Math.min(6, places.length);

function showImage(index) {
  current = (index + galleryCount) % galleryCount;
  setBackground(lbImg, places[current]);
  lbCap.textContent = places[current].name;
}
function openLightbox(index) {
  showImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => showImage(current - 1));
$("#lbNext").addEventListener("click", () => showImage(current + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(current - 1);
  if (e.key === "ArrowRight") showImage(current + 1);
});

/* ============ FORM LIÊN HỆ ============ */
const form = $("#form");
const fields = [
  { id: "name", err: "nameErr", check: (v) => v.trim().length >= 2, message: "Vui lòng nhập họ tên (ít nhất 2 ký tự)." },
  { id: "email", err: "emailErr", check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: "Email chưa đúng định dạng, ví dụ: ten@gmail.com." },
  { id: "msg", err: "msgErr", check: (v) => v.trim().length >= 10, message: "Nội dung cần ít nhất 10 ký tự." }
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  fields.forEach((f) => {
    const input = document.getElementById(f.id);
    const ok = f.check(input.value);
    input.classList.toggle("invalid", !ok);
    document.getElementById(f.err).textContent = ok ? "" : f.message;
    if (!ok) valid = false;
  });

  const success = $("#success");
  if (valid) {
    success.textContent = "Đã gửi câu hỏi. Cảm ơn bạn!";
    form.reset();
  } else {
    success.textContent = "";
  }
});

/* ============ TÔ ĐẬM MỤC MENU ĐANG XEM ============ */
const links = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

/* ============ KHỞI TẠO ============ */
renderCards("all");
renderTimeline("2n1d");
