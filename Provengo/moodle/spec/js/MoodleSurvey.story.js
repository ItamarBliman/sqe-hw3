/* @provengo summon selenium */

const USER_NAME_TEACHER = 'admin'
const USER_NAME_STUDENT = 'user1'
const PASSWORD = 'Samira321!'
const COURSE_NAME = 'course1'
const SURVEY_NAME = 'survey1'

/**
 * This story opens a new browser window, goes to moodle.org (localhost), login as an admin user, go to the asked course and create a new survey with the asked name.
 * This story is only for creating the relevant testing environment, and is not part of the testing goals.
 */
story('Teacher creates a survey', function () {
  with (new SeleniumSession().start('http://localhost')) {
    initializeSurvey({userName: USER_NAME_TEACHER, password: PASSWORD, courseName: COURSE_NAME, surveyName: SURVEY_NAME})
  }
})

/**
 * This story opens a new browser window, goes to moodle.org (localhost), and login as a student, then go to the asked course, enter the asked survey and submit a response to it.
 */
story('Testing a case where submitting a survey response by student', function () {
  waitFor(Any("EndOfAction").and(Any({eventName: "InitializeSurvey"})))
  with (new SeleniumSession().start('http://localhost')) {
    interrupt(Any("EndOfAction").and(Any({eventName: "DeleteSurvey"})), function () {
      login({userName: USER_NAME_STUDENT, password: PASSWORD})
      navigateToCourse({courseName: COURSE_NAME})
      enterSurvey({surveyName:SURVEY_NAME})
    })
    submittedSurvey()
    }
})

/**
 * This story is a constraint for checking the end result of the stories, so this constraint makes sure that in every run, if the student submitted the survey before it was deleted,
 * the student will be notified that the response was successful.
 */
story('Submitted before the survey was deleted', function () {
  on(Any("EndOfAction").and(Any({eventName: "EnterSurvey"})), function (e) {
    interrupt(Any("EndOfAction").and(Any({eventName: "DeleteSurvey"})), function () {
      waitFor(Any("EndOfAction").and(Any({eventName: "SubmittedSurvey"})))
      e.data.session.responseWasSubmittedSuccessfully()
    })
  })
})

/**
 * This story is a constraint for checking the end result of the stories, so this constraint makes sure that in every run, if the student submitted the survey after it was deleted,
 * the student will be notified that the response was not successful and that the survey is being deleted.
 * */
story('Submitted after the survey was deleted', function () {
  waitFor(Any("EndOfAction").and(Any({eventName: "DeleteSurvey"})))
  on(Any("EndOfAction").and(Any({eventName: "SubmittedSurvey"})), function (e) {
      e.data.session.responseWasNotSubmittedSuccessfully()
  })
})

/**
 * This story opens a new browser window, goes to moodle.org (localhost), and login as a teacher, then go to the asked course, choose the asked survey and delete it.
 */
story('Testing a case where deleting a survey option by teacher', function () {
  waitFor(Any("EndOfAction").and(Any({eventName: "InitializeSurvey"})))
  with (new SeleniumSession().start('http://localhost')) {
    login({userName: USER_NAME_TEACHER, password: PASSWORD})
    enabledEditMode()
    navigateToCourse({courseName: COURSE_NAME})
    deleteSurvey({surveyName: SURVEY_NAME})
    deleteSurveyWasSuccessfully()
  }
})
