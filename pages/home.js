var homeCommands = {
  login: function(username, password) {
    this.waitForElementVisible("@body", 1000)
      .assert.title("GameTwist Casino, Games & more | Play for Free")
      .waitForElementPresent("@username", 3000);

    this.expect.element("@username").to.be.visible;
    this.expect.element("@password").to.be.visible;

    return this.setValue("@username", username)
      .setValue("@password", password)
      .click("@loginButton");
  },

  closePopUp: function() {
    return this.api.element("css selector", "@closeButtonInPopup", function(result) {
      if (result.status !== -1) {
        this.waitForElementVisible("@closeButtonInPopup", 3000)
          .click("@closeButtonInPopup");
      }
      return this.expect.element("@closeButtonInPopup").to.not.be.present;
    });
  },

  isLoggedIn: function(username) {
    return this.waitForElementVisible("@nickname", 3000)
      .expect.element("@nickname").text.to.equal(username);
  },

  navigateToSlotsPage: function() {
    return navigateToPage(this, "@slotsButton", "Slots");
  },

  navigateToBingoPage: function () {
    return navigateToPage(this, "@bingoButton", "Bingo");
  },

  navigateToCasinoPage: function () {
    return navigateToPage(this, "@casinoButton", "Casino");
  },

  navigateToPokerPage: function () {
    return navigateToPage(this, "@pokerButton", "Poker");
  },

  searchGame: function(searchKeyword) {
    this.setValue("@searchInput", searchKeyword);
    this.api.pause(1000);
    this.waitForElementVisible("@searchItem", 3000);
  },

  selectItem: function(callback) {
    this.api.elements("css selector", this.elements.searchItem.selector, function(result) {
      console.log("The number of shown games are: " + result.value.length);

      this.elementIdText(result.value[1].ELEMENT, function(result1) {
        this.elementIdClick(result.value[1].ELEMENT);
        var itemResult = {
          status: 0,
          value: result1.value
        };
        callback.call(this, itemResult);
      }.bind(this));
    });
    return this;
  },

  verifyPageName: function(pagename) {
    return this.waitForElementVisible("@breadCrumb", 3000)
      .expect.element("@breadCrumb").text.to.contains(pagename);
  },

  selectGermanLanguage: function () {
    this.moveToElement("@selectLanguageButton", 10, 10)
      .waitForElementVisible("@deutschLanguageButton", 3000)
      .click("@deutschLanguageButton");
    this.api.pause(3000);
    return this;
  },

  selectEnglishLanguage: function () {
    this.moveToElement("@selectLanguageButton", 10, 10)
      .waitForElementVisible("@englishLanguageButton", 3000)
      .click("@englishLanguageButton");
    this.api.pause(3000);
    return this;
  },

  isLanguageChangedToGerman: function () {
    return this.expect.element("@buyTwistsButton").text.to.equal("TWISTS KAUFEN");
  },

  isLanguageChangedToEnglish: function () {
    return this.expect.element("@buyTwistsButton").text.to.equal("BUY TWISTS");
  },

  logoutUser: function() {
    return this.moveToElement("@userMenuLink", 10, 10)
      .waitForElementVisible("@logoutButton", 3000)
      .click("@logoutButton");
  },

  isUserLoggedOut: function () {
    return this.expect.element("@username").to.be.visible.before(5000);
  }
};

function navigateToPage(driver, urlElement, pageName) {
  return driver.click(urlElement)
    .waitForElementVisible("@highlightedButton", 3000)
    .expect.element("@breadCrumb").text.to.contains(pageName);
}

module.exports = {
  commands: [homeCommands],
  
  url: function () {
    return this.api.launchUrl;
  },

  elements: {
    body: {
      selector: "body"
    },
    username: {
      selector: "input[name='login-nickname']"
    },
    password: {
      selector: "#login-password"
    },
    loginButton: {
      selector: "//span[contains(text(), 'LOG IN')]",
      locateStrategy: "xpath"
    },
    closeButtonInPopup: {
      selector: "#wof_close_x"
    },
    nickname: {
      selector: ".nickname"
    },
    slotsButton: {
      selector: "a[href='/en/games/slots/']"
    },
    bingoButton: {
      selector: "a[href='/en/games/bingo/']"
    },
    casinoButton: {
      selector: "a[href='/en/games/casino/']"
    },
    pokerButton: {
      selector: "a[href='/en/games/poker/']"
    },
    highlightedButton: {
      selector: "a.CMSListMenuLinkHighlighted"
    },
    breadCrumb: {
      selector: ".nav.breadcrumb"
    },
    searchInput: {
      selector: "input.game-search__field.js-game-search-input"
    },
    searchItem: {
      selector: ".game-search__item.grid__item.one-whole.js-game-item > a"
    },
    selectLanguageButton: {
      selector: ".branding__bar-stretch.float--left > ul.nav.nav__my-gt-menu.my-gt-menu > li.branding__language-and-help > div.select-language.flyout > span.select-language__button"
    },
    deutschLanguageButton: {
      selector: "//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'Deutsch']",
      locateStrategy: "xpath"
    },
    englishLanguageButton: {
      selector: "//ul[@class='nav nav__my-gt-menu my-gt-menu']//span[@class='select-language__name' and text() = 'English']",
      locateStrategy: "xpath"
    },
    buyTwistsButton: {
      selector: "li.branding__buy-twists > a"
    },
    userMenuLink: {
      selector: "li.branding__user > div.flyout.my-gt-menu__flyout > span.my-gt-menu__link"
    },
    logoutButton: {
      selector: "li.branding__user > div.flyout.my-gt-menu__flyout > ul.flyout__content.grid.my-gt-menu__list > li.grid__item.one-whole > button.btn--link.js-logout"
    }
  }
};
