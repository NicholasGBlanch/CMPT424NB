/* ------------
     CPU.ts

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    class Cpu {
        PC;
        Acc;
        IR;
        Xreg;
        Yreg;
        Zflag;
        isExecuting;
        constructor(PC = 0, Acc = 0, IR = 0, Xreg = 0, Yreg = 0, Zflag = 0, isExecuting = false) {
            this.PC = PC;
            this.Acc = Acc;
            this.IR = IR;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        init() {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.IR = 0;
            this.isExecuting = false;
        }
        fetchByte() {
            var value = _MemoryAccessor.read(this.PC);
            this.PC++;
            return value;
        }
        fetchAddress() {
            var lowByte = this.fetchByte();
            var highByte = this.fetchByte();
            return lowByte + (highByte * 256);
        }
        cycle() {
            if (!this.isExecuting) {
                return;
            }
            _Kernel.krnTrace("CPU cycle");
            try {
                this.IR = this.fetchByte();
                switch (this.IR) {
                    // Load a constant into the accumulator.
                    case 0xA9:
                        this.Acc = this.fetchByte();
                        break;
                    // Load a constant into X.
                    case 0xA2:
                        this.Xreg = this.fetchByte();
                        break;
                    // Load a constant into Y.
                    case 0xA0:
                        this.Yreg = this.fetchByte();
                        break;
                    // No operation.
                    case 0xEA:
                        break;
                    // Load the accumulator from memory.
                    case 0xAD:
                        this.Acc = _MemoryAccessor.read(this.fetchAddress());
                        break;
                    // Store the accumulator in memory.
                    case 0x8D:
                        _MemoryAccessor.write(this.fetchAddress(), this.Acc);
                        break;
                    // Add a memory byte to the accumulator.
                    case 0x6D:
                        this.Acc = (this.Acc +
                            _MemoryAccessor.read(this.fetchAddress())) & 0xFF;
                        break;
                    // Load X from memory.
                    case 0xAE:
                        this.Xreg = _MemoryAccessor.read(this.fetchAddress());
                        break;
                    // Load Y from memory.
                    case 0xAC:
                        this.Yreg = _MemoryAccessor.read(this.fetchAddress());
                        break;
                    // Compare X with a memory byte.
                    case 0xEC:
                        this.Zflag = (this.Xreg ===
                            _MemoryAccessor.read(this.fetchAddress())) ? 1 : 0;
                        break;
                    // Increment a memory byte.
                    case 0xEE:
                        var address = this.fetchAddress();
                        var value = _MemoryAccessor.read(address);
                        _MemoryAccessor.write(address, (value + 1) & 0xFF);
                        break;
                    // Branch when the previous comparison was unequal.
                    case 0xD0:
                        var offset = this.fetchByte();
                        if (this.Zflag === 0) {
                            this.PC = (this.PC + offset) % 256;
                        }
                        break;
                    // Request output through a software interrupt.
                    case 0xFF:
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SYSTEM_CALL_IRQ, [this.Xreg, this.Yreg]));
                        break;
                    // Request normal program termination.
                    case 0x00:
                        this.isExecuting = false;
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROCESS_EXIT_IRQ, []));
                        break;
                    default:
                        throw new Error("Unsupported opcode: " +
                            this.IR.toString(16).toUpperCase());
                }
            }
            catch (error) {
                this.isExecuting = false;
                var message = error instanceof Error
                    ? error.message
                    : String(error);
                _StdOut.putText("Execution error: " + message);
                _StdOut.advanceLine();
                _OsShell.putPrompt();
            }
        }
    }
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map