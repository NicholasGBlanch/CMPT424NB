module TSOS {

    export class Memory {

        public bytes: number[];

        constructor(public size: number = 256) {
            this.bytes = new Array(this.size);
            this.init();
        }

        public init(): void {
            for (var i = 0; i < this.size; i++) {
                this.bytes[i] = 0;
            }
        }
    }
}