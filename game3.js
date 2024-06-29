console.log("suraj")

//timeing for 5 steps in preparation from database//
const processSteps_dc_1 =[2,1,2.5,2]
const processSteps_dc_2 =[2,1,2.5,3]
const processSteps_dc_3 =[2,1,2.5,2.5]

// cost of renting 5 machines
const rent= [400,500,800,700]

const demand = [80,100,90]
const std = [8,10,9]
const revenueperunit = [25,40,30]

document.getElementById("step1_dc_1").innerHTML = processSteps_dc_1[0]
document.getElementById("step2_dc_1").innerHTML = processSteps_dc_1[1]
document.getElementById("step3_dc_1").innerHTML = processSteps_dc_1[2]
document.getElementById("step4_dc_1").innerHTML = processSteps_dc_1[3]

document.getElementById("step1_dc_2").innerHTML = processSteps_dc_2[0]
document.getElementById("step2_dc_2").innerHTML = processSteps_dc_2[1]
document.getElementById("step3_dc_2").innerHTML = processSteps_dc_2[2]
document.getElementById("step4_dc_2").innerHTML = processSteps_dc_2[3]

document.getElementById("step1_dc_3").innerHTML = processSteps_dc_3[0]
document.getElementById("step2_dc_3").innerHTML = processSteps_dc_3[1]
document.getElementById("step3_dc_3").innerHTML = processSteps_dc_3[2]
document.getElementById("step4_dc_3").innerHTML = processSteps_dc_3[3]

document.getElementById("demandperhour_dc_1").innerHTML = demand[0]
document.getElementById("demandperhour_dc_2").innerHTML = demand[1]
document.getElementById("demandperhour_dc_3").innerHTML = demand[2]

document.getElementById("std_dc_1").innerHTML = std[0]
document.getElementById("std_dc_2").innerHTML = std[1]
document.getElementById("std_dc_3").innerHTML = std[2]

document.getElementById("revenueperunit_dc_1").innerHTML = revenueperunit[0]
document.getElementById("revenueperunit_dc_2").innerHTML = revenueperunit[1]
document.getElementById("revenueperunit_dc_3").innerHTML = revenueperunit[2]

document.getElementById("rent1").innerHTML = rent[0]
document.getElementById("rent2").innerHTML = rent[1]
document.getElementById("rent3").innerHTML = rent[2]
document.getElementById("rent4").innerHTML = rent[3]

function weekday(){
    return{
        1: 'Week_10',
        2: 'Week_11',
        3: 'Week_12',       
    }
}


let dc_1_served = 0
let dc_2_served = 0
let dc_3_served = 0
let revenue = 0 
let expense =0
let profit = 0
let cumulativeRevenue = parseInt(localStorage.getItem("cumulativeRevenue")) || 0;
let cumulativeExpense = parseInt(localStorage.getItem("cumulativeExpense")) || 0;
let cumulativeProfit = parseInt(localStorage.getItem("cumulativeProfit")) || 0;
// Find the elements where the values will be displayed
let revenueElement = document.getElementById("cumulativeRevenue");
let expenseElement = document.getElementById("cumulativeExpense");
let profitElement = document.getElementById("cumulativeProfit");

// Set the text content of the elements to the values
revenueElement.textContent = cumulativeRevenue;
expenseElement.textContent = cumulativeExpense;
profitElement.textContent = cumulativeProfit;
let count = 0; // Initialize count
let randomdemand_dc_1 = 0
let randomdemand_dc_2 = 0
let randomdemand_dc_3 = 0
let service = 0
let daycounter = 1;

document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById('Submit_3');
    

    submitButton.addEventListener('click', function() {
            let mc1Value = document.querySelector("#mc1 input").value;
            let mc2Value = document.querySelector("#mc2 input").value;
            let mc3Value = document.querySelector("#mc3 input").value;
            let mc4Value = document.querySelector("#mc4 input").value;
           

            if (mc1Value === '' || mc1Value < 1 || mc2Value === '' || mc2Value < 1 || mc3Value === '' || mc3Value < 1 || mc4Value === '' || mc4Value < 1 ) {
                alert('Please enter valid quantities greater than 0 for all mc inputs');
                return;
            }
            if (count < 4) {
                count++;
                // hourly order served
                let randomdemand_dc_1 = Math.round((demand[0] + (Math.random()*2-1) * std[0]))
                let randomdemand_dc_2 = Math.round((demand[1] + (Math.random()*2-1) * std[1]))
                let randomdemand_dc_3 = Math.round((demand[2] + (Math.random()*2-1) * std[2]))

                console.log(randomdemand_dc_1)
                console.log(randomdemand_dc_2)
                console.log(randomdemand_dc_3)

                let dc_2_served = Math.max(0,Math.min(
                    (60 * mc1Value) / processSteps_dc_1[0], 
                    (60 * mc2Value) / processSteps_dc_1[1],
                    (60 * mc3Value) / processSteps_dc_1[2],
                    (60 * mc4Value) / processSteps_dc_2[3], 
                    randomdemand_dc_2
                ))
            
                let dc_3_served = Math.max(0, Math.min(
                        ((60 * mc1Value) / processSteps_dc_1[0] - dc_2_served),
                        ((60 * mc2Value) / processSteps_dc_1[1] - dc_2_served),
                        ((60 * mc3Value) / processSteps_dc_1[2] - dc_2_served),
                        ((mc4Value * 60 - (dc_2_served * processSteps_dc_2[3])) / processSteps_dc_3[3]),
                        randomdemand_dc_3
                ))
            
                
                let dc_1_served = Math.max(0, Math.min(
                    ((60 * mc1Value) / processSteps_dc_1[0] - dc_2_served - dc_3_served),
                    ((60 * mc2Value) / processSteps_dc_1[1] - dc_2_served - dc_3_served),
                    ((60 * mc3Value) / processSteps_dc_1[2] - dc_2_served - dc_3_served),
                    ((mc4Value * 60 - (dc_2_served * processSteps_dc_2[3] + dc_3_served * processSteps_dc_3[3])) / processSteps_dc_1[3]),
                    randomdemand_dc_1
                ))
                // 6 hours a day for 6 days in a week
                dc_1_served_total = dc_1_served*36
                dc_2_served_total = dc_2_served*36
                dc_3_served_total = dc_3_served*36

              
                // order incoming
                orderincoming = (randomdemand_dc_1 + randomdemand_dc_2 + randomdemand_dc_3)*6*6

                document.getElementById(`os_dc_1_${count}`).textContent = Math.round(dc_1_served_total)
                document.getElementById(`os_dc_2_${count}`).textContent = Math.round(dc_2_served_total)
                document.getElementById(`os_dc_3_${count}`).textContent = Math.round(dc_3_served_total)
                
                orderserved = dc_1_served_total + dc_2_served_total + dc_3_served_total
                let service = orderserved / orderincoming
                revenue_byselling = (dc_1_served_total* revenueperunit[0]) + (dc_2_served_total * revenueperunit[1])+ (dc_3_served_total * revenueperunit[2]) 
                revenue_servicelevel = (Math.max(0,service - 0.95)*revenue_byselling)
                revenue = revenue_byselling + revenue_servicelevel
                expense = (mc1Value*rent[0] + mc2Value*rent[1] + mc3Value*rent[2] + mc4Value*rent[3])*6
                profit = revenue - expense
                

                document.getElementById(`incomingorder3_${count}`).textContent = Math.round(orderincoming);
                document.getElementById(`orderserved3_${count}`).textContent = Math.round(orderserved)
                document.getElementById(`revenue3_${count}`).textContent = Math.round(revenue)
                document.getElementById(`expense3_${count}`).textContent = Math.round(expense)
                document.getElementById(`profit3_${count}`).textContent = Math.round(profit)
                document.getElementById(`service3_${count}`).textContent = Math.round(service*100,2)

                cumulativeRevenue += revenue;
                cumulativeExpense += expense;
                cumulativeProfit += profit;
                document.getElementById('cumulativeRevenue').textContent = cumulativeRevenue;
                document.getElementById('cumulativeExpense').textContent = cumulativeExpense;
                document.getElementById('cumulativeProfit').textContent = cumulativeProfit; 
                
                //counter for week
            document.getElementById('week').textContent = weekday()[daycounter];
            daycounter = (daycounter % 4) + 1;

        }
        if (count === 4) {
            alert('All order quantities have been updated.');
            document.getElementById('Submit_3').disabled = true;

            let proceedLink = document.createElement('a');
            proceedLink.textContent = 'Proceed to Performance'; // Set link text
            proceedLink.href = 'resultdesicola.html'; // Replace with the actual path to your new page
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


        }
        document.getElementById('mc1').querySelector('input').value = ''; // Clear mc1 input field
        document.getElementById('mc2').querySelector('input').value = ''; // Clear mc2 input field
        document.getElementById('mc3').querySelector('input').value = ''; // Clear mc3 input field
        document.getElementById('mc4').querySelector('input').value = ''; // Clear mc4 input field
        
    })
})
