# Database Creation Script

## Overview
This script is designed to create and populate a MySQL database with predefined tables, languages, classes, branches, and data from an Excel file. **Running this script will overwrite the existing database**, so use it with caution.

## Prerequisites
- Python 3.x
- MySQL Server
- Required Python packages:
  - `mysql-connector-python`
  - `openpyxl`
  - `python-dotenv`

## Setup
1. Install dependencies using:
   ```sh
   pip install mysql-connector-python openpyxl python-dotenv
   ```
2. Create a `.env.local` file in the root directory and define your database credentials:
   ```sh
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   ```
3. Place the `terms.xlsx` file in the script directory.

## Running the Script
To execute the script, run:
```sh
python script.py
```

## Modifying the Script
Since this script **recreates** the database every time it runs, modifying certain functions is required to add new data.

### Adding a New Language
To add a new language:
1. Modify the `insert_languages()` function in the script:
   ```python
   def insert_languages():
       languages = ["French", "Chinese", "Spanish", "Portuguese", "Hindi", "Farsi", "Marathi", "NEW_LANGUAGE"]
   ```
2. Update the `languages` list in `insert_excel_data_into_sql_tables()`:
   ```python
   languages = [
       "Chinese (simple) Definition", "French Definition", "Spanish Definition",
       "Portuguese Definition", "Farsi Definition", "Hindi Definition", "Marathi Definition", "NEW_LANGUAGE Definition"
   ]
   ```

### Adding a New Class
To add a new class:
1. Modify the `insert_classes()` function:
   ```python
   def insert_classes():
       classes = [
           "MATA02", "MATA22", "MATA23", "MATA29", "MATA30",
           "MATA31", "MATA34", "MATA35", "MATA36", "MATA37",
           "MATA67", "CSCA08", "CSCA20", "CSCA48", "CSCA67", "NEW_CLASS"
       ]
   ```
2. Update the `classes` list in `insert_excel_data_into_sql_tables()`:
   ```python
   classes = [
       "MATA02", "MATA22", "MATA23", "MATA29", "MATA30",
       "MATA31", "MATA34", "MATA35", "MATA36", "MATA37",
       "MATA67", "CSCA08", "CSCA20", "CSCA48", "CSCA67", "NEW_CLASS"
   ]
   ```

### Adding a New Branch
To add a new branch:
1. Modify the `insert_branches()` function:
   ```python
   def insert_branches():
       branches = [
           (1, 10, "Calculus"),
           (2, 8, "Arithmetic"),
           (3, 12, "Geometry"),
           (4, 6, "Trigonometry"),
           (5, 9, "Algebra"),
           (6, 5, "Logical Operators"),
           (7, 7, "Sets"),
           (8, 11, "General Math"),
           (9, 10, "Statistics and Probability"),
           (10, 8, "CS"),
           (11, 7, "NEW_BRANCH")
       ]
   ```

## Notes
- Ensure that new languages, classes, and branches are properly referenced in the Excel file before running the script.
- The script will **drop and recreate all tables**, so any existing data will be lost.
- If any errors occur, verify database credentials and ensure the Excel file format matches expectations.

