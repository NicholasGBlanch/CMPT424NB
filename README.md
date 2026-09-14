Question 1:
    The first thing that stood out to me while working on this project was how minute every issue was. Something like a backspace button or a scrolling screen isn't an function of importance because it seems almost prebuilt. Having to work on this allowed my brain to pay attention to smaller things instead of the bigger picture you usually (or maybe just me) think of when we make something like a website. This somewhat mirrors the "ancient" UNIX issues being small necessities, rather than the luxuries of working on big picture. Additionally, working on the project I was able to grasp the need for abstraction, as we focused on making the program more easy to use through secondary functions, rather than adding features to what the machine does proper. Options like erase processing and history lookup are just as important as adding the ability to insult the user at their whim. (Some would argue moreso..) The layers of abstraction through pressing on the physical keyboard, into the website, through the functional files running on Visual Code and then back to the website was novel, in its granularity. 




2025 Browser-based Operating System in TypeScript
=================================================

This is Alan's Operating Systems class initial project.
See https://www.labouseur.com/courses/os/ for details.
It was originally developed by Alan and then enhanced by Bob Nisco and Rebecca Murphy over the years.
Fork this (or clone, but fork is probably better in case Alan changes anything about the initial project) into your own private repository. Or download it as a ZIP file. Then add Alan (userid *Labouseur*) as a collaborator.

Setup TypeScript
================

1. Install the [npm](https://www.npmjs.org/) package manager if you don't already have it.
1. Run `npm install -g typescript` to get the TypeScript Compiler. (You may need to do this as root.)


Workflow
=============

Some IDEs (e.g., Visual Studio Code, IntelliJ, others) natively support TypeScript-to-JavaScript compilation 
and have tools for debugging, syntax highlighting, and more.
If your development environment lacks these then you'll need to automate the compilation process with something like Gulp.

- Setup Gulp
1. `npm install -g gulp` to get the Gulp Task Runner.
1. `npm install -g gulp-tsc` to get the Gulp TypeScript plugin.

Run `gulp` at the command line in the root directory of this project.
Edit your TypeScript files in the source/scripts directory.

Gulp will automatically:

* Watch for changes in your source/scripts/ directory for changes to .ts files and run the TypeScript Compiler on them.
* Watch for changes to your source/styles/ directory for changes to .css files and copy them to the distrib/ folder if you have them there.


I find Gulp annoying, so consider use a compile script from the command line.

A Few Notes
===========

**What's TypeScript?**
TypeScript is a language that allows you to write in a statically-typed language that outputs standard JavaScript.
It's all kinds of awesome.

**Why should I use it?**
This will be especially helpful for an OS or a Compiler that may need to run in the browser as you will have all of the great benefits of strong type checking and scope rules built right into your language.

**Where can I get more info on TypeScript**
[Right this way!](http://www.typescriptlang.org/)
