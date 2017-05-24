import { expect } from 'chai';
import Trie from '../scripts/Trie';
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie with words inserted', () => {
  let trie;
  let words;

  beforeEach(() => {
    trie = new Trie();
    words = ['pizza', 'hot', 'dog', 'hamburger', 'pizzas', 'paprika', 'pilsiner', 'ham', 'pill', 'paper'];
  })

  it('Should have a method that inserts word', () => {
    let word = 'pizza';

    trie.insert(word);
    let node = trie.root.children;
    let expectedLetter = Object.keys(node).join('');

    expect(expectedLetter).to.equal(word[0]);
  })

  it('Should have a method that populates array of words', () => {
    let firstElementLetters = words.map(e => e[0]).reduce((t, c) => {
      if (!t.includes(c)) {
        t.push(c);
      }
      return t;
    }, []);

    trie.populate(words)

    let nodeChildren = trie.root.children;
    let expectedChildren = Object.keys(nodeChildren);

    expect(expectedChildren).to.deep.equal(firstElementLetters);
  })

  it('Should have a method that counts inserted words', () => {
    trie.populate(words)

    expect(trie.count()).to.equal(words.length);
  })

  it('Should have a method that returns an array of suggestions by searching for a keyword', () => {
    let keyword = 'p';
    let filtered = words.filter(e => e.includes(keyword)).sort();

    trie.populate(words)

    let suggestions = trie.suggest(keyword).sort();

    expect(suggestions).to.deep.equal(filtered);
  })

  it('Should be able to return null if there is no suggested word', () => {
    let keyword = '';

    trie.populate(words)

    let suggestions = trie.suggest(keyword);

    expect(suggestions).to.deep.equal(null);
  })

  it('Should have a method that selects a word, and it will appear at the top of suggestions', () => {
    let keyword = 'p';
    let selected = 'pill';
    let filtered = words.filter(e => e.includes(keyword)).sort();

    trie.populate(words)

    let suggestions = trie.suggest(keyword).sort();

    expect(suggestions).to.deep.equal(filtered);

    trie.select(selected);
    suggestions = trie.suggest(keyword);
    let firstSuggested = suggestions[0];

    expect(firstSuggested).to.deep.equal(selected);
  })
})

describe('Trie with dictionary inserted', () => {
  const trie = new Trie();

  trie.populate(dictionary);

  it('Should have a method that returns an array of suggestions by searching for a keyword', () => {
    let keyword = 'app';
    let filtered = dictionary.filter(e => e.substring(0, keyword.length) === keyword).sort();

    let suggestions = trie.suggest(keyword).sort();

    expect(suggestions).to.deep.equal(filtered);
  })

  it('Should have a method that counts inserted words', () => {
    expect(trie.count()).to.equal(dictionary.length);
  })

  it('Should have a method that selects a word, and it will appear at the top of suggestions', () => {
    let keyword = 'app';
    let select1 = 'applenut';
    let select2 = 'applenut';
    let filtered = dictionary.filter(e => e.substring(0, keyword.length) === keyword).sort();

    let suggestions = trie.suggest(keyword).sort();

    expect(suggestions).to.deep.equal(filtered);

    trie.select(select1);

    suggestions = trie.suggest(keyword);
    let expectedWord = suggestions[0];

    expect(expectedWord).to.equal(select1);

    trie.select(select2);
    trie.select(select2);
    suggestions = trie.suggest(keyword);

    expect(expectedWord).to.equal(select2);
  })
})
