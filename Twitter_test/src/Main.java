
public class Main {

	public static void main(String[] args) {
		
		TwitterBot lad = new TwitterBot();
		
		System.out.println(lad.getUsername());
		System.out.println(lad.sendDirectMessage("lad lad", "darryyylh"));
		lad.followUser("realDonaldTrump");
		System.out.println("Latest message: " + lad.receiveLatestDirectMessageFromUser("darryyylh"));
	}
	
}
