(function() {
  'use strict';

  const margin = {top: 20, right: 30, bottom: 40, left: 30},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
  const svg = d3.select('.barchart').append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
      .append("g");

  const svg2 = d3.select('.barchart2').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       .append("g");

 const svg3 = d3.select('.barchart3').append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
      .append("g");

  const y = d3.scale.linear()
          .range([width, 0]);
  const x = d3.scale.ordinal()
          .rangeRoundBands([0, height], 0.4)

      // .attr("transform", "translate(" + margin.top + "," + margin.left + ")");
  const displaySentences = function(sentences) {
    const $dv = $('<div>').attr('id', 'sent');
    const $main = $('main');
    $dv.appendTo($main)
    for(const line of sentences){
      $('<p>').appendTo($dv).text(line);
      console.log(line)
    }

  }
  const removeSentences = function() {
    const $getDv= $('#sent');
    $getDv.remove();
  }


  const barChart = function(address, svg) {

  // const barChart = function(urlAddress) {}
   const $xhr = $.ajax({
      method: 'GET',
      url: address,
      // url: 'https://api.myjson.com/bins/pd5v',
      dataType: 'json'
   });
  $xhr.done((data) => {
    if ($xhr.status !== 200) {
       return;
    }

    y.domain(d3.extent(data.pieces, function(d) {
        return d.sent_score;
      }))/*.nice()*/;
     x.domain(data.pieces.map(function(d, i) { return i; }));
     svg.selectAll(".bar")
           .data(data.pieces)
          .enter().append("rect")
            .attr("class", function(d) { return "bar--" + (d.sent_score < 0 ? "negative" : "positive"); })
            .attr("y", function(d) {
              if(d.sent_score < 0) {
                return y(0) + Math.abs(d.sent_score);
              }
              if(d.sent_score > 0) {
              return y(d.sent_score);
            };
               })
            .attr("x", function(d, i) { return  i * 15;  })
            .attr("height", function(d) {return Math.abs(y(d.sent_score) -y(0)); })
            .attr("width", x.rangeBand())
            .on("click", function(d) {
              removeSentences();
              displaySentences(d.sentences);
             })
            });
          }
    barChart('https://api.myjson.com/bins/pd5v', svg);
    barChart('https://api.myjson.com/bins/3edlx', svg2);
    barChart('https://api.myjson.com/bins/3147t', svg3);

})();
