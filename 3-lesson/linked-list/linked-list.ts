export type NodeType = {
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

export interface LinkedListType {
  first: NodeType | undefined;
  last: NodeType | undefined;

  add(value: any): void;

  pushRight(value: any): NodeType;

  pushLeft(value: any): NodeType;

  removeLeft(): NodeType | undefined;

  removeRight(): NodeType | undefined;

  [Symbol.iterator]: () => {
    next: () => ({value?: any | undefined, done: boolean}),
  }
}

export class LinkedList implements LinkedListType {
  _isFirstIterator: boolean = true;
  _curIterator: NodeType | undefined = undefined;

  first: NodeType | undefined = undefined;
  last: NodeType | undefined = undefined;

  constructor() {}

  add(value: any) {
    this.pushRight(value);
  }

  pushRight(value: any) {
    const prevLast = this.last;
    const newNode = new Node({value, prev: prevLast})

    if (!this.first) {
      this.first = newNode
    }

    if (prevLast) {
      prevLast.next = newNode
    }

    this.last = newNode

    return newNode;
  }

  pushLeft(value: any) {
    const prevFirst = this.first;
    const newNode = new Node({value, next: prevFirst})

    if (!this.last) {
      this.last = newNode
    }

    if (prevFirst) {
      prevFirst.prev = newNode
    }

    this.first = newNode

    return newNode;
  }

  removeLeft() {
    const prevFirst = {...this.first};
    const newFirst = prevFirst?.next;

    if (newFirst) {
      newFirst.prev = undefined;
      this.first = newFirst;
    }
    if (!prevFirst.next && !prevFirst.prev) {
      this.first = undefined;
      this.last = undefined;
    }

    return prevFirst.value;
  }

  removeRight() {
    const prevLast = {...this.last};
    const newLast = prevLast?.prev;

    if (newLast) {
      newLast.next = undefined;
      this.last = newLast;
    }
    if (!prevLast.next && !prevLast.prev) {
      this.first = undefined;
      this.last = undefined;
    }

    return prevLast.value;
  }

  [Symbol.iterator]() {
    let {_curIterator, first, _isFirstIterator} = this;
    return {
      next: function() {
        if (_isFirstIterator) {
          _isFirstIterator = false
          _curIterator = {next: first}
        }
        if (_curIterator?.next) {
          _curIterator = _curIterator.next
          return {value: _curIterator?.value, done: false}
        }
        return {done: true}
      },
    };
  };
}
