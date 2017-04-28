/*eslint quotes: [2, "double"]*/

var iTunesPodcastObjects = {};
var episodeSubscriptions = {};

var searchiTunesAPIUrl = function (keyword) {
  return "https://itunes.apple.com/search?term=" + keyword + "&media=podcast";
};

var authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkYW55YWRzbWl0aCIsInBhc3N3b3JkIjoiJDJhJDEwJE9xQzUwU0I2eG9TU0pIc0poOGRBL08zVy5SUlN0RHQ5WnlUc3RHb0ZxWnV1ODc3T1p2eGllIiwiZW1haWwiOiJkYW55YWRzbWl0aEBnbWFpbC5jb20iLCJ1cGRhdGVkQXQiOiIyMDE3LTA0LTE3VDE4OjA5OjMxLjc5NFoiLCJjcmVhdGVkQXQiOiIyMDE3LTA0LTE3VDE4OjA5OjMxLjc5NFoiLCJhdmF0YXJVcmwiOm51bGx9.XVXPCa6K8VK3IsaRfwVPbzSq8KM-BIood1nWay8N8-I";

iTunesPodcastObjects["The Tim Ferris Show"] = {"wrapperType":"track", "kind":"podcast", "artistId":867667252, "collectionId":863897795, "trackId":863897795, "artistName":"Tim Ferriss: Bestselling Author, Human Guinea Pig", "collectionName":"The Tim Ferriss Show", "trackName":"The Tim Ferriss Show", "collectionCensoredName":"The Tim Ferriss Show", "trackCensoredName":"The Tim Ferriss Show", "artistViewUrl":"https://itunes.apple.com/us/artist/tim-ferriss/id867667252?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/the-tim-ferriss-show/id863897795?mt=2&uo=4", "feedUrl":"http://feeds.feedburner.com/thetimferrissshow", "trackViewUrl":"https://itunes.apple.com/us/podcast/the-tim-ferriss-show/id863897795?mt=2&uo=4", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-16T11:53:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":236, "country":"USA", "currency":"USD", "primaryGenreName":"Investing", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/600x600bb.jpg", "genreIds":["1412", "26", "1321", "1304", "1307"], "genres":["Investing", "Podcasts", "Business", "Education", "Health"]};

iTunesPodcastObjects["Odyssey SFF Writing Workshops Podcast"] = {"wrapperType":"track", "kind":"podcast", "collectionId":213992784, "trackId":213992784, "artistName":"Odyssey SF/F Workshop", "collectionName":"Odyssey SF/F Writing Workshop Podcasts", "trackName":"Odyssey SF/F Writing Workshop Podcasts", "collectionCensoredName":"Odyssey SF/F Writing Workshop Podcasts", "trackCensoredName":"Odyssey SF/F Writing Workshop Podcasts", "collectionViewUrl":"https://itunes.apple.com/us/podcast/odyssey-sf-f-writing-workshop-podcasts/id213992784?mt=2&uo=4", "feedUrl":"http://www.odysseyworkshop.org/odysseypodcasts.xml", "trackViewUrl":"https://itunes.apple.com/us/podcast/odyssey-sf-f-writing-workshop-podcasts/id213992784?mt=2&uo=4", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-02T19:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":100, "country":"USA", "currency":"USD", "primaryGenreName":"Literature", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/600x600bb.jpg", "genreIds":["1401", "26", "1301", "1323"], "genres":["Literature", "Podcasts", "Arts", "Games & Hobbies"]};

iTunesPodcastObjects["Developer Tea"] = {"wrapperType":"track", "kind":"podcast", "artistId":1019380766, "collectionId":955596067, "trackId":955596067, "artistName":"Spec", "collectionName":"Developer Tea", "trackName":"Developer Tea", "collectionCensoredName":"Developer Tea", "trackCensoredName":"Developer Tea", "artistViewUrl":"https://itunes.apple.com/us/artist/spec/id1019380766?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/developer-tea/id955596067?mt=2&uo=4", "feedUrl":"http://feeds.feedburner.com/DeveloperTea", "trackViewUrl":"https://itunes.apple.com/us/podcast/developer-tea/id955596067?mt=2&uo=4", "artworkUrl30":"http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/30x30bb.jpg", "artworkUrl60":"http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/60x60bb.jpg", "artworkUrl100":"http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-17T12:06:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":300, "country":"USA", "currency":"USD", "primaryGenreName":"Software How-To", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/600x600bb.jpg", "genreIds":["1480", "26", "1318", "1321", "1410", "1324"], "genres":["Software How-To", "Podcasts", "Technology", "Business", "Careers", "Society & Culture"]};

iTunesPodcastObjects["The Big Web Show"] = {"wrapperType":"track", "kind":"podcast", "artistId":391030532, "collectionId":370445683, "trackId":370445683, "artistName":"5by5", "collectionName":"The Big Web Show", "trackName":"The Big Web Show", "collectionCensoredName":"The Big Web Show", "trackCensoredName":"The Big Web Show", "artistViewUrl":"https://itunes.apple.com/us/artist/5by5/id391030532?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/the-big-web-show/id370445683?mt=2&uo=4", "feedUrl":"http://feeds.5by5.tv/bigwebshow", "trackViewUrl":"https://itunes.apple.com/us/podcast/the-big-web-show/id370445683?mt=2&uo=4", "artworkUrl30":"http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/30x30bb.jpg", "artworkUrl60":"http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/60x60bb.jpg", "artworkUrl100":"http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-10T18:30:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":157, "country":"USA", "currency":"USD", "primaryGenreName":"Software How-To", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/600x600bb.jpg", "genreIds":["1480", "26", "1318"], "genres":["Software How-To", "Podcasts", "Technology"]};

iTunesPodcastObjects["Develper on Fire"] = {"wrapperType":"track", "kind":"podcast", "collectionId":1006105326, "trackId":1006105326, "artistName":"Dave Rael", "collectionName":"Developer On Fire", "trackName":"Developer On Fire", "collectionCensoredName":"Developer On Fire", "trackCensoredName":"Developer On Fire", "collectionViewUrl":"https://itunes.apple.com/us/podcast/developer-on-fire/id1006105326?mt=2&uo=4", "feedUrl":"http://developeronfire.com/rss.xml", "trackViewUrl":"https://itunes.apple.com/us/podcast/developer-on-fire/id1006105326?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-17T00:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":227, "country":"USA", "currency":"USD", "primaryGenreName":"Software How-To", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/600x600bb.jpg", "genreIds":["1480", "26", "1318"], "genres":["Software How-To", "Podcasts", "Technology"]};

iTunesPodcastObjects["TED Radio Hour"] = {"wrapperType":"track", "kind":"podcast", "artistId":125443881, "collectionId":523121474, "trackId":523121474, "artistName":"NPR", "collectionName":"TED Radio Hour", "trackName":"TED Radio Hour", "collectionCensoredName":"TED Radio Hour", "trackCensoredName":"TED Radio Hour", "artistViewUrl":"https://itunes.apple.com/us/artist/npr/id125443881?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/ted-radio-hour/id523121474?mt=2&uo=4", "feedUrl":"https://www.npr.org/rss/podcast.php?id=510298", "trackViewUrl":"https://itunes.apple.com/us/podcast/ted-radio-hour/id523121474?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-14T04:01:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "trackCount":136, "country":"USA", "currency":"USD", "primaryGenreName":"Technology", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/600x600bb.jpg", "genreIds":["1318", "26", "1324", "1301"], "genres":["Technology", "Podcasts", "Society & Culture", "Arts"]};

iTunesPodcastObjects["Fresh Air"] = {"wrapperType":"track", "kind":"podcast", "artistId":125443881, "collectionId":214089682, "trackId":214089682, "artistName":"NPR", "collectionName":"Fresh Air", "trackName":"Fresh Air", "collectionCensoredName":"Fresh Air", "trackCensoredName":"Fresh Air", "artistViewUrl":"https://itunes.apple.com/us/artist/npr/id125443881?mt=2&uo=4", "collectionViewUrl":"https://itunes.apple.com/us/podcast/fresh-air/id214089682?mt=2&uo=4", "feedUrl":"https://www.npr.org/rss/podcast.php?id=381444908", "trackViewUrl":"https://itunes.apple.com/us/podcast/fresh-air/id214089682?mt=2&uo=4", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-18T20:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "trackCount":50, "country":"USA", "currency":"USD", "primaryGenreName":"Arts", "artworkUrl600":"http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/600x600bb.jpg", "genreIds":["1301", "26", "1309", "1324"], "genres":["Arts", "Podcasts", "TV & Film", "Society & Culture"]};

iTunesPodcastObjects["JS Party"] = {"wrapperType":"track", "kind":"podcast", "collectionId":1209616598, "trackId":1209616598, "artistName":"Changelog Media", "collectionName":"JS Party", "trackName":"JS Party", "collectionCensoredName":"JS Party", "trackCensoredName":"JS Party", "collectionViewUrl":"https://itunes.apple.com/us/podcast/js-party/id1209616598?mt=2&uo=4", "feedUrl":"https://changelog.com/jsparty/feed", "trackViewUrl":"https://itunes.apple.com/us/podcast/js-party/id1209616598?mt=2&uo=4", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2017-04-14T19:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":10, "country":"USA", "currency":"USD", "primaryGenreName":"Software How-To", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/600x600bb.jpg", "genreIds":["1480", "26", "1318", "1448"], "genres":["Software How-To", "Podcasts", "Technology", "Tech News"]};

iTunesPodcastObjects["JavaScript Air"] = {"wrapperType":"track", "kind":"podcast", "collectionId":1066446588, "trackId":1066446588, "artistName":"Kent C. Dodds", "collectionName":"JavaScript Air", "trackName":"JavaScript Air", "collectionCensoredName":"JavaScript Air", "trackCensoredName":"JavaScript Air", "collectionViewUrl":"https://itunes.apple.com/us/podcast/javascript-air/id1066446588?mt=2&uo=4", "feedUrl":"http://audio.javascriptair.com/feed/", "trackViewUrl":"https://itunes.apple.com/us/podcast/javascript-air/id1066446588?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "releaseDate":"2016-11-02T19:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":49, "country":"USA", "currency":"USD", "primaryGenreName":"Podcasting", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/600x600bb.jpg", "genreIds":["1450", "26", "1318"], "genres":["Podcasting", "Podcasts", "Technology"]};

episodeSubscriptions["Cheri Huber"] = {
  "podcast": {"wrapperType":"track", "kind":"podcast", "collectionId":892868691, "trackId":892868691, "artistName":"Cheri Huber", "collectionName":"Open Air with Cheri Huber", "trackName":"Open Air with Cheri Huber", "collectionCensoredName":"Open Air with Cheri Huber", "trackCensoredName":"Open Air with Cheri Huber", "collectionViewUrl":"https://itunes.apple.com/us/podcast/open-air-with-cheri-huber/id892868691?mt=2&uo=4", "feedUrl":"http://feeds.feedburner.com/openairpodcast", "trackViewUrl":"https://itunes.apple.com/us/podcast/open-air-with-cheri-huber/id892868691?mt=2&uo=4", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music6/v4/3d/78/18/3d78188f-47b3-0abd-c2a9-2efe8a561310/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music6/v4/3d/78/18/3d78188f-47b3-0abd-c2a9-2efe8a561310/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music6/v4/3d/78/18/3d78188f-47b3-0abd-c2a9-2efe8a561310/source/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "trackRentalPrice":0, "collectionHdPrice":0, "trackHdPrice":0, "trackHdRentalPrice":0, "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "trackCount":199, "country":"USA", "currency":"USD", "primaryGenreName":"Buddhism", "contentAdvisoryRating":"Clean", "artworkUrl600":"http://is5.mzstatic.com/image/thumb/Music6/v4/3d/78/18/3d78188f-47b3-0abd-c2a9-2efe8a561310/source/600x600bb.jpg", "genreIds":["1438", "26", "1314"], "genres":["Buddhism", "Podcasts", "Religion & Spirituality"]},

  "episode": {
    "title": "Open Air with Cheri Huber - February 7, 2017",
    "description": "This is the MP3 recording of Open Air with Cheri Huber from February 7, 2017.\r\nRight-click this link to download the show: February 7, 2017",
    "published": "2017-02-07T05:00:00.000Z",
    "guid": "Open Air with Cheri Huber - February 7, 2017",
    "enclosure": {
      "filesize": 34630874,
      "type": "audio/mpeg",
      "url": "http://feedproxy.google.com/~r/openairpodcast/~5/5JfSGs67waI/OpenAir_170207.mp3"
    },
    "duration": ""
  }
};

module.exports = {
  authorization: authorization,
  searchiTunesAPIUrl: searchiTunesAPIUrl,
  iTunesPodcastObjects: iTunesPodcastObjects,
  episodeSubscriptions: episodeSubscriptions
};
