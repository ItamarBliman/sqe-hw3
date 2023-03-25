# Assignment 3: Software Quality Engineering
This is a repository for assignment 3 of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called moodle (https://moodle.org).
Moodle is a free open-source learning management system which is used for online learning and maintaining learning in variety of educational organizations.

## Installation
First, downloading the Moodle site from here https://download.moodle.org/releases/latest/
After that, we need to prepare the testing environment.
For the beginning we need to create an admin user (teacher) with the username "admin" and the password "Samira321!",
and a regular user (student) with the username "user1" and the password "Samira321!", the first and last name doesn't matter.
Now, we need to create a Course with the course name "course1" by the admin user.
Now, the admin needs to assign "user1" to "course1" as a student.

In the Cucumber testings (not relevant for the Provengo part):
In our first scenario, we create a Survey activity, however - if someone wants to run the second scenario by itself, a survey named "survey1" needs to be created before.
The survey's questions type should be "Critical incidents", and the content does not matter.

In the Provengo testing we made constraints that manage the order for critical events, so submitting for example can't happen before creating a survey.


## What we tested
We tested the Survey module that allows for creation and receiving responses by users. We chose to test the following user stories:

*User story:* A student entering a survey activity in a course and submitting a response.

*Preconditions:* There is a course that the student is assigned to, and there is a survey in this course that is open for receiving responses.

*Expected outcome:* A response of a survey was submitted.

*User story:* A teacher deletes a survey activity in a course.

*Preconditions:* There is a course that the teacher is assigned to, and there is a survey in this course.

*Expected outcome:* The survey was deleted from the course.


## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a BDD testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 

## Results
Update all README.md files (except for d-e, see Section 1). Specifically, replace all $$*TODO*…$$ according to the instructions inside the $$.

## Detected Bugs
We detected an interesting case, which may not be a bug but can be ambiguous:
When the student enters the survey but not submitting yet, and the teacher is deleting it, then after the student submits the response to the survey,
the student receive a notice says "Activity deletion in progress..." and this is unclear for the student if his response was submitted or not and what does it mean.
