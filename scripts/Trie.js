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
        current.children[node.letter].isCompleteWord = true;
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
      counter += node[e].isCompleteWord ? 1 : 0;
      counter = this.count(node[e].children, counter)
    })
    return counter;
  }

  suggest(word = '') {
    const letters = word.split('');
    let current = this.root.children
    let completeWord = word;
    let array = [];
    let existingWord = '';
    let currentLevel = 0;
    let levelWord = '';
    let levels = {};
    let index = 0;

    letters.forEach(e => {
      existingWord += e;
      if (current[e].isCompleteWord) {
        array.unshift(existingWord);
      }
      // console.log(current[e].level);
      if (!levels[current[e].level]) {
        levels[current[e].level] = [current[e].letter];
      } else {
        levels[current[e].level] = levels[current[e].level].push(current[e].level);
      }
      current = current[e].children;
    })

    if (word === '') {
      return;
    }

    search(current);
    // console.log(levels);
    return array;

    function search(node) {
      if (!node) {
        console.log(levels);
        let levelKeys = Object.keys(levels);
        let newWord = ''

        levelKeys.forEach(e => {
          newWord += levels[e][0]
        })
        console.log(newWord);
        array.push(newWord)
        completeWord = word;
        return null;
      }

      let keys = Object.keys(node);

      keys.forEach(e => {
        if (!levels[node[e].level]) {
          levels[node[e].level] = [node[e].letter];
        } else {
          let letter = node[e].letter;
          let levelArray = levels[node[e].level];

          levelArray.shift();
          levelArray.push(letter);

          let obj = {};

          for (let i = 0; i < node[e].level; i++) {
            obj[i] = levels[i]
          }

          levels = obj;
          levels[node[e].level] = levelArray;
        }
        search(node[e].children)
      })
    }
  }
}

export default Trie;
