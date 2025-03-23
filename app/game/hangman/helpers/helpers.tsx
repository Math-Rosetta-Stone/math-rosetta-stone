export function showNotification(setter: (value: boolean) => void): void {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(
  correct: string[],
  wrong: string[],
  word: string
): "win" | "lose" | "" {
  let status: "win" | "lose" | "" = "win";

  // Check for win
  word.split("").forEach(letter => {
    if (letter !== " " && !correct.includes(letter)) {
      status = "";
    }
  });

  // Check for lose
  if (wrong.length === 6) {
    status = "lose";
  }

  return status;
}
