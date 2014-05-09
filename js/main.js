/*
    Author     : kichrum
*/

$('document').ready(function(){
    fillColumns();
    $('.button').on('click', spin);
});

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var fillColumns = function() {
    $('.col').html('');
    $('.col').each(function(j, col) {
        var symbols = shuffle([1,2,3,4,5]);
        for(var i = 0; i < 10; i++) {
            $(col).append($('.symbols .symbol' + symbols[i%5]).clone());
        }
    });
};

var spin = function(e) {
    e.preventDefault();
    fillColumns();
};
