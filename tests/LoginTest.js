var loginCommands = require('../custom-commands/loginUser');

module.exports = {
  'Successful Login' : function (browser) {
    browser.init();
    browser.waitForElementVisible('body', 1000);
    browser.assert.title("GameTwist Casino, Games & more | Play for Free");

    var username = "vimalgt";
    loginCommands.loginUser(browser, username, "Walk840#");

    // Close pop up if appears
    browser.pause(1000);
    browser.element("css selector", "#wof_close_x", function(result) {
      if (result.status !== -1) {
        browser.waitForElementVisible("#wof_close_x", 3000);
        browser.click("#wof_close_x");
      }
      browser.expect.element("#wof_close_x").to.not.be.present;
    });

    browser.waitForElementVisible(".nickname", 3000);
    browser.expect.element(".nickname").text.to.equal(username);
    browser.pause(1000);
  },

  "Navigating through pages" : function (browser) {
    // Validate the navigation
    loginCommands.navigateToPage(browser, "/en/games/slots/", "Slots");
    loginCommands.navigateToPage(browser, "/en/games/bingo/", "Bingo");
    loginCommands.navigateToPage(browser, "/en/games/casino/", "Casino");
    loginCommands.navigateToPage(browser, "/en/games/poker/", "Poker");
  },

  "Search the Game" : function (browser) {
    browser.setValue("input.game-search__field.js-game-search-input", "Slot").pause(1000);
    browser.waitForElementVisible(".game-search__item.grid__item.one-whole.js-game-item > a", 3000);

    browser.pause(1000);

    browser.elements("css selector", ".game-search__item.grid__item.one-whole.js-game-item > a", function(result) {
      console.log("The number of shown games are: " + result.value.length);

      var selectedItem;

      browser.elementIdText(result.value[1].ELEMENT, function (result1) {
        selectedItem = result1.value;
      }).perform(function() {
        browser.elementIdClick(result.value[1].ELEMENT);
        browser.waitForElementVisible(".nav.breadcrumb", 3000);
        browser.expect.element(".nav.breadcrumb").text.to.contains(selectedItem);
      });
    });
  },

  "Change Language to German" : function (browser) {
    browser.pause(3000);

    browser.moveToElement(".branding__bar-stretch.float--left > ul.nav.nav__my-gt-menu.my-gt-menu > li.branding__language-and-help > div.select-language.flyout > span.select-language__button", 10, 10);
    browser.useXpath();
    browser.waitForElementVisible("//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'Deutsch']", 3000);
    browser.click("//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'Deutsch']").pause(3000);
    browser.useCss();
    browser.expect.element("li.branding__buy-twists > a").text.to.equal("TWISTS KAUFEN");
  },

  "Change Language back to English" : function (browser) {
    browser.pause(3000);

    browser.moveToElement(".branding__bar-stretch.float--left > ul.nav.nav__my-gt-menu.my-gt-menu > li.branding__language-and-help > div.select-language.flyout > span.select-language__button", 10, 10);
    browser.useXpath();
    browser.waitForElementVisible("//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'English']", 3000);
    browser.click("//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'English']").pause(3000);
    browser.useCss();
    browser.expect.element("li.branding__buy-twists > a").text.to.equal("BUY TWISTS");
  },


  "Logout the user" : function (browser) {
    browser.moveToElement("li.branding__user > div.flyout.my-gt-menu__flyout > span.my-gt-menu__link", 10, 10);
    browser.waitForElementVisible("li.branding__user > div.flyout.my-gt-menu__flyout > ul.flyout__content.grid.my-gt-menu__list > li.grid__item.one-whole > button.btn--link.js-logout", 3000);
    browser.click("li.branding__user > div.flyout.my-gt-menu__flyout > ul.flyout__content.grid.my-gt-menu__list > li.grid__item.one-whole > button.btn--link.js-logout");
    browser.expect.element("input[name='login-nickname']").to.be.visible.before(5000);
    browser.end();
  }


};
