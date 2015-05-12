'use strict';

var aa = require('./amino_acid');

exports.generatePeptideFragments = function generatePeptideFragments(mf, options) {
    if (options === undefined) {
        options = {
            a: false,
            b: true,
            c: false,
            x: false,
            y: true,
            z: false,
            i: false
        };
    }

    var i;
    var mfs = [];
    var mfparts = mf.replace(/([a-z\)])([A-Z])/g, '$1 $2').split(/ /);

    if (options.a) {
        var mfa = '';
        for (i = 0; i < (mfparts.length - 1); i++) {
            mfa += mfparts[i];
            mfs.push(mfa + 'C-1O-1(+1)$a' + (i + 1));
        }
    }
    if (options.b) {
        var mfb = '';
        for (i = 0; i < (mfparts.length - 1); i++) {
            mfb += mfparts[i];
            mfs.push(mfb + '(+1)$b' + (i + 1));
        }
    }
    if (options.c) {
        var mfc = '';
        for (i = 0; i < (mfparts.length - 1); i++) {
            mfc += mfparts[i];
            mfs.push(mfc + 'NH3(+1)$c' + (i + 1));
        }
    }
    if (options.x) {
        var mfx = '';
        for (i = mfparts.length - 1; i >= 0; i--) {
            mfx = mfparts[i] + mfx;
            if (i < (mfparts.length - 1)) {
                mfs.push('CO(+1)' + mfx + '$x' + (mfparts.length - i - 1));
            }
        }
    }
    if (options.y) {
        var mfy = '';
        for (i = mfparts.length - 1; i >= 0; i--) {
            mfy = mfparts[i] + mfy;
            if (i < (mfparts.length - 1)) {
                mfs.push('H2(+1)' + mfy + '$y' + (mfparts.length - i - 1));
            }
        }
    }
    if (options.z) {
        var mfz = '';
        for (i = mfparts.length - 1; i >= 0; i--) {
            mfz = mfparts[i] + mfz;
            if (i < (mfparts.length - 1)) {
                mfs.push('N-1H-1(+1)' + mfz + '$z' + (mfparts.length - i - 1));
            }
        }
    }
    if (options.i) {
        for (i = mfparts.length - 1; i > 0; i--) {
            if (mfparts[i].match(/^[A-Z][a-z][a-z].*$/)) {
                mfs.push(mfparts[i] + 'HC-1O-1(+1)$i:' + mfparts[i]);
            }
        }
    }

    if (mfs.length === 0) {
        mfs = mfs.concat([mf]);
    }

    return mfs;

};

exports.chargePeptide = function chargePeptide(mf) {
    return mf.replace(/^H([^+])/, 'H+H$1').replace(/(Arg|His|Lys)(?!\()/g, '$1(H+)');
};

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
