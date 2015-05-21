'use strict';

var PEP = require('..');


describe('Checking charge peptide', function () {
    var result=PEP.chargePeptide("HAlaGlyLysHisAspOH");
    it('Check charge', function () {
        result.should.eql("H+HAlaGlyLys(H+)His(H+)AspOH");
    });
});

describe('Checking convert AA sequence', function () {
    var result1=PEP.convertAASequence("AAAAAAA");
    it('Check AAAAAAA', function () {
        result1.should.eql("HAlaAlaAlaAlaAlaAlaAlaOH");
    });
    var result2=PEP.convertAASequence("ALA SER LYS GLY PRO");
    it('Check ALA SER LYS GLY PRO', function () {
        result2.should.eql("HAlaSerLysGlyProOH");
    });


});

describe('Generate peptide fragments default options', function () {
    var result=PEP.generatePeptideFragments("HAlaGlySerOH");
    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(4);
    });
    it('Check first value', function () {
        result.should.have.property("0","HAla(+1)$b1");
    });
});


describe('Generate non natural peptide fragments default options', function () {
    var result=PEP.generatePeptideFragments("HAla(H-1Ph)Gly(Ts)SerOH");
    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(4);
    });
    it('Check first value', function () {
        result.should.have.property("0","HAla(H-1Ph)(+1)$b1");
    });
});


describe('Generate peptide fragments all fragments', function () {
    var result=PEP.generatePeptideFragments("HAlaGlySerOH",{a:true, b:true, c:true, x:true, y:true, z:true});
    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(12);
    });
});

describe('Check isoelectric point - One point', function () {
    var result=PEP.calculateIEP("HAlaGlySerLysLysHisOH");
    it('Check single point result', function () {
        result.should.equal(10.744);
    });
});

describe('Check isoelectric point - One point', function () {
    var result = PEP.calculateIEPChart("HAlaGlySerLysLysHisOH");
    it('Check y array and length', function () {
        result.y.should.be.instanceof(Array).and.have.length(1401);
    });
    it('Check yAbs array and length', function () {
        result.yAbs.should.be.instanceof(Array).and.have.length(1401);
    });
});

describe('Check isoelectric point - Get Color', function () {
    var result = PEP.getColorForIEP(4);
    result.should.equal('rgb(105,105,255)');
});

describe('Check isoelectric point - Get charge', function () {
    var result = PEP.calculateCharge("HAlaGlySerLysLysHisOH",2.0);
    result.should.equal(3.334);
});
