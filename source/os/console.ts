/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "",
                    public commandHistory = [],
                    public historyIndex = 0) {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        public clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        public resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {

            while (_KernelInputQueue.getSize() > 0) {

                var chr = _KernelInputQueue.dequeue();

                // Enter
                if (chr === String.fromCharCode(13)) {

                    if (this.buffer.length > 0) {
                        this.commandHistory.push(this.buffer);
                    }

                    this.historyIndex = this.commandHistory.length;

                    _OsShell.handleInput(this.buffer);
                    this.buffer = "";
                }

                // Backspace
                else if (chr === String.fromCharCode(8)) {

                    if (this.buffer.length > 0) {

                        var lastChar = this.buffer.charAt(
                            this.buffer.length - 1
                        );

                        var charWidth = _DrawingContext.measureText(
                            this.currentFont,
                            this.currentFontSize,
                            lastChar
                        );

                        this.currentXPosition -= charWidth;

                        _DrawingContext.clearRect(
                            this.currentXPosition,
                            this.currentYPosition - this.currentFontSize,
                            charWidth,
                            this.currentFontSize +
                            _DrawingContext.fontDescent(
                                this.currentFont,
                                this.currentFontSize
                            )
                        );

                        this.buffer = this.buffer.substring(
                            0,
                            this.buffer.length - 1
                        );
                    }
                }

                // Tab completion
                else if (chr === String.fromCharCode(9)) {

                    var matches = [];

                    for (var i = 0; i < _OsShell.commandList.length; i++) {

                        var command = _OsShell.commandList[i].command;

                        if (command.indexOf(this.buffer) === 0) {
                            matches.push(command);
                        }
                    }

                    if (matches.length === 1) {

                        var completion = matches[0].substring(
                            this.buffer.length
                        );

                        this.putText(completion);
                        this.buffer += completion;
                    }
                }

                // Up Arrow
                else if (chr === "UP") {

                    if (this.commandHistory.length > 0) {

                        if (this.historyIndex > 0) {
                            this.historyIndex--;
                        }

                        this.clearCurrentInput();

                        this.buffer =
                            this.commandHistory[this.historyIndex];

                        this.putText(this.buffer);
                    }
                }

                // Down Arrow
                else if (chr === "DOWN") {

                    if (this.commandHistory.length > 0) {

                        if (this.historyIndex <
                            this.commandHistory.length - 1) {

                            this.historyIndex++;

                            this.clearCurrentInput();

                            this.buffer =
                                this.commandHistory[this.historyIndex];

                            this.putText(this.buffer);
                        }

                        else {

                            this.historyIndex =
                                this.commandHistory.length;

                            this.clearCurrentInput();

                            this.buffer = "";
                        }
                    }
                }

                // Normal character
                else {

                    this.putText(chr);
                    this.buffer += chr;
                }
            }
        }

        public clearCurrentInput(): void {

            if (this.buffer.length > 0) {

                var inputWidth = _DrawingContext.measureText(
                    this.currentFont,
                    this.currentFontSize,
                    this.buffer
                );

                this.currentXPosition -= inputWidth;

                _DrawingContext.clearRect(
                    this.currentXPosition,
                    this.currentYPosition - this.currentFontSize,
                    inputWidth,
                    this.currentFontSize +
                    _DrawingContext.fontDescent(
                        this.currentFont,
                        this.currentFontSize
                    )
                );
            }
        }

        public putText(text): void {

            if (text !== "") {

                _DrawingContext.drawText(
                    this.currentFont,
                    this.currentFontSize,
                    this.currentXPosition,
                    this.currentYPosition,
                    text
                );

                var offset = _DrawingContext.measureText(
                    this.currentFont,
                    this.currentFontSize,
                    text
                );

                this.currentXPosition =
                    this.currentXPosition + offset;
            }
        }

        public advanceLine(): void {

            this.currentXPosition = 0;

            var lineHeight =
                _DefaultFontSize +
                _DrawingContext.fontDescent(
                    this.currentFont,
                    this.currentFontSize
                ) +
                _FontHeightMargin;

            this.currentYPosition += lineHeight;

            if (this.currentYPosition > _Canvas.height) {

                var imageData = _DrawingContext.getImageData(
                    0,
                    lineHeight,
                    _Canvas.width,
                    _Canvas.height - lineHeight
                );

                this.clearScreen();

                _DrawingContext.putImageData(
                    imageData,
                    0,
                    0
                );

                this.currentYPosition -= lineHeight;
            }
        }
    }
}
