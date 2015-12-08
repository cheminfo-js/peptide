'use strict';

var aa = require('./aminoAcids');

// SOURCE: https://en.wikipedia.org/wiki/Amino_acid

function chargePeptide(mf, options) {
    var options=options || {};
    if (options === undefined) options.pH=0;
    var pH=options.pH;
    // we will allow to charge the peptide at a specific pH

    // first amino acids (N-terminal)
    if (mf.match(/^H[A-Z][a-z]{2}/)) {
        var firstAA=mf.replace(/^H([A-Z][a-z]{2}).*/,"$1");
        if (aa[firstAA] && pH<aa[firstAA].pKaN) {
            mf=mf.replace(/^H([^+])/, 'H+H$1');;
        }
        console.log(firstAA);
    }

    // last amino acids (C-terminal)
    if (mf.match(/[A-Z][a-z]{2}OH$/)) {
        var lastAA=mf.replace(/.*([A-Z][a-z]{2})OH$/,"$1");
        if (aa[firstAA] && pH>aa[firstAA].pKaC) {

        }
        console.log(lastAA);
    }

    // basic AA
    mf=mf.replace(/(Arg)(?!\()/g, '$1(H+)');
    mf=mf.replace(/(His)(?!\()/g, '$1(H+)');
    mf=mf.replace(/(Lys)(?!\()/g, '$1(H+)');

    // acid AA
    mf=mf.replace(/(Asp)(?!\()/g, '$1(H-1-)');
    mf=mf.replace(/(Glu)(?!\()/g, '$1(H-1-)');

    mf=mf.replace(/(Cys)(?!\()/g, '$1(H-1-)');

    return mf;
};



module.exports = chargePeptide;

