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

/// <reference path="bitmapdata-for-createjs.d.ts" />
/// <reference path="../preloadjs/preloadjs.d.ts" />

(function(window) {
	var FPS = 60;

	var _stats;
	var _canvas;
	var _stage;
	var _source;
	var _sourceRect;
	var _bmd01;
	var _bitmap01;

	function init(canvasID) {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		var shape = new createjs.Shape();
		var g = shape.graphics;
		g.f("rgba(64,64,64,1)").dp(0, 0, 20, 6, 0.8, -90).ef();
		shape.x = _canvas.width >> 1;
		shape.y = _canvas.height >> 1;
		var boxBlurFilter = new createjs.BlurFilter(2, 2, 1);
		shape.filters = [boxBlurFilter];
		_sourceRect = new createjs.Rectangle(-20, -20, 40, 40);
		shape.cache(_sourceRect.x, _sourceRect.y, _sourceRect.width, _sourceRect.height);
		_source = createjs.BitmapData.getBitmapData(shape);
		_bmd01 = new createjs.BitmapData(null, 640, 360, 0x000000);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_stage.addChild(_bitmap01);
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.addEventListener("tick", tickHandler);
	}

	function tickHandler(evt) {
		draw();
		draw();
		_stage.update();
		_stats.update();
	}

	function draw() {
		var matrix = new createjs.Matrix2D(1, 0, 0, 1, -_sourceRect.width >> 1, -_sourceRect.height >> 1);
		var rotation = Math.random() * 360 >> 0;
		matrix.rotate(rotation * createjs.Matrix2D.DEG_TO_RAD);
		var scale = Math.random() * 0.5 + 0.5;
		matrix.scale(scale, scale);
		var tx = Math.random() * _bmd01.width >> 0;
		var ty = Math.random() * _bmd01.height >> 0;
		matrix.translate(tx, ty);
		var red = (Math.random() * 224 >> 0) + 32;
		var green = (Math.random() * 224 >> 0) + 32;
		var blue = (Math.random() * 224 >> 0) + 32;
		var colorTransform = new createjs.ColorTransform(0, 0, 0, 1, red, green, blue);
		var compositeOperation = "lighter";
		var clipRect = null;
		var smoothing = true;
		_bmd01.draw(_source, matrix, colorTransform, compositeOperation, clipRect, smoothing);
		_bmd01.fillRect(new createjs.Rectangle(0, 0, _bmd01.width, _bmd01.height), 0x06000000);
	}

	window.addEventListener("load", function loadHandler(evt) {
		removeEventListener("load", loadHandler);
		init("my-canvas")
	});

}(window));

