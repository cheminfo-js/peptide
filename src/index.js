'use strict';

const aa = require('./aminoAcids');
const IEP = require('./isoElectricPoint');
const chargePeptide = require('./chargePeptide');
const allowNeutralLoss = require('./allowNeutralLoss');
const splitPeptide = require('./splitPeptide');
const digestPeptide = require('./digestPeptide');
const generatePeptideFragments = require('./generatePeptideFragments');
const convertAASequence = require('./convertAASequence');

exports.getInfo = function() {
  return aa;
};

// sequence should be in the "right" format like HAlaGlyProOH

exports.splitPeptide = splitPeptide;
exports.digestPeptide = digestPeptide;

exports.calculateIEP = function(sequence) {
  var aas = splitPeptide(sequence);
  var result = IEP.calculateIEP(aas);
  return result;
};

exports.calculateIEPChart = function(sequence) {
  var aas = splitPeptide(sequence);
  var result = IEP.calculateChart(aas);
  return result;
};

exports.getColorForIEP = function(iep) {
  return IEP.getColor(iep);
};

exports.calculateCharge = function(sequence, ph) {
  var aas = splitPeptide(sequence);
  return IEP.calculateCharge(aas, ph);
};

exports.generatePeptideFragments = generatePeptideFragments;

exports.chargePeptide = chargePeptide;
exports.allowNeutralLoss = allowNeutralLoss;

function capitalizeAA3(mf) {
  for (var i = 0; i < aa.length; i++) {
    var regexp = new RegExp(aa[i].aa3, 'gi');
    mf = mf.replace(regexp, aa[i].aa3);
  }
  return mf;
}

exports.convertAASequence = convertAASequence;

exports.sequenceToMF = convertAASequence;
