const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {

    function calculatePath(words){
        let path = "./entries/";
        let months = [
            "Obeli",
            "Hivali",
            "Domak",
            "Parith",
            "Forrith",
            "Vey",
            "Voley",
            "Karmutch",
            "Firagoth",
            "Teragoth",
            "Hydrigoth",
            "Teprogoth",
        ];
        var month, year, day = "";
    
        words.forEach(word => {
            if (months.includes(word)){
                month = word;
            } else if (/\d/.test(word)){
                if (word.startsWith("861")){
                    year = "861st Year, Age of Air";
                } else if (word.startsWith("862")) {
                    year = "862nd Year, Age of Air";
                } else {
                    let dayAsNumber = getNumberFromString(word)
                    day = suffixOfDay(+dayAsNumber);
                    console.log(day);
                }
            } else{
                console.log(word);
            }
        });
        return {
            path: `${path}${year}/${month}/`,
            day: day,
            month: month,
            year: year
        };
    }
    
    function getNumberFromString(word){
        let matches = word.match(/\d+/g);
    
        return matches[0];
    }
    
    function suffixOfDay(i) {
        let j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    
    function getLocationFromLine(line){
        let parts = line.split(",");
        let partIterator = parts.length-1;
        partIterator = partIterator < 0 ? 0 : partIterator;
        let part = parts[partIterator].trim();
        return part;
    }
    
  const fileStream = fs.createReadStream('./master.md');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let newFiles = [];
  let sectionInfo = {};
  let data = "";
  let firstSection = true;

  for await (const line of rl) {
    let words = line.split(" ");
    if (/\d/.test(words[0])){
        if (!firstSection){
            newFiles.push({
                header: sectionInfo,
                data: data
            });
            data = "";
        } else {
            firstSection = false;
        }
        
        sectionInfo = calculatePath(words);
        sectionInfo.location = getLocationFromLine(line);
        var modifiedTitle = "# " + line;
        data = data + modifiedTitle + "\n";
    } else {
        data = data + line + "\n";
    }
  }

  newFiles.forEach(function(file) {
    i = newFiles.indexOf(file);
    (function (i) {
        console.log(i);
        fs.mkdirSync(file.header.path, { recursive: true });
        fs.writeFile(`${file.header.path + file.header.day} of ${file.header.month} ${file.header.year} In ${file.header.location}.md`, file.data, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Input" + i + " file was saved!");
        }
        });
        console.log(i);
    })(i);
    });
}

processLineByLine();