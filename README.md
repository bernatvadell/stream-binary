# Stream Binary for JavaScript

## Overview
It is a library designed to optimize the size of the messages we send over the network.

## How to use
The library is separated into two main classes, one for reading and another for writing.

The best way to teach how it is used is with an example, so let's go.

### BinaryWriter example
```ts
// Initialize BinaryWritter
const writer = new BinaryWriter();

// Write any string
writer.writeString('BinaryReaderWorking');

const buffer = writer.getBuffer();
const bufferHex = buffer.toString('hex'); // 001342696e617279526561646572576f726b696e67
```

### BinaryReader example
```ts
// Buffer to read (message packet)
const buffer = Buffer.from('001342696e617279526561646572576f726b696e67', 'hex');
// Initialize BinaryReader with entry buffer
const reader = new BinaryReader(buffer);
// read buffer content
const result = reader.readString();
```

### Suported types
- string (set a two-byte prefix to know the size of the string.)
- short
- int
- byte