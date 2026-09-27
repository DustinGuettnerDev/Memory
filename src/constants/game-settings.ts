export const defaultGameSettings = {
    theme: "codeVibes",
    playerColor: "blue",
    boardSize: 16,
} as const;

export const supportedBoardSizes = [16, 24, 36] as const;
