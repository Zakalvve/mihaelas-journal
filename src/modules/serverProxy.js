import jsonData from "../assets/journal/site-content.json";
import testData from "../assets/journal/directory.json";
import { DocumentTree} from "./Tree";

export let journalDirectory = mapDirectory();

function mapDirectory (data = testData) {
    let tree = new DocumentTree({path: "./entries", fullPath: "./entries"});
    for (let year of data.years){
        let yearNode = tree.push(tree.root, {type: "folder", path: year.year, fullPath: `./entries/${year.year}`});
        for (let month of year.months){
            let monthNode = tree.push(yearNode, {type: "folder", path: month.month, fullPath: `./entries/${year.year}/${month.month}`});
            for (let entry of month.entries){
                tree.push(monthNode, {type: "file", path: entry.header.fileName, fullPath: `./entries/${year.year}/${month.month}/${entry.header.fileName}`, file: entry});
            }
        }
    }
    console.log(tree);
    tree.getNodePathAsIds("./entries/862/Domak");
    tree.print();
    return tree;
};

export const fetchSiteData = (path) => {
    mapDirectory(testData);
    console.log(path);

    const file = jsonData.find(item => {
        return item.header.path + item.header.fileName === path;
    });


    if (file === undefined) throw Error("File not found");

    return file;
};

export const searchResults = (input = "") => {
    const results = jsonData
        .filter(item => (item.header.path+item.header.fileName).startsWith(input))
        .map(filteredItem => {
            return {
                    fileName: filteredItem.header.fileName,
                    path: filteredItem.header.path+filteredItem.header.fileName
                };
            }
        );

        return results;
}
