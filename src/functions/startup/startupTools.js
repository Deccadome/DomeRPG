const { refreshWeapons } = require("./refreshWeapons");
const { refreshSpells } = require("./refreshSpells");
const FileDate = require("../../schemas/filedate");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = {

    async refreshCheck(filePath){
        fileName = path.parse(filePath).base;
        var fileDate;
        fs.stat(filePath, function(error, stats){
            if(!error) {
                //console.log(stats);
                fileDate = stats.mtime;
            }
            else console.log(error);
        });

        fileDateStored = await FileDate.findOne({ name: filePath });
        runFile = false;
        if(!fileDateStored){
            newFile = new FileDate({
                _id: mongoose.Types.ObjectId(),
                name: filePath,
                lastModified: fileDate
            });
            newFile.save().catch(console.error);
            console.log(`${fileName} recorded in FileDates. Running...`);
            runFile = true;
        } else{
            if(fileDate > fileDateStored.lastModified){
                fileDateStored.lastModified = fileDate;
                await fileDateStored.save().catch(console.error);
                console.log(`${fileName} changed. Running...`);
                runFile = true;
            }
            else{
                console.log(`No changes made to ${fileName}. Skipped.`);
            }
        }
        if(runFile){
            if(fileName == 'refreshSpells.js') await refreshSpells().catch(console.error);
            else if(fileName == 'refreshWeapons.js') await refreshWeapons().catch(console.error);
        }
    },
}