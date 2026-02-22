const START_ROW = 15;
const DATE_COL = 2;
const CATEGORY_COL = 3;
const TYPE_COL = 4;
const AMOUNT_COL = 5;
const ACCOUNT_COL = 6;
const SHEET_ID = "1466cJN_jdJnh8seXfOUPYirQ_kDZNrjpUTf30FL_AfU";


function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}


function getSheet() {
  return SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName("Transactions");
}

function getIncomeForm() {
  return HtmlService.createHtmlOutputFromFile('incomeForm').getContent();
}

function getExpenseForm() {
  return HtmlService.createHtmlOutputFromFile('expenseForm').getContent();
}

function getTransferForm() {
  return HtmlService.createHtmlOutputFromFile('transferForm').getContent();
}



function submitIncome(amount, income_category, account) {
  console.log("Adding income:", amount, income_category, account);

  const sheet = getSheet();

  let row = START_ROW;
  while (sheet.getRange(row, DATE_COL).getValue() !== "") {
    row++;
  }

  sheet.getRange(row, DATE_COL).setValue(new Date());
  sheet.getRange(row, CATEGORY_COL).setValue(income_category);
  sheet.getRange(row, TYPE_COL).setValue("INCOME");
  sheet.getRange(row, AMOUNT_COL).setValue(parseFloat(amount));
  sheet.getRange(row, ACCOUNT_COL).setValue(account);
  
}




function submitExpense(amount, expense_category, account) {
  const sheet = getSheet();
  amount = 0-amount;
  let row = START_ROW;
  while (sheet.getRange(row, DATE_COL).getValue() !== "") {
    row++;
  }

  sheet.getRange(row, DATE_COL).setValue(new Date());
  sheet.getRange(row, CATEGORY_COL).setValue(expense_category);
  sheet.getRange(row, TYPE_COL).setValue("EXPENSE");
  sheet.getRange(row, AMOUNT_COL).setValue(parseFloat(amount));
  sheet.getRange(row, ACCOUNT_COL).setValue(account);
}




function getAccountColumn(sheet, accountName) {
  // Read the account NAMES from column B (B2:B11)
  const accounts = sheet.getRange("B2:B11").getValues().map(row => row[0].toString().trim());
  console.log("Accounts in sheet:", accounts);
  console.log("Account trying to match:", accountName, `"${accountName}"`);

  const colIndex = accounts.indexOf(accountName.trim());
  if (colIndex === -1) {
    throw new Error("Account not found: " + accountName);
  }

  // The numeric values are in column C onward, so +2 to get column C as first account column
  return colIndex + 3; // B2 → C column is colIndex + 3
}


function submitTransfer(amount, fromAccount, toAccount) {
  const sheet = getSheet();
  amount = parseFloat(amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid transfer amount");
  }

  const fromCol = getAccountColumn(sheet, fromAccount);
  const toCol = getAccountColumn(sheet, toAccount);

  const currentFrom = sheet.getRange(2, fromCol).getValue() || 0;
  const currentTo = sheet.getRange(2, toCol).getValue() || 0;

  if (currentFrom < amount) {
    throw new Error("Not enough balance in " + fromAccount);
  }


  let row = START_ROW;
  while (sheet.getRange(row, DATE_COL).getValue() !== "") {
    row++;
  }

  sheet.getRange(row, DATE_COL).setValue(new Date());
  sheet.getRange(row, CATEGORY_COL).setValue("TRANSFER");
  sheet.getRange(row, TYPE_COL).setValue("TRANSFER");
  sheet.getRange(row, AMOUNT_COL).setValue(amount);
  sheet.getRange(row, ACCOUNT_COL).setValue(fromAccount + " → " + toAccount);
}






// function onOpen() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   if(sheet.getName()!="Transactions")return;
//   showSidebar();
  
  
// }

// function showSidebar(){
//   const html = HtmlService.createHtmlOutputFromFile('sidebar')
//     .setTitle('Budget Tracker')
//     .setWidth(200); 
//   SpreadsheetApp.getUi().showSidebar(html);
// }

// function addIncome() {
//   const html = HtmlService.createHtmlOutputFromFile('incomeForm')
//     .setWidth(300)
//     .setHeight(250);
//   SpreadsheetApp.getUi().showModalDialog(html, 'Add Income');
// }

// function addExpense() {
//   const html = HtmlService.createHtmlOutputFromFile('expenseForm')
//     .setWidth(300)
//     .setHeight(250);
//   SpreadsheetApp.getUi().showModalDialog(html, 'Add Expense');
// }

// function addTransfer() {
//   const html = HtmlService.createHtmlOutputFromFile('transferForm')
//     .setWidth(300)
//     .setHeight(250);
//   SpreadsheetApp.getUi().showModalDialog(html, 'Add Transfer');
// }