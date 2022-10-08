$(document).ready(() => {

  //Event listener for updating the character counter when a user inputs text
  $(".tweet-text").on("input", function(e) {
    const maxLength = 140;
    const inputLength = $(this).val().length;
    const charLength = maxLength - inputLength;

    $(this).siblings().children(".counter").val(charLength);

    if (charLength < 0) {
      $(this).siblings().children(".counter").addClass("red");
    } else {
      $(this).siblings().children(".counter").removeClass("red");
    }
  });
}
);
