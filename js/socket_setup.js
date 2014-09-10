    window.localKey = Date.now();

    window.socket = io();

    window.BEAR_RUN_LEFT = 1;
    window.BEAR_RUN_RIGHT = 2;
    window.BEAR_JUMP = 3;

    window.socket.on('game_event', function(game_event){
        //console.log(game_event);
        if (game_event.key == window.localKey) {
          // this is an event from this screen so move our bear
          //console.log("ours");
          if (game_event.event_type == BEAR_RUN_LEFT) {
            window.bear.runLeft();
          }
          if (game_event.event_type == BEAR_RUN_RIGHT) {
            window.bear.runRight();
          }
          if (game_event.event_type == BEAR_JUMP) {
            window.bear.jump();
            jumpSfx.play('',0,1,false,false);
          }
        } else {
          console.log("Not ours - local key is " + window.localKey + " and event key is " + game_event.local_key);
        }
      });
