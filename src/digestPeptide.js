'use strict';

var splitSequence = require('./splitPeptide');

/*
Iotuibs:
* minMissed (default: 0)
* maxMissed (default: 0)
* minResidue: 0;
* maxResidue: infinity
* enzyme: chymotrypsin, trypsin, glucph4, glucph8, thermolysin, cyanogenbromide : Mandatory, no default value !
 */

function digestSequence(sequence, options) {
  var options = options || {};

  sequence = sequence.replace(/^H([^a-z])/, '$1').replace(/OH$/, '');

  options.enzyme = options.enzyme || 'trypsin';
  if (options.minMissed === undefined) options.minMissed = 0;
  if (options.maxMissed === undefined) options.maxMissed = 0;
  if (options.minResidue === undefined) options.minResidue = 0;
  if (options.maxResidue === undefined) options.maxResidue = Number.MAX_VALUE;
  var regexp = getRegexp(options.enzyme);
  var fragments = sequence
    .replace(regexp, '$1 ')
    .split(/ /)
    .filter(entry => entry);

  var from = 0;
  for (var i = 0; i < fragments.length; i++) {
    var nbResidue = fragments[i]
      .replace(/([A-Z][a-z][a-z])/g, ' $1')
      .split(/ /)
      .filter(entry => entry).length;
    fragments[i] = {
      sequence: fragments[i],
      nbResidue: nbResidue,
      from: from,
      to: from + nbResidue - 1
    };
    from += nbResidue;
  }

  var results = [];

  for (var i = 0; i < fragments.length - options.minMissed; i++) {
    for (
      var j = options.minMissed;
      j <= Math.min(options.maxMissed, fragments.length - i - 1);
      j++
    ) {
      var fragment = '';
      var nbResidue = 0;
      for (var k = i; k <= i + j; k++) {
        fragment += fragments[k].sequence;
        nbResidue += fragments[k].nbResidue;
      }
      var from = fragments[i].from + 1;
      var to = fragments[i + j].to + 1;
      if (
        fragment &&
        nbResidue >= options.minResidue &&
        nbResidue <= options.maxResidue
      ) {
        results.push('H' + fragment + 'OH' + '$D' + from + '>' + to);
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
    case 'thermolysin': // N-term of  Leu, Phe, Val, Ile, Ala, Met
      return /()(?=Ile|Leu|Val|Ala|Met|Phe)/g;
    case 'cyanogenbromide':
      return /(Met)/g;
    case 'any':
      return /()(?=[A-Z][a-z][a-z])/g;
  }
  throw new Error('Digestion enzyme: ' + enzyme + ' is unknown');
}

module.exports = digestSequence;
