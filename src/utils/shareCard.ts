/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestResult } from '../types';

export function generateShareText(result: TestResult): string {
  return `Hasil Tes Kepribadian Mendalam saya:
Tipe MBTI: ${result.primaryMBTI} (Akurasi: ${result.mbtiConfidence}%)
Enneagram: ${result.wing} (${result.instinctStacking})
Temperamen: ${result.temperament}
Moral Alignment: ${result.moralAlignment}

Ikuti tes aslinya sekarang untuk memetakan arsitektur fungsi kognitif lengkapmu secara mendalam!`;
}

export async function generateInstagramStoryCanvas(
  result: TestResult,
  themeMode: 'dark' | 'light'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background Gradients
  const isDark = themeMode === 'dark';
  const grad = ctx.createLinearGradient(0, 0, 0, 1920);
  if (isDark) {
    grad.addColorStop(0, '#0f172a'); // slate-900
    grad.addColorStop(1, '#020617'); // slate-950
  } else {
    grad.addColorStop(0, '#f8fafc'); // slate-50
    grad.addColorStop(1, '#e2e8f0'); // slate-200
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Decorative ambient circles
  ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'; // Indigo bloom
  ctx.beginPath();
  ctx.arc(540, 300, 400, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isDark ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.05)'; // Pink bloom
  ctx.beginPath();
  ctx.arc(800, 1500, 350, 0, Math.PI * 2);
  ctx.fill();

  // Header Title
  ctx.fillStyle = isDark ? '#38bdf8' : '#4f46e5'; // sky-400 or indigo-600
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TES KEPRIBADIAN MENDALAM', 540, 180);

  ctx.fillStyle = isDark ? '#94a3b8' : '#475569'; // slate-400 or slate-600
  ctx.font = '500 24px monospace';
  ctx.fillText('Arsitektur Fungsi Kognitif & Tipologi', 540, 230);

  // Card Container border / box shadow simulation
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 4;
  const cardY = 320;
  const cardH = 1250;
  ctx.beginPath();
  ctx.roundRect(100, cardY, 880, cardH, 40);
  ctx.fill();
  ctx.stroke();

  // Primary MBTI Badge
  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
  ctx.font = 'bold 150px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.primaryMBTI, 540, cardY + 230);

  ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
  ctx.font = 'italic 500 32px sans-serif';
  ctx.fillText(`Akurasi Profil: ${result.mbtiConfidence}%`, 540, cardY + 300);

  // Separator Line
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  ctx.beginPath();
  ctx.moveTo(200, cardY + 370);
  ctx.lineTo(880, cardY + 370);
  ctx.stroke();

  // Core Typology Stats Rows
  const drawRow = (label: string, value: string, y: number) => {
    ctx.textAlign = 'left';
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(label, 180, y);

    ctx.textAlign = 'right';
    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(value, 900, y);
  };

  let rowY = cardY + 450;
  drawRow('Enneagram:', `${result.wing} (${result.instinctStacking})`, rowY);
  rowY += 90;
  drawRow('Tritype:', result.tritype, rowY);
  rowY += 90;
  drawRow('Temperamen:', result.temperament, rowY);
  rowY += 90;
  drawRow('Moral Alignment:', result.moralAlignment, rowY);
  rowY += 90;
  drawRow('Attitudinal Psyche:', result.attitudinalPsyche, rowY);

  // Separator Line
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  ctx.beginPath();
  ctx.moveTo(200, rowY + 50);
  ctx.lineTo(880, rowY + 50);
  ctx.stroke();

  // Top Cognitive Functions Ranks
  rowY += 120;
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? '#38bdf8' : '#4f46e5';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('URUTAN FUNGSI KOGNITIF UTAMA', 540, rowY);

  rowY += 100;
  
  // Use the theoretical cognitive stack of the diagnosed MBTI type for 100% mathematical consistency
  const stack = result.cognitiveStack; // e.g., ['Ni', 'Te', 'Fi', 'Se']
  const ranks = stack.map(funcName => {
    const ranking = result.functionRankings.find(r => r.name === funcName);
    return {
      name: funcName,
      score: ranking ? ranking.score : 0
    };
  });

  const colW = 180;
  const startX = 540 - ((ranks.length - 1) * colW) / 2;

  ranks.forEach((func, idx) => {
    const x = startX + idx * colW;
    
    // Circle container background
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)';
    ctx.beginPath();
    ctx.arc(x, rowY, 55, 0, Math.PI * 2);
    ctx.fill();

    // Elegant outer circle border highlight for psychological roles
    ctx.strokeStyle = idx === 0 
      ? '#10b981' // Green highlight for DOM
      : idx === 1 
      ? '#3b82f6' // Blue highlight for AUX
      : isDark 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, rowY, 55, 0, Math.PI * 2);
    ctx.stroke();

    // 1. Function name text (DOM/AUX highlighted, centered inside the circle)
    ctx.fillStyle = idx === 0 
      ? '#10b981' 
      : idx === 1 
      ? '#3b82f6' 
      : isDark 
      ? '#ffffff' 
      : '#0f172a';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(func.name, x, rowY);

    // Reset baseline for standard text offsets below the circle
    ctx.textBaseline = 'alphabetic';

    // 2. Score text (directly below circle)
    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(`${func.score}%`, x, rowY + 95);

    // 3. Stack role label (DOM, AUX, TERT, INF below the score)
    const labels = ['DOM', 'AUX', 'TERT', 'INF'];
    ctx.fillStyle = idx === 0 
      ? '#10b981' 
      : idx === 1 
      ? '#3b82f6' 
      : isDark 
      ? '#64748b' 
      : '#475569';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(labels[idx], x, rowY + 135);
  });

  // Footer Card Notice
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  ctx.font = '500 26px sans-serif';
  ctx.fillText('Bagikan hasil tes ini ke teman terdekatmu!', 540, 1680);

  ctx.fillStyle = isDark ? '#38bdf8' : '#4f46e5';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('ais-dev-lzynbdvgwtv5vqltvujakk-897934652618.asia-east1.run.app', 540, 1730);

  return canvas.toDataURL('image/png');
}

export function downloadShareCard(dataUrl: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function shareResultIfSupported(result: TestResult, dataUrl: string): Promise<boolean> {
  if (navigator.share) {
    try {
      // Create a virtual file to share if possible
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'Hasil_Tes_Kepribadian.png', { type: 'image/png' });
      await navigator.share({
        title: 'Hasil Tes Kepribadian Mendalam',
        text: generateShareText(result),
        files: [file]
      });
      return true;
    } catch {
      // Fallback share text only
      try {
        await navigator.share({
          title: 'Hasil Tes Kepribadian Mendalam',
          text: generateShareText(result)
        });
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}
