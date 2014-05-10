/*
 Author     : kichrum
 */

$('document').ready(function() {
    fillColumns(true);
    setTimeout(switchButton, 3000);
});

var shuffle = function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var cleanColumn = function($col) {
    $col.find('.symbol').each(function(i, symbol) {
        if (i > 2) {
            $(symbol).remove();
        }
    });
};

var fillColumns = function(skipShuffle) {
    $('.col').each(function(j, col) {
        cleanColumn($(col));
        $(col).css('margin-top', '-1750px').css('height', '1751');
        var symbols = [1, 2, 3, 4, 5];
        if (!skipShuffle) {
            symbols = shuffle(symbols);
        }
        for (var i = 0; i < 10; i++) {
            $(col).prepend($('.symbols .symbol' + symbols[i % 5]).clone());
        }
        $(col).animate({marginTop: '0'}, (j + 1) * 1000);
    });
};

var switchButton = function() {
    var $button = $('.button');
    if ($button.hasClass('disabled')) {
        $button.removeClass('disabled');
        $('.button').on('click', spin);
    }
    else {
        $button.addClass('disabled');
        $('.button').off('click');
    }
};

var spin = function(e) {
    e.preventDefault();
    switchButton();
    fillColumns();
    setTimeout(switchButton, 3000);
};
