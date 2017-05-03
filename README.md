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
