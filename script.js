const roflNames = ["Пудж","Эщкере","сигмооо бой","олежаа"];
const femaleEndings = ["а","я","ва","на","ая","ина","ева","ова"];

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
  "Виталий Орлов","Егор Панкратов","Антон Белый","Сергей Чернов","Никита Громов",
  "Анастасия Орлова","Светлана Миронова","Екатерина Павлова","Ирина Соколова"
];

const textsMale = [
  "Заказ пришёл быстро, всё отлично!",
  "Оплатил и получил робуксы моментально!",
  "Гемы прилетели, доволен сервисом 🔥"
];
const textsFemale = [
  "Заказала алмазы, пришли быстро!",
  "Получила робуксы без проблем ❤️",
  "Гемы купила — всё супер!"
];

function randomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const date = new Date(past.getTime() + Math.random() * (now - past));
  return date.toLocaleDateString('ru-RU');
}

function avatarForName(name) {
  if (roflNames.includes(name)) return roflAvatars[Math.floor(Math.random()*roflAvatars.length)];
  if (/\s/.test(name)) {
    const firstName = name.split(" ")[0].toLowerCase();
    const isFemale = femaleEndings.some(end => firstName.endsWith(end));
    const gender = isFemale ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random()*90)}.jpg`;
  }
  return englishAvatars[Math.floor(Math.random()*englishAvatars.length)];
}

function createStars(r) { return "★".repeat(r)+"☆".repeat(5-r); }

const reviews = Array.from({length: 100}, () => {
  const name = names[Math.floor(Math.random()*names.length)];
  const firstName = name.split(" ")[0].toLowerCase();
  const isFemale = femaleEndings.some(end => firstName.endsWith(end));
  return {
    name,
    avatar: avatarForName(name),
    date: randomDate(),
    text: (isFemale ? textsFemale : textsMale)[Math.floor(Math.random() * 3)],
    rating: Math.random() > 0.2 ? 5 : 4
  };
});

let displayed = 0;
const batch = 12;
const container = document.getElementById('reviews');

function renderReviews() {
  for (let i = displayed; i < displayed+batch && i<reviews.length; i++) {
    const r = reviews[i];
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `
      <img class="avatar" src="${r.avatar}">
      <div class="review-name">${r.name}</div>
      <div class="review-date">${r.date}</div>
      <div class="review-text">${r.text}</div>
      <div class="review-stars">${createStars(r.rating)}</div>`;
    container.appendChild(div);
  }
  displayed+=batch;
  if (displayed>=reviews.length) document.getElementById('load-more').style.display="none";
}
document.getElementById('load-more').onclick = renderReviews;
renderReviews();
