'use strict';

var PEP = require('..');

// http://www.matrixscience.com/help/fragmentation_help.html


var allowed=[
    "Lys$b2y3",
    "LysAsp$b3y3",
    "Asp$b3y2"
];


describe('Check internal fragmentation', function () {

    it('Check AKDR', function () {
        var sequence=PEP.convertAASequence('AKDR');
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });
    
    it('Check AKLRCSTY ph=1', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.chargePeptide(sequence, {pH: 1});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKLRCSTY ph=13', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.chargePeptide(sequence, {pH: 13});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss ph=1', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 1});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss ph=13', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 13});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });
});

function clean(mfs) {
    for (var i=0; i<mfs.length; i++) {
        var mf=mfs[i]
        mfs[i]=mfs[i].replace(/\([^\(]*\)[0-9-]*/g,'');
        mfs[i]=mfs[i].replace(/^[H\d+]*(?=[A-Z])/,'');
        mfs[i]=mfs[i].replace(/O[H-]\$/,'$');
    }
}

function checkAllowed(mfs) {
    clean(mfs);
    for (var mf of mfs) {
        allowed.indexOf(mf).should.be.greaterThan(-1);
    }
}