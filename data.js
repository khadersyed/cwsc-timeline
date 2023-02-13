// http://timeline.knightlab.com/docs/options.html
var additionalOptions = {
    font: "opensans-gentiumbook",
    timenav_height: 250
};


// http://timeline.knightlab.com/docs/json-format.html
$.getJSON('https://raw.githubusercontent.com/khadersyed/cwsc-timeline/initial_commit/timeline-data.json', function(json_data){
    console.log(json_data);
    window.timeline = new TL.Timeline('timeline-embed', json_data, additionalOptions);
});

