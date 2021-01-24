import { Buffer } from 'buffer';

const BUFFER_CHUNK_LENGTH = 1024;

export class BinaryWriter {
    private fieldOffset: number = 0;
    private fieldBuffer: Buffer = Buffer.alloc(BUFFER_CHUNK_LENGTH);
    private fieldLength: number = 0;

    private writeInt16: (value: number, offset: number) => number;
    private writeInt32: (value: number, offset: number) => number;
    private writeFloat16: (value: number, offset: number) => number;
    private writeFloat32: (value: number, offset: number) => number;

    public get offset(): number {
        return this.fieldOffset;
    }

    public get length(): number {
        return this.fieldLength;
    }

    constructor(
        private littleEndian: boolean = false,
    ) {
        this.writeInt16 = (this.littleEndian ? Buffer.prototype.writeInt16LE : Buffer.prototype.writeInt16BE);
        this.writeInt32 = (this.littleEndian ? Buffer.prototype.writeInt32LE : Buffer.prototype.writeInt32BE);
        this.writeFloat16 = (this.littleEndian ? Buffer.prototype.writeFloatLE : Buffer.prototype.writeFloatBE);
        this.writeFloat32 = (this.littleEndian ? Buffer.prototype.writeDoubleLE : Buffer.prototype.writeDoubleBE);
    }

    public seek(offset: number) {
        this.fieldOffset = offset;
    }

    public writeByte(byte: number) {
        this.alloc(1);
        this.fieldBuffer[this.fieldOffset] = byte;
        this.fieldOffset++;
    }

    public writeShort(value: number) {
        this.alloc(2);
        this.writeInt16.call(this.fieldBuffer, value, this.fieldOffset);
        this.fieldOffset += 2;
    }

    public writeInt(value: number) {
        this.alloc(4);
        this.writeInt32.call(this.fieldBuffer, value, this.fieldOffset);
        this.fieldOffset += 4;
    }

    public writeFloat(value: number) {
        this.alloc(4);
        this.writeFloat16.call(this.fieldBuffer, value, this.fieldOffset);
        this.fieldOffset += 4;
    }

    public writeDouble(value: number) {
        this.alloc(8);
        this.writeFloat32.call(this.fieldBuffer, value, this.fieldOffset);
        this.fieldOffset += 8;
    }

    public writeString(value: string) {
        this.alloc(value.length + 2);
        this.writeShort(value.length);

        if (value.length > 0) {
            const stringBuffer = Buffer.from(value, 'utf-8');
            stringBuffer.copy(this.fieldBuffer, this.fieldOffset);
            this.fieldOffset += value.length;
        }
    }

    public writeBuffer(buffer: Buffer) {
        this.alloc(buffer.length + 2);
        this.writeShort(buffer.length);
        buffer.copy(this.fieldBuffer, this.fieldOffset);
        this.fieldOffset += buffer.length;
    }

    public getBuffer(): Buffer {
        return this.fieldBuffer.slice(0, this.fieldLength);
    }

    private alloc(byteLength: number) {
        if (this.offset + byteLength > this.fieldLength) {
            let len = this.fieldLength;
            do {
                len += BUFFER_CHUNK_LENGTH;
            } while (this.offset + byteLength > len);
            const tmp = Buffer.alloc(len);
            this.fieldBuffer.copy(tmp, 0);
            this.fieldBuffer = tmp;
            this.fieldLength = this.offset + byteLength;
        }
    }
}
