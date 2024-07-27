USE rsgame;

-- Factory reset tables before inserting data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Level;
TRUNCATE TABLE Minigame;
TRUNCATE TABLE Chapter;
TRUNCATE TABLE Branch;
SET FOREIGN_KEY_CHECKS = 1;

-- Define branches
INSERT INTO Branch (branch_no, no_of_chapters, map_name)
VALUES (1, 1, "default");

-- Define chapters
INSERT INTO Chapter (chapter_no, branch_no, no_of_minigames)
VALUES (1, 1, 7);

-- Define minigames
INSERT INTO Minigame (minigame_name)
VALUES
  ("Hangman"),
  ("Matching"),
  ("Mcq"),
  ("Logo"),
  ("Fib"),
  ("Listen"),
  ("Random");

-- Define levels
INSERT INTO Level (level_no, chapter_no, branch_no, minigame_name, x, y)
VALUES
  (1, 1, 1, "Hangman", 0, 0),
  (2, 1, 1, "Matching", 2, 2),
  (3, 1, 1, "Mcq", 3, 3),
  (4, 1, 1, "Logo", 4, 4),
  (5, 1, 1, "Fib", 5, 5),
  (6, 1, 1, "Listen", 6, 6),
  (7, 1, 1, "Random", 7, 7);