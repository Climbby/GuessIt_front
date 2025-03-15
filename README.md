fetches API                                                                from vercel backend -> api.js

that API is an array of objects, each object is an user, and is assigned to the users variable -> main.js
selects random user                                                                            ->          
enables events,                                                                           from -> utils/events.js

Utils.js ->

  funcs
    -autoShrinkText -> keeps text within it's container, shrinking it if needed
    -arraysEqual -> checks if: Arrays have same length *AND* Key, value pairs
    
  events
    - !!! handleButtonClick !!! -> game-logic function
    - initAutoComplete -> listens to input from textbox and creates dropdown list, click item = handleButtonClick
    - submitAnswer -> listens to Submit button click, if (text==option AND click) = handleButtonClick
    

    handleButtonClick (game logic):
      - loops through users to see if input is a valid name
      - loops through characteristics:
        . case vibe - can be partially correct (yellow color)
        . case height - compares heights and gives feedback Higher/Lower with arrows
        . default - red = wrong, green = right
      - if input = selectedUser: WIN
