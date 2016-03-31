 (function () {

    var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function () {
      var index = $('.bs-component').index($(this).parent());
      $.get(window.location.href, function (data) {
        var html = $(data).find('.bs-component').eq(index).html();
        html = cleanSource(html);
        $("#source-modal pre").text(html);
        $("#source-modal").modal();
      })

    });

    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();

    $(".bs-component").hover(function () {
      $(this).append($button);
      $button.show();
    }, function () {
      $button.hide();
    });

    function cleanSource(html) {
      var lines = html.split(/\n/);

      lines.shift();
      lines.splice(-1, 1);

      var indentSize = lines[0].length - lines[0].trim().length,
          re = new RegExp(" {" + indentSize + "}");

      lines = lines.map(function (line) {
        if (line.match(re)) {
          line = line.substring(indentSize);
        }

        return line;
      });

      lines = lines.join("\n");

      return lines;
    }

    $(".icons-material .icon").each(function () {
      $(this).after("<br><br><code>" + $(this).attr("class").replace("icon ", "") + "</code>");
    });

  })();
  
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  /*
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
  */
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 900) {
          $(this).addClass("slide");
        }
    });
  });
})
