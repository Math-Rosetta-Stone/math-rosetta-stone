# MySQL Table Creation Script

import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

# Get the root directory (one level up from the script's directory)
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Load environment variables from the .env.local file in the root directory
load_dotenv(dotenv_path=os.path.join(root_dir, '.env.local'))

# Configs for MySQL connection
config = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'port': 3306,
    'charset': 'utf8mb4',
    'use_unicode': True
}

# Connect to MySQL server
try:
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    print("Successfully connected to MySQL server...\n")
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your username or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
    exit()

# Drop and recreate tables
def recreate_tables():
    drop_tables = [
        "DROP TABLE IF EXISTS permission",
        "DROP TABLE IF EXISTS level",
        "DROP TABLE IF EXISTS chapter",
        "DROP TABLE IF EXISTS termToClass",
        "DROP TABLE IF EXISTS translations",
        "DROP TABLE IF EXISTS terms",
        "DROP TABLE IF EXISTS languages",
        "DROP TABLE IF EXISTS classes",
        "DROP TABLE IF EXISTS branch",
        "DROP TABLE IF EXISTS session",
        "DROP TABLE IF EXISTS user"
    ]
    create_tables = [
        """
        CREATE TABLE user (
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(100) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
        )
        """,
        """
        CREATE TABLE session (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            expires_at DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user(id)
        )
        """,
        """
        CREATE TABLE branch (
            branch_no INT PRIMARY KEY,
            no_of_chapters INT NOT NULL,
            map_name VARCHAR(100) NOT NULL
        )
        """,
        """
        CREATE TABLE languages (
            lang_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
        """,
        """
        CREATE TABLE classes (
            class_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
        """,
        """
        CREATE TABLE terms (
            term_id INT AUTO_INCREMENT PRIMARY KEY,
            term VARCHAR(255) NOT NULL,
            branch_no INT,
            `rank` INT,
            definition TEXT,
            example TEXT
        )
        """,
        """
        CREATE TABLE translations (
            term_id INT,
            lang_id INT,
            definition TEXT,
            FOREIGN KEY (term_id) REFERENCES terms(term_id),
            FOREIGN KEY (lang_id) REFERENCES languages(lang_id),
            UNIQUE (term_id, lang_id)
        )
        """,
        """
        CREATE TABLE termToClass (
            term_id INT,
            class_id INT,
            FOREIGN KEY (term_id) REFERENCES terms(term_id),
            FOREIGN KEY (class_id) REFERENCES classes(class_id),
            UNIQUE (term_id, class_id)
        )
        """,
        """
        CREATE TABLE chapter (
            chapter_no INT,
            branch_no INT,
            no_of_minigames INT NOT NULL,
            PRIMARY KEY (chapter_no, branch_no),
            FOREIGN KEY (branch_no) REFERENCES branch(branch_no)
        )
        """,
        """
        CREATE TABLE level (
            level_no INT,
            chapter_no INT,
            branch_no INT,
            minigame_name VARCHAR(8) NOT NULL CHECK (minigame_name IN ('hangman', 'matching', 'mcq', 'logo', 'fib', 'listen', 'random')),
            x INT NOT NULL,
            y INT NOT NULL,
            PRIMARY KEY (level_no, chapter_no, branch_no),
            FOREIGN KEY (chapter_no, branch_no) REFERENCES chapter(chapter_no, branch_no),
            UNIQUE (chapter_no, branch_no, x, y),
            UNIQUE (branch_no, chapter_no, level_no)
        )
        """,
        """
        CREATE TABLE permission (
            user_id VARCHAR(255) NOT NULL,
            curr_branch_no INT NOT NULL,
            curr_chapter_no INT NOT NULL,
            curr_level_no INT NOT NULL,
            PRIMARY KEY (user_id, curr_branch_no),
            FOREIGN KEY (curr_branch_no, curr_chapter_no, curr_level_no) REFERENCES level(branch_no, chapter_no, level_no)
        )
        """
    ]

    # Execute drop and create statements
    for query in drop_tables + create_tables:
        cursor.execute(query)
    conn.commit()
    print("Successfully recreated tables...\n")

# Main function
def main():
    recreate_tables()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
