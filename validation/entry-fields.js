module.exports = function getEntryFields(data) {
  const entryFields = {};

  entryFields.title = data.title;
  if (data.dateAdded) entryFields.dateAdded = data.dateAdded;
  entryFields.entryType = data.entryType;
  entryFields.description = data.description;
  entryFields.series = data.series;
  if (data.youtubeId) entryFields.youtubeId = data.youtubeId;
  if (data.duration) entryFields.duration = data.duration;
  if (data.blog) entryFields.blog = data.blog;
  if (typeof data.games !== "undefined") {
    entryFields.games = data.games.split(", ");
  }

  return entryFields;
};
