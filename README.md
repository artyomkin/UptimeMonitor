Uptime Monitor checks whether the specified site is available or not.<br/>
It requires Node.js installed.<br/>
1. To configure it:<br/>
  1.1. Go to DOM -> resources -> db.yml<br/>
       Here you should specify the settings of connection parameters<br/>
  1.2. Go to DOM -> resources -> config.yml<br/>
       Here you should specify URLs of resources you want to check<br/>
  1.3. Go to DOM -> resources -> telegramChats.yml<br/>
       Here you should specify web hooks for sending notifications in telegram<br/>
2. To start it you should download the project and execute this command in terminal
```
watch -n 900 node uptimeMonitor.mjs
```
It will check specified sites every 900 seconds
