module TSOS {

    export class MemoryAccessor {

        constructor(private memory: Memory) {
        }

        public read(address: number): number {
            this.checkAddress(address);
            return this.memory.bytes[address];
        }

        public write(address: number, value: number): void {
            this.checkAddress(address);

            if (!Number.isInteger(value) || value < 0 || value > 255) {
                throw new Error("Invalid byte value: " + value);
            }

            this.memory.bytes[address] = value;
        }

        private checkAddress(address: number): void {
            if (!Number.isInteger(address) ||
                address < 0 ||
                address >= this.memory.size) {

                throw new Error("Memory address out of bounds: " + address);
            }
        }
    }
}