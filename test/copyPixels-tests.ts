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

/// <reference path="../bitmapdata-for-createjs/bitmapdata-for-createjs.d.ts" />
/// <reference path="../preloadjs/preloadjs.d.ts" />

(function (window: Window) {
    var FPS: number = 60;

	var _canvas: HTMLCanvasElement;
	var _stage: createjs.Stage;
    var _image01: HTMLImageElement, _maskImage: HTMLImageElement;
	var _bmd01: createjs.BitmapData;
	var _bitmap01: createjs.Bitmap;

    function init(canvasID: string): void {
		_canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		load();
	}

	function draw(): void {
		_bmd01 = new createjs.BitmapData(null, 640, 360, 0xCCCCCC);
		var source = _image01;
		var sourceRect = new createjs.Rectangle(0, 0, _image01.width, _image01.height);
		var destPoint: createjs.Point;
		var alphaSource = _maskImage;
		var alphaPoint = new createjs.Point();
		var mergeAlpha = true;
		destPoint = new createjs.Point(10, 80);
		_bmd01.copyPixels(source, sourceRect, destPoint);
		destPoint = new createjs.Point(220, 80);
		_bmd01.copyPixels(source, sourceRect, destPoint, alphaSource);
		destPoint = new createjs.Point(430, 80);
		_bmd01.copyPixels(source, sourceRect, destPoint, alphaSource, alphaPoint, mergeAlpha);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_stage.addChild(_bitmap01);
		_stage.update();
	}

	function load(): void {
		var loader = new createjs.LoadQueue();
		var manifest = [
			{src:"img/image_02_s.jpg", id:"image02s"},
			{src:"img/mask.png", id:"mask"}
		];
        function fileloadHandler(evt: createjs.Event): void {
			switch(evt.item.id) {
				case "image02s" :
					_image01 = <HTMLImageElement>evt.result;
					break;
				case "mask" :
                    _maskImage = <HTMLImageElement>evt.result;
					break;
			}
		}
        function completeHandler(evt: createjs.Event): void {
			loader.removeAllEventListeners();
			loader.removeAll();
			draw();
		}
		loader.addEventListener("fileload", fileloadHandler);
		loader.addEventListener("complete", completeHandler);
		loader.loadManifest(manifest);
	}

    window.addEventListener("load", function loadHandler(evt: Event): void {
		removeEventListener("load", loadHandler);
		init("my-canvas")
	});

}(window));
