import { deflateSync } from 'zlib';
import { Node } from './node';

export class IndexTree {
  root: Node;
  currentNode: Node;

  constructor() {
    this.root = new Node(-1, 'root', 0);
    this.currentNode = this.root;
  }

  addNode(node: Node) {
    while (true) {
      if (this.currentNode.level < node.level) {
        this.currentNode.children.push(node);
        node.parent = this.currentNode;
        this.currentNode = node;
        return;
      }
      if (this.currentNode.level === node.level) {
        this.currentNode.parent.children.push(node);
        node.parent = this.currentNode.parent;
        this.currentNode = node;
        return;
      }
      if (this.currentNode.level > node.level) {
        this.currentNode = this.currentNode.parent;
        continue;
      }
    }
  }
  toJSON(node: Node = this.root): any {
    const nodeData = {
      id: node.id,
      text: node.text,
      level: node.level,
      children: node.children.map((child) => this.toJSON(child)),
    };

    if (node.id === -1) {
      return nodeData.children;
    }
    return nodeData;
  }
}
