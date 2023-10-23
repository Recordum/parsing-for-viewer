import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Node } from './tree/node';
import { IndexTree } from './tree/index-tree';

@Injectable()
export class AppService {
  private id = 0;
  async parse() {
    const tree: IndexTree = new IndexTree();
    const res = await axios.get(
      'https://docs.google.com/document/d/e/2PACX-1vRoP2mQlaCSPLtr4w515TGQ7HYIh3Q2mFzfe04nItJniMQ3rKArsn0XcVBDrYHhmjDtAZolN1RTOn36/pub',
    );

    const dom = new JSDOM(res.data);
    const document = dom.window.document;
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1)); // h1 -> 1, h2 -> 2, ...
      const text = heading.textContent || heading.innerText;
      console.log(level);
      console.log(text);
      const newNode: Node = new Node(this.id, text, level);
      tree.addNode(newNode);
      this.id++;
    });
    const treeJson = tree.toJSON();
    console.log(JSON.stringify(treeJson, null, 2));
  }
}
