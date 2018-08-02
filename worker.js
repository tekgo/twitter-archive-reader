self.importScripts('shared.js');

function processMessage(message) {
	updateProgess(0);

	let info = makeInfoObject(); // See shared.js

	var window = {};
	window.YTD = {};
	window.YTD.tweet = {};

	// EVAL IS BAD PROBABLY
	eval(message);
  
  let partKeys = Object.keys(window.YTD.tweet);
  
  let allTweets = [];
  partKeys.map(key => allTweets = allTweets.concat(window.YTD.tweet[key]));

	// Sort all tweets by tweetID
	allTweets.sort(function(a,b) {
		let aid = a.id_str;
		let bid = b.id_str;
		if (aid.length != bid.length) {
			return aid.length - bid.length;
		}
		return aid.localeCompare(bid);

	});

	// Filter out RTs
	let noRTs = allTweets.filter(tweet => {
		return tweet.full_text.indexOf("RT") != 0
	});

	let byId = {};
	let indices = {};

	let progress = 0;

	let searchText = "";
	let searchIndex = {};

	// Process only the non-RTs
	noRTs.forEach(function (tweet) {
		let id_str = tweet.id_str;
		// Build dictionary of tweets by id.

		let text = tweet.full_text
		tweet.entities.urls.forEach(url => text = text.replace(url.url, url.expanded_url));
    tweet.expandedTweet = text;

		let lower = text.toLowerCase();

		searchIndex[searchText.length] = tweet.id_str;
		for (let i = 0; i < lower.length; i+=5) {
			searchIndex[searchText.length + i] = tweet.id_str;
		}
		searchText += lower + " ";

		byId[id_str] = tweet;

		progress += 1;
		if ((progress % 10) == 0) {
			updateProgess((progress / noRTs.length) * 0.99	);
		}
	});

	// info.allTweets = allTweets;
	// info.noRTs = noRTs;
	info.byId = byId;
	// info.indices = indices;
	info.searchText = searchText;
	info.searchIndex = searchIndex;

	self.postMessage(info);
}

function updateProgess(progress) {
	self.postMessage({isUpdate: true, progress: progress});
}

onmessage = function(e) {
	processMessage(e.data);
}