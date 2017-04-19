CREATE VIEW "Inbox" AS (
SELECT
  "Users"."username", "Users"."email", "Users"."avatarUrl",
  "Podcasts"."id" as "PodcastId", "Podcasts"."name", "Podcasts"."artistName", "Podcasts"."feedUrl", "Podcasts"."primaryGenreName", "Podcasts"."artworkUrl", "Podcasts"."artworkUrl600",
  "Episodes"."id" as "EpisodeId", "Episodes"."title", "Episodes"."description", "Episodes"."length", "Episodes"."releaseDate", "Episodes"."url"
FROM
  "Podcasts", "Episodes", "UserPodcasts", "UserEpisodes", "Users"
WHERE
  "Users"."id" = "UserPodcasts"."UserId" AND
  "Podcasts"."id" = "UserPodcasts"."PodcastId" AND
  "Users"."id" = "UserEpisodes"."UserId" AND
  "Episodes"."id" = "UserEpisodes"."EpisodeId" AND
  "Episodes"."PodcastId" = "Podcasts"."id"
);
