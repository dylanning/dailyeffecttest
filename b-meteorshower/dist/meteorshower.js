/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// 坐标
	var Crood = function () {
	    function Crood() {
	        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	        _classCallCheck(this, Crood);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Crood, [{
	        key: 'setCrood',
	        value: function setCrood(x, y) {
	            this.x = x;
	            this.y = y;
	        }
	    }, {
	        key: 'copy',
	        value: function copy() {
	            return new Crood(this.x, this.y);
	        }
	    }]);
	
	    return Crood;
	}();
	
	// 流星
	
	
	var ShootingStar = function () {
	    function ShootingStar() {
	        var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Crood();
	        var final = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Crood();
	        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
	        var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
	        var onDistory = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	
	        _classCallCheck(this, ShootingStar);
	
	        this.init = init; // 初始位置
	        this.final = final; // 最终位置
	        this.size = size; // 大小
	        this.speed = speed; // 速度：像素/s
	
	        // 飞行总时间
	        this.dur = Math.sqrt(Math.pow(this.final.x - this.init.x, 2) + Math.pow(this.final.y - this.init.y, 2)) * 1000 / this.speed;
	
	        this.pass = 0; // 已过去的时间
	        this.prev = this.init.copy(); // 上一帧位置
	        this.now = this.init.copy(); // 当前位置
	        this.onDistory = onDistory;
	    }
	
	    _createClass(ShootingStar, [{
	        key: 'draw',
	        value: function draw(ctx, delta) {
	            this.pass += delta;
	            this.pass = Math.min(this.pass, this.dur);
	
	            var percent = this.pass / this.dur;
	
	            this.now.setCrood(this.init.x + (this.final.x - this.init.x) * percent, this.init.y + (this.final.y - this.init.y) * percent);
	
	            // canvas
	            ctx.strokeStyle = '#fff';
	            ctx.lineCap = 'round';
	            ctx.lineWidth = this.size;
	            ctx.beginPath();
	            ctx.moveTo(this.now.x, this.now.y);
	            ctx.lineTo(this.prev.x, this.prev.y);
	            ctx.stroke();
	
	            this.prev.setCrood(this.now.x, this.now.y);
	            if (this.pass === this.dur) {
	                this.distory();
	            }
	        }
	    }, {
	        key: 'distory',
	        value: function distory() {
	            this.onDistory && this.onDistory();
	        }
	    }]);
	
	    return ShootingStar;
	}();
	
	// 流星雨
	
	
	var MeteorShower = function () {
	    function MeteorShower(cvs, ctx) {
	        _classCallCheck(this, MeteorShower);
	
	        this.cvs = cvs;
	        this.ctx = ctx;
	        this.stars = [];
	        this.T;
	        this.stop = false;
	        this.playing = false;
	    }
	
	    // 生成随机位置的流星
	
	
	    _createClass(MeteorShower, [{
	        key: 'createStar',
	        value: function createStar() {
	            var _this = this;
	
	            var angle = Math.PI / 3;
	            var distance = Math.random() * 400;
	            var init = new Crood(Math.random() * this.cvs.width | 0, Math.random() * 100 | 0);
	            var final = new Crood(init.x + distance * Math.cos(angle), init.y + distance * Math.sin(angle));
	            var size = Math.random() * 2;
	            var speed = Math.random() * 400 + 100;
	            var star = new ShootingStar(init, final, size, speed, function () {
	                _this.remove(star);
	            });
	            return star;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(star) {
	            this.stars = this.stars.filter(function (s) {
	                return s !== star;
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update(delta) {
	            var _this2 = this;
	
	            if (!this.stop && this.stars.length < 20) {
	                this.stars.push(this.createStar());
	            }
	            this.stars.forEach(function (star) {
	                star.draw(_this2.ctx, delta);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick() {
	            var _this3 = this;
	
	            if (this.playing) return;
	            this.playing = true;
	
	            var now = new Date().getTime();
	            var last = now;
	            var delta = void 0;
	
	            var _tick = function _tick() {
	                if (_this3.stop && _this3.stars.length === 0) {
	                    cancelAnimationFrame(_this3.T);
	                    _this3.playing = false;
	                    return;
	                }
	
	                delta = now - last;
	                delta = delta > 500 ? 30 : delta < 16 ? 16 : delta;
	                last = now;
	                // console.log(delta);
	
	                _this3.T = requestAnimationFrame(_tick);
	
	                ctx.save();
	                ctx.fillStyle = 'rgba(0,0,0,0.2)'; // 每一帧用 “半透明” 的背景色清除画布
	                ctx.fillRect(0, 0, cvs.width, cvs.height);
	                ctx.restore();
	                _this3.update(delta);
	            };
	            _tick();
	        }
	
	        // 开始
	
	    }, {
	        key: 'start',
	        value: function start() {
	            this.stop = false;
	            this.tick();
	        }
	
	        // 暂停
	
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.stop = true;
	        }
	    }]);
	
	    return MeteorShower;
	}();
	
	var cvs = document.querySelector('canvas');
	var ctx = cvs.getContext('2d');
	var meteorShower = new MeteorShower(cvs, ctx);
	meteorShower.start();

/***/ }
/******/ ]);
//# sourceMappingURL=meteorshower.js.map