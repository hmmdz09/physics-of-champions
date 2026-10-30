// Data 20 Soal Lomba Fisika (Didistribusikan ke 4 Sisi Vertikal, Top & Bottom untuk Logo)
const physicsQuestions = [
  // --- SISI DEPAN (FRONT): SOAL 1 - 5 ---
  {
    id: 1,
    face: "front",
    question: "Sebuah mobil bergerak dari kecepatan awal 15 m/s hingga mencapai kelajuan 25 m/s dalam jarak 20 meter. Berapakah percepatan mobil tersebut?",
    answer: "10 m/s²"
  },
  {
    id: 2,
    face: "front",
    question: "Sebuah bola dilempar vertikal ke atas dengan kecepatan awal 50 m/s. Berapakah tinggi maksimum yang dicapai bola? (g = 10 m/s²)",
    answer: "125 m"
  },
  {
    id: 3,
    face: "front",
    question: "Balok 8 kg di atas lantai kasar bermuatan koefisien gesek kinetis μk = 0,3 ditarik gaya mendatar 48 N. Berapakah percepatan balok? (g = 10 m/s²)",
    answer: "3 m/s²"
  },
  {
    id: 4,
    face: "front",
    question: "Benda bermassa 6 kg yang awalnya diam didorong dengan gaya konstan 40 N sejauh 30 meter. Berapakah kelajuan akhir benda?",
    answer: "20 m/s"
  },
  {
    id: 5,
    face: "front",
    question: "Benda A bermassa 4 kg melaju dengan kelajuan 15 m/s menumbuk benda B bermassa 6 kg yang diam. Berapakah kelajuan keduanya setelah tumbukan jika bergabung?",
    answer: "6 m/s"
  },

  // --- SISI KANAN (RIGHT): SOAL 6 - 10 ---
  {
    id: 6,
    face: "right",
    question: "Batang homogen sepanjang 2 meter ditumpu tepat di tengahnya. Beban 120 N diletakkan 0,5 meter di kiri titik tumpu. Di jarak berapa meter di kanan tumpu beban 80 N harus ditaruh agar seimbang?",
    answer: "0,75 m"
  },
  {
    id: 7,
    face: "right",
    question: "Sebuah pegas dengan konstanta 800 N/m diregangkan sejauh 15 cm. Berapakah energi potensial pegas tersebut?",
    answer: "9 J"
  },
  {
    id: 8,
    face: "right",
    question: "Sebuah silinder pejal dengan massa 6 kg dan jari-jari 0,4 meter berputar pada porosnya dengan kecepatan sudut 25 rad/s. Berapakah momentum sudutnya?",
    answer: "12 kg·m²/s"
  },
  {
    id: 9,
    face: "right",
    question: "Seorang penyelam berada di kedalaman 15 meter di bawah permukaan air laut (ρ = 1000 kg/m³, g = 10 m/s²). Berapakah tekanan hidrostatis yang dialami penyelam?",
    answer: "150.000 Pa"
  },
  {
    id: 10,
    face: "right",
    question: "Sebuah benda bervolume 0,004 m³ tercelup seluruhnya ke dalam air (ρ = 1000 kg/m³, g = 10 m/s²). Berapakah besar gaya apung Archimedes yang bekerja pada benda?",
    answer: "40 N"
  },

  // --- SISI BELAKANG (BACK): SOAL 11 - 15 ---
  {
    id: 11,
    face: "back",
    question: "Air mengalir dalam pipa dengan kelajuan 3 m/s pada diameter pipa 4 cm. Jika diameter pipa menyempit menjadi 2 cm, berapakah kelajuan air di penampang yang sempit?",
    answer: "12 m/s"
  },
  {
    id: 12,
    face: "back",
    question: "Air bermassa 200 gram bersuhu 30°C dicampur dengan air 100 gram bersuhu 90°C dalam bejana terisolasi. Berapakah suhu akhir campurannya?",
    answer: "50°C"
  },
  {
    id: 13,
    face: "back",
    question: "Gas ideal memuai secara isobarik pada tekanan konstan 1,5 × 10⁵ Pa dari volume 2 liter menjadi 8 liter. Berapakah usaha yang dilakukan gas?",
    answer: "600 J (Kunci) / 900 J"
  },
  {
    id: 14,
    face: "back",
    question: "Sebuah mesin Carnot menyerap kalor 1000 Joule dari reservoir panas bersuhu 600 K dan membuang kalor ke reservoir dingin bersuhu 300 K. Berapakah usaha total yang dihasilkan mesin?",
    answer: "900 J (Kunci) / 500 J"
  },
  {
    id: 15,
    face: "back",
    question: "Dua muatan masing-masing +2 μC dan +8 μC terpisah sejauh 0,6 meter di udara. Berapakah besar gaya tolak-menolak antara kedua muatan? (k = 9 × 10⁹ N·m²/C²)",
    answer: "0,4 N"
  },

  // --- SISI KIRI (LEFT): SOAL 16 - 20 ---
  {
    id: 16,
    face: "left",
    question: "Sebuah kapasitor dengan kapasitansi 12 μF dihubungkan ke sumber tegangan 15 Volt. Berapakah besar muatan yang tersimpan di dalam kapasitor?",
    answer: "180 μC"
  },
  {
    id: 17,
    face: "left",
    question: "Dua buah resistor masing-masing 6 Ω dan 12 Ω dirangkai paralel, lalu dihubungkan ke sumber tegangan 36 Volt. Berapakah kuat arus total yang keluar dari baterai?",
    answer: "9 A"
  },
  {
    id: 18,
    face: "left",
    question: "Kawat lurus sepanjang 80 cm dialiri arus 15 Ampere tegak lurus terhadap medan magnet seragam 0,25 Tesla. Berapakah gaya Lorentz yang dialami kawat?",
    answer: "3 N"
  },
  {
    id: 19,
    face: "left",
    question: "Kumparan dengan 200 lilitan mengalami perubahan fluks magnetik sebesar 0,15 Weber dalam selang waktu 0,6 detik. Berapakah besar GGL induksi yang dihasilkan?",
    answer: "50 V"
  },
  {
    id: 20,
    face: "left",
    question: "Rangkaian arus bolak-balik seri terdiri dari resistor 12 Ω dan induktor dengan reaktansi induktif 20 Ω dan reaktansi kapasitif 15 Ω. Berapakah impedansi total rangkaian?",
    answer: "13 Ω"
  }
];
