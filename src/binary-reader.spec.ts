import { BinaryReader } from '.';
import { assert } from 'chai';

describe('Tests common between BE & LE', () => {
    it('[BE/LE] Read binary byte', () => {
        const buffer = Buffer.from('FF', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readByte();

        assert.equal(result, 255);
    });

    it('[BE/LE] Read multiple binary byte', () => {
        const buffer = Buffer.from('4432', 'hex');
        const reader = new BinaryReader(buffer);

        const result1 = reader.readByte();
        const result2 = reader.readByte();

        assert.equal(result1, 68);
        assert.equal(result2, 50);
    });

    it('[BE/LE] Read empty string', () => {
        const buffer = Buffer.from('0000', 'hex');
        const reader = new BinaryReader(buffer);

        const result1 = reader.readString();

        assert.equal(result1, '');
    });

    it('[BE/LE] Seek', () => {
        const buffer = Buffer.from('4432', 'hex');
        const reader = new BinaryReader(buffer);

        reader.seek(1);

        const result1 = reader.readByte();

        assert.equal(result1, 50);
    });

    it('[BE/LE] Get current offset', () => {
        const buffer = Buffer.from('4432', 'hex');
        const reader = new BinaryReader(buffer);

        reader.readByte();
        reader.readByte();

        assert.equal(reader.offset, 2);
    });

    it('[BE/LE] Read buffers', () => {
        const buffer = Buffer.from('0001ff000120', 'hex');
        const reader = new BinaryReader(buffer);

        const bufferA = reader.readBuffer();
        const bufferB = reader.readBuffer();

        assert.equal(bufferA.toString('hex'), 'ff');
        assert.equal(bufferB.toString('hex'), '20');
    });
});

describe('Tests BE', () => {
    it('[BE] Read binary string', () => {
        const buffer = Buffer.from('001342696e617279526561646572576f726b696e67', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readString();

        assert.equal(result, 'BinaryReaderWorking');
    });

    it('[BE] Read binary string', () => {
        const buffer = Buffer.from('0013576974684d756c7469706c6573537472696e67', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readString();

        assert.equal(result, 'WithMultiplesString');
    });

    it('[BE] Read multiple binary string', () => {
        const buffer = Buffer.from('001342696e617279526561646572576f726b696e670013576974684d756c7469706c6573537472696e67', 'hex');
        const reader = new BinaryReader(buffer);

        const result1 = reader.readString();
        const result2 = reader.readString();

        assert.equal(result1, 'BinaryReaderWorking');
        assert.equal(result2, 'WithMultiplesString');
    });

    it('[BE] Read binary short', () => {
        const buffer = Buffer.from('0013', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readShort();

        assert.equal(result, 19);
    });

    it('[BE] Read multiple binary short', () => {
        const buffer = Buffer.from('11940708', 'hex');
        const reader = new BinaryReader(buffer);

        const result1 = reader.readShort();
        const result2 = reader.readShort();

        assert.equal(result1, 4500);
        assert.equal(result2, 1800);
    });

    it('[BE] Read binary int', () => {
        const buffer = Buffer.from('00010B69', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readInt();

        assert.equal(result, 68457);
    });

    it('[BE] Read multiple binary int', () => {
        const buffer = Buffer.from('00010B6900013AD5', 'hex');
        const reader = new BinaryReader(buffer);

        const result1 = reader.readInt();
        const result2 = reader.readInt();

        assert.equal(result1, 68457);
        assert.equal(result2, 80597);
    });

    it('[BE] Read binary float', () => {
        const buffer = Buffer.from('449a43f3', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readFloat();

        assert.equal(result, 1234.1234130859375);
    });

    it('[BE] Read binary double', () => {
        const buffer = Buffer.from('4049466666666666', 'hex');
        const reader = new BinaryReader(buffer);

        const result = reader.readDouble();

        assert.equal(result, 50.55);
    });
});

describe('Tests LE', () => {
    it('[LE] Read binary string', () => {
        const buffer = Buffer.from('001342696e617279526561646572576f726b696e67', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result = reader.readString();

        assert.equal(result, 'BinaryReaderWorking');
    });

    it('[LE] Read multiple binary string', () => {
        const buffer = Buffer.from('130042696e617279526561646572576f726b696e671300576974684d756c7469706c6573537472696e67', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result1 = reader.readString();
        const result2 = reader.readString();

        assert.equal(result1, 'BinaryReaderWorking');
        assert.equal(result2, 'WithMultiplesString');
    });

    it('[LE] Read binary short', () => {
        const buffer = Buffer.from('1300', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result = reader.readShort();

        assert.equal(result, 19);
    });

    it('[LE] Read multiple binary short', () => {
        const buffer = Buffer.from('94110807', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result1 = reader.readShort();
        const result2 = reader.readShort();

        assert.equal(result1, 4500);
        assert.equal(result2, 1800);
    });

    it('[LE] Read binary int', () => {
        const buffer = Buffer.from('BEEC0823', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result = reader.readInt();

        assert.equal(result, 587787454);
    });

    it('[LE] Read multiple binary int', () => {
        const buffer = Buffer.from('BEEC08233A750C20', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result1 = reader.readInt();
        const result2 = reader.readInt();

        assert.equal(result1, 587787454);
        assert.equal(result2, 537687354);
    });

    it('[LE] Read binary float', () => {
        const buffer = Buffer.from('f3439a44', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result = reader.readFloat();

        assert.equal(result, 1234.1234130859375);
    });

    it('[LE] Read binary double', () => {
        const buffer = Buffer.from('6666666666464940', 'hex');
        const reader = new BinaryReader(buffer, true);

        const result = reader.readDouble();

        assert.equal(result, 50.55);
    });
});
