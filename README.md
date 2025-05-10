# Getting Started

Welcome to the SCAMS project! Follow the steps below to set up and run the application.

## Prerequisites

Ensure you have the `.env` file included with the source code. Place this file in the root of the repository before proceeding.

## Installation

1. Install all dependencies by running the following command:
   ```bash
   npm install
   ```

2. For testing purposes, we have provided a seeding file containing sample data. You can find the file in the `prisma/seed.ts` directory for details about default accounts and other information.

3. To reset and seed the database for the first time, run:
   ```bash
   npm run db:reset
   ```

## Running the Application

Start the Front-end and Back-end services in two separate terminal windows:

1. For the Front-end service:
   ```bash
   npm run dev
   ```

2. For the Back-end service:
   ```bash
   npm run next-dev
   ```

That's it! The application should now be up and running at `http://localhost:5173/`.

## Troubleshooting

If you encounter a `planLimitReached` error, please contact us at:
**quy.leemin@hcmut.edu.vn**