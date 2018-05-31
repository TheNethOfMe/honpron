const reservedList = [
  "SteampunkLink",
  "Steampunk_Link",
  "Francis_York_Kennedy",
  "FrancisYorkKennedy",
  "Honest_Piranha",
  "Honest_Piranha_Labs",
  "HonestPiranha",
  "HonestPiranhaLabs",
  "Admin",
  "ADMIN",
  "Deleted",
  "deleted"
];

module.exports = function isReserved(userName) {
  return reservedList.includes(userName);
};
