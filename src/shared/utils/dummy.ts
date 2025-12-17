export const doCalc = (buff: Buffer<ArrayBuffer>, line: number) => {
  let sum = 0;

  for (let i = 0; i < 100; i++) {
    sum += ((buff.length * i) % 7) + line;
  }

  return sum + Math.floor(buff.length / 2) + 100;
};
