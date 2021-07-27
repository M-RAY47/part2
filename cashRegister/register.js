const DENOMINATION = [
  ["PENNY", 1],
  ["NICKEL", 5],
  ["DIME", 10],
  ["QUARTER", 25],
  ["ONE", 100],
  ["FIVE", 500],
  ["TEN", 1000],
  ["TWENTY", 2000],
  ["ONE HUNDRED", 10000]
];
let changesDisp = document.getElementById("changes")

function checkCashRegister(price, cash, cid) {
  //the change to give should be equal to the cash minus the price of the item
  let change = Math.round(cash *100)- Math.round(price*100);
  console.log(change);
  // the object to be returned with the status and the change
  let result = {
    status : "",
    change : []
  }
  let sumCid = 0;
  for (let i = 0; i< cid.length; i++){
    sumCid += cid[i][1];
  }
  //console.log(sumCid)
  
  // Or if the sumCid is equal to the change I should give him then I will close until I have some cash
  if ((sumCid*100) === change){
      result.status = "CLOSED";
      result.change = cid;
      return result;
  }
  
  // new result which will hold all the sum of the change to give him incase I have more than the change I should return him
  let cashOnHand =[];
  let cashToGive =[];

  cid.forEach(item=> cashOnHand[item[0]] = Math.round(item[1]*100));
  //console.log(cashOnHand);
  
  let index = DENOMINATION.length-1;
  while (index >= 0){
    let moneyName = DENOMINATION[index][0];
    let moneyValue = DENOMINATION[index][1];
    if(change - moneyValue > 0){
      cashToGive[moneyName] = 0;
      //console.log(cashToGive);

      while(cashOnHand[moneyName] > 0 && moneyValue <= change){
        //should remove the money from the cash we already have
        cashOnHand[moneyName]-= moneyValue;
        //and add that amount of the money to the change we should give him
        cashToGive[moneyName] += moneyValue;
        //then remove the money from the change untill he owes us nothing
        change-= moneyValue;
        //console.log(change);
      }
    }
    index -= 1;
  }

    // Checking if the sumCid (sumCid is the sum of all the money he gives us) is less than the change
    if (sumCid < change){
      result.status = "INSUFFICIENT_FUNDS";
      return result;
  }
  //console.log(cashToGive)
  
  if (change > 0){
    result.status = "OPEN";
  let newChange = [];
  Object.keys(cashToGive).map(item=> newChange.push([item,cashToGive[item]/100]));
  //console.log(newChange);
  result.change = newChange;
    return result;
  }
  
  let lastChange = [];
  Object.keys(cashToGive).map(item=> lastChange.push([item,cashToGive[item]/100]))
  //console.log(result)
  result.change = lastChange;
  // If it's not in any of the case above it means we have more money than he gave us and we can give him change at time he handles money.
  return {status: "OPEN", change: lastChange};
}

let cid = [
  ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
  ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], 
  ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
  ];
let res = checkCashRegister(19.5, 20, cid);
console.log(res);
  let cid1= [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
  ]
let res1= checkCashRegister(19.5, 20, cid1);

function submitCash(){
  let cash = document.getElementById("cash").value;
  alert(`You have inserted ${cash}` );
  changesDisp.textContent = Object.values(checkCashRegister(19.5, cash, cid1));
  console.log(checkCashRegister(19.5, cash, cid));
  return changesDisp;
}