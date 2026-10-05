/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    class Shell {
        // Properties
        promptStr = ">";
        commandList = [];
        curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        apologies = "[sorry]";
        constructor() {
        }
        init() {
            var sc;
            //
            // Load the command list.
            //
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays the current location.");
            this.commandList[this.commandList.length] = sc;
            // insult
            sc = new TSOS.ShellCommand(this.shellInsult, "insult", "- Gives the user a random insult.");
            this.commandList[this.commandList.length] = sc;
            // status
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - Sets the taskbar status message.");
            this.commandList[this.commandList.length] = sc;
            // bsod
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", "- Tests the FumOS blue screen of death.");
            this.commandList[this.commandList.length] = sc;
            // load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Validates the program entered in User Program Input.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            // Display the initial prompt.
            this.putPrompt();
        }
        putPrompt() {
            _StdOut.putText(this.promptStr);
        }
        handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            // Parse the input.
            var userCommand = this.parseInput(buffer);
            // Assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }
        execute(fn, args) {
            _StdOut.advanceLine();
            fn(args);
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            this.putPrompt();
        }
        parseInput(buffer) {
            var retVal = new TSOS.UserCommand();
            // Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // Lower-case it.
            buffer = buffer.toLowerCase();
            // Separate command and arguments.
            var tempList = buffer.split(" ");
            var cmd = tempList.shift();
            cmd = TSOS.Utils.trim(cmd);
            retVal.command = cmd;
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }
        //
        // Shell Command Functions
        //
        shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }
        shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }
        shellApology() {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        }
        shellVer(args) {
            _StdOut.putText("FumOS version 1.0 - Nicholas Blanchard");
        }
        shellDate(args) {
            var currentDate = new Date();
            _StdOut.putText(currentDate.toLocaleString());
        }
        shellWhereAmI(args) {
            _StdOut.putText("You are inside FumOS.");
        }
        shellInsult(args) {
            var insults = [
                "Unruly Beast",
                "Leftovers",
                "Impetuous Hound",
                "Useless"
            ];
            var randomIndex = Math.floor(Math.random() * 4);
            _StdOut.putText(insults[randomIndex]);
        }
        shellStatus(args) {
            if (args.length > 0) {
                var status = args.join(" ");
                var statusText = document.getElementById("statusText");
                statusText.innerHTML = "Status: " + status;
            }
            else {
                _StdOut.putText("Usage: status <string>");
            }
        }
        // Tests the kernel trap / blue screen of death.
        shellBSOD(args) {
            _Kernel.krnTrapError("Test BSOD");
        }
        // Loads the user program into memory and displays its PID.
        shellLoad(args) {
            var programInput = document.getElementById("taProgramInput").value;
            try {
                var pcb = _MemoryManager.loadProgram(programInput);
                _StdOut.putText("Program loaded. PID: " + pcb.pid);
            }
            catch (error) {
                var message = error instanceof Error
                    ? error.message
                    : String(error);
                _StdOut.putText("Error: " + message);
            }
        }
        shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " +
                    _OsShell.commandList[i].command +
                    " " +
                    _OsShell.commandList[i].description);
            }
        }
        shellShutdown(args) {
            _StdOut.putText("Shutting down...");
            _Kernel.krnShutdown();
        }
        shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }
        shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }
        shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }
        shellRot13(args) {
            if (args.length > 0) {
                _StdOut.putText(args.join(' ') +
                    " = '" +
                    TSOS.Utils.rot13(args.join(' ')) +
                    "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }
        shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
    }
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=shell.js.map