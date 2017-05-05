var homeCommands = {
  /**
   * Login with the given username and password
   * @param username The username of the user
   * @param password The password of the user
   * @returns a context
   */
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

  /**
   * Closes the popup if appears
   * @returns the context
   */
  closePopUp: function() {
    return this.api.element("css selector", "@closeButtonInPopup", function(result) {
      if (result.status !== -1) {
        this.waitForElementVisible("@closeButtonInPopup", 3000)
          .click("@closeButtonInPopup");
      }
      return this.expect.element("@closeButtonInPopup").to.not.be.present;
    });
  },

  /**
   * Checks whether the given username is logged in
   * @param username The username to verify
   * @returns the context
   */
  isLoggedIn: function(username) {
    return this.waitForElementVisible("@nickname", 3000)
      .expect.element("@nickname").text.to.equal(username);
  },

  /**
   * Navigates to the Slots page
   * @returns the context
   */
  navigateToSlotsPage: function() {
    return navigateToPage(this, "@slotsButton", "Slots");
  },

  /**
   * Navigates to the Bingo page
   * @returns the context
   */
  navigateToBingoPage: function () {
    return navigateToPage(this, "@bingoButton", "Bingo");
  },

  /**
   * Navigates to the Casino page
   * @returns the context
   */
  navigateToCasinoPage: function () {
    return navigateToPage(this, "@casinoButton", "Casino");
  },

  /**
   * Navigates to the Poker page
   * @returns the context
   */
  navigateToPokerPage: function () {
    return navigateToPage(this, "@pokerButton", "Poker");
  },

  /**
   * Searches the given game keyword
   * @param searchKeyword The search keyword
   */
  searchGame: function(searchKeyword) {
    this.setValue("@searchInput", searchKeyword);
    this.api.pause(1000);
    this.waitForElementVisible("@searchItem", 3000);
  },

  /**
   * Selects the item in the search results
   * @param callback The callback which yields the selected item
   * @returns the context
   */
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

  /**
   * Verifies the current page name with the given pagename
   * @param pagename The pagename to be verified
   * @returns this context
   */
  verifyPageName: function(pagename) {
    return this.waitForElementVisible("@breadCrumb", 3000)
      .expect.element("@breadCrumb").text.to.contains(pagename);
  },

  /**
   * Selects the language as German
   * @returns this context
   */
  selectGermanLanguage: function () {
    this.moveToElement("@selectLanguageButton", 10, 10)
      .waitForElementVisible("@deutschLanguageButton", 3000)
      .click("@deutschLanguageButton");
    this.api.pause(3000);
    return this;
  },

  /**
   * Selects the language as English
   * @returns this context
   */
  selectEnglishLanguage: function () {
    this.moveToElement("@selectLanguageButton", 10, 10)
      .waitForElementVisible("@englishLanguageButton", 3000)
      .click("@englishLanguageButton");
    this.api.pause(3000);
    return this;
  },

  /**
   * Checks the language is changed to german
   * @returns this context
   */
  isLanguageChangedToGerman: function () {
    return this.expect.element("@buyTwistsButton").text.to.equal("TWISTS KAUFEN");
  },

  /**
   * Checks the language is changed to english
   * @returns this context
   */
  isLanguageChangedToEnglish: function () {
    return this.expect.element("@buyTwistsButton").text.to.equal("BUY TWISTS");
  },

  /**
   * Logouts the user
   * @returns this context
   */
  logoutUser: function() {
    return this.moveToElement("@userMenuLink", 10, 10)
      .waitForElementVisible("@logoutButton", 3000)
      .click("@logoutButton");
  },

  /**
   * Checks whether the user is logged out
   * @returns this context
   */
  isUserLoggedOut: function () {
    return this.expect.element("@username").to.be.visible.before(5000);
  }
};

/**
 * A helper function used for navigation
 * @param driver The driver context
 * @param urlElement The url element
 * @param pageName The name of the page
 * @returns {boolean} True if success; false, otherwise.
 */
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
