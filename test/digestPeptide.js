'use strict';

var PEP = require('..');

describe('Checking digest sequence', function () {
    it('Normal sequence digest', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:0, maxMissed: 0});
        result.should.eql(["HLysOH$D1>1","HLysOH$D2>2","HAlaAlaLysOH$D3>5"]);
    });

    it('Normal sequence digest, minMissed:0, maxMissed:1', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:0, maxMissed: 1});
        result.should.eql(["HLysOH$D1>1","HLysLysOH$D1>2","HLysOH$D2>2","HLysAlaAlaLysOH$D2>5","HAlaAlaLysOH$D3>5"]);
    });

    it('Normal sequence digest, minMissed:1, maxMissed:1', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:1, maxMissed: 1});
        result.should.eql(["HLysLysOH$D1>2","HLysAlaAlaLysOH$D2>5"]);
    });

    it('Normal small sequence digest, default value', function () {
        var result=PEP.digestPeptide("HLysAlaOH");
        result.should.eql(["HLysOH$D1>1","HAlaOH$D2>2"]);
    });

});
