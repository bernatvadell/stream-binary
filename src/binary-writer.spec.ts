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
});
