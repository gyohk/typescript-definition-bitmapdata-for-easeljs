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
	var _image01;
	var _bmd01;
	var _bitmap01;

	function init(canvasID) {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		load();
	}

	function draw() {
		_bmd01 = new createjs.BitmapData(_image01);
		var source = _bmd01;
		var sourceRect = new createjs.Rectangle(64, 48, 256, 144);
		var destPoint = new createjs.Point(sourceRect.x, sourceRect.y);
		var redArray = [], greenArray = [], blueArray = [], alphaArray = null;
		for (var i = 0, l = 256; i < l; i++) {
			redArray[i] = (255 - i) << 16;
			greenArray[i] = (255 - i) << 8;
			blueArray[i] = 255 - i;
		}
		_bmd01.paletteMap(source, sourceRect, destPoint, redArray, greenArray, blueArray, alphaArray);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_bitmap01.regX = _bmd01.width >> 1;
		_bitmap01.regY = _bmd01.height >> 1;
		_bitmap01.x = _canvas.width >> 1;
		_bitmap01.y = _canvas.height >> 1;
		_stage.addChild(_bitmap01);
		_stage.update();
	}

	function load() {
		var loader = new createjs.LoadQueue();
		var manifest = [
			{src:"img/image_01.jpg", id:"image01"}
		];
		function fileloadHandler(evt) {
			switch(evt.item.id) {
				case "image01" :
					_image01 = evt.result;
					break;
			}
		}
		function completeHandler(evt) {
			loader.removeAllEventListeners();
			loader.removeAll();
			draw();
		}
		loader.addEventListener("fileload", fileloadHandler);
		loader.addEventListener("complete", completeHandler);
		loader.loadManifest(manifest);
	}

	window.addEventListener("load", function loadHandler(evt) {
		removeEventListener("load", loadHandler);
		init("my-canvas")
	});

}(window));
