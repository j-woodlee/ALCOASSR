# ALCOASSR
Projects for Alameda County Assessor

## Convert XLSM to XLSX Documentation

Basic structure:
  node ./convertxlsmtoxlsx.js \<agency\> \<year\> \<month\>


## Development Environment

First, install Git.  Git is a command line utility developed by Linus Torvalds (creator of Linux)
to manage code repositories.  The download for windows can be found here: https://gitforwindows.org/.
The install wizard will have a lot of options, it really doesn't matter for the most part what you choose (and it can be changed later)
but make sure it can be accessed via windows Powershell.  Meaning, by opening Powershell and running \"git --version\"
you actually see a version number rather than an error.

Then, install Node.js.  Node.js is a Javascript framework with a nice package manager
which gives you access to a bunch of different functionality (like working with excel and PDFs). https://nodejs.org/en/
Just go through the wizard there really are not any weird options.

Those are the only things you need to download.

Open Powershell and navigate to a directory of your choice where you can store code (use the \"cd\" command to change directories).

Then clone this repo by running the command:  \"git clone https://github.com/j-woodlee/ALCOASSR.git\"

Now that the repository is on your computer it is super easy to grab updates from the server I'm storing this
on.  Move into the repository by running \"cd ALCOASSR\"

You can now simply run the script by typing: \"node ./convertxlsmtoxlsx.js Alameda 2018 10\" (or insert whatever parameters you want)

This script will make a new file in the P drive (in the test repository) depending on parameters.
