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
    // console.log(node);
  }

  suggest(word = '') {
    let current = this.root.children
    let array = [];
    let levels = {};

    [...word].forEach((e, i, a) => {
      if (!levels[current[e].level]) {
        levels[current[e].level] = {}
        levels[current[e].level].letter = [current[e].letter];
        levels[current[e].level].frequency = current[e].frequency;
        if (i === a.length - 1) {
          levels[current[e].level].isWord = current[e].isWord;
        } else {
          levels[current[e].level].isWord = false;
        }
      } else {
        levels[current[e].level].letter = levels[current[e].level].letter.push(current[e].level);
        levels[current[e].level].isWord = current[e].isWord;
        levels[current[e].level].frequency = current[e].frequency;
      }
      current = current[e].children;
    })

    if (word === '') {
      return;
    }

    search(current);
    array = array.sort((a, b) => b.frequency - a.frequency).map(e => e.newWord);
    return array;

    function search(node) {
      if (!node) {
        let levelKeys = Object.keys(levels);
        let newWord = ''

        levelKeys.forEach(e => {
          newWord += levels[e].letter[0]
          if (levels[e].isWord) {
            if (!array.map(e => e.newWord).includes(newWord)) {
              array.push({newWord, frequency: levels[e].frequency})
            }
          }
        })
        return null;
      }

      let keys = Object.keys(node);

      keys.forEach(e => {
        if (!levels[node[e].level]) {
          levels[node[e].level] = {}
          levels[node[e].level].letter = [node[e].letter];
          levels[node[e].level].isWord = node[e].isWord;
          levels[node[e].level].frequency = node[e].frequency;
        } else {
          let letter = node[e].letter;
          let levelArray = levels[node[e].level].letter;

          levelArray.shift();
          levelArray.push(letter);

          let obj = {};

          for (let i = 0; i < node[e].level; i++) {
            obj[i] = levels[i]
          }
          levels = obj;
          levels[node[e].level] = {}
          levels[node[e].level].letter = levelArray;
          levels[node[e].level].isWord = node[e].isWord;
          levels[node[e].level].frequency = node[e].frequency;
        }
        search(node[e].children)
      })
    }
  }
}

export default Trie;
