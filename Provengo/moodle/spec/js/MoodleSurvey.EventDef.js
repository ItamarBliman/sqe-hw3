/* @Provengo summon selenium */


/**
 *  The InitializeSurvey event defines the selenium actions for creating a survey with the information from the parameters.
 *  This event is not part of what we check in our tests, as it is only used for initializing the data, so we can start our tests.
 */
defineEvent(SeleniumSession, "InitializeSurvey", function(session, e) {
    session.click("//*[contains(text(),'Log in')]");
    session.writeText("//*[@id='username']", e.userName);
    session.writeText("//*[@name='password' and @type='password']", e.password);
    session.click("//*[@id='loginbtn']");
    session.click("//*[@type='checkbox' and @name='setmode']");
    session.click("//*[contains(text(),'My courses') and @role='menuitem']");
    session.click("//*[@class='multiline' and contains(text(),'" + e.courseName + "')]");
    // choose the survey option out of the activities list
    session.click("//*[contains(text(),'Add an activity or resource')]");
    session.click("//*[contains(text(),'Survey') and @class='optionname clamp-2']");
    // fill in the survey name with the given parameter
    session.writeText("//*[@id='id_name']", e.surveyName);
    // choose the type of survey
    session.click("//*[@id='id_template']/option[text()='Critical incidents']");
    // submit the creation
    session.click("//*[@type='submit' and @value='Save and return to course']");
})

/**
 *  The Login event defines the selenium actions for login in moodle with the username and password from the parameters.
 */
defineEvent(SeleniumSession, "Login", function(session, e) {
    session.click("//*[contains(text(),'Log in')]");
    session.writeText("//*[@id='username']", e.userName);
    session.writeText("//*[@name='password' and @type='password']", e.password);
    session.click("//*[@id='loginbtn']");
})

/**
 * The EnabledEditMode event defines the selenium action for enabling edit mode for the admin.
 */
defineEvent(SeleniumSession, "EnabledEditMode", function(session, e) {
    session.click("//*[@type='checkbox' and @name='setmode']");
})

/**
 * The NavigateToCourse event defines the selenium action for navigating to the course given as a parameter and click the course button.
 */
defineEvent(SeleniumSession, "NavigateToCourse", function(session, e) {
    session.click("//*[contains(text(),'My courses') and @role='menuitem']");
    session.click("//*[@class='multiline' and contains(text(),'" + e.courseName + "')]");
})

/**
 * The EnterSurvey event defines the selenium action for entering the survey with the name of the given parameter.
 */
defineEvent(SeleniumSession, "EnterSurvey", function(session, e) {
    session.click("//*[@class='activity-item ' and @data-activityname='" + e.surveyName + "']/div[1]/div[1]/div[1]/div/div[2]/div[2]");
})

/**
 * The SubmittedSurvey event defines the selenium action for submitting the survey after already in the survey.
 */
defineEvent(SeleniumSession, "SubmittedSurvey", function(session, e) {
    session.click("//*[@type='submit' and @value='Submit']");
})

/**
 * The DeleteSurvey event defines the selenium action for deleting the survey (an admin action only) with the name of the given parameter.
 */
defineEvent(SeleniumSession, "DeleteSurvey", function(session, e) {
    // getting to the survey's dropdown menu (the 3 dots) of the survey with the asked name
    session.click("//*[@class='activity-item ' and @data-activityname='" + e.surveyName + "']/div[1]/div[2]");
    // clicking the 'Delete' option from the survey's dropdown menu
    session.click("//*[@class='activity-item ' and @data-activityname='" + e.surveyName + "']/div[1]/div[2]/div/div/div/div/div/a[6]");
    // approving the deletion by clicking 'Yes'
    session.click("//*[@class='btn btn-primary']");
})

/**
 * The DeleteSurveyWasSuccessfully event defines the selenium action for viewing the correct home page after deleting the survey.
 */
defineEvent(SeleniumSession, "DeleteSurveyWasSuccessfully", function(session, e) {
    // the current page is the course page after deletion
    session.waitForVisibility("//h1[contains(text(),'course1')]", 5000);
})

/**
 * The ResponseWasSubmittedSuccessfully event defines the selenium action for viewing the correct notification after submitting the response,
 * in the scenario where the student submitted the response and only after the survey was deleted.
 */
defineEvent(SeleniumSession, "ResponseWasSubmittedSuccessfully", function(session, e) {
    // the notification of submitting a survey successfully
    session.waitForVisibility("//*[contains(text(),'Thanks for answering this survey')]", 5000);

    // Assert.assertEquals("Survey saved", driverStudent.getTitle());
    // WebElement submitNotice = driverStudent.findElement(By.xpath("//*[contains(text(),'Thanks for answering this survey')]"));
    // Assert.assertTrue(submitNotice.getText().contains("Thanks for answering this survey"));
})

/**
 * The ResponseWasNotSubmittedSuccessfully event defines the selenium action for viewing the correct notification after deleting the survey,
 * in the scenario where the student submitted the response but the survey was deleted before submitting.
 */
defineEvent(SeleniumSession, "ResponseWasNotSubmittedSuccessfully", function(session, e) {
    // after submitting the student is back in the course page
    session.waitForVisibility("//h1[contains(text(),'course1')]", 5000);
    // the notification of submitting a survey unsuccessfully
    session.waitForVisibility("//*[contains(text(),'Activity deletion in progress...')]", 5000);
})
