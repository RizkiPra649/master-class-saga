document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form reload halaman

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
      // Login berhasil, arahkan ke halaman pelajar
      window.location.href = "../index.html"; // Ganti dengan halaman pelajar
    } else {
      alert(result.message);
    }
  });
