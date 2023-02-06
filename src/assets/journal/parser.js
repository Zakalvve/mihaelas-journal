const fs = require('fs');
const readline = require('readline');

let directory = {  };

async function processLineByLine() {

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
        [date.formatedString, date.year, date.month, date.day] = ["","","",""];
        let [day, month, year] = ["","",""];
    
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
            dayAsString: suffixOfDay(day),
            day: day,
            month: month,
            yearAsString: `${suffixOfDay(year)} year, Age of Air`,
            year: year
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

    function objectIsEmpty(obj){
        return Object.keys(obj).length === 0;
    }

    function addEntryToDirectory(entry){
        let [newYear, newMonth] = [false, false];
        let [year, month] = [null, null];

        if (directory.years){
            year = directory.years.find(year => year.year === entry.header.date.year);
        }
        else {
            directory.years = [];
        }

        if (!year){
            year = {
                year: entry.header.date.year,
                months: []
            };
            newYear = true;
        }

        if (year.months){
            month = year.months.find(month => month.month === entry.header.date.month);
        }
        else {
            year.months = [];
        }

        if (!month){
            month = {
                month: entry.header.date.month,
                entries: []
            };
            newMonth = true;
        }

        if (newYear && newMonth){
            month.entries.push(entry);
            year.months.push(month);
            directory.years.push(year);
        } else if(!newYear && newMonth){
            month.entries.push(entry);
            let yearIndex = directory.years.indexOf(directory.years.find(dYear => dYear.year === entry.header.date.year));
            directory.years[yearIndex].months.push(month);
        } else if (!newYear && !newMonth){
            let yearIndex = directory.years.indexOf(directory.years.find(dYear => dYear.year === entry.header.date.year));
            let monthIndex = directory.years[yearIndex].months.indexOf(directory.years[yearIndex].months.find(dMonth => dMonth.month === entry.header.date.month));
            directory.years[yearIndex].months[monthIndex].entries.push(entry);
        }
    }
    
  const fileStream = fs.createReadStream('./master.md');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  //let newFiles = [];
  let sectionInfo = {};
  let data = "";
  let firstSection = true;

  for await (const line of rl) {
    let words = line.split(" ");
    if (/\d/.test(words[0])){
        if (!firstSection){
/*             newFiles.push({
                header: sectionInfo,
                data: data
            }); */

            addEntryToDirectory({
                header: sectionInfo,
                data: data
            });
            data = "";
        } else {
            firstSection = false;
        }
        
        sectionInfo = createEntryHeader(words, getLocationFromLine(line));
        var modifiedTitle = "# " + line;
        data += modifiedTitle + "\n";
    } else {
        data += line + "\n";
    }
  }

  console.log(directory);
  var json = JSON.stringify(directory);
  fs.writeFile(`./directory.json`, json, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Json content file was saved!");
    }
   });

  //create json file
/*   var arrayAsJson = JSON.stringify(newFiles);
  fs.writeFile(`./site-content.json`, arrayAsJson, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Json content file was saved!");
    }
   }); */

  //create new markdown files
/*   newFiles.forEach(function(file) {
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
    }); */
}

processLineByLine();