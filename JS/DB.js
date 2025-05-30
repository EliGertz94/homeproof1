// 1. הגדר את כתובת הפרויקט וה-API KEY שלך מסופבייס
const SUPABASE_URL = '';

const SUPABASE_KEY = ''


const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js';
document.head.appendChild(script);

script.onload = () => {
  const { createClient } = window.supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  let currentPage = 0;
  const postsPerPage = 3;

  const postsContainer = document.getElementById('postsContainer');
  const searchInput = document.getElementById('searchInput');

  async function loadPosts(search = '') {
    const from = currentPage * postsPerPage;
    const to = from + postsPerPage - 1;

    const { data, error } = await supabase
      .from('post')
      .select('*')
      .ilike('title', `%${search}%`)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('שגיאה:', error);
      return;
    }

    data.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'post';
      postEl.innerHTML = `
        <img src="${post.image}" alt="${post.alt}">
        <div class="post-content">
          <h2>${post.title}</h2>
          <p>${post.summary}</p>
          <a href="${post.link}" class="button">קרא עוד</a>
        </div>
      `;
      postsContainer.appendChild(postEl);
    });

    currentPage++;
  }

  // חיפוש בזמן אמת
  searchInput.addEventListener('input', e => {
    postsContainer.innerHTML = '';
    currentPage = 0;
    loadPosts(e.target.value);
  });

  // טעינה מדורגת בגלילה
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadPosts(searchInput.value);
    }
  });

  // טען פוסטים ראשונים
  loadPosts();
};
