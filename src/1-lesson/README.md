# ДЗ к лекции База#1

## Посмотреть лекции на канале AlekOS

- _[Как работает процессор](https://www.youtube.com/watch?v=k9wK2FThEsk)_
- _[Как работать с битами](https://www.youtube.com/watch?v=qewavPO6jcA)_
- _[Как работают числа с плавающей точкой](https://www.youtube.com/watch?v=U0U8Ddx4TgE)_
- _[Как работают отрицательные числа](https://www.youtube.com/watch?v=BIYiuy8WWiU)_
- _[Системы счисления с нуля](https://www.youtube.com/watch?v=kG_ipMygRUc)_

## Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента

```js
const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]))

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)) // 1
console.log(bitGetter.get(1, 1)) // 0
```

## Расширить функцию из прошлого задания возможностью изменять значение конкретного бита

```js
const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]))

// Второй параметр это порядок бита "справа-налево"
console.log(bitAccessor.set(0, 1, 0)) //
console.log(bitAccessor.get(0, 1)) // 0
```

# Выжимка из теории

Опустим момент с получением элемента из Uint8Array. Это тривиальная операция.

## Получение бита

Для получения бита используется следующее выражение:

```js
;(number & (1 << bitIndex)) != 0 ? 1 : 0
```

| :memo: Отсчёт индекса идёт справа-налево! |
| ----------------------------------------- |


Разберём выражение по шагам:

- `1 << bitIndex` - это выражение делает сдвиг влево числа **1** на нужный нам индекс. К примеру мы хотим получить бит по индексу **1**. В таком случае выражение будет таким `1 << 1` => `00000001 << 1 = 00000010`. Как видим по выражению оно сдвигает число **1** левее. Напротив бита значение которого мы хотим получить;
- `(number & 00000010)` - распишем подробнее на примере числа 14: `00001110 & 00000010`

| 0   | 0   | 0   | 0   | 1   | 1   | 1   | 0   | 14 (битовое представление)    |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------- |
| 0   | 0   | 0   | 0   | 0   | 0   | 1   | 0   | 2 (результат сдвига 1 на 1)   |
| 0   | 0   | 0   | 0   | 0   | 0   | 1   | 0   | 2 (результат оператора **&**) |

- как видим в результате получилось число 2. `2 !== 0` и соответственно значение бита в этом случае равно **1**.

| :memo: В случае, если бы целевой бит был равен 0, то при применении оператора **&** мы бы получили все 0 |
| -------------------------------------------------------------------------------------------------------- |


## Установка бита

- Для установки бита в 0 и в 1 используются разные операторы

### Установка бита в 0:

```js
number & ~(1 << bitIndex)
```

- `number &~(1 << bitIndex)` - опустим сдвиг, он был разобран выше;
- `00001110 & ~ 00000010` - рассмотрим пример на числе 14;
- `00001110 & 11111101` - сначала применим инверсию;

| 0   | 0   | 0   | 0   | 1   | 1   | 1     | 0   | 14 (битовое представление)          |
| --- | --- | --- | --- | --- | --- | ----- | --- | ----------------------------------- |
| 1   | 1   | 1   | 1   | 1   | 1   | 0     | 1   | сдвиг с последующей инверсией       |
| 0   | 0   | 0   | 0   | 1   | 1   | **0** | 0   | результат, бит был изменён с 1 на 0 |

### Установка бита в 1:

```js
number | (1 << bitIndex)
```

- `number | (1 << bitIndex)` - опустим сдвиг, он был разобран выше;
- `00001101 | 00000010` - рассмотрим пример на числе 13;

| 0   | 0   | 0   | 0   | 1   | 1   | 0     | 1   | 13 (битовое представление)          |
| --- | --- | --- | --- | --- | --- | ----- | --- | ----------------------------------- |
| 0   | 0   | 0   | 0   | 0   | 0   | 1     | 0   | 2 (результат сдвига 1 на 1)         |
| 0   | 0   | 0   | 0   | 1   | 1   | **1** | 1   | результат, бит был изменён с 0 на 1 |

# Решение

```js
const _getBit = (number: number, bitIndex: number): BinaryValue => {
  const mask = 1 << bitIndex
  return (number & mask) != 0 ? 1 : 0
}

const _setBit = (
  bytes: Uint8Array,
  byteIndex: number,
  bitIndex: number,
  value: BinaryValue
): void => {
  const mask = 1 << bitIndex
  if (value === 1) {
    bytes[byteIndex] = bytes[byteIndex] | mask
  } else {
    bytes[byteIndex] = bytes[byteIndex] & ~mask
  }
}
```