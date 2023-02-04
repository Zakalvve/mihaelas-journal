const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {

    let directory = {
        years: [
            {
                year: "861",
                months: [
                    {
                        month: "teragoth",
                        entries: [
                            {
                                path: "./entries/861/teragoth/",
                                fileName: "01-01-861-location.md",
                                date: {
                                    formatedString: "01-01-861 AA",
                                    day: "1st",
                                    month: "Teragoth",
                                    year: "861st Year, Age of Air"  
                                },
                                location: "Taramont",
                                data: "Content"
                            }
                        ]
                    }
                ]
            },
            {
                year: "862",
                months: [

                ]
            }
        ]
    };

    function monthToNumber(month){
        switch (month){
            case "Obeli":
                return "01";
            case "Hivali":
                return "02"
            case "Domak":
                return "03";
            case "Parith":
                return "04";
            case "Forrith":
                return "05";
            case "Vey":
                return "06";
            case "Voley":
                return "07";
            case "Karmutch":
                return "08";
            case "Firagoth":
                return "09";
            case "Teragoth":
                return "10";
            case "Hydrigoth":
                return "11";
            case "Teprogoth":
                return "12";
        }
    }
    function createEntryHeader(words, location){
        
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
        
        let path = "./entries/";
        let date = {};
        date.formatedString, date.year, date.month, date.day = "";
        let day, month, year = "";
    
        words.forEach(word => {
            if (months.includes(word)){
                month = word;
            } else if (/\d/.test(word)){
                if (word.startsWith("861")){
                    year = "861";
                } else if (word.startsWith("862")) {
                    year = "862";
                } else {
                    day = getNumberFromString(word)
                }
            }
        });

        date = constructDate(day, month, year);


        return {
            path: `${path}${year}/${month}/`,
            fileName: `${date.formatedString}-${location}.md`,
            date: date,
            location: location
        };
    }
    
    function constructDate(day, month, year){
        return {
            formatedString: `${day}-${monthToNumber(month)}-${year}`,
            day: suffixOfDay(day),
            month: month,
            year: `${suffixOfDay(year)} year, Age of Air`
        };
    }

    function getNumberFromString(word){
        let matches = word.match(/\d+/g);
        
        return matches[0].length < 2 ? "0" + matches[0] : matches[0];
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
        
        sectionInfo = createEntryHeader(words, getLocationFromLine(line));
        var modifiedTitle = "# " + line;
        data = data + modifiedTitle + "\n";
    } else {
        data = data + line + "\n";
    }
  }

  //create json file
  var arrayAsJson = JSON.stringify(newFiles);
  fs.writeFile(`./site-content.json`, arrayAsJson, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Json content file was saved!");
    }
   });

  //create new markdown files
  newFiles.forEach(function(file) {
    i = newFiles.indexOf(file);
    (function (i) {
        console.log(i);
        fs.mkdirSync(file.header.path, { recursive: true });
        fs.writeFile(`${file.header.path + file.header.fileName}.md`, file.data, function(err) {
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