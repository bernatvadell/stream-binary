import { BinaryReader, BinaryWriter } from '.';
import { assert } from 'chai';

describe('Tests common between BE & LE', () => {
    it('[BE/LE] Write binary byte', () => {
        const writer = new BinaryWriter();

        writer.writeByte(255);
        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, 'ff');
    });

    it('[BE/LE] Write multiple binary byte', () => {
        const writer = new BinaryWriter();

        writer.writeByte(68);
        writer.writeByte(50);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '4432');
    });

    it('[BE/LE] Write empty string', () => {
        const writer = new BinaryWriter();

        writer.writeString('');

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '0000');
    });

    it('[BE/LE] Seek', () => {
        const writer = new BinaryWriter();
        writer.writeByte(200);
        writer.seek(0);
        writer.writeByte(100);

        const result1 = writer.getBuffer();

        assert.equal(result1.toString('hex'), '64');
    });

    it('[BE/LE] Get current offset', () => {
        const reader = new BinaryWriter();

        reader.writeByte(10);
        reader.writeByte(20);

        assert.equal(reader.offset, 2);
    });

    it('[BE/LE] Write buffers', () => {
        const writer = new BinaryWriter();

        writer.writeBuffer(Buffer.from('ff', 'hex'));
        writer.writeBuffer(Buffer.from('20', 'hex'));

        const buffer = writer.getBuffer();

        assert.equal(buffer.length, 6);
        assert.equal(buffer.toString('hex'), '0001ff000120');
    });
});

describe('Tests BE', () => {
    it('[BE] Write binary string', () => {
        const writer = new BinaryWriter();

        writer.writeString('BinaryReaderWorking');

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '001342696e617279526561646572576f726b696e67');
    });

    it('[BE] Write multiple binary string', () => {
        const writer = new BinaryWriter();

        writer.writeString('BinaryReaderWorking');
        writer.writeString('WithMultiplesString');

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '001342696e617279526561646572576f726b696e670013576974684d756c7469706c6573537472696e67');
    });

    it('[BE] Write binary short', () => {
        const writer = new BinaryWriter();

        writer.writeShort(19);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '0013');
    });

    it('[BE] Read multiple binary short', () => {
        const writer = new BinaryWriter();

        writer.writeShort(4500);
        writer.writeShort(1800);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '11940708');
    });

    it('[BE] Write binary int', () => {
        const writer = new BinaryWriter();

        writer.writeInt(68457);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '00010b69');
    });

    it('[BE] Write multiple binary int', () => {
        const writer = new BinaryWriter();

        writer.writeInt(68457);
        writer.writeInt(80597);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '00010b6900013ad5');
    });

    it('[BE] Write binary float', () => {
        const writer = new BinaryWriter();

        writer.writeFloat(1234.1234);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '449a43f3');
    });

    it('[BE] Write binary double', () => {
        const writer = new BinaryWriter();

        writer.writeDouble(50.55);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '4049466666666666');
    });
});

describe('Tests LE', () => {
    it('[LE] Write binary string', () => {
        const writer = new BinaryWriter(true);

        writer.writeString('BinaryReaderWorking');

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '130042696e617279526561646572576f726b696e67');
    });

    it('[LE] Write multiple binary string', () => {
        const writer = new BinaryWriter(true);

        writer.writeString('BinaryReaderWorking');
        writer.writeString('WithMultiplesString');

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '130042696e617279526561646572576f726b696e671300576974684d756c7469706c6573537472696e67');
    });

    it('[LE] Write binary short', () => {
        const writer = new BinaryWriter(true);

        writer.writeShort(19);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '1300');
    });

    it('[LE] Read multiple binary short', () => {
        const writer = new BinaryWriter(true);

        writer.writeShort(4500);
        writer.writeShort(1800);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '94110807');
    });

    it('[LE] Write binary int', () => {
        const writer = new BinaryWriter(true);

        writer.writeInt(68457);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '690b0100');
    });

    it('[LE] Write multiple binary int', () => {
        const writer = new BinaryWriter(true);

        writer.writeInt(68457);
        writer.writeInt(80597);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '690b0100d53a0100');
    });

    it('[LE] Write binary float', () => {
        const writer = new BinaryWriter(true);

        writer.writeFloat(1234.1234);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, 'f3439a44');
    });

    it('[LE] Write binary double', () => {
        const writer = new BinaryWriter(true);

        writer.writeDouble(50.55);

        const buffer = writer.getBuffer();
        const bufferHex = buffer.toString('hex');

        assert.equal(bufferHex, '6666666666464940');
    });
});
