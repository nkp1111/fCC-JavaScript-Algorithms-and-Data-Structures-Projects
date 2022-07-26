/*
Cash Register Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency 
Unit Amount 
Penny $0.01 (PENNY) 
Nickel $0.05 (NICKEL) 
Dime $0.1 (DIME) 
Quarter $0.25 (QUARTER) 
Dollar $1 (ONE) 
Five Dollars $5 (FIVE) 
Ten Dollars $10 (TEN) 
Twenty Dollars $20 (TWENTY) 
One-hundred Dollars $100 (ONE HUNDRED) 

See below for an example of a cash-in-drawer array:
[ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ]
*/

function checkCashRegister(price, cash, cid) {
  /** Value associated with different amount */
  let val = [ 
  [ 'ONE HUNDRED', 100 ],
  [ 'TWENTY', 20 ],
  [ 'TEN', 10 ],
  [ 'FIVE', 5 ],
  [ 'ONE', 1 ],
  [ 'QUARTER', 0.25 ],
  [ 'DIME', 0.1 ],
  [ 'NICKEL', 0.05 ],
  [ 'PENNY', 0.01 ] 
  ];

  let change = []; 
  let status = "";
  let newcid = [...cid].reverse();
  let totalMoney = 0;
  let moneyBack = cash - price; // Amount to be return 

  for (let i = 0; i < val.length; i++) {
    totalMoney += newcid[i][1];
    let numNotes = 0;

    while (val[i][1] <= moneyBack) {
      if (newcid[i][1] >= val[i][1] * (numNotes + 1)) {
        moneyBack = moneyBack.toFixed(3) - val[i][1];
        numNotes += 1;
      }
      else {
        break;
      }  
    }
    if (numNotes > 0) {
      change.push([val[i][0], val[i][1] * numNotes]);
      numNotes = 0;
    }  
  }
  if (moneyBack != 0) {
    status = "INSUFFICIENT_FUNDS";
    change = [];
  } 
  else {
    if (totalMoney > cash - price){
      status = "OPEN";
    }
    else {
      status = "CLOSED";
      change = cid;
    }
  } 


  let finalReturn = {"status": status, "change": change};

  return finalReturn;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
