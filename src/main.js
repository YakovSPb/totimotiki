import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <a class="skip-link" href="#about">К содержанию</a>

  <header class="site-header">
    <div class="site-header__inner">
      <a class="logo" href="#top" aria-label="Тотьмотики — наверх">Тотьмотики</a>
      <nav class="nav" aria-label="Основная навигация">
        <a href="#about">О них</a>
        <a href="#world">Мир</a>
        <a href="#gallery">Герои</a>
        <a href="#contact" class="nav__cta">Написать</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-label="Главный экран">
      <div class="hero__media" aria-hidden="true">
        <img class="hero__glow" src="/characters.png" alt="" width="297" height="318" decoding="async" />
        <img
          class="hero__image"
          src="/characters.png"
          alt=""
          width="297"
          height="318"
          decoding="async"
          fetchpriority="high"
        />
        <div class="hero__wash"></div>
      </div>
      <div class="hero__content">
        <p class="brand">Тотьмотики</p>
        <h1 class="hero__title">Маленькие добрые существа<br />с большим сердцем</h1>
        <p class="hero__lead">
          Мягкие персонажи из войлока и ткани — тихие спутники уюта, заботы и простых радостей.
        </p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#gallery">Познакомиться</a>
          <a class="btn btn--ghost" href="#contact">Связаться</a>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="section__inner">
        <h2>Кто такие Тотьмотики</h2>
        <p class="section__text">
          Тотьмотики — черновик мира добрых героев: каждый со своим характером, бантиком,
          листочком или книжкой. Они не кричат и не спешат — просто рядом, когда нужно тепло.
        </p>
      </div>
    </section>

    <section class="section section--alt" id="world">
      <div class="section__inner">
        <h2>Их мир</h2>
        <p class="section__text">
          Пастельные ткани, заплатки, помпоны и полевые цветы. Здесь живут лунные сновидцы,
          зелёные хранители сердец и кубики-учёные с круглыми очками.
        </p>
        <ul class="traits" role="list">
          <li>
            <strong>Доброта</strong>
            <span>Лица без суеты — две точки глаз и лёгкий румянец.</span>
          </li>
          <li>
            <strong>Ручная работа</strong>
            <span>Фактуры войлока, швы и узоры, как у любимой игрушки.</span>
          </li>
          <li>
            <strong>Тишина</strong>
            <span>Истории без шума — про заботу, дружбу и маленькие чудеса.</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" id="gallery">
      <div class="section__inner section__inner--wide">
        <h2>Герои</h2>
        <p class="section__text">
          Двадцать характеров на одном полотне. Наведите курсор — кто-то чуть оживает.
        </p>
        <figure class="gallery">
          <img
            class="gallery__image"
            src="/characters.png"
            alt="Коллекция персонажей Тотьмотики: двадцать мягких героев в ряд"
            width="297"
            height="318"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section class="section section--cta" id="contact">
      <div class="section__inner">
        <h2>Напишите нам</h2>
        <p class="section__text">
          Сайт только начинается. Если Тотьмотики отозвались — оставьте письмо. Текст и разделы
          будут наполняться дальше.
        </p>
        <a class="btn btn--primary" href="mailto:hello@totimotiki.ru">hello@totimotiki.ru</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="logo logo--footer">Тотьмотики</p>
      <p class="site-footer__note">© ${new Date().getFullYear()} totimotiki.ru — черновик лендинга</p>
    </div>
  </footer>
`;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const revealItems = app.querySelectorAll('.section, .traits li');
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
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((el) => observer.observe(el));
}

const header = app.querySelector('.site-header');

window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('site-header--solid', window.scrollY > 24);
  },
  { passive: true },
);
