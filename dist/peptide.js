/**
 * peptide - Peptide
 * @version v1.10.1
 * @link https://github.com/cheminfo-js/peptide
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Peptide"] = factory();
	else
		root["Peptide"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // SOURCE: https://en.wikipedia.org/wiki/Amino_acid
// Link for UTF8 code for modified: https://codepoints.net/search?sc=Grek

module.exports = [// Standard amino acids
{
  name: 'Alanine',
  aa3: 'Ala',
  aa1: 'A',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.33,
  pKaN: 9.71
}, {
  name: 'Arginine',
  aa3: 'Arg',
  aa1: 'R',
  sc: {
    type: 'positive',
    pKa: 12.1
  },
  pKaC: 2.03,
  pKaN: 9.0
}, {
  name: 'Asparagine',
  aa3: 'Asn',
  aa1: 'N',
  sc: {
    type: 'polar'
  },
  pKaC: 2.13,
  pKaN: 9.05
}, {
  name: 'Aspartic acid',
  aa3: 'Asp',
  aa1: 'D',
  sc: {
    type: 'negative',
    pKa: 3.71
  },
  pKaC: 1.95,
  pKaN: 9.66
}, {
  name: 'Cysteine',
  aa3: 'Cys',
  aa1: 'C',
  sc: {
    type: 'special',
    pKa: 8.14
  },
  pKaC: 1.91,
  pKaN: 10.28
}, {
  name: 'Glutamic acid',
  aa3: 'Glu',
  aa1: 'E',
  sc: {
    type: 'negative',
    pKa: 4.15
  },
  pKaC: 2.16,
  pKaN: 9.58
}, {
  name: 'Glutamine',
  aa3: 'Gln',
  aa1: 'Q',
  sc: {
    type: 'polar'
  },
  pKaC: 2.18,
  pKaN: 9.0
}, {
  name: 'Glycine',
  aa3: 'Gly',
  aa1: 'G',
  sc: {
    type: 'special'
  },
  pKaC: 2.34,
  pKaN: 9.58
}, {
  name: 'Histidine',
  aa3: 'His',
  aa1: 'H',
  sc: {
    type: 'positive',
    pKa: 6.04
  },
  pKaC: 1.7,
  pKaN: 9.09
}, {
  name: 'Isoleucine',
  aa3: 'Ile',
  aa1: 'I',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.26,
  pKaN: 9.6
}, {
  name: 'Leucine',
  aa3: 'Leu',
  aa1: 'L',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.32,
  pKaN: 9.58
}, {
  name: 'Lysine',
  aa3: 'Lys',
  aa1: 'K',
  sc: {
    type: 'positive',
    pKa: 10.67
  },
  pKaC: 2.15,
  pKaN: 9.16
}, {
  name: 'Methionine',
  aa3: 'Met',
  aa1: 'M',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.16,
  pKaN: 9.08
}, {
  name: 'Phenylalanine',
  aa3: 'Phe',
  aa1: 'F',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.18,
  pKaN: 9.09
}, {
  name: 'Proline',
  aa3: 'Pro',
  aa1: 'P',
  sc: {
    type: 'special'
  },
  pKaC: 1.95,
  pKaN: 10.47
}, {
  name: 'Serine',
  aa3: 'Ser',
  aa1: 'S',
  sc: {
    type: 'polar'
  },
  pKaC: 2.13,
  pKaN: 9.05
}, {
  name: 'Threonine',
  aa3: 'Thr',
  aa1: 'T',
  sc: {
    type: 'polar'
  },
  pKaC: 2.2,
  pKaN: 8.96
}, {
  name: 'Tryptophan',
  aa3: 'Trp',
  aa1: 'W',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.38,
  pKaN: 9.34
}, {
  name: 'Tyrosine',
  aa3: 'Tyr',
  aa1: 'Y',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.24,
  pKaN: 9.04
}, {
  name: 'Valine',
  aa3: 'Val',
  aa1: 'V',
  sc: {
    type: 'hydrophobic'
  },
  pKaC: 2.27,
  pKaN: 9.52
}, // Additional
{
  name: 'Selenocysteine',
  aa3: 'Sec',
  aa1: 'U'
}, {
  name: 'Pyrrolysine',
  aa3: 'Pyl',
  aa1: 'O'
}, // Ambiguous
{
  name: 'Asparagine or aspartic acid',
  aa3: 'Asx',
  aa1: 'B'
}, {
  name: 'Glutamine or glutamic acid',
  aa3: 'Glx',
  aa1: 'Z'
}, {
  name: 'Leucine or isoleucine',
  aa3: 'Xle',
  aa1: 'J'
}, {
  name: 'Unspecified or unknown',
  aa3: 'Xaa',
  aa1: 'X'
}];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const aa = __webpack_require__(0);

const IEP = __webpack_require__(2);

const chargePeptide = __webpack_require__(3);

const allowNeutralLoss = __webpack_require__(5);

const splitPeptide = __webpack_require__(6);

const digestPeptide = __webpack_require__(7);

const generatePeptideFragments = __webpack_require__(8);

const convertAASequence = __webpack_require__(9);

exports.getInfo = function () {
  return aa;
}; // sequence should be in the "right" format like HAlaGlyProOH


exports.splitPeptide = splitPeptide;
exports.digestPeptide = digestPeptide;

exports.calculateIEP = function (sequence) {
  let aas = splitPeptide(sequence);
  let result = IEP.calculateIEP(aas);
  return result;
};

exports.calculateIEPChart = function (sequence) {
  let aas = splitPeptide(sequence);
  let result = IEP.calculateChart(aas);
  return result;
};

exports.getColorForIEP = function (iep) {
  return IEP.getColor(iep);
};

exports.calculateCharge = function (sequence, ph) {
  let aas = splitPeptide(sequence);
  return IEP.calculateCharge(aas, ph);
};

exports.generatePeptideFragments = generatePeptideFragments;
exports.chargePeptide = chargePeptide;
exports.allowNeutralLoss = allowNeutralLoss;
exports.convertAASequence = convertAASequence;
exports.sequenceToMF = convertAASequence;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let aa = __webpack_require__(0); // we will convert the data to an object to be much faster


let aaObject = {};

for (let i = 0; i < aa.length; i++) {
  aaObject[aa[i].aa3] = aa[i];
}

function calculateCharge(aas, pH) {
  if (!pH) pH = 7.0;
  let combined = combine(aas);
  if (!combined) return;
  let charge = calculateForPh(combined, pH);
  return Math.round(charge * 1000) / 1000;
} // this methods required an array of aas


function calculateIEP(aas) {
  let combined = combine(aas);
  if (!combined) return;
  let first = 0;
  let last = 14;
  let current = 14;
  let previous = 0;
  let currentCharge;

  while (Math.abs(current - previous) > 0.0001) {
    previous = current;
    current = (last + first) / 2;
    currentCharge = calculateForPh(combined, current);

    if (currentCharge > 0) {
      first = current;
    } else if (currentCharge < 0) {
      last = current;
    } else {
      previous = current;
    }
  }

  return Math.round(current * 1000) / 1000;
}

function calculateChart(aas) {
  let combined = combine(aas);
  if (!combined) return;
  let y = [];
  let x = [];
  let yAbs = [];

  for (let i = 0; i <= 14; i = i + 0.01) {
    let charge = calculateForPh(combined, i);
    x.push(i);
    y.push(charge);
    yAbs.push(Math.abs(charge));
  }

  combined.x = x;
  combined.y = y;
  combined.yAbs = yAbs;
  return combined;
}

function calculateForPh(combined, pH) {
  let total = 0;
  total += 1 / (1 + Math.pow(10, pH - combined.first));
  total += -1 / (1 + Math.pow(10, combined.last - pH));

  for (let key in combined.acid) {
    total += -combined.acid[key] / (1 + Math.pow(10, aaObject[key].sc.pKa - pH));
  }

  for (let key in combined.basic) {
    total += combined.basic[key] / (1 + Math.pow(10, pH - aaObject[key].sc.pKa));
  }

  return total;
} // we will combine the amino acids


function combine(aas) {
  let combined = {};

  if (aaObject[aas[0]]) {
    combined.first = aaObject[aas[0]].pKaN;
  } else {
    return;
  }

  if (aaObject[aas[aas.length - 1]]) {
    combined.last = aaObject[aas[aas.length - 1]].pKaC;
  } else {
    return;
  }

  combined.basic = {};
  combined.acid = {};

  for (let i = 0; i < aas.length; i++) {
    let aa = aas[i];
    if (!aaObject[aa]) return;

    if (aaObject[aa].sc && aaObject[aa].sc.type) {
      if (aaObject[aa].sc.type === 'positive') {
        if (!combined.basic[aa]) {
          combined.basic[aa] = 0;
        }

        combined.basic[aa]++;
      } else if (aaObject[aa].sc.type === 'negative') {
        if (!combined.acid[aa]) {
          combined.acid[aa] = 0;
        }

        combined.acid[aa]++;
      }
    }
  }

  return combined;
}
/*
 We can generate a color based on iep
 0 -> 7 means that at pH 7 it is charged negatively (blue)
 7 -> 14 means that at pH7 it is charged positively (red)
 */


function getColor(iep) {
  if (iep < 7) {
    if (iep < 3) iep = 3;
    let white = Math.round(255 - (7 - iep) * (200 / 4));
    return "rgb(".concat(white, ",").concat(white, ",255)");
  } else if (iep > 7) {
    if (iep > 11) iep = 11;
    let white = Math.round(255 - (iep - 7) * (200 / 4));
    return "rgb(255,".concat(white, ",").concat(white, ")");
  }

  return 'rgb(255,255,255)';
}

module.exports = {
  calculateIEP: calculateIEP,
  calculateCharge: calculateCharge,
  calculateChart: calculateChart,
  getColor: getColor
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let getAA = __webpack_require__(4); // SOURCE: https://en.wikipedia.org/wiki/Amino_acid


function chargePeptide(mf) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (options.pH === undefined) options.pH = 0;

  if (Array.isArray(mf)) {
    for (let i = 0; i < mf.length; i++) {
      mf[i] = chargeOnePeptide(mf[i], options);
    }

    return mf;
  } else {
    return chargeOnePeptide(mf, options);
  }
}

function chargeOnePeptide(mf, options) {
  let pH = options.pH; // we will allow to charge the peptide at a specific pH
  // first amino acids (N-terminal)

  if (mf.match(/^H[A-Z][a-z]{2}/)) {
    let firstAA = mf.replace(/^H([A-Z][a-z]{2}).*/, '$1');

    if (getAA(firstAA) && pH < getAA(firstAA).pKaN) {
      mf = mf.replace(/^H([^+])/, 'H+H$1');
    }
  } // last amino acids (C-terminal)


  if (mf.match(/[A-Z][a-z]{2}OH$/)) {
    let lastAA = mf.replace(/.*([A-Z][a-z]{2})OH$/, '$1');

    if (getAA(lastAA) && pH > getAA(lastAA).pKaC) {
      mf = mf.replace(/OH$/, 'O-');
    }
  } // basic AA


  if (pH < getAA('Arg').sc.pKa) mf = mf.replace(/(Arg)(?!\()/g, '$1(H+)');
  if (pH < getAA('His').sc.pKa) mf = mf.replace(/(His)(?!\()/g, '$1(H+)');
  if (pH < getAA('Lys').sc.pKa) mf = mf.replace(/(Lys)(?!\()/g, '$1(H+)'); // acid AA

  if (pH > getAA('Asp').sc.pKa) mf = mf.replace(/(Asp)(?!\()/g, '$1(H-1-)');
  if (pH > getAA('Glu').sc.pKa) mf = mf.replace(/(Glu)(?!\()/g, '$1(H-1-)');
  if (pH > getAA('Cys').sc.pKa) mf = mf.replace(/(Cys)(?!\()/g, '$1(H-1-)');
  return mf;
}

module.exports = chargePeptide;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let aa = __webpack_require__(0);

function getAA(code) {
  if (code.length === 1) {
    for (let i = 0; i < aa.length; i++) {
      if (aa[i].aa1 === code) {
        return aa[i];
      }
    }
  }

  if (code.length === 3) {
    for (let i = 0; i < aa.length; i++) {
      if (aa[i].aa3 === code) {
        return aa[i];
      }
    }
  }
}

module.exports = getAA;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function allowNeutralLoss(mf, options) {
  if (Array.isArray(mf)) {
    for (let i = 0; i < mf.length; i++) {
      mf[i] = allowOneNeutralLoss(mf[i], options);
    }

    return mf;
  } else {
    return allowOneNeutralLoss(mf, options);
  }
}

function allowOneNeutralLoss(mf) {
  mf = mf.replace(/(Ser|Thr|Asp|Glu)(?!\()/g, '$1(H-2O-1)0-1');
  mf = mf.replace(/(Arg|Lys|Asn|Gln)(?!\()/g, '$1(N-1H-3)0-1');
  return mf;
}

module.exports = allowNeutralLoss;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function splitSequence(sequence) {
  let aas = sequence.replace(/([A-Z])/g, ' $1').split(/ /);
  let begin = 0;

  while (aas[begin] === '' || aas[begin] === 'H') {
    begin++;
  }

  let end = aas.length - 1;

  while (aas[end] === 'O' || aas[end] === 'H') {
    end--;
  }

  aas = aas.slice(begin, end + 1);
  return aas;
}

module.exports = splitSequence;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Iotuibs:
* minMissed (default: 0)
* maxMissed (default: 0)
* minResidue: 0;
* maxResidue: infinity
* enzyme: chymotrypsin, trypsin, glucph4, glucph8, thermolysin, cyanogenbromide : Mandatory, no default value !
 */

function digestSequence(sequence) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  sequence = sequence.replace(/^H([^a-z])/, '$1').replace(/OH$/, '');
  options.enzyme = options.enzyme || 'trypsin';
  if (options.minMissed === undefined) options.minMissed = 0;
  if (options.maxMissed === undefined) options.maxMissed = 0;
  if (options.minResidue === undefined) options.minResidue = 0;
  if (options.maxResidue === undefined) options.maxResidue = Number.MAX_VALUE;
  let regexp = getRegexp(options.enzyme);
  let fragments = sequence.replace(regexp, '$1 ').split(/ /).filter(entry => entry);
  let from = 0;

  for (let i = 0; i < fragments.length; i++) {
    let nbResidue = fragments[i].replace(/([A-Z][a-z][a-z])/g, ' $1').split(/ /).filter(entry => entry).length;
    fragments[i] = {
      sequence: fragments[i],
      nbResidue: nbResidue,
      from: from,
      to: from + nbResidue - 1
    };
    from += nbResidue;
  }

  let results = [];

  for (let i = 0; i < fragments.length - options.minMissed; i++) {
    for (let j = options.minMissed; j <= Math.min(options.maxMissed, fragments.length - i - 1); j++) {
      let fragment = '';
      let nbResidue = 0;

      for (let k = i; k <= i + j; k++) {
        fragment += fragments[k].sequence;
        nbResidue += fragments[k].nbResidue;
      }

      let from = fragments[i].from + 1;
      let to = fragments[i + j].to + 1;

      if (fragment && nbResidue >= options.minResidue && nbResidue <= options.maxResidue) {
        results.push("H".concat(fragment, "OH$D").concat(from, ">").concat(to));
      }
    }
  }

  return results;
}

function getRegexp(enzyme) {
  switch (enzyme.toLowerCase().replace(/[^a-z0-9]/g, '')) {
    case 'chymotrypsin':
      return /(Phe|Tyr|Trp)(?!Pro)/g;

    case 'trypsin':
      return /(Lys|Arg)(?!Pro)/g;

    case 'lysc':
      return /(Lys)(?!Pro)/g;

    case 'glucph4':
      return /(Glu)(?!Pro|Glu)/g;

    case 'glucph8':
      return /(Asp|Glu)(?!Pro|Glu)/g;

    case 'thermolysin':
      // N-term of  Leu, Phe, Val, Ile, Ala, Met
      return /()(?=Ile|Leu|Val|Ala|Met|Phe)/g;

    case 'cyanogenbromide':
      return /(Met)/g;

    case 'any':
      return /()(?=[A-Z][a-z][a-z])/g;

    default:
      throw new Error("Digestion enzyme: ".concat(enzyme, " is unknown"));
  }
}

module.exports = digestSequence;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (mf, options) {
  if (options === undefined) {
    options = {
      a: false,
      b: true,
      c: false,
      x: false,
      y: true,
      z: false,
      i: false,
      ya: false,
      yb: false,
      yc: false,
      zc: false
    };
  }

  options.maxInternal = options.maxInternal || Number.MAX_VALUE;
  options.minInternal = options.minInternal || 0;
  let mfs = []; // need to allow 0-9 to deal with neutral loss

  let mfparts = mf.replace(/([a-z)0-9])([A-Z][a-z](?=[a-z]))/g, '$1 $2').split(/ /);
  let nTerm = '';
  let cTerm = '';

  if (mfparts[0].startsWith('(')) {
    nTerm += mfparts[0];
    mfparts = mfparts.splice(1);
  }

  if (mfparts[mfparts.length - 1].includes('(')) {
    cTerm += mfparts[mfparts.length - 1].replace(/^[^()]*/, '');
    mfparts[mfparts.length - 1] = mfparts[mfparts.length - 1].replace(/\(.*/, '');
  }

  for (let i = 1; i < mfparts.length; i++) {
    nTerm += mfparts[i - 1];
    cTerm = mfparts[mfparts.length - i] + cTerm;
    addNTerm(mfs, nTerm, i, options);
    addCTerm(mfs, cTerm, i, options);
    if (options.i) mfs.push("".concat(mfparts[i], "HC-1O-1(+1)$i:").concat(mfparts[i]));

    if (options.ya || options.yb || options.yc || options.zc) {
      // we have double fragmentations
      for (let j = i + 1; j < Math.min(mfparts.length, options.maxInternal + i + 1); j++) {
        let iTerm = '';

        if (j - i >= options.minInternal) {
          for (let k = i; k < j; k++) {
            iTerm += mfparts[k];
          }

          addITerm(mfs, iTerm, mfparts.length - i, j, options);
        }
      }
    }
  }

  if (mfs.length === 0) {
    mfs = mfs.concat([mf]);
  }

  return mfs;
};

function addNTerm(mfs, nTerm, i, options) {
  if (options.a) mfs.push("".concat(nTerm, "C-1O-1(+1)$a").concat(i));
  if (options.b) mfs.push("".concat(nTerm, "(+1)$b").concat(i));
  if (options.c) mfs.push("".concat(nTerm, "NH3(+1)$c").concat(i));
}

function addITerm(mfs, iTerm, i, j, options) {
  if (options.ya) mfs.push("H".concat(iTerm, "C-1O-1(+1)$a").concat(j, "y").concat(i));
  if (options.yb) mfs.push("H".concat(iTerm, "(+1)$b").concat(j, "y").concat(i));
  if (options.yc) mfs.push("H".concat(iTerm, "NH3(+1)$c").concat(j, "y").concat(i));
  if (options.zc) mfs.push("N-1".concat(iTerm, "NH3(+1)$c").concat(j, "z").concat(i));
}

function addCTerm(mfs, cTerm, i, options) {
  if (options.x) mfs.push("CO(+1)".concat(cTerm, "$x").concat(i));
  if (options.y) mfs.push("H2(+1)".concat(cTerm, "$y").concat(i));
  if (options.z) mfs.push("N-1H-1(+1)".concat(cTerm, "$z").concat(i));
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const aa = __webpack_require__(0);

function convertAASequence(mf) {
  // this function will check if it is a sequence of aa in 1 letter or 3 letters and convert them if it is the case
  // it could be a multiline mf !
  // if it is a multiline we could make some "tricks" ...
  let newMF = mf; // SEQRES   1 B  256  MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
  // SEQRES   2 B  256  GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
  // or
  // MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
  // GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO

  if (mf.search(/[A-Z]{3} [A-Z]{3} [A-Z]{3}/) > -1) {
    // this is a PDB !
    let tmpmf = mf.replace(/[\r\n]+/g, ' ');
    tmpmf = tmpmf.replace(/(SEQRES|[0-9]+| [A-Z] | [0-9A-Z]{4-50})/g, ''); // we need to correct the uppercase / lowercase

    let parts = tmpmf.split(' ');
    newMF = 'H';

    for (let i = 0; i < parts.length; i++) {
      newMF += parts[i].substr(0, 1) + parts[i].substr(1).toLowerCase();
    }

    newMF += 'OH';
  } else if (mf.includes('(') && isOneLetterCode(mf)) {
    // we expect one letter code with modification
    newMF = '';
    let nTerminal = 'H';
    let cTerminal = 'OH';
    let parenthesisCounter = 0;

    for (let i = 0; i < mf.length; i++) {
      let currentSymbol = mf[i];

      if (currentSymbol === '(' || currentSymbol === ')' || parenthesisCounter > 0) {
        if (currentSymbol === '(') {
          parenthesisCounter++;
          if (i === 0) nTerminal = '';
        }

        if (currentSymbol === ')') {
          parenthesisCounter--;
          if (i === mf.length - 1) cTerminal = '';
        }

        newMF += currentSymbol;
        continue;
      }

      newMF += convertAA1To3(currentSymbol);
    }

    newMF = nTerminal + newMF + cTerminal;
  } else if (mf.search(/[A-Z]{3}/) > -1 && mf.search(/[a-zA-Z][a-z0-9]/) === -1) {
    // UNIPROT
    //   370        380        390        400        410        420
    //GFKPNLRKTF VSGLFRESCG AHFYRGVDVK PFYIKKPVDN LFALMLILNR LRGWGVVGGM
    //
    //    430        440        450        460        470        480
    //SDPRLYKVWV RLSSQVPSMF FGGTDLAADY YVVSPPTAVS VYTKTPYGRL LADTRTSGFR
    // We remove all the number, all the spaces, etc
    newMF = "H".concat(convertAA1To3(newMF.replace(/[^A-Z]/g, '')), "OH");
  }

  return newMF;
}

function convertAA1To3(mf) {
  let newmf = '';

  for (let i = 0; i < mf.length; i++) {
    newmf += aa1To3(mf.charAt(i));
  }

  return newmf;
}

function aa1To3(code) {
  for (let i = 0; i < aa.length; i++) {
    if (aa[i].aa1 === code) {
      return aa[i].aa3;
    }
  }

  throw new Error("Invalid 1 letter code: ".concat(code));
}

module.exports = convertAASequence; // mf can contain as well parenthesis. We need to check if it is not yet a correct molecular formula

function isOneLetterCode(mf) {
  let parenthesisLevel = 0;

  for (let char of mf) {
    if (parenthesisLevel === 0 && char.match(/[a-z]/)) return false;
    if (char === '(') parenthesisLevel++;
    if (char === ')') parenthesisLevel--;
  }

  return true;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=peptide.js.map