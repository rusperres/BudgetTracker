# Budget Tracker Web App

A **fully automated personal budget tracker** built with **Google Apps Script** and **Google Sheets**, featuring a draggable floating form for managing income, expenses, and transfers. All updates, validations, and calculations happen automatically.

---

## Key Features

- **Automation & Scripting**: Every transaction is handled automatically via **Google Apps Script**, including:
  - Adding income or expenses
  - Transfers between accounts
  - Validation of balances
  - Logging timestamps and categories
- **Income & Expense Management**: Easily categorize and track all your finances.
- **Transfers**: Move funds between accounts instantly.
- **Floating Draggable Form**: Always visible, draggable interface for fast entry.
- **Live Sheet Display**: Embed your Google Sheet for real-time transaction overview (desktop only for frozen rows).
- **Responsive UI**: Works on desktop and mobile browsers (use desktop mode on mobile for frozen rows).

---

## Project Structure
```
app/
├─ index.html # Main web app interface
├─ incomeForm.html # Form template for income
├─ expenseForm.html # Form template for expense
├─ transferForm.html # Form template for transfers
├─ Code.gs # Automation & scripting logic in Google Apps Script
```

---

## Setup Instructions

1. **Create a Google Sheet** named `Transactions`.  
   - Columns:
     - **A**: Date
     - **B**: Account Name
     - **C onward**: Account balances
   - Optional: Freeze rows 1–13 for headers.  

2. **Configure Google Apps Script**:
   - Create a new project linked to your Google Sheet.
   - Copy all `Code.gs` and HTML files.
   - Update `SHEET_ID` in `Code.gs` with your sheet ID.
   - The **automation and scripting** will handle all logic automatically.  

3. **Deploy as Web App**:
   - Go to **Deploy > New Deployment > Web App**.
   - Execute as: `Me`
   - Access: `Anyone`
   - Copy and open the web app URL.

---

## How to Use

- Open the web app URL.
- The embedded Google Sheet shows live transactions.
- Use the floating draggable form to:
  - Add income
  - Add expenses
  - Transfer funds
- On mobile, enable **desktop mode** to preserve frozen headers.

---

## Technologies

- **Frontend**: HTML, CSS, JavaScript  
- **Backend & Automation**: **Google Apps Script** (handles everything automatically)  
- **Data Storage**: Google Sheets  

---

## Future Improvements

- Mobile-friendly table rendering with sticky headers.
- Account summaries and charts.
- Multi-user authentication.
- Offline support with local caching and sync.

---

## License

MIT License — free to use and modify.
