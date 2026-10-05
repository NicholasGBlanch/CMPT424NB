module TSOS {

    export class PCB {

        public state: string = "Resident";

        public PC: number = 0;
        public IR: number = 0;
        public Acc: number = 0;
        public Xreg: number = 0;
        public Yreg: number = 0;
        public Zflag: number = 0;

        constructor(public pid: number) {
        }
    }
}