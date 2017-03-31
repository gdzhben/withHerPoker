import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

class MongoDB implements MongoDBInterface {
    // TODO replace date strings with DateTime objects
    public void update(String username, int startChips, int endChips, String startTime, String endTime,
                       int numberOfRounds, int endState, int numOfCardsDiscarded, String gameId) {
        MongoClientURI connectionString = new MongoClientURI("mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase("mydb");

        MongoCollection<Document> collection = database.getCollection("test");

        Document doc = new Document("userName", username)
                .append("startChips", startChips)
                .append("endChips", endChips)
                .append("startTime", startTime)
                .append("endTime", endTime)
                .append("numberOfRounds", numberOfRounds)
                .append("endState", endState)
                .append("numOfCardsDiscarded", numOfCardsDiscarded)
                .append("gameId", gameId);

        collection.insertOne(doc);
    }

    //TODO make LeaderBoard object
    public void getLeaderBoard() {
        MongoClientURI connectionString = new MongoClientURI("mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase("mydb");
        MongoCollection<Document> collection = database.getCollection("test");

        FindIterable<Document> cursor = collection.find();
        cursor.forEach((Block<? super Document>) (c)->System.out.println(c));

        //return new LeaderBoard();
    }

    public Game getGame(String gameID) {
        return new Game();
    }
}