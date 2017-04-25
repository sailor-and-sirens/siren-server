CREATE VIEW "Inbox" AS (
SELECT
  "Users"."id" as "UserId", "Users"."username", "Users"."email", "Users"."avatarUrl",
  "Podcasts"."id" as "PodcastId", "Podcasts"."name" as "title", "Podcasts"."artistName" as "creator", "Podcasts"."feedUrl", "Podcasts"."primaryGenreName" as "tag", "Podcasts"."artworkUrl" as "image", "Podcasts"."artworkUrl600" as "image600",
  "Episodes"."id" as "EpisodeId", "Episodes"."title" as "episodeTitle", "Episodes"."description", "Episodes"."length", "Episodes"."releaseDate", "Episodes"."url", "Episodes"."feed",
  "UserEpisodes"."liked", "UserEpisodes"."bookmarked" as "bookmark",
  "UserEpisodes"."currentTime"
FROM
  "Podcasts", "Episodes", "UserEpisodes", "Users"
WHERE
  "Users"."id" = "UserEpisodes"."UserId" AND
  "Episodes"."id" = "UserEpisodes"."EpisodeId" AND
  "Episodes"."PodcastId" = "Podcasts"."id" AND
  "UserEpisodes"."isInInbox" = true
);
