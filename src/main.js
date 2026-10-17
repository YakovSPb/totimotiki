import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <a class="skip-link" href="#about">К содержанию</a>

  <header class="site-header">
    <div class="site-header__inner">
      <a class="logo" href="#top">Тотьмотики</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle__bars" aria-hidden="true"></span>
        <span class="visually-hidden">Меню</span>
      </button>
      <nav class="nav" id="site-nav" aria-label="Основная навигация">
        <a href="#about">О них</a>
        <a href="#heroes">Герои</a>
        <a href="#world">Мир</a>
        <a href="#contact" class="nav__cta">Написать</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-label="Главный экран">
      <div class="hero__stage" aria-hidden="true">
        <img class="hero__glow" src="/plush-studio.jpg" alt="" decoding="async" />
        <img
          class="hero__cast"
          src="/plush-studio.jpg"
          alt=""
          width="815"
          height="1536"
          decoding="async"
          fetchpriority="high"
        />
      </div>
      <div class="hero__content">
        <p class="brand">Тотьмотики</p>
        <h1 class="hero__title">Мягкие, уютные,<br />всегда рядом</h1>
        <p class="hero__lead">
          Добрые персонажи из ткани и войлока — простые формы, тёплые цвета и тихая забота.
        </p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#heroes">Познакомиться</a>
          <a class="btn btn--ghost" href="#contact">Написать</a>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="section__inner">
        <p class="eyebrow">о проекте</p>
        <h2>Кто такие Тотьмотики</h2>
        <p class="section__text">
          Маленькие существа с розовым носиком и спокойной улыбкой. Их легко представить рядом —
          на полке, в открытке или в детской истории про тепло и дружбу.
        </p>
      </div>
    </section>

    <section class="section section--heroes" id="heroes">
      <div class="section__inner section__inner--wide">
        <p class="eyebrow">герои</p>
        <h2>Познакомьтесь ближе</h2>
        <p class="section__text">
          Фактуры шерпы, вязаный уют, бантики и полевые цветы — каждый со своим характером.
        </p>

        <div class="heroes-grid">
          <figure class="hero-shot hero-shot--tall">
            <img src="/plush-studio.jpg" alt="Розовый пушистый Тотьмотик с клубникой" loading="lazy" decoding="async" />
          </figure>
          <figure class="hero-shot">
            <img src="/plush-lavender.jpg" alt="Лавандовый Тотьмотик с букетом" loading="lazy" decoding="async" />
          </figure>
          <figure class="hero-shot">
            <img src="/plush-pink-mustard.jpg" alt="Розовый и горчичный Тотьмотики" loading="lazy" decoding="async" />
          </figure>
          <figure class="hero-shot hero-shot--wide">
            <img src="/plush-cloud.jpg" alt="Облачко — мягкое и уютное" loading="lazy" decoding="async" />
            <figcaption>Облачко — мягкое, уютное, всегда рядом</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section section--cast" id="cast">
      <div class="section__inner section__inner--wide">
        <p class="eyebrow">семья</p>
        <h2>Вся компания</h2>
        <p class="section__text">Двадцать характеров на одном полотне.</p>
        <figure class="cast">
          <img
            src="/characters-sheet.jpg"
            alt="Коллекция персонажей Тотьмотики"
            width="806"
            height="1420"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section class="section section--world" id="world">
      <div class="section__inner section__inner--wide">
        <p class="eyebrow">их мир</p>
        <h2>Игры, слова и тепло</h2>
        <p class="section__text">
          Тотьмотики живут в уютных карточках и маленьких историях — без шума, с заботой о деталях.
        </p>
        <div class="cards">
          <img src="/card-clouds.jpg" alt="Карточка: кружка облачков" loading="lazy" decoding="async" />
          <img src="/card-eraser.jpg" alt="Карточка: eraser — ластик" loading="lazy" decoding="async" />
          <img src="/card-ruler.jpg" alt="Карточка: ruler — линейка" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>

    <section class="section section--cta" id="contact">
      <div class="section__inner">
        <p class="eyebrow">связь</p>
        <h2>Напишите нам</h2>
        <p class="section__text">
          Сайт только начинается. Если Тотьмотики отозвались — будем рады письму.
        </p>
        <a class="btn btn--primary" href="mailto:hello@totimotiki.ru">hello@totimotiki.ru</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="logo logo--footer">Тотьмотики</p>
      <p class="site-footer__note">© ${new Date().getFullYear()} totimotiki.ru</p>
    </div>
  </footer>
`;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const revealItems = app.querySelectorAll('.section, .hero-shot, .cards img');
  revealItems.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  revealItems.forEach((el) => observer.observe(el));
}

const header = app.querySelector('.site-header');
const navToggle = app.querySelector('.nav-toggle');
const nav = app.querySelector('#site-nav');

window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('site-header--solid', window.scrollY > 20);
  },
  { passive: true },
);

const setNavOpen = (open) => {
  header.classList.toggle('site-header--nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
};

navToggle.addEventListener('click', () => {
  setNavOpen(!header.classList.contains('site-header--nav-open'));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNavOpen(false));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setNavOpen(false);
});
