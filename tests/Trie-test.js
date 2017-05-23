import { expect } from 'chai';
import Trie from '../scripts/Trie';

describe('Trie', () => {

  let trie;
  let words;

  beforeEach(() => {
    trie = new Trie();
    words = ['pizza', 'hot', 'dog', 'hamburger', 'pizzas', 'paprika', 'pilsiner', 'ham', 'piz'];
  })

  it('Should be able to insert words ', () => {
    let firstLetter = words[0][0];
    let secondLetter = words[0][1];

    words.forEach(e => {
      trie.insert(e);
    })

    expect(trie.root.children[firstLetter].letter).to.equal(firstLetter);
    expect(trie.root.children[firstLetter].children[secondLetter].letter).to.equal(secondLetter);
  })

  it('Should be able to count the potential words previously inserted', () => {
    words.forEach(e => {
      trie.insert(e);
    })

    expect(trie.count()).to.equal(words.length);
  })

  it('Should be able to return array of suggestions by searching for keyword', () => {
    let keyword = 'ham';
    let filtered = words.filter(e => e.includes(keyword)).sort();
    //should i sort?
    words.forEach(e => {
      trie.insert(e);
    })

    expect(trie.suggest(keyword)).to.deep.equal(filtered);
  })

  it('Should be able to return null if there is no suggested word', () => {
    let keyword = '';

    words.forEach(e => {
      trie.insert(e);
    })

    expect(trie.suggest(keyword)).to.deep.equal(null);
  })
})

// TODO: true test
// TODO: true on each word if same name plus other lettres
