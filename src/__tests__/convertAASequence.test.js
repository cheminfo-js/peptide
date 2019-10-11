const convertAASequence = require('../convertAASequence');

describe('Checking convert AA sequence', () => {
  test('Check AAAAAAA', () => {
    const result = convertAASequence('AAAAAAA');
    expect(result).toEqual('HAlaAlaAlaAlaAlaAlaAlaOH');
  });

  test('Check (Me)AAAAAAA(NH2)', () => {
    const result = convertAASequence('(Me)AAAAAAA(NH2)');
    expect(result).toEqual('(Me)AlaAlaAlaAlaAlaAlaAla(NH2)');
  });

  test('Check ALA SER LYS GLY PRO', () => {
    const result = convertAASequence('ALA SER LYS GLY PRO');
    expect(result).toEqual('HAlaSerLysGlyProOH');
  });
});
