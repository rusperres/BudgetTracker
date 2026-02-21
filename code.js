const START_ROW = 17;
const DATE_COL = 2;
const CATEGORY_COL = 3;
const TYPE_COL = 4;
const AMOUNT_COL = 5;
const ACCOUNT_COL = 6;

function onOpen() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(sheet.getName()!="Transactions")return;
  showSidebar();
  
  
}

function showSidebar(){
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Budget Tracker')
    .setWidth(200); 
  SpreadsheetApp.getUi().showSidebar(html);
}

function addIncome() {
  const html = HtmlService.createHtmlOutputFromFile('incomeForm')
    .setWidth(300)
    .setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add Income');
}


function submitIncome(amount, income_category, account) {
  const sheet = SpreadsheetApp.getActiveSheet();

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

function addExpense() {
  const html = HtmlService.createHtmlOutputFromFile('expenseForm')
    .setWidth(300)
    .setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add Expense');
}


function submitExpense(amount, expense_category, account) {
  const sheet = SpreadsheetApp.getActiveSheet();
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

function addTransfer() {
  const html = HtmlService.createHtmlOutputFromFile('transferForm')
    .setWidth(300)
    .setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add Transfer');
}


function getAccountColumn(sheet, accountName) {
  const accounts = sheet.getRange("C2:C11").getValues()[0]; // get account names
  const colIndex = accounts.indexOf(accountName);
  if (colIndex === -1) throw new Error("Account not found: " + accountName);
  return colIndex + 3; // C = column 3
}


function submitTransfer(amount, fromAccount, toAccount) {
  const sheet = SpreadsheetApp.getActiveSheet();
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