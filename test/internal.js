'use strict';

var PEP = require('..');

// http://www.matrixscience.com/help/fragmentation_help.html

describe('Generate internal fragments yb', function () {
    var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});

    it('Check internal fragments', function () {
        result.should.be.instanceof(Array).and.have.length(6);
        result.should.eql([ 'HGly(+1)$b2y1',
                'HGlySer(+1)$b3y1',
                'HGlySerPro(+1)$b4y1',
                'HSer(+1)$b3y2',
                'HSerPro(+1)$b4y2',
                'HPro(+1)$b4y3' ]
        )
    });
});


describe('Generate internal fragments ya', function () {
    var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:false, ya:true});

    it('Check internal fragments', function () {
        result.should.be.instanceof(Array).and.have.length(6);
        result.should.eql([ 'HGlyC-1O-1(+1)$a2y1',
                'HGlySerC-1O-1(+1)$a3y1',
                'HGlySerProC-1O-1(+1)$a4y1',
                'HSerC-1O-1(+1)$a3y2',
                'HSerProC-1O-1(+1)$a4y2',
                'HProC-1O-1(+1)$a4y3' ]
        )
    });
});

