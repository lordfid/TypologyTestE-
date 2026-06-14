/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  RefreshCw,
  Download,
  Share2,
  Copy,
  Check,
  Compass,
  Heart,
  ShieldAlert,
  Users,
  Music,
  User,
  Activity,
  Award,
  Brain
} from 'lucide-react';
import { TestResult, CognitiveFunction, MBTIType, EnneagramType } from '../types';
import { mbtiDescriptions, enneagramDescriptions, cognitiveFunctionBriefs } from '../data/descriptions';
import { relationshipGuide, relationshipCaveat } from '../data/relationshipGuide';
import { archetypeMedia, mediaDisclaimer } from '../data/archetypeMedia';
import {
  generateShareText,
  generateInstagramStoryCanvas,
  downloadShareCard,
  shareResultIfSupported
} from '../utils/shareCard';

interface ResultScreenProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  result: TestResult;
  onRestart: () => void;
}

export default function ResultScreen({ theme, onToggleTheme, result, onRestart }: ResultScreenProps) {
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [storyCardUrl, setStoryCardUrl] = useState<string>('');
  const [generatingCard, setGeneratingCard] = useState(true);

  // Generate Instagram Story Card on Mount / State Update
  useEffect(() => {
    async function preRenderCard() {
      try {
        setGeneratingCard(true);
        const dataUrl = await generateInstagramStoryCanvas(result, theme);
        setStoryCardUrl(dataUrl);
      } catch (err) {
        console.error("Gagal merender Story card:", err);
      } finally {
        setGeneratingCard(false);
      }
    }
    preRenderCard();
  }, [result, theme]);

  const handleCopySummary = () => {
    const text = generateShareText(result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    if (storyCardUrl) {
      downloadShareCard(storyCardUrl, `Hasil_Mendalam_${result.primaryMBTI}_${result.wing}.png`);
    }
  };

  const handleWebShare = async () => {
    if (storyCardUrl) {
      await shareResultIfSupported(result, storyCardUrl);
    }
  };

  // Get description helpers
  const mbtiInfo = mbtiDescriptions[result.primaryMBTI] || {
    title: result.primaryMBTI,
    alias: "Analisis Khusus",
    summary: "Hasil kepribadianmu menampilkan kecenderungan kognitif khusus.",
    strengths: [],
    weaknesses: [],
    coreFear: "Kehilangan otonomi."
  };

  const enneagramInfo = enneagramDescriptions[result.primaryEnneagram] || {
    title: `Tipe ${result.primaryEnneagram}`,
    coreFear: "Ketidaknyamanan hidup.",
    coreDesire: "Aman sejahtera.",
    defense: "Rasionalisasi.",
    healthyPattern: "Damai sejahtera.",
    stressPattern: "Penuh kecemasan."
  };

  const relMatch = relationshipGuide[result.primaryMBTI] || {
    bestFriends: [],
    partners: [],
    coworkers: [],
    opposites: [],
    challenging: []
  };

  const mediaMatch = archetypeMedia[result.primaryMBTI] || {
    characters: [],
    song: { title: "Heimr", artist: "Unknown", mood: "Mendalam" }
  };

  return (
    <div className={`min-h-screen py-12 px-4 md:px-8 transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl w-full mx-auto space-y-12">

        {/* Header Block / Navigation */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-slate-500/10 active:border-slate-500/20 pb-8 text-center sm:text-left">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-500 font-bold block mb-1">
              ESTIMASI ANALISIS PSIKOLOGI SELESAI
            </span>
            <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight">
              Tes Kepribadian Mendalam
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              id="result-theme-toggle"
              className={`p-3 rounded-xl border transition-all duration-300 ${isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-sky-400' : 'border-slate-200 bg-white hover:bg-slate-100 text-indigo-600 shadow-sm'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={onRestart}
              id="restart-assessment-btn"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <RefreshCw size={16} /> Ulangi Tes
            </button>
          </div>
        </header>

        {/* Audit Warning Traps (If Bias or Stress exceeds thresholds) */}
        {result.validityWarnings.length > 0 && (
          <div className={`p-5 rounded-2xl border flex items-start gap-4 ${isDark ? 'bg-amber-950/20 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <ShieldAlert size={24} className="shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wide">
                Indikator Validitas Jawaban Terdeteksi:
              </h4>
              <ul className="list-disc pl-5 text-xs md:text-sm space-y-1">
                {result.validityWarnings.map((warning, wIdx) => (
                  <li key={wIdx}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* BENTO GRID MAIN RESULT DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Card 1: Primary MBTI Profile (Bento Size: Large - 8 columns) */}
          <section className={`md:col-span-8 p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <Brain size={14} /> Profil Utama MBTI
              </div>
              
              <div>
                <h3 className="font-sans font-black text-5xl tracking-tight text-indigo-500">
                  {result.primaryMBTI}
                </h3>
                <p className="font-mono text-sm uppercase tracking-widest text-slate-500 mt-1">
                  {mbtiInfo.alias}
                </p>
              </div>

              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {mbtiInfo.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-500/10">
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-sm tracking-wide uppercase text-emerald-500">
                  🟢 Kekuatan Karakter:
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-400">
                  {mbtiInfo.strengths.map((str, sIdx) => (
                    <li key={sIdx} className={isDark ? 'text-slate-300' : 'text-slate-600'}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-sans font-bold text-sm tracking-wide uppercase text-rose-500">
                  🔴 Titik Hambat/Buta:
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-400">
                  {mbtiInfo.weaknesses.map((wek, wIdx) => (
                    <li key={wIdx} className={isDark ? 'text-slate-300' : 'text-slate-600'}>{wek}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Card 2: Enneagram Badge & Info (Bento Size: Small - 4 columns) */}
          <section className={`md:col-span-4 p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-sky-500/10 border border-sky-500/20 text-sky-500">
                <Compass size={14} /> Dinamika Enneagram
              </div>

              <div>
                <h3 className="font-sans font-black text-4xl tracking-tight text-sky-400">
                  {result.wing}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mt-1">
                  Stacking: {result.instinctStacking.toUpperCase()} | Tritype: {result.tritype}
                </p>
              </div>

              <div className="text-sm space-y-3 leading-relaxed">
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">Rantai Ketakutan Bawah Sadar:</span>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{enneagramInfo.coreFear}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">Desakan Keinginan Utama:</span>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{enneagramInfo.coreDesire}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">Mekanisme Pertahanan:</span>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{enneagramInfo.defense}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-500/10 text-xs text-slate-500 space-y-1">
              <p>💡 <span className="font-bold">Arah Sehat:</span> {enneagramInfo.healthyPattern}</p>
              <p>⚠️ <span className="font-bold">Arah Stres:</span> {enneagramInfo.stressPattern}</p>
            </div>
          </section>

          {/* Card 3: MBTI Top 3 Rankings (Bento Size: Small/Mid - 4 columns) */}
          <section className={`md:col-span-4 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 text-violet-500">
                <Users size={14} /> Top 3 Kemungkinan MBTI
              </div>
              <p className="text-xs text-slate-500">
                Persentase kecocokan berdasarkan fungsi kognitif bawaanmu.
              </p>
            </div>

            <div className="space-y-4">
              {result.topMBTIMatches.map((match, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className={isSelectedType(match.type) ? 'text-indigo-500 font-bold' : isDark ? 'text-slate-200' : 'text-slate-800'}>
                      {match.type} {idx === 0 && '👑'}
                    </span>
                    <span className="font-mono text-xs">{match.score}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${match.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">{match.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Card 4: Cognitive Function Rankings (Bento Size: Large - 8 columns) */}
          <section className={`md:col-span-8 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-teal-500/10 border border-teal-500/20 text-teal-500">
                <Activity size={14} /> Ranking Fungsi Kognitif
              </div>
              <p className="text-xs text-slate-500">
                Urutan kekuatan caramu menyaring dan memetakan informasi di bawah tekanan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {result.functionRankings.map((func, fIdx) => {
                const isStack = result.cognitiveStack.includes(func.name);
                const stackIndex = result.cognitiveStack.indexOf(func.name);

                return (
                  <div key={fIdx} className="p-4 rounded-2xl border border-slate-500/5 bg-slate-500/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-base text-teal-500">
                          {func.name}
                        </span>
                        {isStack && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 uppercase tracking-widest">
                            {formatStackPosition(stackIndex)}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-semibold text-xs text-slate-500">
                        {func.score}% ({func.level})
                      </span>
                    </div>

                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${func.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {cognitiveFunctionBriefs[func.name]?.description || func.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Card 5: Big Five Results (Bento Size: Small/Mid - 4 columns) */}
          <section className={`md:col-span-4 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <Award size={14} /> Distribusi Big Five
              </div>
              <p className="text-xs text-slate-500">
                Indeks stabilitas mental, keteraturan, dan interaksi.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(result.bigFive).map(([trait, data], bIdx) => (
                <div key={bIdx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{formatBigFiveTrait(trait)}</span>
                    <span className="font-mono font-bold text-yellow-500">{data.score}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${data.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Level kapasitas: {data.level}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Card 6: Secondary Typologies (Bento Size: Large - 8 columns) */}
          <section className={`md:col-span-8 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 text-rose-500">
                <Activity size={14} /> Dimensi Tipologi Sekunder
              </div>
              <p className="text-xs text-slate-500">
                Rangkuman kecenderungan psike, sosiologis, temperamen, dan gaya pengambilan keputusan moralmu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-xl border border-slate-500/5 bg-slate-500/5 text-center space-y-1">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Moral Alignment</span>
                <p className="font-sans font-extrabold text-base text-rose-500">{result.moralAlignment}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-500/5 bg-slate-500/5 text-center space-y-1">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Temperamen Utama</span>
                <p className="font-sans font-extrabold text-base text-rose-500">{result.temperament}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-500/5 bg-slate-500/5 text-center space-y-1">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Socionics Type</span>
                <p className="font-sans font-extrabold text-base text-rose-500">{result.socionics}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-500/5 bg-slate-500/5 text-center space-y-1">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Attitudinal Psyche</span>
                <p className="font-sans font-extrabold text-base text-rose-500">{result.attitudinalPsyche}</p>
              </div>

            </div>
          </section>

          {/* Card 7: Relation Guide Matches (Bento Size: Large - 8 columns) */}
          <section className={`md:col-span-8 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <Heart size={14} /> Panduan Relasi Dinamis
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Rekan Kerja Ideal</span>
                  <div className="flex flex-wrap gap-2">
                    {relMatch.coworkers.map((col, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-500/10 text-slate-300 font-mono font-bold text-xs uppercase tracking-wider rounded-md border border-slate-500/20">{col}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Sahabat Terdekat</span>
                  <div className="flex flex-wrap gap-2">
                    {relMatch.bestFriends.map((col, idx) => (
                      <span key={idx} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider rounded-md border border-emerald-500/20">{col}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Pasangan Romantis</span>
                  <div className="flex flex-wrap gap-2">
                    {relMatch.partners.map((col, idx) => (
                      <span key={idx} className="px-2 py-1 bg-rose-500/10 text-rose-400 font-mono font-bold text-xs uppercase tracking-wider rounded-md border border-rose-500/20">{col}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="font-sans text-xs italic text-slate-400 leading-relaxed border-t border-slate-500/10 pt-4">
                📋 {relationshipCaveat}
              </p>
            </div>
          </section>

          {/* Card 8: Micro-Archetypes and Media (Bento Size: Small - 4 columns) */}
          <section className={`md:col-span-4 p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 text-violet-500 font-bold border">
                <Music size={14} /> Inspirasi Karakter & Lagu
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Karakter Nuansa Mirip:</span>
                  <p className={isDark ? 'text-slate-350' : 'text-slate-700'}>{mediaMatch.characters.join(', ')}</p>
                </div>

                <div className="border-t border-slate-500/10 pt-4 space-y-1">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase">Lagu Pengiring Atmosferik:</span>
                  <p className="font-sans font-bold text-base text-indigo-400 leading-tight">
                    {mediaMatch.song.title} <span className="font-normal text-xs text-slate-500">by {mediaMatch.song.artist}</span>
                  </p>
                  <p className="text-xs text-slate-400 italic">
                    &quot;{mediaMatch.song.mood}&quot;
                  </p>
                </div>
              </div>

              <p className="font-mono text-[9px] text-slate-500 italic mt-6 pt-4 border-t border-slate-500/5">
                {mediaDisclaimer}
              </p>
            </div>
          </section>

        </div>

        {/* SECTION: PRINT / INSTAGRAM STORY CARD DOWNLOAD */}
        <section className={`p-8 rounded-3xl border text-center space-y-6 ${isDark ? 'bg-slate-905 bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans font-black text-2xl tracking-tight">
              Bagikan Kartu Hasil Kepribadianmu!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Mendalam memvisualisasikan kartu bento-aesthetic resolusi tinggi 1080x1920 (Ukuran Instagram Story) untuk disimpan 
              di gawai atau dibagikan secara instan ke media sosialmu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            
            <button
              onClick={handleDownloadCard}
              disabled={generatingCard}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-slate-700 disabled:bg-slate-800 text-white font-sans font-bold text-sm rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
              title="Unduh Kartu Hasil Anda"
            >
              <Download size={18} /> {generatingCard ? 'Merender Kartu...' : 'Unduh Kartu Story (PNG)'}
            </button>

            <button
              onClick={handleCopySummary}
              className={`w-full sm:w-auto px-6 py-3.5 border font-sans font-bold text-sm rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} /> Salin Berhasil!
                </>
              ) : (
                <>
                  <Copy size={18} /> Salin Ringkasan Teks
                </>
              )}
            </button>

            {navigator.share && (
              <button
                onClick={handleWebShare}
                className={`w-full sm:w-auto px-6 py-3.5 border font-sans font-bold text-sm rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Share2 size={18} /> Bagikan Instan
              </button>
            )}

          </div>

          {/* Render visual image fallback if supported for tap-and-hold saving on mobile safari */}
          {storyCardUrl && !generatingCard && (
            <div className="pt-6">
              <p className="font-mono text-[10px] text-slate-500 mb-3 block">
                PRATINJAU KARTU (Tekan lama gambar untuk menyimpan manual di gawai pintar):
              </p>
              <div className="max-w-[240px] mx-auto rounded-xl overflow-hidden border border-slate-500/10 shadow-lg">
                <img
                  src={storyCardUrl}
                  alt="Kartu Instagram Story Mendalam"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover select-none"
                />
              </div>
            </div>
          )}
        </section>

        {/* Ethical Notice Disclaimer */}
        <footer className="text-center p-6 border-t border-slate-500/10 active:border-slate-300/30">
          <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
            <span className="font-bold text-indigo-500 uppercase tracking-widest block mb-2">CATATAN ETIS & PSIKOLOGIS</span>
            Kalkulasi ini dirancang berdasarkan formula estimasi kognitif relasional. Ini bukan diagnosis medis resmi dari psikolog klinis profesional. 
            Hasil kepribadianmu dapat mengalami pergeseran halus jika dikerjakan saat kau berada di kondisi sangat panik, lelah fisik, sedang mengalami tekanan relasi, 
            atau sedang memikirkan satu orang tertentu secara berlebihan. Gunakan laporan ini sebagai kompas eksplorasi diri, bukan jangkar pengekang jati dirimu.
          </p>
        </footer>

      </div>
    </div>
  );
}

// Helpers for formatted outputs
function isSelectedType(type: MBTIType) {
  // Can be styled conditionally, currently keeping active type highlighted
  return true;
}

function formatStackPosition(index: number): string {
  const labels = ["Dominan", "Auxiliary", "Tertiary", "Inferior"];
  return labels[index] || "Fungsi";
}

function formatBigFiveTrait(trait: string): string {
  const mapping: { [key: string]: string } = {
    openness: "Openness (Keterbukaan Ide)",
    conscientiousness: "Conscientiousness (Keteraturan Fungsi)",
    extraversion: "Extraversion (Interaksi Luar)",
    agreeableness: "Agreeableness (Nilai Gotong Royong)",
    neuroticism: "Neuroticism (Kerentanan Sensitif)"
  };
  return mapping[trait] || trait;
}
