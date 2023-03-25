Feature: A set of scenarios for testing the survey module in moodle


  Scenario: Testing a case where submitting a survey response by student
    Given Student "user1" with password "Samira321!" is Logged in successfully
    And A Survey "survey1" in course "course1" was created by Teacher "admin" with password "Samira321!"
    When Student Navigate to Course "course1"
    And Student enters to the survey "survey1"
    And Student submits a response to the survey
    Then The Response to the Survey was submitted successfully


  Scenario: Testing a case where deleting a survey option by teacher
    Given Teacher "admin" with password "Samira321!" is Logged in successfully
    And Teacher enabled Edit mode
    When Teacher Navigate to Course "course1"
    And Teacher deletes the survey "survey1"
    Then The Survey was deleted successfully


#  Scenario: Testing a case where deleting a survey option by teacher while a student is submitting response
#    Given Student "user1" with password "Samira321!" is Logged in successfully
#    And Teacher "admin" with password "Samira321!" is Logged in successfully
#    And Teacher enabled Edit mode
#    And A Survey "survey1" in course "course1" was created
#    When Student Navigate to Course "course1"
#    And Student enters to the survey "survey1"
#    And Teacher Navigate to Course "course1"
#    And Teacher deletes the survey "survey1"
#    And Student submits a response to the survey
#    Then The Survey was deleted successfully
#    And The student was notified about the survey been deleted