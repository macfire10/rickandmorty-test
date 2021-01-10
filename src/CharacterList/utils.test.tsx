import { matchMorty, matchRick } from "./utils";

describe('Match correct Rick characters', () => {
  it(`Match Rick`, () => {
    expect(matchRick('Rick')).toEqual(true);
  })
  it(`Match Rick clones`, () => {
    expect(matchRick(`Rick’s clone`)).toEqual(true);
  })
  it(`Do not match other characters`, () => {
    expect(matchRick('Morty')).toEqual(false);
    expect(matchRick('Summer')).toEqual(false);
    expect(matchRick('Jerry')).toEqual(false);
  })
})

describe('Match correct Morty characters', () => {
  it(`Match 'Morty'`, () => {
    expect(matchMorty('Morty')).toEqual(true);
  })
  it(`Do not match other characters`, () => {
    expect(matchMorty('Rick')).toEqual(false);
    expect(matchMorty('Summer')).toEqual(false);
    expect(matchMorty('Jerry')).toEqual(false);
  })
  it(`Do not match other characters which contain Morty as a subject`, () => {
    expect(matchMorty(`Morty’s Lawyer`)).toEqual(false);
    expect(matchMorty(`Morty’s Father-In-Law`)).toEqual(false);
    expect(matchMorty(`Morty’s Girlfriend`)).toEqual(false);
  })
})