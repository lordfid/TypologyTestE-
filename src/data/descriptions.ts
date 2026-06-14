/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CognitiveFunction, MBTIType, EnneagramType } from '../types';

export const cognitiveFunctionBriefs: { [key in CognitiveFunction]: { title: string; motto: string; description: string } } = {
  Ni: {
    title: "Introverted Intuition (Ni)",
    motto: "Membaca arah batin yang tak terlihat.",
    description: "Kau memproses dunia dengan menyatukan tanda-tanda kecil menjadi satu kesimpulan jangka panjang yang mendalam. Kau pandai melihat apa yang tersembunyi di balik permukaan."
  },
  Ne: {
    title: "Extraverted Intuition (Ne)",
    motto: "Membuka seluruh kemungkinan baru.",
    description: "Kau suka mengeksplorasi ide bervariasi, pola bercabang, dan melihat jalan keluar alternatif di situasi-situasi buntu."
  },
  Si: {
    title: "Introverted Sensing (Si)",
    motto: "Kesetiaan pada jejak langkah yang aman.",
    description: "Kau sangat teliti, setia pada ingatan masa lalu yang stabil, dan menjaga keandalan kesinambungan dalam hidup berkelompok."
  },
  Se: {
    title: "Extraverted Sensing (Se)",
    motto: "Langkah nyata saat ini juga.",
    description: "Kau merespons waktu sekarang secara spontan, berani bergerak di alam nyata, dan peka terhadap stimulan fisik."
  },
  Fi: {
    title: "Introverted Feeling (Fi)",
    motto: "Autentisitas yang hening.",
    description: "Kau menjaga agar keputusanmu tidak mengkhianati nuraninya sendiri. Bagimu, keselarasan batin lebih penting daripada tepuk tangan sosial."
  },
  Fe: {
    title: "Extraverted Feeling (Fe)",
    motto: "Jembatan rasa antar manusia.",
    description: "Kau peka terhadap getaran suasana relasi, sadar akibat kata-kata pada orang sekitar, dan berupaya menciptakan kehangatan bersama."
  },
  Ti: {
    title: "Introverted Thinking (Ti)",
    motto: "Pembedahan logika secara jujur.",
    description: "Kau menyukai ketepatan definisi, membongkar sistem agar tahu persis cara kerjanya, dan jujur pada asas akurasi berpikir."
  },
  Te: {
    title: "Extraverted Thinking (Te)",
    motto: "Efisiensi terukur untuk kemajuan nyata.",
    description: "Kau mengorganisasi lingkungan sekitar agar segala hal bergerak produktif, logis, terarah, dan mewujudkan hasil konkret."
  }
};

export const mbtiDescriptions: { [key in MBTIType]: { title: string; alias: string; summary: string; strengths: string[]; weaknesses: string[]; coreFear: string } } = {
  INTJ: {
    title: "INTJ - Sang Visioner Independen",
    alias: "Arsitek Sistem Jangka Panjang",
    summary: "Kau adalah tipe yang tenang, strategis, dan mandiri. Pikiranmu digerakkan oleh satu visi masa depan yang jelas, mendalam, dan terarah logis.",
    strengths: ["Perencanaan strategis", "Daya analisis tajam", "Kemampuan bekerja mandiri", "Prinsip hidup yang kokoh"],
    weaknesses: ["Cenderung menutup diri", "Sulit menerima ketidakpastian", "Kurang sabar terhadap kepalsuan"],
    coreFear: "Kehilangan kendali batin atau inkompetensi sistemik."
  },
  INFJ: {
    title: "INFJ - Sang Pelindung Sunyi",
    alias: "Pembimbing Batin Komunitas",
    summary: "Kau peka akan nuansa kemanusiaan, menyatukan intuisi yang dalam dengan kepedulian tulus untuk membimbing orang lain tanpa perlu menonjolkan diri.",
    strengths: ["Daya empati yang mendalam", "Visi moral jangka panjang", "Kesetiaan pada nilai", "Komunikasi halus pelan"],
    weaknesses: ["Kecenderungan menanggung duka dunia sendirian", "Idealisme yang terlalu menuntut diri", "Rentan mengalami kelelahan mental"],
    coreFear: "Kehilangan kedekatan hubungan yang bermakna atau dinilai biasa saja."
  },
  ENTJ: {
    title: "ENTJ - Sang Komandan Tangguh",
    alias: "Penggerak Efisiensi Struktural",
    summary: "Kau menyukai tantangan struktural, memimpin dengan karisma tegas, logis, dan memastikan seluruh tim bergerak mencapai hasil nyata secara optimal.",
    strengths: ["Kepemimpinan yang dinamis", "Keberanian mengambil risiko", "Pengelolaan rencana yang lancar", "Efisiensi tinggi"],
    weaknesses: ["Cenderung mendominasi percakapan", "Kurang peka pada luka halus relasional", "Kurang sabar pada proses lambat"],
    coreFear: "Ketidakmampuan memimpin atau kegagalan efisiensi eksternal."
  },
  ENFJ: {
    title: "ENFJ - Sang Guru Berkarisma",
    alias: "Pendorong Potensi Kemanusiaan",
    summary: "Kau adalah perekat sosial alami yang bersemangat menyatukan banyak kepala demi tujuan yang baik, menginspirasi pertumbuhan moral batin orang sekitar.",
    strengths: ["Daya persuasi sosial yang hangat", "Empati tinggi", "Intuisi tajam dalam memahami motif", "Kemampuan mengorganisasi massa"],
    weaknesses: ["Mudah terbawa arus tuntutan emosional", "Mengorbankan diri berlebihan", "Takut dicap tidak berguna"],
    coreFear: "Sikap ketidakpedulian sosial atau pengabaian relasional."
  },
  INTP: {
    title: "INTP - Sang Pemikir Logis",
    alias: "Pembedah Konsep Kerangka Teori",
    summary: "Kau menyukai penemuan teori, menganalisis ketetapan logika dasar dunia sekeliling, dan membutuhkan ruang bebas berekspresi tanpa birokrasi kaku.",
    strengths: ["Kemampuan berpikir orisinal", "Pemecah kebuntuan konseptual", "Kemandirian intelektual", "Ketepatan analisis"],
    weaknesses: ["Sering terjebak overthinking tak berujung", "Kurang peduli pada aturan sosial sepele", "Sulit menjelaskan konsep rumit secara sederhana"],
    coreFear: "Kebodohan intelektual atau inkompetensi logika diri."
  },
  INFP: {
    title: "INFP - Sang Penyembuh Autentik",
    alias: "Penjaga Harmoni Moral Privat",
    summary: "Sangat autentik, kau menjalani hidup dengan kesetiaan penuh pada nurani privatmu, peduli pada keunikan setiap luka batin manusia.",
    strengths: ["Otentisitas moral", "Daya kreasi imajinatif tinggi", "Penerimaan tulus pada yang rentan", "Empati tanpa penghakiman"],
    weaknesses: ["Sering menyendiri secara berlebihan", "Kesulitan menegakkan batasan tegas", "Rentan tenggelam dalam kesedihan masa lalu"],
    coreFear: "Mengorbankan integritas diri atau didikte identitas fiktif."
  },
  ENTP: {
    title: "ENTP - Sang Penemu Visioner",
    alias: "Pemberontak Kreatif Alternatif",
    summary: "Kau menyukai debat konsep, cerdas melihat jalan keluar cerdik di berbagai konflik sistem buntu, dan merangsang orang berpikiran orisinal.",
    strengths: ["Improvisator handal", "Komunikator cerdas penuh lelucon", "Kemampuan membaca kebuntuan", "Keterbukaan belajar tinggi"],
    weaknesses: ["Sulit menyelesaikan detail administratif kaku", "Cenderung suka memprovokasi tanpa solusi praktis", "Kurang sabar pada keteraturan harian"],
    coreFear: "Kehilangan opsi inovasi atau hilangnya stimulasi mental."
  },
  ENFP: {
    title: "ENFP - Sang Pejuang Inspiratif",
    alias: "Pembuka Peluang Jiwa Bebas",
    summary: "Kepribadianmu hangat, optimis, dan lincah membakar semangat kolektif untuk melahirkan berbagai peluang yang belum pernah dicatat.",
    strengths: ["Karisma ekspresif tinggi", "Kreativitas bercabang luas", "Kepekaan emosi yang peduli", "Adaptabilitas tinggi"],
    weaknesses: ["Kurang konsisten menyelesaikan tugas rutin", "Mudah merasa bosan pada keteraturan", "Kekhawatiran tinggi akan pengabaian"],
    coreFear: "Kehilangan jati diri sejati atau terbelenggu aturan kaku."
  },
  ISTJ: {
    title: "ISTJ - Sang Penyelenggara Andal",
    alias: "Penjaga Kesinambungan Struktur",
    summary: "Kau adalah jangkar kestabilan sekelilingmu, setia menjalankan tugas secara terstruktur, menghargai fakta nyata, dan menjaga tradisi.",
    strengths: ["Ketelitian tingkat tinggi", "Tanggung jawab moral kuat", "Fakta empiris diutamakan", "Kedisiplinan luar biasa"],
    weaknesses: ["Kaku terhadap perubahan instan", "Cenderung menilai sesuatu secara hitam-putih", "Kurang nyaman menangani konflik emosional samudra"],
    coreFear: "Kekacauan sistem atau kegagalan tanggung jawab terpercaya."
  },
  ISFJ: {
    title: "ISFJ - Sang Pelindung Tulus",
    alias: "Penjaga Tradisi Keselamatan",
    summary: "Kau setia menjaga kenyamanan nyata batin orang-orang terdekat tanpa butuh pengakuan berbayar, andal, teliti, dan penuh tanggung jawab moral.",
    strengths: ["Kepedulian detail harian", "Loyalitas tak tergoyahkan", "Kesabaran luar biasa mendengarkan", "Kepatuhan norma etis"],
    weaknesses: ["Sulit menolak permintaan (people pleaser)", "Menyimpan kekesalan sendirian", "Cemas berlebih pada hal tak diperkirakan"],
    coreFear: "Ketidakmampuan melindungi orang dicintai atau penolakan rasa aman."
  },
  ESTJ: {
    title: "ESTJ - Sang Pelaksana Tegas",
    alias: "Penyusun Tata Tertib Komunitas",
    summary: "Kau adalah pengelola operasional yang rapi, memastikan standar mutu dipatuhi seluruh pihak, dan meletakkan aturan di atas kepentingan ego personal.",
    strengths: ["Pengorganisasian tugas lancar", "Ketegasan bersikap adil", "Keandalan tinggi di saat kritis", "Pekerja keras konsisten"],
    weaknesses: ["Cenderung kurang peka pada dinamika emosi personal", "Kaku pada aturan tertulis tak relevan", "Rentan memisahkan diri jika sistem melanggar tatatertib"],
    coreFear: "Ketidakteraturan sosial atau hilangnya martabat kerja."
  },
  ESFJ: {
    title: "ESFJ - Sang Penyambut Hangat",
    alias: "Fasilitator Keharmonisan Bersama",
    summary: "Kau mencintai relasi komunal yang sehat, berbakat menyemarakkan acara berkumpul bersama, sangat andal, rajin, dan menghormati sejarah kekeluargaan.",
    strengths: ["Keterbukaan bersikap ramah", "Pengelolaan harmoni sosial", "Keandalan tinggi melayani", "Jiwa gotong-royong kuat"],
    weaknesses: ["Sangat rentan terhadap penolakan citra", "Sulit beradaptasi dengan cara melompat kaku", "Cenderung over-worry tentang apa kata orang"],
    coreFear: "Pengasingan sosial atau didakwa tidak memiliki rasa peduli."
  },
  ISTP: {
    title: "ISTP - Sang Mekanik Lincah",
    alias: "Pemecah Masalah Fisik Pragmatis",
    summary: "Kau tenang, mandiri, dan cepat mendeteksi kerusakan operasional nyata di sekitarmu, lalu memperbaikinya secara tenang tanpa drama kata-kata.",
    strengths: ["Daya adaptasi fisik lincah", "Tenang di bawah tekanan darurat", "Logika operasional tajam", "Kemandirian batin yang hening"],
    weaknesses: ["Sulit didekati secara emosional batin", "Rentan bosan pada penjelasan panjang lebar", "Cenderung abai terhadap komitmen kaku"],
    coreFear: "Kehilangan kendali ruang otonomi fisik pribadi."
  },
  ISFP: {
    title: "ISFP - Sang Seniman Sunyi",
    alias: "Penjelajah Estetika Autentik",
    summary: "Mempunyai jiwa halus yang tenang, kau mengekspresikan nilai pribadimu lewat kreasi nyata, menyukai keindahan, dan tidak mau menyetir jalan hidup orang lain.",
    strengths: ["Orientasi estetika peka", "Keseimbangan diri menjaga kedamaian", "Kesetiaan moral lisan", "Kombinasi artistik fisik"],
    weaknesses: ["Kecenderungan melarikan diri dari konflik", "Sangat defensif jika nilai moral privat disentuh", "Sulit menyusun rencana lima tahunan"],
    coreFear: "Kehilangan kebebasan ekspresi orisinal diri."
  },
  ESTP: {
    title: "ESTP - Sang Pejuang Dinamis",
    alias: "Improvisator Aksi Pragmatis",
    summary: "Kau adalah pengambil keputusan instan yang berani bergerak di lapangan nyata, lincah menghadapi tantangan tak terduga, dan pandai mencairkan ketegangan kelompok.",
    strengths: ["Keberanian fisik luar biasa", "Pemecah masalah praktis darurat", "Karisma mencairkan suasana", "Fleksibilitas taktis"],
    weaknesses: ["Cenderung ceroboh terhadap potensi risiko panjang", "Sulit menangani ketidakberdayaan emosional mendalam", "Kurang teliti pada detail aturan tertulis"],
    coreFear: "Terjebak dalam kebosanan administratif atau terbelenggu pasif."
  },
  ESFP: {
    title: "ESFP - Sang Penghibur Alami",
    alias: "Penyemarak Energi Masa Kini",
    summary: "Kau menikmati hidup dengan penuh semangat di saat ini juga, berbagi kehangatan, visual yang menawan, dan kegembiraan fisik dengan sesama manusia.",
    strengths: ["Ekspresi penuh sukaria", "Kepekaan sensorik estetika", "Kapasitas menyenangkan sekeliling", "Fleksibilitas tinggi"],
    weaknesses: ["Mudah menghindari tanggung jawab membosankan", "Kurang mendalam merencanakan visi masa depan", "Mengambil keputusan secara impulsif emosional"],
    coreFear: "Rasa sepi yang kosong atau hilangnya stimulasi sosial fisik."
  }
};

export const enneagramDescriptions: { [key in EnneagramType]: { title: string; coreFear: string; coreDesire: string; defense: string; healthyPattern: string; stressPattern: string } } = {
  "1": {
    title: "Tipe 1 - Sang Reformis (The Reformer)",
    coreFear: "Menjadi orang yang rusak, jahat, cacat moral, atau tidak adil.",
    coreDesire: "Memiliki integritas diri, keseimbangan, serta moralitas yang baik.",
    defense: "Reaksi Formasi (menekan amarah pribadi dan memunculkan kebaikan sopan pelan).",
    healthyPattern: "Menjadi lebih rileks, penuh penerimaan, bijaksana, objektif, toleran terhadap ketidaksempurnaan.",
    stressPattern: "Menjadi sangat kaku, penuh sindiran pedas, frustrasi, dan menghakimi diri saat tertekan."
  },
  "2": {
    title: "Tipe 2 - Sang Penolong (The Helper)",
    coreFear: "Tidak dicintai, diabaikan, terbuang, atau didakwa tidak bernilai kemanusiaan.",
    coreDesire: "Merasa diterima, disayangi, dibutuhkan, dan dihargai kontribusinya.",
    defense: "Represi (menekan kebutuhan emosi pribadi dan hanya fokus melayani kebutuhan orang).",
    healthyPattern: "Belajar menetapkan batasan batin yang sehat, mencintai diri sendiri secara seimbang.",
    stressPattern: "Menjadi defensif manipulatif emosional, menuntut timbal-balik kepatuhan dari sekeliling."
  },
  "3": {
    title: "Tipe 3 - Sang Pengejar Prestasi (The Achiever)",
    coreFear: "Menjadi orang yang biasa saja, tidak berprestasi, sepele, atau gagal melakukan tugas.",
    coreDesire: "Dianggap berharga, kompeten, menginspirasi, dan berhasil secara nyata.",
    defense: "Identifikasi Citra (memakai topeng kepantasan sosial agar dikagumi).",
    healthyPattern: "Menemukan kebenaran sejati diri tanpa diukur oleh tumpukan piala eksternal.",
    stressPattern: "Mengabaikan lelah batin, bersikap dingin kompetitif, cemas berlebih, atau mati rasa mendadak."
  },
  "4": {
    title: "Tipe 4 - Sang Individualis (The Individualist)",
    coreFear: "Kehilangan identitas orisinal dirinya, didikte corak seragam, atau tidak memiliki makna.",
    coreDesire: "Memahami dan berekspresi sejalan dengan keunikan rasa pribadinya.",
    defense: "Sublimasi rasa sakit (mengubah duka internal menjadi karya estetika/filosofis).",
    healthyPattern: "Belajar produktif konsisten, melepaskan keterikatan pada trauma duka masa lalu.",
    stressPattern: "Rentan tenggelam dalam kesedihan berlarut, menarik diri secara berlebihan, merasa terasing."
  },
  "5": {
    title: "Tipe 5 - Sang Penyelidik (The Investigator)",
    coreFear: "Inkompeten intelektual, kewalahan diinterupsi emosi sosial, didikte tanpa pemahaman.",
    coreDesire: "Memiliki kompetensi intelektual utuh, memahami prinsip operasional sistem dasar.",
    defense: "Kompartementalisasi (memilah emosi ke dalam sekat steril agar tetap berpikir jernih).",
    healthyPattern: "Berani bergerak turun ke dunia aksi nyata, berbagi emosi hangat secara tulus.",
    stressPattern: "Sangat sinis mengisolasi diri, ketakutan berlebihan akan ancaman luar, menutup komunikasi."
  },
  "6": {
    title: "Tipe 6 - Sang Loyalis (The Loyalist)",
    coreFear: "Kehilangan jangkar bimbingan aman, ditinggal berjuang sendirian di ketidakpastian.",
    coreDesire: "Memperoleh kelangsungan hidup stabil, didampingi pihak terpercaya atau institusi adil.",
    defense: "Antisipasi bahaya (terus-menerus memikirkan skenario terburuk guna perlindungan diri).",
    healthyPattern: "Membangun kepercayaan diri batin, optimis memandang ketidakpastian masa depan.",
    stressPattern: "Sangat cemas obsesif, mencurigai motif sekeliling, defensif reaktif, kaku mematuhi birokrasi."
  },
  "7": {
    title: "Tipe 7 - Sang Pesonais (The Enthusiast)",
    coreFear: "Terperangkap di sangkar kebosanan fisik, kesedihan duka yang dalam, batas pilihan sempit.",
    coreDesire: "Mencicipi aneka ragam kesenangan, mengumpulkan stimulasi baru tak habis-habis.",
    defense: "Rasionalisasi positif (selalu membingkai ulang kejadian pedih menjadi bahan pelajaran lucu).",
    healthyPattern: "Berani menetap di saat kini, menyelesaikan meditasi duka, konsisten pada satu karya.",
    stressPattern: "Impulsif gegabah membelanjakan tabungan emosional fisik, menghindari krisis pelarian."
  },
  "8": {
    title: "Tipe 8 - Sang Penantang (The Challenger)",
    coreFear: "Dikontrol, disetir, lemah tak berdaya, ditipu moralitas kepatuhan palsu sekeliling.",
    coreDesire: "Melindungi kebebasan jalannya komando hidup pribadi beserta keselamatan kaum marjinal.",
    defense: "Penyangkalan kerentanan (menolak tampak bimbang atau rindu dengan bersikap keras menantang).",
    healthyPattern: "Kemampuan memaafkan tulus, melembutkan suara batin pelindung orang rentan di sekitarnya.",
    stressPattern: "Sangat agresif mengecam siapa pun yang dinilai mencurigakan, bersikap dominan mutlak."
  },
  "9": {
    title: "Tipe 9 - Sang Peacemaker (The Peacemaker)",
    coreFear: "Perpecahan relasi, terputus dari kedamaian kelompok, konflik fisik yang bising.",
    coreDesire: "Menjaga keutuhan relasional, ketenangan batin murni tanpa dinamika konfrontatif.",
    defense: "Matirasaroll (mematikan keluhan kecil batin agar tidak memicu ketegangan sosial).",
    healthyPattern: "Berani menyuarakan kebenaran pribadinya dengan tegas, teguh mengambil keputusan produktif.",
    stressPattern: "Pasif-agresif menumpuk kecewa, menunda tugas penting, acuh tak acuh melarikan diri."
  }
};
