const podcastParser = require('podcast-parser');

module.exports = {
  getFeed: function (req, res) {
    var feedUrl = req.query.url;
    podcastParser.execute(feedUrl, {},
      function (err, response) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        var data = response.channel.items;
        data.forEach((item) => {
          var duration = item.duration;
          //parse duration
          if (!duration.includes(':')){
            var formattedDuration = '';
            if (duration.length % 2 !== 0) {
              duration = '0' + duration;
            }
            for(var i = 0; i < duration.length; i ++) {
              formattedDuration += duration.charAt(i);
              if ((i + 1) % 2 === 0 && (i + 1) !== duration.length) {
                formattedDuration += ':';
              }
            }
            console.log('formatted duration:', formattedDuration);
          }
          //sanitize to remove HTML heavy description + summary
          delete item.description;
          delete item.summary;
        });
        res.json(data);
      }
    );
  }
};
