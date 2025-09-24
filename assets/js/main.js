/*==================== menu muncul ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== ilangin menu mode mobile ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== scroll  ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== munculin scroll ampe atas ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== scroll muncul ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.beranda__data, .beranda__img,
            .tentang__data, .tentang__img,
            .praktikum__content, .menu__content,
            .visimisi__data, .visimisi__img,
            .kontak__data, .kontak__button,
            .footer__content`, {
    interval: 200
})

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.shiftKey && (e.code === 'KeyI' || e.code === 'KeyJ' || e.code === 'KeyC')) ||
        // F12 (DevTools)
        e.code === 'F12') {
        e.preventDefault();
    }
});


// --- JAVASCRIPT UNTUK LOGIKA TOMBOL KABUR ---

// Pastikan skrip berjalan setelah semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil elemen tombol dan containernya
    const runawayButton = document.getElementById('runaway-button');
    const container = document.querySelector('.container');

    // 2. Siapkan variabel
    let escapeCount = 0;
    const maxEscapes = 15; // Tombol akan kabur sebanyak 5 kali

    // Cek apakah elemen tombol ditemukan sebelum menambahkan event listener
    if (runawayButton && container) {

        // 3. Tambahkan event listener saat kursor mendekati tombol
        runawayButton.addEventListener('mouseover', () => {
            // Cek apakah tombol masih harus kabur
            if (escapeCount < maxEscapes) {
                // Ambil ukuran container dan tombol
                const containerRect = container.getBoundingClientRect();
                const buttonRect = runawayButton.getBoundingClientRect();

                // Hitung posisi acak baru di dalam container
                const newTop = Math.random() * (containerRect.height - buttonRect.height);
                const newLeft = Math.random() * (containerRect.width - buttonRect.width);

                // Terapkan posisi baru ke tombol
                runawayButton.style.top = `${newTop}px`;
                runawayButton.style.left = `${newLeft}px`;

                // Tambah hitungan kabur
                escapeCount++;

                // Jika sudah kabur 5x, ubah teks dan tampilannya
                if (escapeCount === maxEscapes) {
                    runawayButton.textContent = "Oke, Aku Nyerah!";
                    runawayButton.classList.add('caught');
                }
            }
        });

        // 4. Mencegah link di-klik sebelum waktunya
        runawayButton.addEventListener('click', (event) => {
            // Jika hitungan kabur belum mencapai 5, batalkan aksi default (pindah halaman)
            if (escapeCount < maxEscapes) {
                event.preventDefault();
            }
        });
    }
});