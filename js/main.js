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

var cleanColumn = function($col) {
    $col.find('.symbol').each(function(i, symbol) {
        if (i > 2) {
            $(symbol).remove();
        }
    });
};

var fillColumns = function() {
    $('.col').each(function(j, col) {
        cleanColumn($(col));
//        $(col).css('margin-top', '-1227px').css('height', '1228');
        $(col).css('margin-top', '-1750px').css('height', '1751');
        var symbols = shuffle([1,2,3,4,5]);
        for(var i = 0; i < 10; i++) {
            $(col).prepend($('.symbols .symbol' + symbols[i%5]).clone());
        }
        $(col).animate({ marginTop: '0' }, 1000);
    });
};

var spin = function(e) {
    e.preventDefault();
    fillColumns();
};
