# Testing Moodle using Provengo
This directory contains the Provengo project for testing Moodle.


## Running the tests
To run a single random test, run:
```shell 
provengo run moodle
```

See the [Provengo README](moodle/README.md) for more useful commands.

## API
See [Provengo README](moodle/README.md) for a short description of the API.
For a full documentation go to [https://docs.provengo.tech](https://docs.provengo.tech)

## How we tested:
1. We started by creating the [story files](moodle/spec/js/MoodleSurvey.story.js).
2. We then ran the following command to generate the test model:
```shell
provengo analyze -f PDF moodle   
```
3. We repeated steps 1-2 until we were satisfied with the generated model.
4. We added [Event definitions](moodle/spec/js/MoodleSurvey.EventDef.js) to define how the stories actuate the website using Selenium.
5. We used the following command to run the tests:
```shell
provengo run --show-sessions moodle
```
6. We repeated steps 4-5 until we were satisfied with the result.
7. We recorded a video of the running tests and added it to the report. Since more than one browser session was opened, we recorded the entire screen. The link for the video is [here](https://drive.google.com/file/d/1HWUk_sTavgBL2HWFclLurRd8NbeLXhhx/view?usp=sharing).
8. We copied the generated graph of the model to a file named [model.pdf](model.pdf) inside this directory (the link should work).

### Story files
The test stories are in [Tests.story.js](moodle/spec/js/MoodleSurvey.story.js). See the file for a detailed description of the stories.

### Events definition files
The specification for the events are given in [EventDef.js](moodle/spec/js/MoodleSurvey.EventDef.js). See the file for a detailed description of the events.
