

const csvFilePath='./annual-enterprise-survey-2021-financial-year-provisional-csv.csv'
const csv=require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const newCsvFilePath = path.join(__dirname, 'industry-to-value.csv');

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

    let store = {};

    jsonObj.forEach(industryData =>{
        const industry = industryData.Industry_name_NZSIOC;
        const value = parseFloat(industryData.Value.replace(/,/g, ''));
       
if (store[industry]) {
   store[industry] += value;
 } else {
   store[industry] = value;
 }
    })

    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(store);

    fs.writeFileSync(newCsvFilePath, csvData);
   
})
