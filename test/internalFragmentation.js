'use strict';

var PEP = require('..');

// http://www.matrixscience.com/help/fragmentation_help.html

[ 'HLysNH3(+1)$c2y3', 'HLysAspNH3(+1)$c3y3', 'HAspNH3(+1)$c3y2' ]

var allowed=[
    "Lys$b2y3",
    "LysAsp$b3y3",
    "Asp$b3y2",
    "Lys$c2y3",
    "LysAsp$c3y3",
    "Asp$c3y2",
    "Lys$c2z3",
    "LysAsp$c3z3",
    "Asp$c3z2"
];


describe('Check internal fragmentation', function () {

    it('Check AKDR', function () {
        var sequence=PEP.convertAASequence('AKDR');
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });
    
    it('Check AKDR ph=1', function () {
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

    it('Check AKDR neutral loss ph=1', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 1});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKDR neutral loss ph=13', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 13});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKDR neutral loss  internal fragment yb', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it('Check AKDR internal fragment yc', function () {
        var sequence=PEP.convertAASequence('AKDR');
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, ya:false, yb:false, yc:true, zc: false});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });

    it.only('Check AKDR internal fragment zc', function () {
        var sequence=PEP.convertAASequence('AKDR');
        sequence=PEP.allowNeutralLoss(sequence);
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:false, c:false, x:false, y:false, z:false, ya:false, yb:false, yc:false, zc:true});
        result.should.be.instanceof(Array).and.have.length(3);
        checkAllowed(result);
    });
    
    
});

function clean(mfs) {
    for (var i=0; i<mfs.length; i++) {
        var mf=mfs[i]
        mfs[i]=mfs[i].replace(/\([^\(]*\)[0-9-]*/g,'');
        mfs[i]=mfs[i].replace(/^[H\d+]*(?=[A-Z])/,'');
        mfs[i]=mfs[i].replace(/^N-1/,'');
        mfs[i]=mfs[i].replace(/O[H-]\$/,'$');
        mfs[i]=mfs[i].replace(/NH3\$/,'$');
    }
}

function checkAllowed(mfs) {
    clean(mfs);
    for (var mf of mfs) {
        allowed.indexOf(mf).should.be.greaterThan(-1);
    }
}