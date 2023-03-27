# lyftrondata
Problem 1:

Create a form with 1 dropdown "Select Week" which will list all the weeks of the current month

and 1 button "Start Tracking" in the middle of the screen. Once the button is clicked, an API call

will be sent to the weather API to get the weather details of 1 week for New York.

*API details are at the end of this problem description.

On successful API calls, a table will be shown on the web page with Temperature details where

table will have the following columns:

● Day

● Date

● Min Temperature

● Max Temperature

If there's an error in the API, a custom error message "An error Occurred" should be shown

instead of the table.

Following is the API URL for New York:

https://api.open-meteo.com/v1/forecast?latitude=40.71&amp;longitude=-

74.01&amp;timezone=America/New_York&amp;daily=temperature_2m_max,temperature_2m_min&amp;start_

date=2023-03-12&amp;end_date=2023-03-17

Hints:

- You can change start_date and end_date in the url based on the selected week from the

dropdown menu

- Date format for start_date and end_date is YYYY-MM-DD

Expected Result:

There'll be an index.html page which will include an external JS file with all the code. On

opening the index.html page in the browser, it should load the form with above mentioned fields

where clicking on the "Start Tracking" button should load the temperature data of the selected

week.