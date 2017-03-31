import org.joda.time.DateTime;

public class TestDB {
    public static void main(String[] args) {
        MongoDB database = new MongoDB();

        database.update("Francis", 10, 0, new DateTime().toString(),
                new DateTime().toString(), 3, 2, 1, "69");

        database.getLeaderBoard();
    }
}