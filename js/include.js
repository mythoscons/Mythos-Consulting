function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach(el => {
    const file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error(`Could not fetch ${file}`);
          return res.text();
        })
        .then(html => {
          el.innerHTML = html;
          const scripts = el.querySelectorAll("script");
          scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
              newScript.src = oldScript.src;
            } else {
              newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
          });
        })
        .catch(err => console.error(err));
    }
  });
}

function registerModalHandlers() {
  const signupModal = document.getElementById("signupModal");
  const loginModal = document.getElementById("loginModal");

  const signupTrigger = document.getElementById("signupTrigger");
  const loginTrigger = document.getElementById("loginTrigger");

  const closeSignupBtn = signupModal?.querySelector(".close-btn");
  const closeLoginBtn = loginModal?.querySelector(".close-btn");

  if (signupTrigger && signupModal) {
    signupTrigger.onclick = (e) => {
      e.preventDefault();
      signupModal.style.display = "block";
    };
  }

  if (closeSignupBtn) {
    closeSignupBtn.onclick = () => {
      signupModal.style.display = "none";
    };
  }

  if (loginTrigger && loginModal) {
    loginTrigger.onclick = (e) => {
      e.preventDefault();
      loginModal.style.display = "block";
    };
  }

  if (closeLoginBtn) {
    closeLoginBtn.onclick = () => {
      loginModal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target === signupModal) signupModal.style.display = "none";
    if (event.target === loginModal) loginModal.style.display = "none";
  };
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
  setTimeout(registerModalHandlers, 500); // Slight delay to ensure content is loaded
});
