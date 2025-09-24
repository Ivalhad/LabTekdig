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


// --- JAVASCRIPT UNTUK LOGIKA TOMBOL KABUR DENGAN TEKS BERUBAH ---

document.addEventListener('DOMContentLoaded', () => {

    const runawayButton = document.getElementById('runaway-button');
    const container = document.querySelector('.container');

    let clickCount = 0;
    const maxClicks = 10;

    // Siapkan array (daftar) tulisan untuk setiap klik
    const buttonMessages = [
        "Klik sini",              // Pesan setelah klik ke-1
        "Klik sini atuh",         // Pesan setelah klik ke-2
        "Yang bener ngekliknya",  // Pesan setelah klik ke-3
        "Sinii atuh",
        "eaa",
        "eaa",
        "eaa",
        "eaaa",
        "eaaa",            // Pesan setelah klik ke-4
        "dah ah capek"  // Pesan final setelah klik ke-5
    ];

    if (runawayButton && container) {
        runawayButton.addEventListener('click', (event) => {
            // Logika ini hanya berjalan untuk 5 klik pertama
            if (clickCount < maxClicks) {
                // Selalu cegah link agar tidak terbuka selama proses "kabur"
                event.preventDefault();

                // Tambah jumlah klik
                clickCount++;

                // Ubah tulisan tombol sesuai urutan di array
                // (index array dimulai dari 0, jadi kita pakai clickCount - 1)
                runawayButton.textContent = buttonMessages[clickCount - 1];

                // Jika ini adalah klik terakhir, buat tombol berhenti dan berubah warna
                if (clickCount === maxClicks) {
                    runawayButton.classList.add('caught');
                } else {
                    // Jika BUKAN klik terakhir, pindahkan tombol ke posisi acak
                    const containerRect = container.getBoundingClientRect();
                    const buttonRect = runawayButton.getBoundingClientRect();

                    const newTop = Math.random() * (containerRect.height - buttonRect.height);
                    const newLeft = Math.random() * (containerRect.width - buttonRect.width);

                    runawayButton.style.top = `${newTop}px`;
                    runawayButton.style.left = `${newLeft}px`;
                }
            }
            // Setelah 5 kali klik, kondisi di atas tidak terpenuhi lagi,
            // dan tombol akan berfungsi sebagai link normal.
        });
    }
});