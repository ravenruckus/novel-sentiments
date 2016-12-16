# Read Novels Fast

## Project Description
Explore Novels Fast is a website for hobby novelists who would like to study and read many novels to improve their writing but struggle to find time to read enough because they spend much of their free time writing. The website utilizes data science to find the emotional dips and highs of six classical novels and displays them in bar charts so that the novels and their patterns can be compared.

The novels are broken up into twenty pieces so that they can be equally compared via bar charts.  The mean sentiment score of each section is calculated and the height of each bar determined by that mean score.

The user is able to click on the bars in the charts to read the sentences that coincide with each bar, which allows them to easily and quickly get a feel for how tone fluctuates throughout the stories and possibly apply what they learn in their own writings.

## Features

[Video of Features](https://vimeo.com/195994336 "Feature Video")



## Tech
* jQuery
* ajax
* D3
* Materialize
* Python
* TextBlob
* myjson.com

Python was used to pull the text off of the [Gutenberg Project](https://www.gutenberg.org/browse/scores/top "Gutenberg.org") , first provider of free electronic books. [TextBlob](https://textblob.readthedocs.io/en/dev/ "TextBlob") tokenizes the raw text into sentences and then runs a sentiment analysis on each sentence giving them a score between -1 and 1. One being the most positive and negative one being the most negative language. Json files were generated with python and then loaded up to myjson.com. Ajax calls were made to myjson.com allowing D3 to display the novels in bar chart form. jQuery and D3 allow interactivity of the bar charts. Materialize framework was used for the HTML and CSS, with some added customization. Adobe stock photos were used for the background images.
