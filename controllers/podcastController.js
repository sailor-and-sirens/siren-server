const podcastParser = require('podcast-parser');

module.exports = {

  getFeed (req, res) {
    var feedUrl = req.query.url;
    podcastParser.execute(feedUrl, {},
      function (err, response) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        let data = response.channel.items;
        res.send(JSON.stringify(data));
      }
    );
  }

};