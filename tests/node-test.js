import { expect } from 'chai';
import Node from '../scripts/Node';

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('j');
  })

  it('Should be able to create an instance of Node', () => {
    expect(node).to.be.an.instanceof(Node);
  })

  it('Should have a letter property', () => {
    expect(node.letter).to.equal('j');
  })

  it('Should have a default null value for the children nodes', () => {
    expect(node.children).to.equal(null);
  })

  it('Should have a isWord property with a default false value', () => {
    expect(node.isWord).to.equal(false);
  })

  it('Should have a frequency property with a default 0 value', () => {
    expect(node.frequency).to.equal(0);
  })
})
