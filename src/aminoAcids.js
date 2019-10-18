'use strict';

// SOURCE: https://en.wikipedia.org/wiki/Amino_acid
// Link for UTF8 code for modified: https://codepoints.net/search?sc=Grek
module.exports = [
  // Standard amino acids
  {
    name: 'Alanine',
    aa3: 'Ala',
    aa1: 'A',
    modified: 'α',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.33,
    pKaN: 9.71
  },
  {
    name: 'Arginine',
    aa3: 'Arg',
    aa1: 'R',
    modified: 'ρ',
    sc: {
      type: 'positive',
      pKa: 12.1
    },
    pKaC: 2.03,
    pKaN: 9.0
  },
  {
    name: 'Asparagine',
    aa3: 'Asn',
    aa1: 'N',
    modified: 'η',
    sc: {
      type: 'polar'
    },
    pKaC: 2.13,
    pKaN: 9.05
  },
  {
    name: 'Aspartic acid',
    aa3: 'Asp',
    aa1: 'D',
    modified: 'δ',
    sc: {
      type: 'negative',
      pKa: 3.71
    },
    pKaC: 1.95,
    pKaN: 9.66
  },
  {
    name: 'Cysteine',
    aa3: 'Cys',
    aa1: 'C',
    modified: 'ς',
    sc: {
      type: 'special',
      pKa: 8.14
    },
    pKaC: 1.91,
    pKaN: 10.28
  },
  {
    name: 'Glutamic acid',
    aa3: 'Glu',
    aa1: 'E',
    modified: 'ε',
    sc: {
      type: 'negative',
      pKa: 4.15
    },
    pKaC: 2.16,
    pKaN: 9.58
  },
  {
    name: 'Glutamine',
    aa3: 'Gln',
    aa1: 'Q',
    modified: 'ξ',
    sc: {
      type: 'polar'
    },
    pKaC: 2.18,
    pKaN: 9.0
  },
  {
    name: 'Glycine',
    aa3: 'Gly',
    aa1: 'G',
    modified: 'γ',
    sc: {
      type: 'special'
    },
    pKaC: 2.34,
    pKaN: 9.58
  },
  {
    name: 'Histidine',
    aa3: 'His',
    aa1: 'H',
    modified: 'ζ',
    sc: {
      type: 'positive',
      pKa: 6.04
    },
    pKaC: 1.7,
    pKaN: 9.09
  },
  {
    name: 'Isoleucine',
    aa3: 'Ile',
    aa1: 'I',
    modified: 'ι',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.26,
    pKaN: 9.6
  },
  {
    name: 'Leucine',
    aa3: 'Leu',
    aa1: 'L',
    modified: 'λ',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.32,
    pKaN: 9.58
  },
  {
    name: 'Lysine',
    aa3: 'Lys',
    aa1: 'K',
    modified: 'κ',
    sc: {
      type: 'positive',
      pKa: 10.67
    },
    pKaC: 2.15,
    pKaN: 9.16
  },
  {
    name: 'Methionine',
    aa3: 'Met',
    aa1: 'M',
    modified: 'μ',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.16,
    pKaN: 9.08
  },
  {
    name: 'Phenylalanine',
    aa3: 'Phe',
    aa1: 'F',
    modified: 'φ',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.18,
    pKaN: 9.09
  },
  {
    name: 'Proline',
    aa3: 'Pro',
    aa1: 'P',
    modified: 'π',
    sc: {
      type: 'special'
    },
    pKaC: 1.95,
    pKaN: 10.47
  },
  {
    name: 'Serine',
    aa3: 'Ser',
    aa1: 'S',
    modified: 'σ',
    sc: {
      type: 'polar'
    },
    pKaC: 2.13,
    pKaN: 9.05
  },
  {
    name: 'Threonine',
    aa3: 'Thr',
    aa1: 'T',
    modified: 'τ',
    sc: {
      type: 'polar'
    },
    pKaC: 2.2,
    pKaN: 8.96
  },
  {
    name: 'Tryptophan',
    aa3: 'Trp',
    aa1: 'W',
    modified: 'ω',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.38,
    pKaN: 9.34
  },
  {
    name: 'Tyrosine',
    aa3: 'Tyr',
    aa1: 'Y',
    modified: 'ψ',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.24,
    pKaN: 9.04
  },
  {
    name: 'Valine',
    aa3: 'Val',
    aa1: 'V',
    modified: 'ν',
    sc: {
      type: 'hydrophobic'
    },
    pKaC: 2.27,
    pKaN: 9.52
  },
  // Additional
  {
    name: 'Selenocysteine',
    aa3: 'Sec',
    aa1: 'U'
  },
  {
    name: 'Pyrrolysine',
    aa3: 'Pyl',
    aa1: 'O'
  },
  // Ambiguous
  {
    name: 'Asparagine or aspartic acid',
    aa3: 'Asx',
    aa1: 'B'
  },
  {
    name: 'Glutamine or glutamic acid',
    aa3: 'Glx',
    aa1: 'Z'
  },
  {
    name: 'Leucine or isoleucine',
    aa3: 'Xle',
    aa1: 'J'
  },
  {
    name: 'Unspecified or unknown',
    aa3: 'Xaa',
    aa1: 'X'
  }
];
