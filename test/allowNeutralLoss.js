'use strict';

var PEP = require('..');


describe('Checking allow neutral loss of peptides', function () {
    it('Check neutral loss of AASTAARKAA', function () {
        var result=PEP.allowNeutralLoss("HAlaAlaSerThrAsp(H-1)GluArgLys(H+)AlaOH");
        result.should.eql("HAlaAlaSer(H-2O-1)0-1Thr(H-2O-1)0-1Asp(H-1)Glu(H-2O-1)0-1Arg(N-1H-3)0-1Lys(H+)AlaOH");
    });
});


