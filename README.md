# ALCOASSR
Projects for Alameda County Assessor

## DEBE Documentation

note: node_modules were committed so NPM doesn't have to be used.  This is obviously not ideal, but it was done anyway for a variety of reasons.

Structure:
  node ./DEBE.js \<agency\> \<year\> \<month\>


## Development Environment / Installation


### Optional:
      First, install Git.  Git is a command line utility developed by Linus Torvalds (creator of Linux)
      to manage code repositories.  The download for windows can be found here: https://gitforwindows.org/.
      The install wizard will have a lot of options, it really doesn't matter for the most part what you choose (and it can be changed later)
      but make sure it can be accessed via windows Powershell.  Meaning, by opening Powershell and running "git --version"
      you actually see a version number rather than an error.

### Essential:
      Install Node.js.  Node.js is a Javascript framework with a nice package manager
      which gives you access to a bunch of different functionality (like working with excel and PDFs). https://nodejs.org/en/
      Just go through the wizard there really are not any weird options.


Once you have node downloaded, open Powershell and navigate to a directory of your choice where you can store code (use the \"cd\" command to change directories).

Then clone this repo by running the command:  \"git clone https://github.com/j-woodlee/ALCOASSR.git" (or if you don't have git just copy DEBE.js and node_modules to your computer manually)

Move into the repository by running \"cd ALCOASSR\" (or move into the directory where you put DEBE.js)

You can now simply run the script by typing: \"node ./DEBE.js Alameda 2018 10\" (or insert whatever parameters you want)

The script will take in files from P:\\Permits List\\Files Received From Unit Supervisors\\ and write the output .xlsx file to P:\\Permits List\\Upload Files\\Testing\\


## Script Logic

First the "to write.xlsm" file is read.  The only rows we are interested in are those with a present permit type, so that's the first filter.

The script loops through every row in the .xlsm file, but ignores the ones that have a null permit type.  When a row is found that has a non-null
permit type, a couple things happen.  

First, each piece of relevant data in the row is captured in variables, the APN is captured in a variable named apn,
permit description is captured in permitDesc, etc.  Then any kind of necessary modification to those variables happens.  For example, for the permit
description I have to truncate to 250 characters, for the permit number I have to truncate to 12 characters etc.  

Then once I have all the data appropriately stored in these variables, I push them onto an array that represents the column they will be in.  This means I have an array for each column in the final output file.  So for example, I push the apn variable onto the array storing all the APNs, I push permitDesc onto the array that is storing the permit descriptions, etc.  As I loop through the rows of the .xlsm file I am building these arrays.  When I finish looping though all the rows, my arrays will be completely full.  I can easily use these arrays to build an excel document as long as I have the proper syntax for exceljs.  

I create the output excel workbook at the bottom which is really just a structuring of the data I am grabbing from the now full arrays.
