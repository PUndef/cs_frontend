import {ERROR_MESSAGES} from '../constants';
import { LinkedList, LinkedListType } from "../../3-lesson/linked-list/linked-list";

export class Dequeue {
  queue: LinkedListType | undefined = undefined;

  constructor() {
    const list = new LinkedList();
    this.queue = list;
  }

  get head() {
    return this.queue?.first?.value;
  }

  push(key: any) {
    this.queue?.pushRight(key)
  }

  pop() {
    const result = this.queue?.removeRight();
    if (!result) {
      throw new Error(ERROR_MESSAGES.QUEUE_IS_EMPTY);
    }
    return result
  }

  unshift(value: any) {
    return this.queue?.pushLeft(value);
  }

  shift() {
    return this.queue?.removeLeft();
  }
}
