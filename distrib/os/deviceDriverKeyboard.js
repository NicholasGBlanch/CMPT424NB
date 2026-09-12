/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    class DeviceDriverKeyboard extends TSOS.DeviceDriver {
        constructor() {
            // Override the base method pointers.
            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
        }
        krnKbdDispatchKeyPress(params) {
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Letters A-Z
            if ((keyCode >= 65) && (keyCode <= 90)) {
                if (isShifted === true) {
                    chr = String.fromCharCode(keyCode);
                }
                else {
                    chr = String.fromCharCode(keyCode + 32);
                }
                _KernelInputQueue.enqueue(chr);
            }
            // Numbers 0-9
            else if ((keyCode >= 48) && (keyCode <= 57)) {
                if (isShifted === true) {
                    var shiftedNumbers = {
                        48: ")",
                        49: "!",
                        50: "@",
                        51: "#",
                        52: "$",
                        53: "%",
                        54: "^",
                        55: "&",
                        56: "*",
                        57: "("
                    };
                    chr = shiftedNumbers[keyCode];
                }
                else {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            }
            // Space
            else if (keyCode == 32) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            // Enter
            else if (keyCode == 13) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            // Backspace
            else if (keyCode == 8) {
                chr = String.fromCharCode(8);
                _KernelInputQueue.enqueue(chr);
            }
            // Tab
            else if (keyCode == 9) {
                chr = String.fromCharCode(9);
                _KernelInputQueue.enqueue(chr);
            }
            // Up Arrow
            else if (keyCode == 38) {
                _KernelInputQueue.enqueue("UP");
            }
            // Down Arrow
            else if (keyCode == 40) {
                _KernelInputQueue.enqueue("DOWN");
            }
            // Punctuation and symbols
            else if ((keyCode >= 186) && (keyCode <= 222)) {
                var normalChars = {
                    186: ";",
                    187: "=",
                    188: ",",
                    189: "-",
                    190: ".",
                    191: "/",
                    192: "`",
                    219: "[",
                    220: "\\",
                    221: "]",
                    222: "'"
                };
                var shiftedChars = {
                    186: ":",
                    187: "+",
                    188: "<",
                    189: "_",
                    190: ">",
                    191: "?",
                    192: "~",
                    219: "{",
                    220: "|",
                    221: "}",
                    222: "\""
                };
                if (isShifted === true) {
                    chr = shiftedChars[keyCode];
                }
                else {
                    chr = normalChars[keyCode];
                }
                _KernelInputQueue.enqueue(chr);
            }
        }
    }
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverKeyboard.js.map