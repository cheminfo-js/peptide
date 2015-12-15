'use strict';

var PEP = require('..');


describe('Checking split peptide', function () {
    it('Normal sequence split', function () {
        var result=PEP.splitPeptide("HAlaGlyLysHisAspOH");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

    it('Sequence split : nothing on N-term', function () {
        var result=PEP.splitPeptide("AlaGlyLysHisAspOH");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

    it('Sequence split : nothing on C-term', function () {
        var result=PEP.splitPeptide("HAlaGlyLysHisAsp");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

});


