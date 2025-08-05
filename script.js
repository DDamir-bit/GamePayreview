const names = [
  "Иван Иванов","Мария Смирнова","Алексей Кузнецов","Ольга Петрова","Дмитрий Соколов",
  "Пудж","Эщкере","сигмооо бой","олежаа","DarkKnight","ShadowX","PixelMaster","TurboDude","NeoHunter",
  "Виталий Орлов","Егор Панкратов","Антон Белый","Сергей Чернов","Никита Громов","Маша Лис","FireWolf",
  "StormBreaker","IronGiant","SilentShadow","GhostRider","NightFury","BluePhoenix","MegaBlast","KingSlayer"
];

const texts = [
  "Алмазы пришли за пару минут, доволен!",
  "Гемы прилетели моментально, магазин 🔥",
  "Робуксы зашли без проблем, рекомендую.",
  "Гемы реально бустят аккаунт, топ.",
  "Алмазы заказывал не первый раз — всё супер!",
  "Робаксы получил быстро, админы красавцы!",
  "Гемы работают чётко, буду брать ещё.",
  "Алмазы пришли быстрее чем ожидал.",
  "Робуксы моментально, лучший сервис.",
  "Гемы дешевле чем у всех!"
];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const date = new Date(past.getTime() + Math.random() * (now - past));
  return date.toLocaleDateString('ru-RU');
}

function randomAvatar() {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const id = Math.floor(Math.random() * 90);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

function createStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function generateReviews(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      name: randomChoice(names),
      avatar: randomAvatar(),
      date: randomDate(),
      text: randomChoice(texts),
      rating: Math.random() > 0.15 ? 5 : 4
    });
  }
  return arr;
}

const reviews = generateReviews(100);

function renderReviews() {
  const container = document.getElementById('reviews');
  container.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `
      <img class="avatar" src="${r.avatar}" alt="${r.name}">
      <div class="review-content">
        <div class="review-name">${r.name}</div>
        <div class="review-date">${r.date}</div>
        <div class="review-text">${r.text}</div>
        <div class="review-stars">${createStars(r.rating)}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

renderReviews();