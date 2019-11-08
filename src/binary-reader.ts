export class BinaryReader {
    private fieldOffset: number = 0;

    private readInt16: (offset: number) => number;
    private readInt32: (offset: number) => number;

    public get offset() {
        return this.fieldOffset;
    }

    constructor(
        private buffer: Buffer,
        private littleEndian: boolean = false,
    ) {
        this.readInt16 = (this.littleEndian ? Buffer.prototype.readInt16LE : Buffer.prototype.readInt16BE);
        this.readInt32 = (this.littleEndian ? Buffer.prototype.readInt32LE : Buffer.prototype.readInt32BE);
    }

    public seek(offset: number) {
        this.fieldOffset = offset;
    }

    public readByte(): number {
        return this.buffer.subarray(this.fieldOffset++, this.fieldOffset)[0];
    }

    public readShort(): number {
        const value = this.readInt16.call(this.buffer, this.fieldOffset);
        this.fieldOffset += 2;
        return value;
    }

    public readInt(): number {
        const value = this.readInt32.call(this.buffer, this.fieldOffset);
        this.fieldOffset += 4;
        return value;
    }

    public readString(): string {
        const size = this.readShort();
        const value = size > 0 ? this.buffer.toString('utf-8', this.fieldOffset, this.fieldOffset + size) : '';
        this.fieldOffset += size;
        return value;
    }
}
