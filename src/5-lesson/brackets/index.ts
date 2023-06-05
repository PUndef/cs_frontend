import { Stack } from "../../4-lesson";

const brackets = ['(', ')', '{', '}', '[', ']']
type BracketsT = '(' | ')' | '{' | '}' | '[' | ']'

const isBracket = (char: string) => {
  return brackets.includes(char)
}

const isCorrectPair = (prev: BracketsT, next: BracketsT) => {
  if (prev === '(' && next === ')') {
    return true
  }
  if (prev === '{' && next === '}') {
    return true
  }
  if (prev === '[' && next === ']') {
    return true
  }
  return false
}

export const bracketsIsValid = (str: string) => {
  const stack = new Stack<BracketsT>();
  const arrStr = str.split('');

  arrStr.forEach((char) => {
    const typedChar = char as BracketsT
    if (isCorrectPair(stack.head, typedChar)) {
      stack.pop();
      return;
    }
    if (isBracket(typedChar)) {
      stack.push(typedChar);
    }
  })
  return stack.length === 0
}
