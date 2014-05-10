/*
 Author     : kichrum
 */

$('document').ready(function() {
    fillColumns(true);
    setTimeout(switchButton, 3000);
    $('.button').on('click', spin);
    $(document).on('keyup', function(e) {
        if ([32, 13].indexOf(e.keyCode) !== -1) {
            spin(e);
        }
    });
    $('.score').text(20);
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
    }
    else {
        $button.addClass('disabled');
    }
};

var animateWin = function(winSymbols, score) {
    var winLinesClasses = [];
    var winSymbolsClasses = [];
    for (var i = 0; i < 5; i++) {
        if (winSymbols[i] !== false) {
            winLinesClasses.push('.line' + (i + 1));
            winSymbolsClasses.push('.symbol' + winSymbols[i]);
            score += 3;
        }
    }
    var $lines = $(winLinesClasses.join(','));
    var $symbols = $(winSymbolsClasses.join(','));
    for (var i = 0; i < 5; i++) {
        $lines.fadeTo(200, 0.1).fadeTo(200, 1.0);
        $symbols.fadeTo(200, 0.1).fadeTo(200, 1.0);
    }
    $('.score').animate({fontSize: '150%'}, 200, function() {
        $(this).text(score)
    }).animate({fontSize: '100%'}, 200);
    if (score > 0) {
        setTimeout(switchButton, winLinesClasses.length ? 2200 : 200);
    }
    else {
        $('.topup').fadeIn(500);
    }
};

var calculateScore = function() {
    var score = parseInt($('.score').text()) - 1;
    var winSymbols = [];
    $('.col').each(function(i, col) {
        $('.symbol', col).each(function(j, symbol) {
            var num = parseInt($(symbol).attr('class').split(' ')[1].replace('symbol', ''));
            if ('undefined' === typeof winSymbols[j]) {
                winSymbols[j] = num;
            }
            else if (winSymbols[j] !== num) {
                winSymbols[j] = false;
            }
            if (i === j) {
                if ('undefined' === typeof winSymbols[3]) {
                    winSymbols[3] = num;
                }
                else if (winSymbols[3] !== num) {
                    winSymbols[3] = false;
                }
            }
            if (i + j === 2) {
                if ('undefined' === typeof winSymbols[4]) {
                    winSymbols[4] = num;
                }
                else if (winSymbols[4] !== num) {
                    winSymbols[4] = false;
                }
            }
            if (j > 1) {
                return false;
            }
        });
    });
    setTimeout(function() {
        animateWin(winSymbols, score)
    }, 3000);
};

var spin = function(e) {
    e.preventDefault();
    if ($('.button').hasClass('disabled')) {
        return false;
    }
    switchButton();
    $('.line').fadeOut(200);
    fillColumns();
    calculateScore();
};
