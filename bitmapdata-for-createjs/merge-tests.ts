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

(function (window) {
    var FPS: number = 60;

    var _canvas: HTMLCanvasElement;
    var _stage: createjs.Stage;
    var _image01, _image02: HTMLImageElement;
    var _bmd01, _bmd02, _bmd03: createjs.BitmapData;
    var _bitmap01, _bitmap02, _bitmap03: createjs.Bitmap;

    function init(canvasID): void {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		load();
	}

    function draw(): void {
		_bmd01 = new createjs.BitmapData(_image01);
		_bmd02 = _bmd01.clone();
		_bmd03 = new createjs.BitmapData(_image02);
		var source = _bmd03;
		var sourceRect = new createjs.Rectangle(0, 0, _image02.width, _image02.height);
		var destPoint = new createjs.Point();
		var redMultiplier = 192;
		var greenMultiplier = 64;
		var blueMultiplier = 128;
		var alphaMultiplier = 128;
		_bmd02.merge(source, sourceRect, destPoint, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_bitmap02 = new createjs.Bitmap(_bmd02.canvas);
		_bitmap03 = new createjs.Bitmap(_bmd03.canvas);
		_bitmap01.x = 10;
		_bitmap02.x = 220;
		_bitmap03.x = 430;
		_bitmap01.y = _bitmap02.y = _bitmap03.y =  80;
		_stage.addChild(_bitmap01);
		_stage.addChild(_bitmap02);
		_stage.addChild(_bitmap03);
		_stage.update();
	}

    function load(): void {
		var loader = new createjs.LoadQueue();
		var manifest = [
			{src:"img/image_01_s.jpg", id:"image01s"},
			{src:"img/image_02_s.jpg", id:"image02s"}
		];
        function fileloadHandler(evt): void {
			switch(evt.item.id) {
				case "image01s" :
					_image01 = evt.result;
					break;
				case "image02s" :
					_image02 = evt.result;
					break;
			}
		}
        function completeHandler(evt): void {
			loader.removeAllEventListeners();
			loader.removeAll();
			draw();
		}
		loader.addEventListener("fileload", fileloadHandler);
		loader.addEventListener("complete", completeHandler);
		loader.loadManifest(manifest);
	}

    window.addEventListener("load", function loadHandler(evt): void {
		removeEventListener("load", loadHandler);
		init("my-canvas")
	});

}(window));
