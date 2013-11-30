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

	var _canvas;
	var _stage;
	var _bmd01;
	var _bitmap01;

	function init(canvasID) {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(_stage, true);
		}
		var container = new createjs.Container();
		_stage.addChild(container);
		var stageW = _canvas.width;
		var stageH = _canvas.height;
		for (var i = 0, l = 200; i < l; i++) {
			var shape = new createjs.Shape();
			var g = shape.graphics;
			var x = (Math.random() * stageW >> 0) -30;
			var y = (Math.random() * stageH >> 0) -30;
			var w = (Math.random() * (stageW - x) >> 0) + 30;
			var h = (Math.random() * (stageH - y) >> 0) + 30;
			var hue = Math.random() * 360 >> 0;
			var color = createjs.Graphics.getHSL(hue, 50, 60, 1);
			g.f(color).r(x, y, w, h).ef();
			container.addChild(shape);
		}
		container.cache(0, 0, stageW, stageH);
		_bmd01 = new createjs.BitmapData(container.cacheCanvas);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_stage.removeAllChildren();
		_stage.addChild(_bitmap01);
		_stage.update();
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		_bitmap01.addEventListener("click", clickHandler);
	}

	function clickHandler(evt) {
		_bmd01.floodFill(evt.stageX, evt.stageY, 0xFFCCCCCC);
		_stage.update();
	}

	window.addEventListener("load", function loadHandler(evt) {
		removeEventListener("load", loadHandler);
		init("my-canvas")
	});

}(window));
