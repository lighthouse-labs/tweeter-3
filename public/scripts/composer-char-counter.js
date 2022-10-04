$(document).ready(() => {

  //Event listener for updating the character counter when a user inputs text
  $(".tweet-text").on("input", function(e) {
    let maxLength = 140;
    let inputLength = $(this).val().length;
    let charLength = maxLength - inputLength;

    $(this).siblings().children(".counter").val(charLength);

    if (charLength < 0) {
      $(this).siblings().children(".counter").addClass("red");
    } else {
      $(this).siblings().children(".counter").removeClass("red");
    }
  });
}
);
