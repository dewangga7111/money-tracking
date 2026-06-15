# Money Tracking Application Design Spec

## 1. Overview
A simple, yet comprehensive money tracking feature that allows users to record income, expenses, and transfers across multiple wallets/bank accounts. It includes a unified dashboard with varied reporting intervals (daily, weekly, monthly, yearly) to give users full visibility into their finances.

## 2. Core Entities (Prisma Schema Additions)
The application relies on three new core entities, isolated per user:

- **TbWallet**: Represents a funding source (e.g., Bank BCA, Cash Wallet).
  - Fields: `walletId` (UUID), `name` (String), `type` (Enum: BANK, E_WALLET, CASH), `userId` (UUID, Relation to TbUser), timestamps.
- **TbCategory**: Represents a transaction classification.
  - Fields: `categoryId` (UUID), `name` (String), `type` (Enum: INCOME, EXPENSE), `icon` (String, optional), `userId` (UUID, Relation to TbUser), timestamps.
  - *Note: Default categories will be seeded and assigned when a user registers, but they can be edited later.*
- **TbTransaction**: Represents the movement of funds.
  - Fields: `transactionId` (UUID), `amount` (Decimal or BigInt), `date` (DateTime), `notes` (String, optional), `type` (Enum: INCOME, EXPENSE, TRANSFER), `walletId` (UUID, source wallet), `toWalletId` (UUID, destination wallet, only used for TRANSFER), `categoryId` (UUID, nullable for transfers), `userId` (UUID, Relation to TbUser), timestamps.

## 3. User Interface & Components
- **Main Dashboard (`/dashboard`)**:
  - **Summary Cards**: Displays Total Current Balance, Monthly Income, and Monthly Expense.
  - **Chart Section**: A visual chart displaying spending trends. Includes a toggle to switch intervals between Daily, Weekly, Monthly, and Yearly.
  - **Recent Transactions List**: A quick feed of the 5-10 latest transactions.
- **Unified Transaction Modal**:
  - A modal accessible via a prominent "+ Transaksi" button.
  - Tabs: Income | Expense | Transfer.
  - Inputs: Amount, Date, Category (dropdown), Source Wallet (dropdown), Destination Wallet (for transfers), and Notes.
- **Master Data Pages (`/wallets`, `/categories`)**:
  - Clean, simple CRUD interfaces allowing users to add, edit, or delete their custom wallets and categories.

## 4. Architecture & Data Flow
- **Data Integrity**: Wallet balances are calculated dynamically (`SUM(income) - SUM(expense) + SUM(transfers_in) - SUM(transfers_out)`) per wallet at query time. This guarantees that balances can never fall out of sync with the underlying transaction history.
- **Server Actions**: Waku Server Actions will handle data mutations (adding transactions) and specialized aggregations (fetching chart data points).
- **Isolation**: Every query must strictly filter by `userId` to ensure users only see their own financial data.
