interface MongoDBInterface {
    public void update(String username, int startChips, int endChips, DateTime startTime, DateTime endTime,
                       int numberOfRounds, int endState, int numOfCardsDiscarded, String gameId);
    public LeaderBoard getLeaderBoard();
    public Game getGame(String gameID);
}