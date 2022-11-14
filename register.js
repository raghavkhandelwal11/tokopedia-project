const fs = require('fs');

const addUser = (newUserJson) => {
    fs.readFile("./DB.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.log(err);
            return;
        } else {
            try{
                jsonData = JSON.parse(jsonString);
                jsonData.push(newUserJson);
                let jsonString2 = JSON.stringify(jsonData, null, 2);
                fs.writeFile("./DB.json", jsonString2, err => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("new user added succesfully!");
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
    })
}

module.exports = addUser;
