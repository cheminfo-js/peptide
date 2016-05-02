'use strict';

var PEP = require('..');

// http://www.matrixscience.com/help/fragmentation_help.html


var allowed=[
    "Ala$b1",
    "AlaLys$b2",
    "AlaLysLeu$b3",
    "AlaLysLeuArg$b4",
    "AlaLysLeuArgCys$b5",
    "AlaLysLeuArgCysSer$b6",
    "AlaLysLeuArgCysSerThr$b7",
    "Tyr$y1",
    "ThrTyr$y2",
    "SerThrTyr$y3",
    "CysSerThrTyr$y4",
    "ArgCysSerThrTyr$y5",
    "LeuArgCysSerThrTyr$y6",
    "LysLeuArgCysSerThrTyr$y7"
];


describe('Check fragmentation', function () {
    
    it('Check AKLRCSTY', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
        checkAllowed(result);
    });

    it('Check AKLRCSTY ph=1', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        sequence=PEP.chargePeptide(sequence, {pH: 1});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
        checkAllowed(result);
    });

    it('Check AKLRCSTY ph=13', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        sequence=PEP.chargePeptide(sequence, {pH: 13});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss ph=1', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 1});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss ph=13', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        sequence=PEP.allowNeutralLoss(sequence);
        sequence=PEP.chargePeptide(sequence, {pH: 13});
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
        checkAllowed(result);
    });

    it('Check AKLRCSTY neutral loss', function () {
        var sequence=PEP.convertAASequence('AKLRCSTY');
        sequence=PEP.allowNeutralLoss(sequence);
        var result=PEP.generatePeptideFragments(sequence,{a:false, b:true, c:false, x:false, y:true, z:false, yb:false, ya:false});
        result.should.be.instanceof(Array).and.have.length(14);
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