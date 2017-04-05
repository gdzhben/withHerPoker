import java.util.List;
import twitter4j.DirectMessage;
import twitter4j.Relationship;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class TwitterBot {

	private Twitter twitter;
	private String consumerKey = "ujF32r149n8QKsRa4saHb7IKb";
	private String consumerSecret = "jYeiNUCiygdHOaJ5wAo9TOVHTmbFQYd0SyA7N4Et16eSWETS5W";
	private String accessToken = "734803373581606915-R6ntbf1SSO4ZnArqXM8yzRVaolVFs7G";
	private String accessTokenSecret = "E8M3LVfNsHwEWTjqfalZC1Ldqw7wngAg0y6YvvrZmImMH";
	
	/* Constructor sets up authorization info for the desired bot account. */
	public TwitterBot() {
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
		  .setOAuthConsumerKey(consumerKey)
		  .setOAuthConsumerSecret(consumerSecret)
		  .setOAuthAccessToken(accessToken)
		  .setOAuthAccessTokenSecret(accessTokenSecret);
		TwitterFactory tf = new TwitterFactory(cb.build());
		twitter = tf.getInstance();
	}
	
	public TwitterBot(String consumerKey, String consumerSecret, String accessToken, String accessTokenSecret) {
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
		  .setOAuthConsumerKey(consumerKey)
		  .setOAuthConsumerSecret(consumerSecret)
		  .setOAuthAccessToken(accessToken)
		  .setOAuthAccessTokenSecret(accessTokenSecret);
		TwitterFactory tf = new TwitterFactory(cb.build());
		twitter = tf.getInstance();
		
		this.consumerKey = consumerKey;
		this.consumerSecret = consumerSecret;
		this.accessToken = accessToken;
		this.accessTokenSecret = accessTokenSecret;
	}
	
	/* Post a tweet from the bot's account */
	public String postTweet(String tweet) {
		if (tweet == null || tweet.isEmpty())
			return "Cannot post empty tweet.";
		
		try {
			twitter.updateStatus(tweet);
		}
		catch (TwitterException e) {
			e.printStackTrace();
		}
		
		return "Sent tweet \"" + tweet + "\"";
	}
	
	/* Get the username of the bot */
	public String getUsername() {
		String name = "";
		
		try {
			name = twitter.getScreenName();
		} 
		catch (TwitterException e) {
			e.printStackTrace();
		} 
		
		return name;
	}
	
	/* Send a direct message to another user. */
	public String sendDirectMessage(String message, String recipient) {
		DirectMessage dm = null;
		
		try {
			dm = twitter.sendDirectMessage(recipient, message);
		} 
		catch (TwitterException e) {
			e.printStackTrace();
		}
		
		return "Sent \"" + dm.getText() + "\" to @" + dm.getRecipientScreenName();
	}
	
	/* Follow a user from the account associated with TwitterBot object. */
	public void followUser(String username) {
		/* Assert that the current user is not already following the account */
		try {
			Relationship relationship = twitter.showFriendship(twitter.getScreenName(), username);
			
			if (relationship.isSourceFollowingTarget())
				return;
		}
		catch (TwitterException e) {
			e.printStackTrace();
		}
		
		/* Follow the desired account. */
		try {
			twitter.createFriendship(username);
		} 
		catch (TwitterException e) {
			e.printStackTrace();
		}
	}
	
	public String receiveLatestDirectMessageFromUser(String username) {
		List<DirectMessage> allMessages = null; 
		String message = null;
		
		try {
			allMessages = twitter.getDirectMessages();
		}
		catch (TwitterException e) {
			e.printStackTrace();
		}
		
		for (DirectMessage msg : allMessages) {
			if (msg.getSenderScreenName().equals(username)) {
				message = msg.getText();
				break;
			}
		}
		
		return message;
	}
}
