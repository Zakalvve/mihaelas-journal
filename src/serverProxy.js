import jsonData from "./assets/journal/site-content.json"

export const fetchSiteData = (path) => {
    
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
