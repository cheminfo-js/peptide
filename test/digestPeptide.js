'use strict';

var PEP = require('..');

describe('Checking digest sequence', function () {
    it('Normal sequence digest', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:0, maxMissed: 0});
        result.should.eql(["HLysOH","HLysOH","HAlaAlaLysOH"]);
    });

    it('Normal sequence digest, minMissed:0, maxMissed:1', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:0, maxMissed: 1});
        result.should.eql(["HLysOH","HLysLysOH","HLysOH","HLysAlaAlaLysOH","HAlaAlaLysOH"]);
    });

    it('Normal sequence digest, minMissed:1, maxMissed:1', function () {
        var result=PEP.digestPeptide("HLysLysAlaAlaLysOH", {enzyme:'trypsin', minMissed:1, maxMissed: 1});
        result.should.eql(["HLysLysOH","HLysAlaAlaLysOH"]);
    });

});
