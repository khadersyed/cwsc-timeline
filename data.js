// http://timeline.knightlab.com/docs/options.html
var additionalOptions = {
    start_at_end: true,
    default_bg_color: {r:0, g:0, b:0},
    timenav_height: 250
};


// http://timeline.knightlab.com/docs/json-format.html
var timeline_json = $.getJSON('https://raw.githubusercontent.com/khadersyed/cwsc-timeline/initial_commit/timeline-data.json')
// two arguments: the id of the Timeline container (no '#')
// and the JSON object or an instance of TL.TimelineConfig created from
// a suitable JSON object
window.timeline = new TL.Timeline('timeline-embed'
, timeline_json
// , sample_json
);