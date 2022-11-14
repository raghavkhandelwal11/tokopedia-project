const allData = require("./DB.json");




const findIndex = (mail) => {
    for(let i = 0; i < allData.length; i++) {
        if(mail === allData[i].email) {
            return allData[i];
        }
    }

    return null;
}

module.exports = findIndex;