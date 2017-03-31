import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/**
 * MongoDB - class containing useful functions for interacting with the MongoDB
 * database.
 */
public class MongoDB implements MongoDBInterface {
    /**
     * Updates the database with a new Document containing information pertaining to a game.
     * @param username Username of human player.
     * @param startChips Number of chips at beginning of game.
     * @param endChips Number of chips at end of game.
     * @param startTime Time at which game began.
     * @param endTime Time at which game ended.
     * @param numberOfRounds Number of rounds before game ended.
     * @param endState Integer corresponding to state of game.
     * @param numOfCardsDiscarded Number of cards discarded throughout game.
     * @param gameId Unique ID of specific game.
     */
    // TODO replace date strings with DateTime objects
    // TODO use player credentials to connect to database
    public void update(String username, int startChips, int endChips, String startTime,
                       String endTime, int numberOfRounds, int endState, int numOfCardsDiscarded,
                       String gameId) {

        String authenticationURI = "mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1";
        String databaseName = "testDB";
        String collectionName = "test";

        MongoClientURI connectionString = new MongoClientURI(authenticationURI);
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        // Get collection of documents from database.
        MongoCollection<Document> collection = database.getCollection(collectionName);

        // Construct new document using input parameters.
        Document doc = new Document("userName", username)
                .append("startChips", startChips)
                .append("endChips", endChips)
                .append("startTime", startTime)
                .append("endTime", endTime)
                .append("numberOfRounds", numberOfRounds)
                .append("endState", endState)
                .append("numOfCardsDiscarded", numOfCardsDiscarded)
                .append("gameId", gameId);

        // Insert new Document to the database.
        collection.insertOne(doc);
    }

    /**
     * Queries database and returns LeaderBoard object containing information regarding history of unique players.
     */
    // TODO make LeaderBoard object and return instead of printing
    // TODO use player credentials to connect to database
    public void getLeaderBoard() {
        String authenticationURI = "mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1";
        String databaseName = "testDB";
        String collectionName = "test";

        MongoClientURI connectionString = new MongoClientURI(authenticationURI);
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        // Get collection of documents from database.
        MongoCollection<Document> collection = database.getCollection(collectionName);
        FindIterable<Document> cursor = collection.find();
        cursor.forEach((Block<? super Document>) (currentDoc)->System.out.println(currentDoc));

        //return new LeaderBoard();
    }

    /**
     * Returns
     * @param gameID Unique Id of specific game.
     * @return Information pertaining to desired game.
     */
    // TODO make Game object
    // TODO use player credentials to connect to database
    public Game getGame(String gameID) {
        return new Game();
    }
}