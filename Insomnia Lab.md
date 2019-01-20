# Insomnia Lab

The aim of this lab is to get students familiar with making basic GET requests with Insomnia, with particular note to filtering responses, creating variables and setting up Workspaces.

## Tasks
#### Postcodes

- Open Insomnia and make a new Workspace called 'Insomnia Lab'
- Using the Postcodes API (https://postcodes.io/), make a some GET requests to different postcodes
- Using the 'New Request' option, save a named request to GA's postcode
- Using the 'New Request' option, save a named request to your home's postcode
- Using bottom-right filter bar, drill down into the postcode response to find the code of your parish.

#### People in Space
- Make a new folder called 'People in Space'.
- Make a GET request to http://api.open-notify.org/astros.json and filter to find the name of the 2nd person in space.

#### Darksky Weather
- Sign up to the darksky weather API https://darksky.net/dev and follow the instructions to get a token
- Using the darksky API, find the daily summary of the weather tomorrow in London, New York and Tokyo
- Using 'Manage Environment' (⌘ + E) set up a variable called 'token' to save your API key and use this variable in your requests
- Set up a variable called 'darkskyURL' to save the base URL for Darksky API


### Addition stuff
- Using the documentation on https://postcodes.io/ make requests for multiple postcodes using a POST request
- Read the documentation on https://support.insomnia.rest/article/43-chaining-requests and make a chained request to the darksky api, using the 'lat' and 'long' which is return from your home's Postcode
