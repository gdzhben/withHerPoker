import org.joda.time.DateTime;

public class TestDB {
    public static void main(String[] args) {
        MongoDB database = new MongoDB();

        database.update("Francis", 10, 50, new DateTime().toString(),
                new DateTime().toString(), 43, 3, 17, "34234");

        database.getLeaderBoard();
    }
}