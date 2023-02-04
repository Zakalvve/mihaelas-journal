import React, {useState, useEffect } from "react";
import { searchResults } from "../../serverProxy";

export const JournalSearch = (props) => {
    
    //when inputString changes, update the available options
    const [selectOptions] = useState(searchResults(""));
    
    
    const handleChange = ({target}) => {
        props.onChange(target.value);
    }

   
    return (
        <div className="d-flex flex-column">
            <select onChange={handleChange} id="search-results">
                {selectOptions.map(option => {
                    return <option value={option.path}>{option.fileName}</option>;
                })}
            </select>
        </div>
    );
}