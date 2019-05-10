# ALCOASSR
Projects for Alameda County Assessor

## Convert XLSM to XLSX Documentation

Basic structure:
  node ./convertxlsmtoxlsx.js <agency> <year> <month>


## Development Environment

First, install Git.  Git is a command line utility developed by Linus Torvalds (creator of Linux)
to manage code repositories.  The download for windows can be found here: https://gitforwindows.org/

Then, install Node.js.  Node.js is a javascript framework with a nice package manager
which gives you access to a bunch of different functionality (like working with excel and PDFs).

Those are the only external programs you need.

Open Powershell (or git bash if you elected that option) and find a nice directory where you can store code.

Then clone this repo, run the command:  git clone https://github.com/j-woodlee/ALCOASSR.git

Once dependencies are installed, you can simply run the script by typing: "node ./convertxlsmtoxlsx.js Alameda 2018 10" (or insert whatever parameters you want)
