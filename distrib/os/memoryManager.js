var TSOS;
(function (TSOS) {
    class MemoryManager {
        currentPCB = null;
        nextPID = 0;
        loadProgram(program) {
            if (_CPU.isExecuting) {
                throw new Error("Cannot load while a program is running.");
            }
            // Part Two allows hexadecimal digits and spaces.
            if (!/^[0-9a-fA-F ]+$/.test(program)) {
                throw new Error("Program must contain only hexadecimal digits and spaces.");
            }
            var hex = program.replace(/ /g, "");
            if (hex.length === 0) {
                throw new Error("No program entered.");
            }
            if (hex.length % 2 !== 0) {
                throw new Error("Each byte must contain two hex digits.");
            }
            var byteCount = hex.length / 2;
            if (byteCount > _Memory.size) {
                throw new Error("Program exceeds 256 bytes.");
            }
            // All validation passed. Replace the previous program.
            _Memory.init();
            for (var i = 0; i < byteCount; i++) {
                var byteText = hex.substring(i * 2, i * 2 + 2);
                var value = parseInt(byteText, 16);
                _MemoryAccessor.write(i, value);
            }
            this.currentPCB = new TSOS.PCB(this.nextPID);
            this.nextPID++;
            return this.currentPCB;
        }
    }
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map