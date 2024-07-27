USE rsgame;

-- Clean up before creating tables
DROP TABLE IF EXISTS Level;
DROP TABLE IF EXISTS Minigame;
DROP TABLE IF EXISTS Chapter;
DROP TABLE IF EXISTS Branch;
DROP TABLE IF EXISTS User;

-- Create User table
CREATE TABLE User (
  id INT AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  curr_branch_no INT DEFAULT 1,
  curr_chapter_no INT DEFAULT 1,
  curr_minigame_name VARCHAR(50),
  PRIMARY KEY (id),
  UNIQUE (username)
);

-- Create Branch table
CREATE TABLE Branch (
  branch_no INT NOT NULL,
  no_of_chapters INT NOT NULL,
  map_name VARCHAR(100),
  PRIMARY KEY (branch_no)
);

-- Create Chapter table
CREATE TABLE Chapter (
  chapter_no INT NOT NULL,
  branch_no INT NOT NULL,
  no_of_minigames INT NOT NULL,
  PRIMARY KEY (chapter_no, branch_no),
  FOREIGN KEY (branch_no) REFERENCES Branch(branch_no)
);

-- Create Minigame table
CREATE TABLE Minigame (
  minigame_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (minigame_name)
);

-- Create Level table
CREATE TABLE Level (
  level_no INT NOT NULL,
  chapter_no INT NOT NULL,
  branch_no INT NOT NULL,
  minigame_name VARCHAR(50) NOT NULL,
  x INT NOT NULL,
  y INT NOT NULL,
  PRIMARY KEY (level_no, chapter_no, branch_no),
  FOREIGN KEY (chapter_no, branch_no) REFERENCES Chapter(chapter_no, branch_no),
  FOREIGN KEY (minigame_name) REFERENCES Minigame(minigame_name),
  UNIQUE (chapter_no, branch_no, x, y)
);