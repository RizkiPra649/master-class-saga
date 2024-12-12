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
  window.location.href = "../login/login.html";
});

//isi


// Initialize CodeMirror for each editor
const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("html-code"),
  {
    mode: "htmlmixed",
    theme: "dracula",
    viewportMargin: Infinity,
    lineNumbers: true,
  }
);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("css-code"),
  {
    mode: "css",
    theme: "dracula",
    lineNumbers: true,
  }
);

const jsEditor = CodeMirror.fromTextArea(
  document.getElementById("js-code"),
  {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
  }
);

const output = document.getElementById("output");

// Function to update output
function updateOutput() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;

  const combinedCode = `${html}${css}${js}`;
  output.contentDocument.open();
  output.contentDocument.write(combinedCode);
  output.contentDocument.close();
}

//windows resize
window.addEventListener("resize", () => {
  htmlEditor.refresh();
  cssEditor.refresh();
  jsEditor.refresh();
});

// Real-time update
[htmlEditor, cssEditor, jsEditor].forEach((editor) => {
  editor.on("change", updateOutput);
});

// Save as HTML
document.getElementById("save-html").addEventListener("click", () => {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;

  const blob = new Blob([`${html}${css}${js}`], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "code.html";
  link.click();
});

// Save CSS
document.getElementById("save-css").addEventListener("click", () => {
  const cssContent = cssEditor.getValue();
  const blob = new Blob([cssContent], { type: "text/css" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "style.css";
  link.click();
});

// Save JavaScript
document.getElementById("save-js").addEventListener("click", () => {
  const jsContent = jsEditor.getValue();
  const blob = new Blob([jsContent], { type: "text/javascript" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "script.js";
  link.click();
});

// Clear editors
document.getElementById("clear").addEventListener("click", () => {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
  updateOutput();
});

editor.on("scroll", function () {
  let info = editor.getScrollInfo();
  console.log("Scroll posisi:", info.top);
});

// Initial update
updateOutput();
