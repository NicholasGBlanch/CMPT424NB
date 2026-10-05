var TSOS;
(function (TSOS) {
    class PCB {
        pid;
        state = "Resident";
        PC = 0;
        IR = 0;
        Acc = 0;
        Xreg = 0;
        Yreg = 0;
        Zflag = 0;
        constructor(pid) {
            this.pid = pid;
        }
    }
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map