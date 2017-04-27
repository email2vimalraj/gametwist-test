module.exports = {
  loginUser : function (browser, username, password) {
    browser.expect.element("input[name='login-nickname']").to.be.visible;
    browser.expect.element("#login-password").to.be.visible;
    browser.setValue("input[name='login-nickname']", username);
    browser.setValue("#login-password", password);
    browser.useXpath();
    browser.click("//span[contains(text(), 'LOG IN')]");
    browser.useCss();
  },

  navigateToPage : function (browser, pageUrl, pageName) {
    browser.click("a[href='" + pageUrl + "']");
    browser.expect.element("a.CMSListMenuLinkHighlighted").to.have.attribute('href').which.contains(pageUrl);
    browser.expect.element(".nav.breadcrumb").text.to.contains(pageName);
  }
};
