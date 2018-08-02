function isValidKey(key) {
	if (!key || key.length < 0) {
		return false;
	}

	if (key.length < 3 && isAlpha(key)) {
		return false;
	}

	if (stopWords.indexOf(key) != -1) {
		return false;
	}

	return true;
}

let stopWords = ["a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"];

function isAlpha(string) {
	for (var i = 0; i < string.length; i++) {
		let code = string.charCodeAt(i);
		if (!(code > 64 && code < 91) && // upper alpha (A-Z)
	        !(code > 96 && code < 123)) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
}

function makeInfoObject() {
	let info = {};

	info.allTweets = [];
	info.noRTs = [];
	info.byId = {};
	info.indices = [];
	info.flagged = {};
	return info;
}

function stripTweet(tweet) {
	let newTweet = {};

	let expandedTweet = tweet.full_text;
	tweet.entities.urls.forEach(url => expandedTweet = expandedTweet.replace(url.url, url.expanded_url));
	tweet.expandedTweet = expandedTweet;
	return tweet;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
