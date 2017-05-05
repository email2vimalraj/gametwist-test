# GameTwist Test
This repository contains automation test scripts written using [Nightwatch](http://nightwatchjs.org/) for the [GameTwist](https://www.gametwist.com/en/) web portal.

### Pre-requisites
- Chrome >= 57.0
- Firefox >= 53.0
- Selenium Server >= 3.0 (already available in the /bin/ directory)
- GeckoDriver (available in the /bin/ directory)

### Setup
- Run `npm install` or `yarn`

### To execute on chrome
- Run `npm test` or `npm run onChrome` or `yarn test` or `yarn onChrome`

### To execute on firefox
- Run `npm run onFirefox` or `yarn onFirefox`

### Reports
There are two types of reporting enabled:
- Console logging
- HTML Reporting
    - The html report is available under ./reports/report.html

### Structure

- `nightwatch.json` - contains all the default options required by nightwatch.
- `firefoxconfig.json` - contains firefox specific options. When we execute using `npm run onFirefox` or `yarn onFirefox`, this config json will be used.
- `globalHooks.js` - this file contains before and after hooks which creates / stops the chromedriver. This file is referred as part of the config json file.
- `bin` directory - contains selenium server jar and the geckodriver binaries
- `pages` directory - contains the page objects
- `tests` directory - contains all the test scripts. Each file in this directory will be considered as a single suite.
