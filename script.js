const roflNames = ["Пудж","Эщкере","сигмооо бой","олежаа"];
const englishAvatars = [
  "https://i.ibb.co/HPpQvjm/anime1.jpg",
  "https://i.ibb.co/sqWknXy/anime2.jpg",
  "https://i.ibb.co/37gSpjX/game1.jpg",
  "https://i.ibb.co/4ZKbn4J/game2.jpg"
];
const roflAvatars = [
  "https://i.ibb.co/Z2skQQN/meme1.jpg",
  "https://i.ibb.co/y5D6bkX/meme2.jpg",
  "https://i.ibb.co/zH7kP7D/meme3.jpg"
];

const names = [
  "Иван Иванов","Мария Смирнова","Алексей Кузнецов","Ольга Петрова","Дмитрий Соколов",
  "Пудж","Эщкере","сигмооо бой","олежаа","DarkKnight","ShadowX","PixelMaster","TurboDude","NeoHunter",
  "Виталий Орлов","Егор Панкратов","Антон Белый","Сергей Чернов","Никита Громов"
];

const texts = [
  "Алмазы пришли за пару минут!",
  "Гемы прилетели моментально 🔥",
  "Робуксы зашли без проблем!",
  "Гемы реально бустят аккаунт!",
  "Алмазы заказывал не первый раз — всё супер!",
  "Робаксы получил быстро, админы красавцы!"
];

function randomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const date = new Date(past.getTime() + Math.random() * (now - past));
  return date.toLocaleDateString('ru-RU');
}

function avatarForName(name) {
  if (/\s/.test(name)) { 
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random()*90)}.jpg`;
  }
  if (roflNames.includes(name)) return roflAvatars[Math.floor(Math.random()*roflAvatars.length)];
  return englishAvatars[Math.floor(Math.random()*englishAvatars.length)];
}

function createStars(r) { return "★".repeat(r)+"☆".repeat(5-r); }

const reviews = Array.from({length: 100}, () => ({
  name: names[Math.floor(Math.random()*names.length)],
  avatar: "",
  date: randomDate(),
  text: texts[Math.floor(Math.random()*texts.length)],
  rating: Math.random() > 0.2 ? 5 : 4
}));

reviews.forEach(r => r.avatar = avatarForName(r.name));

let displayed = 0;
const batch = 12;
const container = document.getElementById('reviews');

function renderReviews() {
  for (let i = displayed; i < displayed+batch && i<reviews.length; i++) {
    const r = reviews[i];
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `
      <div class="review-content">
        <img class="avatar" src="${r.avatar}">
        <div class="review-name">${r.name}</div>
        <div class="review-date">${r.date}</div>
        <div class="review-text">${r.text}</div>
        <div class="review-stars">${createStars(r.rating)}</div>
      </div>`;
    container.appendChild(div);
  }
  displayed+=batch;
  if (displayed>=reviews.length) document.getElementById('load-more').style.display="none";
}
document.getElementById('load-more').onclick = renderReviews;
renderReviews();

/* Модалка для отзывов */
const modal = document.getElementById('modal');
document.getElementById('add-review-btn').onclick = ()=>modal.style.display='flex';
document.getElementById('close-modal').onclick = ()=>modal.style.display='none';

document.getElementById('submit-review').onclick = () => {
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if (!name || !text) return alert("Заполните оба поля!");
  const newReview = {
    name, 
    avatar: avatarForName(name),
    date: new Date().toLocaleDateString('ru-RU'),
    text,
    rating: 5
  };
  reviews.unshift(newReview);
  container.innerHTML="";
  displayed=0;
  renderReviews();
  modal.style.display='none';
};
