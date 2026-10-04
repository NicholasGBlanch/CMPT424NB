var TSOS;
(function (TSOS) {
    class MemoryAccessor {
        memory;
        constructor(memory) {
            this.memory = memory;
        }
        read(address) {
            this.checkAddress(address);
            return this.memory.bytes[address];
        }
        write(address, value) {
            this.checkAddress(address);
            if (!Number.isInteger(value) || value < 0 || value > 255) {
                throw new Error("Invalid byte value: " + value);
            }
            this.memory.bytes[address] = value;
        }
        checkAddress(address) {
            if (!Number.isInteger(address) ||
                address < 0 ||
                address >= this.memory.size) {
                throw new Error("Memory address out of bounds: " + address);
            }
        }
    }
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryAccessor.js.map