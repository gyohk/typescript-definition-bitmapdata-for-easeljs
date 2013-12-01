// Type definitions for BitmapData ver1.0.0
// Project: http://kudox.jp/java-script/createjs-easeljs-bitmapdata
// Definitions by: gyoh_k <https://github.com/gyoh_k>
// Definitions: https://github.com/gyoh_k/TSDef_BitmapDataForCreateJS

/*
    Copyright (c) 2013 gyoh_k
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// AS3 like BitmapData class for CreateJS.
// Library documentation : http://kudox.jp/reference/bitmapdata_for_easeljs/

/// <reference path="../src/bitmapdata-for-createjs.d.ts" />
/// <reference path="../../lib/preloadjs/preloadjs.d.ts" />

(function (window: Window) {
    var FPS: number = 60;
    var NUM_PARTICLE: number = 10000;
    var LIGHTER_SCALE: number = 5;
    var INTERVAL: number = 3000;

	var _instance: Object;
	var _forceMapImage: HTMLImageElement;

    function BitmapDataDemo(canvasID: string): void {
		this._instance = this;
        var canvas = this.canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		this.stage = new createjs.Stage(canvas);
		this.stageW = canvas.width;
		this.stageH = canvas.height;
		load();
	}

	var p = BitmapDataDemo.prototype;

	p.canvas = null;
	p.stage = null;
	p.stageW = 0;
	p.stageH = 0;
	p.rect = null;
	p.bmd = null;
	p.bitmap = null;
	p.lighter = null;
	p.forcemap = null;
	p.particles = [];
	p.intervalID = null;
	p.channelX = 0;
	p.channelY = 1;

    p.init = function (): void {
		var w = this.stageW;
		var h = this.stageH;
		this.forcemap = new createjs.BitmapData(this._forceMapImage);
		var bmd = this.bmd = new createjs.BitmapData(null, w, h);
		this.bitmap = new createjs.Bitmap(bmd.canvas);
		this.stage.addChild(this.bitmap);
		this.lighter = new createjs.BitmapData(null, w / LIGHTER_SCALE, h / LIGHTER_SCALE);
		this.rect = new createjs.Rectangle(0, 0, w, h);
		var particles = this.particles;
		for (var i = 0, l = NUM_PARTICLE; i < l; i++) {
			var x = Math.random() * w >> 0;
			var y = Math.random() * h >> 0;
			particles[i] = new this.Particle(x, y, 0, 0, 0, 0);
		}
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.addEventListener("tick", function () {
			this._instance.tick();
		});
		this.intervalID = setInterval(function() {
			this._instance.changeMapChannel();
		}, INTERVAL);
	};

    p.changeMapChannel = function (): void {
		this.channelX = ((Math.random() * 3) >> 0) * 8;
		this.channelY = ((Math.random() * 3) >> 0) * 8;
	};

    p.tick = function (evt: createjs.Event): void {
		var w = this.stageW;
		var h = this.stageH;
		var bmd = this.bmd;
		var forcemap = this.forcemap;
		bmd.fillRect(this.rect, 0xEE000000);
		var channelX = this.channelX;
		var channelY = this.channelY;
		var particles = this.particles;
		for (var i = 0, l = particles.length; i < l; i++) {
			var p = particles[i];
			var color = forcemap.getPixel(p.x, p.y);
			var cx = color >> channelX & 0xFF;
			var cy = color >> channelY & 0xFF;
			p.ax += (cx - 128) * 0.0005;
			p.ay += (cy - 128) * 0.0005;
			p.sx += p.ax;
			p.sy += p.ay;
			p.x += p.sx;
			p.y += p.sy;
			p.ax *= 0.96;
			p.ay *= 0.96;
			p.sx *= 0.92;
			p.sy *= 0.92;
			if (p.x < 0) {
				p.x = w - 1;
			} else if (w <= p.x) {
				p.x = 0;
			}
			if (p.y < 0) {
				p.y = h - 1;
			} else if (h <= p.y) {
				p.y = 0;
			}
			bmd.setPixel(p.x, p.y, 0x0099FF);
		}
		bmd.updateContext();
		var lighter = this.lighter;
		lighter.drawImage(bmd, 0, 0, w, h, 0, 0, w / LIGHTER_SCALE, h / LIGHTER_SCALE);
		bmd.draw(lighter, new createjs.Matrix2D(LIGHTER_SCALE, 0, 0, LIGHTER_SCALE, 0, 0), null, "lighter", null, true);
		this.stage.update();
	};

    function load(): void {
		var loader = new createjs.LoadQueue();
		function fileloadHandler (evt: createjs.Event) {
			this._forceMapImage = evt.result;
			loader.removeAllEventListeners();
			loader.removeAll();
			this._instance.init();
		}
		loader.addEventListener("fileload", fileloadHandler);
		loader.loadFile({src:"img/forcemap.jpg", id:"forcemap"});
	}

    var Particle = (function(): void {
        function Particle(x: number, y: number, ax: number, ay: number, sx: number, sy: number) {
			this.x = x;
			this.y = y;
			this.ax = ax;
			this.ay = ay;
			this.sx = sx;
			this.sy = sy;
		}
		var p = Particle.prototype;
		p.x = 0;
		p.y = 0;
		p.ax = 0;
		p.ay = 0;
		p.sx = 0;
		p.sy = 0;
		return this.Particle;
	}());

    window.addEventListener("load", function loadHandler(evt: Event): void {
		removeEventListener("load", loadHandler);
		BitmapDataDemo("my-canvas");
	});

}(window));
