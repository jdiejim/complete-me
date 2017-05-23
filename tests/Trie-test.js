import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';

describe('', () => {

  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('', () => {
    const word1 = 'pizza';
    const word2 = 'word';
    const word3 = 'pizzas';

    trie.insert(word1);
    // expect(trie.root.children[word1[0]].letter).to.equal(word1[0]);
    // expect(trie.root.children[word1[0]].letter).to.equal(word1[0]);

    trie.insert(word2);
    trie.insert(word3);
    // console.log(trie.root);
    trie.count()
    // expect(trie.root.children[word2[0]].children[word2[1]].letter).to.equal(word2[1]);
  })

  it('Should count the possible words that were inserted', () => {
    const words = ['pizza', 'hot', 'dog', 'hamburger', 'pizzas', 'paprika', 'pilsiner'];

    words.forEach(e => {
      trie.insert(e);
    })

    trie.suggest('');

    expect(trie.count()).to.equal(words.length);
  })
})

// TODO: true test
// TODO: true on each word if same name plus other lettres
