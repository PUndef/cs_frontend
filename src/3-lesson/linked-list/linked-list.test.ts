import { LinkedList } from "./linked-list";


describe('3 lesson is correct', () => {
  test("LinkedList work correctly", () => {
    const list = new LinkedList();
    expect(JSON.stringify([...list])).toBe(JSON.stringify([]))
    list.add(1);
    // [1]
    expect(list?.first?.value).toBe(1);
    expect(list?.last?.value).toBe(1);
    list.add(20);
    // [1, 20]
    expect(list?.first?.value).toBe(1);
    expect(list?.last?.value).toBe(20);
    expect(list?.last?.prev?.value).toBe(1);
    list.add(3);
    // [1, 20, 3]
    expect(list?.first?.value).toBe(1);
    expect(list?.last?.value).toBe(3);
    expect(list?.first?.next?.value).toBe(20);
    expect(list?.first?.next?.prev?.value).toBe(1);
    // iteration by list is equal [1, 20, 3]
    expect(JSON.stringify([...list])).toBe(JSON.stringify([1, 20, 3]))

    const lastRemoved = list.removeRight();
    expect(lastRemoved).toBe(3);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([1, 20]))
    const firstRemoved = list.removeLeft();
    expect(firstRemoved).toBe(1);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([20]))
    const firstRemoved1 = list.removeLeft();
    expect(firstRemoved1).toBe(20);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([]))
  });

  test("LinkedList remove work correctly", () => {
    const list = new LinkedList();
    list.add(1);
    list.add(20);
    list.add(3);

    const lastRemoved = list.removeRight();
    expect(lastRemoved).toBe(3);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([1, 20]))
    const firstRemoved = list.removeLeft();
    expect(firstRemoved).toBe(1);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([20]))
    const firstRemoved1 = list.removeLeft();
    expect(firstRemoved1).toBe(20);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([]))
  });

  test("LinkedList add work correctly", () => {
    const list = new LinkedList();
    list.pushLeft(1);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([1]))
    list.pushLeft(20);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([20, 1]))
    list.pushRight(3);
    expect(JSON.stringify([...list])).toBe(JSON.stringify([20, 1, 3]))
  });
})