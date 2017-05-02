module.exports = {
  'Login Test' : function(driver) {
    var home = driver.page.home();
    var username = "vimalgt";

    home.navigate()
      .login(username, "Walk840#")
      .closePopUp();

    home.isLoggedIn(username);
  },

  'Navigation Test' : function (driver) {
    var home = driver.page.home();
    home.navigateToSlotsPage();
    home.navigateToBingoPage();
    home.navigateToCasinoPage();
    home.navigateToPokerPage();
  },

  "Search the game" : function (driver) {
    var home = driver.page.home();
    home.searchGame("Slots");

    home.selectItem(function(result) {
      home.verifyPageName(result.value);
    });
  },

  "Change Language to German" : function (driver) {
    var home = driver.page.home();
    home.selectGermanLanguage();
    home.isLanguageChangedToGerman();
  },

  "Change Language back to English" : function (driver) {
    var home = driver.page.home();
    home.selectEnglishLanguage();
    home.isLanguageChangedToEnglish();
  },

  "Logout from the application" : function(driver) {
    var home = driver.page.home();
    home.logoutUser();
    home.isUserLoggedOut();
  },

  // To close the browser
  after: function (driver) {
    driver.end();
  }
};
