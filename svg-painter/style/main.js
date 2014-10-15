$(document).ready(function() {
	function flower() {
		var paper = Raphael($('.svg1')[0], 320, 320);
		paper.setStart();
		paper.radius(10, 10, 100, 100, 1, 100);
		paper.text(60, 60, "第一");
		var fl1 = paper.setFinish();
		paper.setStart();
		paper.radius(120, 10, 100, 100, 100, 1);
		paper.text(170, 60, "第二");
		var fl2 = paper.setFinish();
		paper.setStart();
		paper.radius(10, 120, 100, 100, 100, 1);
		paper.text(60, 170, "第三");
		var fl3 = paper.setFinish();
		paper.setStart();
		paper.radius(120, 120, 100, 100, 1, 100);
		paper.text(170, 170, "第四");
		var fl4 = paper.setFinish();
		var flo = paper.set();
		flo.push(fl1, fl2, fl3, fl4);
		$.each(flo, function(index, val) {
			val[0].attr({
				fill: '#CCC',
				stroke: '#FFF',
			});
			val[1].attr({
				fill: '#FFF'
			});
			val.hover(function() {
				val[0].attr('fill', "#FFF");
				val[1].attr('fill', "#CCC");
			}, function() {
				val[0].attr('fill', "#CCC");
				val[1].attr('fill', "#FFF");
			});
		});
		flo.click(function(event) {
			var x = $('.svg1').offset().left,
				y = $('.svg1').offset().top;
			paper.ring(event.clientX - x, event.clientY - y);
		});
	}

	function flower2() {
		var paper = Raphael($('.svg2')[0], 320, 320);
		paper.setStart();
		for (var i = 0; i < 12; i++) {
			var petal = paper.radius(50, 50, 150, 150, 0, 100).attr({
				'stroke': '#FFF',
				"fill": "rgba(0,0,0,0)"
			});
			petal.transform('r' + i * 30);
		}
		var fl = paper.setFinish();
		var ani = Raphael.animation({
			transform: '...r360'
		}, 10000, "linear").repeat(Infinity);
		// fl[11].animate(ani);
		// fl[11].pause(ani);
		fl[11].hover(function() {
			// fl[11].resume(ani);
			fl.animate(ani);
		}, function() {
			fl.stop(ani);
		});
	};

	function flower3() {
		var color = ["255,219,112", "219,255,112", "148,255,112", "112,255,148", "112,255,219", "112,219,255",
			"112,148,255", "148,112,255", "219,112,255", "255,112,219", "255,112,148", "255,148,112"
		];
		var paper = Raphael($('.svg3')[0], 600, 600);
		paper.setStart();
		for (var i = 0; i < 12; i++) {
			var petal = paper.radius(50, 50, 100, 100, 0, 100).attr({
				'stroke': 'rgba(0,0,0,0)',
				"fill": "rgba(0,0,0,0)"
			});
			petal.transform('r' + i * 30 + ',150,150');
			var occ = Raphael.animation({
				fill: "rgba(" + color[i] + ",.5)"
			}, 500, "<>")
			petal.animate(occ.delay(i * 500));
		}
		var fl = paper.setFinish();
		var hov = Raphael.animation({
				"fill-opacity": "1"
			}, "<>"),
			out = Raphael.animation({
				"fill-opacity": ".5"
			}, "<>");
		fl.hover(function() {
			var self = this;
			this.animate(hov);
			$('.svg3').on('mousewheel', this, function(event) {
				event.preventDefault();
				if (event.originalEvent.wheelDelta > 0) {
					self.transform("...r" + 3);
				} else {
					self.transform("...r" - 3);
				};
				// console.log(event);
				// self.transform("...")

			});
		}, function() {
			this.animate(out);
			$('.svg3').off('mousewheel');
		});
		fl.mousedown(function() {
			var self = this;
			console.log(self.transform())
			var d = self["_"].deg;
			console.log(d);
			$('.svg3').on('mousemove', function(event) {
				event.preventDefault();
				self.transform("t" +
					(event.offsetX - 100) + "," +
					(event.offsetY - 100) + "r" + d)
			});
		});

		fl.mouseup(function() {
			$('.svg3').off("mousemove");
		});

	};
	// flower();
	// flower2();
	// flower3();
	var paper = Raphael($('.svg4')[0], 600, 600);

	function elHover(el) {
		el.hover(function() {
			this.attr({
				stroke: "yellow",
				"stroke-width": 5
			});
		}, function() {
			this.attr({
				stroke: "#FFF",
				"stroke-width": 1
			});
		});
		el.click(function(event) {
			this.attr({
				stroke: "yellow"
			})
			this.unhover();
		});
	};

	function drowRect() {
		$('.svg4').off(); //解除所有绑定事件
		$('.svg4').on("mousedown", function(event) {
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.rect(x, y, 0, 0).attr({
				stroke: '#FFF'
			});
			elHover(c);
			$('.svg4').on("click", function(e) {

			})
			$('.svg4').on("mousemove", function(event) {
				var x2, y2;
				event.clientX < x ? x2 = event.clientX : x;
				event.clientY < y ? y2 = event.clientY : y;
				var w = Math.abs(event.clientX - x);
				var h = Math.abs(event.clientY - y);
				c.attr({
					x: x2 || x,
					y: y2 || y,
					"width": w,
					"height": h
				});
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};

	function drowCircle() {
		$('.svg4').off(); //解除所有绑定事件
		$('.svg4').on("mousedown", function(event) {
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.circle(x, y, 0).attr({
				stroke: '#FFF'
			});
			c.hover(function() {
				this.attr({
					stroke: "yellow"
				})
			}, function() {
				this.attr({
					stroke: "#FFF"
				})
			});
			$('.svg4').on("mousemove", function(event) {
				var x2 = (event.clientX + x) / 2;
				var y2 = (event.clientY + y) / 2;
				var r = Math.abs(event.clientX - x) / 2;
				c.attr({
					cx: x2,
					cy: y2,
					r: r
				});
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};

	function drowLine() {
		$('.svg4').off(); //解除所有绑定事件
		$('.svg4').on("mousedown", function(event) {
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.path("M" + x + " " + y).attr({
				fill: '#FFF',
				stroke: '#FFF'
			});
			c.hover(function() {
				this.attr({
					stroke: "yellow"
				})
			}, function() {
				this.attr({
					stroke: "#FFF"
				})
			});
			$('.svg4').on("mousemove", function(event) {
				c.attr('path', "M" + x + " " + y + "L" + event.clientX + " " + event.clientY);
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};
	$("input").on('click', function(e) {
		var st = $(this).attr('name');
		switch (st) {
			case "drowLine":
				drowLine();
				break;
			case "drowCircle":
				drowCircle();
				break;
			case "drowRect":
				drowRect();
				break;
			case "clean":
				paper.clear();
				break;
		}
	});
});