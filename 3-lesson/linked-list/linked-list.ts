type NodeType = {
  first?: NodeType | undefined;
  last?: NodeType | undefined;
  next?: NodeType | undefined;
  prev?: NodeType | undefined;
  value?: any;
}

class Node implements NodeType {
  value: NodeType | undefined = undefined;
  first: NodeType | undefined = undefined;
  last: NodeType | undefined = undefined;
  next: NodeType | undefined = undefined;
  prev: NodeType | undefined = undefined;

  constructor({value, next, prev}: NodeType) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

interface LinkedListType {
  first: NodeType | undefined;
  last: NodeType | undefined;

  add(value: any): void;
  [Symbol.iterator]: () => {
    next: () => ({value: any | undefined, done: boolean}),
  }
}

export class LinkedList implements LinkedListType {
  _isFirstIterator: boolean = true;
  _curIterator: NodeType | undefined = undefined;

  first: NodeType | undefined = undefined;
  last: NodeType | undefined = undefined;

  constructor() {}

  add(value: any) {
    const prevLast = this.last;
    const newNode = new Node({value, prev: prevLast})
    if (!this.first) {
      this.first = newNode
    }

    if (prevLast) {
      prevLast.next = newNode
    }
    this.last = newNode
  }

  [Symbol.iterator]() {
    let {_curIterator, first, _isFirstIterator} = this;
    return {
      next: function() {
        if (_isFirstIterator) {
          _isFirstIterator = false
          _curIterator = first
          return {value: _curIterator?.value, done: false}
        }
        if (_curIterator?.next) {
          _curIterator = _curIterator.next
        } else {
          return {value: undefined, done: true}
        }
        return {value: _curIterator?.value, done: false}
      },
    };
  };
}
