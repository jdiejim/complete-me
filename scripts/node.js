class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = null;
    this.isWord = false;
    this.frequency = 0;
  }
}

export default Node;
