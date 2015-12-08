'use strict';

var PEP = require('..');


describe('Checking charge peptide', function () {
    it('Check charge with default option', function () {
        var result=PEP.chargePeptide("HAlaGlyLysHisAspOH");
        result.should.eql("H+HAlaGlyLys(H+)His(H+)AspOH");
    });

    it('Check charge with pH = 1', function () {
        var result=PEP.chargePeptide("HAlaGlyLysHisAspOH", {pH: 1});
        result.should.eql("H+HAlaGlyLys(H+)His(H+)AspOH");
    });

    it('Check charge with pH = 7', function () {
        var result=PEP.chargePeptide("HAlaGlyLysHisAspOH", {pH: 7});
        result.should.eql("H+HAlaGlyLys(H+)HisAsp(H-1-)O-");
    });

    it('Check charge with pH = 13', function () {
        var result=PEP.chargePeptide("HAlaGlyLysHisAspOH", {pH: 13});
        result.should.eql("HAlaGlyLysHisAsp(H-1-)O-");
    });

});


