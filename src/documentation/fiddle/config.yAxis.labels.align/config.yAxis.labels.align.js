(function () {
    var data = [{x: 0, y: 103},{x: 44, y: 103},{x: 154, y: 36},{x: 309, y: 150},{x: 376, y: 150},{x: 400, y: 171}];

    new Contour({
        el: '.myLineChart',
        yAxis: { labels: { align: 'top'} }
      })
    .cartesian()
    .line(data)
    .tooltip()
    .render()
})();