export function filterItems(unfilteredData, search){
    let filteredArray = [];
    for (let i = 0; i < unfilteredData.length; i++) {
    
        const item = unfilteredData[i];

        if (item.Title.toUpperCase().includes(search.toUpperCase().trim().replace(/\s/g, ""))) {
            filteredArray.push(item);
        }
    }
    return filteredArray;
}  
