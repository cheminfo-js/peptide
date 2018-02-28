'use strict';

var PEP = require('..');

// http://www.matrixscience.com/help/fragmentation_help.html

describe('Generate internal fragments', () => {

    test('Check internal fragments for yb', () => {
        var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:true, ya:false});
        expect(result).to.be.instanceof(Array).toHaveLength(6);
        expect(result).toEqual([
            'HGly(+1)$b2y4',
            'HGlySer(+1)$b3y4',
            'HGlySerPro(+1)$b4y4',
            'HSer(+1)$b3y3',
            'HSerPro(+1)$b4y3',
            'HPro(+1)$b4y2' ])
    });

    test('Check internal fragments for ya', () => {
        var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:false, ya:true});
        expect(result).to.be.instanceof(Array).toHaveLength(6);
        expect(result).toEqual([
                'HGlyC-1O-1(+1)$a2y4',
                'HGlySerC-1O-1(+1)$a3y4',
                'HGlySerProC-1O-1(+1)$a4y4',
                'HSerC-1O-1(+1)$a3y3',
                'HSerProC-1O-1(+1)$a4y3',
                'HProC-1O-1(+1)$a4y2' ])
    });

    test('Check internal fragments for ya with maxInternal=2', () => {
        var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:false, ya:true, maxInternal: 2});
        expect(result).to.be.instanceof(Array).toHaveLength(5);
        expect(result).toEqual([ 'HGlyC-1O-1(+1)$a2y4',
                'HGlySerC-1O-1(+1)$a3y4',
                'HSerC-1O-1(+1)$a3y3',
                'HSerProC-1O-1(+1)$a4y3',
                'HProC-1O-1(+1)$a4y2' ])
    });

    test(
        'Check internal fragments for ya with maxInternal=2 and minInternal=2',
        () => {
            var result=PEP.generatePeptideFragments("HAlaGlySerProPheOH",{a:false, b:false, c:false, x:false, y:false, z:false, yb:false, ya:true, minInternal: 2, maxInternal: 2});
            expect(result).to.be.instanceof(Array).toHaveLength(2);
            expect(result).toEqual([
                'HGlySerC-1O-1(+1)$a3y4',
                'HSerProC-1O-1(+1)$a4y3'
                ])
        }
    );


});

