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
      // existingWord += e;
      // if (current[e].isCompleteWord) {
      //   array.unshift(existingWord);
      // }
      if (!levels[current[e].level]) {
        levels[current[e].level] = {}
        levels[current[e].level].letter = [current[e].letter];
        levels[current[e].level].isWord = current[e].isCompleteWord;
      } else {
        levels[current[e].level].letter = levels[current[e].level].letter.push(current[e].level);
        levels[current[e].level].isWord = current[e].isCompleteWord;
      }
      current = current[e].children;
    })

    if (word === '') {
      return;
    }

    search(current);
    return array.sort();

    function search(node) {
      if (!node) {
        console.log(levels);
        let levelKeys = Object.keys(levels);
        let newWord = ''

        levelKeys.forEach(e => {
          newWord += levels[e].letter[0]
          if (levels[e].isWord) {
            array.push(newWord)
          }
        })
        console.log(newWord);
        // array.push(newWord)
        console.log(array);
        completeWord = word;
        return null;
      }

      let keys = Object.keys(node);

      keys.forEach(e => {
        if (!levels[node[e].level]) {
          levels[node[e].level] = {}
          levels[node[e].level].letter = [node[e].letter];
          levels[node[e].level].isWord = node[e].isCompleteWord;
        } else {
          let letter = node[e].letter;
          let levelArray = levels[node[e].level].letter;

          levelArray.shift();
          levelArray.push(letter);

          let obj = {};

          for (let i = 0; i < node[e].level; i++) {
            obj[i] = levels[i]
          }
          console.log(obj);
          console.log(levels[node[e].level]);
          console.log(node[e].level);
          levels = obj;
          levels[node[e].level] = {}
          levels[node[e].level].letter = levelArray;
          levels[node[e].level].isWord = node[e].isCompleteWord;
        }
        search(node[e].children)
      })
    }
  }
}

export default Trie;
