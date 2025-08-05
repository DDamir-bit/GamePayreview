const roflNames = [
  "Пудж","Эщкере","сигмооо бой","олежаа","777lvl","Иванушка","планктон","Красти Крабс","Пельмень","Гусь",
  "если читаешь ты лох","Марк Неуязвимый","Лопата","Питер Гриффин","Шпала","чтоооо","сын влада4","Гоблин","Фараон","Капибары круче всех",
  "Вупсень","Шо ты лисий","Бургермен","Кек","Дрын","Жирный","Завтрак бомжа","Хамстер комбат","Лобстер","Вафелька",
  "Гай фокс","Король качалки","Махабат пыяласын","Шарпей","Кенни","Рофл кек чебурек","Мажор роблокс","варя","Пацаны не извиняются","настюникс"
];

const femaleEndings = ["а","я","ва","на","ая","ина","ева","ова"];

const englishAvatars = [
  "https://static.wikia.nocookie.net/brawlstars/images/1/1f/Shelly_Skin-Default.png",
  "https://i.pinimg.com/originals/34/5b/44/345b44c60de164f59f44136b98f76a85.jpg",
  "https://i.pinimg.com/originals/3d/f2/8e/3df28e14f9c342ddc28a4e746c4959c7.jpg",
  "https://preview.redd.it/akuma-gamer-art-v0-l6t6gvsykqj91.jpg"
];

const roflAvatars = [
  "https://i.pinimg.com/736x/62/b5/8a/62b58a07129e29d274de6e3e6208f67b.jpg",
  "https://i.redd.it/6yr91jxg9k991.jpg",
  "https://i.kym-cdn.com/photos/images/newsfeed/002/470/347/ff1.jpg"
];

const realNames = [
  "Иван Иванов","Мария Смирнова","Алексей Кузнецов","Ольга Петрова",
  "Дмитрий Соколов","Анастасия Орлова","Сергей Чернов","Екатерина Павлова"
];

const textsMale = [
  "Оплатил заказ и получил робуксы за 3 минуты!",
  "Алмазы пришли моментально, сервис топовый!",
  "Проверил на Бравл — гемы без задержек.",
  "Купил робаксы для Roblox, доволен как никогда!",
  "Гемы реально пришли, всё безопасно.",
  "Получил бонусы при заказе, приятно удивлён.",
  "Алмазы пришли быстрее чем ожидал, спасибо!"
];

const textsFemale = [
  "Сделала заказ, всё пришло моментально!",
  "Гемы получила, сервис отличный!",
  "Робуксы перевели без проблем.",
  "Алмазы пришли очень быстро, рекомендую.",
  "Сразу получила бонус при покупке!",
  "Безопасно и быстро, понравилось обслуживание.",
  "Супер-сервис, буду заказывать ещё!"
];

function randomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - 70 * 24 * 60 * 60 * 1000);
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

const allNames = [...realNames, ...roflNames, "DarkKnight","ShadowX","PixelMaster","TurboDude","NeoHunter"];

const reviews = Array.from({length: 100}, () => {
  const name = allNames[Math.floor(Math.random()*allNames.length)];
  const firstName = name.split(" ")[0].toLowerCase();
  const isFemale = femaleEndings.some(end => firstName.endsWith(end));
  const texts = isFemale ? textsFemale : textsMale;
  const text = texts.splice(Math.floor(Math.random()*texts.length), 1)[0] || "Отзыв отличный, всё понравилось!";
  return {
    name,
    avatar: avatarForName(name),
    date: randomDate(),
    text,
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
