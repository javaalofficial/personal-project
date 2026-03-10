/**
 * ============================================
 * TUTORIAL: PELURU MENGIKUTI ARAH PEMAIN
 * ============================================
 * 
 * Konsep yang perlu kamu pahami:
 * 1. Mengirim sudut rotasi pemain ke peluru
 * 2. Menggunakan trigonometri (sin & cos) untuk gerakan miring
 * 
 * Sebelum belajar ini, pastikan kamu sudah paham:
 * - class dan constructor
 * - Math.sin() dan Math.cos()
 * - derajat vs radian
 */

// ============================================
// BAGIAN 1: CLASS PEMAIN (yg sudah ada)
// ============================================

/*
class Pemain {
    constructor(){
        // ... kode yang sudah ada ...
        
        // INI PENTING: sudut rotasi pesawat (dalam derajat)
        this.mutar = 0;  
    };

    terbaru(){
        // ... kode gerakan ...
        
        // Saat belok kanan, sudut tambah (+3 derajat)
        if (click.right) this.mutar += 3;
        // Saat belok kiri, sudut kurang (-3 derajat)
        else if (click.left) this.mutar -= 3;
        
        // Batas maksimal rotasi (maksimal 30 derajat)
        if (this.mutar > 30) this.mutar = 30;
        if (this.mutar < -30) this.mutar = -30;
    };
};
*/


// ============================================
// BAGIAN 2: CLASS PELURU (YANG PERLU DIUBAH)
// ============================================

class Peluru {
    /**
     * @param {number} x - Posisi X awal peluru
     * @param {number} y - Posisi Y awal peluru  
     * @param {number} angle - Sudut rotasi pemain (derajat)
     */
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 15;
        this.speed = 15;
        
        // SIMPAN SUDUT UNTUK GERAKAN PELURU
        this.angle = angle;
        
        this.picture = new Image();
        this.picture.src = 'asset/PNG/Lasers/laserBlue01.png';
    }

    /**
     * Menggerakkan peluru berdasarkan sudut
     * 
     * Rumus trigonometri:
     * - x += sin(sudut) * kecepatan
     * - y -= cos(sudut) * kecepatan
     * 
     * Kenapa y berkurang? Karena canvas y=0 di atas, y=max di bawah
     * Jadi "maju" = mengurangi nilai y
     */
    terbaru() {
        // Konversi derajat ke radian
        // Rumus: radian = derajat * (Math.PI / 180)
        const radians = this.angle * Math.PI / 180;

        // Gerakan X: berdasarkan sin(angle)
        // Ketika angle = 0, sin(0) = 0 (lurus)
        // Ketika angle = 30, sin(30) = 0.5 (ke kanan)
        // Ketika angle = -30, sin(-30) = -0.5 (ke kiri)
        this.x += Math.sin(radians) * this.speed;

        // Gerakan Y: berdasarkan -cos(angle) (minus karena arah ke atas)
        // cos(0) = 1, jadi y -= 1 * speed = melaju penuh
        // cos(30) = 0.866, jadi y -= 0.866 * speed = lebih lambat tapi maju
        this.y -= Math.cos(radians) * this.speed;
    }

    draw() {
        // Optional: bisa juga rotasi gambar peluru sesuai sudut
        // drawing.save();
        // drawing.translate(this.x + this.w/2, this.y + this.h/2);
        // drawing.rotate(this.angle * Math.PI / 180);
        // drawing.drawImage(this.picture, -this.w/2, -this.h/2, this.w, this.h);
        // drawing.restore();
        
        // Draw biasa (tanpa rotasi)
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h);
    }
}


// ============================================
// BAGIAN 3: SAAT MENEMBAK (KEYDOWN EVENT)
// ============================================

/*
// KODE LAMA (LURUS):
if (e.key === ' ' && GAME) {
    jumlahPeluru.push(new Peluru(pemain.x + pemain.w/2 - 2.5, pemain.y));
    if(GAME) Stembak();
}

// KODE BARU (MENGGUNAKAN SUDUT):
if (e.key === ' ' && GAME) {
    // Kirim juga this.mutar dari pemain
    jumlahPeluru.push(new Peluru(
        pemain.x + pemain.w/2 - 2.5,  // X
        pemain.y,                       // Y
        pemain.mutar                    // ANGLE (sudut rotasi)
    ));
    if(GAME) Stembak();
}
*/


// ============================================
// BAGIAN 4: ANALOGI DUNIA NYATA
// ============================================

/*
Bayangkan kamu berdiri di tengah lapangan dan melempar bola:

1. Jika kamu melempar ke DEPAN (angle = 0°):
   - Bola hanya maju ke depan
   - Kecepatan X = 0
   - Kecepatan Y = penuh

2. Jika kamu melempar ke KANAN SERONG (angle = 30°):
   - Bola maju ke depan的同时 juga ke kanan
   - Kecepatan X = sin(30°) × kecepatan = 0.5 × kecepatan
   - Kecepatan Y = cos(30°) × kecepatan = 0.866 × kecepatan

3. Jika kamu melempar ke KIRI SERONG (angle = -30°):
   - Bola maju ke depan的同时 juga ke kiri
   - Kecepatan X = sin(-30°) × kecepatan = -0.5 × kecepatan
   - Kecepatan Y = cos(-30°) × kecepatan = 0.866 × kecepatan

Dalam canvas:
- "Depan" = arah Y negatif (ke atas layar)
- "Kanan" = arah X positif (ke kanan layar)
- "Kiri" = arah X negatif (ke kiri layar)
*/


// ============================================
// BAGIAN 5: RINGKASAN RUMUS
// ============================================

/*
GERAKAN PELURU MIRING:
----------------------
const radians = angle * Math.PI / 180;
this.x += Math.sin(radians) * speed;
this.y -= Math.cos(radians) * speed;


PENJELASAN:
-----------
- Math.sin() = menghitung komponen X dari sudut
- Math.cos() = menghitung komponen Y dari sudut
- * Math.PI / 180 = mengkonversi derajat ke radian
- -= di y karena canvas Y semakin ke bawah semakin besar
*/


// ============================================
// BAGIAN 6: COBA PRAKTEK
// ============================================

/*
Sekarang coba implementasikan di kode utamamu:

1. Di keydown event (tempat menembak):
   - Ubah: new Peluru(x, y)
   - Menjadi: new Peluru(x, y, pemain.mutar)

2. Di class Peluru:
   - Tambah parameter: constructor(x, y, angle)
   - Tambah: this.angle = angle
   - Ubah terbaru():
     Dari: this.y -= this.speed;
     Menjadi:
       const radians = this.angle * Math.PI / 180;
       this.x += Math.sin(radians) * this.speed;
       this.y -= Math.cos(radians) * this.speed;

3. TESTING:
   - Tekan Enter untuk mulai game
   - Gerakkan kiri/kanan untuk memiringkan pesawat
   - Tekan Space untuk menembak
   - Lihat apakah peluru mengikuti arah pesawat!
*/

console.log("File pembelajaran loaded! Baca comment untuk memahami konsep peluru miring.");

