/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MBTIType } from '../types';

export interface ArchetypeMediaItem {
  characters: string[];
  song: {
    title: string;
    artist: string;
    mood: string;
  };
}

export const archetypeMedia: { [key in MBTIType]: ArchetypeMediaItem } = {
  INTJ: {
    characters: ["Bruce Wayne (Batman)", "Walter White (Breaking Bad)", "Sherlock Holmes (Yennefer ver.)", "Lelouch vi Britannia"],
    song: {
      title: "Atmosphere",
      artist: "Joy Division",
      mood: "Hening, dingin, mendalam, berbalut konsentrasi batin yang tajam dan megah."
    }
  },
  INFJ: {
    characters: ["Albus Dumbledore", "Itachi Uchiha", "Galadriel (Lord of the Rings)", "Remus Lupin"],
    song: {
      title: "Saturn",
      artist: "Sleeping At Last",
      mood: "Melodi sayu yang teduh, menyuarakan rasa duka kemanusiaan dan pencarian arti hidup mendalam."
    }
  },
  ENTJ: {
    characters: ["Tony Stark (Beberapa versi)", "Erwin Smith (Attack on Titan)", "Miranda Priestly", "Thomas Shelby"],
    song: {
      title: "Everybody Wants to Rule the World",
      artist: "Tears for Fears",
      mood: "Energetik, berwibawa, berirama tegas dengan dorongan ambisi kepemimpinan struktural."
    }
  },
  ENFJ: {
    characters: ["Charles Xavier (Professor X)", "Uncle Iroh", "Mufasa", "Tanja Demidova"],
    song: {
      title: "Fix You",
      artist: "Coldplay",
      mood: "Hangat, mengalun pas mendorong kesembuhan batin, menginspirasi bangkitnya persaudaraan sosial."
    }
  },
  INTP: {
    characters: ["Neo (The Matrix)", "L (Death Note)", "Sherlock Holmes", "Dr. Manhattan"],
    song: {
      title: "Space Oddity",
      artist: "David Bowie",
      mood: "Mengambang tenang di kesendirian semesta batin, terputus dari dunia fisik luar demi teori orisinal."
    }
  },
  INFP: {
    characters: ["Frodo Baggins", "Arthur Fleck (Joker - masa awal)", "Luna Lovegood", "Peter Parker (Spider-Man)"],
    song: {
      title: "Creep",
      artist: "Radiohead",
      mood: "Melankolis, otentik, menyuarakan rasa berbeda dan duka batin personal yang halus."
    }
  },
  ENTP: {
    characters: ["The Joker (Beberapa versi)", "Jack Sparrow", "Rick Sanchez", "Tony Stark (Iron Man)"],
    song: {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      mood: "Bercabang luas secara teatrikal, meloncat-loncat dari nada canda nakal hingga keputusasaan buntu."
    }
  },
  ENFP: {
    characters: ["Willy Wonka", "Aang (Avatar)", "Michael Scott", "Naruto Uzumaki"],
    song: {
      title: "Dog Days Are Over",
      artist: "Florence + The Machine",
      mood: "Sukaria yang meledak-ledak penuh harapan, mengajak jiwa bebas berlari lepas tak terbatas."
    }
  },
  ISTJ: {
    characters: ["Ned Stark", "Hermione Granger", "Agent Smith", "Mikasa Ackerman"],
    song: {
      title: "The Sound of Silence",
      artist: "Simon & Garfunkel",
      mood: "Tertib, tenang, memproses fakta historis secara teguh dalam kesetiaan hening."
    }
  },
  ISFJ: {
    characters: ["Samwise Gamgee", "Cinderella", "Steve Rogers (Captain America)", "Arthur Dent"],
    song: {
      title: "Home",
      artist: "Edward Sharpe & The Magnetic Zeros",
      mood: "Kekeluargaan hangat yang aman, melindungi kenyamanan harian tempat bernaung relasi."
    }
  },
  ESTJ: {
    characters: ["Hermione Granger (ver. awal)", "Minerva McGonagall", "Dwight Schrute", "Boromir"],
    song: {
      title: "Eye of the Tiger",
      artist: "Survivor",
      mood: "Disiplin kerja keras berlatih fisik secara konsisten, berfokus mencetak hasil tanpa kompromi."
    }
  },
  ESFJ: {
    characters: ["SpongeBob SquarePants (ver. sosial)", "Monica Geller", "Joy (Inside Out)", "Leslie Knope"],
    song: {
      title: "Lean on Me",
      artist: "Bill Withers",
      mood: "Penuh semangat persahabatan, menyebar jaminan bahwa bantuan ramah selalu tersedia bagi sesama."
    }
  },
  ISTP: {
    characters: ["James Bond", "John Wick", "Levi Ackerman", "Han Solo"],
    song: {
      title: "Voodoo Child (Slight Return)",
      artist: "Jimi Hendrix",
      mood: "Spontan liar namun terkontrol halus, penuh improvisasi taktis operasional yang lincah."
    }
  },
  ISFP: {
    characters: ["Harry Potter", "Eleven (Stranger Things)", "Eren Yeager (awal)", "Legolas"],
    song: {
      title: "Video Games",
      artist: "Lana Del Rey",
      mood: "Gaya estetika yang sayu bertabur keindahan rindu melankolis privat yang autentik."
    }
  },
  ESTP: {
    characters: ["Thor (MCU)", "Jordan Belfort", "Tyler Durden", "Saul Goodman"],
    song: {
      title: "Rockstar",
      artist: "Post Malone",
      mood: "Aura lincah bergelimang kepuasan fisik masa kini, berani menerobos rintangan operasional."
    }
  },
  ESFP: {
    characters: ["Simba (Lion King)", "Harley Quinn", "Penny (The Big Bang Theory)", "Ron Weasley"],
    song: {
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      mood: "Penuh stimulasi riang gembira di bawah sorot lampu, mengajak seluruh raga berdansa spontan."
    }
  }
};

export const mediaDisclaimer =
  "Inspirasi Komunitas: Harap dicatat bahwa hubungan karakter fiksi dengan tipe kepribadian di atas hanyalah rujukan spekulatif yang dihimpun dari komunitas tipologi populer seperti Personality Database (PDB). Ini bukan klaim ilmiah atau kebenaran resmi dari kreator karakter, melainkan alat bantu imajinatif untuk menangkap suasana (vibe) dari arsitektur fungsi kognitif yang bersangkutan.";
