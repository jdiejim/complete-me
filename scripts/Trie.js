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

  // suggest(word, completed = '', node = this.root, array = [], level = []) {
  //   if (node.letter === 'root') {
  //     word.toLowerCase().split('').forEach(e => {
  //       node = node.children[e];
  //     })
  //     completed = word;
  //   }
  //
  //   if (!node.children) {
  //     return;
  //   }
  //
  //   let keys = Object.keys(node.children);
  //
  //   keys.forEach(e => {
  //     completed += node.children[e].letter;
  //     if (node.children[e].isCompleteWord) {
  //       array.push(completed);
  //     }
  //     this.suggest(word, completed, node.children[e], array);
  //     completed = '';
  //   })
  //   return array;
  // }

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
          // console.log(node[e].level);
          let level = node[e].level;
          let obj = {};
          for (let i = 0; i < node[e].level; i++) {
            obj[i] = levels[i]
          }
          levels = obj
          levels[node[e].level] = levelArray;
        }
        search(node[e].children)
      })
    }
  }
}

export default Trie;


// BUG: startign letter not recroded
// BUG: more removes one letter when plsener pilsener
// BUG: case not found - > undefinde
// count() {
//   let current = this.root.children;
//   let counter = 0;
//
//
//   search(current, counter);
//   console.log(counter);
//
//   function search(node) {
//
//     if (!node) {
//       return 'hi';
//     }
//
//     // console.log(node);
//     // console.log();
//     // console.log(node.children);
//
//     let keys = Object.keys(node);
//
//     console.log();
//     // console.log(keys);
//     console.log();
//
//     keys.forEach(e => {
//       console.log(e);
//       console.log(node[e].isCompleteWord);
//       counter += node[e].isCompleteWord ? 1 : 0;
//       search(node[e].children)
//     })
//   }
// }

// insert(word) {
//   const letters = word.split('').map(e => new Node(e));
//   let current = this.root;
//   let newWord = '';
//
//   letters.forEach((node, i, a) => {
//     current.children = current.children || {};
//     if (!current.children[node.letter]) {
//       current.children[node.letter] = node;
//     }
//     newWord += current.children[node.letter].letter;
//     if (i === a.length - 1) {
//       current.children[node.letter].isCompleteWord = true;
//     }
//     // console.log(newWord);
//     // console.log(current.children[node.letter].isCompleteWord);
//     // console.log();
//     current = current.children[node.letter];
//   });
// }

// count() {
//   let current = this.root.children;
//   let counter = 0;
//
//   search(current, counter);
//   return counter
//
//   function search(node) {
//     if (!node) {
//       return;
//     }
//
//     let keys = Object.keys(node);
//
//     keys.forEach(e => {
//       counter += node[e].isCompleteWord ? 1 : 0;
//       search(node[e].children)
//     })
//   }


// suggest(word = '', current = this.root.children, array = []) {
//   const letters = word.split('');
//   let completeWord = word;
//   let existingWord = '';
//
//   letters.forEach(e => {
//     existingWord += e;
//     if (current[e].isCompleteWord) {
//       array.unshift(existingWord);
//     }
//     current = current[e].children;
//   })
//
//   if (word === '') {
//     return null
//   }
//
//   search(current, array);
//   console.log(array.sort());
//   return array;
//
//   function search(node) {
//     if (!node) {
//       completeWord = word;
//       return null;
//     }
//
//     let keys = Object.keys(node);
//
//     keys.forEach(e => {
//       completeWord += node[e].letter;
//       if (node[e].isCompleteWord) {
//         array.push(completeWord);
//       }
//       search(node[e].children)
//     })
//   }
// }


// suggest(word, completed = '', node = this.root, array = []) {
//   if (node.letter === 'root') {
//     word.toLowerCase().split('').forEach(e => {
//       node = node.children[e];
//     })
//     // completed = word;
//   }
//
//   if (!node.children) {
//     return;
//   }
//
//   let keys = Object.keys(node.children);
//
//   keys.forEach(e => {
//     completed += node.children[e].letter;
//     if (node.children[e].isCompleteWord) {
//       array.push(completed);
//     }
//     this.suggest(word, completed, node.children[e], array);
//     completed = ''
//     // node = node.children
//   })
//   console.log(array);
//   return array;
// }
