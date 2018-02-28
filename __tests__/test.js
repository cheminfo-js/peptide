'use strict';

var PEP = require('..');


describe('Checking convert AA sequence', () => {
    var result1=PEP.convertAASequence("AAAAAAA");
    test('Check AAAAAAA', () => {
        expect(result1).toEqual("HAlaAlaAlaAlaAlaAlaAlaOH");
    });
    var result2=PEP.convertAASequence("ALA SER LYS GLY PRO");
    test('Check ALA SER LYS GLY PRO', () => {
        expect(result2).toEqual("HAlaSerLysGlyProOH");
    });


});

describe('Generate peptide fragments default options', () => {
    var result=PEP.generatePeptideFragments("HAlaGlySerOH");
    test('Check array and length', () => {
        expect(result).to.be.instanceof(Array).toHaveLength(4);
    });
    test('Check first value', () => {
        expect(result).toHaveProperty("0", "HAla(+1)$b1");
    });
});


describe('Generate non natural peptide fragments default options', () => {
    var result=PEP.generatePeptideFragments("HAla(H-1Ph)Gly(Ts)SerOH");
    test('Check array and length', () => {
        expect(result).to.be.instanceof(Array).toHaveLength(4);
    });
    test('Check first value', () => {
        expect(result).toHaveProperty("0", "HAla(H-1Ph)(+1)$b1");
    });
});


describe('Generate peptide fragments all fragments', () => {
    var result=PEP.generatePeptideFragments("HAlaGlySerOH",{a:true, b:true, c:true, x:true, y:true, z:true});
    test('Check array and length', () => {
        expect(result).to.be.instanceof(Array).toHaveLength(12);
    });
});

describe('Check isoelectric point - One point', () => {
    var result=PEP.calculateIEP("HAlaGlySerLysLysHisOH");
    test('Check single point result', () => {
        expect(result).toBe(10.744);
    });
});

describe('Check isoelectric point - One point', () => {
    var result = PEP.calculateIEPChart("HAlaGlySerLysLysHisOH");
    test('Check y array and length', () => {
        expect(result.y).to.be.instanceof(Array).toHaveLength(1401);
    });
    test('Check yAbs array and length', () => {
        expect(result.yAbs).to.be.instanceof(Array).toHaveLength(1401);
    });
});

describe('Check isoelectric point - Get Color', () => {
    var result = PEP.getColorForIEP(4);
    expect(result).toBe('rgb(105,105,255)');
});

describe('Check isoelectric point - Get charge', () => {
    var result = PEP.calculateCharge("HAlaGlySerLysLysHisOH",2.0);
    expect(result).toBe(3.334);
});
