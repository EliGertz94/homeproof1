let allPosts = [];

async function loadPosts() {
  try {
    const response = await fetch("posts.json");
    const posts = await response.json();
    allPosts = posts;
    displayPosts("all");
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

function displayPosts(tag) {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  let filteredPosts = tag === "all" ? allPosts : allPosts.filter(post => post.category === tag);

  // Optional: sort by date (if you add a `date` field to the JSON)
  // filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  filteredPosts.forEach(post => {
    const postHTML = `
      <div class="post">
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
          <h2>${post.title}</h2>
          <p>${post.summary}</p>
          <a href="${post.link}" class="button">קרא עוד</a>
        </div>
      </div>
    `;
    container.innerHTML += postHTML;
  });

  updateActiveButton(tag);
}

function filterPosts(tag) {
  displayPosts(tag);
}

function updateActiveButton(tag) {
  document.querySelectorAll(".tag-button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText.trim() === tag || (tag === "all" && btn.innerText.includes("הצג הכל"))) {
      btn.classList.add("active");
    }
  });
}

// Load posts when the page loads
window.addEventListener("DOMContentLoaded", loadPosts);
