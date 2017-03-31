/**
 * Interface for class containing useful methods for interacting with MongoDB database.
 */
interface MongoDBInterface {
    //TODO replace date strings with DateTime objects
    public void update(String username, int startChips, int endChips, String startTime, String endTime,
                       int numberOfRounds, int endState, int numOfCardsDiscarded, String gameId);
    //TODO make return LeaderBoard object
    public void getLeaderBoard();
    public Game getGame(String gameID);
}