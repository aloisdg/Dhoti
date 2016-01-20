function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function drawCircle(left, top, radius, color, backgroundColor) {
    var centerX = canvas.width / 2 + (left * radius * 2);
    var centerY = canvas.height / 2 + (top * radius * 2);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = backgroundColor;
    context.lineWidth = 6;
    context.stroke();
}
function draw(backgroundColor, columns, rows, radius, isEmpty) {
    var adjustColumns = -Math.floor(columns / 2);
    var adjustRows = -Math.floor(rows / 2);
    for (var x = adjustColumns; x < columns + adjustColumns; x++)
        for (var y = adjustRows; y < rows + adjustRows; y++)
            if (getRandomInt(0, 6) > 1) {
                var color = colors[getRandomInt(8, colors.length)];
                if (!isEmpty)
                    drawCircle(x, y, radius, color, backgroundColor);
                else
                    drawCircle(x * 1.3, y * 1.3, radius, backgroundColor, color);
            }
}
function drawBackground(color, width, height) {
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = color;
    context.fill();
}
function generate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(backgroundColor, canvas.width, canvas.height);
    draw(backgroundColor, columns, rows, size, isEmpty);
    output.href = canvas.toDataURL("image/png");
}
var isDark = true;
var isEmpty = false;
var size = 28;
// todo : fix even numbers
var columns = 5;
var rows = 5;
// we use base16 colors
var colors = [
    "#031A16", "#0B342D", "#184E45", "#2B685E", "#5F9C92", "#81B5AC", "#A7CEC8", "#D2E7E4",
    "#3E9688", "#3E7996", "#3E4C96", "#883E96", "#963E4C", "#96883E", "#4C963E", "#3E965B"
];
var backgroundColor = isDark ? colors[0] : colors[7];
var output = document.getElementById("output");
var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');
generate();
document.getElementById('new').addEventListener('click', function () {
    generate();
}, false);
document.getElementById('export').addEventListener('click', function () {
    var win = window.open(output.href, '_blank');
    win.focus();
}, false);
