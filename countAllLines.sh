#!/bin/bash

wc --lines vrsafetyfe/

find . -name "*.tsx" | egrep -v -E "node_modules|.vs|.vscode|.storybook|.next|build" > listOfTypescriptXFiles.txt
find . -name "*.ts" | egrep -v -E "node_modules|.vs|.vscode|.storybook|.next|build" > listOfTypescriptFiles.txt
find . -name "*.jsx" | egrep -v -E "node_modules|.vs|.vscode|.storybook|.next|build" > listOfJavascriptXFiles.txt
find . -name "*.js" | egrep -v -E "node_modules|.vs|.vscode|.storybook|.next|build" > listOfJavascriptFiles.txt


sed 's/^/wc --lines /g' listOfTypescriptXFiles.txt > countLinesInTypescriptXFiles.sh
sed 's/^/wc --lines /g' listOfTypescriptFiles.txt > countLinesInTypescriptFiles.sh
sed 's/^/wc --lines /g' listOfJavascriptXFiles.txt > countLinesInJavascriptXFiles.sh
sed 's/^/wc --lines /g' listOfJavascriptFiles.txt > countLinesInJavascriptFiles.sh

# Combine scripts into a single file and sort the output
cat countLinesInTypescriptXFiles.sh countLinesInTypescriptFiles.sh countLinesInJavascriptXFiles.sh countLinesInJavascriptFiles.sh | sort -k2 -n > countLinesInFiles.sh
chmod +x countLinesInFiles.sh

# Execute the combined script, save all results, and display files with counts over 500
./countLinesInFiles.sh > countLinesResult.txt
awk '$1 > 500' countLinesResult.txt

rm countLinesInFiles.sh

rm listOfTypescriptXFiles.txt
rm listOfTypescriptFiles.txt
rm listOfJavascriptXFiles.txt
rm listOfJavascriptFiles.txt

rm countLinesInTypescriptXFiles.sh
rm countLinesInTypescriptFiles.sh
rm countLinesInJavascriptXFiles.sh
rm countLinesInJavascriptFiles.sh
