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
	var _image01: HTMLImageElement;
    var _bmd01: createjs.BitmapData, _bmd02: createjs.BitmapData;
    var _bitmap01: createjs.Bitmap, _bitmap02: createjs.Bitmap;

    function init(canvasID: string): void {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		load();
	}

	function draw(): void {
		var image = _image01;
		_bmd01 = new createjs.BitmapData(image);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_bitmap01.regX = _bmd01.width >> 1;
		_bitmap01.regY = _bmd01.height >> 1;
		_bitmap01.x = (_canvas.width >> 1) - 120;
		_bitmap01.y = _canvas.height >> 1;
		_stage.addChild(_bitmap01);
		var width = 200;
		var height = 200;
		var fillColor = 0x80FF0000;
		_bmd02 = new createjs.BitmapData(null, width, height, fillColor);
		_bitmap02 = new createjs.Bitmap(_bmd02.canvas);
		_bitmap02.regX = _bmd02.width >> 1;
		_bitmap02.regY = _bmd02.height >> 1;
		_bitmap02.x = (_canvas.width >> 1) + 120;
		_bitmap02.y = _canvas.height >> 1;
		_stage.addChild(_bitmap02);
		_stage.update();
	}

	function load(): void {
		var loader = new createjs.LoadQueue();
		var manifest = [
			{src:"img/image_01_s.jpg", id:"image01s"}
		];
        function fileloadHandler(evt: createjs.Event): void {
			switch(evt.item.id) {
				case "image01s" :
                    _image01 = <HTMLImageElement>evt.result;
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
