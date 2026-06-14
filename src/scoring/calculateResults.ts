/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Question,
  UserAnswer,
  TestResult,
  CognitiveFunction,
  MBTIType,
  EnneagramType,
  Instinct,
  BigFiveResult,
  TemperamentType,
  SocionicsType,
  MoralAlignment,
  ScoreMap
} from '../types';
import { mbtiStacks } from './mbtiStacks';
import { questions } from '../questions';
import { getLevelLabel } from '../utils/format';

export function calculateRawScores(answers: UserAnswer[]): ScoreMap {
  const scores: ScoreMap = {
    functions: { Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0, Ti: 0, Te: 0 },
    enneagram: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    instincts: { sp: 0, sx: 0, so: 0 },
    tritype: {
      gut: { "8": 0, "9": 0, "1": 0 },
      heart: { "2": 0, "3": 0, "4": 0 },
      head: { "5": 0, "6": 0, "7": 0 }
    },
    bigFive: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 },
    temperament: { melancholic: 0, phlegmatic: 0, choleric: 0, sanguine: 0 },
    psyche: { volition: 0, emotion: 0, logic: 0, physics: 0 },
    moral: { lawful: 0, neutral_m: 0, chaotic: 0, good: 0, neutral_a: 0, evil: 0 },
    stress: 0,
    bias: 0
  };

  // Keep track of counts to normalize if questions are skipped
  let answeredCount = 0;

  for (const ans of answers) {
    if (ans.skipped) continue;
    answeredCount++;

    const q = questions.find(item => item.id === ans.questionId);
    if (!q) continue;

    const opt = q.options[ans.selectedOptionIndex];
    if (!opt) continue;

    // Track Audit Trap indicators
    if (opt.possibleBias) scores.bias += 1;
    if (opt.stressClue) scores.stress += 1;

    // Sum functions
    if (opt.scores.functions) {
      for (const [cf, val] of Object.entries(opt.scores.functions)) {
        scores.functions[cf as CognitiveFunction] += val || 0;
      }
    }

    // Sum enneagram
    if (opt.scores.enneagram) {
      for (const [et, val] of Object.entries(opt.scores.enneagram)) {
        scores.enneagram[et as EnneagramType] += val || 0;
        // Map to tritype partitions
        if (['8', '9', '1'].includes(et)) scores.tritype.gut[et] += val || 0;
        if (['2', '3', '4'].includes(et)) scores.tritype.heart[et] += val || 0;
        if (['5', '6', '7'].includes(et)) scores.tritype.head[et] += val || 0;
      }
    }

    // Sum instincts
    if (opt.scores.instincts) {
      for (const [inst, val] of Object.entries(opt.scores.instincts)) {
        scores.instincts[inst as Instinct] += val || 0;
      }
    }

    // Sum Big Five traits
    if (opt.scores.bigFive) {
      if (opt.scores.bigFive.openness) scores.bigFive.openness += opt.scores.bigFive.openness;
      if (opt.scores.bigFive.conscientiousness) scores.bigFive.conscientiousness += opt.scores.bigFive.conscientiousness;
      if (opt.scores.bigFive.extraversion) scores.bigFive.extraversion += opt.scores.bigFive.extraversion;
      if (opt.scores.bigFive.agreeableness) scores.bigFive.agreeableness += opt.scores.bigFive.agreeableness;
      if (opt.scores.bigFive.neuroticism) scores.bigFive.neuroticism += opt.scores.bigFive.neuroticism;
    }

    // Sum Temperaments
    if (opt.scores.temperament) {
      if (opt.scores.temperament.melancholic) scores.temperament.melancholic += opt.scores.temperament.melancholic;
      if (opt.scores.temperament.phlegmatic) scores.temperament.phlegmatic += opt.scores.temperament.phlegmatic;
      if (opt.scores.temperament.choleric) scores.temperament.choleric += opt.scores.temperament.choleric;
      if (opt.scores.temperament.sanguine) scores.temperament.sanguine += opt.scores.temperament.sanguine;
    }

    // Sum Psyche
    if (opt.scores.psyche) {
      if (opt.scores.psyche.volition) scores.psyche.volition += opt.scores.psyche.volition;
      if (opt.scores.psyche.emotion) scores.psyche.emotion += opt.scores.psyche.emotion;
      if (opt.scores.psyche.logic) scores.psyche.logic += opt.scores.psyche.logic;
      if (opt.scores.psyche.physics) scores.psyche.physics += opt.scores.psyche.physics;
    }

    // Sum Moral
    if (opt.scores.moral) {
      if (opt.scores.moral.lawful) scores.moral.lawful += opt.scores.moral.lawful;
      if (opt.scores.moral.chaotic) scores.moral.chaotic += opt.scores.moral.chaotic;
      if (opt.scores.moral.good) scores.moral.good += opt.scores.moral.good;
      if (opt.scores.moral.evil) scores.moral.evil += opt.scores.moral.evil;
    }
  }

  // Normalize scores slightly if unansweredCount exists
  const factor = answeredCount > 0 ? (90 / answeredCount) : 1;
  for (const cf of Object.keys(scores.functions) as CognitiveFunction[]) {
    scores.functions[cf] = Math.round(scores.functions[cf] * factor);
  }
  for (const et of Object.keys(scores.enneagram) as EnneagramType[]) {
    scores.enneagram[et] = Math.round(scores.enneagram[et] * factor);
  }

  return scores;
}

export function calculateFunctionRanking(functions: { [key in CognitiveFunction]: number }) {
  const definitions: { [key in CognitiveFunction]: { title: string; desc: string } } = {
    Ni: { title: "Introverted Intuition", desc: "Mendeteksi pola abstrak dan gambaran besar di masa depan." },
    Ne: { title: "Extraverted Intuition", desc: "Menjelajahi banyak alternatif dan ide-ide bercabang spontan." },
    Si: { title: "Introverted Sensing", desc: "Menghargai tradisi, pengalaman masa lalu, dan keandalan rincian." },
    Se: { title: "Extraverted Sensing", desc: "Hadir penuh di masa kini, merespons fisik secara taktis dan lincah." },
    Fi: { title: "Introverted Feeling", desc: "Sangat autentik, mendengarkan nurani batin dan prinsip moral privat." },
    Fe: { title: "Extraverted Feeling", desc: "Membangun dinamika hangat, menjaga ikatan harmoni kelompok sosial." },
    Ti: { title: "Introverted Logic/Thinking", desc: "Menganalisis ketepatan internal, konsistensi data, dan logika dasar." },
    Te: { title: "Extraverted Logic/Thinking", desc: "Sangat praktis, menyusun sistem efisiensi dan penyelesaian tugas." }
  };

  return (Object.entries(functions) as [CognitiveFunction, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => {
      // Scale out of 40-50 pts roughly to 0-100%
      const percentage = Math.min(100, Math.max(10, Math.round((score / 35) * 100)));
      return {
        name,
        score: percentage,
        level: percentage < 40 ? 'Rendah' : percentage <= 70 ? 'Sedang' : 'Tinggi',
        desc: definitions[name].desc
      };
    });
}

const mbtiEnneagramSg: { [key in MBTIType]: { [key in EnneagramType]?: number } } = {
  INTJ: { "5": 10, "1": 8, "8": 6, "4": 4, "9": 2 },
  INFJ: { "4": 10, "9": 8, "1": 7, "5": 6, "2": 5 },
  ENTJ: { "8": 10, "3": 9, "1": 6, "7": 4 },
  ENFJ: { "2": 10, "3": 8, "1": 7, "9": 5 },
  INTP: { "5": 10, "9": 7, "6": 5, "4": 4 },
  INFP: { "4": 10, "9": 9, "2": 5, "5": 4 },
  ENTP: { "7": 10, "3": 8, "8": 6, "5": 5 },
  ENFP: { "7": 10, "4": 8, "2": 7, "9": 5 },
  ISTJ: { "1": 10, "6": 9, "5": 5, "9": 4 },
  ISFJ: { "9": 10, "2": 9, "6": 8, "1": 4 },
  ESTJ: { "8": 10, "1": 9, "3": 8, "6": 6 },
  ESFJ: { "2": 10, "6": 8, "3": 7, "9": 5 },
  ISTP: { "5": 10, "9": 7, "6": 6, "8": 5 },
  ISFP: { "9": 10, "4": 8, "7": 4, "2": 3 },
  ESTP: { "7": 10, "8": 9, "3": 7 },
  ESFP: { "7": 10, "2": 8, "3": 8, "9": 4 }
};

export function calculateMBTIMatches(
  functions: { [key in CognitiveFunction]: number },
  enneagram?: { [key in EnneagramType]: number }
): { type: MBTIType; score: number; reason: string }[] {
  const rawList: { type: MBTIType; rawScore: number }[] = [];

  // 1. Calculate raw MBTI weighted scores based on cognitive stacks
  for (const [mbti, stack] of Object.entries(mbtiStacks) as [MBTIType, CognitiveFunction[]][]) {
    const dom = functions[stack[0]] || 0;
    const aux = functions[stack[1]] || 0;
    const tert = functions[stack[2]] || 0;
    const inf = functions[stack[3]] || 0;

    // Weight cognitive functions appropriately
    const rawScore = (dom * 4.0) + (aux * 3.0) + (tert * 1.5) + (inf * 0.5);
    rawList.push({ type: mbti, rawScore });
  }

  // 2. Find maximum raw score to normalize proportionally
  const maxRaw = Math.max(...rawList.map(r => r.rawScore)) || 1;

  // 3. Determine user's top scored Enneagram types if available
  let primeEn: EnneagramType = "9";
  let secEn: EnneagramType = "9";
  if (enneagram) {
    const enArray = (Object.entries(enneagram) as [EnneagramType, number][])
      .sort((a, b) => b[1] - a[1]);
    if (enArray[0]) primeEn = enArray[0][0];
    if (enArray[1]) secEn = enArray[1][0];
  }

  // 4. Calculate final matches with clean percentage distribution and synergy adjustments
  const results = rawList.map(({ type, rawScore }) => {
    // Cognitive match percentage (scales the highest match to a clean 88% base)
    const cognitiveBase = (rawScore / maxRaw) * 88;

    // Compute synergy multiplier based on Enneagram-MBTI correlations
    const aff1 = mbtiEnneagramSg[type]?.[primeEn] || 0;
    const aff2 = mbtiEnneagramSg[type]?.[secEn] || 0;
    const synergyBonus = (aff1 * 0.6) + (aff2 * 0.3); // max bonus is 9.0 points

    let finalScore = Math.min(99, Math.max(15, Math.round(cognitiveBase + synergyBonus)));

    // Generate dynamic descriptive text based on synergy depth
    const stack = mbtiStacks[type];
    let reason = "";
    if (aff1 >= 8) {
      reason = `Sangat sinergis dengan Enneagram ${primeEn}. Kombinasi fungsi kognitif ${stack[0]} & ${stack[1]} mengekspresikan karakter motivasi tipe ${primeEn} secara utuh.`;
    } else if (aff1 >= 4) {
      reason = `Seimbang dan stabil. Profil kognitif ${type} ini berpadu serasi dengan kestabilan mental dari pertahanan ego Enneagram ${primeEn}.`;
    } else {
      reason = `Kombinasi adaptif unik. Fungsi kognitif ${type} berpadu dengan motivasi inti Enneagram ${primeEn}, melahirkan variasi kepribadian yang orisinal.`;
    }

    // Apply lower threshold/grip note if inferior is excessively active
    const dom = functions[stack[0]] || 0;
    const inf = functions[stack[3]] || 0;
    if (inf > dom + 3) {
      reason += ` (Terdeteksi tanda stres/grip inferior fungsi ${stack[3]}).`;
      finalScore = Math.max(15, finalScore - 4); // Subtle stress penalty
    }

    return {
      type,
      score: finalScore,
      reason
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function calculateEnneagram(enneagram: { [key in EnneagramType]: number }) {
  return (Object.entries(enneagram) as [EnneagramType, number][])
    .sort((a, b) => b[1] - a[1]);
}

export function calculateWing(primary: EnneagramType, enneagram: { [key in EnneagramType]: number }): string {
  const num = parseInt(primary);
  const left = num === 1 ? 9 : num - 1;
  const right = num === 9 ? 1 : num + 1;

  const scoreLeft = enneagram[left.toString() as EnneagramType] || 0;
  const scoreRight = enneagram[right.toString() as EnneagramType] || 0;

  const w = scoreLeft >= scoreRight ? left : right;
  return `${primary}w${w}`;
}

export function calculateInstinctStacking(instincts: { [key in Instinct]: number }): string {
  const sorted = (Object.entries(instincts) as [Instinct, number][])
    .sort((a, b) => b[1] - a[1]);
  return `${sorted[0][0]}/${sorted[1][0]}`;
}

export function calculateTritype(tritypeScores: ScoreMap['tritype']): string {
  // Find highest in Gut: 8, 9, 1
  const gut = Object.entries(tritypeScores.gut).sort((a, b) => b[1] - a[1])[0][0];
  // Find highest in Heart: 2, 3, 4
  const heart = Object.entries(tritypeScores.heart).sort((a, b) => b[1] - a[1])[0][0];
  // Find highest in Head: 5, 6, 7
  const head = Object.entries(tritypeScores.head).sort((a, b) => b[1] - a[1])[0][0];

  // Output sorted mathematically (e.g. 459, 378, etc.)
  return [gut, heart, head].sort().join('');
}

export function calculateBigFive(bigFive: ScoreMap['bigFive']): BigFiveResult {
  const cap = (val: number) => Math.min(100, Math.max(10, Math.round((val / 20) * 100)));
  const o = cap(bigFive.openness);
  const c = cap(bigFive.conscientiousness);
  const e = cap(bigFive.extraversion);
  const a = cap(bigFive.agreeableness);
  const n = cap(bigFive.neuroticism);

  return {
    openness: { score: o, level: getLevelLabel(o) },
    conscientiousness: { score: c, level: getLevelLabel(c) },
    extraversion: { score: e, level: getLevelLabel(e) },
    agreeableness: { score: a, level: getLevelLabel(a) },
    neuroticism: { score: n, level: getLevelLabel(n) }
  };
}

export function calculateTemperament(temp: ScoreMap['temperament']): { type: TemperamentType; distribution: { name: string; score: number }[] } {
  const total = temp.melancholic + temp.phlegmatic + temp.choleric + temp.sanguine || 1;
  const distribution = [
    { name: 'Melankolis', score: Math.round((temp.melancholic / total) * 100) },
    { name: 'Flegmatis', score: Math.round((temp.phlegmatic / total) * 100) },
    { name: 'Koleris', score: Math.round((temp.choleric / total) * 100) },
    { name: 'Sanguinis', score: Math.round((temp.sanguine / total) * 100) }
  ].sort((a, b) => b.score - a.score);

  return {
    type: distribution[0].name as TemperamentType,
    distribution
  };
}

export function calculateSocionics(mbti: MBTIType): SocionicsType {
  // Simple mapping from MBTI cluster to Socionics equivalents
  const mapping: { [key in MBTIType]: SocionicsType } = {
    INTJ: 'ILI', INFJ: 'IEI', ENTJ: 'LIE', ENFJ: 'EIE',
    INTP: 'LII', INFP: 'EII', ENTP: 'ILE', ENFP: 'IEE',
    ISTJ: 'LSI', ISFJ: 'ESI', ESTJ: 'LSE', ESFJ: 'ESE',
    ISTP: 'SLI', ISFP: 'SEI', ESTP: 'SLE', ESFP: 'SEE'
  };
  return mapping[mbti];
}

export function calculatePsyche(psyche: ScoreMap['psyche']): string {
  const items = [
    { dim: 'V', val: psyche.volition },
    { dim: 'E', val: psyche.emotion },
    { dim: 'L', val: psyche.logic },
    { dim: 'P', val: psyche.physics }
  ].sort((a, b) => b.val - a.val);

  return items.map(item => item.dim).join('');
}

export function calculateMoralAlignment(moral: ScoreMap['moral']): MoralAlignment {
  const lawVsChaotic = moral.lawful - moral.chaotic;
  const goodVsEvil = moral.good - moral.evil;

  let lawLabel: 'Lawful' | 'Neutral' | 'Chaotic' = 'Neutral';
  if (lawVsChaotic > 2) lawLabel = 'Lawful';
  else if (lawVsChaotic < -2) lawLabel = 'Chaotic';

  let goodLabel: 'Good' | 'Neutral' | 'Evil' = 'Neutral';
  if (goodVsEvil > 2) goodLabel = 'Good';
  else if (goodVsEvil < -2) goodLabel = 'Evil';

  if (lawLabel === 'Neutral' && goodLabel === 'Neutral') {
    return 'True Neutral';
  }

  return `${lawLabel} ${goodLabel}` as MoralAlignment;
}

export function calculateFinalResult(answers: UserAnswer[]): TestResult {
  const raw = calculateRawScores(answers);
  
  const mbtiRankings = calculateMBTIMatches(raw.functions, raw.enneagram);
  const primaryMBTI = mbtiRankings[0].type;
  const mbtiConfidence = mbtiRankings[0].score;
  const cognitiveStack = mbtiStacks[primaryMBTI];

  const enneagramRankFull = calculateEnneagram(raw.enneagram);
  const primaryEnneagram = enneagramRankFull[0][0];
  const wing = calculateWing(primaryEnneagram, raw.enneagram);
  const instinctStacking = calculateInstinctStacking(raw.instincts);
  const tritype = calculateTritype(raw.tritype);

  const bigFive = calculateBigFive(raw.bigFive);
  const tempResult = calculateTemperament(raw.temperament);
  const socionics = calculateSocionics(primaryMBTI);
  const attitudinalPsyche = calculatePsyche(raw.psyche);
  const moralAlignment = calculateMoralAlignment(raw.moral);

  // Measure validity audits
  const validityWarnings: string[] = [];
  const biasScore = Math.min(100, Math.round((raw.bias / 15) * 100));
  const stressScore = Math.min(100, Math.round((raw.stress / 15) * 100));

  if (biasScore > 65) {
    validityWarnings.push("Kami mendeteksi kecenderungan tinggi untuk memilih jawaban yang ideal secara sosial (Social Desirability Bias). Beberapa hasil mungkin terasa sedikit bergeser ke arah profil idealmu.");
  }
  if (stressScore > 65) {
    validityWarnings.push("Pola jawabanmu mengindikasikan tingkat kelelahan atau beban emosional yang tinggi (Grip Inferior). Hasil MBTI/Enneagram mungkin mewakili caramu bertahan saat tidak tenang.");
  }

  // Check if there was a close tie-break need
  const gap = mbtiRankings[0].score - mbtiRankings[1].score;
  const tieBreakersUsed = gap < 10;

  return {
    primaryMBTI,
    mbtiConfidence,
    cognitiveStack,
    topMBTIMatches: mbtiRankings.slice(0, 3).map(item => ({
      type: item.type,
      score: item.score,
      reason: item.reason
    })),
    functionRankings: calculateFunctionRanking(raw.functions),
    primaryEnneagram,
    wing,
    instinctStacking,
    tritype,
    enneagramRankings: enneagramRankFull.map(([type, score]) => ({ type, score })),
    bigFive,
    temperament: tempResult.type,
    temperamentDistribution: tempResult.distribution,
    socionics,
    attitudinalPsyche,
    moralAlignment,
    biasScore,
    stressScore,
    validityWarnings,
    tieBreakersUsed,
    notes: gap < 5 ? `Tipe ${mbtiRankings[0].type} sangat berdekatan dengan tipe ${mbtiRankings[1].type}. Amatilah bagaimana kau memproses informasi di bawah tekanan berat.` : "Kalkulasi profil kepribadianmu seimbang dan optimal."
  };
}
