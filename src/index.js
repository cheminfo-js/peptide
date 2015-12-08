'use strict';

var aa = require('./aminoAcids');
var IEP = require('./isoElectricPoint');
var chargePeptide = require('./chargePeptide');

exports.getInfo = function () {
    return aa;
}

// sequence should be in the "right" format like HAlaGlyProOH

exports.calculateIEP = function (sequence) {
    var aas=sequence.replace(/([A-Z])/g," $1").split(/ /);
    aas=aas.slice(2,aas.length-2);
    var result=IEP.calculateIEP(aas);
    return result;
}

exports.calculateIEPChart = function (sequence) {
    var aas=sequence.replace(/([A-Z])/g," $1").split(/ /);
    aas=aas.slice(2,aas.length-2);
    var result=IEP.calculateChart(aas);
    return result;
}


exports.getColorForIEP = function (iep) {
    return IEP.getColor(iep);
}

exports.calculateCharge = function (sequence, ph) {
    var aas=sequence.replace(/([A-Z])/g," $1").split(/ /);
    aas=aas.slice(2,aas.length-2);
    return IEP.calculateCharge(aas, ph);
}

exports.generatePeptideFragments = function generatePeptideFragments(mf, options) {
    if (options === undefined) {
        options = {
            a: false,
            b: true,
            c: false,
            x: false,
            y: true,
            z: false,
            i: false,
            yb: false,
            ya: false
        };
    }

    var mfs = [];
    var mfparts=mf.replace(/([a-z\)])([A-Z][a-z](?=[a-z]))/g,"$1 $2").split(/ /);

    var nTerm="";
    var cTerm="";
    for (var i=1; i<mfparts.length; i++) {
        nTerm+=mfparts[i-1];
        cTerm=mfparts[mfparts.length-i]+cTerm;
        addNTerm(mfs, nTerm, i, options);
        addCTerm(mfs, cTerm, i, options);
        if (options.i) mfs.push(mfparts[i]+"HC-1O-1(+1)$i:"+mfparts[i]);

        if (options.ya || options.yb) { // we have double fragmentations
            for (var j=i+1; j<mfparts.length;j++) {
                var iTerm='';
                for (var k=i; k<j; k++) {
                    iTerm+=mfparts[k];
                }
                addITerm(mfs, iTerm, i, j, options);
            }
        }
    }


    if (mfs.length === 0) {
        mfs = mfs.concat([mf]);
    }

    return mfs;

};

exports.chargePeptide = chargePeptide;


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

function addNTerm(mfs, nTerm, i, options) {
    if (options.a) mfs.push(nTerm+"C-1O-1(+1)$a"+i);
    if (options.b) mfs.push(nTerm+"(+1)$b"+i);
    if (options.c) mfs.push(nTerm+"NH3(+1)$c"+i);
}

function addITerm(mfs, iTerm, i, j, options) {
    if (options.ya) mfs.push("H"+iTerm+"C-1O-1(+1)$a"+j+"y"+i);
    if (options.yb) mfs.push("H"+iTerm+"(+1)$b"+j+"y"+i);
}

function addCTerm(mfs, cTerm, i, options) {
    if (options.x) mfs.push("CO(+1)"+cTerm+"$x"+i);
    if (options.y) mfs.push("H2(+1)"+cTerm+"$y"+i);
    if (options.z) mfs.push("N-1H-1(+1)"+cTerm+"$z"+i);
}
