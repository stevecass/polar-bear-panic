    function makeBearKey() {
      return  "br" +Date.now();
    }
    window.localBearKey = "br" +Date.now();
    
    window.bears = [];

    window.socket = io();

    window.BEAR_RUN_LEFT = 1;
    window.BEAR_RUN_RIGHT = 2;
    window.BEAR_JUMP = 3;

    window.socket.on('game_event', function(game_event){
      console.log(game_event)

        var targetBear = window.bears[game_event.key];
        if (!targetBear) {
          console.log('target bear does not exist. No key ' + game_event.key + " in map ");
          targetBear = new Bear(this.game, 900, 500);
          window.game.add.existing(targetBear);
          var newBearKey = makeBearKey();
          window.bears[newBearKey] = targetBear;
        }

        // now give the event to the bear

        if (game_event.event_type == BEAR_RUN_LEFT) {
          targetBear.runLeft();
        }
        if (game_event.event_type == BEAR_RUN_RIGHT) {
          targetBear.runRight();
        }
        if (game_event.event_type == BEAR_JUMP) {
          targetBear.jump();
          jumpSfx.play('',0,1,false,false);
        }
      });
