(function() {
  'use strict';
  $(document).ready(function(){
     $('.parallax').parallax();
   });

  const margin = {top: 20, right: 30, bottom: 40, left: 30},
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
  const svgHeight = 350;
  const svgWidth = 350;
  const svg = d3.select('.barchart')
      //  .attr("width", width + margin.left + margin.right)
       .attr("width", svgWidth)
      //  .attr("height", height + margin.top + margin.bottom)
       .attr("height", svgHeight)
      .append("g")
      // .attr("transform", "translate(" + margin.top + "," + margin.left + ")");
      .attr("transform", "translate(45, -350)");


  const svg2 = d3.select('.barchart2')
        .attr("width", svgWidth )
        .attr("height", svgHeight)
       .append("g")
       .attr("transform", "translate(45, -350)")


 const svg3 = d3.select('.barchart3')
       .attr("width",svgWidth)
       .attr("height", svgHeight)
      .append("g")
      .attr("transform", "translate(45, -350)");

const svg4 = d3.select('.barchart4')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
     .append("g")
     .attr("transform", "translate(45, -350)");

const svg5 = d3.select('.barchart5')
     .attr("width", svgWidth)
     .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(45, -350)");

const svg6 = d3.select('.barchart6')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
     .append("g")
     .attr("transform", "translate(45, -350)");




  const y = d3.scale.linear()
          .range([width, 0]);
  const x = d3.scale.ordinal()
          .rangeRoundBands([0, height], 0.6)

  const $textContainer = $('#text');
  const $textContainer2 = $('#text2');
  const $textContainer3 = $('#text3');


  const displaySentences = function(sentences, i, $textContainer) {
    const $dv = $('<div>').attr('id', 'sent');
    const $h5 = $('<h5>')
    const $p = $('<p>').attr('class', 'section-number')
    $dv.appendTo($textContainer)
    // $h5.appendTo($dv).text(Title)
    $p.appendTo($dv).text('Section ' + (i + 1) + ':')

    for(const line of sentences){
      $('<p>').appendTo($dv).text(line);
    }
  }
  const removeSentences = function() {
    const $getDv= $('#sent');
    $getDv.remove();
  }

  const $textBar = $('#text');
  const $textBar2 = $('#text2');
  const $textBar3 = $('#text3');






  const barChart = function(address, svg, $textContainer, $textBar) {

  // const barChart = function(urlAddress) {}
   const $xhr = $.ajax({
      method: 'GET',
      url: address,
      dataType: 'json'
   });
  $xhr.done((data) => {
    if ($xhr.status !== 200) {
       return;
    }

    // y.domain(d3.extent(data.pieces, function(d) {
    //     return d.sent_score;
    //   }))/*.nice()*/;
    const $h5 = $('<h5>')
    const Title = data.Title;
    // const textTitle = $h5.appendTo($textBar).text(data.Title)
    // h5.append(data.Title)
     y.domain([0, .6])
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
            .on("click", function(d, i) {
              // removeSentences();
              $textContainer.empty()
                // $h5.appendTo($textBar).text(data.Title).remove()
              console.log(Title)
              $h5.appendTo($textBar).text(data.Title)
              displaySentences(d.sentences, i, $textContainer)
             })


        //   const $h2 = $('<h2>');
        // svg.append.$h2.text(function(d) { return d.title;})
            });
          }
    barChart('https://api.myjson.com/bins/pd5v', svg, $textContainer,$textBar);
    barChart('https://api.myjson.com/bins/3edlx', svg2, $textContainer,$textBar);
    barChart('https://api.myjson.com/bins/3147t', svg3, $textContainer2, $textBar2);//frankenstein
    barChart('https://api.myjson.com/bins/26x0x', svg4, $textContainer2,$textBar2);//jungle book
    barChart('https://api.myjson.com/bins/2b7ch', svg5, $textContainer3,$textBar3);//dracula
    barChart('https://api.myjson.com/bins/1u9s1', svg6, $textContainer3,$textBar3);//Pride and Prejudice
})();
