document.addEventListener('DOMContentLoaded', function() {
  // Данные новостей 
  const newsData = [
    {
      id: 'post1',
      title: 'ВИЧ или предрак: Дима Билан подтвердил проблемы со здоровьем',
      content: 'В 2022 году Дима Билан столкнулся с серьезными проблемами со здоровьем...',
      keywords: 'дима билан здоровье вич предрак певец'
    },
    {
      id: 'post2',
      title: 'Невеста Лепса про Киркорова: «Я никого не буду называть „королем“, хотя бы потому, что он выступал перед моими родителями»',
      content: 'В 4-м выпуске шоу «Мастер игры» неожиданно произошел конфликт между Филиппом Киркоровым и юной невестой Григория Лепса...',
      keywords: 'лепс киркоров невеста конфликт шоу'
    },
    {
      id: 'post3',
      title: 'Осталась вдовой с тремя детьми. Горе Анны Табаниной — Лизы Долгорукой из «Бедной Насти»',
      content: 'Она росла в семье художников и всерьез планировала продолжить династию, пока не попала в драмкружок...',
      keywords: 'анна табанина бедная настя вдова актриса'
    },
    {
      id: 'post4',
      title: 'Проклятое наследство Джуны: кого свела в могилу битва за имущество целительницы',
      content: 'Простой поход в магазин закончился для 65-летней Джуны госпитализацией: женщина потеряла сознание прямо на улице...',
      keywords: 'джуна наследство целительница смерть мистика'
    }
  ];

  // Функция для прокрутки к элементу
  function scrollToPost(postId) {
    const postElement = document.getElementById(postId);
    if (postElement) {
      postElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      postElement.style.boxShadow = '0 0 0 3px rgba(0, 204, 51, 0.5)';
      setTimeout(() => {
        postElement.style.boxShadow = '';
      }, 2000);
    }
  }

  // Функция поиска новостей
  function searchNews() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    if (!searchTerm || searchTerm.trim() === '') {
      resultsContainer.innerHTML = '<div class="no-results">Введите поисковый запрос</div>';
      return;
    }
    
    const results = newsData.filter(news => 
      news.title.toLowerCase().includes(searchTerm) || 
      news.content.toLowerCase().includes(searchTerm) ||
      news.keywords.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results">Ничего не найдено</div>';
    } else {
      results.forEach(news => {
        const resultItem = document.createElement('div');
        resultItem.className = 'news-item';
        resultItem.innerHTML = `<strong>${news.title}</strong>`;
        resultItem.onclick = () => scrollToPost(news.id);
        resultsContainer.appendChild(resultItem);
      });
    }
  }

  // Инициализация поиска
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          searchNews();
        }
      });
    }
  }

  // Инициализация кнопок сворачивания/разворачивания
 function initToggleButtons() {
    const toggles = [
        { button: 'news-toggle-button', panel: 'news-panel', menu: 'news-menu' },
        { button: 'toggle-button', panel: 'panel-content', menu: 'menu-container' },
        { button: 'voting-toggle-button', panel: 'voting-panel', menu: 'voting-menu' },
        { button: 'awards-toggle-button', panel: 'awards-panel', menu: 'awards-menu' }
    ];

    toggles.forEach(({ button, panel, menu }) => {
        const toggleButton = document.getElementById(button);
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const panelElement = document.getElementById(panel);
                const menuElement = document.getElementById(menu);
                if (panelElement && menuElement) {
                    panelElement.classList.toggle('hidden');
                    menuElement.classList.toggle('expanded');
                }
            });
        }
    });
}
  // Добавление стилей
  const style = document.createElement('style');
  style.textContent = `
    .panel-content.hidden {
      display: none;
    }
    .menu-container:not(.expanded) .panel-content {
      display: none;
    }
    .no-results {
      padding: 10px;
      color: #666;
      font-style: italic;
    }
    .winner-icon {
      width: 16px;
      height: 16px;
      margin-left: 5px;
    }
  `;
  document.head.appendChild(style);

  // Инициализация всех функций
  initToggleButtons();
  initSearch();

  // Глобальные функции
  window.searchNews = searchNews;
  window.scrollToPost = scrollToPost;
});

