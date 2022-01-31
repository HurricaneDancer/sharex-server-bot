<p>Upload images to your <a href="https://github.com/tycrek/ass">ass</a> ShareX server from a Discord channel.</p>

<h1>How it works</h1> 
<p>
You upload an image or gif to a certain discord channel (which you set in your config), and then the bot will fetch the image from discord, turn it into form data and upload it to your server.

The result should look something like this: <br>
<img src = "https://i.hurricanedancer.com/o7FhxrYdgaAa/thumbnail">

</p>

<h1>How to configure it</h1>
<p>
Rename the config.example.json file in ./src to "config.json" and fill out the information.
Then install all of the node modules with npm install

"botToken" is the token for your discord bot

"authedUsers" is the array of users that can use your bot. It should contain their Discord ID and their ass token for your server.

"uploadChannel" is the ID of the channel you want to upload media to. It will not work if you send it to a random channel.

"baseURL" is the base url for your ass server.

"assHeaders" are the ass-specific headers you want included. See the <a href = "https://github.com/tycrek/ass#header-overrides">docs</a> for the headers.

</p>
