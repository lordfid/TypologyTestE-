/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MBTIType } from '../types';

export interface RelationMatch {
  bestFriends: MBTIType[];
  partners: MBTIType[];
  coworkers: MBTIType[];
  opposites: MBTIType[];
  challenging: MBTIType[];
}

export const relationshipGuide: { [key in MBTIType]: RelationMatch } = {
  INTJ: {
    bestFriends: ['INTP', 'INFJ', 'ENTJ'],
    partners: ['ENFP', 'ENTP'],
    coworkers: ['ESTJ', 'ISTJ', 'ENTJ'],
    opposites: ['ESFP', 'ISFP'],
    challenging: ['ESFJ', 'ISFJ']
  },
  INFJ: {
    bestFriends: ['INTJ', 'INFP', 'ENFJ'],
    partners: ['ENTP', 'ENFP'],
    coworkers: ['ENFJ', 'INFJ', 'INTJ'],
    opposites: ['ESTP', 'ISTP'],
    challenging: ['ESTJ', 'ESFJ']
  },
  ENTJ: {
    bestFriends: ['INTJ', 'ENTP', 'ESTJ'],
    partners: ['INFP', 'INTP'],
    coworkers: ['ENTJ', 'INTJ', 'ESTJ'],
    opposites: ['ISFP', 'ESFP'],
    challenging: ['ISFJ']
  },
  ENFJ: {
    bestFriends: ['INFJ', 'ENFP', 'ESFJ'],
    partners: ['INFP', 'ISFP'],
    coworkers: ['ENFJ', 'INFJ', 'ENTJ'],
    opposites: ['ISTP', 'ESTP'],
    challenging: ['ISTJ', 'ESTJ']
  },
  INTP: {
    bestFriends: ['INTJ', 'ENTP', 'INFJ'],
    partners: ['ENTJ', 'ENFJ'],
    coworkers: ['INTP', 'ISTP', 'INTJ'],
    opposites: ['ESFJ', 'ISFJ'],
    challenging: ['ESFP', 'ESTP']
  },
  INFP: {
    bestFriends: ['INFJ', 'ENFP', 'INFP'],
    partners: ['ENFJ', 'ENTJ'],
    coworkers: ['INFP', 'INFJ', 'ISFP'],
    opposites: ['ESTJ', 'ISTJ'],
    challenging: ['ESTP', 'ESFP']
  },
  ENTP: {
    bestFriends: ['INTP', 'ENFP', 'ENTJ'],
    partners: ['INFJ', 'INTJ'],
    coworkers: ['ENTP', 'INTP', 'ESTP'],
    opposites: ['ISFJ', 'ISTJ'],
    challenging: ['ISFP', 'ESFP']
  },
  ENFP: {
    bestFriends: ['INFP', 'ENTP', 'ENFJ'],
    partners: ['INFJ', 'INTJ'],
    coworkers: ['ENFP', 'ESFP', 'ESTP'],
    opposites: ['ISTJ', 'ESTJ'],
    challenging: ['ISTP', 'ISFP']
  },
  ISTJ: {
    bestFriends: ['ISFJ', 'ESTJ', 'INTJ'],
    partners: ['ESFP', 'ISFP'],
    coworkers: ['ISTJ', 'ESTJ', 'INTJ'],
    opposites: ['ENFP', 'INFP'],
    challenging: ['ENFJ', 'ENTJ']
  },
  ISFJ: {
    bestFriends: ['ISTJ', 'ESFJ', 'INFJ'],
    partners: ['ESTP', 'ESFP'],
    coworkers: ['ISFJ', 'ISTJ', 'ESFJ'],
    opposites: ['ENTP', 'INTP'],
    challenging: ['ENTJ', 'ENFJ']
  },
  ESTJ: {
    bestFriends: ['ISTJ', 'ENTJ', 'ESTJ'],
    partners: ['ISFP', 'INFP'],
    coworkers: ['ESTJ', 'ISTJ', 'ENTJ'],
    opposites: ['ENFP', 'INFP'],
    challenging: ['INFJ', 'ISFP']
  },
  ESFJ: {
    bestFriends: ['ISFJ', 'ENFJ', 'ESFJ'],
    partners: ['ISFP', 'ISTP'],
    coworkers: ['ESFJ', 'ISFJ', 'ESTJ'],
    opposites: ['INTP', 'ENTP'],
    challenging: ['INTJ', 'INFJ']
  },
  ISTP: {
    bestFriends: ['ISTP', 'ESTP', 'INTP'],
    partners: ['ESFJ', 'ESTJ'],
    coworkers: ['ISTP', 'ESTP', 'ENTJ'],
    opposites: ['ENFJ', 'INFJ'],
    challenging: ['ENFP', 'INFP']
  },
  ISFP: {
    bestFriends: ['ISFP', 'ESFP', 'INFP'],
    partners: ['ESFJ', 'ESTJ'],
    coworkers: ['ISFP', 'ESFP', 'ISTP'],
    opposites: ['ENTJ', 'INTJ'],
    challenging: ['ENTP', 'ENFP']
  },
  ESTP: {
    bestFriends: ['ESTP', 'ISTP', 'ESFP'],
    partners: ['ISFJ', 'INFJ'],
    coworkers: ['ESTP', 'ISTP', 'ESTJ'],
    opposites: ['INFJ', 'ENFJ'],
    challenging: ['INTP', 'INFP']
  },
  ESFP: {
    bestFriends: ['ESFP', 'ISFP', 'ESTP'],
    partners: ['ISFJ', 'ISTJ'],
    coworkers: ['ESFP', 'ISFP', 'ESTP'],
    opposites: ['INTJ', 'ENTJ'],
    challenging: ['INTP', 'INFP']
  }
};

export const relationshipCaveat =
  "Catatan Penting: Indeks kecocokan di atas didasarkan pada keselarasan arsitektur fungsi kognitif bawaan. Ingatlah bahwa dalam kenyataan hidup sehari-hari, kecocokan sejati bukan aturan mutlak atau sihir instan. Kedewasaan moral batin, komitmen tulus, kerelaan mendengarkan tanpa menghakimi, dan komunikasi dua arah yang sehat adalah lem perekat relasi yang jauh lebih menentukan keberhasilan hidup bersama dibandingkan sekadar label tipologi kepribadian.";
