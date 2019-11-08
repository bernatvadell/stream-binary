export class BinaryWriter {
    private fieldBuffers: Uint8Array[] = [];

    private writeInt16: (value: number, offset: number) => number;
    private writeInt32: (value: number, offset: number) => number;

    constructor(
        private littleEndian: boolean = false,
    ) {
        this.writeInt16 = (this.littleEndian ? Buffer.prototype.writeInt16LE : Buffer.prototype.writeInt16BE);
        this.writeInt32 = (this.littleEndian ? Buffer.prototype.writeInt32LE : Buffer.prototype.writeInt32BE);
    }

    public writeByte(byte: number) {
        this.fieldBuffers.push(new Uint8Array([byte]));
    }

    public writeShort(value: number) {
        const buffer = Buffer.alloc(2);
        this.writeInt16.call(buffer, value, 0);
        this.fieldBuffers.push(buffer);
    }

    public writeInt(value: number) {
        const buffer = Buffer.alloc(4);
        this.writeInt32.call(buffer, value, 0);
        this.fieldBuffers.push(buffer);
    }

    public writeString(value: string) {
        this.writeShort(value.length);
        if (value.length > 0) {
            this.fieldBuffers.push(Buffer.from(value, 'utf-8'));
        }
    }

    public getBuffer(): Buffer {
        return Buffer.concat(this.fieldBuffers);
    }
}
