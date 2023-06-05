# ДЗ к лекции База#2

## Посмотреть лекции на канале AlekOS

- [Как работает память компьютера](https://www.youtube.com/watch?v=Wh22_O8jXVQ)
- [История одного килобайта](https://www.youtube.com/watch?v=6n8gALZzBx4)
- [Как работает кэш процессора](https://www.youtube.com/watch?v=7n_8cOBpQrg)

## Написать фильтры для изображения в Canvas

```js
// Необходимо написать функции, которые бы принимали ссылку на изображение или canvas и применяла бы к нему один из эффектов.
// Например, инверсия цветов или оттенки серого. Для реализации эффектов, необходимо использовать методы Canvas getImageData/putImageData
// и работа с цветами пикселей. Возвращать такая функция может ссылку на Canvas или ImageData.

const grayscaled = grayscale('/myImage.jpeg')
const inversed = inverse(grayscaled)
```

## Написать функцию кодирования информации по схеме

```js
const schema = [
  [3, 'number'][(2, 'number')][(1, 'boolean')][(1, 'boolean')][(16, 'ascii')] // 3 бита число // 3 бита число // 1 бит логический // 1 бит логический // 16 бит 2 аски символа
]

// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, 'ab'], schema)
```

## Написать функцию парсинга ArrayBuffer из прошлого задания по схеме

```js
const schema = [
  [3, 'number'][(2, 'number')][(1, 'boolean')][(1, 'boolean')][(16, 'ascii')] // 3 бита число // 3 бита число // 1 бит логический // 1 бит логический // 16 бит 2 аски символа
]

// Если данные не подходят схеме - выбрасывать исключения с пояснением
console.log(decode(data, schema)) // [2, 3, true, false, 'ab']
```

# Решение

## Написать фильтры для изображения в Canvas

```js
**./inverse.ts**

const inverse = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  return imageData
}

**./grayscale.ts**

const grayscale = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return imageData
}

```
