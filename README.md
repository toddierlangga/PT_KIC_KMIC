# PT KIC & KMIC — Source Code

Website statis menggunakan HTML, CSS, dan JavaScript, lengkap dengan logo, peta, serta foto drone.
Salinan source code website tanggal 27 September 2026.

## Cara menjalankan
1. Ekstrak file ZIP.
2. Buka folder PT_KIC_KMIC di Visual Studio Code.
3. Dengan ekstensi Live Server, klik kanan index.html lalu pilih Open with Live Server.
   Atau buka index.html langsung di browser.
4. Alternatif jika Python tersedia: jalankan `python -m http.server 8000` dari folder tersebut, lalu buka http://localhost:8000.

Tidak memerlukan npm install, build, database, atau API key.

## File utama
- index.html: isi halaman, urutan bagian, dan navigasi header.
- styles.css: tampilan dan tata letak responsif.
- script.js: menu, denah interaktif, dan galeri foto.
- drone-data.js: data lokasi dan foto drone.
- assets/: logo, peta, dan gambar proyek, termasuk assets/drone/.

## Mengubah dan mengunggah website
Edit file dengan VS Code dan simpan; refresh browser untuk melihat perubahan.
Untuk hosting statis, unggah index.html, styles.css, script.js, drone-data.js, dan folder assets dengan susunan yang sama.
Perubahan pada salinan lokal tidak otomatis mengubah website yang sudah terbit.
