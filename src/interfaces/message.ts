export class Message {
    public static readonly WELCOME_MESSAGE: string = "Warm welcome to playing poker withHer!";

    public static readonly INSTRUCTION_MESSAGE: string =
    "You will be playing this poker game with 4 other bot player." + "\n" +
    "You will start with 100 Poker chips." + "\n" +
    "First Round: FOLD, SEE or RAISE" + "\n" +
    "Second Round: comma or space separated index of your cards to discard (Max 3 indexes)" + "\n" +
    "Third Round: FOLD, SEE or RAISE" + "\n" +
    "Fourth round: SHOW or FOLD" + "\n" +
    "Winner will be declared" + "\n";

    public static readonly INSTRUCTION_MESSAGE_2: string =
    "To quit the game any time: QUIT" + "\n" +
    "To play the game: DEALME" + "\n" +
    "In the case of a bot player runing out of poker chips it will not able to make to the next round." + "\n" +
    "Remaining player will continue the game to next round." + "\n" +
    "But if the human player runing out of chips. Game will be over.";

    public static readonly ERRORS = {
        BETTING_COMMAND_ERROR: "Your input to the game was invalid. Your input should be as following: see raise fold!",
        DISCARD_COMMAND_ERROR: "Valid commands are (3 nos. inclusive between 0 and 4 separated by comma or space) or 'no'",
        SHOWDOWN_COMMAND_ERROR: "Valid commands are show or fold!",
        PLAY_AGAIN_COMMAND_ERROR: "Valid commands are yes/y or no/n!",
        WAIT_FOR_SERVER_TO_PROCESS: "Wait for the server to respond!",
        DEAL_ME_ERROR: "Enter dealme to play",
        DUPLICATE_DISCARD_ERROR: "You cannot enter duplicate indexes!",
        NOT_ENOUGH_CHIPS: "Not enough chips to raise or see!"
    }

    public static readonly QUESTION = {
        BETTING_COMMAND_QUESTION: "Would you like to see raise or fold?",
        DISCARD_COMMAND_QUESTION: "Enter indexes of 0-4 of your hand to discard separated by commas or space?",
        SHOWDOWN_COMMAND_QUESTION: "Would you like show or fold?",
        PLAY_AGAIN_COMMAND_QUESTION: "Would you like to play again?"
    }

    public static readonly OTHER = {
        BUST_MESSAGE: "Sorry you are BUST! Game Over!" + "\n" +
        "To restart the game, enter dealme",
        WON_MESSAGE: "Congratulations! You won the game!" + "\n" +
        "To restart the game, enter dealme"
    }

    public static readonly QUIT_GAME = "Game quitted! To restart the game, enter dealme!";
}