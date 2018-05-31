const redList = [
  "cuck",
  "libtard",
  "faggot",
  "nigger",
  "bitch",
  "retard",
  "trigger",
  "triggered",
  "snowflake",
  "tranny"
];

const yellowList = [
  "fuck",
  "political",
  "commie",
  "republican",
  "conservative",
  "supremacist",
  "trump"
];

module.exports = function getCommentCode(comment) {
  let commentColor = "blue";

  const checkYellow = new RegExp(yellowList.join("|"), "i");
  const checkRed = new RegExp(redList.join("|"), "i");

  if (checkYellow.test(comment)) commentColor = "yellow";
  if (checkRed.test(comment)) commentColor = "red";

  return commentColor;
};
