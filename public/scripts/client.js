/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

//Error messages will remain hidden
  $("#error-empty-text").hide();
  $("#error-long-text").hide();


  //Prevent Cross-Site-Scripting(XSS), the escape function will re-encode text so that unsafe characters are converted into a safe "encoded" representation
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //Creates a new tweet <article> element which contains the enitre HTML structure of the tweet
  const createTweetElement = function(tweetData) {
    let $tweetContainer =  $(`
    <article class="tweet">
    <header class="tweeter-header">
      <div class="tweeter-profile">
        <img src="${tweetData.user.avatars}">
        <h3 class="tweeter-name">${tweetData.user.name}</h3>
      </div>
      <div class="tweeter-handle">
        <h3>${tweetData.user.handle}</h3>
      </div>
    </header>
    <div class="tweet-content">
      <h3>${escape(tweetData.content.text)}</h3>
    </div>
    <footer class="tweeter-footer">
        <h5 class="time-ago">${timeago.format(tweetData.created_at)}</h5>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-sharp fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweetContainer;
  };


  //Responsible for looping through individual tweets in the tweets data base and leveraging the createTweetElement function to create tweet <article> element for indivudal tweets, and then appending the tweet <article> element to the #tweet-container
  const renderTweets = function(tweets) {
    for (const element of tweets) {
      const $tweet = createTweetElement(element);
      $(".tweet-container").prepend($tweet);
    }
  };


  //AJAX GET request to retreive data from the tweets database and inputting the data into the renderTweets function
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((data) => {
        renderTweets(data);
      });
  };


  //Event listener when a user submits a TWEET which contains validation checks before the TWEET gets added
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const maxLength = 140;
    const $inputLength = $(this).children("#tweet-text").val().length;
    if (!$inputLength) {
      $("#error-empty-text").slideDown("slow").delay(2000).slideUp("slow");
    } else if ($inputLength > maxLength) {
      $("#error-long-text").slideDown("slow").delay(2000).slideUp("slow");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: tweetData,
      }).then(() => {
        $.ajax({
          method: "GET",
          url: "/tweets",
        })
          .then((data) => {
            renderTweets([data[data.length - 1]]);
          });
      });
    }
  });
  loadTweets();
});

