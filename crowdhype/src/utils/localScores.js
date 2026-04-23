const KEYS = {
  endless: "crowdhype_endless",
  session: "crowdhype_session",
};

export const getScores = (mode) => {
  try {
    return JSON.parse(localStorage.getItem(KEYS[mode]) || "[]");
  } catch {
    return [];
  }
};

export const qualifiesForLeaderboard = (mode, points) => {
  const scores = getScores(mode);
  return scores.length < 10 || points > scores[scores.length - 1].points;
};

export const addScore = (mode, name, points) => {
  const scores = getScores(mode);
  scores.push({ name, points });
  scores.sort((a, b) => b.points - a.points);
  if (scores.length > 10) scores.pop();
  localStorage.setItem(KEYS[mode], JSON.stringify(scores));
};
