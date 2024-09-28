# matchquest-botjs

fintopio botjs auto tap multiple account https://t.me/MatchQuestBot

<img width="702" alt="Code_PZw9unO4Di" src="https://github.com/user-attachments/assets/cbc3c4d1-1bd3-46c1-9a53-b24080fcf258">

## Features
- Auto registration (if user not exist) with referral
- Auto answer daily quiz
- Auto start/claim farm
- Auto booster farm (daily booster)
- Auto play game (catch 'M')
- Auto game booster
- Auto complete task
- Auto claim referral balance

## Requirement
- Node.js

## How to run
1. Clone/download this repository
2. Extract and go to folder
3. Setting .env file
4. Open cmd file folder
5. > npm install
6. > node index
7. Fill query.txt

## How to get query_id?
1. Open telegram web/desktop
2. Go to Settings - Advanced - Experimental settings - Enable webview inspecting
3. Open bot https://t.me/MatchQuestBot
4. Press F12 or right click then select inspect element
5. Go to Application tab - Session storage - Select tgapp.matchain,io - Select '__telegram__initParams' - Select tgWebAppData and copy value start with ```query_id=``` or ```user=```
6. Separate query_id= or user= with the newline (for multiple account)
