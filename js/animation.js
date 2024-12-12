 // Seleksi semua elemen yang memiliki class "hidden"
    const hiddenElements = document.querySelectorAll('.hidden');

    // Buat observer dengan Intersection Observer API
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambahkan class "animate" ketika elemen terlihat
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Hentikan pemantauan elemen
        }
      });
    });

    // Daftarkan setiap elemen ke observer
    hiddenElements.forEach(el => observer.observe(el));