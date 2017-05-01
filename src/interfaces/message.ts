export class Message {
    public static readonly WELCOME_MESSAGE: string = "Warm welcome to playing poker withHer.";

    public static readonly INSTRUCTION_MESSAGE: string =
    `You will be playing this poker game with 4 other bot player.\n
    At the start of the game you will all be given amount of 100 game chips to bet.
    In the first round you will have the option to either FOLD, SEE or RAISE.
    Then you can choose to whether you want to discard some of your cards.\n
    The maximum number of cards you can discard is 3.\n
    Then in the second round you can again choose to  FOLD, SEE or RAISE.
    Following by 3rd round, everyone have to show their cards or fold and the game will announce the winner.
    Then move to next round.`;

    public static readonly INSTRUCTION_MESSAGE_2: string =
    `In the case of a bot player runing out of poker chips it will not able to make to the next round.
     remaining player will continue the game to next round. 
     But if the human player runing out of chips. 
     Game will be over.`;

    public static readonly ERRORS = {
        BETTING_COMMAND_ERROR: "Your input to the game was invalid. Your input should be as following: see raise fold!",
        DISCARD_COMMAND_ERROR: "Valid commands are (3 nos. inclusive between 0 and 4 separated by comma or space) or 'no'",
        SHOWDOWN_COMMAND_ERROR: "Valid commands are show or fold!",
        PLAY_AGAIN_COMMAND_ERROR: "Valid commands are yes/y or no/n!"
    }

    public static readonly QUESTION = {
        BETTING_COMMAND_QUESTION: "Would you like to see raise or fold?",
        DISCARD_COMMAND_QUESTION: "Enter indexes of 0-4 of your hand to discard separated by commas or space?",
        SHOWDOWN_COMMAND_QUESTION: "Would you like show or fold?",
        PLAY_AGAIN_COMMAND_QUESTION: "Would you like to play again?"
    }

    public readonly OTHER = {
        BUST_MESSAGE: "Sorry you are BUST! Game Over!",
        WON_MESSAGE: "Congratulations! You won the game!"
    }
}