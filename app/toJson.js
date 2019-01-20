const data = require('./Spisok_uchastnikov_shablon');
const fs = require('fs');

const filterData = {
  table: []
}

data.features.map((el) => {
  // console.log(el)
  filterData.table.push({
    '№': el.properties.Field1,
    "ФИО": el.properties.Field2,
    "стол": el.properties.Field7
  })
})

const jsonFilterData = JSON.stringify(filterData);

fs.writeFile('myjsonfile.json', jsonFilterData, 'utf8', (err, data) => {
  if (err) {
    return console.log('err', err);
  }
  return console.log('data', data)
});