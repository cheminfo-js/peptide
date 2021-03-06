'use strict';

const allowNeutralLoss = require('./allowNeutralLoss');
const aa = require('./aminoAcids');
const chargePeptide = require('./chargePeptide');
const convertAASequence = require('./convertAASequence');
const digestPeptide = require('./digestPeptide');
const generatePeptideFragments = require('./generatePeptideFragments');
const IEP = require('./isoElectricPoint');
const splitPeptide = require('./splitPeptide');

exports.getInfo = function () {
  return aa;
};

// sequence should be in the "right" format like HAlaGlyProOH

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
