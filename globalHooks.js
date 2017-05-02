var chromedriver = require('chromedriver');
var htmlReporter = require('nightwatch-html-reporter');

var reporter = new htmlReporter({
  openBrowser: false,
  reportsDirectory: __dirname + '/reports'
});

module.exports = {
  reporter: reporter.fn,

  before: function (done) {
    chromedriver.start();
    done();
  },

  after: function (done) {
    chromedriver.stop();
    done();
  }
};
