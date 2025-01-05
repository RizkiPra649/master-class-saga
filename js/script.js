// Toggle class active

const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#humberger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

const humberger = document.querySelector("#humberger-menu");
const search = document.querySelector("#search");

document.addEventListener("click", function (e) {
  if (!humberger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// memunculkan kolom search
function toggleSearch() {
  const searchContainer = document.getElementById("search-container");
  searchContainer.classList.toggle("hidden");
}

//about section start
let currentIndex = 0;
const totalCards = document.querySelectorAll(".carousel-card").length;

function moveCarousel(direction) {
  const wrapper = document.querySelector(".carousel-wrapper");
  currentIndex += direction;

  // Mencegah index keluar dari batas
  if (currentIndex < 0) {
    currentIndex = totalCards - 1;
  } else if (currentIndex >= totalCards) {
    currentIndex = 0;
  }

  // Geser carousel ke posisi yang sesuai
  const offset = -currentIndex * 270; // 270px adalah lebar card + margin
  wrapper.style.transform = `translateX(${offset}px)`;
}
//about section end

// tombol mulai belajar
const button = document.getElementById("halaman-login");
button.addEventListener("click", () => {
  window.location.href = "https://rizkipra649.github.io/master-class-saga/login/login.html";
});

//Backend tombol mulai belajar



//testimonial


      function showSlide(index) {
        const slider = document.querySelector('.testimonials-slider');
        const totalSlides = slider.children.length;
        if (index < 0) currentIndex = totalSlides - 1;
        else if (index >= totalSlides) currentIndex = 0;
        else currentIndex = index;
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
      }

      function prevSlide() {
        showSlide(currentIndex - 1);
      }

      function nextSlide() {
        showSlide(currentIndex + 1);
      }
//testimonial