import L from "leaflet";
import { GamesWithRandom } from "../constants/constants";

// Define game icons as SVG strings
const gameIcons: Record<GamesWithRandom, string> = {
  matching: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>`,

  hangman: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
  </svg>`,

  mcq: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>`,

  logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8h-5zm-4 0h-2v2h2v-2zm0 4h-2v2h2v-2zm-4-4H6v2h2v-2zm0 4H6v2h2v-2z"/>
  </svg>`,

  fib: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>
  </svg>`,

  listen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"/>
  </svg>`,

  random: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>`,
};

export const gameIcon = (
  level: number,
  game: GamesWithRandom = "random",
  isLocked: boolean,
  isCurrent: boolean
) => {
  let bgColor;
  if (isLocked) {
    bgColor = "#ff3d07";
  } else {
    bgColor = isCurrent ? "#FFC107" : "#02c71f";
  }

  // Create a unique ID for this icon
  const uniqueId = `game-icon-${level}-${game}-${Date.now()}`;

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="game-icon">
      <style>
        #${uniqueId} .level-bg { fill: ${bgColor}; transition: opacity 0.3s; opacity: 0; }
        #${uniqueId} .level-text { fill: white; transition: opacity 0.3s; opacity: 0; }
        #${uniqueId} .icon-bg { fill: ${bgColor}; transition: opacity 0.3s; opacity: 1; }
        #${uniqueId} .icon-path { fill: white; transition: opacity 0.3s; opacity: 1; }
        #${uniqueId}:hover .level-bg { opacity: 1; }
        #${uniqueId}:hover .level-text { opacity: 1; }
        #${uniqueId}:hover .icon-bg { opacity: 0; }
        #${uniqueId}:hover .icon-path { opacity: 0; }
        #${uniqueId}.locked { pointer-events: none; }
      </style>

      <g id="${uniqueId}" class="${isLocked ? "locked" : ""}">
        <!-- Level number (shown on hover) -->
        <circle class="level-bg" cx="25" cy="25" r="23" stroke="white" stroke-width="2"/>
        <text class="level-text" x="25" y="30" text-anchor="middle" font-size="18" font-weight="bold">${level}</text>

        <!-- Game icon (default view) -->
        <circle
          class="icon-bg"
          cx="25"
          cy="25"
          r="23"
          stroke="white"
          stroke-width="${isCurrent ? 4 : 2}"
        />
        <g class="icon-path" transform="translate(13, 13)">
          ${gameIcons[game]}
        </g>
      </g>
    </svg>
  `;

  return L.divIcon({
    html: svgString,
    className: "custom-game-icon",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};

export const branchIcon = (branch: number) => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="23" fill="#2196F3" stroke="white" stroke-width="2"/>
      <text x="25" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="white">${branch}</text>
    </svg>
  `;
  return L.divIcon({
    html: svgString,
    className: "custom-svg-icon",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};

export const chapterIcon = (
  chapter: number,
  status: "completed" | "current" | "locked" = "locked"
) => {
  // Define colors for different chapter statuses
  const colors = {
    completed: "#02c71f", // Green for completed chapters
    current: "#FFC107", // Yellow for current/next chapter
    locked: "#ff3d07", // Red for locked chapters
  };

  const fillColor = colors[status];

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="23" fill="${fillColor}" stroke="white" stroke-width="2"/>
      <text x="25" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="white">${chapter}</text>
    </svg>
  `;
  return L.divIcon({
    html: svgString,
    className: `custom-svg-icon chapter-status-${status}`,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};
