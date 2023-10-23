export class Node {
  id: number;
  text: string;
  children: Node[] | null;
  parent: Node | null;
  level: number;

  constructor(id: number, text: string, level: number) {
    this.id = id;
    this.text = text;
    this.level = level;
    this.children = [];
  }
}
