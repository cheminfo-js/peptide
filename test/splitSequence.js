'use strict';

var PEP = require('..');


describe('Checking split sequence', function () {
    it('Normal sequence split', function () {
        var result=PEP.splitSequence("HAlaGlyLysHisAspOH");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

    it('Sequence split : nothing on N-term', function () {
        var result=PEP.splitSequence("AlaGlyLysHisAspOH");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

    it('Sequence split : nothing on C-term', function () {
        var result=PEP.splitSequence("HAlaGlyLysHisAsp");
        result.should.eql(["Ala","Gly","Lys","His","Asp"]);
    });

});


