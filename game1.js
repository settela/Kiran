console.log("hello")
//timeing for 5 steps in preparation from database//
const processSteps =[2,1,2.5,3,2.5]

// cost of renting 5 machines
const rent= [500,600,500,650,700]

const demand = 100
const std = 5
const revenueperunit = 50


// assiging value after getting from database//
document.getElementById("step1").innerHTML = processSteps[0]
document.getElementById("step2").innerHTML = processSteps[1]
document.getElementById("step3").innerHTML = processSteps[2]
document.getElementById("step4").innerHTML = processSteps[3]
document.getElementById("step5").innerHTML = processSteps[4]

document.getElementById("demandperhour").innerHTML = demand
document.getElementById("stdperhour").innerHTML = std
document.getElementById("revenueperunit").innerHTML = revenueperunit

document.getElementById("rent1").innerHTML = rent[0]
document.getElementById("rent2").innerHTML = rent[1]
document.getElementById("rent3").innerHTML = rent[2]
document.getElementById("rent4").innerHTML = rent[3]
document.getElementById("rent5").innerHTML = rent[4]

function weekday(){
    return{
        1: 'Week_2',
        2: 'Week_3',
        3: 'Week_4',       
    }
}

let orderserved = 0
let revenue = 0 
let expense =0
let profit = 0
let cumulativeRevenue = 0; // Initialize cumulative revenue
let cumulativeExpense = 0; // Initialize cumulative revenue
let cumulativeProfit = 0; // Initialize cumulative revenue
let count = 0; // Initialize count
let daycounter = 1; // for updating week 
let randomdemand =0;
let service =0;

document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById('Submit_1');
    

    submitButton.addEventListener('click', function() {
            let mc1Value = document.querySelector("#mc1 input").value;
            let mc2Value = document.querySelector("#mc2 input").value;
            let mc3Value = document.querySelector("#mc3 input").value;
            let mc4Value = document.querySelector("#mc4 input").value;
            let mc5Value = document.querySelector("#mc5 input").value;
        
            if (mc1Value === '' || mc1Value < 1 || mc2Value === '' || mc2Value < 1 || mc3Value === '' || mc3Value < 1 || mc4Value === '' || mc4Value < 1 || mc5Value === '' || mc5Value < 1) {
                alert('Please enter valid quantities greater than 0 for all mc inputs');
                return;
            }
        

        if (count < 4) {
            count++;
            let randomdemand = Math.round((demand + (Math.random()*2-1) * std))
            console.log(randomdemand)
            let orderserved = Math.min(((60 * mc1Value) / processSteps[0]), ((60 * mc2Value) / processSteps[1]), ((60 * mc3Value) / processSteps[2]), ((60 * mc4Value) / processSteps[3]), ((60 * mc5Value) / processSteps[4]), (randomdemand)) * 6 * 6;
            let service = orderserved/(36*randomdemand);
            let revenue = (orderserved * revenueperunit)* (1 + Math.max(0,service-0.95)) ;
            let expense = (mc1Value * rent[0] + mc2Value * rent[1] + mc3Value * rent[2] + mc4Value * rent[3] + mc5Value * rent[4]) * 6;
            
            let profit = revenue  - expense;

            document.getElementById(`incomingorder${count}`).textContent = Math.round(randomdemand*36);
            document.getElementById(`orderserved${count}`).textContent = Math.round(orderserved);
            document.getElementById(`revenue${count}`).textContent = Math.round(revenue)
            document.getElementById(`expense${count}`).textContent =Math.round(expense);
            document.getElementById(`profit${count}`).textContent = Math.round(profit);
            document.getElementById(`service${count}`).textContent = Math.round(service*100,2)

            cumulativeRevenue += revenue;
            cumulativeExpense += expense;
            cumulativeProfit += profit;
            document.getElementById('cumulativeRevenue').textContent = Math.round(cumulativeRevenue);
            document.getElementById('cumulativeExpense').textContent = Math.round(cumulativeExpense);
            document.getElementById('cumulativeProfit').textContent = Math.round(cumulativeProfit);
            //counter for week
            document.getElementById('week').textContent = weekday()[daycounter];
            daycounter = (daycounter % 4) + 1;
        }

        if (count === 4) {
            alert('All order quantities have been updated.');
            document.getElementById('Submit_1').disabled = true;
            
            let proceedLink = document.createElement('a');
            proceedLink.textContent = 'Proceed to Month_02'; // Set link text
            proceedLink.href = 'game2.html'; // Replace with the actual path to your new page
            localStorage.setItem('cumulativeRevenue', cumulativeRevenue);//passing values to the second month 
            localStorage.setItem('cumulativeExpense', cumulativeExpense);//passing values to the second month 
            localStorage.setItem('cumulativeProfit', cumulativeProfit);//passing values to the second month 
            // Append the link to the document body
            document.body.appendChild(proceedLink);
            // Add CSS styles to darken the background and center the link
            document.body.style.background = 'rgba(0, 0, 0, 0.5)'; // Darken background
            proceedLink.style.position = 'fixed'; // Position link fixed to the viewport
            proceedLink.style.top = '50%'; // Center vertically
            proceedLink.style.left = '50%'; // Center horizontally
            proceedLink.style.transform = 'translate(-50%, -50%)'; // Center link exactly
            proceedLink.style.zIndex = '9999'; // Ensure link is on top of other content
            proceedLink.style.color = '#ffffff'; // Set link text color
            proceedLink.style.padding = '15px 30px'; // Add padding for better visibility
            proceedLink.style.backgroundColor = '#000000'; // Set link background color
            proceedLink.style.borderRadius = '5px'; // Add rounded corners to link
       
            proceedToNextMonth()
        }
        
        async function proceedToNextMonth() {
            try {
                // Fetch the Excel file from remote URL
                const response = await fetch('gamebook.xlsx');
        
                if (!response.ok) {
                    throw new Error('Failed to fetch Excel file');
                }
        
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
                // Get the worksheet by name (adjust as needed)
                const worksheet = workbook.Sheets['Sheet1']; // Replace 'Sheet1' with your sheet name
        
                // Convert the worksheet to JSON
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
                // Add the new data to the worksheet
                data.push([cumulativeRevenue, cumulativeExpense, cumulativeProfit]); // Example: Storing revenue, expense, profit
        
                // Convert JSON back to worksheet
                const newWorksheet = XLSX.utils.aoa_to_sheet(data);
        
                // Replace the old worksheet with the new one
                workbook.Sheets['Sheet1'] = newWorksheet; // Replace 'Sheet1' with your sheet name
        
                // Write the workbook back to an array buffer
                const updatedArrayBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        
                // Save the updated Excel file back to remote URL
                const saveResponse = await fetch('gamebook.xlsx', {
                    method: 'PUT', // Adjust the method as per your server's API
                    headers: {
                        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                    body: updatedArrayBuffer,
                });
        
                if (!saveResponse.ok) {
                    throw new Error('Failed to save Excel file');
                }
        
                console.log('Details stored in remote Excel file successfully');
            } catch (error) {
                console.error('Error storing details in remote Excel file:', error);
                // Handle errors as needed
            }
        }
        
        document.getElementById('mc1').querySelector('input').value = ''; // Clear mc1 input field
        document.getElementById('mc2').querySelector('input').value = ''; // Clear mc2 input field
        document.getElementById('mc3').querySelector('input').value = ''; // Clear mc3 input field
        document.getElementById('mc4').querySelector('input').value = ''; // Clear mc4 input field
        document.getElementById('mc5').querySelector('input').value = ''; // Clear mc5 input field
    })} )


