package hellocucumber;
import io.cucumber.java.en.*;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class StepDefinitions {
    private String webDriver = "webdriver.chrome.driver";
    private String path = "Selenium\\chromedriver.exe";
    private WebDriver driverTeacher;
    private WebDriverWait waitTeacher;
    private WebDriver driverStudent;
    private WebDriverWait waitStudent;


    // This function initialize the moodle module and create the object to start the session with
    public WebDriver getNewDriver() {
        System.setProperty(webDriver, path);
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost/");
        driver.manage().window().maximize();
        return driver;
    }

    // This function search for the login option and try to login with the username and password
    public void enterLoginInfo(WebDriver driver, WebDriverWait wait, String userName, String password) {
        driver.findElement(By.linkText("Log in")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='username']"))).sendKeys(userName);
        driver.findElement(By.xpath("//*[@name='password' and @type='password']")).sendKeys(password);
        driver.findElement(By.id("loginbtn")).click();
    }

    // This step finds the courses tab and select it and then choose the course with name provided
    public void navigateToCourse(WebDriverWait wait, String courseName) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'My courses') and @role='menuitem']"))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@class='multiline' and contains(text(),'" + courseName + "')]"))).click();
    }

    // Scenario 1:
    // This step initialize the moodle module, search for the login option and try to login with the username and password for student.
    @Given("Student {string} with password {string} is Logged in successfully")
    public void studentWithPasswordIsLoggedInSuccessfully(String userName, String password) {
        driverStudent = getNewDriver();
        waitStudent = new WebDriverWait(driverStudent, 40);
        enterLoginInfo(driverStudent, waitStudent, userName, password);
    }

    // This step creates a survey by teacher in the course for including teacher login and quiting the web window
    @And("A Survey {string} in course {string} was created by Teacher {string} with password {string}")
    public void aSurveyInCourseWasCreatedByTeacherWithPassword(String surveyName, String courseName, String userName, String password) {
        teacherWithPasswordIsLoggedInSuccessfully(userName, password);
        teacherEnabledEditMode();
        navigateToCourse(waitTeacher, courseName);
        aSurveyInCourseWasCreated(surveyName, courseName);
        driverTeacher.quit();
    }

    // This step finds the courses tab and select it and then choose the course with name provided
    @When("Student Navigate to Course {string}")
    public void studentNavigateToCourse(String courseName) {
        navigateToCourse(waitStudent, courseName);
    }

    // This step enter the survey with the name provided
    @And("Student enters to the survey {string}")
    public void studentEntersToTheSurvey(String surveyName) {
        WebElement sur = waitStudent.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@class='activity-item ' and @data-activityname='" + surveyName + "']")));
        sur.findElement(By.xpath(".//*[@class='activityname']")).click();
    }

    // This step submit a response to the survey
    @And("Student submits a response to the survey")
    public void studentSubmitsAResponseToTheSurvey() {
        waitStudent.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@type='submit' and @value='Submit']"))).click();
    }

    // This step checks that the response to the survey was submitted successfully by checking that we are in the correct page and notice text is correct
    @Then("The Response to the Survey was submitted successfully")
    public void theResponseToTheSurveyWasSubmittedSuccessfully() {
        Assert.assertEquals("Survey saved", driverStudent.getTitle());
        WebElement submitNotice = driverStudent.findElement(By.xpath("//*[contains(text(),'Thanks for answering this survey')]"));
        Assert.assertTrue(submitNotice.getText().contains("Thanks for answering this survey"));
    }

    // Scenario 2:
    // This step initialize the moodle module, search for the login option and try to login with the username and password for teacher.
    @Given("Teacher {string} with password {string} is Logged in successfully")
    public void teacherWithPasswordIsLoggedInSuccessfully(String userName, String password) {
        driverTeacher = getNewDriver();
        waitTeacher = new WebDriverWait(driverTeacher, 40);
        enterLoginInfo(driverTeacher, waitTeacher, userName, password);
    }

    // This step turn on the edit mode for the teacher
    @And("Teacher enabled Edit mode")
    public void teacherEnabledEditMode() {
        waitTeacher.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@type='checkbox' and @name='setmode']"))).click();    }

    // This step finds the courses tab and select it and then choose the course with name provided for student
    @When("Teacher Navigate to Course {string}")
    public void teacherNavigateToCourse(String courseName) {
        navigateToCourse(waitTeacher, courseName);
    }

    // This step deletes (by the teacher) the survey with the name provided for teacher
    @And("Teacher deletes the survey {string}")
    public void teacherDeletesTheSurvey(String surveyName) {
        WebElement sur = waitTeacher.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@class='activity-item ' and @data-activityname='" + surveyName + "']")));
        sur.findElement(By.xpath(".//*[@class='dropdown']")).click();
        sur.findElement(By.linkText("Delete")).click();
        waitTeacher.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@class='btn btn-primary']"))).click();
    }

    // This step checks that the survey was deleted successfully by checking that we are in the correct page
    @Then("The Survey was deleted successfully")
    public void theSurveyWasDeletedSuccessfully() {
        Assert.assertEquals("Course: course1", driverTeacher.getTitle());
    }

    // Scenario 3:
    // This step creates a survey by teacher in the course
    @And("A Survey {string} in course {string} was created")
    public void aSurveyInCourseWasCreated(String surveyName, String courseName) {
        navigateToCourse(waitTeacher, courseName);
        waitTeacher.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//*[contains(text(),'Add an activity or resource')]"))).get(0).click();
        waitTeacher.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//*[contains(text(),'Survey') and @class='optionname clamp-2']"))).get(0).click();
        waitTeacher.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='id_name']"))).sendKeys(surveyName);
        waitTeacher.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='id_template']/option[text()='Critical incidents']"))).click();
        waitTeacher.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@type='submit' and @value='Save and return to course']"))).click();
    }

    // This step checks that the student was notified about the survey being deleted by checking that we are in the correct page and notice text is correct
    @And("The student was notified about the survey been deleted")
    public void theStudentWasNotifiedAboutTheSurveyBeenDeleted() {
        Assert.assertEquals("Course: course1", driverStudent.getTitle());
        WebElement submitNotice = driverStudent.findElement(By.xpath("//*[contains(text(),'Activity deletion in progress...')]"));
        Assert.assertTrue(submitNotice.getText().contains("Activity deletion in progress..."));
    }
}


