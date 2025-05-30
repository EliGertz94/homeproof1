let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 5;

fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    allPosts = data;
    filteredPosts = allPosts; // ברירת מחדל - הצג את כל הפוסטים
    displayPosts();
    setupPagination();
  });

function filterPosts(tag) {
  currentPage = 1; // איפוס לעמוד הראשון בכל שינוי תגית
  if (tag === 'all') {
    filteredPosts = allPosts;
  } else {
    filteredPosts = allPosts.filter(post => post.category === tag);
  }
  displayPosts();
  setupPagination();
}

function displayPosts() {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  postsToShow.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <h2>${post.title}</h2>
        <p>${post.summary}</p>
        <a href="${post.link}" class="button">קרא עוד</a>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

function setupPagination() {
  let pagination = document.getElementById('pagination');
  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.style.textAlign = 'center';
    pagination.style.marginTop = '20px';
    document.body.appendChild(pagination);
  }

  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.innerText = '«';
    prevButton.onclick = () => {
      currentPage--;
      displayPosts();
      setupPagination();
    };
    pagination.appendChild(prevButton);
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.onclick = () => {
      currentPage = i;
      displayPosts();
      setupPagination();
    };
    pagination.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.innerText = '»';
    nextButton.onclick = () => {
      currentPage++;
      displayPosts();
      setupPagination();
    };
    pagination.appendChild(nextButton);
  }
}

