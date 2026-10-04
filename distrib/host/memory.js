var TSOS;
(function (TSOS) {
    class Memory {
        size;
        bytes;
        constructor(size = 256) {
            this.size = size;
            this.bytes = new Array(this.size);
            this.init();
        }
        init() {
            for (var i = 0; i < this.size; i++) {
                this.bytes[i] = 0;
            }
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map