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
        data.forEach((item) => {
          //sanitize to remove HTML heavy description + summary
          delete item.description;
          delete item.summary;
        })
        res.send(JSON.stringify(data));
      }
    );
  }

};