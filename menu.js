document.addEventListener("DOMContentLoaded", () => {
    const icon = document.querySelector(".mobile-menu-icon");
    const menu = document.getElementById("side-menu");
    const closeBtn = menu?.querySelector(".closebtn");
    const overlay = document.getElementById("menu-overlay");
  
    function closeMenu() {
      if (menu) menu.style.width = "0";
      if (icon) icon.innerHTML = "☰";
      if (overlay) overlay.style.display = "none";
    }
  
    if (icon && menu) {
      icon.addEventListener("click", () => {
        if (menu.style.width === "250px") {
          closeMenu();
        } else {
          menu.style.width = "250px";
          icon.innerHTML = "✖";
          if (overlay) overlay.style.display = "block";
        }
      });
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }
  
    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }
  
    document.querySelectorAll("#side-menu a").forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    });
  });
  