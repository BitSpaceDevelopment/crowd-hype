#!/bin/bash

# Specify the directory you want to search
directory_to_search="./vrsafetyfe"

# Specify the output file
output_file="countImportantResult.txt"


# Use grep to count occurrences of "!important" in all files, excluding specified subfolders
grep -r -o --include=*.html --include=*.tsx --include=*.ts --include=*.js --include=*.jsx --exclude-dir=node_modules --exclude-dir=.vs --exclude-dir=.vscode --exclude-dir=.storybook --exclude-dir=build --exclude-dir=.next "!important" "$directory_to_search" | \
  awk -F':' '{count[$1]++} END {for (file in count) print "Occurrences in " file ": " count[file]}' > "$output_file"

cat $output_file