import { parentPort } from 'worker_threads';

const doCalc = (buff: Buffer, byte: number) => {
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += ((buff.length * i) % 7) + byte;
  }
  return sum + Math.floor(buff.length / 2) + 100;
};

parentPort!.on('message', (buff: Buffer) => {
  let count = 0;

  for (const byte of buff) {
    count += doCalc(buff, byte);
  }

  parentPort!.postMessage(count);
});
