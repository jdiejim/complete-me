import Node from './Node';

class Trie {
  constructor() {
    this.root = new Node('root');
  }

  populate(dictionary) {
    dictionary.forEach(e => this.insert(e));
  }

  insert(word) {
    const letters = word.split('').map(e => new Node(e));
    let current = this.root;
    let level = 0;

    letters.forEach((node, i, a) => {
      current.children = current.children || {};
      if (!current.children[node.letter]) {
        current.children[node.letter] = node;
        current.children[node.letter].level = level;
      }
      if (i === a.length - 1) {
        current.children[node.letter].isWord = true;
      }
      level++
      current = current.children[node.letter];
    });
  }

  count(node = this.root.children, counter = 0) {
    if (!node) {
      return counter;
    }

    let keys = Object.keys(node);

    keys.forEach(e => {
      counter += node[e].isWord ? 1 : 0;
      counter = this.count(node[e].children, counter)
    })
    return counter;
  }

  select(word, node = this.root) {
    if (!node.children) {
      return;
    }

    [...word].forEach(e => {
      node = node.children[e];
    })

    if (node.isWord) {
      node.frequency++;
    }
  }

  suggest(word = '') {
    if (word === '') {
      return null;
    }

    let node = this.root.children
    let array = [];
    let levels = [];

    [...word].forEach((e, i, a) => {
      let {children, level, letter, isWord, frequency} = node[e];

      levels[level] = { letter: [letter], frequency };
      levels[level].isWord = i === a.length - 1 ? isWord : false;
      node = children;
    })

    search(node);
    return array.sort((a, b) => b.frequency - a.frequency).map(e => e.newWord);

    function search(node) {
      if (!node) {
        let newWord = '';

        levels.forEach(e => {
          newWord += e.letter[0];
          if (e.isWord) {
            if (!array.map(e => e.newWord).includes(newWord)) {
              array.push({newWord, frequency: e.frequency})
            }
          }
        });
        return null;
      }

      Object.keys(node).forEach(e => {
        let {children, level, letter, isWord, frequency} = node[e];

        if (!levels[level]) {
          levels[level] = { letter: [letter], isWord, frequency };
        } else {
          let letterArray = levels[level].letter;

          letterArray.shift();
          letterArray.push(letter);
          levels.splice(level);
          levels[level] = { letter: letterArray, isWord, frequency };
        }
        search(children);
      })
    }
  }
}

export default Trie;
