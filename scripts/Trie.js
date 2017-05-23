import Node from './Node';

class Trie {
  constructor() {
    this.root = new Node('root');
  }

  insert(word) {
    const letters = word.split('').map(e => new Node(e));
    let current = this.root;

    letters.forEach((node, i, a) => {
      current.children = current.children || {};
      if (!current.children[node.letter]) {
        current.children[node.letter] = node;
      }
      if (i === a.length - 1) {
        current.children[node.letter].isCompleteWord = true;
      }
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

// BUG: startign letter not recroded
// BUG: more than one letter word
// BUG: case not found - > undefinde

  suggest(word = '') {
    const letters = word.split('');
    let current = this.root.children;
    let array = [];
    let completeWord = word;
    let existingWord = '';

    letters.forEach(e => {
      existingWord += e;
      if (current[e].isCompleteWord) {
        array.unshift(existingWord);
      }
      current = current[e].children;
    })

    if (word === '') {
      return null
    }

    search(current, array);
    return array

    function search(node) {
      if (!node) {
        completeWord = word;
        return null;
      }

      let keys = Object.keys(node);

      keys.forEach(e => {
        completeWord += node[e].letter;
        if (node[e].isCompleteWord) {
          array.push(completeWord);
        }
        search(node[e].children)
      })
    }
  }
}

export default Trie;



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
