var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(canvas)

listenToUser(canvas)

var eraserEnabled = false
// 选择 画笔 or 橡皮擦
pen.onclick = function () {
	eraserEnabled = false
	pen.classList.add('active')
	eraser.classList.remove('active')
}

eraser.onclick = function () {
	eraserEnabled = true
	eraser.classList.add('active')
	pen.classList.remove('active')
}
// 清空画板
clear.onclick = function () { 
	ctx.clearRect(0,0,canvas.width,canvas.height)
}
//下载
download.onclick = function () {
	var url = canvas.toDataURL('image/png')
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = 'picture'
	a.target = '_blank'
	a.click()
}


// 选择画笔颜色
black.onclick = function () {
	ctx.strokeStyle = 'black'
	black.classList.add('active')
	red.classList.remove('active')
	green.classList.remove('active')
	blue.classList.remove('active')
}
red.onclick = function () {
	ctx.strokeStyle = 'red'
	red.classList.add('active')
	black.classList.remove('active')
	green.classList.remove('active')
	blue.classList.remove('active')
}
green.onclick = function () {
	ctx.strokeStyle = 'green'
	green.classList.add('active')
	black.classList.remove('active')
	red.classList.remove('active')
	blue.classList.remove('active')
}
blue.onclick = function () {
	ctx.strokeStyle = 'blue'
	blue.classList.add('active')
	black.classList.remove('active')
	green.classList.remove('active')
	red.classList.remove('active')
}

// 选择画笔线宽
thin.onclick = function () {
	lineWidth = 5
}
thick.onclick = function () {
	lineWidth = 10
}

function autoSetCanvasSize(canvas) {
	function setCanvasSize() {
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth
		canvas.height = pageHeight
	}
	setCanvasSize()
	window.onresize = function () {
		setCanvasSize()
	}
	ctx.fillStyle = 'white'
	ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath()
	ctx.lineWidth = lineWidth
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
	ctx.closePath()
}

function listenToUser(canvas) {
	var using = false
	var lastPoint = { 'x': undefined, 'y': undefined }
	if (document.body.ontouchstart !== undefined) {
		// 触屏设备
		canvas.ontouchstart = function (e) {
			using = true
			var x = e.touches[0].clientX
			var y = e.touches[0].clientY
			if (eraserEnabled) {
				ctx.clearRect(x - 5, y - 5, 10, 10)
			} else {
				lastPoint = { 'x': x, 'y': y }
			}
		}
		canvas.ontouchmove = function (e) {
			var x = e.touches[0].clientX
			var y = e.touches[0].clientY
			var newPoint = { 'x': x, 'y': y }
			if (!using) { return }
			if (eraserEnabled) {
				ctx.clearRect(x - 6, y - 6, 14, 14)
			} else {
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
				lastPoint = newPoint
			}
		}
		canvas.ontouchend = function () {
			using = false
		}
	} else {
		// 非触屏设备
		canvas.onmousedown = function (e) {
			using = true
			var x = e.clientX
			var y = e.clientY
			if (eraserEnabled) {
				ctx.clearRect(x - 5, y - 5, 10, 10)
			} else {
				lastPoint = { 'x': x, 'y': y }
			}
		}

		canvas.onmousemove = function (e) {
			var x = e.clientX
			var y = e.clientY
			var newPoint = { 'x': x, 'y': y }
			if (!using) { return }
			if (eraserEnabled) {
				ctx.clearRect(x - 5, y - 5, 10, 10)
			} else {
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
				lastPoint = newPoint
			}
		}

		canvas.onmouseup = function () {
			using = false
		}
	}




}
