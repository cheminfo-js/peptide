'use strict';

var aa = require('./aminoAcids');
var IEP = require('./isoElectricPoint');
var chargePeptide = require('./chargePeptide');
var allowNeutralLoss = require('./allowNeutralLoss');
var splitPeptide = require('./splitPeptide');
var digestPeptide = require('./digestPeptide');
var generatePeptideFragments = require('./generatePeptideFragments');

exports.getInfo = function () {
    return aa;
}

// sequence should be in the "right" format like HAlaGlyProOH

exports.splitPeptide=splitPeptide;
exports.digestPeptide=digestPeptide;

exports.calculateIEP = function (sequence) {
    var aas=splitPeptide(sequence);
    var result=IEP.calculateIEP(aas);
    return result;
}

exports.calculateIEPChart = function (sequence) {
    var aas=splitPeptide(sequence);
    var result=IEP.calculateChart(aas);
    return result;
}


exports.getColorForIEP = function (iep) {
    return IEP.getColor(iep);
}

exports.calculateCharge = function (sequence, ph) {
    var aas=splitPeptide(sequence);
    return IEP.calculateCharge(aas, ph);
}

exports.generatePeptideFragments = generatePeptideFragments;

exports.chargePeptide = chargePeptide;
exports.allowNeutralLoss = allowNeutralLoss;

function aa1To3(code) {
    for (var i = 0; i < aa.length; i++) {
        if (aa[i].aa1 === code) {
            return aa[i].aa3;
        }
    }
    throw new Error('Invalid 1 letter code: ' + code);
}

function converAA1To3(mf) {
    var newmf = '';
    for (var i = 0; i < mf.length; i++) {
        newmf += aa1To3(mf.charAt(i));
    }
    return newmf;
}

function capitalizeAA3(mf) {
    for (var i = 0; i < aa.length; i++) {
        var regexp = new RegExp(aa[i].aa3, 'gi');
        mf = mf.replace(regexp, aa[i].aa3);
    }
    return mf;
}


exports.convertAASequence = function convertAASequence(mf) {
    // this function will check if it is a sequence of aa in 1 letter or 3 letters and convert them if it is the case
    // it could be a multiline mf !
    // if it is a multiline we could make some "tricks" ...
    var newmf = mf;
    // SEQRES   1 B  256  MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
    // SEQRES   2 B  256  GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
    // or
    // MET PRO VAL GLU ILE THR VAL LYS GLU LEU LEU GLU ALA
    // GLY VAL HIS PHE GLY HIS GLU ARG LYS ARG TRP ASN PRO
    if (mf.search(/[A-Z]{3} [A-Z]{3} [A-Z]{3}/) > -1) {
        // this is a PDB !
        var tmpmf = mf.replace(/[\r\n]+/g, ' ');
        tmpmf = tmpmf.replace(/(SEQRES|[0-9]+| [A-Z] | [0-9A-Z]{4-50})/g, '');
        // we need to correct the uppercase / lowercase
        var parts = tmpmf.split(' ');
        newmf = 'H';
        for (var i = 0; i < parts.length; i++) {
            newmf += parts[i].substr(0, 1) + parts[i].substr(1).toLowerCase();
        }
        newmf += 'OH';
    } else if ((mf.search(/[A-Z]{3}/) > -1) && (mf.search(/[a-zA-Z][a-z0-9]/) == -1)) {
        // UNIPROT
        //   370        380        390        400        410        420
        //GFKPNLRKTF VSGLFRESCG AHFYRGVDVK PFYIKKPVDN LFALMLILNR LRGWGVVGGM
        //
        //    430        440        450        460        470        480
        //SDPRLYKVWV RLSSQVPSMF FGGTDLAADY YVVSPPTAVS VYTKTPYGRL LADTRTSGFR
        // We remove all the number, all the spaces, etc
        newmf = 'H' + converAA1To3(newmf.replace(/[^A-Z]/g, '')) + 'OH';
    }

    return newmf;

};

