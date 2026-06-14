/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CognitiveFunction = 'Ni' | 'Ne' | 'Si' | 'Se' | 'Fi' | 'Fe' | 'Ti' | 'Te';

export type MBTIType =
  | 'INTJ' | 'INFJ' | 'ENTJ' | 'ENFJ'
  | 'INTP' | 'INFP' | 'ENTP' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type EnneagramType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Instinct = 'sp' | 'sx' | 'so';

export interface BigFiveTrait {
  score: number; // 0 - 100
  level: 'Rendah' | 'Sedang' | 'Tinggi';
}

export interface BigFiveResult {
  openness: BigFiveTrait;
  conscientiousness: BigFiveTrait;
  extraversion: BigFiveTrait;
  agreeableness: BigFiveTrait;
  neuroticism: BigFiveTrait;
}

export type TemperamentType = 'Melankolis' | 'Flegmatis' | 'Koleris' | 'Sanguinis';

export type SocionicsType =
  | 'LII' | 'ILE' | 'ESE' | 'SEI'
  | 'EIE' | 'LSI' | 'SLE' | 'IEI'
  | 'SEE' | 'ILI' | 'LIE' | 'ESI'
  | 'LSE' | 'EII' | 'IEE' | 'SLI';

export interface PsycheResult {
  volition: number;
  emotion: number;
  logic: number;
  physics: number;
}

export type MoralAlignment =
  | 'Lawful Good' | 'Neutral Good' | 'Chaotic Good'
  | 'Lawful Neutral' | 'True Neutral' | 'Chaotic Neutral'
  | 'Lawful Evil' | 'Neutral Evil' | 'Chaotic Evil';

export interface ScoreMap {
  functions: { [key in CognitiveFunction]: number };
  enneagram: { [key in EnneagramType]: number };
  instincts: { [key in Instinct]: number };
  tritype: { gut: { [key: string]: number }; heart: { [key: string]: number }; head: { [key: string]: number } };
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  temperament: {
    melancholic: number;
    phlegmatic: number;
    choleric: number;
    sanguine: number;
  };
  psyche: {
    volition: number;
    emotion: number;
    logic: number;
    physics: number;
  };
  moral: {
    lawful: number;
    neutral_m: number;
    chaotic: number;
    good: number;
    neutral_a: number;
    evil: number;
  };
  stress: number;
  bias: number; // Mengukur kecenderungan memilih "diri ideal"
}

export interface AnswerOption {
  text: string;
  primarySignal: CognitiveFunction | string;
  secondarySignal?: string;
  antiTieSignal?: string;
  interpretationTag?: string;
  evidenceText?: string;
  possibleBias?: boolean;
  stressClue?: boolean;
  scores: {
    functions?: { [key in CognitiveFunction]?: number };
    enneagram?: { [key in EnneagramType]?: number };
    instincts?: { [key in Instinct]?: number };
    bigFive?: {
      openness?: number;
      conscientiousness?: number;
      extraversion?: number;
      agreeableness?: number;
      neuroticism?: number;
    };
    temperament?: {
      melancholic?: number;
      phlegmatic?: number;
      choleric?: number;
      sanguine?: number;
    };
    psyche?: {
      volition?: number;
      emotion?: number;
      logic?: number;
      physics?: number;
    };
    moral?: {
      lawful?: number;
      chaotic?: number;
      good?: number;
      evil?: number;
    };
  };
}

export interface Question {
  id: string;
  phase: 'main' | 'tie-break';
  target: string;
  tieBreakerFor?: string[]; // Membantu memecah jenis tipe yang seri, e.g. ["INFJ", "INFP"]
  contextType: string;
  pressureType: string;
  text: string;
  reminder?: string;
  options: AnswerOption[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number;
  skipped: boolean;
}

export interface TestResult {
  primaryMBTI: MBTIType;
  mbtiConfidence: number; // 0 - 100
  cognitiveStack: CognitiveFunction[]; // e.g. ['Ni', 'Te', 'Fi', 'Se']
  topMBTIMatches: { type: MBTIType; score: number; reason: string }[];
  functionRankings: { name: CognitiveFunction; score: number; level: string; desc: string }[];
  
  primaryEnneagram: EnneagramType;
  wing: string; // e.g. "4w5" atau "5w4"
  instinctStacking: string; // e.g. "sp/sx"
  tritype: string; // e.g. "459"
  enneagramRankings: { type: EnneagramType; score: number }[];
  
  bigFive: BigFiveResult;
  temperament: TemperamentType;
  temperamentDistribution: { name: string; score: number }[];
  socionics: SocionicsType;
  attitudinalPsyche: string; // e.g. "VELP"
  moralAlignment: MoralAlignment;
  
  biasScore: number; // 0 - 100
  stressScore: number; // 0 - 100
  validityWarnings: string[];
  
  tieBreakersUsed: boolean;
  notes: string;
}
