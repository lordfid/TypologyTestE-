/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Moon, Brain, Award, Users, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface StartScreenProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onStart: () => void;
}

export default function StartScreen({ theme, onToggleTheme, onStart }: StartScreenProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col justify-between py-12 px-4 md:px-8 transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Banner / Theme Switcher */}
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-500">
            <Brain size={28} className="animate-pulse" id="brand-logo-icon" />
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-lg tracking-tight select-none">
              MENDALAM
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
              Analisis Tipologi Komprehensif
            </p>
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          id="theme-toggler-btn"
          className={`p-2.5 rounded-xl border transition-all duration-300 ${isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-sky-400 hover:text-sky-300' : 'border-slate-200 bg-white hover:bg-slate-100 text-indigo-600 hover:text-indigo-500 shadow-sm'}`}
          title={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Welcomer Grid */}
      <main className="max-w-4xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-8">
        
        <div className="md:col-span-12 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <Award size={14} /> Tes Kedalaman Karakter Mandiri Terlengkap
          </div>

          <h2 className="font-sans text-4xl md:text-6xl font-black md:leading-tight tracking-tight">
            Temukan Cetak Biru <br className="hidden md:inline" />
            <span className="text-indigo-500 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              Jiwa & Psike Aslimu.
            </span>
          </h2>

          <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ini bukan sekadar tes kepribadian hiburan ringan sepele. Kami memetakan arsitektur fungsi kognitif bawaanmu (**MBTI**), 
            motivasi ketakutan bawah sadarmu (**Enneagram**), tingkat kestabilan batin (**Big Five**), 
            hingga temperament serta gaya pengambilan keputusan moralmu secara konsisten, serius, dan berlapis.
          </p>

          {/* Ethical & Answering Instruction boxes */}
          <div className={`p-6 rounded-2xl border text-sm max-w-3xl leading-relaxed space-y-4 ${isDark ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}>
            <h3 className="font-sans font-bold text-sm tracking-wide uppercase flex items-center gap-2 text-indigo-500">
              <Users size={16} /> PETUNJUK MENGANTISIPASI BIAS JAWABAN:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Skenario Kehidupan Nyata:</strong> Jika seandainya sebuah adegan tidak sama persis dengan jalannya hidupmu, 
                pilihlah jawaban yang paling mirip dengan caramu menghadapi rasa yang serupa di raga.
              </li>
              <li>
                <strong>Kebiasaan Nyata vs Diri Ideal:</strong> Pilih opsi yang mewakili respons spontan, ucapan, atau tindakan pertamamu 
                saat lelah, marah, atau malu—bukan jawaban yang terdengar paling dewasa atau paling bijak.
              </li>
              <li>
                <strong>Kejujuran Tersembunyi:</strong> Jangan tebak label psikologi dari teks. Pilih yang membuat kenangan lamamu berseru, 
                <em>“Aku memang pernah bersikap begitu.”</em>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={onStart}
              id="start-assessment-btn"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-lg rounded-2xl shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              Mulai Tes Mandiri
            </button>
            <p className="mt-2 text-xs font-mono text-slate-500">
              Durasi pengerjaan: ~15-20 Menit | Hasil lengkap terperinci
            </p>
          </div>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="max-w-4xl w-full mx-auto text-center border-t border-slate-800/10 active:border-slate-800/30 pt-6">
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          Tes Kepribadian Mendalam &copy; {new Date().getFullYear()} Indonesia | Hak Cipta Dilindungi
        </p>
      </footer>

    </div>
  );
}
