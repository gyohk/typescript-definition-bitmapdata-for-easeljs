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

(function (window: Window) {
    var FPS: number = 60;

    var _canvas: HTMLCanvasElement;
    var _stage: createjs.Stage;
	var _centerX: number;
    var _centerY: number;
    var _image01: HTMLImageElement;
    var _bmd01: createjs.BitmapData;
    var _bitmap01: createjs.Bitmap;
    var _shape: createjs.Shape;
    var _shape_bmd: createjs.BitmapData;
	var _angle: number = 0;
	var _isHitting: boolean = false;

    function init(canvasID: string): void {
        _canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		_stage = new createjs.Stage(_canvas);
		_centerX = _canvas.width >> 1;
		_centerY = _canvas.height >> 1;
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		load();
	}

    function draw(): void {
		_bmd01 = new createjs.BitmapData(_image01);
		var source = _bmd01;
		var sourceRect = new createjs.Rectangle(0, 0, _bmd01.width, _bmd01.height);
		var destPoint = new createjs.Point(sourceRect.x, sourceRect.y);
		_bmd01.threshold(_bmd01, sourceRect, destPoint, "<", 0xFFEE0000, 0x00000000, 0xFFFF0000);
		_bmd01.threshold(_bmd01, sourceRect, destPoint, ">", 0xFF00CCCC, 0x00000000, 0xFF00FFFF);
		_bitmap01 = new createjs.Bitmap(_bmd01.canvas);
		_bitmap01.x = _centerX - (_bmd01.width >> 1);
		_bitmap01.y = _centerY - (_bmd01.height >> 1);
		_stage.addChild(_bitmap01);
		_shape = new createjs.Shape();
		_shape.graphics.f("rgba(0,0,255,0.75)").dc(0, 0, 20).ef();
		_shape.cache(-20, -20, 40, 40);
		_shape_bmd = createjs.BitmapData.getBitmapData(_shape);
		_stage.addChild(_shape);
		createjs.Ticker.addEventListener("tick", tickHandler);
	}

    function tickHandler(evt: createjs.Event): void {
		_shape.x = (Math.cos(_angle * createjs.Matrix2D.DEG_TO_RAD) * 160 + _centerX) >> 0;
		_shape.y = (Math.sin(_angle * createjs.Matrix2D.DEG_TO_RAD) * 80 + _centerY) >> 0;
		var firstPoint = new createjs.Point(_bitmap01.x, _bitmap01.y);
		var firstAlphaThreshold = 0xFF;
		var secondObject = _shape_bmd;
		var secondObjectPoint = new createjs.Point(_shape.x -20, _shape.y -20);
		var secondAlphaThreshold = 0x80;
		if (_bmd01.hitTest(firstPoint, firstAlphaThreshold, secondObject, secondObjectPoint, secondAlphaThreshold)) {
			if (!_isHitting) {
				changeColor("rgba(0,255,0,0.75)");
			}
		} else {
			if (_isHitting) {
				changeColor("rgba(0,0,255,0.75)");
			}
		}
		_angle += 1;
		_angle = _angle % 360;
		_stage.update();
	}

    function changeColor(color: string): void {
		_isHitting = !_isHitting;
		_shape.graphics.c().f(color).dc(0, 0, 20).ef();
		_shape.updateCache();
		_shape_bmd.updateImageData();
	}

    function load(): void {
		var loader = new createjs.LoadQueue();
		var manifest = [
			{src:"img/image_01.jpg", id:"image01"}
		];
        function fileloadHandler(evt: createjs.Event): void {
			switch(evt.item.id) {
				case "image01" :
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
