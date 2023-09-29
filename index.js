const jsonUrl = 'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1';
 
const domesticFruits = [];
const importedFruits = [];
let domesticCost = 0;
let importedCost = 0;
 
function print(fruits) {
    const output = document.getElementById('output');
 
    // Log as Html
    output.innerHTML += '. Domestic\n';
    fruits.forEach(fruit => {
      output.innerHTML += `... ${fruit.name}\n`;
      output.innerHTML += `    Price: $${fruit.price.toFixed(1)}\n`;
      output.innerHTML += `    ${fruit.description.substring(0, 10)}...\n`;
      output.innerHTML += `    Weight: ${fruit.weight ? `${fruit.weight}g` : 'N/A'}\n`;
 
      // Log to the console as well
      console.log('. Domestic');
      console.log(`... ${fruit.name}`);
      console.log(`    Price: $${fruit.price.toFixed(1)}`);
      console.log(`    ${fruit.description.substring(0, 10)}...`);
      console.log(`    Weight: ${fruit.weight ? `${fruit.weight}g` : 'N/A'}`);
    });
}
 
function printSummary(domesticCost, importedCost, domesticFruits, importedFruits) {

    // Log as Html
    output.innerHTML += `Domestic cost: $${domesticCost.toFixed(1)}\n`;
    output.innerHTML += `Imported cost: $${importedCost.toFixed(1)}\n`;
    output.innerHTML += `Domestic count: ${domesticFruits.length}\n`;
    output.innerHTML += `Imported count: ${importedFruits.length}\n`;
 
    // Log the summary to the console
    console.log(`Domestic cost: $${domesticCost.toFixed(1)}`);
    console.log(`Imported cost: $${importedCost.toFixed(1)}`);
    console.log(`Domestic count: ${domesticFruits.length}`);
    console.log(`Imported count: ${importedFruits.length}`);
}
 
function proccessData(data) {
    data.forEach(fruit => {
        if (fruit.domestic) {
          domesticFruits.push(fruit);
          domesticCost += fruit.price;
        } else {
          importedFruits.push(fruit);
          importedCost += fruit.price;
        }
    });
}
 
fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    proccessData(data);
    
    domesticFruits.sort((a, b) => a.name.localeCompare(b.name));
    importedFruits.sort((a, b) => a.name.localeCompare(b.name));
 
    print(domesticFruits);
    print(importedFruits);
    printSummary(domesticCost, importedCost, domesticFruits, importedFruits);
  })
  .catch(error => {
    console.error('There was a problem fetching or parsing the JSON data:', error);
  });