(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	try {
		if(Reflect.hasField(js.Browser.window,"winParameters")) flash.Lib.get_current().loaderInfo.parameters = (Reflect.field(js.Browser.window,"winParameters"))();
		flash.Lib.get_current().get_stage().loaderInfo = flash.Lib.get_current().loaderInfo;
	} catch( e ) {
	}
	ApplicationMain.preloader = new NMEPreloader();
	flash.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var loader = new flash.display.Loader();
	ApplicationMain.loaders.set("images/background_tile.png",loader);
	ApplicationMain.total++;
	var loader1 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/center_bottom.png",loader1);
	ApplicationMain.total++;
	var loader2 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_bear.png",loader2);
	ApplicationMain.total++;
	var loader3 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_bunny_02.png",loader3);
	ApplicationMain.total++;
	var loader4 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_carrot.png",loader4);
	ApplicationMain.total++;
	var loader5 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_lemon.png",loader5);
	ApplicationMain.total++;
	var loader6 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_panda.png",loader6);
	ApplicationMain.total++;
	var loader7 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/game_piratePig.png",loader7);
	ApplicationMain.total++;
	var loader8 = new flash.display.Loader();
	ApplicationMain.loaders.set("images/logo.png",loader8);
	ApplicationMain.total++;
	var resourcePrefix = "NME_:bitmap_";
	var _g = 0, _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader9 = ApplicationMain.loaders.get(path);
			loader9.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader9.load(new flash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new flash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(piratepig.PiratePig,"main") == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.field(piratepig.PiratePig,"main").apply(piratepig.PiratePig,[]);
}
var flash = {}
flash.events = {}
flash.events.IEventDispatcher = function() { }
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	__class__: flash.events.IEventDispatcher
}
flash.events.EventDispatcher = function(target) {
	if(target != null) this.nmeTarget = target; else this.nmeTarget = this;
	this.nmeEventMap = [];
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
flash.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,setList: function(type,list) {
		this.nmeEventMap[type] = list;
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,getList: function(type) {
		return this.nmeEventMap[type];
	}
	,existList: function(type) {
		return this.nmeEventMap != null && this.nmeEventMap[type] != undefined;
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.nmeTarget;
		var capture = event.eventPhase == flash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.nmeGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new flash.events.Listener(inListener,capture,priority));
		list.sort(flash.events.EventDispatcher.compareListeners);
	}
	,__class__: flash.events.EventDispatcher
}
flash.display = {}
flash.display.IBitmapDrawable = function() { }
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	__class__: flash.display.IBitmapDrawable
}
flash.display.DisplayObject = function() {
	flash.events.EventDispatcher.call(this,null);
	this._nmeId = flash.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new flash.geom.Transform(this));
	this.nmeX = 0.0;
	this.nmeY = 0.0;
	this.nmeScaleX = 1.0;
	this.nmeScaleY = 1.0;
	this.nmeRotation = 0.0;
	this.nmeWidth = 0.0;
	this.nmeHeight = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.nmeFilters = new Array();
	this.nmeBoundsRect = new flash.geom.Rectangle();
	this.nmeScrollRect = null;
	this.nmeMask = null;
	this.nmeMaskingObj = null;
	this.set_nmeCombinedVisible(this.get_visible());
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.DisplayObject.__super__ = flash.events.EventDispatcher;
flash.display.DisplayObject.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeSrUpdateDivs: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null || this.parent == null) return;
		if(this.nmeScrollRect == null) {
			if(this._srAxes != null && gfx.nmeSurface.parentNode == this._srAxes && this._srWindow.parentNode != null) this._srWindow.parentNode.replaceChild(gfx.nmeSurface,this._srWindow);
			return;
		}
		if(this._srWindow == null) {
			this._srWindow = js.Browser.document.createElement("div");
			this._srAxes = js.Browser.document.createElement("div");
			this._srWindow.style.setProperty("position","absolute","");
			this._srWindow.style.setProperty("left","0px","");
			this._srWindow.style.setProperty("top","0px","");
			this._srWindow.style.setProperty("width","0px","");
			this._srWindow.style.setProperty("height","0px","");
			this._srWindow.style.setProperty("overflow","hidden","");
			this._srAxes.style.setProperty("position","absolute","");
			this._srAxes.style.setProperty("left","0px","");
			this._srAxes.style.setProperty("top","0px","");
			this._srWindow.appendChild(this._srAxes);
		}
		var pnt = this.parent.localToGlobal(new flash.geom.Point(this.get_x(),this.get_y()));
		this._srWindow.style.left = pnt.x + "px";
		this._srWindow.style.top = pnt.y + "px";
		this._srWindow.style.width = this.nmeScrollRect.width + "px";
		this._srWindow.style.height = this.nmeScrollRect.height + "px";
		this._srAxes.style.left = -pnt.x - this.nmeScrollRect.x + "px";
		this._srAxes.style.top = -pnt.y - this.nmeScrollRect.y + "px";
		if(gfx.nmeSurface.parentNode != this._srAxes && gfx.nmeSurface.parentNode != null) {
			gfx.nmeSurface.parentNode.insertBefore(this._srWindow,gfx.nmeSurface);
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			this._srAxes.appendChild(gfx.nmeSurface);
		}
	}
	,nmeGetSrWindow: function() {
		return this._srWindow;
	}
	,set_width: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var w = this.nmeBoundsRect.width;
		if(this.nmeScaleX * w != inValue) {
			if(w == 0) {
				this.nmeScaleX = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				w = this.nmeBoundsRect.width;
			}
			if(w <= 0) return 0;
			this.nmeScaleX = inValue / w;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_width: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeWidth;
	}
	,set_y: function(inValue) {
		if(this.nmeY != inValue) {
			this.nmeY = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_y: function() {
		return this.nmeY;
	}
	,set_x: function(inValue) {
		if(this.nmeX != inValue) {
			this.nmeX = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_x: function() {
		return this.nmeX;
	}
	,set_visible: function(inValue) {
		if(this.nmeVisible != inValue) {
			this.nmeVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeVisible;
	}
	,get_visible: function() {
		return this.nmeVisible;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this.nmeInvalidateMatrix(true);
		return inValue;
	}
	,get__topmostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,get_stage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return flash.Lib.nmeGetStage();
		return null;
	}
	,set_scrollRect: function(inValue) {
		this.nmeScrollRect = inValue;
		this.nmeSrUpdateDivs();
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.nmeScrollRect == null) return null;
		return this.nmeScrollRect.clone();
	}
	,set_scaleY: function(inValue) {
		if(this.nmeScaleY != inValue) {
			this.nmeScaleY = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.nmeScaleY;
	}
	,set_scaleX: function(inValue) {
		if(this.nmeScaleX != inValue) {
			this.nmeScaleX = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.nmeScaleX;
	}
	,set_rotation: function(inValue) {
		if(this.nmeRotation != inValue) {
			this.nmeRotation = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_rotation: function() {
		return this.nmeRotation;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.nmeInvalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.nmeChildren,this);
			this.parent.nmeInvalidateBounds();
		}
		if(inValue != null) {
			inValue._nmeRenderFlags |= 64;
			if(inValue.parent != null) inValue.parent._nmeRenderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,set_nmeCombinedVisible: function(inValue) {
		if(this.nmeCombinedVisible != inValue) {
			this.nmeCombinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeCombinedVisible;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new flash.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new flash.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,get__matrixInvalid: function() {
		return (this._nmeRenderFlags & 4) != 0;
	}
	,get__matrixChainInvalid: function() {
		return (this._nmeRenderFlags & 8) != 0;
	}
	,set_mask: function(inValue) {
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = null;
		this.nmeMask = inValue;
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = this;
		return this.nmeMask;
	}
	,get_mask: function() {
		return this.nmeMask;
	}
	,set_height: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var h = this.nmeBoundsRect.height;
		if(this.nmeScaleY * h != inValue) {
			if(h == 0) {
				this.nmeScaleY = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				h = this.nmeBoundsRect.height;
			}
			if(h <= 0) return 0;
			this.nmeScaleY = inValue / h;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_height: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeHeight;
	}
	,set_filters: function(filters) {
		var oldFilterCount = this.nmeFilters == null?0:this.nmeFilters.length;
		if(filters == null) {
			this.nmeFilters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.nmeFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.nmeFilters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,get__boundsInvalid: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return (this._nmeRenderFlags & 64) != 0; else return (this._nmeRenderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,get_filters: function() {
		if(this.nmeFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.nmeFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__bottommostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,__contains: function(child) {
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			var gfx = this.nmeGetGraphics();
			if(gfx == null) {
				this.nmeBoundsRect.x = this.get_x();
				this.nmeBoundsRect.y = this.get_y();
				this.nmeBoundsRect.width = 0;
				this.nmeBoundsRect.height = 0;
			} else {
				this.nmeBoundsRect = gfx.nmeExtent.clone();
				if(this.scale9Grid != null) {
					this.nmeBoundsRect.width *= this.nmeScaleX;
					this.nmeBoundsRect.height *= this.nmeScaleY;
					this.nmeWidth = this.nmeBoundsRect.width;
					this.nmeHeight = this.nmeBoundsRect.height;
				} else {
					this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
					this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
				}
				gfx.boundsDirty = false;
			}
			this._nmeRenderFlags &= -65;
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && gfx.nmeSurface != null) flash.Lib.nmeSetSurfaceVisible(gfx.nmeSurface,inValue);
	}
	,nmeValidateMatrix: function() {
		var parentMatrixInvalid = (this._nmeRenderFlags & 8) != 0 && this.parent != null;
		if((this._nmeRenderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.nmeValidateMatrix();
			var m = this.transform.get_matrix();
			if((this._nmeRenderFlags & 16) != 0) this._nmeRenderFlags &= -5;
			if((this._nmeRenderFlags & 4) != 0) {
				m.identity();
				m.scale(this.nmeScaleX,this.nmeScaleY);
				var rad = this.nmeRotation * flash.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.nmeX,this.nmeY);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.nmeGetFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.nmeGetFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.nmeSetFullMatrix(fm);
				this._nmeRenderFlags |= 32;
			}
			this._nmeRenderFlags &= -29;
		}
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && lastMoveObj != null && this != lastMoveObj) {
			var ogfx = lastMoveObj.nmeGetGraphics();
			if(ogfx != null) flash.Lib.nmeSetSurfaceZIndexAfter(this.nmeScrollRect == null?gfx.nmeSurface:this._srWindow,lastMoveObj.nmeScrollRect == null?ogfx.nmeSurface:lastMoveObj == this.parent?ogfx.nmeSurface:lastMoveObj._srWindow);
		}
		if(gfx == null) return lastMoveObj; else return this;
	}
	,nmeTestFlag: function(mask) {
		return (this._nmeRenderFlags & mask) != 0;
	}
	,nmeSetMatrix: function(inValue) {
		this.transform._matrix.copy(inValue);
		return inValue;
	}
	,nmeSetFullMatrix: function(inValue) {
		return this.transform.nmeSetFullMatrix(inValue);
	}
	,nmeSetFlagToValue: function(mask,value) {
		if(value) this._nmeRenderFlags |= mask; else this._nmeRenderFlags &= ~mask;
	}
	,nmeSetFlag: function(mask) {
		this._nmeRenderFlags |= mask;
	}
	,nmeSetDimensions: function() {
		if(this.scale9Grid != null) {
			this.nmeBoundsRect.width *= this.nmeScaleX;
			this.nmeBoundsRect.height *= this.nmeScaleY;
			this.nmeWidth = this.nmeBoundsRect.width;
			this.nmeHeight = this.nmeBoundsRect.height;
		} else {
			this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
			this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(gfx.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(gfx.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			flash.Lib.nmeDrawToSurface(gfx.nmeSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,m);
				this._nmeRenderFlags &= -33;
				this.nmeSrUpdateDivs();
			}
			flash.Lib.nmeSetSurfaceOpacity(gfx.nmeSurface,fullAlpha);
		}
	}
	,nmeRemoveFromStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) {
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			var evt = new flash.events.Event(flash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,nmeMatrixOverridden: function() {
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this._nmeRenderFlags |= 16;
		this._nmeRenderFlags |= 4;
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeIsOnStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) return true;
		return false;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this._nmeRenderFlags |= 4; else this._nmeRenderFlags |= 8;
	}
	,nmeInvalidateBounds: function() {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeGetSurface: function() {
		var gfx = this.nmeGetGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.nmeSurface;
		return surface;
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeRender();
			var extX = gfx.nmeExtent.x;
			var extY = gfx.nmeExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX <= 0 || local.y - extY <= 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			if(gfx.nmeHitTest(local.x,local.y)) return this;
		}
		return null;
	}
	,nmeGetMatrix: function() {
		return this.transform.get_matrix();
	}
	,nmeGetInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(outStack);
	}
	,nmeGetGraphics: function() {
		return null;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		return this.transform.nmeGetFullMatrix(localMatrix);
	}
	,nmeFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.nmeSetPhase(flash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
		event.nmeSetPhase(flash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return;
		if(event.bubbles) {
			event.nmeSetPhase(flash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
	}
	,nmeDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return flash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,nmeClearFlag: function(mask) {
		this._nmeRenderFlags &= ~mask;
	}
	,nmeBroadcast: function(event) {
		this.nmeDispatchEvent(event);
	}
	,nmeApplyFilters: function(surface) {
		if(this.nmeFilters != null) {
			var _g = 0, _g1 = this.nmeFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.nmeApplyFilter(surface);
			}
		}
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if(newParent.nmeGetGraphics() != null) {
			flash.Lib.nmeSetSurfaceId(gfx.nmeSurface,this._nmeId);
			if(beforeSibling != null && beforeSibling.nmeGetGraphics() != null) flash.Lib.nmeAppendSurface(gfx.nmeSurface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.nmeChildren;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,flash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , flash.display.DisplayObjectContainer);
						if(container.nmeChildren.length > 0) nextSibling = container.nmeChildren[container.nmeChildren.length - 1]; else break;
					}
					if(nextSibling.nmeGetGraphics() != gfx) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,nextSibling.get__topmostSurface()); else flash.Lib.nmeAppendSurface(gfx.nmeSurface);
				}
			}
			flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,this.getSurfaceTransform(gfx));
		} else if(newParent.name == "Stage") flash.Lib.nmeAppendSurface(gfx.nmeSurface);
		if(this.nmeIsOnStage()) {
			this.nmeSrUpdateDivs();
			var evt = new flash.events.Event(flash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,localToGlobal: function(point) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).transformPoint(point);
	}
	,invalidateGraphics: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeChanged = true;
			gfx.nmeClearNextCycle = true;
		}
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		var boundingBox = shapeFlag == null?true:!shapeFlag;
		if(!boundingBox) return this.nmeGetObjectUnderPoint(new flash.geom.Point(x,y)) != null; else {
			var gfx = this.nmeGetGraphics();
			if(gfx != null) {
				var extX = gfx.nmeExtent.x;
				var extY = gfx.nmeExtent.y;
				var local = this.globalToLocal(new flash.geom.Point(x,y));
				if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return false; else return true;
			}
			return false;
		}
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,handleGraphicsUpdated: function(gfx) {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.nmeApplyFilters(gfx.nmeSurface);
		this._nmeRenderFlags |= 32;
	}
	,globalToLocal: function(inPos) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).invert().transformPoint(inPos);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,getScreenBounds: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeBoundsRect.clone();
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.get__boundsInvalid()) this.validateBounds();
		var m = this.transform.nmeGetFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.nmeGetFullMatrix(null).invert());
		var rect = this.nmeBoundsRect.transform(m);
		return rect;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.nmeRender(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,dispatchEvent: function(event) {
		var result = this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,__class__: flash.display.DisplayObject
	,__properties__: {set_filters:"set_filters",get_filters:"get_filters",set_height:"set_height",get_height:"get_height",set_mask:"set_mask",get_mask:"get_mask",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",set_nmeCombinedVisible:"set_nmeCombinedVisible",set_parent:"set_parent",set_rotation:"set_rotation",get_rotation:"get_rotation",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",get_stage:"get_stage",set_transform:"set_transform",set_visible:"set_visible",get_visible:"get_visible",set_width:"set_width",get_width:"get_width",set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",get__bottommostSurface:"get__bottommostSurface",get__boundsInvalid:"get__boundsInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__matrixInvalid:"get__matrixInvalid",get__topmostSurface:"get__topmostSurface"}
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_tabIndex: function(inIndex) {
		return this.nmeTabIndex = inIndex;
	}
	,get_tabIndex: function() {
		return this.nmeTabIndex;
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,__class__: flash.display.InteractiveObject
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
flash.display.DisplayObjectContainer = function() {
	this.nmeChildren = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	flash.display.InteractiveObject.call(this);
	this.nmeCombinedAlpha = this.alpha;
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_scrollRect: function(inValue) {
		inValue = flash.display.InteractiveObject.prototype.set_scrollRect.call(this,inValue);
		this.nmeUnifyChildrenWithDOM();
		return inValue;
	}
	,set_visible: function(inVal) {
		this.set_nmeCombinedVisible(this.parent != null?this.parent.nmeCombinedVisible && inVal:inVal);
		return flash.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,get_numChildren: function() {
		return this.nmeChildren.length;
	}
	,set_nmeCombinedVisible: function(inVal) {
		if(inVal != this.nmeCombinedVisible) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set_nmeCombinedVisible(child.get_visible() && inVal);
			}
		}
		return flash.display.InteractiveObject.prototype.set_nmeCombinedVisible.call(this,inVal);
	}
	,set_filters: function(filters) {
		flash.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,__contains: function(child) {
		if(child == null) return false;
		if(this == child) return true;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child || c.__contains(child)) return true;
		}
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this._nmeId + "]";
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.nmeChildren[child1];
		this.nmeChildren[child1] = this.nmeChildren[child2];
		this.nmeChildren[child2] = swap;
		swap = null;
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == child1) c1 = i; else if(this.nmeChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.nmeChildren[c1];
			this.nmeChildren[c1] = this.nmeChildren[c2];
			this.nmeChildren[c2] = swap;
			swap = null;
			this.nmeSwapSurface(c1,c2);
			child1.nmeUnifyChildrenWithDOM();
			child2.nmeUnifyChildrenWithDOM();
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.nmeChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in nmeChildren array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i + 1]);
				i++;
			}
		}
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeRemoveChild(this.nmeChildren[index]);
		throw "removeChildAt(" + index + ") : none found?";
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				child.nmeRemoveFromStage();
				child.set_parent(null);
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var obj = flash.display.InteractiveObject.prototype.nmeUnifyChildrenWithDOM.call(this,lastMoveObj);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			obj = child.nmeUnifyChildrenWithDOM(obj);
			if(child.get_scrollRect() != null) obj = child;
		}
		return obj;
	}
	,nmeSwapSurface: function(c1,c2) {
		if(this.nmeChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.nmeChildren.length;
		if(this.nmeChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.nmeChildren.length;
		var gfx1 = this.nmeChildren[c1].nmeGetGraphics();
		var gfx2 = this.nmeChildren[c2].nmeGetGraphics();
		if(gfx1 != null && gfx2 != null) {
			var surface1 = this.nmeChildren[c1].nmeScrollRect == null?gfx1.nmeSurface:this.nmeChildren[c1].nmeGetSrWindow();
			var surface2 = this.nmeChildren[c2].nmeScrollRect == null?gfx2.nmeSurface:this.nmeChildren[c2].nmeGetSrWindow();
			if(surface1 != null && surface2 != null) flash.Lib.nmeSwapSurface(surface1,surface2);
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeVisible) return;
		if(clipRect == null && this.nmeScrollRect != null) clipRect = this.nmeScrollRect;
		flash.display.InteractiveObject.prototype.nmeRender.call(this,inMask,clipRect);
		this.nmeCombinedAlpha = this.parent != null?this.parent.nmeCombinedAlpha * this.alpha:this.alpha;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeVisible) {
				if(clipRect != null) {
					if((child._nmeRenderFlags & 4) != 0 || (child._nmeRenderFlags & 8) != 0) child.nmeValidateMatrix();
				}
				child.nmeRender(inMask,clipRect);
			}
		}
		if(this.nmeAddedChildren) {
			this.nmeUnifyChildrenWithDOM();
			this.nmeAddedChildren = false;
		}
	}
	,nmeRemoveFromStage: function() {
		flash.display.InteractiveObject.prototype.nmeRemoveFromStage.call(this);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeRemoveFromStage();
		}
	}
	,nmeRemoveChild: function(child) {
		child.nmeRemoveFromStage();
		child.set_parent(null);
		return child;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this._nmeRenderFlags & 8) != 0) && !((this._nmeRenderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.nmeInvalidateMatrix();
			}
		}
		flash.display.InteractiveObject.prototype.nmeInvalidateMatrix.call(this,local);
	}
	,nmeGetObjectsUnderPoint: function(point,stack) {
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) stack.push(result);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return flash.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeBroadcast: function(event) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		flash.display.InteractiveObject.prototype.nmeAddToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeGetGraphics() == null || !child.nmeIsOnStage()) child.nmeAddToStage(this);
		}
	}
	,getObjectsUnderPoint: function(point) {
		var result = new Array();
		this.nmeGetObjectsUnderPoint(point,result);
		return result;
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == inChild) return i;
		}
		return -1;
	}
	,getChildByName: function(inName) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == inName) return child;
		}
		return null;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeChildren[index];
		throw "getChildAt : index out of bounds " + index + "/" + this.nmeChildren.length;
		return null;
	}
	,contains: function(child) {
		return this.__contains(child);
	}
	,addChildAt: function(object,index) {
		if(index > this.nmeChildren.length || index < 0) throw "Invalid index position " + index;
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.nmeChildren.length) return this.addChild(object); else {
			if(this.nmeIsOnStage()) object.nmeAddToStage(this,this.nmeChildren[index]);
			this.nmeChildren.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,this.nmeChildren.length - 1);
			return object;
		}
		object.set_parent(this);
		if(this.nmeIsOnStage()) object.nmeAddToStage(this);
		if(this.nmeChildren == null) this.nmeChildren = new Array();
		this.nmeChildren.push(object);
		return object;
	}
	,__removeChild: function(child) {
		HxOverrides.remove(this.nmeChildren,child);
	}
	,__class__: flash.display.DisplayObjectContainer
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeGraphics = new flash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.nmeCursorCallbackOver != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
		if(this.nmeCursorCallbackOut != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		if(!cursor) flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default); else {
			this.nmeCursorCallbackOver = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Pointer);
			};
			this.nmeCursorCallbackOut = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default);
			};
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,get_graphics: function() {
		return this.nmeGraphics;
	}
	,get_dropTarget: function() {
		return this.nmeDropTarget;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stopDrag: function() {
		if(this.nmeIsOnStage()) {
			this.get_stage().nmeStopDrag(this);
			var l = this.parent.nmeChildren.length - 1;
			var obj = this.get_stage();
			var _g1 = 0, _g = this.parent.nmeChildren.length;
			while(_g1 < _g) {
				var i = _g1++;
				var result = this.parent.nmeChildren[l - i].nmeGetObjectUnderPoint(new flash.geom.Point(this.get_stage().get_mouseX(),this.get_stage().get_mouseY()));
				if(result != null) obj = result;
			}
			if(obj != this) this.nmeDropTarget = obj; else this.nmeDropTarget = this.get_stage();
		}
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.nmeIsOnStage()) this.get_stage().nmeStartDrag(this,lockCenter,bounds);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: flash.display.Sprite
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{get_dropTarget:"get_dropTarget",get_graphics:"get_graphics",set_useHandCursor:"set_useHandCursor"})
});
var piratepig = {}
piratepig.PiratePig = function() {
	flash.display.Sprite.call(this);
	this.initialize();
	this.construct();
	this.resize(this.get_stage().get_stageWidth(),this.get_stage().get_stageHeight());
	this.get_stage().addEventListener(flash.events.Event.RESIZE,$bind(this,this.stage_onResize));
};
$hxClasses["piratepig.PiratePig"] = piratepig.PiratePig;
piratepig.PiratePig.__name__ = ["piratepig","PiratePig"];
piratepig.PiratePig.__super__ = flash.display.Sprite;
piratepig.PiratePig.prototype = $extend(flash.display.Sprite.prototype,{
	stage_onResize: function(event) {
		this.resize(this.get_stage().get_stageWidth(),this.get_stage().get_stageHeight());
	}
	,stage_onKeyUp: function(event) {
	}
	,resize: function(newWidth,newHeight) {
		this.Background.set_width(newWidth);
		this.Background.set_height(newHeight);
		this.Game.resize(newWidth,newHeight);
		this.Footer.set_scaleX(this.Game.currentScale);
		this.Footer.set_scaleY(this.Game.currentScale);
		this.Footer.set_x(newWidth / 2 - this.Footer.get_width() / 2);
		this.Footer.set_y(newHeight - this.Footer.get_height());
	}
	,initialize: function() {
		this.Background = new flash.display.Bitmap(openfl.Assets.getBitmapData("images/background_tile.png"));
		this.Footer = new flash.display.Bitmap(openfl.Assets.getBitmapData("images/center_bottom.png"));
		this.Game = new piratepig.PiratePigGame();
	}
	,construct: function() {
		this.Footer.smoothing = true;
		this.addChild(this.Background);
		this.addChild(this.Footer);
		this.addChild(this.Game);
	}
	,__class__: piratepig.PiratePig
});
var DocumentClass = function() {
	piratepig.PiratePig.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = piratepig.PiratePig;
DocumentClass.prototype = $extend(piratepig.PiratePig.prototype,{
	get_stage: function() {
		return flash.Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getBackgroundColor: function() {
		return 16777215;
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var haxe = {}
haxe.Timer = function() { }
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
flash.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__properties__ = {get_current:"get_current"}
flash.Lib["as"] = function(v,c) {
	return js.Boot.__instanceof(v,c)?v:null;
}
flash.Lib.attach = function(name) {
	return new flash.display.MovieClip();
}
flash.Lib.getTimer = function() {
	return (haxe.Timer.stamp() - flash.Lib.starttime) * 1000 | 0;
}
flash.Lib.getURL = function(request,target) {
	window.open(request.url);
}
flash.Lib.nmeAppendSurface = function(surface,before,after) {
	if(flash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) before.parentNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) after.parentNode.insertBefore(surface,after.nextSibling); else flash.Lib.mMe.__scr.appendChild(surface);
	}
}
flash.Lib.nmeAppendText = function(surface,container,text,wrap,isHtml) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		surface.removeChild(surface.childNodes[i]);
	}
	if(isHtml) container.innerHTML = text; else container.appendChild(js.Browser.document.createTextNode(text));
	container.style.setProperty("position","relative","");
	container.style.setProperty("cursor","default","");
	if(!wrap) container.style.setProperty("white-space","nowrap","");
	surface.appendChild(container);
}
flash.Lib.nmeBootstrap = function() {
	if(flash.Lib.mMe == null) {
		var target = js.Browser.document.getElementById("haxe:jeash");
		if(target == null) target = js.Browser.document.createElement("div");
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat(HxOverrides.substr(agent,agent.indexOf("Android") + 8,3));
			if(version <= 2.3) flash.Lib.mForce2DTransform = true;
		}
		flash.Lib.Run(target,flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
	}
}
flash.Lib.nmeCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
flash.Lib.nmeCreateSurfaceAnimationCSS = function(surface,data,template,templateFunc,fps,discrete,infinite) {
	if(infinite == null) infinite = false;
	if(discrete == null) discrete = false;
	if(fps == null) fps = 25;
	if(surface.id == null || surface.id == "") {
		flash.Lib.trace("Failed to create a CSS Style tag for a surface without an id attribute");
		return null;
	}
	var style = null;
	if(surface.getAttribute("data-nme-anim") != null) style = js.Browser.document.getElementById(surface.getAttribute("data-nme-anim")); else {
		style = flash.Lib.mMe.__scr.appendChild(js.Browser.document.createElement("style"));
		style.sheet.id = "__nme_anim_" + surface.id + "__";
		surface.setAttribute("data-nme-anim",style.sheet.id);
	}
	var keyframeStylesheetRule = "";
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var perc = i / (data.length - 1) * 100;
		var frame = data[i];
		keyframeStylesheetRule += perc + "% { " + template.execute(templateFunc(frame)) + " } ";
	}
	var animationDiscreteRule = discrete?"steps(::steps::, end)":"";
	var animationInfiniteRule = infinite?"infinite":"";
	var animationTpl = "";
	var _g = 0, _g1 = ["animation","-moz-animation","-webkit-animation","-o-animation","-ms-animation"];
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		animationTpl += prefix + ": ::id:: ::duration::s " + animationDiscreteRule + " " + animationInfiniteRule + "; ";
	}
	var animationStylesheetRule = new haxe.Template(animationTpl).execute({ id : surface.id, duration : data.length / fps, steps : 1});
	var rules = style.sheet.rules != null?style.sheet.rules:style.sheet.cssRules;
	var _g = 0, _g1 = ["","-moz-","-webkit-","-o-","-ms-"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		try {
			style.sheet.insertRule("@" + variant + "keyframes " + surface.id + " {" + keyframeStylesheetRule + "}",rules.length);
		} catch( e ) {
		}
	}
	style.sheet.insertRule("#" + surface.id + " { " + animationStylesheetRule + " } ",rules.length);
	return style;
}
flash.Lib.nmeDesignMode = function(mode) {
	js.Browser.document.designMode = mode?"on":"off";
}
flash.Lib.nmeDisableFullScreen = function() {
}
flash.Lib.nmeDisableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		flash.Lib.trace("Disable right click not supported in this browser.");
	}
}
flash.Lib.nmeDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
flash.Lib.nmeDrawSurfaceRect = function(surface,tgt,x,y,rect) {
	var tgtCtx = tgt.getContext("2d");
	tgt.width = rect.width;
	tgt.height = rect.height;
	tgtCtx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);
	tgt.style.left = x + "px";
	tgt.style.top = y + "px";
}
flash.Lib.nmeDrawToSurface = function(surface,tgt,matrix,alpha,clipRect,smoothing) {
	if(smoothing == null) smoothing = true;
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	tgtCtx.globalAlpha = alpha;
	flash.Lib.nmeSetImageSmoothing(tgtCtx,smoothing);
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
flash.Lib.nmeEnableFullScreen = function() {
	if(flash.Lib.mMe != null) {
		var origWidth = flash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = flash.Lib.mMe.__scr.style.getPropertyValue("height");
		flash.Lib.mMe.__scr.style.setProperty("width","100%","");
		flash.Lib.mMe.__scr.style.setProperty("height","100%","");
		flash.Lib.nmeDisableFullScreen = function() {
			flash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			flash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
flash.Lib.nmeEnableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		flash.Lib.trace("Enable right click not supported in this browser.");
	}
}
flash.Lib.nmeFullScreenHeight = function() {
	return js.Browser.window.innerHeight;
}
flash.Lib.nmeFullScreenWidth = function() {
	return js.Browser.window.innerWidth;
}
flash.Lib.nmeGetHeight = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientHeight > 0?tgt.clientHeight:500;
}
flash.Lib.nmeGetStage = function() {
	if(flash.Lib.mStage == null) {
		var width = flash.Lib.nmeGetWidth();
		var height = flash.Lib.nmeGetHeight();
		flash.Lib.mStage = new flash.display.Stage(width,height);
	}
	return flash.Lib.mStage;
}
flash.Lib.nmeGetWidth = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientWidth > 0?tgt.clientWidth:500;
}
flash.Lib.nmeIsOnStage = function(surface) {
	var p = surface;
	while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
	return p == flash.Lib.mMe.__scr;
}
flash.Lib.nmeParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
flash.Lib.nmeRemoveSurface = function(surface) {
	if(flash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-nme-anim");
		if(anim != null) {
			var style = js.Browser.document.getElementById(anim);
			if(style != null) flash.Lib.mMe.__scr.removeChild(style);
		}
		if(surface.parentNode != null) surface.parentNode.removeChild(surface);
	}
	return surface;
}
flash.Lib.nmeSetSurfaceBorder = function(surface,color,size) {
	surface.style.setProperty("border-color","#" + StringTools.hex(color),"");
	surface.style.setProperty("border-style","solid","");
	surface.style.setProperty("border-width",size + "px","");
	surface.style.setProperty("border-collapse","collapse","");
}
flash.Lib.nmeSetSurfaceClipping = function(surface,rect) {
}
flash.Lib.nmeSetSurfaceFont = function(surface,font,bold,size,color,align,lineHeight) {
	surface.style.setProperty("font-family",font,"");
	surface.style.setProperty("font-weight",Std.string(bold),"");
	surface.style.setProperty("color","#" + StringTools.hex(color),"");
	surface.style.setProperty("font-size",size + "px","");
	surface.style.setProperty("text-align",align,"");
	surface.style.setProperty("line-height",lineHeight + "px","");
}
flash.Lib.nmeSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
flash.Lib.nmeSetSurfacePadding = function(surface,padding,margin,display) {
	surface.style.setProperty("padding",padding + "px","");
	surface.style.setProperty("margin",margin + "px","");
	surface.style.setProperty("top",padding + 2 + "px","");
	surface.style.setProperty("right",padding + 1 + "px","");
	surface.style.setProperty("left",padding + 1 + "px","");
	surface.style.setProperty("bottom",padding + 1 + "px","");
	surface.style.setProperty("display",display?"inline":"block","");
}
flash.Lib.nmeSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-nme-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
		surface.style.setProperty("transform","","");
		surface.style.setProperty("-moz-transform","","");
		surface.style.setProperty("-webkit-transform","","");
		surface.style.setProperty("-o-transform","","");
		surface.style.setProperty("-ms-transform","","");
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!flash.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
flash.Lib.nmeSetSurfaceZIndexAfter = function(surface1,surface2) {
	if(surface1 != null && surface2 != null) {
		if(surface1.parentNode != surface2.parentNode && surface2.parentNode != null) surface2.parentNode.appendChild(surface1);
		if(surface2.parentNode != null) {
			var nextSibling = surface2.nextSibling;
			if(surface1.previousSibling != surface2) {
				var swap = flash.Lib.nmeRemoveSurface(surface1);
				if(nextSibling == null) surface2.parentNode.appendChild(swap); else surface2.parentNode.insertBefore(swap,nextSibling);
			}
		}
	}
}
flash.Lib.nmeSwapSurface = function(surface1,surface2) {
	var parent1 = surface1.parentNode;
	var parent2 = surface2.parentNode;
	if(parent1 != null && parent2 != null) {
		if(parent1 == parent2) {
			var next1 = surface1.nextSibling;
			var next2 = surface2.nextSibling;
			if(next1 == surface2) parent1.insertBefore(surface2,surface1); else if(next2 == surface1) parent1.insertBefore(surface1,surface2); else {
				parent1.replaceChild(surface2,surface1);
				if(next2 != null) parent1.insertBefore(surface1,next2); else parent1.appendChild(surface1);
			}
		} else {
			var next2 = surface2.nextSibling;
			parent1.replaceChild(surface2,surface1);
			if(next2 != null) parent2.insertBefore(surface1,next2); else parent2.appendChild(surface1);
		}
	}
}
flash.Lib.nmeSetContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
flash.Lib.nmeSetCursor = function(type) {
	if(flash.Lib.mMe != null) flash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
flash.Lib.nmeSetImageSmoothing = function(context,enabled) {
	var _g = 0, _g1 = ["imageSmoothingEnabled","mozImageSmoothingEnabled","webkitImageSmoothingEnabled"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		context[variant] = enabled;
	}
}
flash.Lib.nmeSetSurfaceAlign = function(surface,align) {
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
flash.Lib.nmeSetSurfaceRotation = function(surface,rotate) {
	surface.style.setProperty("transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-moz-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-webkit-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-o-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-ms-transform","rotate(" + rotate + "deg)","");
}
flash.Lib.nmeSetSurfaceScale = function(surface,scale) {
	surface.style.setProperty("transform","scale(" + scale + ")","");
	surface.style.setProperty("-moz-transform","scale(" + scale + ")","");
	surface.style.setProperty("-webkit-transform","scale(" + scale + ")","");
	surface.style.setProperty("-o-transform","scale(" + scale + ")","");
	surface.style.setProperty("-ms-transform","scale(" + scale + ")","");
}
flash.Lib.nmeSetSurfaceSpritesheetAnimation = function(surface,spec,fps) {
	if(spec.length == 0) return surface;
	var div = js.Browser.document.createElement("div");
	div.style.backgroundImage = "url(" + surface.toDataURL("image/png") + ")";
	div.id = surface.id;
	var keyframeTpl = new haxe.Template("background-position: ::left::px ::top::px; width: ::width::px; height: ::height::px; ");
	var templateFunc = function(frame) {
		return { left : -frame.x, top : -frame.y, width : frame.width, height : frame.height};
	};
	flash.Lib.nmeCreateSurfaceAnimationCSS(div,spec,keyframeTpl,templateFunc,fps,true,true);
	if(flash.Lib.nmeIsOnStage(surface)) {
		flash.Lib.nmeAppendSurface(div);
		flash.Lib.nmeCopyStyle(surface,div);
		flash.Lib.nmeSwapSurface(surface,div);
		flash.Lib.nmeRemoveSurface(surface);
	} else flash.Lib.nmeCopyStyle(surface,div);
	return div;
}
flash.Lib.nmeSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
flash.Lib.nmeSetTextDimensions = function(surface,width,height,align) {
	surface.style.setProperty("width",width + "px","");
	surface.style.setProperty("height",height + "px","");
	surface.style.setProperty("overflow","hidden","");
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSurfaceHitTest = function(surface,x,y) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = surface.childNodes[i];
		if(x >= node.offsetLeft && x <= node.offsetLeft + node.offsetWidth && y >= node.offsetTop && y <= node.offsetTop + node.offsetHeight) return true;
	}
	return false;
}
flash.Lib.preventDefaultTouchMove = function() {
	js.Browser.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
}
flash.Lib.Run = function(tgt,width,height) {
	flash.Lib.mMe = new flash.Lib(tgt,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") flash.Lib.nmeGetStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	if(Reflect.hasField(js.Browser.window,"on" + "devicemotion")) js.Browser.window.addEventListener("devicemotion",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	if(Reflect.hasField(js.Browser.window,"on" + "orientationchange")) js.Browser.window.addEventListener("orientationchange",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	var _g = 0, _g1 = flash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		js.Browser.window.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") flash.Lib.nmeGetStage().set_backgroundColor(flash.Lib.nmeParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return pos == 0?res | cur << 16:pos == 1?res | cur << 8:pos == 2?res | cur:(function($this) {
			var $r;
			throw "pos should be 0-2";
			return $r;
		}(this));
	})); else flash.Lib.nmeGetStage().set_backgroundColor(16777215);
	flash.Lib.get_current().get_graphics().beginFill(flash.Lib.nmeGetStage().get_backgroundColor());
	flash.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	flash.Lib.nmeSetSurfaceId(flash.Lib.get_current().get_graphics().nmeSurface,"Root MovieClip");
	flash.Lib.nmeGetStage().nmeUpdateNextWake();
	return flash.Lib.mMe;
}
flash.Lib.setUserScalable = function(isScalable) {
	if(isScalable == null) isScalable = true;
	var meta = js.Browser.document.createElement("meta");
	meta.name = "viewport";
	meta.content = "user-scalable=" + (isScalable?"yes":"no");
}
flash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
flash.Lib.addCallback = function(functionName,closure) {
	flash.Lib.mMe.__scr[functionName] = closure;
}
flash.Lib.get_current = function() {
	if(flash.Lib.mMainClassRoot == null) {
		flash.Lib.mMainClassRoot = new flash.display.MovieClip();
		flash.Lib.mCurrent = flash.Lib.mMainClassRoot;
		flash.Lib.nmeGetStage().addChild(flash.Lib.mCurrent);
	}
	return flash.Lib.mMainClassRoot;
}
flash.Lib.prototype = {
	__class__: flash.Lib
}
flash._Lib = {}
flash._Lib.CursorType = $hxClasses["flash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
flash._Lib.CursorType.Pointer = ["Pointer",0];
flash._Lib.CursorType.Pointer.toString = $estr;
flash._Lib.CursorType.Pointer.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Text = ["Text",1];
flash._Lib.CursorType.Text.toString = $estr;
flash._Lib.CursorType.Text.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Default = ["Default",2];
flash._Lib.CursorType.Default.toString = $estr;
flash._Lib.CursorType.Default.__enum__ = flash._Lib.CursorType;
flash._Vector = {}
flash._Vector.Vector_Impl_ = function() { }
$hxClasses["flash._Vector.Vector_Impl_"] = flash._Vector.Vector_Impl_;
flash._Vector.Vector_Impl_.__name__ = ["flash","_Vector","Vector_Impl_"];
flash._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
flash._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
}
flash._Vector.Vector_Impl_.concat = function(this1,a) {
	return this1.concat(a);
}
flash._Vector.Vector_Impl_.copy = function(this1) {
	return this1.slice();
}
flash._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
}
flash._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
}
flash._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
}
flash._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
}
flash._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
}
flash._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
}
flash._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
}
flash._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
}
flash._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
}
flash._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
}
flash._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
}
flash._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from, _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
}
flash._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
}
flash._Vector.Vector_Impl_.ofArray = function(a) {
	return flash._Vector.Vector_Impl_.concat(flash._Vector.Vector_Impl_._new(),a);
}
flash._Vector.Vector_Impl_.convert = function(v) {
	return v;
}
flash._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
}
flash._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
}
flash._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
}
flash._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(value < this1.length) this1 = this1.slice(0,value);
	while(value > this1.length) this1.push(null);
	return value;
}
flash._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
}
flash._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
}
flash.accessibility = {}
flash.accessibility.AccessibilityProperties = function() {
	this.description = "";
	this.forceSimple = false;
	this.name = "";
	this.noAutoLabeling = false;
	this.shortcut = "";
	this.silent = false;
};
$hxClasses["flash.accessibility.AccessibilityProperties"] = flash.accessibility.AccessibilityProperties;
flash.accessibility.AccessibilityProperties.__name__ = ["flash","accessibility","AccessibilityProperties"];
flash.accessibility.AccessibilityProperties.prototype = {
	__class__: flash.accessibility.AccessibilityProperties
}
flash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	flash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		this.bitmapData.nmeReferenceCount++;
		if(this.bitmapData.nmeReferenceCount == 1) this.nmeGraphics = new flash.display.Graphics(this.bitmapData._nmeTextureBuffer);
	}
	if(this.pixelSnapping == null) this.pixelSnapping = flash.display.PixelSnapping.AUTO;
	if(this.nmeGraphics == null) this.nmeGraphics = new flash.display.Graphics();
	if(this.bitmapData != null) this.nmeRender();
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_bitmapData: function(inBitmapData) {
		if(inBitmapData != this.bitmapData) {
			if(this.bitmapData != null) {
				this.bitmapData.nmeReferenceCount--;
				if(this.nmeGraphics.nmeSurface == this.bitmapData._nmeTextureBuffer) flash.Lib.nmeSetSurfaceOpacity(this.bitmapData._nmeTextureBuffer,0);
			}
			if(inBitmapData != null) inBitmapData.nmeReferenceCount++;
		}
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new flash.geom.Rectangle(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if(this.bitmapData == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.bitmapData._nmeTextureBuffer != this.nmeGraphics.nmeSurface) {
			var imageDataLease = this.bitmapData.nmeLease;
			if(imageDataLease != null && (this.nmeCurrentLease == null || imageDataLease.seed != this.nmeCurrentLease.seed || imageDataLease.time != this.nmeCurrentLease.time)) {
				var srcCanvas = this.bitmapData._nmeTextureBuffer;
				this.nmeGraphics.nmeSurface.width = srcCanvas.width;
				this.nmeGraphics.nmeSurface.height = srcCanvas.height;
				this.nmeGraphics.clear();
				flash.Lib.nmeDrawToSurface(srcCanvas,this.nmeGraphics.nmeSurface);
				this.nmeCurrentLease = imageDataLease.clone();
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
				this._nmeRenderFlags |= 32;
			}
		}
		if(inMask != null) {
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
			flash.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect,this.smoothing);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
				flash.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			if(!this.nmeInit) {
				flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,0);
				this.nmeInit = true;
			} else flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() || local.y > this.get_height()) return null; else return this;
		} else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,__class__: flash.display.Bitmap
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
flash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.nmeLocked = false;
	this.nmeReferenceCount = 0;
	this.nmeLeaseNum = 0;
	this.nmeLease = new flash.display.ImageDataLease();
	this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	this._nmeTextureBuffer = js.Browser.document.createElement("canvas");
	this._nmeTextureBuffer.width = width;
	this._nmeTextureBuffer.height = height;
	this._nmeId = flash.utils.Uuid.uuid();
	flash.Lib.nmeSetSurfaceId(this._nmeTextureBuffer,this._nmeId);
	this.nmeTransparent = transparent;
	this.rect = new flash.geom.Rectangle(0,0,width,height);
	if(this.nmeTransparent) {
		this.nmeTransparentFiller = js.Browser.document.createElement("canvas");
		this.nmeTransparentFiller.width = width;
		this.nmeTransparentFiller.height = height;
		var ctx = this.nmeTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.nmeTransparent) inFillColor |= -16777216;
		this.nmeInitColor = inFillColor;
		this.nmeFillRect(this.rect,inFillColor);
	}
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new flash.geom.Rectangle(0,0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0));
	var num = (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0) * (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0);
	p.position = 0;
	var _g = 0;
	while(_g < num) {
		var i = _g++;
		var pos = p.position;
		var alpha = p.readByte();
		var red = p.readByte();
		var green = p.readByte();
		var blue = p.readByte();
		p.position = pos;
		p.writeByte(red);
		p.writeByte(green);
		p.writeByte(blue);
		p.writeByte(alpha);
	}
	return p;
}
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.nmeLoadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
}
flash.display.BitmapData.nmeBase64Encode = function(bytes) {
	var blob = "";
	var codex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	bytes.position = 0;
	while(bytes.position < bytes.length) {
		var by1 = 0, by2 = 0, by3 = 0;
		by1 = bytes.readByte();
		if(bytes.position < bytes.length) by2 = bytes.readByte();
		if(bytes.position < bytes.length) by3 = bytes.readByte();
		var by4 = 0, by5 = 0, by6 = 0, by7 = 0;
		by4 = by1 >> 2;
		by5 = (by1 & 3) << 4 | by2 >> 4;
		by6 = (by2 & 15) << 2 | by3 >> 6;
		by7 = by3 & 63;
		blob += codex.charAt(by4);
		blob += codex.charAt(by5);
		if(bytes.position < bytes.length) blob += codex.charAt(by6); else blob += "=";
		if(bytes.position < bytes.length) blob += codex.charAt(by7); else blob += "=";
	}
	return blob;
}
flash.display.BitmapData.nmeCreateFromHandle = function(inHandle) {
	var result = new flash.display.BitmapData(0,0);
	result._nmeTextureBuffer = inHandle;
	return result;
}
flash.display.BitmapData.nmeIsJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
}
flash.display.BitmapData.nmeIsPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
}
flash.display.BitmapData.prototype = {
	get_width: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.width; else return 0;
	}
	,get_transparent: function() {
		return this.nmeTransparent;
	}
	,get_height: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.height; else return 0;
	}
	,nmeOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		data.bitmapData.nmeBuildLease();
		if(data.inLoader != null) {
			var e1 = new flash.events.Event(flash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,unlock: function(changeRect) {
		this.nmeLocked = false;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		if(this.nmeImageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.nmeImageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.nmeImageData,0,0);
		}
		var _g = 0, _g1 = this.nmeCopyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.nmeTransparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		console.log("BitmapData.threshold not implemented");
		return 0;
	}
	,setPixels: function(rect,byteArray) {
		rect = this.clipRect(rect);
		if(rect == null) return;
		var len = Math.round(4 * rect.width * rect.height);
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				imageData.data[i] = byteArray.readByte();
			}
			ctx.putImageData(imageData,rect.x,rect.y);
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				this.nmeImageData.data[pos] = byteArray.readByte();
				pos++;
			}
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = (color & -16777216) >>> 24; else imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = (color & -16777216) >>> 24; else this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,scroll: function(x,y) {
		throw "bitmapData.scroll is currently not supported for HTML5";
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		var generator = new flash.display._BitmapData.MinstdGenerator(randomSeed);
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var imageData = null;
		if(this.nmeLocked) imageData = this.nmeImageData; else imageData = ctx.createImageData(this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
		var _g1 = 0, _g = this._nmeTextureBuffer.width * this._nmeTextureBuffer.height;
		while(_g1 < _g) {
			var i = _g1++;
			if(grayScale) imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1); else {
				imageData.data[i * 4] = (channelOptions & 1) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 1] = (channelOptions & 2) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 2] = (channelOptions & 4) == 0?0:low + generator.nextValue() % (high - low + 1);
			}
			imageData.data[i * 4 + 3] = (channelOptions & 8) == 0?255:low + generator.nextValue() % (high - low + 1);
		}
		if(this.nmeLocked) this.nmeImageDataChanged = true; else ctx.putImageData(imageData,0,0);
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Browser.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this._nmeTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.nmeOnLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.nmeOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,nmeIncrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps++;
	}
	,nmeGetNumRefBitmaps: function() {
		return this.nmeAssignedBitmaps;
	}
	,nmeLoadFromBytes: function(bytes,inRawAlpha,onload) {
		var _g = this;
		var type = "";
		if(flash.display.BitmapData.nmeIsPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.nmeIsJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		var img = js.Browser.document.createElement("img");
		var canvas = this._nmeTextureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			if(inRawAlpha != null) {
				var pixels = ctx.getImageData(0,0,img.width,img.height);
				var _g1 = 0, _g2 = inRawAlpha.length;
				while(_g1 < _g2) {
					var i = _g1++;
					pixels.data[i * 4 + 3] = inRawAlpha.readUnsignedByte();
				}
				ctx.putImageData(pixels,0,0);
			}
			_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload != null) onload(_g);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + flash.display.BitmapData.nmeBase64Encode(bytes);
	}
	,nmeGetLease: function() {
		return this.nmeLease;
	}
	,nmeFillRect: function(rect,color) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.nmeTransparent?color >>> 24:255;
		if(!this.nmeLocked) {
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = r;
					this.nmeImageData.data[s + offsetX + 1] = g;
					this.nmeImageData.data[s + offsetX + 2] = b;
					this.nmeImageData.data[s + offsetX + 3] = a;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,nmeDecrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps--;
	}
	,nmeClearCanvas: function() {
		var ctx = this._nmeTextureBuffer.getContext("2d");
		ctx.clearRect(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
	}
	,nmeBuildLease: function() {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,lock: function() {
		this.nmeLocked = true;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		this.nmeImageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		this.nmeImageDataChanged = false;
		this.nmeCopyPixelList = [];
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		var type = Type.getClassName(Type.getClass(secondObject));
		firstAlphaThreshold = firstAlphaThreshold & -1;
		var me = this;
		var doHitTest = function(imageData) {
			if(secondObject.__proto__ == null || secondObject.__proto__.__class__ == null || secondObject.__proto__.__class__.__name__ == null) return false;
			var _g = secondObject.__proto__.__class__.__name__[2];
			switch(_g) {
			case "Rectangle":
				var rect = secondObject;
				rect.x -= firstPoint.x;
				rect.y -= firstPoint.y;
				rect = me.clipRect(me.rect);
				if(me.rect == null) return false;
				var boundingBox = new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
				if(!rect.intersects(boundingBox)) return false;
				var diff = rect.intersection(boundingBox);
				var offset = 4 * (Math.round(diff.x) + Math.round(diff.y) * imageData.width) + 3;
				var pos = offset;
				var boundR = Math.round(4 * (diff.x + diff.width));
				while(pos < offset + Math.round(4 * (diff.width + imageData.width * diff.height))) {
					if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
					if(imageData.data[pos] - firstAlphaThreshold >= 0) return true;
					pos += 4;
				}
				return false;
			case "Point":
				var point = secondObject;
				var x = point.x - firstPoint.x;
				var y = point.y - firstPoint.y;
				if(x < 0 || y < 0 || x >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) || y >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0)) return false;
				if(imageData.data[Math.round(4 * (y * (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) + x)) + 3] - firstAlphaThreshold > 0) return true;
				return false;
			case "Bitmap":
				throw "bitmapData.hitTest with a second object of type Bitmap is currently not supported for HTML5";
				return false;
			case "BitmapData":
				throw "bitmapData.hitTest with a second object of type BitmapData is currently not supported for HTML5";
				return false;
			default:
				throw "BitmapData::hitTest secondObject argument must be either a Rectangle, a Point, a Bitmap or a BitmapData object.";
				return false;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doHitTest(imageData);
		} else return doHitTest(this.nmeImageData);
	}
	,handle: function() {
		return this._nmeTextureBuffer;
	}
	,getPixels: function(rect) {
		var len = Math.round(4 * rect.width * rect.height);
		var byteArray = new flash.utils.ByteArray();
		if(byteArray.allocated < len) byteArray._nmeResizeBuffer(byteArray.allocated = Math.max(len,byteArray.allocated * 2) | 0); else if(byteArray.allocated > len) byteArray._nmeResizeBuffer(byteArray.allocated = len);
		byteArray.length = len;
		len;
		rect = this.clipRect(rect);
		if(rect == null) return byteArray;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				byteArray.writeByte(imagedata.data[i]);
			}
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				byteArray.writeByte(this.nmeImageData.data[pos]);
				pos++;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			return this.getInt32(0,ctx.getImageData(x,y,1,1).data);
		} else return this.getInt32(4 * y * this._nmeTextureBuffer.width + x * 4,this.nmeImageData.data);
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(x,y,1,1);
			return imagedata.data[0] << 16 | imagedata.data[1] << 8 | imagedata.data[2];
		} else {
			var offset = 4 * y * (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + x * 4;
			return this.nmeImageData.data[offset] << 16 | this.nmeImageData.data[offset + 1] << 8 | this.nmeImageData.data[offset + 2];
		}
	}
	,getInt32: function(offset,data) {
		return (this.nmeTransparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		var me = this;
		var doGetColorBoundsRect = function(data) {
			var minX = me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0, maxX = 0, minY = me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0, maxY = 0, i = 0;
			while(i < data.length) {
				var value = me.getInt32(i,data);
				if(findColor) {
					if((value & mask) == color) {
						var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
						var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
						if(x < minX) minX = x;
						if(x > maxX) maxX = x;
						if(y < minY) minY = y;
						if(y > maxY) maxY = y;
					}
				} else if((value & mask) != color) {
					var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
					var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
					if(x < minX) minX = x;
					if(x > maxX) maxX = x;
					if(y < minY) minY = y;
					if(y > maxY) maxY = y;
				}
				i += 4;
			}
			if(minX < maxX && minY < maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY); else return new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
		};
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doGetColorBoundsRect(imageData.data);
		} else return doGetColorBoundsRect(this.nmeImageData.data);
	}
	,floodFill: function(x,y,color) {
		var wasLocked = this.nmeLocked;
		if(!this.nmeLocked) this.lock();
		var queue = new Array();
		queue.push(new flash.geom.Point(x,y));
		var old = this.getPixel32(x,y);
		var iterations = 0;
		var search = new Array();
		var _g1 = 0, _g = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var column = new Array();
			var _g3 = 0, _g2 = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0) + 1;
			while(_g3 < _g2) {
				var i1 = _g3++;
				column.push(false);
			}
			search.push(column);
		}
		var currPoint, newPoint;
		while(queue.length > 0) {
			currPoint = queue.shift();
			++iterations;
			var x1 = currPoint.x | 0;
			var y1 = currPoint.y | 0;
			if(x1 < 0 || x1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) continue;
			if(y1 < 0 || y1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) continue;
			search[x1][y1] = true;
			if(this.getPixel32(x1,y1) == old) {
				this.setPixel32(x1,y1,color);
				if(!search[x1 + 1][y1]) queue.push(new flash.geom.Point(x1 + 1,y1));
				if(!search[x1][y1 + 1]) queue.push(new flash.geom.Point(x1,y1 + 1));
				if(x1 > 0 && !search[x1 - 1][y1]) queue.push(new flash.geom.Point(x1 - 1,y1));
				if(y1 > 0 && !search[x1][y1 - 1]) queue.push(new flash.geom.Point(x1,y1 - 1));
			}
		}
		if(!wasLocked) this.unlock();
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this._nmeTextureBuffer.width && rect.height == this._nmeTextureBuffer.height) {
			if(this.nmeTransparent) {
				if(color >>> 24 == 0 || color == this.nmeInitColor) return this.nmeClearCanvas();
			} else if((color | -16777216) == (this.nmeInitColor | -16777216)) return this.nmeClearCanvas();
		}
		return this.nmeFillRect(rect,color);
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else {
				flash.Lib.nmeSetImageSmoothing(ctx,smoothing);
				ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			}
			ctx.drawImage(this._nmeTextureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this._nmeTextureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new flash.geom.Rectangle(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height),inColorTransform);
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		source.drawToSurface(this._nmeTextureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new flash.geom.Rectangle();
			var object = source;
			rect.x = matrix != null?matrix.tx:0;
			rect.y = matrix != null?matrix.ty:0;
			try {
				rect.width = Reflect.getProperty(source,"width");
				rect.height = Reflect.getProperty(source,"height");
			} catch( e ) {
				rect.width = this._nmeTextureBuffer.width;
				rect.height = this._nmeTextureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,dispose: function() {
		this.nmeClearCanvas();
		this._nmeTextureBuffer = null;
		this.nmeLeaseNum = 0;
		this.nmeLease = null;
		this.nmeImageData = null;
	}
	,destroy: function() {
		this._nmeTextureBuffer = null;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceBitmapData._nmeTextureBuffer.width == 0 || sourceBitmapData._nmeTextureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		if(alphaBitmapData != null && alphaBitmapData.nmeTransparent) {
			if(alphaPoint == null) alphaPoint = new flash.geom.Point();
			var bitmapData = new flash.display.BitmapData(sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.width:0,sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.height:0,true);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point(sourceRect.x,sourceRect.y));
			bitmapData.copyChannel(alphaBitmapData,new flash.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new flash.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = bitmapData;
		}
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			if(!mergeAlpha) {
				if(this.nmeTransparent && sourceBitmapData.nmeTransparent) {
					var trpCtx = sourceBitmapData.nmeTransparentFiller.getContext("2d");
					var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
					ctx.putImageData(trpData,destPoint.x,destPoint.y);
				}
			}
			ctx.drawImage(sourceBitmapData._nmeTextureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.nmeCopyPixelList[this.nmeCopyPixelList.length] = { handle : sourceBitmapData._nmeTextureBuffer, transparentFiller : mergeAlpha?null:sourceBitmapData.nmeTransparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		this.rect = this.clipRect(this.rect);
		if(this.rect == null) return;
		if(destChannel == 8 && !this.nmeTransparent) return;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		var doChannelCopy = function(imageData) {
			var srcCtx = sourceBitmapData._nmeTextureBuffer.getContext("2d");
			var srcImageData = srcCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
			var destIdx = -1;
			if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
			var pos = 4 * (Math.round(destPoint.x) + Math.round(destPoint.y) * imageData.width) + destIdx;
			var boundR = Math.round(4 * (destPoint.x + sourceRect.width));
			var setPos = function(val) {
				if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
				imageData.data[pos] = val;
				pos += 4;
			};
			var srcIdx = -1;
			if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
			while(srcIdx < srcImageData.data.length) {
				setPos(srcImageData.data[srcIdx]);
				srcIdx += 4;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			doChannelCopy(imageData);
			ctx.putImageData(imageData,0,0);
		} else {
			doChannelCopy(this.nmeImageData);
			this.nmeImageDataChanged = true;
		}
	}
	,compare: function(inBitmapTexture) {
		throw "bitmapData.compare is currently not supported for HTML5";
		return 0;
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0, _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = this.nmeImageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.nmeImageData.data[s + offsetX + 1] = this.nmeImageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.nmeImageData.data[s + offsetX + 2] = this.nmeImageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.nmeImageData.data[s + offsetX + 3] = this.nmeImageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,clone: function() {
		var bitmapData = new flash.display.BitmapData(this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0,this.nmeTransparent);
		var rect = new flash.geom.Rectangle(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		bitmapData.setPixels(rect,this.getPixels(rect));
		bitmapData.nmeLease.set(bitmapData.nmeLeaseNum++,new Date().getTime());
		return bitmapData;
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) {
			r.width -= r.x + r.width - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) {
			r.height -= r.y + r.height - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,clear: function(color) {
		this.fillRect(this.rect,color);
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(sourceBitmapData == this && sourceRect.x == destPoint.x && sourceRect.y == destPoint.y) filter.nmeApplyFilter(this._nmeTextureBuffer,sourceRect); else {
			var bitmapData = new flash.display.BitmapData(sourceRect.width | 0,sourceRect.height | 0);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point());
			filter.nmeApplyFilter(bitmapData._nmeTextureBuffer);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
		}
	}
	,__class__: flash.display.BitmapData
	,__properties__: {get_height:"get_height",get_transparent:"get_transparent",get_width:"get_width"}
}
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: flash.display.ImageDataLease
}
flash.display._BitmapData = {}
flash.display._BitmapData.MinstdGenerator = function(seed) {
	if(seed == 0) this.value = 1; else this.value = seed;
};
$hxClasses["flash.display._BitmapData.MinstdGenerator"] = flash.display._BitmapData.MinstdGenerator;
flash.display._BitmapData.MinstdGenerator.__name__ = ["flash","display","_BitmapData","MinstdGenerator"];
flash.display._BitmapData.MinstdGenerator.prototype = {
	nextValue: function() {
		var lo = 16807 * (this.value & 65535);
		var hi = 16807 * (this.value >>> 16);
		lo += (hi & 32767) << 16;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		lo += hi >>> 15;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		return this.value = lo;
	}
	,__class__: flash.display._BitmapData.MinstdGenerator
}
flash.display.BitmapDataChannel = function() { }
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display.CapsStyle = $hxClasses["flash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
flash.display.CapsStyle.NONE = ["NONE",0];
flash.display.CapsStyle.NONE.toString = $estr;
flash.display.CapsStyle.NONE.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.ROUND = ["ROUND",1];
flash.display.CapsStyle.ROUND.toString = $estr;
flash.display.CapsStyle.ROUND.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.SQUARE = ["SQUARE",2];
flash.display.CapsStyle.SQUARE.toString = $estr;
flash.display.CapsStyle.SQUARE.__enum__ = flash.display.CapsStyle;
flash.display.GradientType = $hxClasses["flash.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] }
flash.display.GradientType.RADIAL = ["RADIAL",0];
flash.display.GradientType.RADIAL.toString = $estr;
flash.display.GradientType.RADIAL.__enum__ = flash.display.GradientType;
flash.display.GradientType.LINEAR = ["LINEAR",1];
flash.display.GradientType.LINEAR.toString = $estr;
flash.display.GradientType.LINEAR.__enum__ = flash.display.GradientType;
flash.display.Graphics = function(inSurface) {
	flash.Lib.nmeBootstrap();
	if(inSurface == null) {
		this.nmeSurface = js.Browser.document.createElement("canvas");
		this.nmeSurface.width = 0;
		this.nmeSurface.height = 0;
	} else this.nmeSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.nmeClearLine();
	this.mLineJobs = [];
	this.nmeChanged = true;
	this.nextDrawIndex = 0;
	this.nmeExtent = new flash.geom.Rectangle();
	this.nmeExtentWithFilters = new flash.geom.Rectangle();
	this._padding = 0.0;
	this.nmeClearNextCycle = true;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.nmeDetectIsPointInPathMode = function() {
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return flash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?flash.display.PointInPathMode.USER_SPACE:flash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
flash.display.Graphics.prototype = {
	nmeRender: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.nmeChanged) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.nmeExpandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.nmeClearNextCycle) {
			this.nextDrawIndex = 0;
			this.nmeClearCanvas();
			this.nmeClearNextCycle = false;
		}
		if(this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x > this.nmeSurface.width || this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y > this.nmeSurface.height) this.nmeAdjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,flash.filters.DropShadowFilter)) filter.nmeApplyFilter(this.nmeSurface,null,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.nmeExtentWithFilters.x != 0 || this.nmeExtentWithFilters.y != 0) ctx.translate(-this.nmeExtentWithFilters.x * sx,-this.nmeExtentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.nmeDrawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0, _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						switch(lj.joints) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						switch(lj.caps) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
						while(_g4 < _g3) {
							var i1 = _g4++;
							var p = d.points[i1];
							switch(p.type) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0, _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				var bitmap = d.bitmap;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else if(bitmap != null && (bitmap.flags & 16) > 0) {
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					if((bitmap.flags & 65536) == 0) {
						ctx.mozImageSmoothingEnabled = false;
						ctx.webkitImageSmoothingEnabled = false;
					}
					ctx.fillStyle = ctx.createPattern(bitmap.texture_buffer,"repeat");
				} else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				if(bitmap != null && (bitmap.flags & 16) == 0) {
					ctx.clip();
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.nmeChanged = false;
		this.nextDrawIndex = len > 0?len - 1:0;
		this.mDrawList = [];
		return true;
	}
	,nmeMediaSurface: function(surface) {
		this.nmeSurface = surface;
	}
	,nmeInvalidate: function() {
		this.nmeChanged = true;
		this.nmeClearNextCycle = true;
	}
	,nmeHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.nmeExtent.width > 0 && this.nmeExtent.height > 0) return true;
		return false;
	}
	,nmeExpandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.nmeExtent.width -= this._padding;
			this.nmeExtent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtent.x = minX;
		this.nmeExtent.y = minY;
		this.nmeExtent.width = maxX - minX + this._padding;
		this.nmeExtent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,nmeExpandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtentWithFilters.x = minX;
		this.nmeExtentWithFilters.y = minY;
		this.nmeExtentWithFilters.width = maxX - minX;
		this.nmeExtentWithFilters.height = maxY - minY;
	}
	,nmeDrawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.nmeBitmap._nmeTextureBuffer;
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.nmeTileRects[tileID];
				center = sheet.nmeCenterPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,nmeDrawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,nmeClearLine: function() {
		this.mCurrentLine = new flash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,nmeClearCanvas: function() {
		if(this.nmeSurface != null) {
			var ctx = (function($this) {
				var $r;
				try {
					$r = $this.nmeSurface.getContext("2d");
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(ctx != null) ctx.clearRect(0,0,this.nmeSurface.width,this.nmeSurface.height);
		}
	}
	,nmeAdjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.nmeSurface,"getContext") != null) {
			var width = Math.ceil((this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x) * sx);
			var height = Math.ceil((this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Browser.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				flash.Lib.nmeDrawToSurface(this.nmeSurface,dstCanvas);
				if(flash.Lib.nmeIsOnStage(this.nmeSurface)) {
					flash.Lib.nmeAppendSurface(dstCanvas);
					flash.Lib.nmeCopyStyle(this.nmeSurface,dstCanvas);
					flash.Lib.nmeSwapSurface(this.nmeSurface,dstCanvas);
					flash.Lib.nmeRemoveSurface(this.nmeSurface);
					if(this.nmeSurface.id != null) flash.Lib.nmeSetSurfaceId(dstCanvas,this.nmeSurface.id);
				}
				this.nmeSurface = dstCanvas;
			}
		}
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.nmeClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.mCurrentLine.grad = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,getContext: function() {
		try {
			return this.nmeSurface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,flush: function() {
		this.closePolygon(true);
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.nmeExpandStandardExtent(flash.Lib.get_current().get_stage().get_stageWidth(),flash.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new flash.display.Drawable(null,null,null,null,null,null,new flash.display.TileJob(sheet,tileData,flags)));
		this.nmeChanged = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(ry == -1) ry = rx;
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawGraphicsData: function(points) {
		var $it0 = ((function(_e) {
			return function() {
				return $iterator(flash._Vector.Vector_Impl_)(_e);
			};
		})(points))();
		while( $it0.hasNext() ) {
			var data = $it0.next();
			if(data == null) this.mFilling = true; else switch(data.nmeGraphicsDataType) {
			case flash.display.GraphicsDataType.STROKE:
				var stroke = data;
				if(stroke.fill == null) this.lineStyle(stroke.thickness,0,1.,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit); else switch(stroke.fill.nmeGraphicsFillType) {
				case flash.display.GraphicsFillType.SOLID_FILL:
					var fill = stroke.fill;
					this.lineStyle(stroke.thickness,fill.color,fill.alpha,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit);
					break;
				case flash.display.GraphicsFillType.GRADIENT_FILL:
					var fill = stroke.fill;
					this.lineGradientStyle(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
					break;
				}
				break;
			case flash.display.GraphicsDataType.PATH:
				var path = data;
				var j = 0;
				var _g1 = 0, _g = flash._Vector.Vector_Impl_.get_length(path.commands);
				while(_g1 < _g) {
					var i = _g1++;
					var command = path.commands[i];
					switch(command) {
					case 1:
						this.moveTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 2:
						this.lineTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 3:
						this.curveTo(path.data[j],path.data[j + 1],path.data[j + 2],path.data[j + 3]);
						j = j + 4;
						break;
					}
				}
				break;
			case flash.display.GraphicsDataType.SOLID:
				var fill = data;
				this.beginFill(fill.color,fill.alpha);
				break;
			case flash.display.GraphicsDataType.GRADIENT:
				var fill = data;
				this.beginGradientFill(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
				break;
			}
		}
	}
	,drawEllipse: function(x,y,rx,ry) {
		this.closePolygon(false);
		rx /= 2;
		ry /= 2;
		this.nmeDrawEllipse(x + rx,y + ry,rx,ry);
		this.closePolygon(false);
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.nmeDrawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,createGradient: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		var points = new Array();
		var _g1 = 0, _g = colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			points.push(new flash.display.GradPoint(colors[i],alphas[i],ratios[i]));
		}
		var flags = 0;
		if(type == flash.display.GradientType.RADIAL) flags |= 1;
		if(spreadMethod == flash.display.SpreadMethod.REPEAT) flags |= 2; else if(spreadMethod == flash.display.SpreadMethod.REFLECT) flags |= 4;
		if(matrix == null) {
			matrix = new flash.geom.Matrix();
			matrix.createGradientBox(25,25);
		} else matrix = matrix.clone();
		var focal = focalPointRatio == null?0:focalPointRatio;
		return new flash.display.Grad(points,matrix,flags,focal);
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new flash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new flash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new flash.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.nmeChanged = true;
	}
	,clear: function() {
		this.nmeClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.nmeClearNextCycle = true;
		this.boundsDirty = true;
		this.nmeExtent.x = 0.0;
		this.nmeExtent.y = 0.0;
		this.nmeExtent.width = 0.0;
		this.nmeExtent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,blit: function(inTexture) {
		this.closePolygon(true);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) ctx.drawImage(inTexture._nmeTextureBuffer,this.mPenX,this.mPenY);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.closePolygon(true);
		this.mFilling = true;
		this.mBitmap = null;
		this.mSolidGradient = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,beginBitmapFill: function(bitmap,matrix,in_repeat,in_smooth) {
		if(in_smooth == null) in_smooth = false;
		if(in_repeat == null) in_repeat = true;
		this.closePolygon(true);
		var repeat = in_repeat == null?true:in_repeat;
		var smooth = in_smooth == null?false:in_smooth;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.nmeExpandStandardExtent(bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.width:0,bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.height:0);
		this.mBitmap = { texture_buffer : bitmap._nmeTextureBuffer, matrix : matrix == null?matrix:matrix.clone(), flags : (repeat?16:0) | (smooth?65536:0)};
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new flash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,__class__: flash.display.Graphics
}
flash.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["flash.display.Drawable"] = flash.display.Drawable;
flash.display.Drawable.__name__ = ["flash","display","Drawable"];
flash.display.Drawable.prototype = {
	__class__: flash.display.Drawable
}
flash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["flash.display.GfxPoint"] = flash.display.GfxPoint;
flash.display.GfxPoint.__name__ = ["flash","display","GfxPoint"];
flash.display.GfxPoint.prototype = {
	__class__: flash.display.GfxPoint
}
flash.display.Grad = function(inPoints,inMatrix,inFlags,inFocal) {
	this.points = inPoints;
	this.matrix = inMatrix;
	this.flags = inFlags;
	this.focal = inFocal;
};
$hxClasses["flash.display.Grad"] = flash.display.Grad;
flash.display.Grad.__name__ = ["flash","display","Grad"];
flash.display.Grad.prototype = {
	__class__: flash.display.Grad
}
flash.display.GradPoint = function(inCol,inAlpha,inRatio) {
	this.col = inCol;
	this.alpha = inAlpha;
	this.ratio = inRatio;
};
$hxClasses["flash.display.GradPoint"] = flash.display.GradPoint;
flash.display.GradPoint.__name__ = ["flash","display","GradPoint"];
flash.display.GradPoint.prototype = {
	__class__: flash.display.GradPoint
}
flash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["flash.display.LineJob"] = flash.display.LineJob;
flash.display.LineJob.__name__ = ["flash","display","LineJob"];
flash.display.LineJob.prototype = {
	__class__: flash.display.LineJob
}
flash.display.PointInPathMode = $hxClasses["flash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
flash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
flash.display.PointInPathMode.USER_SPACE.toString = $estr;
flash.display.PointInPathMode.USER_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
flash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
flash.display.PointInPathMode.DEVICE_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["flash.display.TileJob"] = flash.display.TileJob;
flash.display.TileJob.__name__ = ["flash","display","TileJob"];
flash.display.TileJob.prototype = {
	__class__: flash.display.TileJob
}
flash.display.IGraphicsFill = function() { }
$hxClasses["flash.display.IGraphicsFill"] = flash.display.IGraphicsFill;
flash.display.IGraphicsFill.__name__ = ["flash","display","IGraphicsFill"];
flash.display.IGraphicsFill.prototype = {
	__class__: flash.display.IGraphicsFill
}
flash.display.IGraphicsData = function() { }
$hxClasses["flash.display.IGraphicsData"] = flash.display.IGraphicsData;
flash.display.IGraphicsData.__name__ = ["flash","display","IGraphicsData"];
flash.display.IGraphicsData.prototype = {
	__class__: flash.display.IGraphicsData
}
flash.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) focalPointRatio = 0;
	this.type = type;
	this.colors = colors;
	this.alphas = alphas;
	this.ratios = ratios;
	this.matrix = matrix;
	this.spreadMethod = spreadMethod;
	this.interpolationMethod = interpolationMethod;
	this.focalPointRatio = focalPointRatio;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.GRADIENT;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.GRADIENT_FILL;
};
$hxClasses["flash.display.GraphicsGradientFill"] = flash.display.GraphicsGradientFill;
flash.display.GraphicsGradientFill.__name__ = ["flash","display","GraphicsGradientFill"];
flash.display.GraphicsGradientFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsGradientFill.prototype = {
	__class__: flash.display.GraphicsGradientFill
}
flash.display.IGraphicsPath = function() { }
$hxClasses["flash.display.IGraphicsPath"] = flash.display.IGraphicsPath;
flash.display.IGraphicsPath.__name__ = ["flash","display","IGraphicsPath"];
flash.display.GraphicsPath = function(commands,data,winding) {
	this.commands = commands;
	this.data = data;
	this.winding = winding;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.PATH;
};
$hxClasses["flash.display.GraphicsPath"] = flash.display.GraphicsPath;
flash.display.GraphicsPath.__name__ = ["flash","display","GraphicsPath"];
flash.display.GraphicsPath.__interfaces__ = [flash.display.IGraphicsPath,flash.display.IGraphicsData];
flash.display.GraphicsPath.prototype = {
	moveTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,1);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,lineTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,2);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,3);
			flash._Vector.Vector_Impl_.push(this.data,anchorX);
			flash._Vector.Vector_Impl_.push(this.data,anchorY);
			flash._Vector.Vector_Impl_.push(this.data,controlX);
			flash._Vector.Vector_Impl_.push(this.data,controlY);
		}
	}
	,__class__: flash.display.GraphicsPath
}
flash.display.GraphicsPathCommand = function() { }
$hxClasses["flash.display.GraphicsPathCommand"] = flash.display.GraphicsPathCommand;
flash.display.GraphicsPathCommand.__name__ = ["flash","display","GraphicsPathCommand"];
flash.display.GraphicsPathWinding = $hxClasses["flash.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] }
flash.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
flash.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
flash.display.GraphicsPathWinding.EVEN_ODD.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
flash.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
flash.display.GraphicsPathWinding.NON_ZERO.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	this.alpha = alpha;
	this.color = color;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.SOLID;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.SOLID_FILL;
};
$hxClasses["flash.display.GraphicsSolidFill"] = flash.display.GraphicsSolidFill;
flash.display.GraphicsSolidFill.__name__ = ["flash","display","GraphicsSolidFill"];
flash.display.GraphicsSolidFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsSolidFill.prototype = {
	__class__: flash.display.GraphicsSolidFill
}
flash.display.IGraphicsStroke = function() { }
$hxClasses["flash.display.IGraphicsStroke"] = flash.display.IGraphicsStroke;
flash.display.IGraphicsStroke.__name__ = ["flash","display","IGraphicsStroke"];
flash.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) miterLimit = 3;
	if(pixelHinting == null) pixelHinting = false;
	if(thickness == null) thickness = 0.0;
	this.caps = caps != null?caps:null;
	this.fill = fill;
	this.joints = joints != null?joints:null;
	this.miterLimit = miterLimit;
	this.pixelHinting = pixelHinting;
	this.scaleMode = scaleMode != null?scaleMode:null;
	this.thickness = thickness;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.STROKE;
};
$hxClasses["flash.display.GraphicsStroke"] = flash.display.GraphicsStroke;
flash.display.GraphicsStroke.__name__ = ["flash","display","GraphicsStroke"];
flash.display.GraphicsStroke.__interfaces__ = [flash.display.IGraphicsStroke,flash.display.IGraphicsData];
flash.display.GraphicsStroke.prototype = {
	__class__: flash.display.GraphicsStroke
}
flash.display.GraphicsDataType = $hxClasses["flash.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
flash.display.GraphicsDataType.STROKE = ["STROKE",0];
flash.display.GraphicsDataType.STROKE.toString = $estr;
flash.display.GraphicsDataType.STROKE.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.SOLID = ["SOLID",1];
flash.display.GraphicsDataType.SOLID.toString = $estr;
flash.display.GraphicsDataType.SOLID.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
flash.display.GraphicsDataType.GRADIENT.toString = $estr;
flash.display.GraphicsDataType.GRADIENT.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.PATH = ["PATH",3];
flash.display.GraphicsDataType.PATH.toString = $estr;
flash.display.GraphicsDataType.PATH.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsFillType = $hxClasses["flash.display.GraphicsFillType"] = { __ename__ : true, __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
flash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
flash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
flash.display.GraphicsFillType.SOLID_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
flash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
flash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.InterpolationMethod = $hxClasses["flash.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] }
flash.display.InterpolationMethod.RGB = ["RGB",0];
flash.display.InterpolationMethod.RGB.toString = $estr;
flash.display.InterpolationMethod.RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
flash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
flash.display.InterpolationMethod.LINEAR_RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.JointStyle = $hxClasses["flash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
flash.display.JointStyle.MITER = ["MITER",0];
flash.display.JointStyle.MITER.toString = $estr;
flash.display.JointStyle.MITER.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.ROUND = ["ROUND",1];
flash.display.JointStyle.ROUND.toString = $estr;
flash.display.JointStyle.ROUND.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.BEVEL = ["BEVEL",2];
flash.display.JointStyle.BEVEL.toString = $estr;
flash.display.JointStyle.BEVEL.__enum__ = flash.display.JointStyle;
flash.display.LineScaleMode = $hxClasses["flash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
flash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
flash.display.LineScaleMode.HORIZONTAL.toString = $estr;
flash.display.LineScaleMode.HORIZONTAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NONE = ["NONE",1];
flash.display.LineScaleMode.NONE.toString = $estr;
flash.display.LineScaleMode.NONE.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NORMAL = ["NORMAL",2];
flash.display.LineScaleMode.NORMAL.toString = $estr;
flash.display.LineScaleMode.NORMAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
flash.display.LineScaleMode.VERTICAL.toString = $estr;
flash.display.LineScaleMode.VERTICAL.__enum__ = flash.display.LineScaleMode;
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	handleLoad: function(e) {
		e.currentTarget = this;
		this.content.nmeInvalidateBounds();
		this.content.nmeRender(null,null);
		this.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.Sprite.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new flash.geom.Rectangle(0,0,this.mImage.get_width(),this.mImage.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this._nmeId + "]";
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event(flash.events.Event.COMPLETE);
				evt.currentTarget = _g;
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
		}
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,__class__: flash.display.Loader
});
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(ldr) {
	var li = new flash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
}
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__class__: flash.display.LoaderInfo
});
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.__currentFrame = 0;
	this.__totalFrames = 0;
	this.loaderInfo = flash.display.LoaderInfo.create(null);
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	get_totalFrames: function() {
		return this.__totalFrames;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stop: function() {
	}
	,prevFrame: function() {
	}
	,play: function() {
	}
	,nextFrame: function() {
	}
	,gotoAndStop: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,gotoAndPlay: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,__class__: flash.display.MovieClip
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_currentFrame:"get_currentFrame",get_framesLoaded:"get_framesLoaded",get_totalFrames:"get_totalFrames"})
});
flash.display.PixelSnapping = $hxClasses["flash.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
flash.display.PixelSnapping.NEVER = ["NEVER",0];
flash.display.PixelSnapping.NEVER.toString = $estr;
flash.display.PixelSnapping.NEVER.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.AUTO = ["AUTO",1];
flash.display.PixelSnapping.AUTO.toString = $estr;
flash.display.PixelSnapping.AUTO.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
flash.display.PixelSnapping.ALWAYS.toString = $estr;
flash.display.PixelSnapping.ALWAYS.__enum__ = flash.display.PixelSnapping;
flash.display.Shape = function() {
	flash.display.DisplayObject.call(this);
	this.nmeGraphics = new flash.display.Graphics();
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	get_graphics: function() {
		return this.nmeGraphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: flash.display.Shape
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
flash.display.SpreadMethod = $hxClasses["flash.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] }
flash.display.SpreadMethod.REPEAT = ["REPEAT",0];
flash.display.SpreadMethod.REPEAT.toString = $estr;
flash.display.SpreadMethod.REPEAT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.REFLECT = ["REFLECT",1];
flash.display.SpreadMethod.REFLECT.toString = $estr;
flash.display.SpreadMethod.REFLECT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.PAD = ["PAD",2];
flash.display.SpreadMethod.PAD.toString = $estr;
flash.display.SpreadMethod.PAD.__enum__ = flash.display.SpreadMethod;
flash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.nmeIsCancelled = false;
	this.nmeIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = flash.events.EventPhase.AT_TARGET;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,stopPropagation: function() {
		this.nmeIsCancelled = true;
	}
	,stopImmediatePropagation: function() {
		this.nmeIsCancelled = true;
		this.nmeIsCancelledNow = true;
	}
	,nmeSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,nmeGetIsCancelledNow: function() {
		return this.nmeIsCancelledNow;
	}
	,nmeGetIsCancelled: function() {
		return this.nmeIsCancelled;
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,__class__: flash.events.Event
}
flash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.nmeCreate = function(type,event,local,target) {
	var nmeMouseDown = false;
	var delta = 2;
	if(type == flash.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == flash.events.MouseEvent.MOUSE_DOWN) nmeMouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == flash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) nmeMouseDown = false; else if(event.button != null) {
				if(event.button == 0) nmeMouseDown = false; else nmeMouseDown = false;
			}
		}
	}
	var pseudoEvent = new flash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,nmeMouseDown,delta);
	pseudoEvent.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.MouseEvent
});
flash.display.Stage = function(width,height) {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeFocusObject = null;
	this.nmeFocusObjectActivated = false;
	this.nmeWindowWidth = width;
	this.nmeWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = flash.display.StageScaleMode.SHOW_ALL;
	this.nmeStageMatrix = new flash.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = flash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.nmeWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.nmeWindowHeight);
	this.nmePointInPathMode = flash.display.Graphics.nmeDetectIsPointInPathMode();
	this.nmeMouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.nmeTouchInfo = [];
	this.nmeUIEventsQueue = new Array(1000);
	this.nmeUIEventsQueueIndex = 0;
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.getOrientation = function() {
	var rotation = window.orientation;
	var orientation = flash.display.Stage.OrientationPortrait;
	switch(rotation) {
	case -90:
		orientation = flash.display.Stage.OrientationLandscapeLeft;
		break;
	case 180:
		orientation = flash.display.Stage.OrientationPortraitUpsideDown;
		break;
	case 90:
		orientation = flash.display.Stage.OrientationLandscapeRight;
		break;
	default:
		orientation = flash.display.Stage.OrientationPortrait;
	}
	return orientation;
}
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	get_stageWidth: function() {
		return this.nmeWindowWidth;
	}
	,get_stageHeight: function() {
		return this.nmeWindowHeight;
	}
	,get_stage: function() {
		return flash.Lib.nmeGetStage();
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.nmeShowDefaultContextMenu && this.nmeShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) flash.Lib.nmeDisableRightClick(); else flash.Lib.nmeEnableRightClick();
		}
		this.nmeShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,get_showDefaultContextMenu: function() {
		return this.nmeShowDefaultContextMenu;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_quality: function() {
		return this.quality != null?this.quality:flash.display.StageQuality.BEST;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,get_fullScreenHeight: function() {
		return js.Browser.window.innerHeight;
	}
	,get_fullScreenWidth: function() {
		return js.Browser.window.innerWidth;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var window = js.Browser.window;
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(nmeRequestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) this.nmeInterval = 1000.0 / speed | 0;
		this.nmeFrameRate = speed;
		this.nmeUpdateNextWake();
		return speed;
	}
	,get_frameRate: function() {
		return this.nmeFrameRate;
	}
	,set_focus: function(inObj) {
		this.nmeOnFocus(inObj);
		return this.nmeFocusObject;
	}
	,get_focus: function() {
		return this.nmeFocusObject;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 0:
				flash.Lib.nmeDisableFullScreen();
				break;
			case 1:
			case 2:
				flash.Lib.nmeEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,get_displayState: function() {
		return this.displayState;
	}
	,set_backgroundColor: function(col) {
		return this.nmeBackgroundColour = col;
	}
	,get_backgroundColor: function() {
		return this.nmeBackgroundColour;
	}
	,nmeOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(touch.pageX - rect.left,touch.pageY - rect.top);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
			obj.nmeFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case "touchBegin":
					$r = flash.events.MouseEvent.MOUSE_DOWN;
					break;
				case "touchEnd":
					$r = flash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.nmeDragObject != null) $this.nmeDrag(point);
						$r = flash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.nmeFireEvent(flash.events.MouseEvent.nmeCreate(mouseType,evt,local,obj));
		} else {
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
		}
	}
	,nmeOnResize: function(inW,inH) {
		this.nmeWindowWidth = inW;
		this.nmeWindowHeight = inH;
		var event = new flash.events.Event(flash.events.Event.RESIZE);
		event.target = this;
		this.nmeBroadcast(event);
	}
	,nmeOnMouse: function(event,type) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(event.clientX - rect.left,event.clientY - rect.top);
		if(this.nmeDragObject != null) this.nmeDrag(point);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.MouseEvent.nmeCreate(type,event,local,obj);
			this.nmeCheckInOuts(evt,stack);
			if(type == flash.events.MouseEvent.MOUSE_DOWN) this.nmeOnFocus(stack[stack.length - 1]);
			obj.nmeFireEvent(evt);
		} else {
			var evt = flash.events.MouseEvent.nmeCreate(type,event,point,null);
			this.nmeCheckInOuts(evt,stack);
		}
	}
	,nmeOnFocus: function(target) {
		if(target != this.nmeFocusObject) {
			if(this.nmeFocusObject != null) this.nmeFocusObject.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT,true,false,this.nmeFocusObject,false,0));
			target.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN,true,false,target,false,0));
			this.nmeFocusObject = target;
		}
	}
	,nmeOnKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var stack = new Array();
		if(this.nmeFocusObject == null) this.nmeGetInteractiveObjectStack(stack); else this.nmeFocusObject.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			var obj = stack[0];
			var evt = new flash.events.KeyboardEvent(pressed?flash.events.KeyboardEvent.KEY_DOWN:flash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
			obj.nmeFireEvent(evt);
		}
	}
	,nmeHandleOrientationChange: function() {
	}
	,nmeHandleAccelerometer: function(evt) {
		flash.display.Stage.nmeAcceleration.x = evt.accelerationIncludingGravity.x;
		flash.display.Stage.nmeAcceleration.y = evt.accelerationIncludingGravity.y;
		flash.display.Stage.nmeAcceleration.z = evt.accelerationIncludingGravity.z;
	}
	,toString: function() {
		return "[Stage id=" + this._nmeId + "]";
	}
	,nmeUpdateNextWake: function() {
		if(this.nmeFrameRate == 0) {
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			nmeRequestAnimationFrame($bind(this,this.nmeUpdateNextWake));
			this.nmeStageRender();
		} else {
			js.Browser.window.clearInterval(this.nmeTimer);
			this.nmeTimer = js.Browser.window.setInterval($bind(this,this.nmeStageRender),this.nmeInterval);
		}
	}
	,nmeStopDrag: function(sprite) {
		this.nmeDragBounds = null;
		this.nmeDragObject = null;
	}
	,nmeStartDrag: function(sprite,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		this.nmeDragBounds = bounds == null?null:bounds.clone();
		this.nmeDragObject = sprite;
		if(this.nmeDragObject != null) {
			var mouse = new flash.geom.Point(this._mouseX,this._mouseY);
			var p = this.nmeDragObject.parent;
			if(p != null) mouse = p.globalToLocal(mouse);
			if(lockCenter) {
				var bounds1 = sprite.getBounds(this);
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - (bounds1.width / 2 + bounds1.x);
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - (bounds1.height / 2 + bounds1.y);
			} else {
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - mouse.x;
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - mouse.y;
			}
		}
	}
	,nmeStageRender: function(_) {
		if(!this.nmeStageActive) {
			this.nmeOnResize(this.nmeWindowWidth,this.nmeWindowHeight);
			var event = new flash.events.Event(flash.events.Event.ACTIVATE);
			event.target = this;
			this.nmeBroadcast(event);
			this.nmeStageActive = true;
		}
		var _g1 = 0, _g = this.nmeUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeUIEventsQueue[i] != null) this.nmeProcessStageEvent(this.nmeUIEventsQueue[i]);
		}
		this.nmeUIEventsQueueIndex = 0;
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		this.nmeBroadcast(event);
		if(this.nmeInvalid) {
			var event1 = new flash.events.Event(flash.events.Event.RENDER);
			this.nmeBroadcast(event1);
		}
		this.nmeRenderAll();
	}
	,nmeRenderToCanvas: function(canvas) {
		canvas.width = canvas.width;
		this.nmeRender(canvas);
	}
	,nmeRenderAll: function() {
		this.nmeRender(null,null);
	}
	,nmeQueueStageEvent: function(evt) {
		this.nmeUIEventsQueue[this.nmeUIEventsQueueIndex++] = evt;
	}
	,nmeProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.nmeOnResize(flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
			break;
		case "focus":
			this.nmeOnFocus(this);
			if(!this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = true;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.ACTIVATE));
			}
			break;
		case "blur":
			if(this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = false;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.DEACTIVATE));
			}
			break;
		case "mousemove":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.nmeOnMouse(evt,flash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.nmeOnMouse(evt,flash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new flash.display._Stage.TouchInfo();
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.nmeHandleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.nmeHandleOrientationChange();
			break;
		default:
		}
	}
	,nmeIsOnStage: function() {
		return true;
	}
	,nmeDrag: function(point) {
		var p = this.nmeDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.nmeDragOffsetX;
		var y = point.y + this.nmeDragOffsetY;
		if(this.nmeDragBounds != null) {
			if(x < this.nmeDragBounds.x) x = this.nmeDragBounds.x; else if(x > this.nmeDragBounds.get_right()) x = this.nmeDragBounds.get_right();
			if(y < this.nmeDragBounds.y) y = this.nmeDragBounds.y; else if(y > this.nmeDragBounds.get_bottom()) y = this.nmeDragBounds.get_bottom();
		}
		this.nmeDragObject.set_x(x);
		this.nmeDragObject.set_y(y);
	}
	,nmeCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.nmeMouseOverObjects:touchInfo.touchOverObjects;
		var changeEvents = touchInfo == null?flash.display.Stage.nmeMouseChanges:flash.display.Stage.nmeTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.nmeCreateSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.nmeCreateSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.nmeMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,invalidate: function() {
		this.nmeInvalid = true;
	}
	,__class__: flash.display.Stage
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_displayState:"set_displayState",get_displayState:"get_displayState",set_focus:"set_focus",get_focus:"get_focus",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",get_fullScreenHeight:"get_fullScreenHeight",get_fullScreenWidth:"get_fullScreenWidth",set_quality:"set_quality",get_quality:"get_quality",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",get_stageHeight:"get_stageHeight",get_stageWidth:"get_stageWidth"})
});
flash.display._Stage = {}
flash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["flash.display._Stage.TouchInfo"] = flash.display._Stage.TouchInfo;
flash.display._Stage.TouchInfo.__name__ = ["flash","display","_Stage","TouchInfo"];
flash.display._Stage.TouchInfo.prototype = {
	__class__: flash.display._Stage.TouchInfo
}
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] }
flash.display.StageDisplayState.NORMAL = ["NORMAL",0];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageQuality = function() { }
$hxClasses["flash.display.StageQuality"] = flash.display.StageQuality;
flash.display.StageQuality.__name__ = ["flash","display","StageQuality"];
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.errors = {}
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,__class__: flash.errors.Error
}
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text) {
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = flash.events.Listener.sIDs++;
};
$hxClasses["flash.events.Listener"] = flash.events.Listener;
flash.events.Listener.__name__ = ["flash","events","Listener"];
flash.events.Listener.prototype = {
	Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: flash.events.Listener
}
flash.events.EventPhase = function() { }
$hxClasses["flash.events.EventPhase"] = flash.events.EventPhase;
flash.events.EventPhase.__name__ = ["flash","events","EventPhase"];
flash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["flash.events.FocusEvent"] = flash.events.FocusEvent;
flash.events.FocusEvent.__name__ = ["flash","events","FocusEvent"];
flash.events.FocusEvent.__super__ = flash.events.Event;
flash.events.FocusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.FocusEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.IOErrorEvent
});
flash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.altKey = inAltKey == null?false:inAltKey;
	this.charCode = inCharCode == null?0:inCharCode;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
	this.commandKey = commandKeyValue;
	this.controlKey = controlKeyValue;
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
};
$hxClasses["flash.events.KeyboardEvent"] = flash.events.KeyboardEvent;
flash.events.KeyboardEvent.__name__ = ["flash","events","KeyboardEvent"];
flash.events.KeyboardEvent.__super__ = flash.events.Event;
flash.events.KeyboardEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.KeyboardEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["flash.events.TouchEvent"] = flash.events.TouchEvent;
flash.events.TouchEvent.__name__ = ["flash","events","TouchEvent"];
flash.events.TouchEvent.nmeCreate = function(type,event,touch,local,target) {
	var evt = new flash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
flash.events.TouchEvent.__super__ = flash.events.Event;
flash.events.TouchEvent.prototype = $extend(flash.events.Event.prototype,{
	nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.TouchEvent
});
flash.filters = {}
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,nmePreFilter: function(surface) {
	}
	,clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,__class__: flash.filters.BitmapFilter
}
flash.filters.BlurFilter = function(inBlurX,inBlurY,inQuality) {
	if(inQuality == null) inQuality = 1;
	if(inBlurY == null) inBlurY = 4;
	if(inBlurX == null) inBlurX = 4;
	flash.filters.BitmapFilter.call(this,"BlurFilter");
	this.blurX = inBlurX == null?4.0:inBlurX;
	this.blurY = inBlurY == null?4.0:inBlurY;
	this.MAX_BLUR_WIDTH = flash.Lib.get_current().get_stage().get_stageWidth();
	this.MAX_BLUR_HEIGHT = flash.Lib.get_current().get_stage().get_stageHeight();
	this.quality = inQuality == null?1:inQuality;
	var bgColor = flash.Lib.get_current().get_stage().get_backgroundColor();
	this.nmeBG = [(bgColor & 16711680) >>> 16,(bgColor & 65280) >>> 8,bgColor & 255];
};
$hxClasses["flash.filters.BlurFilter"] = flash.filters.BlurFilter;
flash.filters.BlurFilter.__name__ = ["flash","filters","BlurFilter"];
flash.filters.BlurFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.BlurFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(surface.width > 0 && surface.height > 0) {
			if(this.nmeKernel == null) this.nmePreFilter(surface);
			var ctx = surface.getContext("2d");
			var width = surface.width > this.MAX_BLUR_WIDTH?this.MAX_BLUR_WIDTH:surface.width;
			var height = surface.height > this.MAX_BLUR_HEIGHT?this.MAX_BLUR_HEIGHT:surface.height;
			var nmeImageData = ctx.getImageData(0,0,width,height);
			this.nmeBoxBlur(nmeImageData.data,Math.floor(nmeImageData.width),Math.floor(nmeImageData.height),this.nmeKernel,Math.floor(this.blurX),Math.floor(this.blurY));
			ctx.putImageData(nmeImageData,0,0);
		}
	}
	,nmeBoxBlur: function(dst,srcW,srcH,p,boxW,boxH) {
		var mul1 = 1.0 / ((boxW * 2 + 1) * (boxH * 2 + 1)), i = 0, tot = [], h1 = 0, l1 = 0, h2 = 0, l2 = 0;
		var mul2 = 1.7 / ((boxW * 2 + 1) * (boxH * 2 + 1));
		var _g = 0;
		while(_g < srcH) {
			var y = _g++;
			var _g1 = 0;
			while(_g1 < srcW) {
				var x = _g1++;
				h1 = x + boxW >= srcW?srcW - 1:x + boxW;
				l1 = y + boxH >= srcH?srcH - 1:y + boxH;
				h2 = x - boxW < 0?0:x - boxW;
				l2 = y - boxH < 0?0:y - boxH;
				tot[0] = p[(h1 + l1 * srcW) * 4] + p[(h2 + l2 * srcW) * 4] - p[(h2 + l1 * srcW) * 4] - p[(h1 + l2 * srcW) * 4];
				tot[1] = p[(h1 + l1 * srcW) * 4 + 1] + p[(h2 + l2 * srcW) * 4 + 1] - p[(h2 + l1 * srcW) * 4 + 1] - p[(h1 + l2 * srcW) * 4 + 1];
				tot[2] = p[(h1 + l1 * srcW) * 4 + 2] + p[(h2 + l2 * srcW) * 4 + 2] - p[(h2 + l1 * srcW) * 4 + 2] - p[(h1 + l2 * srcW) * 4 + 2];
				tot[3] = p[(h1 + l1 * srcW) * 4 + 3] + p[(h2 + l2 * srcW) * 4 + 3] - p[(h2 + l1 * srcW) * 4 + 3] - p[(h1 + l2 * srcW) * 4 + 3];
				dst[i] = Math.floor(Math.abs(255 - this.nmeBG[0] - tot[0] * mul1));
				dst[i + 1] = Math.floor(Math.abs(255 - this.nmeBG[1] - tot[1] * mul1));
				dst[i + 2] = Math.floor(Math.abs(255 - this.nmeBG[2] - tot[2] * mul1));
				dst[i + 3] = Math.floor(tot[3] * mul2);
				i += 4;
			}
		}
	}
	,nmeBuildKernel: function(src,srcW,srcH,dst) {
		var i = 0, j = 0, tot = [], maxW = srcW * 4;
		var _g = 0;
		while(_g < srcH) {
			var y = _g++;
			var _g1 = 0;
			while(_g1 < srcW) {
				var x = _g1++;
				tot[0] = src[j];
				tot[1] = src[j + 1];
				tot[2] = src[j + 2];
				tot[3] = src[j + 3];
				if(x > 0) {
					tot[0] += dst[i - 4];
					tot[1] += dst[i - 3];
					tot[2] += dst[i - 2];
					tot[3] += dst[i - 1];
				}
				if(y > 0) {
					tot[0] += dst[i - maxW];
					tot[1] += dst[i + 1 - maxW];
					tot[2] += dst[i + 2 - maxW];
					tot[3] += dst[i + 3 - maxW];
				}
				if(x > 0 && y > 0) {
					tot[0] -= dst[i - maxW - 4];
					tot[1] -= dst[i - maxW - 3];
					tot[2] -= dst[i - maxW - 2];
					tot[3] -= dst[i - maxW - 1];
				}
				dst[i] = tot[0];
				dst[i + 1] = tot[1];
				dst[i + 2] = tot[2];
				dst[i + 3] = tot[3];
				i += 4;
				j += 4;
			}
		}
	}
	,nmePreFilter: function(surface) {
		var ctx = surface.getContext("2d");
		this.nmeKernel = flash._Vector.Vector_Impl_._new();
		if(surface.width == 0 || surface.height == 0) return;
		var width = surface.width > this.MAX_BLUR_WIDTH?this.MAX_BLUR_WIDTH:surface.width;
		var height = surface.height > this.MAX_BLUR_HEIGHT?this.MAX_BLUR_HEIGHT:surface.height;
		this.nmeBuildKernel(ctx.getImageData(0,0,width,height).data,width,height,this.nmeKernel);
	}
	,clone: function() {
		return new flash.filters.BlurFilter(this.blurX,this.blurY,this.quality);
	}
	,applyFilter: function(inBitmapData,inRect,inPoint,inBitmapFilter) {
	}
	,__class__: flash.filters.BlurFilter
});
flash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	flash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this._nmeCached = false;
};
$hxClasses["flash.filters.DropShadowFilter"] = flash.filters.DropShadowFilter;
flash.filters.DropShadowFilter.__name__ = ["flash","filters","DropShadowFilter"];
flash.filters.DropShadowFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.DropShadowFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this._nmeCached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "rgba(" + (this.color >> 16 & 255) + "," + (this.color >> 8 & 255) + "," + (this.color & 255) + "," + this.alpha + ")";
			this._nmeCached = true;
		}
	}
	,clone: function() {
		return new flash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: flash.filters.DropShadowFilter
});
flash.geom = {}
flash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,__class__: flash.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
flash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new flash.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,transformPoint: function(inPos) {
		return new flash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,to3DString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", " + "0, 1" + ")";
	}
	,setRotation: function(inTheta,inScale) {
		if(inScale == null) inScale = 1;
		var scale = inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTranslateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTransformY: function(inPos) {
		return inPos.x * this.b + inPos.y * this.d + this.ty;
	}
	,nmeTransformX: function(inPos) {
		return inPos.x * this.a + inPos.y * this.c + this.tx;
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		if(in_ty == null) in_ty = 0;
		if(in_tx == null) in_tx = 0;
		if(rotation == null) rotation = 0;
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.set_tx(in_tx != null?in_tx + in_width / 2:in_width / 2);
		this.set_ty(in_ty != null?in_ty + in_height / 2:in_height / 2);
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,__class__: flash.geom.Matrix
	,__properties__: {set_tx:"set_tx",set_ty:"set_ty"}
}
flash.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
flash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new flash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
flash.geom.Point.polar = function(len,angle) {
	return new flash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
flash.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,subtract: function(v) {
		return new flash.geom.Point(this.x - v.x,this.y - v.y);
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,add: function(v) {
		return new flash.geom.Point(v.x + this.x,v.y + this.y);
	}
	,__class__: flash.geom.Point
	,__properties__: {get_length:"get_length"}
}
flash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new flash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new flash.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new flash.geom.Rectangle();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,__class__: flash.geom.Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_left:"set_left",get_left:"get_left",set_right:"set_right",get_right:"get_right",set_size:"set_size",get_size:"get_size",set_top:"set_top",get_top:"get_top",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft"}
}
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.nmeMatrixOverridden();
		return this._matrix;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,get_concatenatedMatrix: function() {
		return this.nmeGetFullMatrix(this._matrix);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,nmeSetMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,__class__: flash.geom.Transform
	,__properties__: {set_colorTransform:"set_colorTransform",get_concatenatedMatrix:"get_concatenatedMatrix",set_matrix:"set_matrix",get_matrix:"get_matrix",get_pixelBounds:"get_pixelBounds"}
}
flash.media = {}
flash.media.Sound = function(stream,context) {
	flash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.nmeSoundChannels = new haxe.ds.IntMap();
	this.nmeSoundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.nmeCanPlayMime = function(mime) {
	var audio = js.Browser.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	return playable(audio.canPlayType(mime,null));
}
flash.media.Sound.nmeCanPlayType = function(extension) {
	var mime = flash.media.Sound.nmeMimeForExtension(extension);
	if(mime == null) return false;
	return flash.media.Sound.nmeCanPlayMime(mime);
}
flash.media.Sound.nmeMimeForExtension = function(extension) {
	var mime = null;
	switch(extension) {
	case "mp3":
		mime = "audio/mpeg";
		break;
	case "ogg":
		mime = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime = null;
	}
	return mime;
}
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeOnSoundLoaded: function(evt) {
		this.nmeRemoveEventListeners();
		var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
		this.dispatchEvent(evt1);
	}
	,nmeOnSoundLoadError: function(evt) {
		this.nmeRemoveEventListeners();
		var evt1 = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		this.dispatchEvent(evt1);
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(this.nmeStreamUrl == null) return null;
		var self = this;
		var curIdx = this.nmeSoundIdx;
		var removeRef = function() {
			self.nmeSoundChannels.remove(curIdx);
		};
		var channel = flash.media.SoundChannel.nmeCreate(this.nmeStreamUrl,startTime,loops,sndTransform,removeRef);
		this.nmeSoundChannels.set(curIdx,channel);
		this.nmeSoundIdx++;
		var audio = channel.nmeAudio;
		return channel;
	}
	,nmeRemoveEventListeners: function() {
		this.nmeSoundCache.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded),false);
		this.nmeSoundCache.removeEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError),false);
	}
	,nmeLoad: function(stream,context,mime) {
		if(mime == null) mime = "";
		this.nmeStreamUrl = stream.url;
		try {
			this.nmeSoundCache = new flash.net.URLLoader();
			this.nmeAddEventListeners();
			this.nmeSoundCache.load(stream);
		} catch( e ) {
		}
	}
	,nmeAddEventListeners: function() {
		this.nmeSoundCache.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded));
		this.nmeSoundCache.addEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError));
	}
	,load: function(stream,context) {
		this.nmeLoad(stream,context);
	}
	,close: function() {
	}
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	flash.events.EventDispatcher.call(this,this);
	this.ChannelId = -1;
	this.leftPeak = 0.;
	this.position = 0.;
	this.rightPeak = 0.;
	this.nmeAudioCurrentLoop = 1;
	this.nmeAudioTotalLoops = 1;
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.nmeCreate = function(src,startTime,loops,sndTransform,removeRef) {
	if(loops == null) loops = 0;
	if(startTime == null) startTime = 0.0;
	var channel = new flash.media.SoundChannel();
	channel.nmeAudio = js.Browser.document.createElement("audio");
	channel.nmeRemoveRef = removeRef;
	channel.nmeAudio.addEventListener("ended",$bind(channel,channel.__onSoundChannelFinished),false);
	channel.nmeAudio.addEventListener("seeked",$bind(channel,channel.__onSoundSeeked),false);
	channel.nmeAudio.addEventListener("stalled",$bind(channel,channel.__onStalled),false);
	channel.nmeAudio.addEventListener("progress",$bind(channel,channel.__onProgress),false);
	if(loops > 0) {
		channel.nmeAudioTotalLoops = loops;
		channel.nmeAudio.loop = true;
	}
	channel.nmeStartTime = startTime;
	if(startTime > 0.) {
		var onLoad = null;
		onLoad = function(_) {
			channel.nmeAudio.currentTime = channel.nmeStartTime;
			channel.nmeAudio.play();
			channel.nmeAudio.removeEventListener("canplaythrough",onLoad,false);
		};
		channel.nmeAudio.addEventListener("canplaythrough",onLoad,false);
	} else channel.nmeAudio.autoplay = true;
	channel.nmeAudio.src = src;
	return channel;
}
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_soundTransform: function(v) {
		this.nmeAudio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__onStalled: function(evt) {
		if(this.nmeAudio != null) this.nmeAudio.load();
	}
	,__onSoundSeeked: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.loop = false;
			this.stop();
		} else this.nmeAudioCurrentLoop++;
	}
	,__onSoundChannelFinished: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.removeEventListener("ended",$bind(this,this.__onSoundChannelFinished),false);
			this.nmeAudio.removeEventListener("seeked",$bind(this,this.__onSoundSeeked),false);
			this.nmeAudio.removeEventListener("stalled",$bind(this,this.__onStalled),false);
			this.nmeAudio.removeEventListener("progress",$bind(this,this.__onProgress),false);
			this.nmeAudio = null;
			var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
			evt1.target = this;
			this.dispatchEvent(evt1);
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		} else {
			this.nmeAudio.currentTime = this.nmeStartTime;
			this.nmeAudio.play();
		}
	}
	,__onProgress: function(evt) {
	}
	,stop: function() {
		if(this.nmeAudio != null) {
			this.nmeAudio.pause();
			this.nmeAudio = null;
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		}
	}
	,__class__: flash.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	__class__: flash.media.SoundLoaderContext
}
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	__class__: flash.media.SoundTransform
}
flash.net = {}
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	onStatus: function(status) {
		var evt = new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new flash.events.Event(flash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			this.data = flash.utils.ByteArray.nmeOfBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new flash.events.Event(flash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			var _g = this;
			switch( (_g.dataFormat)[1] ) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g1 = 0;
		while(_g1 < requestHeaders.length) {
			var header = requestHeaders[_g1];
			++_g1;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,getData: function() {
		return null;
	}
	,close: function() {
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == flash.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(js.Browser.window,"ArrayBuffer")) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: flash.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = flash.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == flash.net.URLRequestMethod.GET || this.data == null) return res;
		if(js.Boot.__instanceof(this.data,String) || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) {
			res = res.slice();
			res.push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: flash.net.URLRequest
}
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	__class__: flash.net.URLRequestHeader
}
flash.net.URLRequestMethod = function() { }
$hxClasses["flash.net.URLRequestMethod"] = flash.net.URLRequestMethod;
flash.net.URLRequestMethod.__name__ = ["flash","net","URLRequestMethod"];
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(StringTools.urlEncode(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: flash.net.URLVariables
}
flash.system = {}
flash.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.ApplicationDomain"] = flash.system.ApplicationDomain;
flash.system.ApplicationDomain.__name__ = ["flash","system","ApplicationDomain"];
flash.system.ApplicationDomain.prototype = {
	hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,__class__: flash.system.ApplicationDomain
}
flash.system.Capabilities = function() { }
$hxClasses["flash.system.Capabilities"] = flash.system.Capabilities;
flash.system.Capabilities.__name__ = ["flash","system","Capabilities"];
flash.system.Capabilities.__properties__ = {get_language:"get_language",get_screenResolutionY:"get_screenResolutionY",get_screenResolutionX:"get_screenResolutionX",get_screenDPI:"get_screenDPI",get_pixelAspectRatio:"get_pixelAspectRatio"}
flash.system.Capabilities.get_pixelAspectRatio = function() {
	return 1;
}
flash.system.Capabilities.get_screenDPI = function() {
	if(flash.system.Capabilities.screenDPI > 0) return flash.system.Capabilities.screenDPI;
	var body = js.Browser.document.getElementsByTagName("body")[0];
	var testDiv = js.Browser.document.createElement("div");
	testDiv.style.width = testDiv.style.height = "1in";
	testDiv.style.padding = testDiv.style.margin = "0px";
	testDiv.style.position = "absolute";
	testDiv.style.top = "-100%";
	body.appendChild(testDiv);
	flash.system.Capabilities.screenDPI = testDiv.offsetWidth;
	body.removeChild(testDiv);
	return flash.system.Capabilities.screenDPI;
}
flash.system.Capabilities.get_screenResolutionX = function() {
	return js.Browser.window.screen.width;
}
flash.system.Capabilities.get_screenResolutionY = function() {
	return js.Browser.window.screen.height;
}
flash.system.Capabilities.get_language = function() {
	return navigator.language;
}
flash.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.LoaderContext"] = flash.system.LoaderContext;
flash.system.LoaderContext.__name__ = ["flash","system","LoaderContext"];
flash.system.LoaderContext.prototype = {
	__class__: flash.system.LoaderContext
}
flash.system.SecurityDomain = function() {
};
$hxClasses["flash.system.SecurityDomain"] = flash.system.SecurityDomain;
flash.system.SecurityDomain.__name__ = ["flash","system","SecurityDomain"];
flash.system.SecurityDomain.prototype = {
	__class__: flash.system.SecurityDomain
}
flash.text = {}
flash.text.Font = function() {
	this.nmeMetrics = [];
	this.nmeFontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(flash.text.Font.nmeFontData == null) {
		flash.text.Font.nmeFontData = [];
		flash.text.Font.nmeFontData["Bitstream_Vera_Sans"] = haxe.Unserializer.run(flash.text.Font.DEFAULT_FONT_DATA);
	}
	if(className == "flash.text.Font") this.set_fontName("Bitstream_Vera_Sans"); else this.set_fontName(className.split(".").pop());
};
$hxClasses["flash.text.Font"] = flash.text.Font;
flash.text.Font.__name__ = ["flash","text","Font"];
flash.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return flash.text.Font.nmeRegisteredFonts.slice();
}
flash.text.Font.nmeOfResource = function(resourceName,fontName) {
	if(fontName == null) fontName = "";
	var data = haxe.Unserializer.run(haxe.Resource.getString(resourceName));
	if(data == null) {
	} else {
		if(fontName == "") {
			flash.text.Font.nmeFontData[resourceName] = data.hash;
			fontName = data.fontName;
		}
		flash.text.Font.nmeFontData[data.fontName] = data.hash;
	}
	return fontName;
}
flash.text.Font.registerFont = function(font) {
	var instance = js.Boot.__cast(Type.createInstance(font,[]) , flash.text.Font);
	if(instance != null) {
		if(Reflect.hasField(font,"resourceName")) instance.set_fontName(flash.text.Font.nmeOfResource(Reflect.field(font,"resourceName")));
		flash.text.Font.nmeRegisteredFonts.push(instance);
	}
}
flash.text.Font.prototype = {
	set_fontName: function(name) {
		if(name == "_sans" || name == "_serif" || name == "_typewriter") name = "Bitstream_Vera_Sans";
		this.fontName = name;
		if(flash.text.Font.nmeFontData[this.fontName] == null) try {
			flash.text.Font.nmeOfResource(name);
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		if(flash.text.Font.nmeFontData[this.fontName] != null) try {
			this.nmeGlyphData = flash.text.Font.nmeFontData[this.fontName];
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		return name;
	}
	,nmeSetScale: function(scale) {
		this.nmeFontScale = scale / 1024;
	}
	,nmeRender: function(graphics,inChar,inX,inY,inOutline) {
		var index = 0;
		var glyph = this.nmeGlyphData.get(inChar);
		if(glyph == null) return;
		var commands = glyph.commands;
		var data = glyph.data;
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c) {
			case 1:
				graphics.moveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 2:
				graphics.lineTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 3:
				graphics.curveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale,inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			}
		}
	}
	,nmeGetAdvance: function(inGlyph,height) {
		var m = this.nmeMetrics[inGlyph];
		if(m == null) {
			var glyph = this.nmeGlyphData.get(inGlyph);
			if(glyph == null) return 0;
			this.nmeMetrics[inGlyph] = m = glyph._width * this.nmeFontScale | 0;
		}
		if(m == null) return 0;
		return m;
	}
	,hasGlyph: function(str) {
		return this.nmeGlyphData.exists(HxOverrides.cca(str,0));
	}
	,__class__: flash.text.Font
	,__properties__: {set_fontName:"set_fontName"}
}
flash.text.FontStyle = $hxClasses["flash.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] }
flash.text.FontStyle.REGULAR = ["REGULAR",0];
flash.text.FontStyle.REGULAR.toString = $estr;
flash.text.FontStyle.REGULAR.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.ITALIC = ["ITALIC",1];
flash.text.FontStyle.ITALIC.toString = $estr;
flash.text.FontStyle.ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
flash.text.FontStyle.BOLD_ITALIC.toString = $estr;
flash.text.FontStyle.BOLD_ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD = ["BOLD",3];
flash.text.FontStyle.BOLD.toString = $estr;
flash.text.FontStyle.BOLD.__enum__ = flash.text.FontStyle;
flash.text.FontType = $hxClasses["flash.text.FontType"] = { __ename__ : true, __constructs__ : ["EMBEDDED","DEVICE"] }
flash.text.FontType.EMBEDDED = ["EMBEDDED",0];
flash.text.FontType.EMBEDDED.toString = $estr;
flash.text.FontType.EMBEDDED.__enum__ = flash.text.FontType;
flash.text.FontType.DEVICE = ["DEVICE",1];
flash.text.FontType.DEVICE.toString = $estr;
flash.text.FontType.DEVICE.__enum__ = flash.text.FontType;
flash.text.GridFitType = $hxClasses["flash.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] }
flash.text.GridFitType.NONE = ["NONE",0];
flash.text.GridFitType.NONE.toString = $estr;
flash.text.GridFitType.NONE.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.PIXEL = ["PIXEL",1];
flash.text.GridFitType.PIXEL.toString = $estr;
flash.text.GridFitType.PIXEL.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.SUBPIXEL = ["SUBPIXEL",2];
flash.text.GridFitType.SUBPIXEL.toString = $estr;
flash.text.GridFitType.SUBPIXEL.__enum__ = flash.text.GridFitType;
flash.text.TextField = function() {
	flash.display.InteractiveObject.call(this);
	this.mWidth = 100;
	this.mHeight = 20;
	this.mHTMLMode = false;
	this.multiline = false;
	this.nmeGraphics = new flash.display.Graphics();
	this.mFace = flash.text.TextField.mDefaultFont;
	this.mAlign = flash.text.TextFormatAlign.LEFT;
	this.mParagraphs = new Array();
	this.mSelStart = -1;
	this.mSelEnd = -1;
	this.scrollH = 0;
	this.scrollV = 1;
	this.mType = flash.text.TextFieldType.DYNAMIC;
	this.set_autoSize("NONE");
	this.mTextHeight = 12;
	this.mMaxHeight = this.mTextHeight;
	this.mHTMLText = " ";
	this.mText = " ";
	this.mTextColour = 0;
	this.tabEnabled = false;
	this.mTryFreeType = true;
	this.selectable = true;
	this.mInsertPos = 0;
	this.nmeInputEnabled = false;
	this.mDownChar = 0;
	this.mSelectDrag = -1;
	this.mLineInfo = [];
	this.set_defaultTextFormat(new flash.text.TextFormat());
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = flash.text.GridFitType.PIXEL;
	this.sharpness = 0;
};
$hxClasses["flash.text.TextField"] = flash.text.TextField;
flash.text.TextField.__name__ = ["flash","text","TextField"];
flash.text.TextField.__super__ = flash.display.InteractiveObject;
flash.text.TextField.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_wordWrap: function(inWordWrap) {
		this.wordWrap = inWordWrap;
		this.Rebuild();
		return this.get_wordWrap();
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_width: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mWidth) {
			this.mWidth = inValue;
			this.Rebuild();
		}
		return this.mWidth;
	}
	,get_width: function() {
		return Math.max(this.mWidth,this.getBounds(this.get_stage()).width);
	}
	,set_type: function(inType) {
		this.mType = inType;
		this.nmeInputEnabled = this.mType == flash.text.TextFieldType.INPUT;
		if(this.mHTMLMode) {
			if(this.nmeInputEnabled) flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true); else flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,false);
		} else if(this.nmeInputEnabled) {
			this.set_htmlText(StringTools.replace(this.mText,"\n","<BR />"));
			flash.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true);
		}
		this.tabEnabled = this.get_type() == flash.text.TextFieldType.INPUT;
		this.Rebuild();
		return inType;
	}
	,get_type: function() {
		return this.mType;
	}
	,get_textHeight: function() {
		return this.mMaxHeight;
	}
	,get_textWidth: function() {
		return this.mMaxWidth;
	}
	,set_textColor: function(inCol) {
		this.mTextColour = inCol;
		this.RebuildText();
		return inCol;
	}
	,get_textColor: function() {
		return this.mTextColour;
	}
	,set_text: function(inText) {
		this.mText = Std.string(inText);
		this.mHTMLMode = false;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mText;
	}
	,get_text: function() {
		if(this.mHTMLMode) this.ConvertHTMLToText(false);
		return this.mText;
	}
	,set_scrollV: function(value) {
		return this.scrollV = value;
	}
	,get_scrollV: function() {
		return this.scrollV;
	}
	,set_scrollH: function(value) {
		return this.scrollH = value;
	}
	,get_scrollH: function() {
		return this.scrollH;
	}
	,get_numLines: function() {
		return 0;
	}
	,set_multiline: function(value) {
		return this.multiline = value;
	}
	,get_multiline: function() {
		return this.multiline;
	}
	,get_maxScrollV: function() {
		return 0;
	}
	,get_maxScrollH: function() {
		return 0;
	}
	,set_htmlText: function(inHTMLText) {
		this.mParagraphs = new Array();
		this.mHTMLText = inHTMLText;
		if(!this.mHTMLMode) {
			var domElement = js.Browser.document.createElement("div");
			if(this.background || this.border) {
				domElement.style.width = this.mWidth + "px";
				domElement.style.height = this.mHeight + "px";
			}
			if(this.background) domElement.style.backgroundColor = "#" + StringTools.hex(this.backgroundColor,6);
			if(this.border) domElement.style.border = "1px solid #" + StringTools.hex(this.borderColor,6);
			domElement.style.color = "#" + StringTools.hex(this.mTextColour,6);
			domElement.style.fontFamily = this.mFace;
			domElement.style.fontSize = this.mTextHeight + "px";
			domElement.style.textAlign = Std.string(this.mAlign);
			var wrapper = domElement;
			wrapper.innerHTML = inHTMLText;
			var destination = new flash.display.Graphics(wrapper);
			var nmeSurface = this.nmeGraphics.nmeSurface;
			if(flash.Lib.nmeIsOnStage(nmeSurface)) {
				flash.Lib.nmeAppendSurface(wrapper);
				flash.Lib.nmeCopyStyle(nmeSurface,wrapper);
				flash.Lib.nmeSwapSurface(nmeSurface,wrapper);
				flash.Lib.nmeRemoveSurface(nmeSurface);
			}
			this.nmeGraphics = destination;
			this.nmeGraphics.nmeExtent.width = wrapper.width;
			this.nmeGraphics.nmeExtent.height = wrapper.height;
		} else this.nmeGraphics.nmeSurface.innerHTML = inHTMLText;
		this.mHTMLMode = true;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mHTMLText;
	}
	,get_htmlText: function() {
		return this.mHTMLText;
	}
	,set_height: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mHeight) {
			this.mHeight = inValue;
			this.Rebuild();
		}
		return this.mHeight;
	}
	,get_height: function() {
		return Math.max(this.mHeight,this.getBounds(this.get_stage()).height);
	}
	,set_defaultTextFormat: function(inFmt) {
		this.setTextFormat(inFmt);
		this._defaultTextFormat = inFmt;
		return inFmt;
	}
	,get_defaultTextFormat: function() {
		return this._defaultTextFormat;
	}
	,get_caretPos: function() {
		return this.mInsertPos;
	}
	,get_bottomScrollV: function() {
		return 0;
	}
	,set_borderColor: function(inBorderCol) {
		this.borderColor = inBorderCol;
		this.Rebuild();
		return inBorderCol;
	}
	,set_border: function(inBorder) {
		this.border = inBorder;
		this.Rebuild();
		return inBorder;
	}
	,set_backgroundColor: function(inCol) {
		this.backgroundColor = inCol;
		this.Rebuild();
		return inCol;
	}
	,set_background: function(inBack) {
		this.background = inBack;
		this.Rebuild();
		return inBack;
	}
	,set_autoSize: function(inAutoSize) {
		this.autoSize = inAutoSize;
		this.Rebuild();
		return inAutoSize;
	}
	,get_autoSize: function() {
		return this.autoSize;
	}
	,toString: function() {
		return "[TextField name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setTextFormat: function(inFmt,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(inFmt.font != null) this.mFace = inFmt.font;
		if(inFmt.size != null) this.mTextHeight = inFmt.size | 0;
		if(inFmt.align != null) this.mAlign = inFmt.align;
		if(inFmt.color != null) this.mTextColour = inFmt.color;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.getTextFormat();
	}
	,setSelection: function(beginIndex,endIndex) {
	}
	,RenderRow: function(inRow,inY,inCharIdx,inAlign,inInsert) {
		if(inInsert == null) inInsert = 0;
		var h = 0;
		var w = 0;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			if(chr.fh > h) h = chr.fh;
			w += chr.adv;
		}
		if(w > this.mMaxWidth) this.mMaxWidth = w;
		var full_height = h * 1.2 | 0;
		var align_x = 0;
		var insert_x = 0;
		if(inInsert != null) {
			if(this.autoSize != "NONE") {
				this.scrollH = 0;
				insert_x = inInsert;
			} else {
				insert_x = inInsert - this.scrollH;
				if(insert_x < 0) this.scrollH -= (this.mLimitRenderX * 3 >> 2) - insert_x; else if(insert_x > this.mLimitRenderX) this.scrollH += insert_x - (this.mLimitRenderX * 3 >> 2);
				if(this.scrollH < 0) this.scrollH = 0;
			}
		}
		if(this.autoSize == "NONE" && w <= this.mLimitRenderX) {
			if(inAlign == flash.text.TextFormatAlign.CENTER) align_x = Math.round(this.mWidth) - w >> 1; else if(inAlign == flash.text.TextFormatAlign.RIGHT) align_x = Math.round(this.mWidth) - w;
		}
		var x_list = new Array();
		this.mLineInfo.push({ mY0 : inY, mIndex : inCharIdx - 1, mX : x_list});
		var cache_sel_font = null;
		var cache_normal_font = null;
		var x = align_x - this.scrollH;
		var x0 = x;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			var adv = chr.adv;
			if(x + adv > this.mLimitRenderX) break;
			x_list.push(x);
			if(x >= 0) {
				var font = chr.font;
				if(chr.sel) {
					this.nmeGraphics.lineStyle();
					this.nmeGraphics.beginFill(2105440);
					this.nmeGraphics.drawRect(x,inY,adv,full_height);
					this.nmeGraphics.endFill();
					if(cache_normal_font == chr.font) font = cache_sel_font; else {
						font = flash.text.FontInstance.CreateSolid(chr.font.GetFace(),chr.fh,16777215,1.0);
						cache_sel_font = font;
						cache_normal_font = chr.font;
					}
				}
				font.RenderChar(this.nmeGraphics,chr.chr,x,inY + (h - chr.fh) | 0);
			}
			x += adv;
		}
		x += this.scrollH;
		return full_height;
	}
	,RebuildText: function() {
		this.mParagraphs = [];
		if(!this.mHTMLMode) {
			var font = flash.text.FontInstance.CreateSolid(this.mFace,this.mTextHeight,this.mTextColour,1.0);
			var paras = this.mText.split("\n");
			var _g = 0;
			while(_g < paras.length) {
				var paragraph = paras[_g];
				++_g;
				this.mParagraphs.push({ align : this.mAlign, spans : [{ font : font, text : paragraph + "\n"}]});
			}
		}
		this.Rebuild();
	}
	,Rebuild: function() {
		if(this.mHTMLMode) return;
		this.mLineInfo = [];
		this.nmeGraphics.clear();
		if(this.background) {
			this.nmeGraphics.beginFill(this.backgroundColor);
			this.nmeGraphics.drawRect(0,0,this.get_width(),this.get_height());
			this.nmeGraphics.endFill();
		}
		this.nmeGraphics.lineStyle(this.mTextColour);
		var insert_x = null;
		this.mMaxWidth = 0;
		var wrap = this.mLimitRenderX = this.get_wordWrap() && !this.nmeInputEnabled?this.mWidth | 0:999999;
		var char_idx = 0;
		var h = 0;
		var s0 = this.mSelStart;
		var s1 = this.mSelEnd;
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var row = [];
			var row_width = 0;
			var last_word_break = 0;
			var last_word_break_width = 0;
			var last_word_char_idx = 0;
			var start_idx = char_idx;
			var tx = 0;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				var text = span.text;
				var font = span.font;
				var fh = font.get_height();
				last_word_break = row.length;
				last_word_break_width = row_width;
				last_word_char_idx = char_idx;
				var _g5 = 0, _g4 = text.length;
				while(_g5 < _g4) {
					var ch = _g5++;
					var g = HxOverrides.cca(text,ch);
					var adv = font.nmeGetAdvance(g);
					if(g == 32) {
						last_word_break = row.length;
						last_word_break_width = tx;
						last_word_char_idx = char_idx;
					}
					if(tx + adv > wrap) {
						if(last_word_break > 0) {
							var row_end = row.splice(last_word_break,row.length - last_word_break);
							h += this.RenderRow(row,h,start_idx,paragraph.align);
							row = row_end;
							tx -= last_word_break_width;
							start_idx = last_word_char_idx;
							last_word_break = 0;
							last_word_break_width = 0;
							last_word_char_idx = 0;
							if(row_end.length > 0 && row_end[0].chr == 32) {
								row_end.shift();
								start_idx++;
							}
						} else {
							h += this.RenderRow(row,h,char_idx,paragraph.align);
							row = [];
							tx = 0;
							start_idx = char_idx;
						}
					}
					row.push({ font : font, chr : g, x : tx, fh : fh, sel : char_idx >= s0 && char_idx < s1, adv : adv});
					tx += adv;
					char_idx++;
				}
			}
			if(row.length > 0) {
				h += this.RenderRow(row,h,start_idx,paragraph.align,insert_x);
				insert_x = null;
			}
		}
		var w = this.mMaxWidth;
		if(h < this.mTextHeight) h = this.mTextHeight;
		this.mMaxHeight = h;
		var _g = this;
		switch(_g.autoSize) {
		case "LEFT":
			break;
		case "RIGHT":
			var x0 = this.get_x() + this.get_width();
			this.set_x(this.mWidth - x0);
			break;
		case "CENTER":
			var x0 = this.get_x() + this.get_width() / 2;
			this.set_x(this.mWidth / 2 - x0);
			break;
		default:
			if(this.get_wordWrap()) this.set_height(h);
		}
		if(this.border) {
			this.nmeGraphics.endFill();
			this.nmeGraphics.lineStyle(1,this.borderColor,1,true);
			this.nmeGraphics.drawRect(.5,.5,this.get_width() - .5,this.get_height() - .5);
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.nmeGraphics.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		if(!this.mHTMLMode && inMask != null) {
			var m = this.getSurfaceTransform(this.nmeGraphics);
			flash.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect,this.gridFitType != flash.text.GridFitType.PIXEL);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(this.nmeGraphics);
				flash.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.mText.length > 1) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.mMaxWidth || local.y > this.mMaxHeight) return null; else return this;
		} else return flash.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return new flash.text.TextFormat(this.mFace,this.mTextHeight,this.mTextColour);
	}
	,getLineIndexAtPoint: function(inX,inY) {
		if(this.mLineInfo.length < 1) return -1;
		if(inY <= 0) return 0;
		var _g1 = 0, _g = this.mLineInfo.length;
		while(_g1 < _g) {
			var l = _g1++;
			if(this.mLineInfo[l].mY0 > inY) return l == 0?0:l - 1;
		}
		return this.mLineInfo.length - 1;
	}
	,getCharIndexAtPoint: function(inX,inY) {
		var li = this.getLineIndexAtPoint(inX,inY);
		if(li < 0) return -1;
		var line = this.mLineInfo[li];
		var idx = line.mIndex;
		var _g = 0, _g1 = line.mX;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			if(x > inX) return idx;
			idx++;
		}
		return idx;
	}
	,getCharBoundaries: function(a) {
		return null;
	}
	,DecodeColour: function(col) {
		return Std.parseInt("0x" + HxOverrides.substr(col,1,null));
	}
	,ConvertHTMLToText: function(inUnSetHTML) {
		this.mText = "";
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				this.mText += span.text;
			}
		}
		if(inUnSetHTML) {
			this.mHTMLMode = false;
			this.RebuildText();
		}
	}
	,appendText: function(newText) {
		var _g = this;
		_g.set_text(_g.get_text() + newText);
	}
	,__class__: flash.text.TextField
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{set_autoSize:"set_autoSize",set_background:"set_background",set_backgroundColor:"set_backgroundColor",set_border:"set_border",set_borderColor:"set_borderColor",get_bottomScrollV:"get_bottomScrollV",get_caretPos:"get_caretPos",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",get_maxScrollH:"get_maxScrollH",get_maxScrollV:"get_maxScrollV",get_numLines:"get_numLines",set_text:"set_text",get_text:"get_text",set_textColor:"set_textColor",get_textColor:"get_textColor",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_type:"set_type",get_type:"get_type",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap"})
});
flash.text.FontInstanceMode = $hxClasses["flash.text.FontInstanceMode"] = { __ename__ : true, __constructs__ : ["fimSolid"] }
flash.text.FontInstanceMode.fimSolid = ["fimSolid",0];
flash.text.FontInstanceMode.fimSolid.toString = $estr;
flash.text.FontInstanceMode.fimSolid.__enum__ = flash.text.FontInstanceMode;
flash.text.FontInstance = function(inFont,inHeight) {
	this.mFont = inFont;
	this.mHeight = inHeight;
	this.mTryFreeType = true;
	this.mGlyphs = [];
	this.mCacheAsBitmap = false;
};
$hxClasses["flash.text.FontInstance"] = flash.text.FontInstance;
flash.text.FontInstance.__name__ = ["flash","text","FontInstance"];
flash.text.FontInstance.CreateSolid = function(inFace,inHeight,inColour,inAlpha) {
	var id = "SOLID:" + inFace + ":" + inHeight + ":" + inColour + ":" + inAlpha;
	var f = flash.text.FontInstance.mSolidFonts.get(id);
	if(f != null) return f;
	var font = new flash.text.Font();
	font.nmeSetScale(inHeight);
	font.set_fontName(inFace);
	if(font == null) return null;
	f = new flash.text.FontInstance(font,inHeight);
	f.SetSolid(inColour,inAlpha);
	flash.text.FontInstance.mSolidFonts.set(id,f);
	return f;
}
flash.text.FontInstance.prototype = {
	get_height: function() {
		return this.mHeight;
	}
	,toString: function() {
		return "FontInstance:" + Std.string(this.mFont) + ":" + this.mColour + "(" + this.mGlyphs.length + ")";
	}
	,RenderChar: function(inGraphics,inGlyph,inX,inY) {
		inGraphics.nmeClearLine();
		inGraphics.beginFill(this.mColour,this.mAlpha);
		this.mFont.nmeRender(inGraphics,inGlyph,inX,inY,this.mTryFreeType);
		inGraphics.endFill();
	}
	,SetSolid: function(inCol,inAlpha) {
		this.mColour = inCol;
		this.mAlpha = inAlpha;
		this.mMode = flash.text.FontInstanceMode.fimSolid;
	}
	,nmeGetAdvance: function(inChar) {
		if(this.mFont == null) return 0;
		return this.mFont.nmeGetAdvance(inChar,this.mHeight);
	}
	,GetFace: function() {
		return this.mFont.fontName;
	}
	,__class__: flash.text.FontInstance
	,__properties__: {get_height:"get_height"}
}
flash.text.TextFieldAutoSize = function() {
};
$hxClasses["flash.text.TextFieldAutoSize"] = flash.text.TextFieldAutoSize;
flash.text.TextFieldAutoSize.__name__ = ["flash","text","TextFieldAutoSize"];
flash.text.TextFieldAutoSize.prototype = {
	__class__: flash.text.TextFieldAutoSize
}
flash.text.TextFieldType = function() {
};
$hxClasses["flash.text.TextFieldType"] = flash.text.TextFieldType;
flash.text.TextFieldType.__name__ = ["flash","text","TextFieldType"];
flash.text.TextFieldType.prototype = {
	__class__: flash.text.TextFieldType
}
flash.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["flash.text.TextFormat"] = flash.text.TextFormat;
flash.text.TextFormat.__name__ = ["flash","text","TextFormat"];
flash.text.TextFormat.prototype = {
	clone: function() {
		var newFormat = new flash.text.TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.display = this.display;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__class__: flash.text.TextFormat
}
flash.text.TextFormatAlign = $hxClasses["flash.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] }
flash.text.TextFormatAlign.LEFT = ["LEFT",0];
flash.text.TextFormatAlign.LEFT.toString = $estr;
flash.text.TextFormatAlign.LEFT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.RIGHT = ["RIGHT",1];
flash.text.TextFormatAlign.RIGHT.toString = $estr;
flash.text.TextFormatAlign.RIGHT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
flash.text.TextFormatAlign.JUSTIFY.toString = $estr;
flash.text.TextFormatAlign.JUSTIFY.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.CENTER = ["CENTER",3];
flash.text.TextFormatAlign.CENTER.toString = $estr;
flash.text.TextFormatAlign.CENTER.__enum__ = flash.text.TextFormatAlign;
flash.ui = {}
flash.ui.Keyboard = function() { }
$hxClasses["flash.ui.Keyboard"] = flash.ui.Keyboard;
flash.ui.Keyboard.__name__ = ["flash","ui","Keyboard"];
flash.ui.Keyboard.isAccessible = function() {
	return false;
}
flash.ui.Keyboard.nmeConvertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
flash.ui.Keyboard.nmeConvertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 18;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
}
flash.utils = {}
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new flash.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
}
flash.utils.ByteArray.nmeOfBuffer = function(buffer) {
	var bytes = new flash.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
flash.utils.ByteArray.prototype = {
	set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Math.max(value,this.allocated * 2) | 0); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,get_endian: function() {
		return this.littleEndian?"littleEndian":"bigEndian";
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this._nmeResizeBuffer(this.allocated = Math.max(len,this.allocated * 2) | 0); else if(this.allocated > len) this._nmeResizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = Math.max(lengthToEnsure,bytes.allocated * 2) | 0); else if(bytes.allocated > lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,nmeSet: function(pos,v) {
		var data = this.data;
		data.setUint8(pos,v);
	}
	,nmeGetBuffer: function() {
		return this.data.buffer;
	}
	,nmeGet: function(pos) {
		var data = this.data;
		return data.getUint8(pos);
	}
	,nmeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,clear: function() {
		if(this.allocated < 0) this._nmeResizeBuffer(this.allocated = Math.max(0,this.allocated * 2) | 0); else if(this.allocated > 0) this._nmeResizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__class__: flash.utils.ByteArray
	,__properties__: {get_bytesAvailable:"get_bytesAvailable",set_endian:"set_endian",get_endian:"get_endian",set_length:"set_length"}
}
flash.utils.Endian = function() { }
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
flash.utils.Uuid = function() { }
$hxClasses["flash.utils.Uuid"] = flash.utils.Uuid;
flash.utils.Uuid.__name__ = ["flash","utils","Uuid"];
flash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
flash.utils.Uuid.uuid = function() {
	return flash.utils.Uuid.random(8) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(12);
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
$hxClasses["haxe.Template"] = haxe.Template;
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	run: function(e) {
		var $e = (e);
		switch( $e[1] ) {
		case 0:
			var v = $e[2];
			this.buf.b += Std.string(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = $e[2];
			this.buf.b += Std.string(Std.string(e1()));
			break;
		case 2:
			var eelse = $e[4], eif = $e[3], e1 = $e[2];
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = $e[2];
			this.buf.b += Std.string(str);
			break;
		case 4:
			var l = $e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				this.run(e1);
			}
			break;
		case 5:
			var loop = $e[3], e1 = $e[2];
			var v = e1();
			try {
				var x = $iterator(v)();
				if(x.hasNext == null) throw null;
				v = x;
			} catch( e2 ) {
				try {
					if(v.hasNext == null) throw null;
				} catch( e3 ) {
					throw "Cannot iter on " + Std.string(v);
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			while( v1.hasNext() ) {
				var ctx = v1.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = $e[3], m = $e[2];
			var v = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				var $e = (p);
				switch( $e[1] ) {
				case 0:
					var v1 = $e[2];
					pl.push(this.resolve(v1));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.b += Std.string(Std.string(v.apply(this.macros,pl)));
			} catch( e1 ) {
				var plstr = (function($this) {
					var $r;
					try {
						$r = pl.join(",");
					} catch( e2 ) {
						$r = "???";
					}
					return $r;
				}(this));
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
				throw msg;
			}
			break;
		}
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		switch(p.p) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			return (function($this) {
				var $r;
				switch(p1.p) {
				case "+":
					$r = function() {
						return e1() + e2();
					};
					break;
				case "-":
					$r = function() {
						return e1() - e2();
					};
					break;
				case "*":
					$r = function() {
						return e1() * e2();
					};
					break;
				case "/":
					$r = function() {
						return e1() / e2();
					};
					break;
				case ">":
					$r = function() {
						return e1() > e2();
					};
					break;
				case "<":
					$r = function() {
						return e1() < e2();
					};
					break;
				case ">=":
					$r = function() {
						return e1() >= e2();
					};
					break;
				case "<=":
					$r = function() {
						return e1() <= e2();
					};
					break;
				case "==":
					$r = function() {
						return e1() == e2();
					};
					break;
				case "!=":
					$r = function() {
						return e1() != e2();
					};
					break;
				case "&&":
					$r = function() {
						return e1() && e2();
					};
					break;
				case "||":
					$r = function() {
						return e1() || e2();
					};
					break;
				default:
					$r = (function($this) {
						var $r;
						throw "Unknown operation " + p1.p;
						return $r;
					}($this));
				}
				return $r;
			}(this));
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0, _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,resolve: function(v) {
		if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,execute: function(context,macros) {
		this.macros = macros == null?{ }:macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,__class__: haxe.Template
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		var id = key.__id__;
		if(!this.h.hasOwnProperty(id)) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key.__id__);
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Eof = function() { }
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
var motion = {}
motion.actuators = {}
motion.actuators.IGenericActuator = function() { }
$hxClasses["motion.actuators.IGenericActuator"] = motion.actuators.IGenericActuator;
motion.actuators.IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion.actuators.IGenericActuator.prototype = {
	__class__: motion.actuators.IGenericActuator
}
motion.actuators.GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion.Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion.actuators.GenericActuator;
motion.actuators.GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion.actuators.GenericActuator.__interfaces__ = [motion.actuators.IGenericActuator];
motion.actuators.GenericActuator.prototype = {
	stop: function(properties,complete,sendEvent) {
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,resume: function() {
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,pause: function() {
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,move: function() {
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion.Actuate.unload(this);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,callMethod: function(method,params) {
		return method.apply(method,params);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,apply: function() {
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Reflect.hasField(this.target,i)) this.target[i] = Reflect.field(this.properties,i); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,__class__: motion.actuators.GenericActuator
}
motion.actuators.SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = new Array();
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = flash.Lib.getTimer() / 1000;
	motion.actuators.GenericActuator.call(this,target,duration,properties);
	if(!motion.actuators.SimpleActuator.addedEvent) {
		motion.actuators.SimpleActuator.addedEvent = true;
		flash.Lib.get_current().get_stage().addEventListener(flash.events.Event.ENTER_FRAME,motion.actuators.SimpleActuator.stage_onEnterFrame);
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion.actuators.SimpleActuator;
motion.actuators.SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion.actuators.SimpleActuator.stage_onEnterFrame = function(event) {
	var currentTime = flash.Lib.getTimer() / 1000;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0, _g = motion.actuators.SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion.actuators.SimpleActuator.actuators[j];
		if(actuator.active) {
			if(currentTime > actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion.actuators.SimpleActuator.actuators.splice(j,1);
			--motion.actuators.SimpleActuator.actuatorsLength;
		}
	}
}
motion.actuators.SimpleActuator.__super__ = motion.actuators.GenericActuator;
motion.actuators.SimpleActuator.prototype = $extend(motion.actuators.GenericActuator.prototype,{
	update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0, _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g1 = 0, _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0, _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Reflect.hasField(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,setField: function(target,propertyName,value) {
		if(Reflect.hasField(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (flash.Lib.getTimer() - this.pauseTime) / 1000;
		}
	}
	,pause: function() {
		this.paused = true;
		this.pauseTime = flash.Lib.getTimer();
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,move: function() {
		this.toggleVisible = Reflect.hasField(this.properties,"alpha") && js.Boot.__instanceof(this.target,flash.display.DisplayObject);
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion.actuators.SimpleActuator.actuators.push(this);
		++motion.actuators.SimpleActuator.actuatorsLength;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Reflect.hasField(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			details = new motion.actuators.PropertyDetails(this.target,i,start,Reflect.field(this.properties,i) - start,isField);
			this.propertyDetails.push(details);
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Reflect.hasField(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,__class__: motion.actuators.SimpleActuator
});
motion.easing = {}
motion.easing.Expo = function() { }
$hxClasses["motion.easing.Expo"] = motion.easing.Expo;
motion.easing.Expo.__name__ = ["motion","easing","Expo"];
motion.easing.Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion.easing.Expo.get_easeIn = function() {
	return new motion.easing.ExpoEaseIn();
}
motion.easing.Expo.get_easeInOut = function() {
	return new motion.easing.ExpoEaseInOut();
}
motion.easing.Expo.get_easeOut = function() {
	return new motion.easing.ExpoEaseOut();
}
motion.easing.IEasing = function() { }
$hxClasses["motion.easing.IEasing"] = motion.easing.IEasing;
motion.easing.IEasing.__name__ = ["motion","easing","IEasing"];
motion.easing.IEasing.prototype = {
	__class__: motion.easing.IEasing
}
motion.easing.ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion.easing.ExpoEaseOut;
motion.easing.ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion.easing.ExpoEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseOut.prototype = {
	ease: function(t,b,c,d) {
		return t == d?b + c:c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,calculate: function(k) {
		return k == 1?1:1 - Math.pow(2,-10 * k);
	}
	,__class__: motion.easing.ExpoEaseOut
}
motion.Actuate = function() { }
$hxClasses["motion.Actuate"] = motion.Actuate;
motion.Actuate.__name__ = ["motion","Actuate"];
motion.Actuate.apply = function(target,properties,customActuator) {
	motion.Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
}
motion.Actuate.effects = function(target,duration,overwrite) {
	if(overwrite == null) overwrite = true;
	return new motion._Actuate.EffectsOptions(target,duration,overwrite);
}
motion.Actuate.getLibrary = function(target) {
	if(!motion.Actuate.targetLibraries.exists(target)) motion.Actuate.targetLibraries.set(target,new Array());
	return motion.Actuate.targetLibraries.get(target);
}
motion.Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MotionPathActuator);
}
motion.Actuate.pause = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).pause(); else {
		var library = motion.Actuate.getLibrary(target);
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
}
motion.Actuate.pauseAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
}
motion.Actuate.reset = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
}
motion.Actuate.resume = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).resume(); else {
		var library = motion.Actuate.getLibrary(target);
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
}
motion.Actuate.resumeAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
}
motion.Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).stop(null,complete,sendEvent); else {
			var library = motion.Actuate.getLibrary(target);
			if(js.Boot.__instanceof(properties,String)) {
				var temp = { };
				Reflect.setField(temp,properties,null);
				properties = temp;
			} else if(js.Boot.__instanceof(properties,Array)) {
				var temp = { };
				var _g = 0, _g1 = js.Boot.__cast(properties , Array);
				while(_g < _g1.length) {
					var property = _g1[_g];
					++_g;
					Reflect.setField(temp,property,null);
				}
				properties = temp;
			}
			var i = library.length - 1;
			while(i >= 0) {
				library[i].stop(properties,complete,sendEvent);
				i--;
			}
		}
	}
}
motion.Actuate.timer = function(duration,customActuator) {
	return motion.Actuate.tween(new motion._Actuate.TweenTimer(0),duration,new motion._Actuate.TweenTimer(1),false,customActuator);
}
motion.Actuate.transform = function(target,duration,overwrite) {
	if(overwrite == null) overwrite = true;
	if(duration == null) duration = 0;
	return new motion._Actuate.TransformOptions(target,duration,overwrite);
}
motion.Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion.Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion.Actuate.apply(target,properties,customActuator);
	}
	return null;
}
motion.Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion.Actuate.targetLibraries.h.hasOwnProperty(target.__id__)) {
		HxOverrides.remove(motion.Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion.Actuate.targetLibraries.h[target.__id__].length == 0) motion.Actuate.targetLibraries.remove(target);
	}
}
motion.Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MethodActuator);
}
motion._Actuate = {}
motion._Actuate.EffectsOptions = function(target,duration,overwrite) {
	this.target = target;
	this.duration = duration;
	this.overwrite = overwrite;
};
$hxClasses["motion._Actuate.EffectsOptions"] = motion._Actuate.EffectsOptions;
motion._Actuate.EffectsOptions.__name__ = ["motion","_Actuate","EffectsOptions"];
motion._Actuate.EffectsOptions.prototype = {
	filter: function(reference,properties) {
		properties.filter = reference;
		return motion.Actuate.tween(this.target,this.duration,properties,this.overwrite,motion.actuators.FilterActuator);
	}
	,__class__: motion._Actuate.EffectsOptions
}
motion._Actuate.TransformOptions = function(target,duration,overwrite) {
	this.target = target;
	this.duration = duration;
	this.overwrite = overwrite;
};
$hxClasses["motion._Actuate.TransformOptions"] = motion._Actuate.TransformOptions;
motion._Actuate.TransformOptions.__name__ = ["motion","_Actuate","TransformOptions"];
motion._Actuate.TransformOptions.prototype = {
	sound: function(volume,pan) {
		var properties = { };
		if(volume != null) properties.soundVolume = volume;
		if(pan != null) properties.soundPan = pan;
		return motion.Actuate.tween(this.target,this.duration,properties,this.overwrite,motion.actuators.TransformActuator);
	}
	,color: function(value,strength,alpha) {
		if(strength == null) strength = 1;
		if(value == null) value = 0;
		var properties = { colorValue : value, colorStrength : strength};
		if(alpha != null) properties.colorAlpha = alpha;
		return motion.Actuate.tween(this.target,this.duration,properties,this.overwrite,motion.actuators.TransformActuator);
	}
	,__class__: motion._Actuate.TransformOptions
}
motion._Actuate.TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["motion._Actuate.TweenTimer"] = motion._Actuate.TweenTimer;
motion._Actuate.TweenTimer.__name__ = ["motion","_Actuate","TweenTimer"];
motion._Actuate.TweenTimer.prototype = {
	__class__: motion._Actuate.TweenTimer
}
motion.MotionPath = function() {
	this._x = new motion.ComponentPath();
	this._y = new motion.ComponentPath();
};
$hxClasses["motion.MotionPath"] = motion.MotionPath;
motion.MotionPath.__name__ = ["motion","MotionPath"];
motion.MotionPath.prototype = {
	get_y: function() {
		return this._y;
	}
	,get_x: function() {
		return this._x;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.LinearPath(x,strength));
		this._y.addPath(new motion.LinearPath(y,strength));
		return this;
	}
	,bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.BezierPath(x,controlX,strength));
		this._y.addPath(new motion.BezierPath(y,controlY,strength));
		return this;
	}
	,__class__: motion.MotionPath
	,__properties__: {get_x:"get_x",get_y:"get_y"}
}
motion.IComponentPath = function() { }
$hxClasses["motion.IComponentPath"] = motion.IComponentPath;
motion.IComponentPath.__name__ = ["motion","IComponentPath"];
motion.IComponentPath.prototype = {
	__class__: motion.IComponentPath
}
motion.ComponentPath = function() {
	this.paths = new Array();
	this.start = 0;
	this.totalStrength = 0;
};
$hxClasses["motion.ComponentPath"] = motion.ComponentPath;
motion.ComponentPath.__name__ = ["motion","ComponentPath"];
motion.ComponentPath.__interfaces__ = [motion.IComponentPath];
motion.ComponentPath.prototype = {
	get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0, _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,__class__: motion.ComponentPath
	,__properties__: {get_end:"get_end"}
}
motion.BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["motion.BezierPath"] = motion.BezierPath;
motion.BezierPath.__name__ = ["motion","BezierPath"];
motion.BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion.BezierPath
}
motion.LinearPath = function(end,strength) {
	motion.BezierPath.call(this,end,0,strength);
};
$hxClasses["motion.LinearPath"] = motion.LinearPath;
motion.LinearPath.__name__ = ["motion","LinearPath"];
motion.LinearPath.__super__ = motion.BezierPath;
motion.LinearPath.prototype = $extend(motion.BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion.LinearPath
});
motion.actuators.FilterActuator = function(target,duration,properties) {
	this.filterIndex = -1;
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
	if(js.Boot.__instanceof(properties.filter,Class)) {
		this.filterClass = properties.filter;
		var _g = 0, _g1 = (js.Boot.__cast(target , flash.display.DisplayObject)).get_filters();
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(filter,this.filterClass)) this.filter = filter;
		}
	} else {
		this.filterIndex = properties.filter;
		this.filter = (js.Boot.__cast(target , flash.display.DisplayObject)).get_filters()[this.filterIndex];
	}
};
$hxClasses["motion.actuators.FilterActuator"] = motion.actuators.FilterActuator;
motion.actuators.FilterActuator.__name__ = ["motion","actuators","FilterActuator"];
motion.actuators.FilterActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.FilterActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		var filters = (js.Boot.__cast(this.target , flash.display.DisplayObject)).get_filters();
		if(this.filterIndex > -1) Reflect.setField(filters,this.properties.filter,this.filter); else {
			var _g1 = 0, _g = filters.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(js.Boot.__instanceof(filters[i],this.filterClass)) filters[i] = this.filter;
			}
		}
		this.setField(this.target,"filters",filters);
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(propertyName != "filter") {
				start = this.getField(this.filter,propertyName);
				details = new motion.actuators.PropertyDetails(this.filter,propertyName,start,Reflect.field(this.properties,propertyName) - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,apply: function() {
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(propertyName != "filter") this.filter[propertyName] = Reflect.field(this.properties,propertyName);
		}
		var filters = this.getField(this.target,"filters");
		Reflect.setField(filters,this.properties.filter,this.filter);
		this.setField(this.target,"filters",filters);
	}
	,__class__: motion.actuators.FilterActuator
});
motion.actuators.MethodActuator = function(target,duration,properties) {
	this.currentParameters = new Array();
	this.tweenProperties = { };
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
	if(!Reflect.hasField(properties,"start")) this.properties.start = new Array();
	if(!Reflect.hasField(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0, _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(null);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion.actuators.MethodActuator;
motion.actuators.MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion.actuators.MethodActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MethodActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active) {
			var _g1 = 0, _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0, _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(js.Boot.__instanceof(start,Float) || js.Boot.__instanceof(start,Int)) {
				details = new motion.actuators.PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0, _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion.actuators.SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,__class__: motion.actuators.MethodActuator
});
motion.actuators.MotionPathActuator = function(target,duration,properties) {
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion.actuators.MotionPathActuator;
motion.actuators.MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion.actuators.MotionPathActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MotionPathActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0, _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) details1.target[details1.propertyName] = (js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g = 0, _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(!this._snapping) {
						if(details1.isField) details1.target[details1.propertyName] = (js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
					} else if(details1.isField) details1.target[details1.propertyName] = Math.round((js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,Math.round((js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath);
			if(path != null) {
				var isField = true;
				if(Reflect.hasField(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion.actuators.PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,apply: function() {
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Reflect.hasField(this.target,propertyName)) this.target[propertyName] = (js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end(); else Reflect.setProperty(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end());
		}
	}
	,__class__: motion.actuators.MotionPathActuator
});
motion.actuators.PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion.actuators.PropertyDetails;
motion.actuators.PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion.actuators.PropertyDetails.prototype = {
	__class__: motion.actuators.PropertyDetails
}
motion.actuators.PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion.actuators.PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion.actuators.PropertyPathDetails;
motion.actuators.PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion.actuators.PropertyPathDetails.__super__ = motion.actuators.PropertyDetails;
motion.actuators.PropertyPathDetails.prototype = $extend(motion.actuators.PropertyDetails.prototype,{
	__class__: motion.actuators.PropertyPathDetails
});
motion.actuators.TransformActuator = function(target,duration,properties) {
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.TransformActuator"] = motion.actuators.TransformActuator;
motion.actuators.TransformActuator.__name__ = ["motion","actuators","TransformActuator"];
motion.actuators.TransformActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.TransformActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.endColorTransform != null) {
			var transform = this.getField(this.target,"transform");
			this.setField(transform,"colorTransform",this.tweenColorTransform);
		}
		if(this.endSoundTransform != null) this.setField(this.target,"soundTransform",this.tweenSoundTransform);
	}
	,initializeSound: function() {
		if(this.getField(this.target,"soundTransform") == null) this.setField(this.target,"soundTransform",new flash.media.SoundTransform());
		var start = this.getField(this.target,"soundTransform");
		this.endSoundTransform = this.getField(this.target,"soundTransform");
		this.tweenSoundTransform = new flash.media.SoundTransform();
		if(Reflect.hasField(this.properties,"soundVolume")) {
			this.endSoundTransform.volume = this.properties.soundVolume;
			this.propertyDetails.push(new motion.actuators.PropertyDetails(this.tweenSoundTransform,"volume",start.volume,this.endSoundTransform.volume - start.volume));
		}
		if(Reflect.hasField(this.properties,"soundPan")) {
			this.endSoundTransform.pan = this.properties.soundPan;
			this.propertyDetails.push(new motion.actuators.PropertyDetails(this.tweenSoundTransform,"pan",start.pan,this.endSoundTransform.pan - start.pan));
		}
	}
	,initializeColor: function() {
		this.endColorTransform = new flash.geom.ColorTransform();
		var color = this.properties.colorValue;
		var strength = this.properties.colorStrength;
		if(strength < 1) {
			var multiplier;
			var offset;
			if(strength < 0.5) {
				multiplier = 1;
				offset = strength * 2;
			} else {
				multiplier = 1 - (strength - 0.5) * 2;
				offset = 1;
			}
			this.endColorTransform.redMultiplier = multiplier;
			this.endColorTransform.greenMultiplier = multiplier;
			this.endColorTransform.blueMultiplier = multiplier;
			this.endColorTransform.redOffset = offset * (color >> 16 & 255);
			this.endColorTransform.greenOffset = offset * (color >> 8 & 255);
			this.endColorTransform.blueOffset = offset * (color & 255);
		} else {
			this.endColorTransform.redMultiplier = 0;
			this.endColorTransform.greenMultiplier = 0;
			this.endColorTransform.blueMultiplier = 0;
			this.endColorTransform.redOffset = color >> 16 & 255;
			this.endColorTransform.greenOffset = color >> 8 & 255;
			this.endColorTransform.blueOffset = color & 255;
		}
		var propertyNames = ["redMultiplier","greenMultiplier","blueMultiplier","redOffset","greenOffset","blueOffset"];
		if(Reflect.hasField(this.properties,"colorAlpha")) {
			this.endColorTransform.alphaMultiplier = this.properties.colorAlpha;
			propertyNames.push("alphaMultiplier");
		} else this.endColorTransform.alphaMultiplier = this.getField(this.target,"alpha");
		var transform = this.getField(this.target,"transform");
		var begin = this.getField(transform,"colorTransform");
		this.tweenColorTransform = new flash.geom.ColorTransform();
		var details;
		var start;
		var _g = 0;
		while(_g < propertyNames.length) {
			var propertyName = propertyNames[_g];
			++_g;
			start = this.getField(begin,propertyName);
			details = new motion.actuators.PropertyDetails(this.tweenColorTransform,propertyName,start,this.getField(this.endColorTransform,propertyName) - start);
			this.propertyDetails.push(details);
		}
	}
	,initialize: function() {
		if(Reflect.hasField(this.properties,"colorValue") && js.Boot.__instanceof(this.target,flash.display.DisplayObject)) this.initializeColor();
		if(Reflect.hasField(this.properties,"soundVolume") || Reflect.hasField(this.properties,"soundPan")) this.initializeSound();
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,apply: function() {
		this.initialize();
		if(this.endColorTransform != null) {
			var transform = this.getField(this.target,"transform");
			this.setField(transform,"colorTransform",this.endColorTransform);
		}
		if(this.endSoundTransform != null) this.setField(this.target,"soundTransform",this.endSoundTransform);
	}
	,__class__: motion.actuators.TransformActuator
});
motion.easing.ExpoEaseIn = function() {
};
$hxClasses["motion.easing.ExpoEaseIn"] = motion.easing.ExpoEaseIn;
motion.easing.ExpoEaseIn.__name__ = ["motion","easing","ExpoEaseIn"];
motion.easing.ExpoEaseIn.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseIn.prototype = {
	ease: function(t,b,c,d) {
		return t == 0?b:c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,calculate: function(k) {
		return k == 0?0:Math.pow(2,10 * (k - 1));
	}
	,__class__: motion.easing.ExpoEaseIn
}
motion.easing.ExpoEaseInOut = function() {
};
$hxClasses["motion.easing.ExpoEaseInOut"] = motion.easing.ExpoEaseInOut;
motion.easing.ExpoEaseInOut.__name__ = ["motion","easing","ExpoEaseInOut"];
motion.easing.ExpoEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseInOut.prototype = {
	ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,__class__: motion.easing.ExpoEaseInOut
}
motion.easing.Linear = function() { }
$hxClasses["motion.easing.Linear"] = motion.easing.Linear;
motion.easing.Linear.__name__ = ["motion","easing","Linear"];
motion.easing.Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion.easing.Linear.get_easeNone = function() {
	return new motion.easing.LinearEaseNone();
}
motion.easing.LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion.easing.LinearEaseNone;
motion.easing.LinearEaseNone.__name__ = ["motion","easing","LinearEaseNone"];
motion.easing.LinearEaseNone.__interfaces__ = [motion.easing.IEasing];
motion.easing.LinearEaseNone.prototype = {
	ease: function(t,b,c,d) {
		return c * t / d + b;
	}
	,calculate: function(k) {
		return k;
	}
	,__class__: motion.easing.LinearEaseNone
}
motion.easing.Quad = function() { }
$hxClasses["motion.easing.Quad"] = motion.easing.Quad;
motion.easing.Quad.__name__ = ["motion","easing","Quad"];
motion.easing.Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion.easing.Quad.get_easeIn = function() {
	return new motion.easing.QuadEaseIn();
}
motion.easing.Quad.get_easeInOut = function() {
	return new motion.easing.QuadEaseInOut();
}
motion.easing.Quad.get_easeOut = function() {
	return new motion.easing.QuadEaseOut();
}
motion.easing.QuadEaseIn = function() {
};
$hxClasses["motion.easing.QuadEaseIn"] = motion.easing.QuadEaseIn;
motion.easing.QuadEaseIn.__name__ = ["motion","easing","QuadEaseIn"];
motion.easing.QuadEaseIn.__interfaces__ = [motion.easing.IEasing];
motion.easing.QuadEaseIn.prototype = {
	ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,calculate: function(k) {
		return k * k;
	}
	,__class__: motion.easing.QuadEaseIn
}
motion.easing.QuadEaseInOut = function() {
};
$hxClasses["motion.easing.QuadEaseInOut"] = motion.easing.QuadEaseInOut;
motion.easing.QuadEaseInOut.__name__ = ["motion","easing","QuadEaseInOut"];
motion.easing.QuadEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.QuadEaseInOut.prototype = {
	ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,__class__: motion.easing.QuadEaseInOut
}
motion.easing.QuadEaseOut = function() {
};
$hxClasses["motion.easing.QuadEaseOut"] = motion.easing.QuadEaseOut;
motion.easing.QuadEaseOut.__name__ = ["motion","easing","QuadEaseOut"];
motion.easing.QuadEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.QuadEaseOut.prototype = {
	ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,calculate: function(k) {
		return -k * (k - 2);
	}
	,__class__: motion.easing.QuadEaseOut
}
var nme = {}
nme.AssetData = function() { }
$hxClasses["nme.AssetData"] = nme.AssetData;
nme.AssetData.__name__ = ["nme","AssetData"];
nme.AssetData.initialize = function() {
	if(!nme.AssetData.initialized) {
		nme.AssetData.className.set("fonts/FreebooterUpdated.ttf",nme.NME_fonts_freebooterupdated_ttf);
		var value = Reflect.field(openfl.AssetType,"font".toUpperCase());
		nme.AssetData.type.set("fonts/FreebooterUpdated.ttf",value);
		nme.AssetData.path.set("images/background_tile.png","images/background_tile.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/background_tile.png",value);
		nme.AssetData.path.set("images/center_bottom.png","images/center_bottom.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/center_bottom.png",value);
		nme.AssetData.path.set("images/game_bear.png","images/game_bear.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_bear.png",value);
		nme.AssetData.path.set("images/game_bunny_02.png","images/game_bunny_02.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_bunny_02.png",value);
		nme.AssetData.path.set("images/game_carrot.png","images/game_carrot.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_carrot.png",value);
		nme.AssetData.path.set("images/game_lemon.png","images/game_lemon.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_lemon.png",value);
		nme.AssetData.path.set("images/game_panda.png","images/game_panda.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_panda.png",value);
		nme.AssetData.path.set("images/game_piratePig.png","images/game_piratePig.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/game_piratePig.png",value);
		nme.AssetData.path.set("images/logo.png","images/logo.png");
		var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
		nme.AssetData.type.set("images/logo.png",value);
		nme.AssetData.path.set("sound3","sounds/3.mp3");
		var value = Reflect.field(openfl.AssetType,"sound".toUpperCase());
		nme.AssetData.type.set("sound3",value);
		nme.AssetData.path.set("sound4","sounds/4.mp3");
		var value = Reflect.field(openfl.AssetType,"sound".toUpperCase());
		nme.AssetData.type.set("sound4",value);
		nme.AssetData.path.set("sound5","sounds/5.mp3");
		var value = Reflect.field(openfl.AssetType,"sound".toUpperCase());
		nme.AssetData.type.set("sound5",value);
		nme.AssetData.path.set("soundTheme","sounds/theme.mp3");
		var value = Reflect.field(openfl.AssetType,"music".toUpperCase());
		nme.AssetData.type.set("soundTheme",value);
		nme.AssetData.initialized = true;
	}
}
nme.NME_fonts_freebooterupdated_ttf = function() {
	flash.text.Font.call(this);
};
$hxClasses["nme.NME_fonts_freebooterupdated_ttf"] = nme.NME_fonts_freebooterupdated_ttf;
nme.NME_fonts_freebooterupdated_ttf.__name__ = ["nme","NME_fonts_freebooterupdated_ttf"];
nme.NME_fonts_freebooterupdated_ttf.__super__ = flash.text.Font;
nme.NME_fonts_freebooterupdated_ttf.prototype = $extend(flash.text.Font.prototype,{
	__class__: nme.NME_fonts_freebooterupdated_ttf
});
var openfl = {}
openfl.Assets = function() { }
$hxClasses["openfl.Assets"] = openfl.Assets;
openfl.Assets.__name__ = ["openfl","Assets"];
openfl.Assets.__properties__ = {get_type:"get_type",get_path:"get_path",get_library:"get_library",get_id:"get_id"}
openfl.Assets.initialize = function() {
	if(!openfl.Assets.initialized) {
		nme.AssetData.initialize();
		openfl.Assets.initialized = true;
	}
}
openfl.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id) && nme.AssetData.type.get(id) == openfl.AssetType.IMAGE) {
		if(useCache && openfl.Assets.cachedBitmapData.exists(id)) return openfl.Assets.cachedBitmapData.get(id); else {
			var data = (js.Boot.__cast(ApplicationMain.loaders.get(nme.AssetData.path.get(id)).contentLoaderInfo.content , flash.display.Bitmap)).bitmapData;
			if(useCache) openfl.Assets.cachedBitmapData.set(id,data);
			return data;
		}
	} else if(id.indexOf(":") > -1) {
		var libraryName = HxOverrides.substr(id,0,id.indexOf(":"));
		var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
		if(nme.AssetData.library.exists(libraryName)) {
		} else console.log("[openfl.Assets] There is no asset library named \"" + libraryName + "\"");
	} else console.log("[openfl.Assets] There is no BitmapData asset with an ID of \"" + id + "\"");
	return null;
}
openfl.Assets.getBytes = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id)) {
		var bytes = null;
		var data = ApplicationMain.urlLoaders.get(nme.AssetData.path.get(id)).data;
		if(js.Boot.__instanceof(data,String)) {
			var bytes1 = new flash.utils.ByteArray();
			bytes1.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,flash.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	} else console.log("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"");
	return null;
}
openfl.Assets.getFont = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id) && nme.AssetData.type.get(id) == openfl.AssetType.FONT) return js.Boot.__cast(Type.createInstance(nme.AssetData.className.get(id),[]) , flash.text.Font); else console.log("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"");
	return null;
}
openfl.Assets.getSound = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id)) {
		var type = nme.AssetData.type.get(id);
		if(type == openfl.AssetType.SOUND || type == openfl.AssetType.MUSIC) return new flash.media.Sound(new flash.net.URLRequest(nme.AssetData.path.get(id)));
	}
	console.log("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"");
	return null;
}
openfl.Assets.getText = function(id) {
	var bytes = openfl.Assets.getBytes(id);
	if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
}
openfl.Assets.resolveClass = function(name) {
	name = StringTools.replace(name,"native.","flash.");
	name = StringTools.replace(name,"browser.","flash.");
	return Type.resolveClass(name);
}
openfl.Assets.resolveEnum = function(name) {
	name = StringTools.replace(name,"native.","flash.");
	name = StringTools.replace(name,"browser.","flash.");
	return Type.resolveEnum(name);
}
openfl.Assets.get_id = function() {
	openfl.Assets.initialize();
	var ids = [];
	var $it0 = nme.AssetData.type.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		ids.push(key);
	}
	return ids;
}
openfl.Assets.get_library = function() {
	openfl.Assets.initialize();
	return nme.AssetData.library;
}
openfl.Assets.get_path = function() {
	openfl.Assets.initialize();
	return nme.AssetData.path;
}
openfl.Assets.get_type = function() {
	openfl.Assets.initialize();
	return nme.AssetData.type;
}
openfl.AssetType = $hxClasses["openfl.AssetType"] = { __ename__ : true, __constructs__ : ["BINARY","FONT","IMAGE","MUSIC","SOUND","TEXT"] }
openfl.AssetType.BINARY = ["BINARY",0];
openfl.AssetType.BINARY.toString = $estr;
openfl.AssetType.BINARY.__enum__ = openfl.AssetType;
openfl.AssetType.FONT = ["FONT",1];
openfl.AssetType.FONT.toString = $estr;
openfl.AssetType.FONT.__enum__ = openfl.AssetType;
openfl.AssetType.IMAGE = ["IMAGE",2];
openfl.AssetType.IMAGE.toString = $estr;
openfl.AssetType.IMAGE.__enum__ = openfl.AssetType;
openfl.AssetType.MUSIC = ["MUSIC",3];
openfl.AssetType.MUSIC.toString = $estr;
openfl.AssetType.MUSIC.__enum__ = openfl.AssetType;
openfl.AssetType.SOUND = ["SOUND",4];
openfl.AssetType.SOUND.toString = $estr;
openfl.AssetType.SOUND.__enum__ = openfl.AssetType;
openfl.AssetType.TEXT = ["TEXT",5];
openfl.AssetType.TEXT.toString = $estr;
openfl.AssetType.TEXT.__enum__ = openfl.AssetType;
openfl.LibraryType = $hxClasses["openfl.LibraryType"] = { __ename__ : true, __constructs__ : ["SWF","SWF_LITE","XFL"] }
openfl.LibraryType.SWF = ["SWF",0];
openfl.LibraryType.SWF.toString = $estr;
openfl.LibraryType.SWF.__enum__ = openfl.LibraryType;
openfl.LibraryType.SWF_LITE = ["SWF_LITE",1];
openfl.LibraryType.SWF_LITE.toString = $estr;
openfl.LibraryType.SWF_LITE.__enum__ = openfl.LibraryType;
openfl.LibraryType.XFL = ["XFL",2];
openfl.LibraryType.XFL.toString = $estr;
openfl.LibraryType.XFL.__enum__ = openfl.LibraryType;
openfl.display = {}
openfl.display.Tilesheet = function(image) {
	this.nmeBitmap = image;
	this.nmeCenterPoints = new Array();
	this.nmeTileRects = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,addTileRect: function(rectangle,centerPoint) {
		this.nmeTileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new flash.geom.Point();
		this.nmeCenterPoints.push(centerPoint);
		return this.nmeTileRects.length - 1;
	}
	,__class__: openfl.display.Tilesheet
}
piratepig.PiratePigGame = function() {
	flash.display.Sprite.call(this);
	this.initialize();
	this.construct();
	this.newGame();
};
$hxClasses["piratepig.PiratePigGame"] = piratepig.PiratePigGame;
piratepig.PiratePigGame.__name__ = ["piratepig","PiratePigGame"];
piratepig.PiratePigGame.__super__ = flash.display.Sprite;
piratepig.PiratePigGame.prototype = $extend(flash.display.Sprite.prototype,{
	TileContainer_onMouseDown: function(event) {
		if(js.Boot.__instanceof(event.target,piratepig.Tile)) {
			this.selectedTile = event.target;
			this.cacheMouse = new flash.geom.Point(event.stageX,event.stageY);
		} else {
			this.cacheMouse = null;
			this.selectedTile = null;
		}
	}
	,this_onEnterFrame: function(event) {
		if(this.needToCheckMatches) {
			var matchedTiles = new Array();
			matchedTiles = matchedTiles.concat(this.findMatches(true));
			matchedTiles = matchedTiles.concat(this.findMatches(false));
			var _g = 0;
			while(_g < matchedTiles.length) {
				var tile = matchedTiles[_g];
				++_g;
				this.removeTile(tile.row,tile.column);
			}
			if(matchedTiles.length > 0) {
				this.Score.set_text(Std.string(this.currentScore));
				this.dropTiles();
			}
		}
	}
	,stage_onMouseUp: function(event) {
		if(this.cacheMouse != null && this.selectedTile != null && !this.selectedTile.moving) {
			var differenceX = event.stageX - this.cacheMouse.x;
			var differenceY = event.stageY - this.cacheMouse.y;
			if(Math.abs(differenceX) > 10 || Math.abs(differenceY) > 10) {
				var swapToRow = this.selectedTile.row;
				var swapToColumn = this.selectedTile.column;
				if(Math.abs(differenceX) > Math.abs(differenceY)) {
					if(differenceX < 0) swapToColumn--; else swapToColumn++;
				} else if(differenceY < 0) swapToRow--; else swapToRow++;
				this.swapTile(this.selectedTile,swapToRow,swapToColumn);
			}
		}
		this.selectedTile = null;
		this.cacheMouse = null;
	}
	,swapTile: function(tile,targetRow,targetColumn) {
		if(targetColumn >= 0 && targetColumn < piratepig.PiratePigGame.NUM_COLUMNS && targetRow >= 0 && targetRow < piratepig.PiratePigGame.NUM_ROWS) {
			var targetTile = this.tiles[targetRow][targetColumn];
			if(targetTile != null && !targetTile.moving) {
				this.tiles[targetRow][targetColumn] = tile;
				this.tiles[tile.row][tile.column] = targetTile;
				if(this.findMatches(true,false).length > 0 || this.findMatches(false,false).length > 0) {
					targetTile.row = tile.row;
					targetTile.column = tile.column;
					tile.row = targetRow;
					tile.column = targetColumn;
					var targetTilePosition = this.getPosition(targetTile.row,targetTile.column);
					var tilePosition = this.getPosition(tile.row,tile.column);
					targetTile.moveTo(0.3,targetTilePosition.x,targetTilePosition.y);
					tile.moveTo(0.3,tilePosition.x,tilePosition.y);
					this.needToCheckMatches = true;
				} else {
					this.tiles[targetRow][targetColumn] = targetTile;
					this.tiles[tile.row][tile.column] = tile;
				}
			}
		}
	}
	,resize: function(newWidth,newHeight) {
		var maxWidth = newWidth * 0.90;
		var maxHeight = newHeight * 0.86;
		this.currentScale = 1;
		this.set_scaleX(1);
		this.set_scaleY(1);
		var currentWidth = 75 * piratepig.PiratePigGame.NUM_COLUMNS;
		var currentHeight = 75 * piratepig.PiratePigGame.NUM_ROWS + 85;
		if(currentWidth > maxWidth || currentHeight > maxHeight) {
			var maxScaleX = maxWidth / currentWidth;
			var maxScaleY = maxHeight / currentHeight;
			if(maxScaleX < maxScaleY) this.currentScale = maxScaleX; else this.currentScale = maxScaleY;
			this.set_scaleX(this.currentScale);
			this.set_scaleY(this.currentScale);
		}
		this.set_x(newWidth / 2 - currentWidth * this.currentScale / 2);
	}
	,removeTile: function(row,column,animate) {
		if(animate == null) animate = true;
		var tile = this.tiles[row][column];
		if(tile != null) {
			tile.remove(animate);
			this.usedTiles.push(tile);
		}
		this.tiles[row][column] = null;
	}
	,newGame: function() {
		this.currentScore = 0;
		this.Score.set_text("0");
		var _g1 = 0, _g = piratepig.PiratePigGame.NUM_ROWS;
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = 0, _g2 = piratepig.PiratePigGame.NUM_COLUMNS;
			while(_g3 < _g2) {
				var column = _g3++;
				this.removeTile(row,column,false);
			}
		}
		var _g1 = 0, _g = piratepig.PiratePigGame.NUM_ROWS;
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = 0, _g2 = piratepig.PiratePigGame.NUM_COLUMNS;
			while(_g3 < _g2) {
				var column = _g3++;
				this.addTile(row,column,false);
			}
		}
		this.IntroSound.play();
		this.removeEventListener(flash.events.Event.ENTER_FRAME,$bind(this,this.this_onEnterFrame));
		this.addEventListener(flash.events.Event.ENTER_FRAME,$bind(this,this.this_onEnterFrame));
	}
	,initialize: function() {
		this.currentScale = 1;
		this.currentScore = 0;
		this.tiles = new Array();
		this.usedTiles = new Array();
		var _g1 = 0, _g = piratepig.PiratePigGame.NUM_ROWS;
		while(_g1 < _g) {
			var row = _g1++;
			this.tiles[row] = new Array();
			var _g3 = 0, _g2 = piratepig.PiratePigGame.NUM_COLUMNS;
			while(_g3 < _g2) {
				var column = _g3++;
				this.tiles[row][column] = null;
			}
		}
		this.Background = new flash.display.Sprite();
		this.Logo = new flash.display.Bitmap(openfl.Assets.getBitmapData("images/logo.png"));
		this.Score = new flash.text.TextField();
		this.TileContainer = new flash.display.Sprite();
	}
	,getPosition: function(row,column) {
		return new flash.geom.Point(column * 73,row * 73);
	}
	,findMatches: function(byRow,accumulateScore) {
		if(accumulateScore == null) accumulateScore = true;
		var matchedTiles = new Array();
		var max;
		var secondMax;
		if(byRow) {
			max = piratepig.PiratePigGame.NUM_ROWS;
			secondMax = piratepig.PiratePigGame.NUM_COLUMNS;
		} else {
			max = piratepig.PiratePigGame.NUM_COLUMNS;
			secondMax = piratepig.PiratePigGame.NUM_ROWS;
		}
		var _g = 0;
		while(_g < max) {
			var index = _g++;
			var matches = 0;
			var foundTiles = new Array();
			var previousType = -1;
			var _g1 = 0;
			while(_g1 < secondMax) {
				var secondIndex = _g1++;
				var tile;
				if(byRow) tile = this.tiles[index][secondIndex]; else tile = this.tiles[secondIndex][index];
				if(tile != null && !tile.moving) {
					if(previousType == -1) {
						previousType = tile.type;
						foundTiles.push(tile);
						continue;
					} else if(tile.type == previousType) {
						foundTiles.push(tile);
						matches++;
					}
				}
				if(tile == null || tile.moving || tile.type != previousType || secondIndex == secondMax - 1) {
					if(matches >= 2 && previousType != -1) {
						if(accumulateScore) {
							if(matches > 3) this.Sound5.play(); else if(matches > 2) this.Sound4.play(); else this.Sound3.play();
							this.currentScore += Math.pow(matches,2) * 50 | 0;
						}
						matchedTiles = matchedTiles.concat(foundTiles);
					}
					matches = 0;
					foundTiles = new Array();
					if(tile == null || tile.moving) {
						this.needToCheckMatches = true;
						previousType = -1;
					} else {
						previousType = tile.type;
						foundTiles.push(tile);
					}
				}
			}
		}
		return matchedTiles;
	}
	,dropTiles: function() {
		var _g1 = 0, _g = piratepig.PiratePigGame.NUM_COLUMNS;
		while(_g1 < _g) {
			var column = _g1++;
			var spaces = 0;
			var _g3 = 0, _g2 = piratepig.PiratePigGame.NUM_ROWS;
			while(_g3 < _g2) {
				var row = _g3++;
				var index = piratepig.PiratePigGame.NUM_ROWS - 1 - row;
				var tile = this.tiles[index][column];
				if(tile == null) spaces++; else if(spaces > 0) {
					var position = this.getPosition(index + spaces,column);
					tile.moveTo(0.15 * spaces,position.x,position.y);
					tile.row = index + spaces;
					this.tiles[index + spaces][column] = tile;
					this.tiles[index][column] = null;
					this.needToCheckMatches = true;
				}
			}
			var _g2 = 0;
			while(_g2 < spaces) {
				var i = _g2++;
				var row = spaces - 1 - i;
				this.addTile(row,column);
			}
		}
	}
	,construct: function() {
		this.Logo.smoothing = true;
		this.addChild(this.Logo);
		var font = openfl.Assets.getFont("fonts/FreebooterUpdated.ttf");
		var defaultFormat = new flash.text.TextFormat(font.fontName,60,0);
		defaultFormat.align = flash.text.TextFormatAlign.RIGHT;
		defaultFormat.align = flash.text.TextFormatAlign.LEFT;
		var contentWidth = 75 * piratepig.PiratePigGame.NUM_COLUMNS;
		this.Score.set_x(contentWidth - 200);
		this.Score.set_width(200);
		this.Score.set_y(12);
		this.Score.selectable = false;
		this.Score.set_defaultTextFormat(defaultFormat);
		this.Score.set_y(0);
		var _g = this.Score;
		_g.set_x(_g.get_x() + 90);
		this.Score.embedFonts = true;
		this.addChild(this.Score);
		this.Background.set_y(85);
		this.Background.get_graphics().beginFill(16777215,0.4);
		this.Background.get_graphics().drawRect(0,0,contentWidth,75 * piratepig.PiratePigGame.NUM_ROWS);
		this.TileContainer.set_x(14);
		this.TileContainer.set_y(this.Background.get_y() + 14);
		this.TileContainer.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$bind(this,this.TileContainer_onMouseDown));
		flash.Lib.get_current().get_stage().addEventListener(flash.events.MouseEvent.MOUSE_UP,$bind(this,this.stage_onMouseUp));
		this.addChild(this.TileContainer);
		this.IntroSound = openfl.Assets.getSound("soundTheme");
		this.Sound3 = openfl.Assets.getSound("sound3");
		this.Sound4 = openfl.Assets.getSound("sound4");
		this.Sound5 = openfl.Assets.getSound("sound5");
	}
	,addTile: function(row,column,animate) {
		if(animate == null) animate = true;
		var tile = null;
		var type = Math.round(Math.random() * (piratepig.PiratePigGame.tileImages.length - 1));
		var _g = 0, _g1 = this.usedTiles;
		while(_g < _g1.length) {
			var usedTile = _g1[_g];
			++_g;
			if(usedTile.removed && usedTile.parent == null && usedTile.type == type) tile = usedTile;
		}
		if(tile == null) tile = new piratepig.Tile(piratepig.PiratePigGame.tileImages[type]);
		tile.initialize();
		tile.type = type;
		tile.row = row;
		tile.column = column;
		this.tiles[row][column] = tile;
		var position = this.getPosition(row,column);
		if(animate) {
			var firstPosition = this.getPosition(-1,column);
			tile.set_x(firstPosition.x);
			tile.set_y(firstPosition.y);
			tile.moveTo(0.15 * (row + 1),position.x,position.y);
		} else {
			tile.set_x(position.x);
			tile.set_y(position.y);
		}
		this.TileContainer.addChild(tile);
		this.needToCheckMatches = true;
	}
	,__class__: piratepig.PiratePigGame
});
piratepig.Tile = function(imagePath) {
	flash.display.Sprite.call(this);
	var image = new flash.display.Bitmap(openfl.Assets.getBitmapData(imagePath));
	image.smoothing = true;
	this.addChild(image);
	this.mouseChildren = false;
	this.buttonMode = true;
	this.get_graphics().beginFill(0,0);
	this.get_graphics().drawRect(-5,-5,66,66);
};
$hxClasses["piratepig.Tile"] = piratepig.Tile;
piratepig.Tile.__name__ = ["piratepig","Tile"];
piratepig.Tile.__super__ = flash.display.Sprite;
piratepig.Tile.prototype = $extend(flash.display.Sprite.prototype,{
	this_onRemoveComplete: function() {
		this.parent.removeChild(this);
	}
	,this_onMoveToComplete: function() {
		this.moving = false;
	}
	,remove: function(animate) {
		if(animate == null) animate = true;
		animate = false;
		if(!this.removed) {
			if(animate) {
				this.mouseEnabled = false;
				this.buttonMode = false;
				this.parent.addChildAt(this,0);
				motion.Actuate.tween(this,0.6,{ alpha : 0, scaleX : 2, scaleY : 2, x : this.get_x() - this.get_width() / 2, y : this.get_y() - this.get_height() / 2}).onComplete($bind(this,this.this_onRemoveComplete));
			} else this.this_onRemoveComplete();
		}
		this.removed = true;
	}
	,moveTo: function(duration,targetX,targetY) {
		this.moving = true;
		motion.Actuate.tween(this,duration,{ x : targetX, y : targetY}).ease(motion.easing.Quad.get_easeOut()).onComplete($bind(this,this.this_onMoveToComplete));
	}
	,initialize: function() {
		this.moving = false;
		this.removed = false;
		this.mouseEnabled = true;
		this.buttonMode = true;
	}
	,__class__: piratepig.Tile
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe.Resource.content = [{ name : "NME_fonts_freebooterupdated_ttf", data : "s377351:b3k0Omhhc2hxOjExMW95Njphc2NlbnRkNzQwLjAxOXk0OmRhdGFhZDM2OC43NTZkODYwLjI5M2QzNjguNzU2ZDk0MC40NzZkMzI0LjY5OGQ5ODUuMzdkMjgwLjYzOWQxMDMwLjI2NGQyMDAuODc0ZDEwMzAuMjY0ZDEyMi43NzlkMTAzMC4yNjRkNzYuMDA2ZDk4NS45OTZkMjcuOThkOTQwLjg5M2QyNy45OGQ4NjMuMjE2ZDM3LjU4NWQ4NTguMjA1ZDU1LjU0M2Q4NDcuMzQ3ZDQzLjg0OWQ4MzEuNDc3ZDM0LjI0NGQ4MTEuMDE0ZDM1LjA3OWQ4MTAuMTc5ZDM3LjU4NWQ4MDguOTI2ZDQzLjg0OWQ4MDguOTI2ZDQ5LjI3OGQ4MDguOTI2ZDU3LjIxM2Q4MDkuNzYxZDY2LjQwMWQ4MDQuNzVkNjAuNTU0ZDc5Ni44MTVkNDkuMjc4ZDc4MC45NDZkNjYuNDAxZDc0Mi41MjVkMTEzLjE3NGQ3MjIuNDc5ZDE1Mi40M2Q3MDUuMzU3ZDIwMC40NTZkNzA1LjM1N2QyNTEuODIzZDcwNS4zNTdkMjk1LjI1NmQ3MjkuOTk2ZDM0MS4xOTRkNzU1Ljg4OWQzNjAuODIyZDgwMC45OTFkMzM3Ljg1M2Q4MTIuMjY3ZDMxNS43MTlkODI3LjcxOWQzNTEuNjM0ZDgyNy43MTlkMzYwLjgyMmQ4MjcuNzE5ZDM2NS44MzNkODI4Ljk3MmQzNjIuNDkyZDgzMy41NjZkMzQyLjQ0NmQ4NTcuMzdkMzQzLjY5OWQ4NTguNjIzZDM2My43NDVkODU4LjYyM2QzNjguNzU2ZDg2MC4yOTNkMjk1LjY3M2Q4NzQuNDkyZDI5Ni4wOTFkODczLjY1N2QzMDkuMDM3ZDg3NS43NDVkMzI5LjkxOGQ4NzYuNThkMzMwLjc1M2Q4NzUuMzI3ZDMxMS4xMjVkODY0Ljg4N2QyOTEuMDc5ZDg0OS44NTNkMjY4LjExZDczOS4xODRkMTg0LjE2OWQ3MzkuMTg0ZDk5LjM5M2Q3MzkuMTg0ZDk5LjM5M2Q4MzQuODE4ZDk5LjM5M2Q4OTAuNzc5ZDEyNi4xMmQ5NDQuMjM0ZDEyNS4yODVkOTQ1LjQ4N2QxMDYuMDc1ZDk0MS43MjlkODEuNDM1ZDkzOS42NDFkODAuNmQ5NDAuNDc2ZDE0MS45OWQ5NzUuNTU2ZDE4MS4yNDZkOTk1LjE4NGQyMDcuOTczZDk5NS4xODRkMjk3LjM0NGQ5OTUuMTg0ZDI5Ny4zNDRkOTAwLjM4NGQyOTcuMzQ0ZDg4Ny44NTZkMjk1LjY3M2Q4NzQuNDkyaHk2Ol93aWR0aGQzOTUuOTAyeTQ6eE1heGQzNjguNzU2eTQ6eE1pbmQyNy45OHk0OnlNYXhkMzE4LjY0Mnk0OnlNaW5kLTYuMjY0eTc6X2hlaWdodGQyOTAuNjYyeTc6bGVhZGluZ2QweTc6ZGVzY2VudGQyODMuOTh5ODpjaGFyQ29kZWkxMTF5MTU6bGVmdHNpZGVCZWFyaW5nZDI3Ljk4eTEyOmFkdmFuY2VXaWR0aGQzOTUuOTAyeTg6Y29tbWFuZHNhaTFpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTJpMmkxaTJpM2kyaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2hnOjIyM29SMWQ3NDAuMDE5UjJhZDQ3Mi4zMjZkOTEyLjA3OGQ0NzIuMzI2ZDEwMjYuNTA1ZDQwNS4wODlkMTA2OS45MzhkMzkxLjMwOGQxMDc4LjcwN2QzMzcuODUzZDExMDIuNTEyZDI5Ni41MDhkMTEyMC44ODdkMjcxLjQ1MWQxMTIwLjg4N2QyNDcuMjNkMTEyMC44ODdkMjQwLjEzZDExMDMuMzQ3ZDIzMy44NjZkMTEwNC4xODJkMjMzLjg2NmQxMDk5LjU4OGQyMzMuODY2ZDEwOTcuMDgzZDIzNS41MzZkMTA5MS40NDVkMjM3LjIwN2QxMDg1LjgwN2QyMzcuMjA3ZDEwODIuODg0ZDIzNy4yMDdkMTA3Ni4yMDJkMjI4Ljg1NGQxMDc2LjIwMmQyNTEuODIzZDEwNzYuMjAyZDI4Ny43MzhkMTA2OC4yNjdkMzMyLjAwNmQxMDU4LjY2MmQzMzguNjg4ZDEwNDUuNzE2ZDM1Mi44ODdkMTA0MS45NTdkMzYyLjkxZDEwMTQuODEyZDM2OC4zMzlkMTAwMC4xOTVkMzc2LjY5MWQ5NzUuMTM4ZDM3NS44NTZkOTcyLjYzMmQzNzUuODU2ZDk3MC41NDRkMzc1Ljg1NmQ5NjYuNzg2ZDM4MC4wMzJkOTY2Ljc4NmQzODEuMjg1ZDk2Ni43ODZkMzgxLjI4NWQ5NjcuNjIxZDM4Mi41MzhkOTY2LjM2OGQzODMuMzczZDk2OC44NzRkMzkxLjMwOGQ5NzUuMTM4ZDM4NC42MjZkOTU3LjE4MWQzODMuNzkxZDk1OC44NTFkMzgzLjM3M2Q5NTcuNTk4ZDM2OC4zMzlkOTQyLjE0NmQzNTMuMzA1ZDkyNi42OTRkMzUzLjMwNWQ5MjMuMzUzZDM4OC4zODRkOTM5LjY0MWQ0MTEuNzcxZDk0OC40MTFkNDEyLjE4OWQ5NDcuMTU4ZDQxMy4wMjRkOTQ3LjE1OGQzNzcuOTQ0ZDkwNC4xNDNkMzc3Ljk0NGQ4NDIuMzM2ZDM1OC43MzRkODEzLjUyZDMzNC4wOTRkNzc2LjM1MmQyNzEuMDM0ZDc3Ni4zNTJkMjcxLjAzNGQ3NDguMzcxZDI5MS4wNzlkNzQ4LjM3MWQyOTkuMDE0ZDc0MS42OWQzMDQuNDQzZDczNy4wOTZkMzE4LjIyNWQ3MjUuNDAyZDM1Ny44OThkNzAxLjU5OGQzNTcuODk4ZDY1My45OWQzNTcuODk4ZDYwNi4zODFkMzAxLjEwMmQ1ODMuODNkMjU2LjgzNWQ1NjYuMjlkMjQxLjM4M2Q1NjYuMjlkMjE1LjQ5MWQ1NjYuMjlkMTk4Ljc4NmQ1ODguNDI0ZDE5NS44NjJkNTg4Ljg0MWQxODkuMTgxZDU4OS42NzZkMTg2LjI1N2Q1OTMuNDM1ZDE4OC4zNDVkNTk4LjAyOWQxOTMuNzc0ZDYwNS45NjRkMTkzLjc3NGQ2MzQuMzYyZDE5Ni42OThkNjc3LjM3NmQyMDAuNDU2ZDczMy43NTVkMjAwLjAzOWQ3NDIuOTQyZDE5MS42ODZkODk2LjYyNmQxOTAuMDE2ZDkyNy45NDdkMjA1LjA1ZDk2NS45NTFkMTk0LjE5MmQxMDE4LjE1M2QxNjQuMTIzZDEwMTkuODIzZDExMC4yNTFkMTAyOS4wMTFkODIuMjdkMTAyNy4zNGQ4My41MjNkMTAyNi45MjNkODMuNTIzZDEwMjYuMDg4ZDgzLjUyM2QxMDI1LjY3ZDY5Ljk1MWQxMDE4LjM2MmQ1Ni4zNzhkMTAxMS4wNTNkNTYuMzc4ZDEwMDcuMjk1ZDU2Ljc5NmQxMDA1LjIwN2Q1OC40NjZkMTAwMy45NTRkODEuNDM1ZDk4NS4xNjFkODguNTM1ZDk4MS40MDJkOTUuMjE2ZDk2NS4xMTVkODkuMzdkOTUxLjMzNGQ4Ni40NDZkOTM1LjQ2NGQ4OC41MzVkOTM0LjYyOWQ5MS40NThkOTMxLjcwNmQxMTIuMzM5ZDk0MC40NzZkMTU0LjkzNmQ5NTQuNjc1ZDE1Ni4xODlkOTU0LjI1N2Q5OC41NTdkODY5LjA2M2Q5OC4xNGQ4MDguNTA4ZDEzNi4xNDNkNzYzLjgyM2QxMDYuOTFkNzUwLjA0MmQ5OC41NTdkNzM1LjYzNGQ5MC4yMDVkNzIxLjIyNmQ5MS44NzZkNjg4LjIzNGQ5Ni4wNTJkNjg0Ljg5M2QxMDcuMzI3ZDY4OC4yMzRkMTE1LjY4ZDY5Mi40MTFkMTE2LjkzM2Q2OTEuNTc1ZDExNS4yNjJkNjg4LjIzNGQ5OC45NzVkNjUxLjA2NmQ4OC41MzVkNjI3LjI2MmQ4OC41MzVkNjA4LjA1MmQ4OC41MzVkNTg4LjQyNGQxMDMuMTUxZDU3NC42NDJkMTMxLjU0OWQ1MzMuNzE2ZDE3OC43NGQ1MzIuNDYzZDIxMC4wNjFkNTMxLjYyOGQyMjUuNTEzZDUzMS42MjhkNDMzLjA3ZDUzMS42MjhkNDMzLjA3ZDY0Ni44OWQ0MzMuMDdkNzIwLjgwOWQzNjIuNDkyZDc1Mi45NjVkNDEwLjEwMWQ3NjMuODIzZDQ0Mi42NzVkODE1LjE5ZDQ3Mi4zMjZkODYxLjk2NGQ0NzIuMzI2ZDkxMi4wNzhoUjNkNTAyLjgxMlI0ZDQ3Mi4zMjZSNWQ1Ni4zNzhSNmQ0OTIuMzcxUjdkLTk2Ljg4N1I4ZDQzNS45OTNSOWQwUjEwZDI4My45OFIxMWkyMjNSMTJkNTYuMzc4UjEzZDUwMi44MTJSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kyaTJpMmkyaTNpM2kzaTNpM2kyaTNpM2kzaTJpMmkyaTJpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTEwb1IxZDc0MC4wMTlSMmFkNjQuMzEzZDk5NC4zNDlkNjYuNDAxZDk3OC44OTdkNjYuNDAxZDkxOC4zNDJkODYuMDI5ZDkyMS42ODNkNjUuNTY2ZDg5Ny4wNDRkNjUuNTY2ZDgzNC44MThkNjUuNTY2ZDgwNi40MmQ2NS41NjZkNzY1LjQ5NGQ1MS4zNjdkNzY1LjQ5NGQ0MS4zNDRkNzY1LjQ5NGQyMi4xMzNkNzc3LjE4N2Q0Ni43NzNkNzM3LjUxM2Q3My45MThkNzE4LjcyMWQ5Ny4zMDVkNzAyLjQzM2QxNDQuNDk1ZDY4OC42NTJkMTQ0LjQ5NWQ2OTUuNzUyZDE0My4yNDNkNzM2LjI2MWQxMjAuNjkxZDc1OC44MTJkMTI5LjA0NGQ3NTUuMDUzZDEzOC42NDlkNzUzLjhkMTQzLjY2ZDc1Ny45NzdkMTgxLjI0NmQ3MjUuNDAyZDE4OC4zNDVkNzIwLjgwOWQyMTEuMzE0ZDcwNi4xOTJkMjQzLjQ3MWQ3MDYuMTkyZDM3MC40MjdkNzA2LjE5MmQzNzAuNDI3ZDg1OC42MjNkMzcwLjQyN2Q4NzguMjUxZDM2Ny43MTJkOTE3LjUwN2QzNjQuOTk4ZDk1Ni43NjNkMzY0Ljk5OGQ5NzYuMzkxZDM2NC45OThkOTgwLjU2N2QzNjcuOTIxZDk5MC41OWQzODIuMTJkOTk1LjE4NGQ0MDkuNjgzZDEwMTEuNDcxZDM5NS4wNjZkMTAxOS44MjNkMzcyLjA5N2QxMDE3LjczNWQzMzQuMDk0ZDEwMTkuODIzZDI4OC4xNTZkMTAyMi4zMjlkMjczLjUzOWQxMDIyLjMyOWQyNTAuMTUzZDEwMjIuMzI5ZDIzNS45NTRkMTAxNS42NDdkMjQ4LjlkMTAwMy41MzZkMjY5LjM2M2QxMDAxLjAzZDI4My41NjJkOTg4LjkyZDI4Ni40ODZkOTc2LjgwOWQyODYuNDg2ZDk2NC42OThkMjk2LjkyNmQ5NTAuMDgxZDMwNy43ODRkOTIyLjkzNmQzMDUuNjk2ZDkyMC40M2QyOTUuNjczZDkyNS4wMjRkMjg2LjQ4NmQ5MzQuNjI5ZDI4Ni40ODZkOTIwLjQzZDI4OC43ODNkODkxLjYxNWQyOTEuMDc5ZDg2Mi43OTlkMjkxLjA3OWQ4NDguNmQyOTEuMDc5ZDc1OC4zOTRkMjQzLjg4OWQ3NTguMzk0ZDE4OS4xODFkNzU4LjM5NGQxNDUuMzMxZDc5OC40ODZkMTQ2LjE2NmQ4MDEuNDA5ZDE0Ni4xNjZkODA1LjU4NWQxNDYuMTY2ZDgzMi4zMTNkMTIwLjY5MWQ4NzUuMzI3ZDE0OC42NzJkODUyLjM1OGQxNDIuODI1ZDk4Ny42NjdkMTQyLjQwN2Q5OTkuNzc4ZDE2MC4zNjVkMTAwOC45NjVkMTc0LjE0NmQxMDE0LjM5NGQxODguMzQ1ZDEwMTkuODIzZDE4My4zMzRkMTAyNS4yNTJkMTczLjMxMWQxMDM1LjY5M2QxNTIuMDEzZDEwMzAuNjgxZDEyNS43MDNkMTAyOS40MjlkMTA3Ljc0NWQxMDI4LjU5M2Q3OC4wOTRkMTAyOS44NDZkNDEuMzQ0ZDEwMzEuMDk5ZDMwLjQ4NmQxMDMxLjA5OWQxNS4wMzRkMTAyNS42N2QzMi41NzRkMTAxOC4xNTNkNjQuMzEzZDk5NC4zNDloUjNkNDE5LjcwNlI0ZDQwOS42ODNSNWQxNS4wMzRSNmQzMzUuMzQ3UjdkLTExLjY5M1I4ZDMyMC4zMTNSOWQwUjEwZDI4My45OFIxMWkxMTBSMTJkMTUuMDM0UjEzZDQxOS43MDZSMTRhaTFpM2kyaTNpMmkzaTNpM2kzaTJpMmkyaTNpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTJpM2hnOjIyMm9SMWQ3NDAuMDE5UjJhZDQzOC40OTlkODM5LjQxMmQ0MzguNDk5ZDk4NC4zMjZkMjg2LjkwM2Q5ODQuMzI2ZDIwNC4yMTVkOTg0LjMyNmQyMDQuMjE1ZDkzNS4wNDdkMjA0LjIxNWQ5MTQuMTY2ZDIxOC44MzFkODgxLjE3NGQyMTcuOTk2ZDk0MC44OTNkMjUzLjkxMWQ5NDAuODkzZDI4OS40MDlkOTQwLjg5M2QzMjIuODE4ZDkwMi4wNTVkMzM5LjUyM2Q5MDIuNDczZDM1Mi44ODdkOTAyLjA1NWQzNTMuNzIyZDkwMS4yMmQzMzQuNTEyZDg3Mi44MjJkMzM5LjUyM2Q4NDkuMDE3ZDMzOS41MjNkODM4LjE1OWQzMzkuNTIzZDc1MC40NmQyMDIuNTQ0ZDc1MC40NmQxODcuOTI4ZDc1OC44MTJkMTgzLjMzNGQ4NDAuNjY1ZDE4My4zMzRkOTQyLjU2NGQxODMuMzM0ZDEwMTguNTdkMTkyLjUyMmQxMTExLjI4MmQyMDQuNjMyZDExMzEuNzQ1ZDIxNS40OTFkMTE1MC4xMmQyMjQuNjc4ZDExNTguNDczZDIwOC4zOTFkMTE2NC43MzdkMjAyLjU0NGQxMTY1LjE1NGQxOTEuMjY5ZDExNjUuNTcyZDE2Mi40NTNkMTE3Mi4yNTRkNzQuNzUzZDExOTIuM2QyNS44OTJkMTE5NC44MDVkNC41OTNkMTE4Mi42OTRkMjQuNjM5ZDExNjguNDk1ZDg4LjUzNWQxMTQzLjg1NmQ5Mi4yOTNkMTEyMS4zMDVkOTIuMjkzZDEwNjQuOTI2ZDkyLjI5M2QxMDE4LjE1M2Q4OS43ODdkOTQ4LjQxMWQ5My4xMjhkOTQ2LjMyM2QxMzkuMDY2ZDk2Mi42MWQxMjMuMTk3ZDk0OS4yNDZkOTMuOTY0ZDkyMC4wMTNkOTMuOTY0ZDkxMC40MDdkOTMuOTY0ZDg5OS41NDlkOTYuODg3ZDgyNy43MTlkOTguOTc1ZDc3Ni43NjlkOTUuNjM0ZDc0NS4wM2QxMTAuNjY4ZDczNS40MjVkMTMyLjM4NGQ3MjYuNjU1ZDkwLjIwNWQ3MjYuNjU1ZDg3LjY5OWQ3MjQuNTY3ZDk2LjQ2OWQ2OTguMjU3ZDk2LjQ2OWQ2NTIuMzE5ZDgwLjE4MmQ1ODIuOTk1ZDQ4LjQ0M2Q1NzQuMjI1ZDE1Ljg2OWQ1NjQuMjAyZDQ1LjEwMmQ1NTQuMTc5ZDg0LjM1OGQ1NTQuMTc5ZDE1NS43NzFkNTU0LjE3OWQxNjIuODcxZDU5Ny4xOTRkMTY4LjNkNTk4Ljg2NGQxNzIuMjY3ZDY1Mi41MjhkMTc2LjIzNGQ3MDYuMTkyZDE4MS4yNDZkNzA2LjYxZDI2My4wOTlkNzEzLjI5MmQzNDIuMDI5ZDcxOS41NTZkMzgxLjcwM2Q3NDAuODU0ZDQzOC40OTlkNzcwLjkyM2Q0MzguNDk5ZDgzOS40MTJoUjNkNDY3LjMxNFI0ZDQzOC40OTlSNWQ0LjU5M1I2ZDQ2OS44MlI3ZC0xNzAuODA1UjhkNDY1LjIyNlI5ZDBSMTBkMjgzLjk4UjExaTIyMlIxMmQ0LjU5M1IxM2Q0NjcuMzE0UjE0YWkxaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kyaTJpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2hnOjEwOW9SMWQ3NDAuMDE5UjJhZDYxLjgwN2Q5ODcuMjQ5ZDcwLjE1OWQ5NzYuODA5ZDY2LjQwMWQ5NDMuODE3ZDY4LjQ4OWQ5NDIuMTQ2ZDkxLjg3NmQ5NDguODI4ZDkyLjcxMWQ5NDguNDExZDg4Ljk1MmQ5NDAuODkzZDY1LjU2NmQ4OTcuNDYxZDg0LjM1OGQ5MDUuODE0ZDY3LjY1NGQ4ODcuNDM4ZDY2LjQwMWQ4MjEuODcyZDY1LjE0OGQ3NjhkMzkuMjU2ZDc2OGQyNy45OGQ3NjhkMTMuMzYzZDc3OC40NGQ0Ni43NzNkNzM4LjM0OWQ2My40NzdkNzE4LjMwM2Q4OC41MzVkNzA3Ljg2MmQxMTQuMDA5ZDcwMi44NTFkMTQzLjI0M2Q2OTMuNjYzZDE0Mi40MDdkNzM3LjUxM2QxNDQuOTEzZDc0OS42MjRkMjAyLjEyN2Q3MDQuMTA0ZDI1Ny42N2Q3MDQuMTA0ZDI5NS42NzNkNzA0LjEwNGQzMjUuMzI0ZDcyMy4zMTRkMzI0LjkwN2Q3MzcuOTMxZDMyOC42NjVkNzY1LjA3NmQzNDMuMjgyZDczMi4wODRkMzU5LjU2OWQ3NTguODEyZDQxNS4xMTJkNzA0LjkzOWQ0NzcuNzU1ZDcwNC45MzlkNTQ0LjU3NGQ3MDQuOTM5ZDU3MC44ODRkNzUwLjQ2ZDU5MC41MTJkNzg0LjI4N2Q1OTAuNTEyZDg1Ni41MzVkNTkwLjUxMmQ4NjEuMTI4ZDU4MS43NDJkODY5LjA2M2Q1NjUuMDM3ZDg4NS43NjhkNTg5LjY3NmQ5MDAuODAyZDU4OC40MjRkOTQzLjM5OWQ1ODguMDA2ZDk2MS43NzRkNTkzLjAxN2Q5ODYuNDE0ZDYwNS4xMjhkOTkzLjA5NmQ2MzMuNTI2ZDEwMTEuMDUzZDYzMy4xMDlkMTAxOC41N2Q2MTguNDkyZDEwMjAuMjQxZDYwOC40NjlkMTAyMC4yNDFkNTUyLjA5MWQxMDE3LjMxOGQ1MTEuNTgyZDEwMTUuMjNkNDg1LjY5ZDEwMTguMTUzZDQ3MC4yMzhkMTAxMC42MzZkNDcwLjY1NWQxMDA5LjhkNDk3LjhkOTkxLjQyNWQ0OTkuODg5ZDk4OS4zMzdkNTEwLjMyOWQ5NzguMDYxZDUxMC43NDdkOTU2Ljc2M2Q1MTEuMTY0ZDk1Ni4zNDVkNTMxLjIxZDk2Ny42MjFkNTMyLjA0NWQ5NjYuNzg2ZDUxNC4wODhkOTI5LjJkNTE0LjA4OGQ5MTUuODM2ZDUxNC4wODhkOTA4LjMxOWQ1MTUuMTMyZDg5My4wNzZkNTE2LjE3NmQ4NzcuODMzZDUxNi4xNzZkODcwLjMxNmQ1MTYuMTc2ZDc1Mi41NDhkNDU2LjAzOWQ3NTIuNTQ4ZDQwMC45MTNkNzUyLjU0OGQzNjcuOTIxZDc5OS43MzhkMzY4LjMzOWQ4MDYuNDJkMzU1LjM5M2Q4NDIuNzUzZDM1Ny40ODFkODQzLjU4OGQzNTkuNTY5ZDg0NC44NDFkMzY1LjgzM2Q4NDEuOTE4ZDM2Ny45MjFkODQxLjkxOGQzNzAuMDA5ZDg0NC44NDFkMzY2LjY2OGQ4ODUuMzVkMzY2LjY2OGQ4ODcuMDIxZDM2NS40MTVkOTE4Ljc2ZDM2NC41OGQ5NDAuODkzZDM2NS40MTVkOTUzLjAwNGQzNjYuNjY4ZDk3MS43OTdkMzcyLjA5N2Q5ODUuMTYxZDQwMi4xNjZkOTk2LjAxOWQ0MTUuNTNkMTAxMi4zMDZkNDAwLjQ5NWQxMDIxLjQ5NGQyNDkuMzE4ZDEwMTYuNDgyZDIzOS4yOTVkMTAwMy4xMTlkMjYxLjAxMWQ5OTguOTQyZDI4MS40NzRkOTkwLjE3MmQyODkuODI3ZDk3Ni44MDlkMjg5LjgyN2Q5MTkuNTk1ZDI4OS44MjdkOTA3LjQ4NGQyOTEuMDc5ZDg4My4yNjJkMjkyLjMzMmQ4NTkuMDRkMjkyLjMzMmQ4NDYuOTI5ZDI5Mi4zMzJkNzUxLjcxMmQyMzAuNTI1ZDc1MS43MTJkMjA2LjcyMWQ3NTEuNzEyZDE3Ny45MDVkNzY1LjA3NmQxNDQuMDc4ZDc4MC45NDZkMTQ0LjkxM2Q4MDEuODI3ZDEyOC42MjZkODExLjQzMmQxMTguNjAzZDgyOS4zODlkMTQzLjI0M2Q4MTkuNzg0ZDE0Mi44MjVkOTA2LjY0OWQxNDIuNDA3ZDk1Ni4zNDVkMTQ3LjQxOWQ5ODUuOTk2ZDE2My4yODhkOTkxLjQyNWQxODcuMDkyZDEwMDYuNDZkMTY0LjEyM2QxMDIwLjY1OWQxMDkuNDE1ZDEwMjAuNjU5ZDgxLjg1M2QxMDIwLjY1OWQyNi4zMDlkMTAxNi40ODJkMTUuNDUxZDEwMDYuODc3ZDI4LjM5OGQ5OTYuNDM3ZDYxLjgwN2Q5ODcuMjQ5aFIzZDY0MS40NjFSNGQ2MzMuNTI2UjVkMTMuMzYzUjZkMzMwLjMzNlI3ZDIuNTA1UjhkMzE2Ljk3MlI5ZDBSMTBkMjgzLjk4UjExaTEwOVIxMmQxMy4zNjNSMTNkNjQxLjQ2MVIxNGFpMWkyaTJpMmkyaTJpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTJpM2kyaTJpM2kzaTJpMmkzaTNpMmkyaTNpM2kyaTJpMmkzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kzaTNpMmkzaGc6MjIxb1IxZDc0MC4wMTlSMmFkMzkuMjU2ZDU0NC41NzRkNTcuMjEzZDU0Mi4wNjhkNzcuNjc2ZDU0Mi4wNjhkOTYuODg3ZDU0Mi4wNjhkMTM0LjY4MWQ1NDUuMmQxNzIuNDc2ZDU0OC4zMzJkMTkxLjY4NmQ1NDguMzMyZDIwNC4yMTVkNTQ4LjMzMmQyMjkuMDYzZDU0Mi42OTRkMjUzLjkxMWQ1MzcuMDU3ZDI2Ni40NGQ1MzcuMDU3ZDI2OS43ODFkNTM3Ljg5MmQyNjkuNzgxZDU0NC45OTFkMjM2LjM3MWQ1NjIuOTQ5ZDIwMC4wMzlkNTgyLjU3N2QxOTUuNDQ1ZDU4OS4yNTlkMjIyLjU5ZDYzNS4xOTdkMjc5LjgwNGQ3MjQuOTg1ZDI3OS44MDRkNzI3LjA3M2QyNjkuMzYzZDc2MC4wNjVkMjcwLjYxNmQ3NjIuMTUzZDI3OS4zODZkNzU0LjIxOGQyOTIuNzVkNzQ4LjM3MWQzMDEuOTM4ZDc1MC44NzdkMzExLjU0M2Q3NzIuMTc2ZDM2My4zMjdkNzAwLjM0NWQzNzUuODU2ZDY4MS41NTNkNDEwLjkzNmQ2MjguOTMzZDQyOS43MjlkNTg1LjA4M2Q0NTIuNjk4ZDU4MC40ODlkNDI5LjMxMWQ1NjEuNjk2ZDM5NS4wNjZkNTQxLjIzM2QzOTQuNjQ5ZDU0Mi40ODZkNDU0Ljc4NmQ1NDUuODI3ZDQ5NC44NzdkNTQ1LjgyN2Q1MjYuNjE2ZDU0NS44MjdkNTQ1LjgyN2Q1NDMuNzM4ZDU0Ni4yNDRkNTQ1LjgyN2Q0NzcuNzU1ZDU4Ni43NTNkMzQzLjI4MmQ4MTMuNTJkMzQxLjYxMWQ4MTYuNDQzZDM0MS42MTFkODc4LjY2OGQzNDEuNjExZDg4MC43NTZkMzQ0LjExN2QxMTA0LjE4MmQzNTcuMDYzZDExMjAuNDY5ZDM3Ny4xMDlkMTEyMC40NjlkNDEzLjQ0MmQxMTI3LjE1MWQ0MjguMDU4ZDExNDguNDVkMjgyLjcyN2QxMTUwLjUzOGQxNjAuMzY1ZDEyMDMuOTkzZDE4Ni42NzVkMTE3Mi42NzJkMTYwLjM2NWQxMTY4LjQ5NWQxOTMuMzU3ZDExNTMuMDQ0ZDIyOS42OWQxMTI3LjE1MWQyNDMuMDUzZDEwOTguNzUzZDI0My4wNTNkMTAzMC4yNjRkMjQzLjA1M2QxMDAxLjg2NmQyMzkuMjk1ZDk4Ny42NjdkMjUwLjk4OGQ5NzEuMzhkMjc2Ljg4ZDk1OS42ODZkMjc1LjIxZDk1OC40MzNkMjc0Ljc5MmQ5NTcuNTk4ZDI3NS4yMWQ5NTYuNzYzZDI3Ni4wNDVkOTU2Ljc2M2QyNzEuNDUxZDk1Mi4xNjlkMjUzLjA3NmQ5NDguNDExZDIzNy4yMDdkOTQ1LjA3ZDIzMy40NDhkOTM2LjNkMjM4LjQ2ZDkxNS4wMDFkMjM4LjQ2ZDg5Mi4wMzJkMjM4LjQ2ZDg1NS42OTlkMjIxLjMzN2Q4MjQuNzk2ZDIxMi4xNWQ4MDkuNzYxZDE4OS41OThkNzYyLjU3ZDE4My4zMzRkNzQ3Ljk1NGQxNzEuNjQxZDczOC43NjZkMTcyLjg5M2Q3MzguMzQ5ZDE5OC43ODZkNzMwLjQxNGQxOTguMzY4ZDcyOS41NzlkMTcwLjM4OGQ3MjIuMDYxZDE1Ni42MDZkNzE0LjU0NGQxNzcuMDdkNzAyLjAxNmQxNzYuMjM0ZDcwMC4zNDVkMTQ3LjAwMWQ2OTQuOTE2ZDEzNC40NzNkNjg0Ljg5M2QxMTcuNzY4ZDY0OC41NjFkOTMuNTQ2ZDU5NS41MjNkNzQuNzUzZDU4NS4wODNkMTkuMjFkNTY4Ljc5NmQzOS4yNTZkNTQ0LjU3NGQyMzIuMTk1ZDQ0Mi42NzVkMzY3LjUwNGQzNTQuOTc1ZDM2Ny41MDRkMzIyLjgxOGQzNjcuNTA0ZDMyMC43M2QzNDYuODMxZDMwMi45ODJkMzI2LjE1OWQyODUuMjMzZDMyMy4yMzZkMjg1LjIzM2QzMDQuNDQzZDI4NS4yMzNkMjcxLjAzNGQzNTMuNzIyZDI2My45MzRkMzY3LjkyMWQyMzIuMTk1ZDQ0Mi42NzVoUjNkNTY1LjQ1NVI0ZDU0Ni4yNDRSNWQxOS4yMVI2ZDczOC43NjZSN2QtMTc5Ljk5M1I4ZDcxOS41NTZSOWQwUjEwZDI4My45OFIxMWkyMjFSMTJkMTkuMjFSMTNkNTY1LjQ1NVIxNGFpMWkzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTNpM2kzaTJpM2kyaTNpM2kyaTNpM2kzaTJpM2kyaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkyaTJpM2kyaTNpM2kyaTNpMmkxaTNpM2kzaTNpM2hnOjEwOG9SMWQ3NDAuMDE5UjJhZDIuNTA1ZDEwMDUuNjI0ZDI2LjMwOWQ5OTkuMzZkNTMuODcyZDk4OC45MmQ2My40NzdkOTc4Ljg5N2Q2My40NzdkODQ3LjM0N2Q2My40NzdkNzQwLjQzN2Q2MS4zODlkNjg5LjkwNWQ2Mi4yMjVkNjg4LjIzNGQ2My44OTVkNjg4LjIzNGQ3MS42MjFkNjk2LjM3OGQ3OS4zNDdkNzA0LjUyMmQ4MC4xODJkNzA0LjUyMmQ4MS4wMTdkNzAzLjI2OWQ3Mi42NjVkNjg2LjU2NGQ2Ni44MThkNjUyLjczN2Q2MC45NzJkNjE2LjQwNGQ1NC43MDdkNjAxLjM3ZDQxLjM0NGQ1OTQuNjg4ZDI0LjIyMWQ2MDMuMDRkNS44NDZkNjE5LjMyN2QxOC4zNzVkNTg4LjQyNGQ1NC4yOWQ1NjYuNzA3ZDY1LjU2NmQ1NjAuMDI2ZDExOC42MDNkNTMyLjA0NWQxMTcuNzY4ZDU1Mi4wOTFkMTM4LjY0OWQ1MzIuMDQ1ZDEzOC4yMzFkNTY2LjcwN2QxMzkuMDY2ZDYzMi42OTFkMTQwLjMxOWQ3MzIuOTJkMTM1LjMwOGQ3NDcuOTU0ZDEyOC42MjZkNzY4LjQxN2QxNDAuMzE5ZDc4MS43ODFkMTQwLjMxOWQ3ODUuMTIyZDE0MC4zMTlkODEyLjY4NWQxMzcuMzk2ZDg0MS45MThkMTI0Ljg2N2Q4MzIuNzNkMTIzLjYxNWQ4MzQuNDAxZDEzMC43MTRkODU0LjAyOWQxMzguMjMxZDg5Mi44NjdkMTM5LjA2NmQ5NDMuODE3ZDEzOS40ODRkOTc5LjMxNGQxNDguMjU0ZDk5Mi4yNjFkMTYwLjM2NWQ5OTQuNzY2ZDE4MS42NjNkMTAwMS4wM2QxOTAuNDMzZDEwMDQuNzg5ZDE5Ny45NTFkMTAxMi4zMDZkMTY1LjM3NmQxMDIzLjE2NGQ2Ni40MDFkMTAyMy4xNjRkMTIuMTFkMTAyMy4xNjRkMi41MDVkMTAwNS42MjRoUjNkMTk3Ljk1MVI0ZDE5Ny45NTFSNWQyLjUwNVI2ZDQ5MS45NTRSN2QwLjgzNVI4ZDQ4OS40NDhSOWQwUjEwZDI4My45OFIxMWkxMDhSMTJkMi41MDVSMTNkMTk3Ljk1MVIxNGFpMWkzaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2kzaTJpMmkzaTJpM2kzaTNpMmkyaTNpMmkzaTNpM2kzaTJpMmhnOjIyMG9SMWQ3NDAuMDE5UjJhZDI5LjIzM2Q1NjkuNjMxZDE5LjIxZDU0Ny45MTVkMzkuMjU2ZDU0My4zMjFkNDAuNTA4ZDU0Mi40ODZkOTAuNjIzZDU0Mi40ODZkMTU0LjUxOGQ1NjIuOTQ5ZDE1Ny44NTlkNTYyLjUzMWQxNTcuODU5ZDU1Ny4xMDJkMTU3Ljg1OWQ1NTQuNTk3ZDE1Ny4wMjRkNTUwLjgzOGQxNjkuMTM1ZDU0My4zMjFkMjY2Ljg1OGQ1NDIuNDg2ZDI3Ni44OGQ1NTYuMjY3ZDI2Ny4yNzVkNTcxLjcxOWQyNDIuNjM2ZDU3Mi41NTRkMjMyLjYxM2Q1NzMuODA3ZDIxMi41NjdkNTc2LjMxM2QxOTkuMjAzZDU4Mi45OTVkMTk1LjQ0NWQ1OTguMDI5ZDE5NS40NDVkNjIxLjQxNWQxOTUuNDQ1ZDY0OC45NzhkMjAwLjg3NGQ2ODguMjM0ZDE2Mi40NTNkNzIyLjg5N2QxOTYuNjk4ZDcyNC41NjdkMTk0LjE5MmQ3NjMuODIzZDE5NC4xOTJkNzk3LjIzM2QxOTQuMTkyZDg1OS44NzZkMjAyLjU0NGQ5MDIuODlkMTkzLjc3NGQ5MTcuOTI0ZDE4NS44NGQ5MzYuM2QxODcuNTFkOTM3LjU1M2QyMDcuNTU2ZDkyOC43ODNkMjA5LjIyNmQ5MjkuNjE4ZDIzMy4wM2Q5OTUuNjAxZDMxMi43OTZkOTk1LjYwMWQ0NTIuNjk4ZDk5NS42MDFkNDUyLjY5OGQ4MzMuNTY2ZDQ1Mi42OThkNzM3LjUxM2Q0NDEuMDA0ZDcwMS41OThkNDQ3LjY4NmQ2OTkuMDkyZDQ1OC41NDRkNzAxLjU5OGQ0NTYuNDU2ZDcwMS41OThkNDU5LjM4ZDY5OC4yNTdkNDQ3LjI2OWQ2NzAuMjc3ZDQ0NS41OThkNjI3LjY4ZDQ0NC4zNDVkNTg4LjAwNmQ0MzUuNTc1ZDU3Ni43M2Q0MjAuOTU5ZDU1Ny41MmQzNzEuNjhkNTU4Ljc3M2QzNjYuNjY4ZDU1Ny45MzhkMzYyLjkxZDU0My4zMjFkMzk2LjczN2Q1MjkuNTM5ZDQ3Ny43NTVkNTI5LjEyMmQ1MjEuMTg3ZDUyOC43MDRkNTU0LjE3OWQ1NDcuOTE1ZDU1NS4wMTRkNTU3LjEwMmQ0OTYuOTY1ZDU2Ny45NmQ0ODAuNjc4ZDU2MS4yNzhkNDc5LjQyNWQ1NjIuOTQ5ZDQ5OS44ODlkNTkwLjA5NGQ0OTkuNDcxZDU5NC42ODhkNDk2LjU0OGQ2MzYuNDVkNDk5LjQ3MWQ3MTkuMTM4ZDUwMi44MTJkODExLjg0OWQ1MDIuODEyZDg0NC4wMDZkNTAyLjgxMmQ5NDcuOTkzZDQ0Ni40MzNkOTkzLjUxM2QzOTUuNDg0ZDEwMzQuMDIyZDI4OC45OTFkMTAzNC4wMjJkOTcuNzIyZDEwMzQuMDIyZDkzLjk2NGQ4NjMuMjE2ZDEwOS44MzNkODUxLjk0MWQ5My41NDZkODEyLjY4NWQ5My41NDZkNzk0LjcyN2QxMDcuNzQ1ZDc2Ni4zMjlkODcuNjk5ZDc1OS42NDdkODQuMzU4ZDcyNi4yMzhkMTMxLjEzMmQ2NDEuNDYxZDkzLjk2NGQ2ODguMjM0ZDkzLjk2NGQ2NTcuMzMxZDEwOC45OThkNjM5Ljc5MWQ5My41NDZkNjIzLjA4NmQ5MS44NzZkNTgzLjgzZDc4LjA5NGQ1NzguODE4ZDI5LjIzM2Q1NjkuNjMxZDIyOC4wMTlkMzMyLjAwNmQyNzUuNjI4ZDMzMi4wMDZkMjc1LjYyOGQzNzIuOTMzZDI3NS42MjhkNDEyLjE4OWQyNDkuNzM1ZDQxMi4xODlkMjE1LjQ5MWQ0MTIuMTg5ZDIwNS44ODVkNDA5LjI2NWQxODQuMTY5ZDQwMi41ODRkMTg0LjE2OWQzNzYuNjkxZDE4NC4xNjlkMzU5LjE1MWQxOTcuMzI0ZDM0NS41NzlkMjEwLjQ3OWQzMzIuMDA2ZDIyOC4wMTlkMzMyLjAwNmQzNTguMzE2ZDMyOC4yNDdkNDA1LjkyNGQzMjguMjQ3ZDQwNS45MjRkMzY5LjE3NGQ0MDUuOTI0ZDQwNy4xNzdkMzgzLjM3M2Q0MDcuMTc3ZDM3OS4xOTdkNDA3LjE3N2QzNzEuNDcxZDQwNS41MDdkMzYzLjc0NWQ0MDMuODM2ZDM1OS45ODZkNDAzLjgzNmQzMzQuMDk0ZDQwMy40MTlkMzI3LjQxMmQ0MDAuNDk1ZDMxNC40NjZkMzk0LjY0OWQzMTQuNDY2ZDM3Mi45MzNkMzE0LjQ2NmQzNTQuOTc1ZDMyNy40MTJkMzQxLjYxMWQzNDAuMzU4ZDMyOC4yNDdkMzU4LjMxNmQzMjguMjQ3aFIzZDU3NC4yMjVSNGQ1NTUuMDE0UjVkMTkuMjFSNmQ2OTUuNzUyUjdkLTEwLjAyMlI4ZDY3Ni41NDFSOWQwUjEwZDI4My45OFIxMWkyMjBSMTJkMTkuMjFSMTNkNTc0LjIyNVIxNGFpMWkyaTNpM2kzaTNpMmkyaTJpMmkzaTNpM2kzaTJpMmkzaTNpM2kyaTJpMmkzaTNpM2kyaTNpMmkzaTNpM2kyaTJpMmkyaTNpMmkyaTJpMmkzaTNpM2kzaTNpM2kyaTNpMmkyaTJpMmkyaTJpMmkyaTNpMmkxaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTA3b1IxZDc0MC4wMTlSMmFkNTkuNzE5ZDk5MC41OWQ2OS43NDJkOTQxLjMxMWQ3My4wODNkOTI0LjYwNmQ4OC45NTJkODkyLjAzMmQ3OS4zNDdkODgyLjAwOWQ2OS43NDJkODY3LjM5M2Q3MC4xNTlkODMxLjQ3N2Q2OC40ODlkNzc4LjQ0ZDY5LjMyNGQ3NzguMDIyZDcwLjU3N2Q3NzguMDIyZDc5Ljc2NWQ3ODcuODM2ZDg4Ljk1MmQ3OTcuNjVkOTAuMjA1ZDc5Ny42NWQ5MS4wNGQ3OTYuODE1ZDczLjA4M2Q3NTAuNDZkNzAuNTc3ZDY4OS40ODdkNjguMDcxZDYyMC4xNjNkNjAuNTU0ZDU5OC40NDZkNTAuNTMxZDU5MC41MTJkNDMuNDMyZDU4Ni4zMzZkMjcuMTQ1ZDU5NS45NDFkMTUuMDM0ZDYxNC43MzRkMjYuNzI3ZDU3My4zODlkNDguNDQzZDU1Ni4yNjdkNjguOTA3ZDU0MC44MTVkMTEyLjc1NmQ1MzQuOTY5ZDExNy43NjhkNTQxLjY1ZDExNi45MzNkNTQzLjczOGQxMTUuMjYyZDU1Ny41MmQxMTUuMjYyZDU1Ny4xMDJkMTQxLjk5ZDUyNS43ODFkMTQxLjk5ZDU1OS4xOWQxNDAuMzE5ZDYyNi4wMDlkMTM4LjY0OWQ2OTIuODI4ZDEzOC42NDlkNzI2LjIzOGQxMzguNjQ5ZDc0NS4wM2QxNDEuOTlkNzg1Ljk1N2QxNDUuMzMxZDgyNC4zNzhkMTQ0LjkxM2Q4NDUuMjU5ZDIxMC40NzlkODA0Ljc1ZDI0My40NzFkNzg0LjI4N2QyNzEuNDUxZDc1OC44MTJkMjU0LjMyOWQ3NTQuNjM2ZDIyMy44NDNkNzQyLjUyNWQyNTAuMTUzZDczMS4yNDlkMjU4LjkyM2Q3MzEuMjQ5ZDI3Ni44OGQ3MzguMTRkMjk0LjgzOGQ3NDUuMDNkMzAyLjM1NWQ3NDUuMDNkMzExLjEyNWQ3NDUuMDNkMzMwLjEyN2Q3MzYuNDY5ZDM0OS4xMjhkNzI3LjkwOGQzNTYuNjQ2ZDcyNy45MDhkMzk5LjI0M2Q3MzQuNTlkMjg4Ljk5MWQ3OTAuNTUxZDIyOC4wMTlkODM1LjIzNmQyMjkuMjcyZDgzOS44M2QyMjkuMjcyZDg0OC4xODJkMjI5LjI3MmQ4NTcuMzdkMjI3LjYwMWQ4NzEuOTg2ZDIyOC4wMTlkODcyLjgyMmQyNDUuNTU5ZDg0Ny43NjVkMjkyLjc1ZDg5Ny44NzlkMjk0LjgzOGQ5MDYuMjMxZDI4NC4zOThkOTE1LjgzNmQyNDguNDgyZDkxNi4yNTRkMjgwLjIyMWQ5MjAuODQ4ZDMxNi4xMzdkOTI5LjYxOGQzNjIuOTFkOTgyLjIzOGQ0MDUuOTI0ZDEwMDEuODY2ZDQxNy42MThkMTAxOC41N2QzODEuNzAzZDEwMTguNTdkMzcyLjA5N2QxMDE4LjE1M2QzNjIuMDc1ZDEwMTAuNjM2ZDM1NS4zOTNkMTAwMS44NjZkMjc2LjQ2M2QxMDI4LjE3NmQyMzguODc3ZDEwMjguMTc2ZDIyMC41MDJkMTAxOS44MjNkMjYyLjI2NGQxMDExLjg4OWQyNzMuMTIyZDk5My4wOTZkMjUzLjQ5NGQ5NjEuMzU3ZDE2My4yODhkODcxLjk4NmQxNDMuMjQzZDg4Mi44NDVkMTM4LjIzMWQ5MDguNzM3ZDEzOC4yMzFkOTMzLjc5NGQxMzguMjMxZDk2MC41MjJkMTQ0LjA3OGQ5ODYuNDE0ZDE2MC4zNjVkOTkyLjI2MWQxODguMzQ1ZDEwMDguMTNkMTgyLjQ5OWQxMDExLjA1M2QxNjYuMjEyZDEwMTMuMTQxZDE4NS44NGQxMDI0LjgzNWQxMzQuMDU1ZDEwMjAuNjU5ZDg5LjM3ZDEwMjAuNjU5ZDU0LjI5ZDEwMjAuNjU5ZDIzLjgwNGQxMDIzLjE2NGQxMS42OTNkMTAxMS4wNTNkMjcuNTYyZDEwMDMuNTM2ZDU5LjcxOWQ5OTAuNTloUjNkNDAzLjgzNlI0ZDQxNy42MThSNWQxMS42OTNSNmQ0OTguMjE4UjdkLTQuMTc2UjhkNDg2LjUyNVI5ZDBSMTBkMjgzLjk4UjExaTEwN1IxMmQxMS42OTNSMTNkNDAzLjgzNlIxNGFpMWkyaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTJpMmkzaTNpM2kzaTJpMmkyaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmkzaTNpMmkzaGc6MjE5b1IxZDc0MC4wMTlSMmFkMjkuMjMzZDU2OS42MzFkMTkuMjFkNTQ3LjkxNWQzOS4yNTZkNTQzLjMyMWQ0MC41MDhkNTQyLjQ4NmQ5MC42MjNkNTQyLjQ4NmQxNTQuNTE4ZDU2Mi45NDlkMTU3Ljg1OWQ1NjIuNTMxZDE1Ny44NTlkNTU3LjEwMmQxNTcuODU5ZDU1NC41OTdkMTU3LjAyNGQ1NTAuODM4ZDE2OS4xMzVkNTQzLjMyMWQyNjYuODU4ZDU0Mi40ODZkMjc2Ljg4ZDU1Ni4yNjdkMjY3LjI3NWQ1NzEuNzE5ZDI0Mi42MzZkNTcyLjU1NGQyMzIuNjEzZDU3My44MDdkMjEyLjU2N2Q1NzYuMzEzZDE5OS4yMDNkNTgyLjk5NWQxOTUuNDQ1ZDU5OC4wMjlkMTk1LjQ0NWQ2MjEuNDE1ZDE5NS40NDVkNjQ4Ljk3OGQyMDAuODc0ZDY4OC4yMzRkMTYyLjQ1M2Q3MjIuODk3ZDE5Ni42OThkNzI0LjU2N2QxOTQuMTkyZDc2My44MjNkMTk0LjE5MmQ3OTcuMjMzZDE5NC4xOTJkODU5Ljg3NmQyMDIuNTQ0ZDkwMi44OWQxOTMuNzc0ZDkxNy45MjRkMTg1Ljg0ZDkzNi4zZDE4Ny41MWQ5MzcuNTUzZDIwNy41NTZkOTI4Ljc4M2QyMDkuMjI2ZDkyOS42MThkMjMzLjAzZDk5NS42MDFkMzEyLjc5NmQ5OTUuNjAxZDQ1Mi42OThkOTk1LjYwMWQ0NTIuNjk4ZDgzMy41NjZkNDUyLjY5OGQ3MzcuNTEzZDQ0MS4wMDRkNzAxLjU5OGQ0NDcuNjg2ZDY5OS4wOTJkNDU4LjU0NGQ3MDEuNTk4ZDQ1Ni40NTZkNzAxLjU5OGQ0NTkuMzhkNjk4LjI1N2Q0NDcuMjY5ZDY3MC4yNzdkNDQ1LjU5OGQ2MjcuNjhkNDQ0LjM0NWQ1ODguMDA2ZDQzNS41NzVkNTc2LjczZDQyMC45NTlkNTU3LjUyZDM3MS42OGQ1NTguNzczZDM2Ni42NjhkNTU3LjkzOGQzNjIuOTFkNTQzLjMyMWQzOTYuNzM3ZDUyOS41MzlkNDc3Ljc1NWQ1MjkuMTIyZDUyMS4xODdkNTI4LjcwNGQ1NTQuMTc5ZDU0Ny45MTVkNTU1LjAxNGQ1NTcuMTAyZDQ5Ni45NjVkNTY3Ljk2ZDQ4MC42NzhkNTYxLjI3OGQ0NzkuNDI1ZDU2Mi45NDlkNDk5Ljg4OWQ1OTAuMDk0ZDQ5OS40NzFkNTk0LjY4OGQ0OTYuNTQ4ZDYzNi40NWQ0OTkuNDcxZDcxOS4xMzhkNTAyLjgxMmQ4MTEuODQ5ZDUwMi44MTJkODQ0LjAwNmQ1MDIuODEyZDk0Ny45OTNkNDQ2LjQzM2Q5OTMuNTEzZDM5NS40ODRkMTAzNC4wMjJkMjg4Ljk5MWQxMDM0LjAyMmQ5Ny43MjJkMTAzNC4wMjJkOTMuOTY0ZDg2My4yMTZkMTA5LjgzM2Q4NTEuOTQxZDkzLjU0NmQ4MTIuNjg1ZDkzLjU0NmQ3OTQuNzI3ZDEwNy43NDVkNzY2LjMyOWQ4Ny42OTlkNzU5LjY0N2Q4NC4zNThkNzI2LjIzOGQxMzEuMTMyZDY0MS40NjFkOTMuOTY0ZDY4OC4yMzRkOTMuOTY0ZDY1Ny4zMzFkMTA4Ljk5OGQ2MzkuNzkxZDkzLjU0NmQ2MjMuMDg2ZDkxLjg3NmQ1ODMuODNkNzguMDk0ZDU3OC44MThkMjkuMjMzZDU2OS42MzFkMTc5LjU3NWQ0MzQuNzRkMTg2LjY3NWQ0MjguNDc2ZDIzNi4zNzFkMzc4Ljc3OWQyNDUuMTQxZDM3Ny4xMDlkMjU5Ljc1OGQzNzAuODQ1ZDI1Ny4yNTJkMzY3LjUwNGQyNTMuMDc2ZDM2MC44MjJkMjY1LjYwNWQzNTQuMTRkMjY2LjQ0ZDM0My4yODJkMjc4LjU1MWQzMjAuMzEzZDI5My4xNjhkMjkyLjc1ZDI5NS4yNTZkMjgzLjk4ZDI5OS44NDlkMjgzLjk4ZDMzNy40MzVkMzc3Ljk0NGQ0MDQuNjcyZDQzNC43NGQzNjQuOTk4ZDQzNC43NGQzNjEuMjM5ZDQzNC43NGQzNDcuODc2ZDQyNy4yMjNkMzM0LjUxMmQ0MTkuNzA2ZDMzMy42NzZkNDE2Ljc4M2QzMzYuMTgyZDQxMi4xODlkMzM5Ljk0MWQ0MDIuMTY2ZDMzOS41MjNkNDAwLjQ5NWQzMzIuODQxZDQwMi41ODRkMzI4LjY2NWQ0MDIuMTY2ZDMyMy42NTRkNDAxLjc0OGQzMjIuODE4ZDM4OS42MzdkMzE5Ljg5NWQzNzQuMTg1ZDMxNy44MDdkMzgyLjEyZDMxNC40NjZkMzg4LjgwMmQzMTEuMTI1ZDM4My43OTFkMjk2LjUwOGQzNTcuNDgxZDI3MS4wMzRkMzk4LjQwN2QyMTcuNTc5ZDQzNC43NGQxNzkuNTc1ZDQzNC43NGhSM2Q1NzQuMjI1UjRkNTU1LjAxNFI1ZDE5LjIxUjZkNzQwLjAxOVI3ZC0xMC4wMjJSOGQ3MjAuODA5UjlkMFIxMGQyODMuOThSMTFpMjE5UjEyZDE5LjIxUjEzZDU3NC4yMjVSMTRhaTFpMmkzaTNpM2kzaTJpMmkyaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkyaTJpM2kzaTNpMmkzaTJpM2kzaTNpMmkyaTJpMmkzaTJpMmkyaTJpM2kzaTNpM2kzaTNpMmkzaTJpMmkyaTJpMmkyaTJpMmkzaTJpMWkzaTNpM2kyaTNpM2kyaTNpMmkzaTNpM2kyaTNpMmkzaTNpM2kzaTJoZzoxMDZvUjFkNzQwLjAxOVIyYWQxNTIuMDEzZDU3OS42NTRkMTUyLjAxM2Q2MDAuNTM1ZDEzOC42NDlkNjE0LjMxNmQxMjUuMjg1ZDYyOC4wOTdkMTA0LjQwNGQ2MjguMDk3ZDU2LjM3OGQ2MjguMDk3ZDU2LjM3OGQ1ODAuNDg5ZDU2LjM3OGQ1MzIuODhkMTA2LjkxZDUzMi44OGQxNTIuMDEzZDUzMi44OGQxNTIuMDEzZDU3OS42NTRkMi41MDVkMTIwOS4wMDRkLTY5LjMyNGQxMjA5LjAwNGQtOTIuNzExZDExOTcuMzExZC0xMjkuNDYxZDExNzguOTM2ZC0xMjkuNDYxZDExMTYuNzExZC0xMjkuNDYxZDEwOTMuMzI0ZC00OC40NDNkMTA0OS4wNTdkLTg3LjY5OWQxMTAyLjA5NGQtODcuNjk5ZDExMjcuMTUxZC04Ny42OTlkMTE3NS41OTVkLTIwLjA0NWQxMTc1LjU5NWQyNy4xNDVkMTE3NS41OTVkNTIuNjE5ZDExMjIuNTU3ZDcyLjY2NWQxMDgwLjM3OGQ3MS44M2QxMDI3Ljc1OGQ2Ny42NTRkNzc2LjM1MmQ2MC41NTRkNzY1LjkxMWQ0NS4xMDJkNzY1LjkxMWQyOC44MTVkNzY1LjkxMWQxMS4yNzVkNzg4LjQ2M2Q2OC40ODlkNjg1LjcyOWQxMjguMjA4ZDY4OC42NTJkMTQ2LjE2NmQ2ODkuNDg3ZDE0Ni4xNjZkNjk2LjE2OWQxMzMuMjJkNzQ4LjM3MWQxNDYuNTg0ZDc0Mi4xMDdkMTQ4LjY3MmQ3NDEuNjlkMTUxLjU5NWQ3NDkuNjI0ZDE1MS41OTVkNzU3LjU1OWQxNDkuNTA3ZDc3NS4wOTlkMTQ3LjQxOWQ3OTIuNjM5ZDE0Ny44MzZkODAxLjgyN2QxNDguMjU0ZDgxMi4yNjdkMTI5LjQ2MWQ4NTIuMzU4ZDEyOC42MjZkODU1LjI4MmQxMjkuODc5ZDg1Ni4xMTdkMTMxLjU0OWQ4NTYuMTE3ZDEzNC44OWQ4NTYuMTE3ZDE0MS4xNTRkODU1LjI4MmQxNTAuMzQyZDg2NC4wNTJkMTUwLjc2ZDg3OC42NjhkMTUxLjE3N2Q4OTcuMDQ0ZDE1Mi40M2Q5MjIuMTAxZDE1Mi44NDhkOTMzLjc5NGQxNTQuMTAxZDk2MS43NzRkMTU0LjEwMWQ5OTQuNzY2ZDE1NC4xMDFkMTA5Mi40ODlkMTI3Ljc5MWQxMTQxLjc2OGQ5MS44NzZkMTIwOS4wMDRkMi41MDVkMTIwOS4wMDRoUjNkMTk3Ljk1MVI0ZDE1NC4xMDFSNWQtMTI5LjQ2MVI2ZDQ5MS4xMTlSN2QtMTg1LjAwNFI4ZDYyMC41OFI5ZDBSMTBkMjgzLjk4UjExaTEwNlIxMmQtMTI5LjQ2MVIxM2QxOTcuOTUxUjE0YWkxaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTJpM2kzaTJpM2kzaTNpMmkyaTNpMmkzaTNpM2hnOjIxOG9SMWQ3NDAuMDE5UjJhZDI5LjIzM2Q1NjkuNjMxZDE5LjIxZDU0Ny45MTVkMzkuMjU2ZDU0My4zMjFkNDAuNTA4ZDU0Mi40ODZkOTAuNjIzZDU0Mi40ODZkMTU0LjUxOGQ1NjIuOTQ5ZDE1Ny44NTlkNTYyLjUzMWQxNTcuODU5ZDU1Ny4xMDJkMTU3Ljg1OWQ1NTQuNTk3ZDE1Ny4wMjRkNTUwLjgzOGQxNjkuMTM1ZDU0My4zMjFkMjY2Ljg1OGQ1NDIuNDg2ZDI3Ni44OGQ1NTYuMjY3ZDI2Ny4yNzVkNTcxLjcxOWQyNDIuNjM2ZDU3Mi41NTRkMjMyLjYxM2Q1NzMuODA3ZDIxMi41NjdkNTc2LjMxM2QxOTkuMjAzZDU4Mi45OTVkMTk1LjQ0NWQ1OTguMDI5ZDE5NS40NDVkNjIxLjQxNWQxOTUuNDQ1ZDY0OC45NzhkMjAwLjg3NGQ2ODguMjM0ZDE2Mi40NTNkNzIyLjg5N2QxOTYuNjk4ZDcyNC41NjdkMTk0LjE5MmQ3NjMuODIzZDE5NC4xOTJkNzk3LjIzM2QxOTQuMTkyZDg1OS44NzZkMjAyLjU0NGQ5MDIuODlkMTkzLjc3NGQ5MTcuOTI0ZDE4NS44NGQ5MzYuM2QxODcuNTFkOTM3LjU1M2QyMDcuNTU2ZDkyOC43ODNkMjA5LjIyNmQ5MjkuNjE4ZDIzMy4wM2Q5OTUuNjAxZDMxMi43OTZkOTk1LjYwMWQ0NTIuNjk4ZDk5NS42MDFkNDUyLjY5OGQ4MzMuNTY2ZDQ1Mi42OThkNzM3LjUxM2Q0NDEuMDA0ZDcwMS41OThkNDQ3LjY4NmQ2OTkuMDkyZDQ1OC41NDRkNzAxLjU5OGQ0NTYuNDU2ZDcwMS41OThkNDU5LjM4ZDY5OC4yNTdkNDQ3LjI2OWQ2NzAuMjc3ZDQ0NS41OThkNjI3LjY4ZDQ0NC4zNDVkNTg4LjAwNmQ0MzUuNTc1ZDU3Ni43M2Q0MjAuOTU5ZDU1Ny41MmQzNzEuNjhkNTU4Ljc3M2QzNjYuNjY4ZDU1Ny45MzhkMzYyLjkxZDU0My4zMjFkMzk2LjczN2Q1MjkuNTM5ZDQ3Ny43NTVkNTI5LjEyMmQ1MjEuMTg3ZDUyOC43MDRkNTU0LjE3OWQ1NDcuOTE1ZDU1NS4wMTRkNTU3LjEwMmQ0OTYuOTY1ZDU2Ny45NmQ0ODAuNjc4ZDU2MS4yNzhkNDc5LjQyNWQ1NjIuOTQ5ZDQ5OS44ODlkNTkwLjA5NGQ0OTkuNDcxZDU5NC42ODhkNDk2LjU0OGQ2MzYuNDVkNDk5LjQ3MWQ3MTkuMTM4ZDUwMi44MTJkODExLjg0OWQ1MDIuODEyZDg0NC4wMDZkNTAyLjgxMmQ5NDcuOTkzZDQ0Ni40MzNkOTkzLjUxM2QzOTUuNDg0ZDEwMzQuMDIyZDI4OC45OTFkMTAzNC4wMjJkOTcuNzIyZDEwMzQuMDIyZDkzLjk2NGQ4NjMuMjE2ZDEwOS44MzNkODUxLjk0MWQ5My41NDZkODEyLjY4NWQ5My41NDZkNzk0LjcyN2QxMDcuNzQ1ZDc2Ni4zMjlkODcuNjk5ZDc1OS42NDdkODQuMzU4ZDcyNi4yMzhkMTMxLjEzMmQ2NDEuNDYxZDkzLjk2NGQ2ODguMjM0ZDkzLjk2NGQ2NTcuMzMxZDEwOC45OThkNjM5Ljc5MWQ5My41NDZkNjIzLjA4NmQ5MS44NzZkNTgzLjgzZDc4LjA5NGQ1NzguODE4ZDI5LjIzM2Q1NjkuNjMxZDIzNi4zNzFkNDQyLjY3NWQzNzEuNjhkMzU0Ljk3NWQzNzEuNjhkMzIyLjgxOGQzNzEuNjhkMzIwLjczZDM1MS4wMDhkMzAyLjk4MmQzMzAuMzM2ZDI4NS4yMzNkMzI3LjQxMmQyODUuMjMzZDMwOC42MTlkMjg1LjIzM2QyNzUuMjFkMzUzLjcyMmQyNjguMTFkMzY3LjkyMWQyMzYuMzcxZDQ0Mi42NzVoUjNkNTc0LjIyNVI0ZDU1NS4wMTRSNWQxOS4yMVI2ZDczOC43NjZSN2QtMTAuMDIyUjhkNzE5LjU1NlI5ZDBSMTBkMjgzLjk4UjExaTIxOFIxMmQxOS4yMVIxM2Q1NzQuMjI1UjE0YWkxaTJpM2kzaTNpM2kyaTJpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTJpMmkyaTNpM2kzaTJpM2kyaTNpM2kzaTJpMmkyaTJpM2kyaTJpMmkyaTNpM2kzaTNpM2kzaTJpM2kyaTJpMmkyaTJpMmkyaTJpM2kyaTFpM2kzaTNpM2kzaGc6MTA1b1IxZDc0MC4wMTlSMmFkNTcuNjMxZDU5OC4wMjlkNTcuNjMxZDU1MC4wMDNkOTguNTU3ZDU1MC4wMDNkMTQ0LjQ5NWQ1NTAuMDAzZDE0NC40OTVkNTk4LjAyOWQxNDQuNDk1ZDY0Ny4zMDhkMTAwLjIyOGQ2NDcuMzA4ZDU3LjYzMWQ2NDcuMzA4ZDU3LjYzMWQ1OTguMDI5ZC01LjAxMWQxMDExLjg4OWQxMS4yNzVkOTk3LjY5ZDUyLjYxOWQ5OTIuNjc4ZDU0LjcwN2Q5OTEuODQzZDY5LjMyNGQ5ODUuNTc5ZDY5LjMyNGQ5NTguMDE2ZDcwLjU3N2Q5NTcuNTk4ZDcyLjI0N2Q5NTcuNTk4ZDc2Ljg0MWQ5NTcuNTk4ZDk1LjIxNmQ5NzQuMzAzZDk2Ljg4N2Q5NzIuMjE1ZDkzLjU0NmQ5NjIuNjFkNzguOTI5ZDkzNS40NjRkNzAuNTc3ZDkyMC4wMTNkNjkuMzI0ZDg5NC4xMmQxMDAuMjI4ZDg4Mi4wMDlkNjkuMzI0ZDg1OC4yMDVkNzAuMTU5ZDc5Ny42NWQ2OC4wNzFkNzczLjg0NmQ1Ny42MzFkNzU5LjY0N2Q0MC45MjZkNzU5LjY0N2QyNi4zMDlkNzU5LjY0N2QxNS4wMzRkNzc1LjA5OWQ0OS42OTZkNzI0Ljk4NWQ3My45MThkNzEzLjcwOWQxMTIuMzM5ZDcwMS41OThkMTUwLjM0MmQ2ODkuOTA1ZDE0NC4wNzhkNzU4LjM5NGQxNDQuMDc4ZDgwMS44MjdkMTQ0LjA3OGQ4OTguMjk2ZDE1MC43NmQ5ODguOTJkMTY5LjEzNWQ5OTMuMDk2ZDIwNi43MjFkMTAwNS4yMDdkMjA4LjgwOWQxMDEzLjE0MWQxODcuOTI4ZDEwMTkuODIzZDE2My4yODhkMTAyMS4wNzZkMTQ2LjU4NGQxMDIxLjkxMWQxMTYuOTMzZDEwMjAuNjU5ZDc3LjY3NmQxMDE4Ljk4OGQ3MC41NzdkMTAxOC45ODhkNjQuNzNkMTAxOC45ODhkNTMuMjQ2ZDEwMjEuMDc2ZDQxLjc2MWQxMDIzLjE2NGQzNS45MTVkMTAyMy4xNjRkMjguMzk4ZDEwMjMuMTY0ZDE1LjQ1MWQxMDE4LjE1M2QwLjgzNWQxMDEyLjcyNGQtNS4wMTFkMTAxMS44ODloUjNkMjEzLjgyUjRkMjA4LjgwOVI1ZC01LjAxMVI2ZDQ3My45OTZSN2QwLjgzNVI4ZDQ3OS4wMDhSOWQwUjEwZDI4My45OFIxMWkxMDVSMTJkLTUuMDExUjEzZDIxMy44MlIxNGFpMWkzaTNpM2kzaTFpMmkzaTNpM2kzaTJpM2kzaTJpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNoZzoyMTdvUjFkNzQwLjAxOVIyYWQyOS4yMzNkNTY5LjYzMWQxOS4yMWQ1NDcuOTE1ZDM5LjI1NmQ1NDMuMzIxZDQwLjUwOGQ1NDIuNDg2ZDkwLjYyM2Q1NDIuNDg2ZDE1NC41MThkNTYyLjk0OWQxNTcuODU5ZDU2Mi41MzFkMTU3Ljg1OWQ1NTcuMTAyZDE1Ny44NTlkNTU0LjU5N2QxNTcuMDI0ZDU1MC44MzhkMTY5LjEzNWQ1NDMuMzIxZDI2Ni44NThkNTQyLjQ4NmQyNzYuODhkNTU2LjI2N2QyNjcuMjc1ZDU3MS43MTlkMjQyLjYzNmQ1NzIuNTU0ZDIzMi42MTNkNTczLjgwN2QyMTIuNTY3ZDU3Ni4zMTNkMTk5LjIwM2Q1ODIuOTk1ZDE5NS40NDVkNTk4LjAyOWQxOTUuNDQ1ZDYyMS40MTVkMTk1LjQ0NWQ2NDguOTc4ZDIwMC44NzRkNjg4LjIzNGQxNjIuNDUzZDcyMi44OTdkMTk2LjY5OGQ3MjQuNTY3ZDE5NC4xOTJkNzYzLjgyM2QxOTQuMTkyZDc5Ny4yMzNkMTk0LjE5MmQ4NTkuODc2ZDIwMi41NDRkOTAyLjg5ZDE5My43NzRkOTE3LjkyNGQxODUuODRkOTM2LjNkMTg3LjUxZDkzNy41NTNkMjA3LjU1NmQ5MjguNzgzZDIwOS4yMjZkOTI5LjYxOGQyMzMuMDNkOTk1LjYwMWQzMTIuNzk2ZDk5NS42MDFkNDUyLjY5OGQ5OTUuNjAxZDQ1Mi42OThkODMzLjU2NmQ0NTIuNjk4ZDczNy41MTNkNDQxLjAwNGQ3MDEuNTk4ZDQ0Ny42ODZkNjk5LjA5MmQ0NTguNTQ0ZDcwMS41OThkNDU2LjQ1NmQ3MDEuNTk4ZDQ1OS4zOGQ2OTguMjU3ZDQ0Ny4yNjlkNjcwLjI3N2Q0NDUuNTk4ZDYyNy42OGQ0NDQuMzQ1ZDU4OC4wMDZkNDM1LjU3NWQ1NzYuNzNkNDIwLjk1OWQ1NTcuNTJkMzcxLjY4ZDU1OC43NzNkMzY2LjY2OGQ1NTcuOTM4ZDM2Mi45MWQ1NDMuMzIxZDM5Ni43MzdkNTI5LjUzOWQ0NzcuNzU1ZDUyOS4xMjJkNTIxLjE4N2Q1MjguNzA0ZDU1NC4xNzlkNTQ3LjkxNWQ1NTUuMDE0ZDU1Ny4xMDJkNDk2Ljk2NWQ1NjcuOTZkNDgwLjY3OGQ1NjEuMjc4ZDQ3OS40MjVkNTYyLjk0OWQ0OTkuODg5ZDU5MC4wOTRkNDk5LjQ3MWQ1OTQuNjg4ZDQ5Ni41NDhkNjM2LjQ1ZDQ5OS40NzFkNzE5LjEzOGQ1MDIuODEyZDgxMS44NDlkNTAyLjgxMmQ4NDQuMDA2ZDUwMi44MTJkOTQ3Ljk5M2Q0NDYuNDMzZDk5My41MTNkMzk1LjQ4NGQxMDM0LjAyMmQyODguOTkxZDEwMzQuMDIyZDk3LjcyMmQxMDM0LjAyMmQ5My45NjRkODYzLjIxNmQxMDkuODMzZDg1MS45NDFkOTMuNTQ2ZDgxMi42ODVkOTMuNTQ2ZDc5NC43MjdkMTA3Ljc0NWQ3NjYuMzI5ZDg3LjY5OWQ3NTkuNjQ3ZDg0LjM1OGQ3MjYuMjM4ZDEzMS4xMzJkNjQxLjQ2MWQ5My45NjRkNjg4LjIzNGQ5My45NjRkNjU3LjMzMWQxMDguOTk4ZDYzOS43OTFkOTMuNTQ2ZDYyMy4wODZkOTEuODc2ZDU4My44M2Q3OC4wOTRkNTc4LjgxOGQyOS4yMzNkNTY5LjYzMWQzMjQuOTA3ZDQ0Ny4yNjlkMTg5LjU5OGQzNTkuNTY5ZDE4OS41OThkMzI3LjQxMmQxODkuNTk4ZDMyNS43NDJkMjEwLjQ3OWQzMDcuNzg0ZDIzMS4zNmQyODkuODI3ZDIzMy44NjZkMjg5LjgyN2QyNTIuMjQxZDI4OS44MjdkMjg2LjA2OGQzNTguMzE2ZDI5MC4yNDRkMzY2LjY2OGQzMjQuOTA3ZDQ0Ny4yNjloUjNkNTc0LjIyNVI0ZDU1NS4wMTRSNWQxOS4yMVI2ZDczNC4xNzJSN2QtMTAuMDIyUjhkNzE0Ljk2MlI5ZDBSMTBkMjgzLjk4UjExaTIxN1IxMmQxOS4yMVIxM2Q1NzQuMjI1UjE0YWkxaTJpM2kzaTNpM2kyaTJpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTJpMmkyaTNpM2kzaTJpM2kyaTNpM2kzaTJpMmkyaTJpM2kyaTJpMmkyaTNpM2kzaTNpM2kzaTJpM2kyaTJpMmkyaTJpMmkyaTJpM2kyaTFpM2kzaTNpM2kzaGc6MTA0b1IxZDc0MC4wMTlSMmFkNS44NDZkMTAxNS42NDdkMTYuMjg3ZDEwMDMuMTE5ZDYxLjgwN2Q5ODguOTJkNjUuNTY2ZDk3NS45NzNkNjUuNTY2ZDkzNS44ODJkOTQuNzk5ZDk0Ni4zMjNkNjYuODE4ZDg3Ny44MzNkNjcuMjM2ZDg3MC4zMTZkOTEuNDU4ZDg2Ny44MWQ2Ny42NTRkODQ1LjI1OWQ2OC45MDdkNjcyLjc4M2Q3Ny42NzZkNjc1LjcwNmQ4NS42MTFkNjc0Ljg3MWQ2OC40ODlkNjUzLjU3MmQ3OC41MTJkNTcxLjMwMWQzNi4zMzJkNTgwLjQ4OWQxMC44NThkNjE0LjczNGQxNy45NTdkNTgzLjQxMmQ0NC4yNjdkNTU4LjM1NWQ3Mi4yNDdkNTMxLjIxZDEwMi43MzRkNTMxLjIxZDEyMC42OTFkNTMxLjIxZDE0OS41MDdkNTU2LjY4NWQxNDguNjcyZDc0MS4yNzJkMTgxLjI0NmQ3MTQuMTI3ZDE4Ni42NzVkNzExLjYyMWQxOTcuOTUxZDcwNi4xOTJkMjMxLjM2ZDcwNi4xOTJkMzMwLjMzNmQ3MDYuMTkyZDM1OS41NjlkNzY4ZDM3Ny41MjZkODA2LjAwM2QzNzcuNTI2ZDkyMS4yNjVkMzc3LjUyNmQ5MzMuNzk0ZDM2My4zMjdkMTAyNy4zNGQzNDkuMTI4ZDEwMzcuNzgxZDM2My43NDVkMTAzOC4xOTlkMzkyLjk3OGQxMDQwLjI4N2Q0MDIuNTg0ZDEwNDkuNDc0ZDQxNi4zNjVkMTA1My4yMzNkMzk2LjMxOWQxMDY3LjAxNGQzNjcuMDg2ZDEwNjcuMDE0ZDMxMy42MzFkMTA2Ny4wMTRkMjYzLjA5OWQxMDY3LjAxNGQyMjYuNzY2ZDEwNTYuMTU2ZDI0My40NzFkMTA0MS41MzlkMjUwLjU3ZDEwMzguMTk5ZDI1NmQxMDM1LjY5M2QyNzkuODA0ZDEwMzEuNTE3ZDI4Mi4zMDlkOTg4LjUwMmQyOTAuNjYyZDk0OS4yNDZkMjkxLjkxNWQ5NDQuMjM0ZDI5NS4yNTZkOTI5LjJkMjk1LjI1NmQ5MjQuNjA2ZDI5NC4wMDNkODUyLjM1OGQyOTMuMTY4ZDgwNS41ODVkMjgwLjIyMWQ3ODUuMTIyZDI2My4wOTlkNzU4LjM5NGQyMTUuMDczZDc1OC4zOTRkMTg4LjM0NWQ3NTguMzk0ZDE0NS4zMzFkODAwLjU3NGQxNDUuMzMxZDk1MS4zMzRkMTQ1LjMzMWQ5NTUuMDkyZDE0OC42NzJkOTg2LjQxNGQxNTYuNjA2ZDk5NC43NjZkMTk0LjE5MmQ5OTcuNjlkMjExLjMxNGQxMDEzLjU1OWQxOTYuMjhkMTAyMy4xNjRkMTY4LjNkMTAyMy4xNjRkMTY2LjIxMmQxMDIzLjE2NGQ4Mi42ODhkMTAxOS44MjNkMTYuMjg3ZDEwMTcuMzE4ZDguNzY5ZDEwMTguOTg4ZDUuODQ2ZDEwMTUuNjQ3aFIzZDQxOS43MDZSNGQ0MTYuMzY1UjVkNS44NDZSNmQ0OTIuNzg5UjdkLTQzLjAxNFI4ZDQ4Ni45NDJSOWQwUjEwZDI4My45OFIxMWkxMDRSMTJkNS44NDZSMTNkNDE5LjcwNlIxNGFpMWkzaTNpMmkyaTJpMmkyaTJpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTJpMmkyaTNpM2kzaTJoZzoyMTZvUjFkNzQwLjAxOVIyYWQ0Mi41OTdkNzg5LjcxNmQ0Mi41OTdkNzgxLjc4MWQzOS4wNDdkNzY3LjU4MmQzNS40OTdkNzUzLjM4M2QzNS4wNzlkNzQ2LjcwMWQzOS42NzNkNzQ1LjQ0OGQ1NC43MDdkNzQ1LjQ0OGQ2OS4zMjRkNzQ1LjQ0OGQ5NC43OTlkNzQ2LjcwMWQ4Ni4wMjlkNzM3LjUxM2QzOS4yNTZkNzE4LjMwM2Q2MC4xMzdkNjI4LjkzM2QxMzUuMzA4ZDU3OC40MDFkMjA1LjA1ZDUzMS4yMWQzMDAuMjY3ZDUzMS4yMWQzMzkuOTQxZDUzMS4yMWQzNzUuMDIxZDUzOS4xNDVkMzk1LjQ4NGQ0OTIuNzg5ZDQxNS4xMTJkNDQ2LjQzM2Q0MTkuMjg4ZDQ3MS40OTFkNDY2LjA2MWQ0NTEuMDI3ZDQ2OC4xNWQ0NTEuNDQ1ZDQyMS4zNzZkNTU0LjU5N2Q0NTcuMjkyZDU3MC4wNDhkNDg2Ljk0MmQ1OTUuNTIzZDU2Ni4yOWQ2NjMuNTk1ZDU2Ni4yOWQ3NzMuNDI5ZDU2Ni4yOWQ4ODkuMTA5ZDQ4OS4yMzlkOTYzLjIzNmQ0MTIuMTg5ZDEwMzcuMzYzZDI5Ni4wOTFkMTAzNy4zNjNkMjUyLjY1OWQxMDM3LjM2M2QyMDkuNjQ0ZDEwMjEuOTExZDE3OS41NzVkMTA4OC4zMTNkMTc0Ljk4MmQxMDY5LjEwMmQxNDYuNTg0ZDEwODguNzNkMTIxLjEwOWQxMDg4LjczZDExNy43NjhkMTA4OC43M2QxMTUuMjYyZDEwODguMzEzZDEzNy44MTRkMTA0My42MjhkMTU5Ljk0N2Q5OTguOTQyZDEwOS40MTVkOTcwLjEyN2Q3Ny4yNTlkOTI2LjY5NGQxMDEuODk4ZDkyNC4xODlkMTI0LjQ1ZDkxOC43NmQ5NC4zODFkOTEyLjkxM2Q2Mi4yMjVkOTAzLjcyNWQ0Mi41OTdkODY2Ljk3NWQ0Mi41OTdkNzg5LjcxNmQyMzYuMzcxZDk2My4wMjdkMjY2Ljg1OGQ5OTIuMjYxZDMxMC4yOWQ5OTIuMjYxZDM3Ni4yNzRkOTkyLjI2MWQ0MTcuMmQ5NTIuNTg3ZDQ1OC4xMjdkOTEyLjkxM2Q0NTguMTI3ZDg0Ni45MjlkNDU4LjEyN2Q4MTQuNzczZDQ0OC41MjJkNzc1LjA5OWQ0NTYuODc0ZDc3NC4yNjRkNDczLjE2MWQ3NzQuMjY0ZDQ4OS44NjZkNzc0LjI2NGQ1MTQuNTA1ZDc3NS4wOTlkNDQzLjUxZDc1My44ZDQzOC4wODFkNzM1LjQyNWQ0NDMuNTFkNzMxLjI0OWQ0NDYuNDMzZDcyMi40NzlkNDQ2LjAxNmQ3MjAuODA5ZDQyNy42NDFkNzA2LjE5MmQ0NzAuNjU1ZDY5OS41MWQ0NDEuNDIyZDY4NC40NzZkNDA5LjI2NWQ2NjQuMDEzZDM5OC40MDdkNjQ1LjYzN2QzODYuNzE0ZDYzMS40MzhkMjM2LjM3MWQ5NjMuMDI3ZDE0MS45OWQ3MjAuMzkxZDE0MS45OWQ4MDAuOTkxZDE2OS45N2Q4NTcuNzg3ZDE1NC41MThkODc1LjMyN2QxMzkuNDg0ZDg5Ni42MjZkMTUxLjU5NWQ5MDYuMjMxZDE5NC4xOTJkOTA4LjczN2QyMDAuMDM5ZDkxNy41MDdkMjA1LjA1ZDkwNy40ODRkMjMwLjUyNWQ4MTkuMzY3ZDI0OS43MzVkNzUyLjU0OGQyNjYuMDIyZDc1Mi41NDhkMjcxLjQ1MWQ3NTIuNTQ4ZDI3Ny4yOThkNzU5LjIzZDI3OC4xMzNkNzU3LjU1OWQyNzguOTY5ZDc1Ny41NTlkMjgwLjYzOWQ3NTcuNTU5ZDI4Mi45MzZkNzY1LjA3NmQyODUuMjMzZDc3Mi41OTNkMjg2LjA2OGQ3NzIuNTkzZDI4Ni40ODZkNzcxLjc1OGQyODYuOTAzZDc3MC41MDVkMjg3LjczOGQ3NzEuNzU4ZDI4OC41NzRkNzcxLjc1OGQyOTEuOTE1ZDc3MS43NThkMjk0LjQyZDc0NC42MTNkMjk2LjkyNmQ3MTQuMTI3ZDI5Ni45MjZkNzE0LjEyN2QyOTkuNDMyZDY5MS45OTNkMzE5LjQ3N2Q2NTMuOTlkMzQ5LjU0NmQ1OTYuNzc2ZDMyMS41NjZkNTc3Ljk4M2QyODkuODI3ZDU3Ny45ODNkMTQxLjk5ZDU3Ny45ODNkMTQxLjk5ZDcyMC4zOTFoUjNkNjAxLjc4N1I0ZDU2Ni4yOVI1ZDM1LjA3OVI2ZDU3Ny41NjZSN2QtNjQuNzNSOGQ1NDIuNDg2UjlkMFIxMGQyODMuOThSMTFpMjE2UjEyZDM1LjA3OVIxM2Q2MDEuNzg3UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTJpMWkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2hnOjEwM29SMWQ3NDAuMDE5UjJhZDM2Mi4wNzVkODQ4LjZkMzYyLjA3NWQxMDAzLjUzNmQzNDQuMTE3ZDExNDUuOTQ0ZDMyMi44MThkMTE2Mi42NDlkMzAwLjY4NWQxMTgzLjk0N2QzMDYuNTMxZDExODcuNzA2ZDM0Mi4wMjlkMTE4MS4wMjRkMzQyLjg2NGQxMTgxLjQ0MmQzMjguMjQ3ZDEyMzAuMzAzZDI2OS43ODFkMTI2OS45NzdkMjEyLjk4NWQxMzA3Ljk4ZDE2MC4zNjVkMTMwNy45OGQxNTAuMzQyZDEzMDcuOThkMTMwLjA4OGQxMzA4LjgxNWQxMDkuODMzZDEzMDkuNjVkOTkuODFkMTMwOS42NWQtMjYuNzI3ZDEzMDkuNjVkLTI2LjcyN2QxMjQ3LjQyNWQtMjYuNzI3ZDEyMDAuNjUyZDUzLjAzN2QxMTQ2Ljc3OWQxMjcuMzczZDEwOTYuNjY1ZDE4MS4yNDZkMTA5My43NDJkMTgyLjA4MWQxMDk3LjA4M2QxODIuMDgxZDExMTAuNDQ2ZDE0OS41MDdkMTEyNy4xNTFkMTAyLjMxNmQxMTUxLjM3M2Q4OS4zN2QxMTYxLjgxNGQ1Ny4yMTNkMTE4Ny4yODhkNTcuMjEzZDEyMjQuMDM5ZDU3LjIxM2QxMjUyLjQzN2Q4My45NDFkMTI2Ny40NzFkMTA1LjY1N2QxMjgwZDEzNi4xNDNkMTI4MGQyMTMuODJkMTI4MGQyNDcuMjNkMTE5OC41NjRkMjcxLjg2OWQxMTM4Ljg0NWQyNjguNTI4ZDEwNTEuMTQ1ZDI2Ny4yNzVkMTAxNi45ZDIzMy44NjZkMTAzMC42ODFkMTkxLjI2OWQxMDMwLjY4MWQxMjAuNjkxZDEwMzAuNjgxZDc1LjU4OGQ5OTEuODQzZDI5LjIzM2Q5NTIuMTY5ZDIyLjU1MWQ4ODIuNDI3ZDI5LjIzM2Q4NzYuNThkNDYuMzU1ZDg3MS45ODZkNjMuNDc3ZDg2Ny4zOTNkNzAuMTU5ZDg2MS41NDZkNzAuMTU5ZDg0My41ODhkMTguMzc1ZDg0Mi43NTNkMzEuMzIxZDc3Ni4zNTJkODIuMjdkNzQwLjAxOWQxMjkuODc5ZDcwNS43NzRkMTk5LjYyMWQ3MDUuNzc0ZDI2NC4zNTJkNzA1Ljc3NGQzMTEuNTQzZDc0NC4xOTVkMzYyLjA3NWQ3ODUuMTIyZDM2Mi4wNzVkODQ4LjZkMTk2LjY5OGQxMDA1LjIwN2QyNjEuMDExZDEwMDUuMjA3ZDI3MS44NjlkOTI4Ljc4M2QyODMuMTQ1ZDkyNS4wMjRkMzAyLjc3M2Q5MTMuMzMxZDI4OS40MDlkOTAzLjcyNWQyNjcuMjc1ZDg4MS4xNzRkMjY3LjI3NWQ4NzMuMjM5ZDI3MC4xOTlkODU4LjIwNWQyNzMuMTIyZDg0My4xNzFkMjczLjEyMmQ4MzUuMjM2ZDI3My4xMjJkNzkzLjg5MmQyNTIuMjQxZDc2NC42NTlkMjI4Ljg1NGQ3MzEuMjQ5ZDE4OS4xODFkNzMxLjI0OWQxMTAuNjY4ZDczMS4yNDlkMTEwLjY2OGQ4MzYuMDcxZDExMC42NjhkMTAwNS4yMDdkMTk2LjY5OGQxMDA1LjIwN2hSM2Q0MTEuNzcxUjRkMzYyLjA3NVI1ZC0yNi43MjdSNmQzMTguMjI1UjdkLTI4NS42NVI4ZDM0NC45NTJSOWQwUjEwZDI4My45OFIxMWkxMDNSMTJkLTI2LjcyN1IxM2Q0MTEuNzcxUjE0YWkxaTNpM2kyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2hnOjIxNW9SMWQ3NDAuMDE5UjJhZDc0LjMzNmQ4ODYuMTg1ZDEzMi44MDJkODQ2LjUxMmQxNzMuNzI5ZDc4Ni43OTJkMTY2LjIxMmQ3NzUuOTM0ZDE3NC45ODJkNzY3LjE2NGQxNzYuNjUyZDc2My44MjNkMTY2LjYyOWQ3NjQuMjQxZDE1NS4zNTNkNzYzLjQwNmQxMjAuMjc0ZDcyMi44OTdkODIuMjdkNjk1Ljc1MmQxMjMuMTk3ZDY1NC44MjVkMTczLjMxMWQ3MjEuMjI2ZDIxNC4yMzhkNzQ2LjI4M2QyNzYuODhkNzAwLjM0NWQzMTQuNDY2ZDY0NS42MzdkMzI0LjA3MWQ2NTUuMjQzZDMwMS45MzhkNzAwLjc2M2QzMzIuODQxZDY2NC4wMTNkMzQ3LjA0ZDY3OC42MjlkMjkzLjU4NWQ3MTcuMDVkMjQ2LjgxMmQ3NzguODU4ZDI4My45OGQ4MzMuOTgzZDMzNy40MzVkODY5LjA2M2QyOTYuNTA4ZDkwOS45OWQyNjUuMTg3ZDg1Ny4zN2QyMDYuMzAzZDgxOS4zNjdkMTgzLjMzNGQ4MzcuMzI0ZDEzMC43MTRkODcwLjMxNmQxMzguMjMxZDg2OC42NDZkMTQ5LjA4OWQ4NjguNjQ2ZDEzMC43MTRkODg3LjAyMWQxMDYuOTFkOTE4Ljc2ZDc0LjMzNmQ4ODYuMTg1aFIzZDQyMS4zNzZSNGQzNDcuMDRSNWQ3NC4zMzZSNmQzNzguMzYyUjdkMTA1LjIzOVI4ZDMwNC4wMjZSOWQwUjEwZDI4My45OFIxMWkyMTVSMTJkNzQuMzM2UjEzZDQyMS4zNzZSMTRhaTFpM2kyaTJpMmkzaTNpMmkzaTNpMmkyaTJpMmkzaTNpMmkzaTNpM2kzaTJoZzoxMDJvUjFkNzQwLjAxOVIyYWQyNjMuMDk5ZDc4MS43ODFkMjQ4LjlkNzUwLjQ2ZDE5OC4zNjhkNzUwLjQ2ZDE4My4zMzRkNzUwLjQ2ZDE3MS42NDFkNzY5LjI1MmQxNzAuMzg4ZDc3MC45MjNkMTU2LjE4OWQ4MDAuOTkxZDEyNi45NTVkNzY3LjE2NGQxNTYuMTg5ZDgwNi4wMDNkMTU2LjE4OWQ5MDMuNzI1ZDE1Ni4xODlkOTIxLjY4M2QxNTQuNzI3ZDk1OC4wMTZkMTUzLjI2NWQ5OTQuMzQ5ZDE1My4yNjVkMTAxMi4zMDZkMTI2Ljk1NWQxMDM1LjI3NWQxNTMuNjgzZDEwNTEuOThkMTUyLjAxM2QxMTI0LjIyOGQxNjEuNjE4ZDExMzMuODMzZDE5OC43ODZkMTEzNi4zMzlkMjMxLjc3OGQxMTUyLjIwOGQxNzcuNDg3ZDExNTAuMTJkMTg5LjE4MWQxMTYzLjQ4NGQxNTAuMzQyZDExODEuNDQyZDk5LjM5M2QxMTkwLjYyOWQ5OC4xNGQxMTkxLjA0N2Q2LjY4MWQxMjAzLjk5M2QyOC44MTVkMTE2Mi42NDlkNjkuMzI0ZDExNDcuMTk3ZDc1LjU4OGQxMTE3Ljk2NGQ3NC4zMzZkMTAwMS44NjZkOTMuNTQ2ZDk2NS45NTFkOTIuNzExZDk2NS4xMTVkNzQuNzUzZDk3My4wNWQ3My45MThkOTcyLjIxNWQ3MC41NzdkOTM2LjcxN2Q3Mi4yNDdkOTM2LjNkNzMuOTE4ZDkzNi4zZDgyLjY4OGQ5MzYuM2QxMTIuMzM5ZDk0MC44OTNkMTE2LjUxNWQ5MzguODA1ZDEwMC42NDZkOTMwLjQ1M2Q3MC41NzdkOTExLjY2ZDkzLjU0NmQ5MTEuNjZkNzIuMjQ3ZDg3NC4wNzVkNzIuMjQ3ZDg2NS43MjJkNzEuODNkODIxLjQ1NWQtMC40MTdkODA5Ljc2MWQtMC40MTdkNzQwLjAxOWQtMC40MTdkNzI4Ljc0M2QxMS45MDJkNzEyLjY2NWQyNC4yMjFkNjk2LjU4N2QzNS4wNzlkNjk0LjA4MWQyMS43MTZkNzE0LjU0NGQyMS43MTZkNzMxLjI0OWQyMS43MTZkNzY4ZDcwLjk5NWQ3NzUuOTM0ZDcwLjU3N2Q3MjQuMTVkNzAuMTU5ZDY0OC41NjFkMTA2LjkxZDU5My40MzVkMTQ5LjA4OWQ1MzAuNzkyZDIyMS43NTVkNTMwLjc5MmQyOTkuMDE0ZDUzMC43OTJkMjk5LjAxNGQ1ODguMDA2ZDI5OS4wMTRkNjAzLjA0ZDI3Ny41MDdkNjE1Ljk4NmQyNTZkNjI4LjkzM2QyNDAuMTNkNjI3LjI2MmQyMzQuNzAxZDYyNi44NDVkMjMzLjg2NmQ2MjYuMDA5ZDIzNS41MzZkNjI5LjM1ZDI1NC4zMjlkNjE1LjE1MWQyNjEuODQ2ZDU5OC4wMjlkMjUwLjE1M2Q1NjIuMTE0ZDIwOS4yMjZkNTYyLjExNGQxNzkuOTkzZDU2Mi4xMTRkMTY0LjEyM2Q2MDAuMTE3ZDE1MC43NmQ2MzIuMjc0ZDE1Mi4wMTNkNjYzLjU5NWQxNTIuODQ4ZDY3My42MThkMTU0LjUxOGQ3MDMuMjY5ZDE1NS43NzFkNzI2LjY1NWQxNTIuMDEzZDc0Mi4xMDdkMTc5LjU3NWQ3MjAuMzkxZDE5MS42ODZkNzIwLjM5MWQyMTIuNTY3ZDcyMC4zOTFkMjU4LjkyM2Q3NDguMzcxZDI2My45MzRkNzY1LjA3NmQyNjMuNTE3ZDc3NC4yNjRkMjYzLjA5OWQ3ODEuNzgxaFIzZDIyOS42OVI0ZDI5OS4wMTRSNWQtMC40MTdSNmQ0OTMuMjA3UjdkLTE3OS45OTNSOGQ0OTMuNjI0UjlkMFIxMGQyODMuOThSMTFpMTAyUjEyZC0wLjQxN1IxM2QyMjkuNjlSMTRhaTFpM2kzaTNpMmkzaTNpM2kyaTJpMmkyaTNpMmkyaTNpM2kzaTNpMmkyaTJpMmkyaTNpM2kyaTNpMmkyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaGc6MjE0b1IxZDc0MC4wMTlSMmFkMjcuMTQ1ZDc4OS43MTZkMjcuMTQ1ZDc4Mi42MTZkMjMuMzg2ZDc2OC4yMDhkMTkuNjI4ZDc1My44ZDE5LjYyOGQ3NDYuNzAxZDIzLjgwNGQ3NDUuNDQ4ZDM4LjgzOGQ3NDUuNDQ4ZDUzLjg3MmQ3NDUuNDQ4ZDc5LjM0N2Q3NDYuNzAxZDcwLjU3N2Q3MzcuNTEzZDIzLjgwNGQ3MTguMzAzZDQ0LjY4NWQ2MjguMDk3ZDExOS40MzhkNTc3Ljk4M2QxODguNzYzZDUzMS4yMWQyODQuODE1ZDUzMS4yMWQzOTcuOTlkNTMxLjIxZDQ3Mi4zMjZkNTk1LjEwNmQ1NTAuODM4ZDY2Mi4zNDJkNTUwLjgzOGQ3NzMuNDI5ZDU1MC44MzhkODg5LjEwOWQ0NzMuNzg3ZDk2My4yMzZkMzk2LjczN2QxMDM3LjM2M2QyODAuNjM5ZDEwMzcuMzYzZDIxOC40MTRkMTAzNy4zNjNkMTU4LjI3N2QxMDA3LjA4NmQ5OC4xNGQ5NzYuODA5ZDYxLjgwN2Q5MjYuNjk0ZDg2LjAyOWQ5MjQuMTg5ZDEwOC45OThkOTE4Ljc2ZDc4LjUxMmQ5MTIuOTEzZDQ2Ljc3M2Q5MDMuNzI1ZDI3LjE0NWQ4NjYuOTc1ZDI3LjE0NWQ3ODkuNzE2ZDEyNi41MzhkNzIwLjM5MWQxMjYuNTM4ZDgwMC45OTFkMTU0LjUxOGQ4NTcuNzg3ZDEzOS4wNjZkODc1LjMyN2QxMjQuMDMyZDg5Ni42MjZkMTM1LjcyNWQ5MDYuMjMxZDE3OC43NGQ5MDguNzM3ZDIwNi4zMDNkOTUwLjQ5OWQyMjUuNTEzZDk2Ny4yMDNkMjU0Ljc0N2Q5OTIuMjYxZDI5NC44MzhkOTkyLjI2MWQzNjAuODIyZDk5Mi4yNjFkNDAxLjc0OGQ5NTIuMzc4ZDQ0Mi42NzVkOTEyLjQ5NWQ0NDIuNjc1ZDg0Ni45MjlkNDQyLjY3NWQ4MTQuNzczZDQzMy4wN2Q3NzUuMDk5ZDQ0MS40MjJkNzc0LjI2NGQ0NTcuNzA5ZDc3NC4yNjRkNDc0LjQxNGQ3NzQuMjY0ZDQ5OS4wNTNkNzc1LjA5OWQ0MjcuMjIzZDc1Mi45NjVkNDIyLjYyOWQ3MzUuNDI1ZDQyOC4wNThkNzMxLjI0OWQ0MzAuOTgyZDcyMi40NzlkNDMwLjE0NmQ3MjAuODA5ZDQxMi4xODlkNzA2LjE5MmQ0NTUuMjAzZDY5OS41MWQ0MjUuOTdkNjg0LjQ3NmQzOTMuODE0ZDY2NC4wMTNkMzQyLjQ0NmQ1NzcuOTgzZDI3NC4zNzVkNTc3Ljk4M2QxMjYuNTM4ZDU3Ny45ODNkMTI2LjUzOGQ3MjAuMzkxZDIyNS45MzFkMzMyLjAwNmQyNDQuNzI0ZDMzMi4wMDZkMjU5LjEzMmQzNDMuMjgyZDI3My41MzlkMzU0LjU1N2QyNzMuNTM5ZDM3Mi45MzNkMjczLjUzOWQ0MTIuMTg5ZDI0Ny42NDdkNDEyLjE4OWQyMTMuNDAyZDQxMi4xODlkMjAzLjc5N2Q0MDkuMjY1ZDE4Mi4wODFkNDAyLjU4NGQxODIuMDgxZDM3Ni42OTFkMTgyLjA4MWQzNTkuMTUxZDE5NS4yMzZkMzQ1LjU3OWQyMDguMzkxZDMzMi4wMDZkMjI1LjkzMWQzMzIuMDA2ZDM1Ni4yMjhkMzI4LjI0N2QzNzUuMDIxZDMyOC4yNDdkMzg5LjQyOWQzMzkuNTIzZDQwMy44MzZkMzUwLjc5OWQ0MDMuODM2ZDM2OS4xNzRkNDAzLjgzNmQ0MDcuMTc3ZDM4MS4yODVkNDA3LjE3N2QzNzcuMTA5ZDQwNy4xNzdkMzY5LjM4M2Q0MDUuNTA3ZDM2MS42NTdkNDAzLjgzNmQzNTcuODk4ZDQwMy44MzZkMzMyLjAwNmQ0MDMuNDE5ZDMyNS4zMjRkNDAwLjQ5NWQzMTIuMzc4ZDM5NC42NDlkMzEyLjM3OGQzNzIuOTMzZDMxMi4zNzhkMzU0Ljk3NWQzMjUuMzI0ZDM0MS42MTFkMzM4LjI3ZDMyOC4yNDdkMzU2LjIyOGQzMjguMjQ3aFIzZDU3MC4wNDhSNGQ1NTAuODM4UjVkMTkuNjI4UjZkNjk1Ljc1MlI3ZC0xMy4zNjNSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMjE0UjEyZDE5LjYyOFIxM2Q1NzAuMDQ4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMDFvUjFkNzQwLjAxOVIyYWQzMS43MzhkODI1LjIxM2Q2Ny42NTRkNzA1Ljc3NGQxNzUuMzk5ZDcwNS43NzRkMzE4LjY0MmQ3MDUuNzc0ZDMyMy42NTRkODM4Ljk5NWQyODkuNDA5ZDg0Ny43NjVkOTkuODFkODc0LjA3NWQ5OC4xNGQ4ODkuOTQ0ZDk4LjE0ZDkwNC4xNDNkMTAwLjIyOGQ5MTQuNTg0ZDExMC4yNTFkOTE4Ljc2ZDEyOS40NjFkOTQ4LjgyOGQ5Ni40NjlkOTcwLjEyN2QxNTUuMzUzZDk1MC45MTZkMTMyLjM4NGQ5NzQuNzIxZDExNi41MTVkOTgxLjgyZDEzMi44MDJkOTc5LjczMmQxNDUuMzMxZDk2Mi4xOTJkMTU4LjY5NGQ5NjIuMTkyZDE2Ni42MjlkOTYyLjE5MmQxODIuNDk5ZDk2OC44NzRkMTk4LjM2OGQ5NzUuNTU2ZDIwNi4zMDNkOTc1LjU1NmQyNDMuNDcxZDk3NS41NTZkMjY4LjExZDk2My44NjJkMjgxLjg5MmQ5NTYuNzYzZDMyNi4xNTlkOTMzLjc5NGQzMjkuMDgzZDkzNC42MjlkMjcyLjI4N2QxMDMwLjI2NGQxODUuMDA0ZDEwMzAuMjY0ZDExNy43NjhkMTAzMC4yNjRkNzMuNWQ5OTAuNTlkMjcuMTQ1ZDk0OS42NjNkMjYuNzI3ZDg4My4yNjJkMzAuNDg2ZDg3OS45MjFkNTUuOTZkODg4LjY5MWQ1OC40NjZkODg0LjkzM2Q0OC40NDNkODY1LjMwNWQzMS43MzhkODI1LjIxM2QyNTguOTIzZDgyMS4wMzdkMjU4LjUwNWQ3ODMuMDM0ZDIzNC4wNzVkNzU4LjYwM2QyMDkuNjQ0ZDczNC4xNzJkMTcxLjY0MWQ3MzQuMTcyZDEwOS40MTVkNzM0LjE3MmQxMDEuODk4ZDg1MC4yN2QxOTkuMjAzZDgzMy4xNDhkMjAxLjcwOWQ4MjguOTcyZDIwMC44NzRkODIxLjQ1NWQyMDEuMjkyZDgyMS4wMzdkMjEwLjA2MWQ4MjguMTM3ZDIyOC44NTRkODQwLjY2NWQyMzMuMDNkODM3LjMyNGQyMzEuMzZkODMyLjczZDIyOS42OWQ4MjYuODg0ZDIzMC4xMDdkODI2LjA0OGQyMzIuMTk1ZDgyNy43MTlkMjU4LjkyM2Q4MjEuMDM3aFIzZDM1Ni4yMjhSNGQzMjkuMDgzUjVkMjYuNzI3UjZkMzE4LjIyNVI3ZC02LjI2NFI4ZDI5MS40OTdSOWQwUjEwZDI4My45OFIxMWkxMDFSMTJkMjYuNzI3UjEzZDM1Ni4yMjhSMTRhaTFpM2kzaTNpM2kyaTNpMmkyaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTFpM2kzaTNpMmkyaTJpMmkzaTJpM2kyaTJpMmhnOjIxM29SMWQ3NDAuMDE5UjJhZDI3LjE0NWQ3ODkuNzE2ZDI3LjE0NWQ3ODIuNjE2ZDIzLjM4NmQ3NjguMjA4ZDE5LjYyOGQ3NTMuOGQxOS42MjhkNzQ2LjcwMWQyMy44MDRkNzQ1LjQ0OGQzOC44MzhkNzQ1LjQ0OGQ1My44NzJkNzQ1LjQ0OGQ3OS4zNDdkNzQ2LjcwMWQ3MC41NzdkNzM3LjUxM2QyMy44MDRkNzE4LjMwM2Q0NC42ODVkNjI4LjA5N2QxMTkuNDM4ZDU3Ny45ODNkMTg4Ljc2M2Q1MzEuMjFkMjg0LjgxNWQ1MzEuMjFkMzk3Ljk5ZDUzMS4yMWQ0NzIuMzI2ZDU5NS4xMDZkNTUwLjgzOGQ2NjIuMzQyZDU1MC44MzhkNzczLjQyOWQ1NTAuODM4ZDg4OS4xMDlkNDczLjc4N2Q5NjMuMjM2ZDM5Ni43MzdkMTAzNy4zNjNkMjgwLjYzOWQxMDM3LjM2M2QyMTguNDE0ZDEwMzcuMzYzZDE1OC4yNzdkMTAwNy4wODZkOTguMTRkOTc2LjgwOWQ2MS44MDdkOTI2LjY5NGQ4Ni4wMjlkOTI0LjE4OWQxMDguOTk4ZDkxOC43NmQ3OC41MTJkOTEyLjkxM2Q0Ni43NzNkOTAzLjcyNWQyNy4xNDVkODY2Ljk3NWQyNy4xNDVkNzg5LjcxNmQxMjYuNTM4ZDcyMC4zOTFkMTI2LjUzOGQ4MDAuOTkxZDE1NC41MThkODU3Ljc4N2QxMzkuMDY2ZDg3NS4zMjdkMTI0LjAzMmQ4OTYuNjI2ZDEzNS43MjVkOTA2LjIzMWQxNzguNzRkOTA4LjczN2QyMDYuMzAzZDk1MC40OTlkMjI1LjUxM2Q5NjcuMjAzZDI1NC43NDdkOTkyLjI2MWQyOTQuODM4ZDk5Mi4yNjFkMzYwLjgyMmQ5OTIuMjYxZDQwMS43NDhkOTUyLjM3OGQ0NDIuNjc1ZDkxMi40OTVkNDQyLjY3NWQ4NDYuOTI5ZDQ0Mi42NzVkODE0Ljc3M2Q0MzMuMDdkNzc1LjA5OWQ0NDEuNDIyZDc3NC4yNjRkNDU3LjcwOWQ3NzQuMjY0ZDQ3NC40MTRkNzc0LjI2NGQ0OTkuMDUzZDc3NS4wOTlkNDI3LjIyM2Q3NTIuOTY1ZDQyMi42MjlkNzM1LjQyNWQ0MjguMDU4ZDczMS4yNDlkNDMwLjk4MmQ3MjIuNDc5ZDQzMC4xNDZkNzIwLjgwOWQ0MTIuMTg5ZDcwNi4xOTJkNDU1LjIwM2Q2OTkuNTFkNDI1Ljk3ZDY4NC40NzZkMzkzLjgxNGQ2NjQuMDEzZDM0Mi40NDZkNTc3Ljk4M2QyNzQuMzc1ZDU3Ny45ODNkMTI2LjUzOGQ1NzcuOTgzZDEyNi41MzhkNzIwLjM5MWQzODkuMjJkMzE5Ljg5NWQ0MDguNDNkMzI2LjU3N2Q0MjQuM2QzNTAuMzgxZDQyMi4yMTJkNDE4LjQ1M2QzNTYuMjI4ZDQxOC40NTNkMzMwLjMzNmQ0MTguNDUzZDI3Ny45MjRkMzk0LjIzMWQyMjUuNTEzZDM3MC4wMDlkMjAwLjAzOWQzNzAuMDA5ZDE4Ni4yNTdkMzcwLjAwOWQxNzUuMTlkMzc5LjQwNmQxNjQuMTIzZDM4OC44MDJkMTY0LjEyM2Q0MDIuMTY2ZDE2NC4xMjNkNDIwLjU0MWQxODcuMDkyZDQzNC4zMjNkMTQ2LjE2NmQ0MjAuNTQxZDE0Ni4xNjZkNDAzLjgzNmQxNDYuMTY2ZDMzMS41ODhkMjA2LjMwM2QzMzEuNTg4ZDIzMy40NDhkMzMxLjU4OGQyODYuMDY4ZDM1Ni4wMTlkMzM4LjY4OGQzODAuNDVkMzY1LjgzM2QzODAuNDVkNDA4LjAxM2QzODAuNDVkNDA4LjAxM2QzNTIuNDY5ZDQwOC4wMTNkMzM3LjQzNWQzODkuMjJkMzE5Ljg5NWhSM2Q1NzAuMDQ4UjRkNTUwLjgzOFI1ZDE5LjYyOFI2ZDcwNC4xMDRSN2QtMTMuMzYzUjhkNjg0LjQ3NlI5ZDBSMTBkMjgzLjk4UjExaTIxM1IxMmQxOS42MjhSMTNkNTcwLjA0OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjEwMG9SMWQ3NDAuMDE5UjJhZDIwMS43MDlkNzEwLjM2OGQyNDIuMjE4ZDcxMC4zNjhkMjc4Ljk2OWQ3MzguMzQ5ZDI3OC45NjlkNzA4LjI4ZDMxMi4zNzhkNzM1LjAwOGQyNzguMTMzZDY4MS41NTNkMjc1LjIxZDY3MC42OTRkMjczLjEyMmQ2NjMuMTc3ZDI3My4xMjJkNTk1LjEwNmQyNzMuMTIyZDU3MS43MTlkMjUyLjI0MWQ1NzEuNzE5ZDIzNS41MzZkNTcxLjcxOWQyMTcuNTc5ZDU5NS41MjNkMjM4Ljg3N2Q1NTUuNDMyZDI1MS40MDZkNTQzLjczOGQyNzEuMDM0ZDUyNS43ODFkMzA3Ljc4NGQ1MjUuNzgxZDM0MS42MTFkNTI1Ljc4MWQzNTkuOTg2ZDUyOC43MDRkMzYyLjQ5MmQ1NDAuMzk4ZDM2Mi40OTJkNTQ3LjkxNWQzNTIuNDY5ZDU2NS40NTVkMzYyLjkxZDU4MS4zMjRkMzYyLjkxZDYyOC4wOTdkMzM1Ljc2NWQ2NjAuMjU0ZDM2Mi45MWQ2NTcuMzMxZDM2NC4xNjNkNjk1Ljc1MmQzNjIuNDkyZDc2NS4wNzZkMzM3LjAxN2Q3OTAuMTMzZDM2Mi45MWQ3OTMuNDc0ZDM2Mi40OTJkNzk3LjIzM2QzMTUuNzE5ZDg1MS41MjNkMzYzLjc0NWQ4MzMuNTY2ZDM2Mi4wNzVkODkxLjE5N2QzNjEuNjU3ZDkwNi4yMzFkMzY0LjU4ZDk3Ny4yMjZkMzk2LjczN2Q5ODIuNjU1ZDQxMi4xODlkMTAwNC43ODlkNDIwLjEyM2QxMDIyLjc0N2Q0MTUuMTEyZDEwNDIuMzc1ZDQwNS41MDdkMTA2Ny44NDlkNDA5LjI2NWQxMDUxLjE0NWQ0MDkuMjY1ZDEwMzkuNDUxZDQwOS4yNjVkMTAwOC45NjVkMzc5LjE5N2QxMDA4Ljk2NWQzNjUuNDE1ZDEwMDguOTY1ZDMzNS41NTZkMTAyMC44NjdkMzA1LjY5NmQxMDMyLjc2OWQyOTIuMzMyZDEwMzIuMzUyZDI4Mi43MjdkMTAzMS45MzRkMjk3LjM0NGQ5ODEuNDAyZDIyOC44NTRkMTAyNS4yNTJkMTc2LjIzNGQxMDI1LjI1MmQxMDUuNjU3ZDEwMjUuMjUyZDY2LjQwMWQ5NzkuNzMyZDI4LjgxNWQ5MzYuNzE3ZDI4LjgxNWQ4NjUuMzA1ZDI4LjgxNWQ4NDUuNjc2ZDMyLjk5MWQ4MjguMTM3ZDM0LjI0NGQ4MjcuMzAxZDY1LjE0OGQ4NDcuMzQ3ZDY1Ljk4M2Q4NDYuNTEyZDY1Ljk4M2Q4NDQuMDA2ZDY1Ljk4M2Q4MjYuODg0ZDM4LjgzOGQ3OTguMDY4ZDM4LjgzOGQ3NjcuMTY0ZDEwNS4yMzlkNzM3LjA5NmQxNjQuMTIzZDcxMC4zNjhkMjAxLjcwOWQ3MTAuMzY4ZDIyNS41MTNkOTgzLjQ5MWQyMzguODc3ZDk4My40OTFkMjU4LjUwNWQ5NzAuNTQ0ZDI3OS44MDRkOTU3LjE4MWQyODAuNjM5ZDk0NC42NTJkMjgyLjcyN2Q5MTMuNzQ4ZDI4Mi43MjdkODU0LjAyOWQyODIuNzI3ZDc0Ni43MDFkMjA0LjIxNWQ3NDYuNzAxZDE2MS4yZDc0Ni43MDFkMTMzLjYzN2Q3ODcuMjFkMTA5LjQxNWQ4MjMuMTI1ZDEwOS40MTVkODY4LjIyOGQxMDkuNDE1ZDkyMi45MzZkMTQwLjExZDk1My4yMTNkMTcwLjgwNWQ5ODMuNDkxZDIyNS41MTNkOTgzLjQ5MWhSM2Q0MTkuNzA2UjRkNDIwLjEyM1I1ZDI4LjgxNVI2ZDQ5OC4yMThSN2QtNDMuODQ5UjhkNDY5LjQwMlI5ZDBSMTBkMjgzLjk4UjExaTEwMFIxMmQyOC44MTVSMTNkNDE5LjcwNlIxNGFpMWkzaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkyaTJpMmkyaTJpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTJpMmkyaTJpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzoyMTJvUjFkNzQwLjAxOVIyYWQyNy4xNDVkNzg5LjcxNmQyNy4xNDVkNzgyLjYxNmQyMy4zODZkNzY4LjIwOGQxOS42MjhkNzUzLjhkMTkuNjI4ZDc0Ni43MDFkMjMuODA0ZDc0NS40NDhkMzguODM4ZDc0NS40NDhkNTMuODcyZDc0NS40NDhkNzkuMzQ3ZDc0Ni43MDFkNzAuNTc3ZDczNy41MTNkMjMuODA0ZDcxOC4zMDNkNDQuNjg1ZDYyOC4wOTdkMTE5LjQzOGQ1NzcuOTgzZDE4OC43NjNkNTMxLjIxZDI4NC44MTVkNTMxLjIxZDM5Ny45OWQ1MzEuMjFkNDcyLjMyNmQ1OTUuMTA2ZDU1MC44MzhkNjYyLjM0MmQ1NTAuODM4ZDc3My40MjlkNTUwLjgzOGQ4ODkuMTA5ZDQ3My43ODdkOTYzLjIzNmQzOTYuNzM3ZDEwMzcuMzYzZDI4MC42MzlkMTAzNy4zNjNkMjE4LjQxNGQxMDM3LjM2M2QxNTguMjc3ZDEwMDcuMDg2ZDk4LjE0ZDk3Ni44MDlkNjEuODA3ZDkyNi42OTRkODYuMDI5ZDkyNC4xODlkMTA4Ljk5OGQ5MTguNzZkNzguNTEyZDkxMi45MTNkNDYuNzczZDkwMy43MjVkMjcuMTQ1ZDg2Ni45NzVkMjcuMTQ1ZDc4OS43MTZkMTI2LjUzOGQ3MjAuMzkxZDEyNi41MzhkODAwLjk5MWQxNTQuNTE4ZDg1Ny43ODdkMTM5LjA2NmQ4NzUuMzI3ZDEyNC4wMzJkODk2LjYyNmQxMzUuNzI1ZDkwNi4yMzFkMTc4Ljc0ZDkwOC43MzdkMjA2LjMwM2Q5NTAuNDk5ZDIyNS41MTNkOTY3LjIwM2QyNTQuNzQ3ZDk5Mi4yNjFkMjk0LjgzOGQ5OTIuMjYxZDM2MC44MjJkOTkyLjI2MWQ0MDEuNzQ4ZDk1Mi4zNzhkNDQyLjY3NWQ5MTIuNDk1ZDQ0Mi42NzVkODQ2LjkyOWQ0NDIuNjc1ZDgxNC43NzNkNDMzLjA3ZDc3NS4wOTlkNDQxLjQyMmQ3NzQuMjY0ZDQ1Ny43MDlkNzc0LjI2NGQ0NzQuNDE0ZDc3NC4yNjRkNDk5LjA1M2Q3NzUuMDk5ZDQyNy4yMjNkNzUyLjk2NWQ0MjIuNjI5ZDczNS40MjVkNDI4LjA1OGQ3MzEuMjQ5ZDQzMC45ODJkNzIyLjQ3OWQ0MzAuMTQ2ZDcyMC44MDlkNDEyLjE4OWQ3MDYuMTkyZDQ1NS4yMDNkNjk5LjUxZDQyNS45N2Q2ODQuNDc2ZDM5My44MTRkNjY0LjAxM2QzNDIuNDQ2ZDU3Ny45ODNkMjc0LjM3NWQ1NzcuOTgzZDEyNi41MzhkNTc3Ljk4M2QxMjYuNTM4ZDcyMC4zOTFkMTc3LjQ4N2Q0MzQuNzRkMTg0LjU4N2Q0MjguNDc2ZDIzNC4yODNkMzc4Ljc3OWQyNDMuMDUzZDM3Ny4xMDlkMjU3LjY3ZDM3MC44NDVkMjU1LjE2NGQzNjcuNTA0ZDI1MC45ODhkMzYwLjgyMmQyNjMuNTE3ZDM1NC4xNGQyNjQuMzUyZDM0My4yODJkMjc2LjQ2M2QzMjAuMzEzZDI5MS4wNzlkMjkyLjc1ZDI5My4xNjhkMjgzLjk4ZDI5Ny43NjFkMjgzLjk4ZDMzNS4zNDdkMzc3Ljk0NGQ0MDIuNTg0ZDQzNC43NGQzNjIuOTFkNDM0Ljc0ZDM1OS4xNTFkNDM0Ljc0ZDM0NS43ODdkNDI3LjIyM2QzMzIuNDI0ZDQxOS43MDZkMzMxLjU4OGQ0MTYuNzgzZDMzNC4wOTRkNDEyLjE4OWQzMzcuODUzZDQwMi4xNjZkMzM3LjQzNWQ0MDAuNDk1ZDMzMC43NTNkNDAyLjU4NGQzMjYuNTc3ZDQwMi4xNjZkMzIxLjU2NmQ0MDEuNzQ4ZDMyMC43M2QzODkuNjM3ZDMxNy44MDdkMzc0LjE4NWQzMTUuNzE5ZDM4Mi4xMmQzMTIuMzc4ZDM4OC44MDJkMzA5LjAzN2QzODMuNzkxZDI5NC40MmQzNTcuNDgxZDI2OC45NDZkMzk4LjQwN2QyMTUuNDkxZDQzNC43NGQxNzcuNDg3ZDQzNC43NGhSM2Q1NzAuMDQ4UjRkNTUwLjgzOFI1ZDE5LjYyOFI2ZDc0MC4wMTlSN2QtMTMuMzYzUjhkNzIwLjM5MVI5ZDBSMTBkMjgzLjk4UjExaTIxMlIxMmQxOS42MjhSMTNkNTcwLjA0OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6OTlvUjFkNzQwLjAxOVIyYWQzMzYuMTgyZDkxMC40MDdkMzM5LjEwNmQ5MjAuMDEzZDMzOS4xMDZkOTI3Ljk0N2QzMzYuMTgyZDk0My4zOTlkMzI2LjE1OWQ5NTAuMDgxZDMwNy43ODRkOTY0LjI4ZDMwOS4wMzdkOTY0LjY5OGQzMjUuMzI0ZDk2MS4zNTdkMjc2LjA0NWQxMDA2Ljg3N2QyNjguOTQ2ZDEwMTEuNDcxZDI0MC41NDhkMTAyOS44NDZkMTk0LjE5MmQxMDI5Ljg0NmQxMzEuOTY3ZDEwMjkuODQ2ZDg4LjExN2Q5OTcuNjlkNDEuMzQ0ZDk2My40NDVkMzEuNzM4ZDkwMy43MjVkNDIuNTk3ZDg5Ny4wNDRkNjMuMDZkODgyLjAwOWQ1OC40NjZkODc4LjY2OGQ0MS4zNDRkODc2LjE2M2QyNi43MjdkODc0LjA3NWQyNS4wNTdkODY5LjA2M2Q2Ni44MThkNzA0LjkzOWQyMjAuNTAyZDcwNC45MzlkMzM1LjM0N2Q3MDQuOTM5ZDMzNS4zNDdkNzY1LjA3NmQzMzUuMzQ3ZDc4My40NTFkMzA3LjM2N2Q3OTguMDY4ZDI4Mi43MjdkODExLjAxNGQyNjIuNjgxZDgxMS4wMTRkMjU3LjY3ZDgxMS4wMTRkMjUzLjkxMWQ4MTAuMTc5ZDI1NmQ4MTQuNzczZDI2My4wOTlkODEwLjU5N2QyNzguMTMzZDc5Mi40M2QyOTMuMTY4ZDc3NC4yNjRkMjkzLjE2OGQ3NjhkMjkzLjE2OGQ3NTEuNzEyZDI2NC43NjlkNzQxLjI3MmQyNDMuMDUzZDczMy4zMzdkMjIyLjE3MmQ3MzMuMzM3ZDE2Ny44ODJkNzMzLjMzN2QxMzQuODlkNzcwLjUwNWQxMDIuNzM0ZDgwNi4wMDNkMTAyLjczNGQ4NjAuNzExZDEwMi43MzRkOTEyLjQ5NWQxMzguNjQ5ZDk0NS40ODdkMTczLjMxMWQ5NzcuNjQ0ZDIyNS41MTNkOTc3LjY0NGQyNzguNTUxZDk3Ny42NDRkMzM2LjE4MmQ5MTAuNDA3aFIzZDM1Ni4yMjhSNGQzMzkuMTA2UjVkMjUuMDU3UjZkMzE5LjA2UjdkLTUuODQ2UjhkMjk0LjAwM1I5ZDBSMTBkMjgzLjk4UjExaTk5UjEyZDI1LjA1N1IxM2QzNTYuMjI4UjE0YWkxaTJpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjExb1IxZDc0MC4wMTlSMmFkMjcuMTQ1ZDc4OS43MTZkMjcuMTQ1ZDc4Mi42MTZkMjMuMzg2ZDc2OC4yMDhkMTkuNjI4ZDc1My44ZDE5LjYyOGQ3NDYuNzAxZDIzLjgwNGQ3NDUuNDQ4ZDM4LjgzOGQ3NDUuNDQ4ZDUzLjg3MmQ3NDUuNDQ4ZDc5LjM0N2Q3NDYuNzAxZDcwLjU3N2Q3MzcuNTEzZDIzLjgwNGQ3MTguMzAzZDQ0LjY4NWQ2MjguMDk3ZDExOS40MzhkNTc3Ljk4M2QxODguNzYzZDUzMS4yMWQyODQuODE1ZDUzMS4yMWQzOTcuOTlkNTMxLjIxZDQ3Mi4zMjZkNTk1LjEwNmQ1NTAuODM4ZDY2Mi4zNDJkNTUwLjgzOGQ3NzMuNDI5ZDU1MC44MzhkODg5LjEwOWQ0NzMuNzg3ZDk2My4yMzZkMzk2LjczN2QxMDM3LjM2M2QyODAuNjM5ZDEwMzcuMzYzZDIxOC40MTRkMTAzNy4zNjNkMTU4LjI3N2QxMDA3LjA4NmQ5OC4xNGQ5NzYuODA5ZDYxLjgwN2Q5MjYuNjk0ZDg2LjAyOWQ5MjQuMTg5ZDEwOC45OThkOTE4Ljc2ZDc4LjUxMmQ5MTIuOTEzZDQ2Ljc3M2Q5MDMuNzI1ZDI3LjE0NWQ4NjYuOTc1ZDI3LjE0NWQ3ODkuNzE2ZDEyNi41MzhkNzIwLjM5MWQxMjYuNTM4ZDgwMC45OTFkMTU0LjUxOGQ4NTcuNzg3ZDEzOS4wNjZkODc1LjMyN2QxMjQuMDMyZDg5Ni42MjZkMTM1LjcyNWQ5MDYuMjMxZDE3OC43NGQ5MDguNzM3ZDIwNi4zMDNkOTUwLjQ5OWQyMjUuNTEzZDk2Ny4yMDNkMjU0Ljc0N2Q5OTIuMjYxZDI5NC44MzhkOTkyLjI2MWQzNjAuODIyZDk5Mi4yNjFkNDAxLjc0OGQ5NTIuMzc4ZDQ0Mi42NzVkOTEyLjQ5NWQ0NDIuNjc1ZDg0Ni45MjlkNDQyLjY3NWQ4MTQuNzczZDQzMy4wN2Q3NzUuMDk5ZDQ0MS40MjJkNzc0LjI2NGQ0NTcuNzA5ZDc3NC4yNjRkNDc0LjQxNGQ3NzQuMjY0ZDQ5OS4wNTNkNzc1LjA5OWQ0MjcuMjIzZDc1Mi45NjVkNDIyLjYyOWQ3MzUuNDI1ZDQyOC4wNThkNzMxLjI0OWQ0MzAuOTgyZDcyMi40NzlkNDMwLjE0NmQ3MjAuODA5ZDQxMi4xODlkNzA2LjE5MmQ0NTUuMjAzZDY5OS41MWQ0MjUuOTdkNjg0LjQ3NmQzOTMuODE0ZDY2NC4wMTNkMzQyLjQ0NmQ1NzcuOTgzZDI3NC4zNzVkNTc3Ljk4M2QxMjYuNTM4ZDU3Ny45ODNkMTI2LjUzOGQ3MjAuMzkxZDIzNC4yODNkNDQyLjY3NWQzNjkuNTkyZDM1NC45NzVkMzY5LjU5MmQzMjIuODE4ZDM2OS41OTJkMzIwLjczZDM0OC45MmQzMDIuOTgyZDMyOC4yNDdkMjg1LjIzM2QzMjUuMzI0ZDI4NS4yMzNkMzA2LjUzMWQyODUuMjMzZDI3My4xMjJkMzUzLjcyMmQyNjYuMDIyZDM2Ny45MjFkMjM0LjI4M2Q0NDIuNjc1aFIzZDU3MC4wNDhSNGQ1NTAuODM4UjVkMTkuNjI4UjZkNzM4Ljc2NlI3ZC0xMy4zNjNSOGQ3MTkuMTM4UjlkMFIxMGQyODMuOThSMTFpMjExUjEyZDE5LjYyOFIxM2Q1NzAuMDQ4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMWkzaTNpM2kzaTNoZzo5OG9SMWQ3NDAuMDE5UjJhZDEzNS4zMDhkNTIxLjE4N2QxMzYuNTYxZDUzMi44OGQxMjUuMjg1ZDU1Ni42ODVkMTM2LjE0M2Q1NTEuNjczZDEzNi45NzhkNjUzLjE1NGQxMDYuOTFkNjg2LjU2NGQxMzcuMzk2ZDY4NC44OTNkMTM4LjIzMWQ3NTUuODg5ZDE4My4zMzRkNzA2LjE5MmQyNDUuNTU5ZDcwNi4xOTJkMzQ3Ljg3NmQ3MDYuMTkyZDM4My43OTFkODAwLjE1NmQzNzMuMzVkODExLjAxNGQzNjQuMTYzZDgyNi44ODRkMzc0LjE4NWQ4MzAuNjQyZDM5MC44OWQ4NDEuOTE4ZDM5MC44OWQ4ODIuMDA5ZDM5MC44OWQ5NDYuMzIzZDMzMi44NDFkOTg4LjA4NGQyODAuNjM5ZDEwMjUuNjdkMjE1LjA3M2QxMDI1LjY3ZDE3NC4xNDZkMTAyNS42N2QxMDMuMTUxZDk4My45MDhkOTcuNzIyZDEwMzUuNjkzZDc3LjI1OWQxMDM1LjY5M2Q2MC45NzJkMTAzNS42OTNkNDkuNjk2ZDEwMjRkNjYuNDAxZDEwMjYuMDg4ZDc2LjQyNGQxMDE4Ljk4OGQ3Ni40MjRkMTAwNC43ODlkNzYuNDI0ZDEwMTEuMDUzZDcxLjQxMmQ5NzAuOTYyZDgxLjg1M2Q5NTYuMzQ1ZDczLjA4M2Q5NTguODUxZDY5Ljc0MmQ5NTQuNjc1ZDcwLjE1OWQ4MTguNTMxZDEwNi45MWQ3OTAuMTMzZDY4LjQ4OWQ3ODMuNDUxZDcwLjE1OWQ3MjMuMzE0ZDkwLjIwNWQ3MTMuMjkyZDYwLjU1NGQ2NzguNjI5ZDYwLjU1NGQ2NjEuOTI0ZDYwLjU1NGQ2NTMuNTcyZDY0LjEwNGQ2MzcuMDc2ZDY3LjY1NGQ2MjAuNThkNjcuNjU0ZDYxMi4yMjhkNjcuNjU0ZDU5NS45NDFkNDUuNTJkNTk1Ljk0MWQzNi4zMzJkNTk1Ljk0MWQyNi43MjdkNjA1LjU0NmQyOC44MTVkNTYyLjk0OWQxMzUuMzA4ZDUyMS4xODdkMTM3LjM5NmQ3OTIuNjM5ZDEzNy4zOTZkODI2Ljg4NGQxMzcuMzk2ZDgyOS4zODlkMTQwLjczN2Q4NDcuMzQ3ZDE0MC43MzdkODQ5LjAxN2QxNDEuOTlkODU1LjI4MmQxMzcuODE0ZDg1OS40NThkMTIxLjEwOWQ4NjQuNDY5ZDEwNC40MDRkODY5LjQ4MWQxMDAuMjI4ZDg3My42NTdkMTMxLjEzMmQ4NzMuNjU3ZDEzNy44MTRkODc1LjMyN2QxMzEuNTQ5ZDg4NC4wOTdkMTIwLjI3NGQ5MDIuMDU1ZDEzNy44MTRkOTE1LjQxOWQxMzcuODE0ZDk0OC44MjhkMTU2LjgxNWQ5NjkuNzA5ZDE3NS44MTdkOTkwLjU5ZDIwOC44MDlkOTkwLjU5ZDI1OS43NThkOTkwLjU5ZDI4OS44MjdkOTU1LjUxZDMxOC4yMjVkOTIyLjUxOGQzMTguMjI1ZDg3MC43MzRkMzE4LjIyNWQ4MjEuODcyZDI5Mi4zMzJkNzkwLjk2OWQyNjQuNzY5ZDc1Ny45NzdkMjE2Ljc0M2Q3NTcuOTc3ZDE5OS42MjFkNzU3Ljk3N2QxNzQuNzczZDc2OS4wNDRkMTQ5LjkyNGQ3ODAuMTFkMTM3LjM5NmQ3OTIuNjM5aFIzZDQxOS43MDZSNGQzOTAuODlSNWQyNi43MjdSNmQ1MDIuODEyUjdkLTExLjY5M1I4ZDQ3Ni4wODRSOWQwUjEwZDI4My45OFIxMWk5OFIxMmQyNi43MjdSMTNkNDE5LjcwNlIxNGFpMWkyaTJpMmkyaTJpMmkyaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkyaTJpMmkyaTNpM2kzaTNpM2kzaTFpMmkzaTNpM2kzaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kzaGc6MjEwb1IxZDc0MC4wMTlSMmFkMjcuMTQ1ZDc4OS43MTZkMjcuMTQ1ZDc4Mi42MTZkMjMuMzg2ZDc2OC4yMDhkMTkuNjI4ZDc1My44ZDE5LjYyOGQ3NDYuNzAxZDIzLjgwNGQ3NDUuNDQ4ZDM4LjgzOGQ3NDUuNDQ4ZDUzLjg3MmQ3NDUuNDQ4ZDc5LjM0N2Q3NDYuNzAxZDcwLjU3N2Q3MzcuNTEzZDIzLjgwNGQ3MTguMzAzZDQ0LjY4NWQ2MjguMDk3ZDExOS40MzhkNTc3Ljk4M2QxODguNzYzZDUzMS4yMWQyODQuODE1ZDUzMS4yMWQzOTcuOTlkNTMxLjIxZDQ3Mi4zMjZkNTk1LjEwNmQ1NTAuODM4ZDY2Mi4zNDJkNTUwLjgzOGQ3NzMuNDI5ZDU1MC44MzhkODg5LjEwOWQ0NzMuNzg3ZDk2My4yMzZkMzk2LjczN2QxMDM3LjM2M2QyODAuNjM5ZDEwMzcuMzYzZDIxOC40MTRkMTAzNy4zNjNkMTU4LjI3N2QxMDA3LjA4NmQ5OC4xNGQ5NzYuODA5ZDYxLjgwN2Q5MjYuNjk0ZDg2LjAyOWQ5MjQuMTg5ZDEwOC45OThkOTE4Ljc2ZDc4LjUxMmQ5MTIuOTEzZDQ2Ljc3M2Q5MDMuNzI1ZDI3LjE0NWQ4NjYuOTc1ZDI3LjE0NWQ3ODkuNzE2ZDEyNi41MzhkNzIwLjM5MWQxMjYuNTM4ZDgwMC45OTFkMTU0LjUxOGQ4NTcuNzg3ZDEzOS4wNjZkODc1LjMyN2QxMjQuMDMyZDg5Ni42MjZkMTM1LjcyNWQ5MDYuMjMxZDE3OC43NGQ5MDguNzM3ZDIwNi4zMDNkOTUwLjQ5OWQyMjUuNTEzZDk2Ny4yMDNkMjU0Ljc0N2Q5OTIuMjYxZDI5NC44MzhkOTkyLjI2MWQzNjAuODIyZDk5Mi4yNjFkNDAxLjc0OGQ5NTIuMzc4ZDQ0Mi42NzVkOTEyLjQ5NWQ0NDIuNjc1ZDg0Ni45MjlkNDQyLjY3NWQ4MTQuNzczZDQzMy4wN2Q3NzUuMDk5ZDQ0MS40MjJkNzc0LjI2NGQ0NTcuNzA5ZDc3NC4yNjRkNDc0LjQxNGQ3NzQuMjY0ZDQ5OS4wNTNkNzc1LjA5OWQ0MjcuMjIzZDc1Mi45NjVkNDIyLjYyOWQ3MzUuNDI1ZDQyOC4wNThkNzMxLjI0OWQ0MzAuOTgyZDcyMi40NzlkNDMwLjE0NmQ3MjAuODA5ZDQxMi4xODlkNzA2LjE5MmQ0NTUuMjAzZDY5OS41MWQ0MjUuOTdkNjg0LjQ3NmQzOTMuODE0ZDY2NC4wMTNkMzQyLjQ0NmQ1NzcuOTgzZDI3NC4zNzVkNTc3Ljk4M2QxMjYuNTM4ZDU3Ny45ODNkMTI2LjUzOGQ3MjAuMzkxZDMyMi44MThkNDQ3LjI2OWQxODcuNTFkMzU5LjU2OWQxODcuNTFkMzI3LjQxMmQxODcuNTFkMzI1Ljc0MmQyMDguMzkxZDMwNy43ODRkMjI5LjI3MmQyODkuODI3ZDIzMS43NzhkMjg5LjgyN2QyNTAuMTUzZDI4OS44MjdkMjgzLjk4ZDM1OC4zMTZkMjg4LjE1NmQzNjYuNjY4ZDMyMi44MThkNDQ3LjI2OWhSM2Q1NzAuMDQ4UjRkNTUwLjgzOFI1ZDE5LjYyOFI2ZDczNC4xNzJSN2QtMTMuMzYzUjhkNzE0LjU0NFI5ZDBSMTBkMjgzLjk4UjExaTIxMFIxMmQxOS42MjhSMTNkNTcwLjA0OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTFpM2kzaTNpM2kzaGc6OTdvUjFkNzQwLjAxOVIyYWQzMTkuMDZkOTM2LjcxN2QzMzEuNTg4ZDk0My4zOTlkMzM3LjQzNWQ5NTQuMjU3ZDMzNy40MzVkOTc3LjIyNmQzMzcuNDM1ZDEwMjMuNTgyZDI4NS42NWQxMDIzLjU4MmQyNjQuMzUyZDEwMjMuNTgyZDI1My45MTFkMTAwOC45NjVkMjUwLjU3ZDEwMDQuMzcxZDIzOC4wNDJkOTc1LjU1NmQyMDkuMjI2ZDEwMjUuNjdkMTE0Ljg0NWQxMDI1LjY3ZDM5LjY3M2QxMDI1LjY3ZDM5LjY3M2Q5NjcuMjAzZDM5LjY3M2Q5NTQuMjU3ZDQ1LjEwMmQ5NDIuMTQ2ZDU4LjA0OGQ5MzcuOTdkNzIuNjY1ZDkzMC4wMzVkNjMuNDc3ZDkyNy45NDdkNTYuMzc4ZDkyMy4zNTNkNjMuODk1ZDkxOS4xNzdkNzYuMDA2ZDkwNi4yMzFkMTEwLjY2OGQ4OTcuMDQ0ZDk1LjYzNGQ4OTMuMjg1ZDk2LjA1MmQ4OTIuNDVkMTIxLjk0NGQ4NzcuNDE1ZDIyMi4xNzJkODQwLjI0N2QyMjMuMDA4ZDgwMy4wNzlkMjI0LjY3OGQ3MzIuMDg0ZDE4NS4wMDRkNzMyLjA4NGQxNTkuNTNkNzMyLjA4NGQxMjIuNzc5ZDc1MS43MTJkODEuODUzZDc3My40MjlkODEuODUzZDc5NS45OGQ4NS42MTFkODAwLjk5MWQ5NC4zODFkODAwLjk5MWQxMDkuNDE1ZDgwMC45OTFkMTMyLjgwMmQ3OTUuOThkMTExLjkyMWQ4MjAuNjE5ZDEwMy41NjlkODI2Ljg4NGQ4Ny4yODJkODM4Ljk5NWQ2My44OTVkODM4LjU3N2Q0Mi4xNzlkODM4LjE1OWQzNy4xNjhkODI1LjIxM2QzNy4xNjhkNzcwLjA4OGQxMDEuMDYzZDczNi4yNjFkMTUzLjY4M2Q3MDguMjhkMjE0LjY1NWQ3MDguMjhkMjk2LjUwOGQ3MDguMjhkMjk2LjUwOGQ3OTUuNTYyZDI5Ni41MDhkODExLjQzMmQyOTQuMDAzZDg0My4xNzFkMjkxLjQ5N2Q4NzQuOTFkMjkxLjQ5N2Q4OTAuNzc5ZDI5MS40OTdkOTg1Ljk5NmQzMDcuNzg0ZDk4Ni40MTRkMzE5LjQ3N2Q5NzYuMzkxZDMyNS43NDJkOTU0LjY3NWQzMTkuMDZkOTM2LjcxN2QyMjIuMTcyZDg3OC42NjhkMTE4LjYwM2Q4ODcuNDM4ZDExOC42MDNkOTU2LjM0NWQxMDkuNDE1ZDk2MS4zNTdkOTEuODc2ZDk3My4wNWQxMDYuNDkyZDk3Mi42MzJkMTIxLjk0NGQ5NzMuMDVkMTE2LjUxNWQ5NzYuMzkxZDExMi4zMzlkOTgxLjQwMmQxMTkuNDM4ZDk4MS40MDJkMTI4LjIwOGQ5ODIuNjU1ZDEzNi45NzhkOTkzLjA5NmQxNTAuMzQyZDk5My4wOTZkMTgyLjkxNmQ5OTMuMDk2ZDIwMi45NjJkOTc0LjMwM2QyMjMuMDA4ZDk1NS41MWQyMjMuMDA4ZDkyMy4zNTNkMjIzLjAwOGQ4OTIuODY3ZDIyMy4wMDhkODg2LjE4NWQyMjIuMTcyZDg3OC42NjhoUjNkMzU0Ljk3NVI0ZDMzNy40MzVSNWQzNy4xNjhSNmQzMTUuNzE5UjdkLTEuNjdSOGQyNzguNTUxUjlkMFIxMGQyODMuOThSMTFpOTdSMTJkMzcuMTY4UjEzZDM1NC45NzVSMTRhaTFpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkyaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kyaTJpMmkxaTNpM2kyaTJpM2kzaTNpM2kzaTJpM2hnOjIwOW9SMWQ3NDAuMDE5UjJhZDE5LjIxZDU5MS4zNDdkMjUuNDc0ZDU2Ny41NDNkNTAuNTMxZDU1My4zNDRkNzIuNjY1ZDU0MC4zOThkOTguOTc1ZDU0MC4zOThkMTE4LjE4NWQ1NDAuMzk4ZDE1Mi40M2Q1NjcuOTZkMTQ3LjgzNmQ1NjEuMjc4ZDE0MS45OWQ1NDcuNDk3ZDE0Ni41ODRkNTQzLjMyMWQxNjkuMTM1ZDU0Mi40ODZkMTgwLjgyOGQ1NDIuOTAzZDI0NS45NzdkNjAzLjA0ZDI0NS41NTlkNjI0LjMzOWQyNDUuOTc3ZDY0Ni40NzNkMjQ4LjA2NWQ2NDcuMzA4ZDI1Ni40MTdkNjM2LjQ1ZDI2Mi4yNjRkNjE0LjczNGQyNzEuMDM0ZDY0OS44MTRkMjcyLjI4N2Q2NTAuNjQ5ZDI4NS42NWQ2NDIuMjk2ZDI4OS40MDlkNjQyLjI5NmQzNjAuNDA0ZDcxNy4wNWQ1MjkuNTM5ZDg5NC45NTVkNTI5LjUzOWQ4ODUuMzVkNTI5LjUzOWQ2NjUuMjY1ZDUxMC43NDdkNTg4Ljg0MWQ1MDAuMzA2ZDU4Mi4xNTlkNDgxLjkzMWQ1NzYuNzNkNDUxLjg2MmQ1NjcuOTZkNDQ0LjM0NWQ1NTMuMzQ0ZDQ2MS44ODVkNTQ0Ljk5MWQ1MDIuODEyZDU0NC45OTFkNTQ2LjI0NGQ1NDUuODI3ZDYxMC4xNGQ1NDcuMDc5ZDYyNi4wMDlkNTU0LjU5N2Q2MTUuMTUxZDU3MS4zMDFkNTY2LjcwN2Q1ODAuNDg5ZDU0OS41ODVkNjIxLjQxNWQ1NTAuMDAzZDYyMi4yNTFkNTcyLjk3MmQ2MTEuODFkNTc0LjIyNWQ2MTMuMDYzZDU2NS4wMzdkNjQyLjcxNGQ1NjUuMDM3ZDY1Mi4zMTlkNTY1LjAzN2Q3ODEuNzgxZDU2Ni4yOWQ4MTMuMTAyZDU3MC4wNDhkOTA2LjY0OWQ1ODUuOTE4ZDk2OS43MDlkNTU2LjI2N2Q5NzguMDYxZDU3My4zODlkOTk0Ljc2NmQ1NzUuMDZkMTAxMi43MjRkNTY2LjI5ZDEwMTEuMDUzZDU2NC4yMDJkMTAxMy4xNDFkNTcyLjU1NGQxMDI4LjU5M2Q1ODcuNTg4ZDEwNTkuNDk3ZDUyMS42MDVkMTAxNS42NDdkNDg0LjQzN2Q5OTEuMDA4ZDQ2Mi43MjFkOTYzLjAyN2Q0NTIuNjk4ZDkxOS41OTVkNDM4LjA4MWQ5MzguMzg4ZDM1MS42MzRkODQ0LjAwNmQzMTkuMDZkODI4LjEzN2Q0MDIuNTg0ZDg0OC4xODJkMzE5LjQ3N2Q4MTAuNTk3ZDI2Ni4wMjJkNzY2LjMyOWQyMzEuNzc4ZDczNy45MzFkMTU1LjM1M2Q2NTUuMjQzZDE1OC42OTRkNzkzLjQ3NGQxNTguNjk0ZDc5OS43MzhkMTUzLjY4M2Q4MTQuNzczZDE0Ny44MzZkODMxLjg5NWQxNDcuMDAxZDgzNi45MDdkMTQ3LjgzNmQ4MzguMTU5ZDE2NS43OTRkODM2LjQ4OWQxNjAuNzgzZDg5NC41MzhkMTU3LjAyNGQ5MzYuNzE3ZDE3MS4yMjNkOTg1LjU3OWQxOTYuMjhkOTkwLjU5ZDI0My40NzFkMTAwOC4xM2QyMjguNDM3ZDEwMjUuNjdkMjEzLjgyZDEwMjYuMDg4ZDQ1LjkzOGQxMDI0LjQxN2QzOS42NzNkMTAyMy41ODJkMzIuOTkxZDEwMDguMTNkMzguODM4ZDEwMDUuNjI0ZDQyLjU5N2Q5OTguMTA3ZDUzLjQ1NWQ5OTkuNzc4ZDcwLjk5NWQxMDA5LjhkNTUuMTI1ZDk5My4wOTZkNjUuMTQ4ZDk5My41MTNkODMuMTA2ZDk5NC4zNDlkOTcuNzIyZDk5MS40MjVkMTExLjA4NmQ5NzQuNzIxZDExMS4wODZkODkyLjAzMmQxMTEuMDg2ZDg3MS41NjlkMTEwLjY2OGQ2NzUuMjg4ZDExMC42NjhkNTc3LjU2NmQ1MS4zNjdkNTc3LjU2NmQzNS4wNzlkNTc3LjU2NmQxOS4yMWQ1OTEuMzQ3ZDQyNy4yMjNkMzE5Ljg5NWQ0NDYuNDMzZDMyNi41NzdkNDYyLjMwM2QzNTAuMzgxZDQ2MC4yMTVkNDE4LjQ1M2QzOTQuMjMxZDQxOC40NTNkMzY4LjMzOWQ0MTguNDUzZDMxNS45MjhkMzk0LjIzMWQyNjMuNTE3ZDM3MC4wMDlkMjM4LjA0MmQzNzAuMDA5ZDIyNC4yNjFkMzcwLjAwOWQyMTMuMTk0ZDM3OS40MDZkMjAyLjEyN2QzODguODAyZDIwMi4xMjdkNDAyLjE2NmQyMDIuMTI3ZDQwOC44NDhkMjM1LjExOWQ0MjAuMTIzZDI3Ni40NjNkNDM0LjMyM2QyNTYuODM1ZDQyOC4wNThkMjQ2LjgxMmQ0MjUuNTUzZDIxNi4zMjZkNDE4LjAzNWQxODQuMTY5ZDQxMC4xMDFkMTg0LjE2OWQ0MDMuODM2ZDE4NC4xNjlkMzMxLjU4OGQyNDQuMzA2ZDMzMS41ODhkMjcxLjg2OWQzMzEuNTg4ZDMyNC4wNzFkMzU2LjAxOWQzNzYuMjc0ZDM4MC40NWQ0MDMuODM2ZDM4MC40NWQ0NDYuMDE2ZDM4MC40NWQ0NDYuMDE2ZDM1Mi40NjlkNDQ2LjAxNmQzMzcuNDM1ZDQyNy4yMjNkMzE5Ljg5NWhSM2Q2NDUuMjJSNGQ2MjYuMDA5UjVkMTkuMjFSNmQ3MDQuMTA0UjdkLTM1LjQ5N1I4ZDY4NC44OTNSOWQwUjEwZDI4My45OFIxMWkyMDlSMTJkMTkuMjFSMTNkNjQ1LjIyUjE0YWkxaTNpM2kzaTNpMmkyaTJpMmkyaTJpMmkzaTJpMmkyaTNpMmkyaTNpM2kyaTJpMmkzaTNpMmkzaTJpMmkyaTNpM2kzaTJpMmkyaTJpMmkzaTJpM2kyaTJpM2kyaTNpM2kyaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kzaTNpMmkyaTNpM2kyaTJpM2kzaTFpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2hnOjk2b1IxZDc0MC4wMTlSMmFkMTgwLjQxMWQ2MjkuMzVkNDUuMTAyZDU0MS42NWQ0NS4xMDJkNTA5LjQ5NGQ0NS4xMDJkNTA3LjgyM2Q2NS45ODNkNDg5Ljg2NmQ4Ni44NjRkNDcxLjkwOGQ4OS4zN2Q0NzEuOTA4ZDEwNy43NDVkNDcxLjkwOGQxNDEuNTcyZDU0MC4zOThkMTQ1Ljc0OGQ1NDguNzVkMTgwLjQxMWQ2MjkuMzVoUjNkMjUzLjQ5NFI0ZDE4MC40MTFSNWQ0NS4xMDJSNmQ1NTIuMDkxUjdkMzk0LjY0OVI4ZDUwNi45ODhSOWQwUjEwZDI4My45OFIxMWk5NlIxMmQ0NS4xMDJSMTNkMjUzLjQ5NFIxNGFpMWkzaTNpM2kzaTNoZzoyMDhvUjFkNzQwLjAxOVIyYWQ4Ni40NDZkNzY3LjE2NGQ2OS4zMjRkNzY3LjE2NGQ1NS41NDNkNzc5LjA2NmQ0MS43NjFkNzkwLjk2OWQ0MS43NjFkODA3LjY3M2Q0MS43NjFkODMwLjY0MmQ3MC4xNTlkODQ3Ljc2NWQxOS4yMWQ4MzMuMTQ4ZDE5LjIxZDgwOS43NjFkMTkuMjFkNzE5LjU1NmQ5Mi43MTFkNzE5LjU1NmQxMDEuNDgxZDcxOS41NTZkMTExLjUwNGQ3MjAuODA5ZDExMS41MDRkNzAyLjQzM2QxMTEuNTA0ZDY5Ni41ODdkMTE0LjQyN2Q2MDEuNzg3ZDE0MC43MzdkNTgxLjMyNGQxMjAuMjc0ZDU4My44M2QzNS45MTVkNjEwLjU1N2QzNS45MTVkNjA4LjA1MmQzNS45MTVkNTY4LjM3OGQ5OC4xNGQ1NDcuMDc5ZDE0NC40OTVkNTMxLjIxZDE5MS4yNjlkNTMxLjIxZDM2Ny45MjFkNTMxLjIxZDQ0OC4xMDRkNTY1LjQ1NWQ1NzIuOTcyZDYxOC45MWQ1NzIuOTcyZDc3MC45MjNkNTcyLjk3MmQ4ODIuMDA5ZDUxNS43NThkOTQ5LjY2M2Q0NTUuMjAzZDEwMjEuOTExZDM0NS43ODdkMTAyMS45MTFkMzkuMjU2ZDEwMjEuNDk0ZDg1LjYxMWQxMDEzLjE0MWQxMDQuODIyZDk4NS41NzlkMTE4LjE4NWQ5NjUuOTUxZDExOS40MzhkOTIxLjY4M2QxMTkuNDM4ZDkxNy41MDdkMTE3LjM1ZDg1NC40NDZkMTM2LjE0M2Q4MzguMTU5ZDExNi41MTVkODE4LjUzMWQxNTAuNzZkNzg4Ljg4ZDEyNC4wMzJkNzY3LjE2NGQ4Ni40NDZkNzY3LjE2NGQzMjMuMjM2ZDcwNC45MzlkMzQ3LjA0ZDcxMi44NzRkMzY3LjA4NmQ3NDIuNTI1ZDM2NC4xNjNkODI3LjcxOWQyODEuODkyZDgyNy43MTlkMjU4LjA4OGQ4MjcuNzE5ZDIxNS4wNzNkODExLjQzMmQyMTQuMjM4ZDgyMi4yOWQyMDkuNjQ0ZDg1OC42MjNkMjA1Ljg4NWQ4ODcuODU2ZDIwNS44ODVkOTA2LjIzMWQyMDUuODg1ZDk4NC43NDNkMzEwLjcwN2Q5ODQuNzQzZDQwMS4zMzFkOTg0Ljc0M2Q0MzguNDk5ZDkxNC4xNjZkNDY2LjA2MWQ4NjEuOTY0ZDQ2Ni4wNjFkNzYyLjE1M2Q0NjYuMDYxZDc0Ni4yODNkNDU4Ljc1M2Q3MTUuNTg4ZDQ1MS40NDVkNjg0Ljg5M2Q0NTEuNDQ1ZDY2OS4wMjRkNDU4LjEyN2Q2NjAuMjU0ZDQ3My4xNjFkNjUzLjE1NGQ0NTQuNzg2ZDY0OC41NjFkNDI4LjA1OGQ2MzguMTJkMzk2LjMxOWQ2MTEuODFkMzYzLjc0NWQ1ODcuMTcxZDMzNy44NTNkNTY3LjU0M2QyODEuNDc0ZDU2Ny41NDNkMjQzLjQ3MWQ1NjcuNTQzZDIxNS45MDhkNTc3Ljk4M2QyMDEuMjkyZDYwNi4zODFkMjAxLjI5MmQ2NDUuNjM3ZDIwMi45NjJkNjYwLjI1NGQyMTMuNDAyZDc1Ny45NzdkMjY2LjQ0ZDc4MC4xMWQyOTMuNTg1ZDc4MC4xMWQzNDYuNjIzZDc4MC4xMWQzNDYuNjIzZDc0NS4wM2QzNDYuNjIzZDcyNi42NTVkMzIzLjIzNmQ3MDQuOTM5aFIzZDU5Mi4xODJSNGQ1NzIuOTcyUjVkMTkuMjFSNmQ0OTIuNzg5UjdkMi4wODhSOGQ0NzMuNTc5UjlkMFIxMGQyODMuOThSMTFpMjA4UjEyZDE5LjIxUjEzZDU5Mi4xODJSMTRhaTFpM2kzaTNpM2kzaTNpMmkzaTJpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkyaTJpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjk1b1IxZDc0MC4wMTlSMmFkMzkwLjQ3M2QxMjAxLjkwNWQzNTguMzE2ZDEyMDIuMzIzZDMyNS43NDJkMTE3OS4zNTNkMzM1LjM0N2QxMjAyLjMyM2QyNDcuNjQ3ZDEyMDIuNzRkMjQzLjg4OWQxMjAyLjc0ZDIzMC41MjVkMTIwMS40ODdkMjMwLjUyNWQxMjAyLjc0ZDE5NS4wMjdkMTIwMi43NGQxNzMuNzI5ZDExODUuMmQxNjUuMzc2ZDEyMDIuNzRkLTQuMTc2ZDEyMDIuNzRkMS4yNTJkMTE5NS4yMjNkNy45MzRkMTE5MS40NjRkNS40MjlkMTE4OC4xMjNkMC40MTdkMTE4Mi4yNzdkLTMuMzRkMTE4NC43ODNkLTEwLjQ0ZDExODguNTQxZC0yLjUwNWQxMTUwLjk1NWQ5Ni40NjlkMTE1MC41MzhkMTI5LjA0NGQxMTczLjUwN2QxMTkuNDM4ZDExNTAuNTM4ZDIwNy4xMzhkMTE1MC4xMmQyMTAuNDc5ZDExNTAuMTJkMjI0LjI2MWQxMTUxLjM3M2QyMjQuMjYxZDExNTAuMTJkMjU5Ljc1OGQxMTUwLjEyZDI4MS4wNTdkMTE2Ny42NmQyODguOTkxZDExNTAuMTJkMzkyLjE0M2QxMTQ5LjcwM2QzODYuNzE0ZDExNTguMDU1ZDM4MC4wMzJkMTE2MS4zOTZkMzgxLjcwM2QxMTYzLjA2NmQzODcuNTQ5ZDExNzAuNTg0ZDM5MS4zMDhkMTE2OC4wNzhkMzk4LjQwN2QxMTY0LjMxOWQzOTAuNDczZDEyMDEuOTA1aFIzZDM4Ny45NjdSNGQzOTguNDA3UjVkLTEwLjQ0UjZkLTEyNS43MDNSN2QtMTc4Ljc0UjhkLTExNS4yNjJSOWQwUjEwZDI4My45OFIxMWk5NVIxMmQtMTAuNDRSMTNkMzg3Ljk2N1IxNGFpMWkyaTJpMmkyaTNpMmkyaTJpMmkyaTNpM2kzaTJpMmkyaTJpMmkzaTJpMmkyaTJpMmkzaTNpM2kyaGc6MjA3b1IxZDc0MC4wMTlSMmFkMjUuNDc0ZDEwMTIuMzA2ZDQxLjM0NGQxMDAyLjI4M2Q5Mi43MTFkOTc2LjM5MWQxMDMuOTg2ZDk1Ny41OThkMTAxLjA2M2Q4ODkuMTA5ZDk5LjM5M2Q4NDguMTgyZDE0MC43MzdkODgyLjAwOWQ5OS44MWQ4MTYuMDI2ZDEwMS4wNjNkNzQ5LjIwN2QxMDIuNzM0ZDc0MS4yNzJkMTA5LjQxNWQ3MDkuNTMzZDE0MS45OWQ2ODQuMDU4ZDEwMi43MzRkNjk4LjI1N2QxMDIuNzM0ZDY0Ny43MjVkMTAwLjIyOGQ1NzQuMjI1ZDk0Ljc5OWQ1NjQuNjE5ZDg0LjM1OGQ1NTYuNjg1ZDcxLjQxMmQ1NjEuMjc4ZDU3LjYzMWQ1NTcuMTAyZDQ4LjQ0M2Q1NDUuNDA5ZDE5LjIxZDU0My43MzhkMzIuMTU2ZDUyOS4xMjJkMTQwLjMxOWQ1NDIuNDg2ZDE0OS4wODlkNTUyLjUwOGQxNjcuNDY0ZDU3MS4zMDFkMTY5Ljk3ZDU2Ny4xMjVkMTY4LjNkNTUyLjA5MWQxNjQuNTQxZDU0My4zMjFkMjUwLjU3ZDU1NC4xNzlkMjY4Ljk0NmQ1NTIuOTI2ZDI2OS4zNjNkNTY0LjYxOWQyNjYuODU4ZDU2NS44NzJkMjI5LjI3MmQ1NzQuMjI1ZDIyNy4xODRkNTc1LjA2ZDI0OC4wNjVkNTg0LjI0N2QyNDUuNTU5ZDU4NS41ZDIyNi4zNDlkNTgxLjc0MmQyMjMuNDI1ZDU4MS43NDJkMjE0LjIzOGQ1ODEuNzQyZDIwMy4zOGQ1ODUuNWQxOTMuNzc0ZDYwNS45NjRkMTg5LjE4MWQ2MjQuMzM5ZDE5NC4xOTJkNjM1LjYxNWQyMDIuMTI3ZDYzOS4zNzNkMjAxLjI5MmQ4NDkuNDM1ZDE3Ni42NTJkODY5LjA2M2QyMDAuNDU2ZDg4My42OGQyMDAuODc0ZDk1OC4wMTZkMTc4LjMyM2Q5ODIuMjM4ZDE5OC4zNjhkOTc5LjMxNGQyMDcuMTM4ZDk3OC4wNjFkMjIwLjkyZDk4MS44MmQyMzkuMjk1ZDk4Ni44MzFkMjQzLjQ3MWQ5ODcuMjQ5ZDI0OC4wNjVkOTkxLjg0M2QyODYuNDg2ZDEwMjIuMzI5ZDI0NS45NzdkMTAyMi4zMjlkMjIzLjAwOGQxMDIyLjMyOWQxNzguMTE0ZDEwMTEuODg5ZDEzMy4yMmQxMDAxLjQ0OGQxMTAuMjUxZDEwMDEuNDQ4ZDEwMi43MzRkMTAwMS40NDhkOTYuNDY5ZDEwMDIuMjgzZDEwMS44OThkMTAxNS42NDdkOTcuNzIyZDEwMjAuNjU5ZDc1LjE3MWQxMDI2LjUwNWQ3Mi42NjVkMTAyNi45MjNkNjYuNDAxZDEwMjYuOTIzZDQ5LjY5NmQxMDIwLjY1OWQzMC40ODZkMTAxMy4xNDFkMjUuNDc0ZDEwMTIuMzA2ZDkzLjk2NGQzMzIuMDA2ZDExMi43NTZkMzMyLjAwNmQxMjcuMTY0ZDM0My4yODJkMTQxLjU3MmQzNTQuNTU3ZDE0MS41NzJkMzcyLjkzM2QxNDEuNTcyZDQxMi4xODlkMTE1LjY4ZDQxMi4xODlkODEuNDM1ZDQxMi4xODlkNzEuODNkNDA5LjI2NWQ1MC4xMTRkNDAyLjU4NGQ1MC4xMTRkMzc2LjY5MWQ1MC4xMTRkMzU5LjE1MWQ2My4yNjlkMzQ1LjU3OWQ3Ni40MjRkMzMyLjAwNmQ5My45NjRkMzMyLjAwNmQyMjQuMjYxZDMyOC4yNDdkMjQzLjA1M2QzMjguMjQ3ZDI1Ny40NjFkMzM5LjUyM2QyNzEuODY5ZDM1MC43OTlkMjcxLjg2OWQzNjkuMTc0ZDI3MS44NjlkNDA3LjE3N2QyNDkuMzE4ZDQwNy4xNzdkMjQ1LjE0MWQ0MDcuMTc3ZDIzNy40MTVkNDA1LjUwN2QyMjkuNjlkNDAzLjgzNmQyMjUuOTMxZDQwMy44MzZkMjAwLjAzOWQ0MDMuNDE5ZDE5My4zNTdkNDAwLjQ5NWQxODAuNDExZDM5NC42NDlkMTgwLjQxMWQzNzIuOTMzZDE4MC40MTFkMzU0Ljk3NWQxOTMuMzU3ZDM0MS42MTFkMjA2LjMwM2QzMjguMjQ3ZDIyNC4yNjFkMzI4LjI0N2hSM2QzMDUuNjk2UjRkMjg2LjQ4NlI1ZDE5LjIxUjZkNjk1Ljc1MlI3ZC0yLjkyM1I4ZDY3Ni41NDFSOWQwUjEwZDI4My45OFIxMWkyMDdSMTJkMTkuMjFSMTNkMzA1LjY5NlIxNGFpMWkzaTNpMmkyaTJpM2kzaTJpM2kzaTJpM2kyaTJpMmkzaTJpM2kzaTJpM2kyaTJpMmkzaTNpM2kzaTJpMmkyaTJpMmkyaTNpM2kzaTJpM2kzaTNpMmkyaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaGc6OTRvUjFkNzQwLjAxOVIyYWQyNS4wNTdkNjU3LjMzMWQzNi4zMzJkNjQ2Ljg5ZDgxLjg1M2Q2MDEuMzdkOTEuMDRkNTk5LjI4MmQxMDUuMjM5ZDU5My40MzVkMTAyLjczNGQ1OTAuMDk0ZDk4LjU1N2Q1ODIuOTk1ZDk5LjgxZDU4MS4zMjRkMTExLjA4NmQ1NzYuNzNkMTExLjkyMWQ1NjYuMjlkMTI0LjAzMmQ1NDIuOTAzZDEzOC4yMzFkNTE1LjM0ZDE0MC43MzdkNTA2LjE1M2QxNDUuMzMxZDUwNi4xNTNkMTgyLjkxNmQ2MDAuNTM1ZDI1MC4xNTNkNjU3LjMzMWQyMTAuNDc5ZDY1Ny4zMzFkMjA2LjMwM2Q2NTcuMzMxZDE5Mi45MzlkNjQ5LjgxNGQxNzkuNTc1ZDY0Mi4yOTZkMTc5LjE1OGQ2MzguOTU1ZDE4NS40MjJkNjE3LjY1N2QxODUuNDIyZDYyNC43NTZkMTg1LjAwNGQ2MjIuNjY4ZDE3OS45OTNkNjI0LjMzOWQxNzEuNjQxZDYyNC4zMzlkMTY5LjEzNWQ2MjQuMzM5ZDE2OC4zZDYxMS44MWQxNjUuMzc2ZDU5Ni4zNThkMTYzLjI4OGQ2MDQuNzExZDE1OS45NDdkNjExLjM5M2QxNTYuNjA2ZDYwNS45NjRkMTQxLjk5ZDU4MC4wNzFkMTE2LjUxNWQ2MjAuOTk4ZDYzLjA2ZDY1Ny4zMzFkMjUuMDU3ZDY1Ny4zMzFoUjNkMjg2LjkwM1I0ZDI1MC4xNTNSNWQyNS4wNTdSNmQ1MTcuODQ2UjdkMzY2LjY2OFI4ZDQ5Mi43ODlSOWQwUjEwZDI4My45OFIxMWk5NFIxMmQyNS4wNTdSMTNkMjg2LjkwM1IxNGFpMWkzaTNpM2kzaTNpM2kyaTNpMmkzaTNpM2kyaTNpMmkzaTNpM2kzaTJoZzoyMDZvUjFkNzQwLjAxOVIyYWQyNS40NzRkMTAxMi4zMDZkNDEuMzQ0ZDEwMDIuMjgzZDkyLjcxMWQ5NzYuMzkxZDEwMy45ODZkOTU3LjU5OGQxMDEuMDYzZDg4OS4xMDlkOTkuMzkzZDg0OC4xODJkMTQwLjczN2Q4ODIuMDA5ZDk5LjgxZDgxNi4wMjZkMTAxLjA2M2Q3NDkuMjA3ZDEwMi43MzRkNzQxLjI3MmQxMDkuNDE1ZDcwOS41MzNkMTQxLjk5ZDY4NC4wNThkMTAyLjczNGQ2OTguMjU3ZDEwMi43MzRkNjQ3LjcyNWQxMDAuMjI4ZDU3NC4yMjVkOTQuNzk5ZDU2NC42MTlkODQuMzU4ZDU1Ni42ODVkNzEuNDEyZDU2MS4yNzhkNTcuNjMxZDU1Ny4xMDJkNDguNDQzZDU0NS40MDlkMTkuMjFkNTQzLjczOGQzMi4xNTZkNTI5LjEyMmQxNDAuMzE5ZDU0Mi40ODZkMTQ5LjA4OWQ1NTIuNTA4ZDE2Ny40NjRkNTcxLjMwMWQxNjkuOTdkNTY3LjEyNWQxNjguM2Q1NTIuMDkxZDE2NC41NDFkNTQzLjMyMWQyNTAuNTdkNTU0LjE3OWQyNjguOTQ2ZDU1Mi45MjZkMjY5LjM2M2Q1NjQuNjE5ZDI2Ni44NThkNTY1Ljg3MmQyMjkuMjcyZDU3NC4yMjVkMjI3LjE4NGQ1NzUuMDZkMjQ4LjA2NWQ1ODQuMjQ3ZDI0NS41NTlkNTg1LjVkMjI2LjM0OWQ1ODEuNzQyZDIyMy40MjVkNTgxLjc0MmQyMTQuMjM4ZDU4MS43NDJkMjAzLjM4ZDU4NS41ZDE5My43NzRkNjA1Ljk2NGQxODkuMTgxZDYyNC4zMzlkMTk0LjE5MmQ2MzUuNjE1ZDIwMi4xMjdkNjM5LjM3M2QyMDEuMjkyZDg0OS40MzVkMTc2LjY1MmQ4NjkuMDYzZDIwMC40NTZkODgzLjY4ZDIwMC44NzRkOTU4LjAxNmQxNzguMzIzZDk4Mi4yMzhkMTk4LjM2OGQ5NzkuMzE0ZDIwNy4xMzhkOTc4LjA2MWQyMjAuOTJkOTgxLjgyZDIzOS4yOTVkOTg2LjgzMWQyNDMuNDcxZDk4Ny4yNDlkMjQ4LjA2NWQ5OTEuODQzZDI4Ni40ODZkMTAyMi4zMjlkMjQ1Ljk3N2QxMDIyLjMyOWQyMjMuMDA4ZDEwMjIuMzI5ZDE3OC4xMTRkMTAxMS44ODlkMTMzLjIyZDEwMDEuNDQ4ZDExMC4yNTFkMTAwMS40NDhkMTAyLjczNGQxMDAxLjQ0OGQ5Ni40NjlkMTAwMi4yODNkMTAxLjg5OGQxMDE1LjY0N2Q5Ny43MjJkMTAyMC42NTlkNzUuMTcxZDEwMjYuNTA1ZDcyLjY2NWQxMDI2LjkyM2Q2Ni40MDFkMTAyNi45MjNkNDkuNjk2ZDEwMjAuNjU5ZDMwLjQ4NmQxMDEzLjE0MWQyNS40NzRkMTAxMi4zMDZkNDUuNTJkNDM0Ljc0ZDUyLjIwMmQ0MjguNDc2ZDEwMi4zMTZkMzc4Ljc3OWQxMTEuMDg2ZDM3Ny4xMDlkMTI1LjcwM2QzNzAuODQ1ZDEyMy4xOTdkMzY3LjUwNGQxMTkuMDIxZDM2MC44MjJkMTMxLjU0OWQzNTQuMTRkMTMyLjM4NGQzNDQuMTE3ZDE0NC40OTVkMzIwLjMxM2QxNTguMjc3ZDI5My4xNjhkMTYxLjJkMjgzLjk4ZDE2NS43OTRkMjgzLjk4ZDIwMy4zOGQzNzcuOTQ0ZDI3MC42MTZkNDM0Ljc0ZDIzMC45NDJkNDM0Ljc0ZDIyNy4xODRkNDM0Ljc0ZDIxMy42MTFkNDI3LjIyM2QyMDAuMDM5ZDQxOS43MDZkMTk5LjYyMWQ0MTYuNzgzZDIwMS43MDlkNDEyLjE4OWQyMDUuODg1ZDQwMi4xNjZkMjA1LjQ2OGQ0MDAuNDk1ZDE5OC43ODZkNDAyLjU4NGQxOTQuNjFkNDAyLjE2NmQxODkuNTk4ZDQwMS43NDhkMTg4Ljc2M2QzODkuNjM3ZDE4NS44NGQzNzQuMTg1ZDE4My43NTJkMzgyLjEyZDE4MC40MTFkMzg4LjgwMmQxNzYuNjUyZDM4My43OTFkMTYyLjQ1M2QzNTcuNDgxZDEzNi45NzhkMzk4LjQwN2Q4My41MjNkNDM0Ljc0ZDQ1LjUyZDQzNC43NGhSM2QzMDUuNjk2UjRkMjg2LjQ4NlI1ZDE5LjIxUjZkNzQwLjAxOVI3ZC0yLjkyM1I4ZDcyMC44MDlSOWQwUjEwZDI4My45OFIxMWkyMDZSMTJkMTkuMjFSMTNkMzA1LjY5NlIxNGFpMWkzaTNpMmkyaTJpM2kzaTJpM2kzaTJpM2kyaTJpMmkzaTJpM2kzaTJpM2kyaTJpMmkzaTNpM2kzaTJpMmkyaTJpMmkyaTNpM2kzaTJpM2kzaTNpMmkyaTNpM2kzaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6OTNvUjFkNzQwLjAxOVIyYWQxODQuMTY5ZDUzNC41NTFkMTYyLjg3MWQ1MzMuNzE2ZDEzMS41NDlkNTM0Ljk2OWQ4OS43ODdkNTM2LjYzOWQ4MC4xODJkNTM2LjYzOWQwLjQxN2Q1MzYuNjM5ZC00NS45MzhkNDk4LjYzNmQtMTkuNjI4ZDU0Mi40ODZkMTguMzc1ZDU1Ny4xMDJkNjAuOTcyZDU2Ny4xMjVkMTAzLjE1MWQ1NzcuNTY2ZDEwMy4xNTFkNjIwLjk5OGQ5Ny4zMDVkNzA3Ljg2MmQ5MS40NThkNzk0LjcyN2Q5MS40NThkODM4LjE1OWQ5MS40NThkOTk0Ljc2NmQxMDcuMzI3ZDExNTcuNjM3ZDM3LjE2OGQxMTY4LjQ5NWQyNy41NjJkMTE3MS44MzZkLTkuMTg3ZDExODQuMzY1ZC0zMS43MzhkMTIyNC4wMzlkNy45MzRkMTE5My41NTNkNzQuMzM2ZDExOTMuNTUzZDk0Ljc5OWQxMTkzLjU1M2QxMjguNjI2ZDExOTYuMDU4ZDE2Ny44ODJkMTE5OC45ODJkMTgyLjQ5OWQxMTk5LjM5OWQxODUuNDIyZDExODMuOTQ3ZDE4NS44NGQxMTkyLjcxN2QxNjUuMzc2ZDEwNTQuOTAzZDE2NS4zNzZkODY5LjA2M2QxNjUuMzc2ZDY4MS41NTNkMTg0LjE2OWQ1MzQuNTUxaFIzZDI3Ny4yOThSNGQxODUuODRSNWQtNDUuOTM4UjZkNTI1LjM2M1I3ZC0yMDAuMDM5UjhkNTcxLjMwMVI5ZDBSMTBkMjgzLjk4UjExaTkzUjEyZC00NS45MzhSMTNkMjc3LjI5OFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNoZzoyMDVvUjFkNzQwLjAxOVIyYWQyNS40NzRkMTAxMi4zMDZkNDEuMzQ0ZDEwMDIuMjgzZDkyLjcxMWQ5NzYuMzkxZDEwMy45ODZkOTU3LjU5OGQxMDEuMDYzZDg4OS4xMDlkOTkuMzkzZDg0OC4xODJkMTQwLjczN2Q4ODIuMDA5ZDk5LjgxZDgxNi4wMjZkMTAxLjA2M2Q3NDkuMjA3ZDEwMi43MzRkNzQxLjI3MmQxMDkuNDE1ZDcwOS41MzNkMTQxLjk5ZDY4NC4wNThkMTAyLjczNGQ2OTguMjU3ZDEwMi43MzRkNjQ3LjcyNWQxMDAuMjI4ZDU3NC4yMjVkOTQuNzk5ZDU2NC42MTlkODQuMzU4ZDU1Ni42ODVkNzEuNDEyZDU2MS4yNzhkNTcuNjMxZDU1Ny4xMDJkNDguNDQzZDU0NS40MDlkMTkuMjFkNTQzLjczOGQzMi4xNTZkNTI5LjEyMmQxNDAuMzE5ZDU0Mi40ODZkMTQ5LjA4OWQ1NTIuNTA4ZDE2Ny40NjRkNTcxLjMwMWQxNjkuOTdkNTY3LjEyNWQxNjguM2Q1NTIuMDkxZDE2NC41NDFkNTQzLjMyMWQyNTAuNTdkNTU0LjE3OWQyNjguOTQ2ZDU1Mi45MjZkMjY5LjM2M2Q1NjQuNjE5ZDI2Ni44NThkNTY1Ljg3MmQyMjkuMjcyZDU3NC4yMjVkMjI3LjE4NGQ1NzUuMDZkMjQ4LjA2NWQ1ODQuMjQ3ZDI0NS41NTlkNTg1LjVkMjI2LjM0OWQ1ODEuNzQyZDIyMy40MjVkNTgxLjc0MmQyMTQuMjM4ZDU4MS43NDJkMjAzLjM4ZDU4NS41ZDE5My43NzRkNjA1Ljk2NGQxODkuMTgxZDYyNC4zMzlkMTk0LjE5MmQ2MzUuNjE1ZDIwMi4xMjdkNjM5LjM3M2QyMDEuMjkyZDg0OS40MzVkMTc2LjY1MmQ4NjkuMDYzZDIwMC40NTZkODgzLjY4ZDIwMC44NzRkOTU4LjAxNmQxNzguMzIzZDk4Mi4yMzhkMTk4LjM2OGQ5NzkuMzE0ZDIwNy4xMzhkOTc4LjA2MWQyMjAuOTJkOTgxLjgyZDIzOS4yOTVkOTg2LjgzMWQyNDMuNDcxZDk4Ny4yNDlkMjQ4LjA2NWQ5OTEuODQzZDI4Ni40ODZkMTAyMi4zMjlkMjQ1Ljk3N2QxMDIyLjMyOWQyMjMuMDA4ZDEwMjIuMzI5ZDE3OC4xMTRkMTAxMS44ODlkMTMzLjIyZDEwMDEuNDQ4ZDExMC4yNTFkMTAwMS40NDhkMTAyLjczNGQxMDAxLjQ0OGQ5Ni40NjlkMTAwMi4yODNkMTAxLjg5OGQxMDE1LjY0N2Q5Ny43MjJkMTAyMC42NTlkNzUuMTcxZDEwMjYuNTA1ZDcyLjY2NWQxMDI2LjkyM2Q2Ni40MDFkMTAyNi45MjNkNDkuNjk2ZDEwMjAuNjU5ZDMwLjQ4NmQxMDEzLjE0MWQyNS40NzRkMTAxMi4zMDZkMTAyLjMxNmQ0NDIuNjc1ZDIzNy42MjRkMzU0Ljk3NWQyMzcuNjI0ZDMyMi44MThkMjM3LjYyNGQzMjEuMTQ4ZDIxNi43NDNkMzAzLjE5ZDE5NS44NjJkMjg1LjIzM2QxOTMuMzU3ZDI4NS4yMzNkMTc0Ljk4MmQyODUuMjMzZDE0MC43MzdkMzUzLjcyMmQxMzUuMzA4ZDM2NC41OGQxMDIuMzE2ZDQ0Mi42NzVoUjNkMzA1LjY5NlI0ZDI4Ni40ODZSNWQxOS4yMVI2ZDczOC43NjZSN2QtMi45MjNSOGQ3MTkuNTU2UjlkMFIxMGQyODMuOThSMTFpMjA1UjEyZDE5LjIxUjEzZDMwNS42OTZSMTRhaTFpM2kzaTJpMmkyaTNpM2kyaTNpM2kyaTNpMmkyaTJpM2kyaTNpM2kyaTNpMmkyaTJpM2kzaTNpM2kyaTJpMmkyaTJpMmkzaTNpM2kyaTNpM2kzaTJpMmkzaTNpM2kxaTNpM2kzaTNpM2hnOjkyb1IxZDc0MC4wMTlSMmFkMzg0LjYyNmQxMTI3Ljk4NmQyMTguODMxZDgwMi42NjJkODQuNzc2ZDQ4Ni4xMDdkODAuMTgyZDUxMS4xNjRkMzMuNDA5ZDQ5MC43MDFkMzEuNzM4ZDQ5MS4xMTlkMzE5Ljg5NWQxMTI3Ljk4NmQzMjQuNDg5ZDExMDguNzc2ZDM1Mi44ODdkMTEyOC40MDRkMzc4Ljc3OWQxMTI4LjQwNGQzODIuMTJkMTEyOC40MDRkMzg0LjYyNmQxMTI3Ljk4NmhSM2Q0MTkuNzA2UjRkMzg0LjYyNlI1ZDMxLjczOFI2ZDUzNy44OTJSN2QtMTA0LjQwNFI4ZDUwNi4xNTNSOWQwUjEwZDI4My45OFIxMWk5MlIxMmQzMS43MzhSMTNkNDE5LjcwNlIxNGFpMWkzaTJpM2kyaTJpM2kzaGc6MjA0b1IxZDc0MC4wMTlSMmFkMjUuNDc0ZDEwMTIuMzA2ZDQxLjM0NGQxMDAyLjI4M2Q5Mi43MTFkOTc2LjM5MWQxMDMuOTg2ZDk1Ny41OThkMTAxLjA2M2Q4ODkuMTA5ZDk5LjM5M2Q4NDguMTgyZDE0MC43MzdkODgyLjAwOWQ5OS44MWQ4MTYuMDI2ZDEwMS4wNjNkNzQ5LjIwN2QxMDIuNzM0ZDc0MS4yNzJkMTA5LjQxNWQ3MDkuNTMzZDE0MS45OWQ2ODQuMDU4ZDEwMi43MzRkNjk4LjI1N2QxMDIuNzM0ZDY0Ny43MjVkMTAwLjIyOGQ1NzQuMjI1ZDk0Ljc5OWQ1NjQuNjE5ZDg0LjM1OGQ1NTYuNjg1ZDcxLjQxMmQ1NjEuMjc4ZDU3LjYzMWQ1NTcuMTAyZDQ4LjQ0M2Q1NDUuNDA5ZDE5LjIxZDU0My43MzhkMzIuMTU2ZDUyOS4xMjJkMTQwLjMxOWQ1NDIuNDg2ZDE0OS4wODlkNTUyLjUwOGQxNjcuNDY0ZDU3MS4zMDFkMTY5Ljk3ZDU2Ny4xMjVkMTY4LjNkNTUyLjA5MWQxNjQuNTQxZDU0My4zMjFkMjUwLjU3ZDU1NC4xNzlkMjY4Ljk0NmQ1NTIuOTI2ZDI2OS4zNjNkNTY0LjYxOWQyNjYuODU4ZDU2NS44NzJkMjI5LjI3MmQ1NzQuMjI1ZDIyNy4xODRkNTc1LjA2ZDI0OC4wNjVkNTg0LjI0N2QyNDUuNTU5ZDU4NS41ZDIyNi4zNDlkNTgxLjc0MmQyMjMuNDI1ZDU4MS43NDJkMjE0LjIzOGQ1ODEuNzQyZDIwMy4zOGQ1ODUuNWQxOTMuNzc0ZDYwNS45NjRkMTg5LjE4MWQ2MjQuMzM5ZDE5NC4xOTJkNjM1LjYxNWQyMDIuMTI3ZDYzOS4zNzNkMjAxLjI5MmQ4NDkuNDM1ZDE3Ni42NTJkODY5LjA2M2QyMDAuNDU2ZDg4My42OGQyMDAuODc0ZDk1OC4wMTZkMTc4LjMyM2Q5ODIuMjM4ZDE5OC4zNjhkOTc5LjMxNGQyMDcuMTM4ZDk3OC4wNjFkMjIwLjkyZDk4MS44MmQyMzkuMjk1ZDk4Ni44MzFkMjQzLjQ3MWQ5ODcuMjQ5ZDI0OC4wNjVkOTkxLjg0M2QyODYuNDg2ZDEwMjIuMzI5ZDI0NS45NzdkMTAyMi4zMjlkMjIzLjAwOGQxMDIyLjMyOWQxNzguMTE0ZDEwMTEuODg5ZDEzMy4yMmQxMDAxLjQ0OGQxMTAuMjUxZDEwMDEuNDQ4ZDEwMi43MzRkMTAwMS40NDhkOTYuNDY5ZDEwMDIuMjgzZDEwMS44OThkMTAxNS42NDdkOTcuNzIyZDEwMjAuNjU5ZDc1LjE3MWQxMDI2LjUwNWQ3Mi42NjVkMTAyNi45MjNkNjYuNDAxZDEwMjYuOTIzZDQ5LjY5NmQxMDIwLjY1OWQzMC40ODZkMTAxMy4xNDFkMjUuNDc0ZDEwMTIuMzA2ZDE5MC44NTFkNDQ3LjI2OWQ1NS41NDNkMzU5LjU2OWQ1NS41NDNkMzI3LjQxMmQ1NS41NDNkMzI1LjMyNGQ3Ni4yMTVkMzA3LjU3NWQ5Ni44ODdkMjg5LjgyN2Q5OS44MWQyODkuODI3ZDExOS4wMjFkMjg5LjgyN2QxNTIuMDEzZDM1OC4zMTZkMTU0LjEwMWQzNjIuOTFkMTkwLjg1MWQ0NDcuMjY5aFIzZDMwNS42OTZSNGQyODYuNDg2UjVkMTkuMjFSNmQ3MzQuMTcyUjdkLTIuOTIzUjhkNzE0Ljk2MlI5ZDBSMTBkMjgzLjk4UjExaTIwNFIxMmQxOS4yMVIxM2QzMDUuNjk2UjE0YWkxaTNpM2kyaTJpMmkzaTNpMmkzaTNpMmkzaTJpMmkyaTNpMmkzaTNpMmkzaTJpMmkyaTNpM2kzaTNpMmkyaTJpMmkyaTJpM2kzaTNpMmkzaTNpM2kyaTJpM2kzaTNpMWkzaTNpM2kzaTNoZzo5MW9SMWQ3NDAuMDE5UjJhZDkzLjEyOGQ1MzcuNDc0ZDEwNS4yMzlkNTM2LjYzOWQxMTkuNDM4ZDUzNi42MzlkMTMzLjIyZDUzNi42MzlkMTYwLjM2NWQ1MzcuODkyZDE4Ny41MWQ1MzkuMTQ1ZDIwMS4yOTJkNTM5LjE0NWQyNzYuODhkNTM5LjE0NWQzMjMuNjU0ZDUwMS4xNDFkMjk2LjkyNmQ1NDQuOTkxZDI1OS4zNGQ1NjAuMDI2ZDE3NC41NjRkNTgwLjA3MWQxNzQuNTY0ZDU4My40MTJkMTc0LjU2NGQ2MzcuMjg1ZDE3OS45OTNkNzEyLjAzOWQxODYuMjU3ZDc5OC4wNjhkMTg2LjI1N2Q4NDAuNjY1ZDE4Ni4yNTdkOTk3LjY5ZDE3MC4zODhkMTE2MC4xNDNkMjQwLjEzZDExNzEuMDAxZDI0OS43MzVkMTE3NC4zNDJkMjg2LjA2OGQxMTg2Ljg3MWQzMDkuMDM3ZDEyMjYuNTQ0ZDI2OS43ODFkMTE5Ni4wNThkMjAzLjc5N2QxMTk2LjA1OGQxODQuMTY5ZDExOTYuMDU4ZDE0OS4wODlkMTE5OC45ODJkMTEwLjY2OGQxMjAxLjkwNWQ5NC43OTlkMTIwMi4zMjNkOTIuMjkzZDExODYuNDUzZDkxLjg3NmQxMTk1LjY0MWQxMTEuOTIxZDEwNTcuNDA5ZDExMS45MjFkODcxLjk4NmQxMTEuOTIxZDY4NC4wNThkOTMuMTI4ZDUzNy40NzRoUjNkMjc4LjEzM1I0ZDMyMy42NTRSNWQ5MS44NzZSNmQ1MjIuODU4UjdkLTIwMi41NDRSOGQ0MzAuOTgyUjlkMFIxMGQyODMuOThSMTFpOTFSMTJkOTEuODc2UjEzZDI3OC4xMzNSMTRhaTFpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2hnOjIwM29SMWQ3NDAuMDE5UjJhZDMyLjU3NGQ1OTQuNjg4ZDMxLjMyMWQ1MzYuMjIxZDE5OS42MjFkNTM2LjIyMWQzODIuOTU1ZDUzNi4yMjFkNDQ2LjQzM2Q1NDcuNDk3ZDQ1My4xMTVkNTU4LjM1NWQ0NjMuMTM4ZDYxMC41NTdkNDcyLjMyNmQ2NTkuMDAxZDQ3MS40OTFkNjY2LjkzNmQ0MzguMDgxZDYzOC4xMmQzNzguNzc5ZDU4MC4wNzFkMzUzLjMwNWQ1NzUuMDZkMzEwLjI5ZDU3NS44OTVkMjA5LjY0NGQ1NzcuNTY2ZDIwOC44MDlkNjMzLjk0NGQyMDkuNjQ0ZDc1OS42NDdkMzEzLjYzMWQ3NjguNDE3ZDMzNi42ZDc3MC41MDVkMzU3LjA2M2Q3NDkuMjA3ZDM2Ny41MDRkNzM4LjM0OWQzODUuNDYxZDcwOC4yOGQzODUuMDQ0ZDc4NS4xMjJkMzc0LjE4NWQ4MDIuNjYyZDM5MC4wNTVkODU0Ljg2NGQzOTAuMDU1ZDg3MS4xNTFkMzY2LjI1MWQ4MjYuMDQ4ZDM0Ny40NThkODExLjAxNGQzMjMuMjM2ZDc5MS4zODZkMjc4Ljk2OWQ3OTEuMzg2ZDI1OC41MDVkNzkxLjM4NmQyMjUuOTMxZDc5My4wNTdkMjA5LjY0NGQ3OTMuODkyZDIwNy41NTZkOTEwLjQwN2QyMDYuNzIxZDk1Ny41OThkMjE2LjMyNmQ5NzEuMzhkMjI4Ljg1NGQ5ODkuMzM3ZDI3Mi4yODdkOTg5LjMzN2QyODcuNzM4ZDk4OS4zMzdkMzE4LjIyNWQ5ODguNTAyZDM0OC43MTFkOTg3LjY2N2QzNjQuMTYzZDk4Ny42NjdkNDE5LjI4OGQ5ODcuNjY3ZDQ0My4wOTJkOTY0LjI4ZDQ2MS40NjhkOTQ2LjMyM2Q0ODAuNjc4ZDg4OC42OTFkNDg1LjY5ZDkwMy43MjVkNDg1LjY5ZDkyNi4yNzdkNDc2LjkyZDk2My44NjJkNDY1LjY0NGQxMDEyLjMwNmQ0NjMuOTczZDEwMjMuNTgyZDQwOS4yNjVkMTAyOC41OTNkMzQ2LjYyM2QxMDI4LjU5M2QyOTguMTc5ZDEwMjguNTkzZDIwMS43MDlkMTAyNS4yNTJkMTA1LjIzOWQxMDIxLjkxMWQ1Ni43OTZkMTAyMS45MTFkMjIuOTY5ZDEwMjEuOTExZDE5LjIxZDEwMjMuNTgyZDk2LjA1MmQxMDEwLjIxOGQxMDYuMDc1ZDkzMi45NTlkMTE5Ljg1NmQ5MjUuODU5ZDEyMC4yNzRkOTI0LjYwNmQxMTYuNTE1ZDkyMC40M2Q5NC43OTlkODk3LjA0NGQxMTEuOTIxZDkwMS42MzdkMTY0LjEyM2Q5MjAuODQ4ZDE1NS43NzFkOTEyLjQ5NWQxMDYuOTFkODY2LjE0ZDExMS41MDRkODIxLjAzN2QxMTEuNTA0ZDc4Mi4xOTlkOTguMTRkNzQyLjUyNWQ5OS4zOTNkNzQxLjY5ZDEwOS44MzNkNzQ0LjE5NWQxMzQuMDU1ZDc1NC4yMThkMTAyLjczNGQ2OTkuOTI4ZDEwMi43MzRkNjczLjYxOGQxMDIuNzM0ZDY0NS42MzdkMTEwLjI1MWQ2MzYuMDMyZDEzOS4wNjZkNjExLjM5M2Q5Ni4wNTJkNjIxLjgzM2Q5NC43OTlkNjIxLjQxNWQxMDIuNzM0ZDYwNC43MTFkMTAwLjIyOGQ1ODQuNjY1ZDc4LjkyOWQ1NzkuMjM2ZDUzLjg3MmQ1NzkuMjM2ZDI5LjIzM2Q1OTYuNzc2ZDMyLjU3NGQ1OTQuNjg4ZDE5My4zNTdkMzMyLjAwNmQyNDAuOTY1ZDMzMi4wMDZkMjQwLjk2NWQzNzIuOTMzZDI0MC45NjVkNDEyLjE4OWQyMTUuMDczZDQxMi4xODlkMTgwLjgyOGQ0MTIuMTg5ZDE3MS4yMjNkNDA5LjI2NWQxNDkuNTA3ZDQwMi41ODRkMTQ5LjUwN2QzNzYuNjkxZDE0OS41MDdkMzU5LjE1MWQxNjIuNjYyZDM0NS41NzlkMTc1LjgxN2QzMzIuMDA2ZDE5My4zNTdkMzMyLjAwNmQzMjMuNjU0ZDMyOC4yNDdkMzcxLjI2MmQzMjguMjQ3ZDM3MS4yNjJkMzY5LjE3NGQzNzEuMjYyZDQwNy4xNzdkMzQ4LjcxMWQ0MDcuMTc3ZDM0NC41MzVkNDA3LjE3N2QzMzYuODA5ZDQwNS41MDdkMzI5LjA4M2Q0MDMuODM2ZDMyNS4zMjRkNDAzLjgzNmQyOTkuNDMyZDQwMy40MTlkMjkyLjc1ZDQwMC40OTVkMjc5LjgwNGQzOTQuNjQ5ZDI3OS44MDRkMzcyLjkzM2QyNzkuODA0ZDM1NC45NzVkMjkyLjc1ZDM0MS42MTFkMzA1LjY5NmQzMjguMjQ3ZDMyMy42NTRkMzI4LjI0N2hSM2Q1MDQuOVI0ZDQ4NS42OVI1ZDE5LjIxUjZkNjk1Ljc1MlI3ZC00LjU5M1I4ZDY3Ni41NDFSOWQwUjEwZDI4My45OFIxMWkyMDNSMTJkMTkuMjFSMTNkNTA0LjlSMTRhaTFpM2kzaTNpM2kzaTNpMmkyaTJpMmkzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTJpM2kzaTNpMmkyaTJpMmkyaTJpM2kyaTFpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzo5MG9SMWQ3NDAuMDE5UjJhZDMuNzU4ZDEwMjIuNzQ3ZDE1Ljg2OWQ5ODYuODMxZDk2Ljg4N2Q4NzkuNTA0ZDIxMy44MmQ3MjQuNTY3ZDIyNS41MTNkNzU5LjIzZDIzMi4xOTVkNzU5LjIzZDIzMy40NDhkNzU4LjM5NGQyNDkuNzM1ZDcyMy4zMTRkMjUxLjQwNmQ3MDMuMjY5ZDI1Mi42NTlkNjg4LjY1MmQyNTguNTA1ZDY3Ny4zNzZkMjY3LjY5M2Q2NTkuODM2ZDMxOS44OTVkNTkwLjA5NGQyNzEuMDM0ZDU4OS42NzZkMzYuNzVkNTg3LjU4OGQyOC4zOThkNjg1LjcyOWQyNi4zMDlkNjYyLjc2ZDI2LjMwOWQ2MzEuODU2ZDI2LjMwOWQ1OTMuODUzZDU3LjIxM2Q1NTMuNzYxZDg0LjM1OGQ1MTguMjY0ZDExOS40MzhkNDk5LjQ3MWQ4Ny4yODJkNTI4LjI4N2Q4Ny4yODJkNTQzLjczOGQ5NC4zODFkNTUyLjUwOGQxMDUuNjU3ZDU1My43NjFkMTIzLjE5N2Q1NTUuODQ5ZDEyNS4yODVkNTU2LjY4NWQxNjguNzE3ZDU3NC4yMjVkMTY3LjQ2NGQ1NjguMzc4ZDE2Mi4wMzVkNTU1Ljg0OWQxNzMuMzExZDU0OS4xNjhkMjA1Ljg4NWQ1NDkuMTY4ZDI3MC42MTZkNTQyLjY5NGQzMzUuMzQ3ZDUzNi4yMjFkMzY3LjkyMWQ1MzYuMjIxZDM4MS4yODVkNTM2LjIyMWQzODQuNjI2ZDU1MC44MzhkMzg2LjI5NmQ1NzUuODk1ZDQ1OS4zOGQ1NDYuMjQ0ZDQ2MC4yMTVkNTYxLjI3OGQ0NDIuNjc1ZDU5MS43NjVkNDE1LjExMmQ2MTQuNzM0ZDQwNy41OTVkNjIwLjk5OGQzNTkuMTUxZDY1OC41ODRkNDE3LjJkNjQwLjIwOGQzMjguMjQ3ZDc0OC43ODlkMTU2LjYwNmQ5NzAuMTI3ZDE2Mi40NTNkOTcwLjEyN2QxNzQuMzU1ZDk2OS41ZDE4Ni4yNTdkOTY4Ljg3NGQxOTIuMTA0ZDk2OC44NzRkMjA4LjM5MWQ5NjguODc0ZDIyNy42MDFkOTc5LjczMmQyNjAuMTc2ZDk5OC4xMDdkMjU1LjU4MmQ5NzUuMTM4ZDI2OC4xMWQ5NjQuNjk4ZDI3Ni4wNDVkOTY1LjExNWQyOTQuNDJkOTY4LjAzOWQzMTEuNTQzZDk3MC45NjJkMzIxLjE0OGQ5NzAuOTYyZDM0OS45NjRkOTcwLjk2MmQzODMuMzczZDk1NS41MWQ0MTguNDUzZDkzOS42NDFkNDMzLjkwNWQ5MTcuNTA3ZDQzMy40ODdkODg4LjY5MWQ0MzMuOTA1ZDg2MS41NDZkNDY3LjczMmQ4OTUuNzkxZDQ3MS4wNzNkOTQwLjg5M2Q0NzEuNDkxZDk0Ny41NzVkNDc3LjMzN2QxMDMzLjE4N2Q0NzYuNTAyZDEwMzQuODU4ZDQ2Ny43MzJkMTAyNy4zNGQ0NDguNTIyZDEwMTUuMjNkNDQ0LjM0NWQxMDIxLjA3NmQzODAuODY3ZDEwMTkuODIzZDMyMS4xNDhkMTAxOS44MjNkMjMxLjM2ZDEwMTkuODIzZDE1MC4zNDJkMTAyMi43NDdkMTI1LjI4NWQxMDA0LjM3MWQxMTYuMDk3ZDEwMDYuMDQyZDc1LjE3MWQxMDIxLjA3NmQ3NC43NTNkMTAyMC42NTlkODMuOTQxZDk5Ni40MzdkMTAyLjczNGQ5NzMuMDVkNzguOTI5ZDk5Mi42NzhkNTUuMTI1ZDEwMTIuNzI0ZDQxLjM0NGQxMDIxLjA3NmQzLjc1OGQxMDIyLjc0N2hSM2Q1MDYuNTdSNGQ0NzcuMzM3UjVkMy43NThSNmQ1MjQuNTI4UjdkLTEwLjg1OFI4ZDUyMC43NjlSOWQwUjEwZDI4My45OFIxMWk5MFIxMmQzLjc1OFIxM2Q1MDYuNTdSMTRhaTFpM2kyaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkzaTJpM2kzaTNpMmkyaTJpM2kzaTJpM2kzaTNpM2kyaTJpMmkzaTNpM2kzaTJpMmkzaTNpMmkzaTJpM2kzaTJpM2kyaTNpM2kzaGc6MjAyb1IxZDc0MC4wMTlSMmFkMzIuNTc0ZDU5NC42ODhkMzEuMzIxZDUzNi4yMjFkMTk5LjYyMWQ1MzYuMjIxZDM4Mi45NTVkNTM2LjIyMWQ0NDYuNDMzZDU0Ny40OTdkNDUzLjExNWQ1NTguMzU1ZDQ2My4xMzhkNjEwLjU1N2Q0NzIuMzI2ZDY1OS4wMDFkNDcxLjQ5MWQ2NjYuOTM2ZDQzOC4wODFkNjM4LjEyZDM3OC43NzlkNTgwLjA3MWQzNTMuMzA1ZDU3NS4wNmQzMTAuMjlkNTc1Ljg5NWQyMDkuNjQ0ZDU3Ny41NjZkMjA4LjgwOWQ2MzMuOTQ0ZDIwOS42NDRkNzU5LjY0N2QzMTMuNjMxZDc2OC40MTdkMzM2LjZkNzcwLjUwNWQzNTcuMDYzZDc0OS4yMDdkMzY3LjUwNGQ3MzguMzQ5ZDM4NS40NjFkNzA4LjI4ZDM4NS4wNDRkNzg1LjEyMmQzNzQuMTg1ZDgwMi42NjJkMzkwLjA1NWQ4NTQuODY0ZDM5MC4wNTVkODcxLjE1MWQzNjYuMjUxZDgyNi4wNDhkMzQ3LjQ1OGQ4MTEuMDE0ZDMyMy4yMzZkNzkxLjM4NmQyNzguOTY5ZDc5MS4zODZkMjU4LjUwNWQ3OTEuMzg2ZDIyNS45MzFkNzkzLjA1N2QyMDkuNjQ0ZDc5My44OTJkMjA3LjU1NmQ5MTAuNDA3ZDIwNi43MjFkOTU3LjU5OGQyMTYuMzI2ZDk3MS4zOGQyMjguODU0ZDk4OS4zMzdkMjcyLjI4N2Q5ODkuMzM3ZDI4Ny43MzhkOTg5LjMzN2QzMTguMjI1ZDk4OC41MDJkMzQ4LjcxMWQ5ODcuNjY3ZDM2NC4xNjNkOTg3LjY2N2Q0MTkuMjg4ZDk4Ny42NjdkNDQzLjA5MmQ5NjQuMjhkNDYxLjQ2OGQ5NDYuMzIzZDQ4MC42NzhkODg4LjY5MWQ0ODUuNjlkOTAzLjcyNWQ0ODUuNjlkOTI2LjI3N2Q0NzYuOTJkOTYzLjg2MmQ0NjUuNjQ0ZDEwMTIuMzA2ZDQ2My45NzNkMTAyMy41ODJkNDA5LjI2NWQxMDI4LjU5M2QzNDYuNjIzZDEwMjguNTkzZDI5OC4xNzlkMTAyOC41OTNkMjAxLjcwOWQxMDI1LjI1MmQxMDUuMjM5ZDEwMjEuOTExZDU2Ljc5NmQxMDIxLjkxMWQyMi45NjlkMTAyMS45MTFkMTkuMjFkMTAyMy41ODJkOTYuMDUyZDEwMTAuMjE4ZDEwNi4wNzVkOTMyLjk1OWQxMTkuODU2ZDkyNS44NTlkMTIwLjI3NGQ5MjQuNjA2ZDExNi41MTVkOTIwLjQzZDk0Ljc5OWQ4OTcuMDQ0ZDExMS45MjFkOTAxLjYzN2QxNjQuMTIzZDkyMC44NDhkMTU1Ljc3MWQ5MTIuNDk1ZDEwNi45MWQ4NjYuMTRkMTExLjUwNGQ4MjEuMDM3ZDExMS41MDRkNzgyLjE5OWQ5OC4xNGQ3NDIuNTI1ZDk5LjM5M2Q3NDEuNjlkMTA5LjgzM2Q3NDQuMTk1ZDEzNC4wNTVkNzU0LjIxOGQxMDIuNzM0ZDY5OS45MjhkMTAyLjczNGQ2NzMuNjE4ZDEwMi43MzRkNjQ1LjYzN2QxMTAuMjUxZDYzNi4wMzJkMTM5LjA2NmQ2MTEuMzkzZDk2LjA1MmQ2MjEuODMzZDk0Ljc5OWQ2MjEuNDE1ZDEwMi43MzRkNjA0LjcxMWQxMDAuMjI4ZDU4NC42NjVkNzguOTI5ZDU3OS4yMzZkNTMuODcyZDU3OS4yMzZkMjkuMjMzZDU5Ni43NzZkMzIuNTc0ZDU5NC42ODhkMTQ0LjkxM2Q0MzQuNzRkMTUyLjAxM2Q0MjguNDc2ZDIwMS43MDlkMzc4Ljc3OWQyMTAuNDc5ZDM3Ny4xMDlkMjI1LjA5NmQzNzAuODQ1ZDIyMi41OWQzNjcuNTA0ZDIxOC40MTRkMzYwLjgyMmQyMzAuOTQyZDM1NC4xNGQyMzEuNzc4ZDM0My4yODJkMjQzLjg4OWQzMjAuMzEzZDI1OC41MDVkMjkyLjc1ZDI2MC41OTNkMjgzLjk4ZDI2NS4xODdkMjgzLjk4ZDMwMi43NzNkMzc3Ljk0NGQzNzAuMDA5ZDQzNC43NGQzMzAuMzM2ZDQzNC43NGQzMjYuNTc3ZDQzNC43NGQzMTMuMjEzZDQyNy4yMjNkMjk5Ljg0OWQ0MTkuNzA2ZDI5OS4wMTRkNDE2Ljc4M2QzMDEuNTJkNDEyLjE4OWQzMDUuMjc4ZDQwMi4xNjZkMzA0Ljg2MWQ0MDAuNDk1ZDI5OC4xNzlkNDAyLjU4NGQyOTQuMDAzZDQwMi4xNjZkMjg4Ljk5MWQ0MDEuNzQ4ZDI4OC4xNTZkMzg5LjYzN2QyODUuMjMzZDM3NC4xODVkMjgzLjE0NWQzODIuMTJkMjc5LjgwNGQzODguODAyZDI3Ni40NjNkMzgzLjc5MWQyNjEuODQ2ZDM1Ny40ODFkMjM2LjM3MWQzOTguNDA3ZDE4Mi45MTZkNDM0Ljc0ZDE0NC45MTNkNDM0Ljc0aFIzZDUwNC45UjRkNDg1LjY5UjVkMTkuMjFSNmQ3NDAuMDE5UjdkLTQuNTkzUjhkNzIwLjgwOVI5ZDBSMTBkMjgzLjk4UjExaTIwMlIxMmQxOS4yMVIxM2Q1MDQuOVIxNGFpMWkzaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kyaTNpMmkzaTNpM2kyaTJpMmkyaTJpMmkzaTJpMWkzaTNpM2kyaTNpM2kyaTNpMmkzaTNpM2kyaTNpMmkzaTNpM2kzaTJoZzo4OW9SMWQ3NDAuMDE5UjJhZDUuMDExZDU0NC41NzRkMjIuNTUxZDU0Mi4wNjhkNDMuNDMyZDU0Mi4wNjhkNjIuNjQyZDU0Mi4wNjhkMTAwLjQzN2Q1NDUuMmQxMzguMjMxZDU0OC4zMzJkMTU3LjQ0MmQ1NDguMzMyZDE2OS45N2Q1NDguMzMyZDE5NC44MThkNTQyLjY5NGQyMTkuNjY3ZDUzNy4wNTdkMjMyLjE5NWQ1MzcuMDU3ZDIzNS41MzZkNTM3Ljg5MmQyMzUuNTM2ZDU0NC45OTFkMjAyLjEyN2Q1NjIuOTQ5ZDE2NS43OTRkNTgyLjU3N2QxNjEuMmQ1ODkuMjU5ZDE4OC4zNDVkNjM1LjE5N2QyNDUuNTU5ZDcyNC45ODVkMjQ1LjU1OWQ3MjcuMDczZDIzNS4xMTlkNzYwLjA2NWQyMzYuMzcxZDc2Mi4xNTNkMjQ0LjcyNGQ3NTQuMjE4ZDI1OC41MDVkNzQ4LjM3MWQyNjcuMjc1ZDc1MC44NzdkMjc3LjI5OGQ3NzIuMTc2ZDMyMi44MThkNzA5Ljk1MWQzNDEuNjExZDY4MS41NTNkMzc4Ljc3OWQ2MjYuMDA5ZDM5NS40ODRkNTg1LjA4M2Q0MTguNDUzZDU4MC40ODlkMzk1LjA2NmQ1NjEuNjk2ZDM2MC44MjJkNTQxLjIzM2QzNjAuNDA0ZDU0Mi40ODZkNDIwLjU0MWQ1NDUuODI3ZDQ2MC42MzJkNTQ1LjgyN2Q0OTIuMzcxZDU0NS44MjdkNTExLjU4MmQ1NDMuNzM4ZDUxMmQ1NDUuODI3ZDQ0My4wOTJkNTg2Ljc1M2QzMDkuMDM3ZDgxMy41MmQzMDcuMzY3ZDgxNi40NDNkMzA3LjM2N2Q4NzguNjY4ZDMwNy4zNjdkODgwLjc1NmQzMDkuODcyZDExMDQuMTgyZDMyMi44MThkMTEyMC40NjlkMzQyLjg2NGQxMTIwLjQ2OWQzNzkuMTk3ZDExMjcuMTUxZDM5My44MTRkMTE0OC40NWQyNDguNDgyZDExNTAuNTM4ZDEyNi4xMmQxMjAzLjk5M2QxNTIuNDNkMTE3Mi42NzJkMTI2LjEyZDExNjguNDk1ZDE1OS4xMTJkMTE1My4wNDRkMTk1LjQ0NWQxMTI3LjE1MWQyMDguODA5ZDEwOTguNzUzZDIwOC44MDlkMTAzMC4yNjRkMjA4LjgwOWQxMDAxLjg2NmQyMDUuMDVkOTg3LjY2N2QyMTYuNzQzZDk3MS4zOGQyNDIuNjM2ZDk1OS42ODZkMjQwLjk2NWQ5NTguNDMzZDI0MC41NDhkOTU3LjU5OGQyNDAuOTY1ZDk1Ni43NjNkMjQxLjhkOTU2Ljc2M2QyMzcuMjA3ZDk1Mi4xNjlkMjE4LjgzMWQ5NDguNDExZDIwMi45NjJkOTQ1LjA3ZDE5OS4yMDNkOTM2LjNkMjA0LjIxNWQ5MTUuMDAxZDIwNC4yMTVkODkyLjAzMmQyMDQuMjE1ZDg1NS42OTlkMTg3LjA5MmQ4MjQuNzk2ZDE3Ny45MDVkODA5Ljc2MWQxNTUuMzUzZDc2Mi41N2QxNDkuMDg5ZDc0Ny45NTRkMTM3LjM5NmQ3MzguNzY2ZDEzOC42NDlkNzM4LjM0OWQxNjQuNTQxZDczMC40MTRkMTY0LjEyM2Q3MjkuNTc5ZDEzNi4xNDNkNzIyLjA2MWQxMjIuMzYyZDcxNC41NDRkMTQyLjgyNWQ3MDIuMDE2ZDE0MS45OWQ3MDAuMzQ1ZDExMi43NTZkNjk0LjkxNmQ5OC45NzVkNjg0LjA1OGQ1OS4zMDFkNTk1LjUyM2Q0MC41MDhkNTg0LjY2NWQtMTUuMDM0ZDU2OC43OTZkNS4wMTFkNTQ0LjU3NGhSM2Q0OTkuMDUzUjRkNTEyUjVkLTE1LjAzNFI2ZDQ4Ni45NDJSN2QtMTc5Ljk5M1I4ZDUwMS45NzdSOWQwUjEwZDI4My45OFIxMWk4OVIxMmQtMTUuMDM0UjEzZDQ5OS4wNTNSMTRhaTFpM2kzaTNpM2kzaTJpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTNpMmkzaTNpMmkzaTNpM2kyaTNpMmkzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpMmkyaTNpMmkzaTNpM2kyaGc6MjAxb1IxZDc0MC4wMTlSMmFkMzIuNTc0ZDU5NC42ODhkMzEuMzIxZDUzNi4yMjFkMTk5LjYyMWQ1MzYuMjIxZDM4Mi45NTVkNTM2LjIyMWQ0NDYuNDMzZDU0Ny40OTdkNDUzLjExNWQ1NTguMzU1ZDQ2My4xMzhkNjEwLjU1N2Q0NzIuMzI2ZDY1OS4wMDFkNDcxLjQ5MWQ2NjYuOTM2ZDQzOC4wODFkNjM4LjEyZDM3OC43NzlkNTgwLjA3MWQzNTMuMzA1ZDU3NS4wNmQzMTAuMjlkNTc1Ljg5NWQyMDkuNjQ0ZDU3Ny41NjZkMjA4LjgwOWQ2MzMuOTQ0ZDIwOS42NDRkNzU5LjY0N2QzMTMuNjMxZDc2OC40MTdkMzM2LjZkNzcwLjUwNWQzNTcuMDYzZDc0OS4yMDdkMzY3LjUwNGQ3MzguMzQ5ZDM4NS40NjFkNzA4LjI4ZDM4NS4wNDRkNzg1LjEyMmQzNzQuMTg1ZDgwMi42NjJkMzkwLjA1NWQ4NTQuODY0ZDM5MC4wNTVkODcxLjE1MWQzNjYuMjUxZDgyNi4wNDhkMzQ3LjQ1OGQ4MTEuMDE0ZDMyMy4yMzZkNzkxLjM4NmQyNzguOTY5ZDc5MS4zODZkMjU4LjUwNWQ3OTEuMzg2ZDIyNS45MzFkNzkzLjA1N2QyMDkuNjQ0ZDc5My44OTJkMjA3LjU1NmQ5MTAuNDA3ZDIwNi43MjFkOTU3LjU5OGQyMTYuMzI2ZDk3MS4zOGQyMjguODU0ZDk4OS4zMzdkMjcyLjI4N2Q5ODkuMzM3ZDI4Ny43MzhkOTg5LjMzN2QzMTguMjI1ZDk4OC41MDJkMzQ4LjcxMWQ5ODcuNjY3ZDM2NC4xNjNkOTg3LjY2N2Q0MTkuMjg4ZDk4Ny42NjdkNDQzLjA5MmQ5NjQuMjhkNDYxLjQ2OGQ5NDYuMzIzZDQ4MC42NzhkODg4LjY5MWQ0ODUuNjlkOTAzLjcyNWQ0ODUuNjlkOTI2LjI3N2Q0NzYuOTJkOTYzLjg2MmQ0NjUuNjQ0ZDEwMTIuMzA2ZDQ2My45NzNkMTAyMy41ODJkNDA5LjI2NWQxMDI4LjU5M2QzNDYuNjIzZDEwMjguNTkzZDI5OC4xNzlkMTAyOC41OTNkMjAxLjcwOWQxMDI1LjI1MmQxMDUuMjM5ZDEwMjEuOTExZDU2Ljc5NmQxMDIxLjkxMWQyMi45NjlkMTAyMS45MTFkMTkuMjFkMTAyMy41ODJkOTYuMDUyZDEwMTAuMjE4ZDEwNi4wNzVkOTMyLjk1OWQxMTkuODU2ZDkyNS44NTlkMTIwLjI3NGQ5MjQuNjA2ZDExNi41MTVkOTIwLjQzZDk0Ljc5OWQ4OTcuMDQ0ZDExMS45MjFkOTAxLjYzN2QxNjQuMTIzZDkyMC44NDhkMTU1Ljc3MWQ5MTIuNDk1ZDEwNi45MWQ4NjYuMTRkMTExLjUwNGQ4MjEuMDM3ZDExMS41MDRkNzgyLjE5OWQ5OC4xNGQ3NDIuNTI1ZDk5LjM5M2Q3NDEuNjlkMTA5LjgzM2Q3NDQuMTk1ZDEzNC4wNTVkNzU0LjIxOGQxMDIuNzM0ZDY5OS45MjhkMTAyLjczNGQ2NzMuNjE4ZDEwMi43MzRkNjQ1LjYzN2QxMTAuMjUxZDYzNi4wMzJkMTM5LjA2NmQ2MTEuMzkzZDk2LjA1MmQ2MjEuODMzZDk0Ljc5OWQ2MjEuNDE1ZDEwMi43MzRkNjA0LjcxMWQxMDAuMjI4ZDU4NC42NjVkNzguOTI5ZDU3OS4yMzZkNTMuODcyZDU3OS4yMzZkMjkuMjMzZDU5Ni43NzZkMzIuNTc0ZDU5NC42ODhkMjAxLjcwOWQ0NDIuNjc1ZDMzNy4wMTdkMzU0Ljk3NWQzMzcuMDE3ZDMyMi44MThkMzM3LjAxN2QzMjAuNzNkMzE2LjM0NWQzMDIuOTgyZDI5NS42NzNkMjg1LjIzM2QyOTIuNzVkMjg1LjIzM2QyNzMuOTU3ZDI4NS4yMzNkMjQwLjU0OGQzNTMuNzIyZDIzMy40NDhkMzY3LjkyMWQyMDEuNzA5ZDQ0Mi42NzVoUjNkNTA0LjlSNGQ0ODUuNjlSNWQxOS4yMVI2ZDczOC43NjZSN2QtNC41OTNSOGQ3MTkuNTU2UjlkMFIxMGQyODMuOThSMTFpMjAxUjEyZDE5LjIxUjEzZDUwNC45UjE0YWkxaTNpM2kzaTNpM2kzaTJpMmkyaTJpM2kzaTJpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTJpM2kyaTNpM2kzaTJpMmkyaTJpMmkyaTNpMmkxaTNpM2kzaTNpM2hnOjg4b1IxZDc0MC4wMTlSMmFkMTUuODY5ZDU1MS4yNTZkMjUuODkyZDU0MC44MTVkNjEuODA3ZDU2My43ODRkNjAuNTU0ZDU0Mi40ODZkNjkuNzQyZDU0Mi4wNjhkODkuNzg3ZDU0MS4yMzNkMTMwLjcxNGQ1NDQuOTkxZDE3NS4zOTlkNTQ5LjE2OGQxOTIuMTA0ZDU0OS4xNjhkMjE3LjU3OWQ1NDkuMTY4ZDIyMi4xNzJkNTUzLjc2MWQyNDguNDgyZDU1MC44MzhkMjUzLjkxMWQ1NTMuMzQ0ZDIzOC44NzdkNTcwLjQ2NmQyMjEuMzM3ZDU3Mi41NTRkMTg5LjU5OGQ1ODAuOTA3ZDE4NS40MjJkNjExLjM5M2QyMDkuMjI2ZDYxNC43MzRkMjM2LjM3MWQ2NTMuMTU0ZDI0MS4zODNkNjYwLjI1NGQyNzQuNzkyZDcxMC4zNjhkMjkwLjI0NGQ3MDYuMTkyZDMyMy4yMzZkNjU2LjA3OGQzNTMuMzA1ZDYxMC41NTdkMzYwLjgyMmQ1ODguMDA2ZDM1OS41NjlkNTgxLjc0MmQzNDkuMTI4ZDU3Ny45ODNkMzI5LjVkNTc1Ljg5NWQyOTkuMDE0ZDU3Mi45NzJkMzA2LjUzMWQ1NjEuNjk2ZDMyOS41ZDU1OS42MDhkMzExLjk2ZDU2MC4wMjZkMzAwLjI2N2Q1NjAuNDQzZDI5NC40MmQ1NTMuMzQ0ZDMwNi41MzFkNTQyLjQ4NmQzMjYuNTc3ZDU0MS42NWQzODYuNzE0ZDUzNi42MzlkNDM2LjgyOGQ1MzIuNDYzZDQ2Ni44OTdkNTMyLjQ2M2Q0NjcuMzE0ZDUzMi44OGQ0NDkuMzU3ZDU2Mi41MzFkNDUwLjYxZDU2My43ODRkNDU5LjM4ZDU2MC44NjFkNDc3LjMzN2Q1NDkuMTY4ZDQ4OS40NDhkNTQ5LjE2OGQ1MDUuMzE4ZDU1Ny4xMDJkNTA0LjlkNTY4Ljc5NmQ0NDMuNTFkNTgyLjE1OWQ0MDguMDEzZDYxOC40OTJkMzU0LjE0ZDY4OS45MDVkMzE5LjQ3N2Q3MzUuODQzZDI2OC41MjhkNzYyLjE1M2QzMTEuNTQzZDc1OC4zOTRkMzIzLjIzNmQ3NjQuNjU5ZDMzNS4zNDdkNzg1LjEyMmQzNDQuMTE3ZDgwMS40MDlkMzUyLjg4N2Q4MTcuNjk2ZDM2NC4xNjNkODM3LjMyNGQ0MDIuNTg0ZDg5My43MDNkNDUzLjExNWQ5NjguMDM5ZDQ3MC4yMzhkOTgwLjE1ZDQ4Ny4zNmQ5ODQuNzQzZDUyMi40NGQxMDA0Ljc4OWQ1MTUuMzRkMTAwOC4xM2Q1MTAuMzI5ZDEwMTguOTg4ZDUyMS42MDVkMTAyMS45MTFkNDk1LjI5NWQxMDIyLjMyOWQ0OTEuMTE5ZDEwMjIuMzI5ZDQxMS4zNTNkMTAxNi45ZDQxMC41MThkMTAxNS42NDdkNDE1Ljk0N2Q5OTMuNTEzZDQxNS41M2Q5OTIuMjYxZDM5NS45MDJkMTAwMS4wM2QzNTkuNTY5ZDEwMTQuODEyZDM0MS4xOTRkMTAyMS45MTFkMjk4LjU5N2QxMDIxLjkxMWQyOTMuMTY4ZDEwMjAuMjQxZDI2Ni44NThkMTAxMS40NzFkMjY2LjAyMmQxMDEwLjYzNmQyNzYuNDYzZDEwMDEuODY2ZDMwMS4xMDJkOTk0LjM0OWQzMjcuNDEyZDk4Ni40MTRkMzM2LjZkOTgwLjE1ZDMzNy4wMTdkOTc1Ljk3M2QzMTguMjI1ZDkzOS4yMjNkMjQ4LjQ4MmQ4MzguNTc3ZDE4My43NTJkOTE3LjUwN2QxNDkuMDg5ZDk2MC4xMDRkMTA4Ljk5OGQ5ODUuNTc5ZDE3MS4yMjNkOTYzLjAyN2QxNTguNjk0ZDk3Ni44MDlkMjE5LjI0OWQ5OTguNTI1ZDIyMS43NTVkMTAxNC44MTJkMjIxLjc1NWQxMDE3LjMxOGQyMjAuOTJkMTAyMS40OTRkMjA2LjMwM2QxMDIyLjc0N2QxNzIuMDU4ZDEwMjUuNjdkNi42ODFkMTAyMS40OTRkNS4wMTFkMTAwNC43ODlkNy4wOTlkMTAwMi43MDFkMjEuNzE2ZDEwMDkuOGQ3NS41ODhkOTg3LjY2N2QxMjkuODc5ZDkxNy45MjRkMTMwLjI5NmQ5MTcuNTA3ZDIxNS45MDhkODAxLjQwOWQxOTEuMjY5ZDc3NS4wOTlkMTU0LjEwMWQ3MjMuNzMyZDE1Ny40NDJkNzE5LjU1NmQxOTIuMTA0ZDcwNi4xOTJkMTQ0LjA3OGQ2ODQuNDc2ZDkxLjA0ZDYxOC45MWQ0OC40NDNkNTY2LjI5ZDUuNDI5ZDU2NS4wMzdkMy43NThkNTUwLjAwM2QxNS44NjlkNTUxLjI1NmhSM2Q1MjIuODU4UjRkNTIyLjQ0UjVkMy43NThSNmQ0OTEuNTM2UjdkLTEuNjdSOGQ0ODcuNzc4UjlkMFIxMGQyODMuOThSMTFpODhSMTJkMy43NThSMTNkNTIyLjg1OFIxNGFpMWkyaTJpMmkyaTNpM2kzaTJpMmkyaTNpMmkzaTNpM2kzaTJpM2kyaTNpMmkzaTJpM2kzaTJpMmkyaTNpMmkyaTJpM2kyaTNpMmkzaTNpM2kzaTNpM2kyaTJpM2kyaTJpMmkzaTNpM2kyaTNpM2kyaTNpMmkzaTJpMmkyaTNpMmkyaTNpMmkyaTJpM2kzaTNpMmkyaTNpM2kyaTJoZzoyMDBvUjFkNzQwLjAxOVIyYWQzMi41NzRkNTk0LjY4OGQzMS4zMjFkNTM2LjIyMWQxOTkuNjIxZDUzNi4yMjFkMzgyLjk1NWQ1MzYuMjIxZDQ0Ni40MzNkNTQ3LjQ5N2Q0NTMuMTE1ZDU1OC4zNTVkNDYzLjEzOGQ2MTAuNTU3ZDQ3Mi4zMjZkNjU5LjAwMWQ0NzEuNDkxZDY2Ni45MzZkNDM4LjA4MWQ2MzguMTJkMzc4Ljc3OWQ1ODAuMDcxZDM1My4zMDVkNTc1LjA2ZDMxMC4yOWQ1NzUuODk1ZDIwOS42NDRkNTc3LjU2NmQyMDguODA5ZDYzMy45NDRkMjA5LjY0NGQ3NTkuNjQ3ZDMxMy42MzFkNzY4LjQxN2QzMzYuNmQ3NzAuNTA1ZDM1Ny4wNjNkNzQ5LjIwN2QzNjcuNTA0ZDczOC4zNDlkMzg1LjQ2MWQ3MDguMjhkMzg1LjA0NGQ3ODUuMTIyZDM3NC4xODVkODAyLjY2MmQzOTAuMDU1ZDg1NC44NjRkMzkwLjA1NWQ4NzEuMTUxZDM2Ni4yNTFkODI2LjA0OGQzNDcuNDU4ZDgxMS4wMTRkMzIzLjIzNmQ3OTEuMzg2ZDI3OC45NjlkNzkxLjM4NmQyNTguNTA1ZDc5MS4zODZkMjI1LjkzMWQ3OTMuMDU3ZDIwOS42NDRkNzkzLjg5MmQyMDcuNTU2ZDkxMC40MDdkMjA2LjcyMWQ5NTcuNTk4ZDIxNi4zMjZkOTcxLjM4ZDIyOC44NTRkOTg5LjMzN2QyNzIuMjg3ZDk4OS4zMzdkMjg3LjczOGQ5ODkuMzM3ZDMxOC4yMjVkOTg4LjUwMmQzNDguNzExZDk4Ny42NjdkMzY0LjE2M2Q5ODcuNjY3ZDQxOS4yODhkOTg3LjY2N2Q0NDMuMDkyZDk2NC4yOGQ0NjEuNDY4ZDk0Ni4zMjNkNDgwLjY3OGQ4ODguNjkxZDQ4NS42OWQ5MDMuNzI1ZDQ4NS42OWQ5MjYuMjc3ZDQ3Ni45MmQ5NjMuODYyZDQ2NS42NDRkMTAxMi4zMDZkNDYzLjk3M2QxMDIzLjU4MmQ0MDkuMjY1ZDEwMjguNTkzZDM0Ni42MjNkMTAyOC41OTNkMjk4LjE3OWQxMDI4LjU5M2QyMDEuNzA5ZDEwMjUuMjUyZDEwNS4yMzlkMTAyMS45MTFkNTYuNzk2ZDEwMjEuOTExZDIyLjk2OWQxMDIxLjkxMWQxOS4yMWQxMDIzLjU4MmQ5Ni4wNTJkMTAxMC4yMThkMTA2LjA3NWQ5MzIuOTU5ZDExOS44NTZkOTI1Ljg1OWQxMjAuMjc0ZDkyNC42MDZkMTE2LjUxNWQ5MjAuNDNkOTQuNzk5ZDg5Ny4wNDRkMTExLjkyMWQ5MDEuNjM3ZDE2NC4xMjNkOTIwLjg0OGQxNTUuNzcxZDkxMi40OTVkMTA2LjkxZDg2Ni4xNGQxMTEuNTA0ZDgyMS4wMzdkMTExLjUwNGQ3ODIuMTk5ZDk4LjE0ZDc0Mi41MjVkOTkuMzkzZDc0MS42OWQxMDkuODMzZDc0NC4xOTVkMTM0LjA1NWQ3NTQuMjE4ZDEwMi43MzRkNjk5LjkyOGQxMDIuNzM0ZDY3My42MThkMTAyLjczNGQ2NDUuNjM3ZDExMC4yNTFkNjM2LjAzMmQxMzkuMDY2ZDYxMS4zOTNkOTYuMDUyZDYyMS44MzNkOTQuNzk5ZDYyMS40MTVkMTAyLjczNGQ2MDQuNzExZDEwMC4yMjhkNTg0LjY2NWQ3OC45MjlkNTc5LjIzNmQ1My44NzJkNTc5LjIzNmQyOS4yMzNkNTk2Ljc3NmQzMi41NzRkNTk0LjY4OGQyOTAuMjQ0ZDQ0Ny4yNjlkMTU0LjkzNmQzNTkuNTY5ZDE1NC45MzZkMzI3LjQxMmQxNTQuOTM2ZDMyNS43NDJkMTc1LjgxN2QzMDcuNzg0ZDE5Ni42OThkMjg5LjgyN2QxOTkuMjAzZDI4OS44MjdkMjE3LjU3OWQyODkuODI3ZDI1MS40MDZkMzU4LjMxNmQyNTUuNTgyZDM2Ni42NjhkMjkwLjI0NGQ0NDcuMjY5aFIzZDUwNC45UjRkNDg1LjY5UjVkMTkuMjFSNmQ3MzQuMTcyUjdkLTQuNTkzUjhkNzE0Ljk2MlI5ZDBSMTBkMjgzLjk4UjExaTIwMFIxMmQxOS4yMVIxM2Q1MDQuOVIxNGFpMWkzaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kyaTNpMmkzaTNpM2kyaTJpMmkyaTJpMmkzaTJpMWkzaTNpM2kzaTNoZzo4N29SMWQ3NDAuMDE5UjJhZDQ3Mi4zMjZkODcxLjU2OWQ1MDQuMDY1ZDc5MS44MDRkNTA5LjQ5NGQ4MDIuNjYyZDUxOS41MTdkODE2LjQ0M2Q1MTIuODM1ZDc2OS4yNTJkNTEzLjY3ZDc2OC44MzVkNTI5Ljk1N2Q3OTUuOThkNTMwLjc5MmQ3OTUuNTYyZDUyNC41MjhkNzU3Ljk3N2Q1MjQuNTI4ZDc0MS4yNzJkNTg0LjI0N2Q1ODUuNWQ1ODIuOTk1ZDU3OS4yMzZkNTU5LjYwOGQ1NzEuNzE5ZDUxOS41MTdkNTU1Ljg0OWQ1MTkuMDk5ZDU1NS40MzJkNTE5LjA5OWQ1NTMuMzQ0ZDUzNS4xNzdkNTQ4LjU0MWQ1NTEuMjU2ZDU0My43MzhkNTU2LjI2N2Q1NDMuNzM4ZDY4Mi4zODhkNTQ0LjU3NGQ2ODMuMjIzZDU1Ni42ODVkNjIyLjI1MWQ2NTcuMzMxZDU2Mi41MzFkODAxLjgyN2Q1NTguMzU1ZDgxMS40MzJkNDY0LjM5MWQxMDU4LjI0NGQ0MzQuNzRkMTAzNS4yNzVkMzkzLjgxNGQ5MTUuODM2ZDM1My4zMDVkODQ2LjUxMmQzMzkuNTIzZDg4MC43NTZkMzA2LjExNGQ5NDAuODkzZDI3MS4wMzRkMTAwMy45NTRkMjU4LjA4OGQxMDM0LjQ0ZDIxOC44MzFkMTA0OS4wNTdkMTg4LjM0NWQ5NTIuMTY5ZDIwMy43OTdkOTM3LjU1M2QxNzguNzRkOTI3Ljk0N2QxNjMuNzA2ZDkwNy4wNjZkMTM1LjcyNWQ4NjMuNjM0ZDE0NS43NDhkODUzLjE5NGQyMDAuMDM5ZDgyOC4xMzdkMTY3LjA0N2Q4MjEuNDU1ZDEzMi4zODRkODExLjAxNGQ5Ni44ODdkNzI0LjU2N2Q3Ni40MjRkNjgwLjcxN2QyNy45OGQ1NzcuOTgzZDEuMjUyZDU2Ny45NmQtMC44MzVkNTQ0Ljk5MWQ1LjQyOWQ1NDEuMjMzZDQyLjU5N2Q1MzcuNDc0ZDc1LjE3MWQ1MzQuMTMzZDg5Ljc4N2Q1MzQuMTMzZDIwNS40NjhkNTM0LjEzM2QyMDguODA5ZDU5NC42ODhkMjA1Ljg4NWQ1OTMuNDM1ZDE4NC4xNjlkNTg0LjI0N2QxNjkuNTUzZDU3Ny45ODNkMTU4LjY5NGQ1NzcuOTgzZDEzNS4zMDhkNTg1LjA4M2QxNTUuMzUzZDY2MC42NzJkMTkxLjI2OWQ3MzguMzQ5ZDE5NS40NDVkNzQ3LjExOWQyNjAuNTkzZDg4Ni4xODVkMjgzLjU2MmQ4NDMuMTcxZDMzMC43NTNkNzE2LjIxNWQzMzIuMDA2ZDcxNS43OTdkMzQ1Ljc4N2Q3MjQuNTY3ZDM3NS4wMjFkNzM5LjYwMWQzNzUuODU2ZDczOS4xODRkMzU4LjczNGQ3MTQuMTI3ZDM0Mi44NjRkNjg0LjQ3NmQzNjYuMjUxZDYyNy42OGQ0MjQuNzE3ZDc2MS43MzVkMzg3LjEzMmQ3ODIuNjE2ZDQzOS4zMzRkNzk1LjU2MmQ0NzIuMzI2ZDg3MS41NjloUjNkNjgxLjEzNVI0ZDY4My4yMjNSNWQtMC44MzVSNmQ0ODkuODY2UjdkLTM0LjI0NFI4ZDQ5MC43MDFSOWQwUjEwZDI4My45OFIxMWk4N1IxMmQtMC44MzVSMTNkNjgxLjEzNVIxNGFpMWkyaTNpMmkyaTJpMmkzaTJpMmkzaTJpM2kzaTJpMmkzaTNpMmkzaTNpM2kyaTJpMmkyaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kyaTNpMmkyaTJpMmkyaGc6MTk5b1IxZDc0MC4wMTlSMmFkMzEwLjcwN2QxMDI4LjU5M2QyODYuNDg2ZDEwNTUuNzM4ZDI1Ny42N2QxMDg5LjU2NmQyNTkuMzRkMTA5NC45OTVkMzA3Ljc4NGQxMDk5LjU4OGQzNTMuMzA1ZDExMDQuMTgyZDM1My4zMDVkMTEyOC44MjJkMzUzLjMwNWQxMTczLjA4OWQzMTQuMDQ4ZDExOTkuMzk5ZDI4MC4yMjFkMTIyMi4zNjhkMjMzLjQ0OGQxMjIyLjM2OGQxNDEuMTU0ZDEyMjIuMzY4ZDE0MS4xNTRkMTE4OC4xMjNkMTQxLjE1NGQxMTY3LjI0M2QxNjYuNjI5ZDExNTQuNzE0ZDE4Ny45MjhkMTE0NC4yNzRkMjEwLjg5N2QxMTQ1Ljk0NGQyMTcuMTYxZDExNDYuMzYyZDIxNy41NzlkMTE0Ni4zNjJkMjE3Ljk5NmQxMTQ2Ljc3OWQyMTYuMzI2ZDExNDcuMTk3ZDE4MC44MjhkMTE1NS45NjdkMTgwLjgyOGQxMTc4LjUxOGQxODAuODI4ZDExOTQuMzg4ZDIxMi41NjdkMTE5NC4zODhkMjM4LjA0MmQxMTk0LjM4OGQyNjEuODQ2ZDExODcuNzA2ZDI5NC44MzhkMTE3OC41MThkMjk0LjgzOGQxMTU5LjcyNWQyOTQuODM4ZDExMzguNDI3ZDI2Ni4wMjJkMTEyMi41NTdkMjQ1LjU1OWQxMTExLjI4MmQyMjAuMDg0ZDEwOTcuOTE4ZDIzNy42MjRkMTA1NC40ODZkMjU1LjU4MmQxMDI2LjkyM2QyMTguODMxZDEwMjMuMTY0ZDE3My43MjlkMTAxMC42MzZkOTQuMzgxZDk4OC41MDJkNzYuNDI0ZDk1NS41MWQ3OC41MTJkOTUyLjE2OWQ3OC41MTJkOTUwLjA4MWQ3OC4wOTRkOTQ4LjQxMWQ3Ni44NDFkOTQ3LjU3NWQ4MS4wMTdkOTM5LjY0MWQ5Ni4wNTJkOTE4Ljc2ZDk0LjM4MWQ5MTMuNzQ4ZDczLjkxOGQ5MDkuOTlkNTAuOTQ5ZDkwNS44MTRkNDguMDI2ZDkwNC4xNDNkNDAuOTI2ZDkwMC4zODRkMzUuNzA2ZDg4MS4xNzRkMzAuNDg2ZDg2MS45NjRkMjcuOThkODU5LjQ1OGQyOC4zOThkODU0LjAyOWQzOC44MzhkODUwLjI3ZDYwLjU1NGQ4NDYuNTEyZDYwLjEzN2Q4NDUuNjc2ZDYwLjk3MmQ4NDQuODQxZDIwLjg4ZDgwMy45MTVkMTkuMjFkNzk1LjE0NWQxOS4yMWQ2NjkuMDI0ZDg2LjY1NWQ1OTkuNjk5ZDE1NC4xMDFkNTMwLjM3NWQyNzkuODA0ZDUzMC4zNzVkMzYyLjA3NWQ1MzAuMzc1ZDQxMC41MThkNTQyLjkwM2Q0MzguMDgxZDU5Mi42ZDQ1OC41NDRkNjg4LjIzNGQzOTIuMTQzZDYxNi44MjJkMzgyLjUzOGQ2MDkuMzA1ZDM0MC4zNThkNTc2LjMxM2QyNzguNTUxZDU3Ni4zMTNkMjAyLjk2MmQ1NzYuMzEzZDE2Mi4wMzVkNjQzLjk2N2QxMjcuNzkxZDcwMC43NjNkMTI3Ljc5MWQ3ODIuNjE2ZDEyNy43OTFkODY0LjQ2OWQxNjcuMDQ3ZDkyNC4xODlkMjEyLjE1ZDk5My4wOTZkMjg4Ljk5MWQ5OTMuMDk2ZDMzNy4wMTdkOTkzLjA5NmQzOTIuMTQzZDk2OC40NTZkNDU4LjU0NGQ5MzguODA1ZDQ1OC41NDRkODk3LjQ2MWQ0NTguNTQ0ZDg4Mi40MjdkNDQ5LjM1N2Q4NTEuMTA2ZDQ3NS4yNDlkODg0LjUxNWQ0NzUuMjQ5ZDkxMS4yNDNkNDc1LjI0OWQ5MTkuMTc3ZDQ2Ni4wNjFkOTYyLjE5MmQ0MjUuNTUzZDk2My44NjJkNDEzLjg1OWQ5ODQuNzQzZDQ2Ni40NzlkOTg0Ljc0M2Q0MTQuMjc3ZDEwMjUuMjUyZDMxMC43MDdkMTAyOC41OTNoUjNkNDk0LjQ2UjRkNDc1LjI0OVI1ZDE5LjIxUjZkNDkzLjYyNFI3ZC0xOTguMzY4UjhkNDc0LjQxNFI5ZDBSMTBkMjgzLjk4UjExaTE5OVIxMmQxOS4yMVIxM2Q0OTQuNDZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTJpMmkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNoZzo4Nm9SMWQ3NDAuMDE5UjJhZDUuNDI5ZDU1OS42MDhkMTUuMDM0ZDU0NC41NzRkMzMuNDA5ZDU0Mi4wNjhkNDUuMTAyZDUzNy4wNTdkNjkuNzQyZDUzOS41NjJkMTQ1Ljc0OGQ1MzcuMDU3ZDIwOC4zOTFkNTM0Ljk2OWQyNDUuNTU5ZDU0NC41NzRkMjI2LjM0OWQ1NTMuNzYxZDIwMS4yOTJkNTc0LjIyNWQxODIuMDgxZDU3OS4yMzZkMTcyLjg5M2Q1OTUuNTIzZDIwOC44MDlkNzA5LjUzM2QyNTUuMTY0ZDc3NS4wOTlkMjMzLjQ0OGQ4MDIuNjYyZDIxMy40MDJkODMzLjU2NmQyMTQuNjU1ZDgzNC40MDFkMjI5LjI3MmQ4MjYuNDY2ZDI1OC45MjNkODEyLjI2N2QyNTkuNzU4ZDgxMi42ODVkMjc5LjM4NmQ4NTguMjA1ZDM3NS44NTZkNjM4Ljk1NWQzNzUuODU2ZDU4NC4yNDdkMzc1Ljg1NmQ1NzcuMTQ4ZDM1Ny4wNjNkNTY3LjU0M2QzMzEuMTcxZDU1NC4xNzlkMzQzLjI4MmQ1MzguNzI3ZDM1OC43MzRkNTM4LjcyN2Q0OTcuMzgzZDUzOC43MjdkNTEzLjI1MmQ1NDguNzVkNTA0LjlkNTYwLjAyNmQ0NzkuODQzZDU3NC4wMTZkNDU0Ljc4NmQ1ODguMDA2ZDQ0Ni44NTFkNTk4LjAyOWQ0MTUuNTNkNjM3LjI4NWQzMjUuNzQyZDg5Ny44NzlkMzAzLjE5ZDkwOS4xNTRkMjc5LjM4NmQ5MjQuMTg5ZDI5MS45MTVkOTMzLjM3NmQzMjEuMTQ4ZDkzOS4yMjNkMzE0Ljg4NGQ5NTIuNTg3ZDI3OC45NjlkMTAyNi41MDVkMjcxLjg2OWQxMDA1LjYyNGQyNDAuOTY1ZDEwMjYuNTA1ZDIwNS40NjhkOTI5LjYxOGQxNjIuNDUzZDgyMy45NmQxNjkuNTUzZDgxMi4yNjdkMTc1LjM5OWQ3OTcuNjVkMTU5LjUzZDc4OC40NjNkMTQxLjU3MmQ3NzMuMDExZDE0MC4zMTlkNzY4LjQxN2QxNDguNjcyZDc1Mi45NjVkMTQ3LjQxOWQ3NDguMzcxZDEzMi44MDJkNzM2LjI2MWQxMTguNjAzZDcyMC4zOTFkMTI3LjM3M2Q3MDcuMDI3ZDEzMS45NjdkNjk3Ljg0ZDExOC4xODVkNjkyLjgyOGQxMDEuODk4ZDY4NC40NzZkMTA2LjQ5MmQ2NzkuMDQ3ZDEzMS45NjdkNjY3LjM1M2QxMTAuNjY4ZDY2Mi4zNDJkODYuODY0ZDY1NC40MDdkNzAuMTU5ZDYyMi4yNTFkNjMuODk1ZDYxMS4zOTNkNDYuNzczZDU4MS43NDJkMzMuODI3ZDU3NS4wNmQxOC4zNzVkNTc4LjQwMWQ3LjUxN2Q1NzEuMzAxZDUuNDI5ZDU1OS42MDhoUjNkNTA2LjU3UjRkNTEzLjI1MlI1ZDUuNDI5UjZkNDg5LjAzUjdkLTIuNTA1UjhkNDgzLjYwMVI5ZDBSMTBkMjgzLjk4UjExaTg2UjEyZDUuNDI5UjEzZDUwNi41N1IxNGFpMWkyaTNpM2kzaTNpM2kzaTNpMmkzaTJpMmkzaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTJpMmhnOjE5OG9SMWQ3NDAuMDE5UjJhZDM2OC43NTZkNzUzLjhkMzY3LjUwNGQ3NDguMzcxZDM2NS40MTVkNzQyLjk0MmQzNjYuNjY4ZDc0Mi4xMDdkMzY5LjU5MmQ3NDIuOTQyZDM3MS42OGQ2ODYuOTgyZDM3MC4wMDlkNjc5LjQ2NGQzNzAuMDA5ZDY3NC4wMzVkMzcwLjAwOWQ2NjkuNDQyZDI2OC41MjhkODA4LjkyNmQyNzguOTY5ZDgxMi42ODVkMjkwLjI0NGQ4MTIuNjg1ZDMwMi4zNTVkODEyLjY4NWQzNjYuNjY4ZDc5OS43MzhkMzY3LjUwNGQ3ODMuODY5ZDM2OC43NTZkNzUzLjhkMjk5Ljg0OWQ1OTUuMTA2ZDI5OS44NDlkNTk1LjEwNmQyOTkuMDE0ZDU0Ni42NjJkNDEzLjQ0MmQ1MzguMzA5ZDQxNC42OTRkNTQ2LjI0NGQ0MTguMDM1ZDU1MC44MzhkNDI0LjcxN2Q1MzcuODkyZDQzMy4wN2Q1MzcuMDU3ZDQ0MS40MjJkNTM3LjA1N2Q0NTYuMDM5ZDU1OS4xOWQ0NTQuNzg2ZDU0Ni42NjJkNDUzLjk1MWQ1MzQuNTUxZDQ1My45NTFkNTM1LjM4NmQ0NTQuNzg2ZDUzNi42MzlkNDY2Ljg5N2Q1MzYuNjM5ZDY1MS4wNjZkNTM2LjYzOWQ3MTMuNzA5ZDU0Ny45MTVkNzIwLjM5MWQ1NTguNzczZDczMC40MTRkNjEwLjk3NWQ3MzkuNjAxZDY1OS40MTlkNzM4Ljc2NmQ2NjcuMzUzZDcwNS4zNTdkNjM4LjUzOGQ2NDYuMDU1ZDU4MC40ODlkNjIwLjE2M2Q1NzUuNDc3ZDU3Ny41NjZkNTc2LjMxM2Q0NzYuOTJkNTc3Ljk4M2Q0NzYuMDg0ZDYzNC4zNjJkNDc2LjkyZDc2MC4wNjVkNTgwLjkwN2Q3NjguODM1ZDYwMy44NzZkNzcwLjkyM2Q2MjQuMzM5ZDc0OS42MjRkNjM0Ljc3OWQ3MzguNzY2ZDY1Mi43MzdkNzA4LjY5OGQ2NTIuMzE5ZDc4NS41MzlkNjQxLjQ2MWQ4MDMuMDc5ZDY1Ny4zMzFkODU1LjI4MmQ2NTcuMzMxZDg3MS41NjlkNjMzLjEwOWQ4MjYuODg0ZDYxNC43MzRkODExLjg0OWQ1OTAuNTEyZDc5MS44MDRkNTQ2LjI0NGQ3OTEuODA0ZDUyNS43ODFkNzkxLjgwNGQ0OTMuMjA3ZDc5My40NzRkNDc2LjkyZDc5NC4zMDlkNDc2LjkyZDgwMS44MjdkNDc2LjkyZDk2My4wMjdkNDkyLjc4OWQ5ODAuMTVkNDk1LjI5NWQ5ODIuMjM4ZDUwOS45MTFkOTg5Ljc1NWQ1MzkuNTYyZDk4OS43NTVkNTU1LjAxNGQ5ODkuNzU1ZDU4NS41ZDk4OC45MmQ2MTUuOTg2ZDk4OC4wODRkNjMxLjQzOGQ5ODguMDg0ZDY4Ni41NjRkOTg4LjA4NGQ3MTAuMzY4ZDk2NC42OThkNzI4Ljc0M2Q5NDYuNzRkNzQ3Ljk1NGQ4ODkuMTA5ZDc1Mi45NjVkOTA0LjE0M2Q3NTIuOTY1ZDkyNi42OTRkNzQ0LjE5NWQ5NjQuMjhkNzMyLjkyZDEwMTIuNzI0ZDczMS4yNDlkMTAyNGQ2NzYuNTQxZDEwMjkuMDExZDYxMy44OThkMTAyOS4wMTFkNTE5LjA5OWQxMDI5LjAxMWQ0NjguOTg1ZDEwMjUuNjdkNDYyLjcyMWQxMDI1LjI1MmQ0NjMuOTczZDEwMzMuMTg3ZDQ1OS4zOGQxMDM0Ljg1OGQzNjcuMDg2ZDEwMjIuMzI5ZDM0Ni42MjNkMTAyMi4zMjlkMzI0LjA3MWQxMDIyLjMyOWQyOTQuODM4ZDEwMjIuMzI5ZDI5MC42NjJkMTAyMy4xNjRkMjg2LjQ4NmQxMDI0ZDI5Mi4zMzJkMTAyMi43NDdkMzAzLjYwOGQxMDE5LjgyM2QyNzMuOTU3ZDEwMTkuODIzZDI5OS40MzJkOTk4LjUyNWQzNTYuNjQ2ZDk4Mi4yMzhkMzY5LjU5MmQ5NjIuMTkyZDM3My4zNWQ5MzMuMzc2ZDM3NS40MzhkOTMyLjEyM2QzNzQuNjAzZDkyMy43NzFkMzgxLjcwM2Q5MTguNzZkNDAzLjQxOWQ5MzkuNjQxZDQwNC42NzJkOTM5LjY0MWQ0MDQuNjcyZDkzOC44MDVkNDA0LjY3MmQ5MzcuNTUzZDM5OC4xOTlkOTI1Ljg1OWQzOTEuNzI1ZDkxNC4xNjZkMzkxLjcyNWQ5MTAuNDA3ZDM5MS43MjVkOTA4LjMxOWQzOTMuODE0ZDkwOC4zMTlkMzk1LjQ4NGQ5MDguMzE5ZDM5Ni43MzdkOTA4LjczN2Q0MDkuMjY1ZDg5OS45NjdkMzk1LjQ4NGQ4ODYuNjAzZDM3Mi45MzNkODg5LjEwOWQzNjguMzM5ZDg1Ny43ODdkMzI3LjgzZDg0Ni4wOTRkMzAwLjI2N2Q4NDUuNjc2ZDI3MS4wMzRkODQ0Ljg0MWQyMzcuNjI0ZDg1NC44NjRkMTcwLjM4OGQ5NDUuMDdkMTM3LjgxNGQ5ODguNTAyZDExMS41MDRkMTAzOC4xOTlkMTEyLjMzOWQxMDUxLjk4ZDExNC44NDVkMTA1My42NWQxMTkuMDIxZDEwNTMuNjVkMTI0Ljg2N2QxMDUzLjY1ZDEzNi43NjlkMTA1MC41MThkMTQ4LjY3MmQxMDQ3LjM4NmQxNTQuMTAxZDEwNDcuMzg2ZDE2NC45NTlkMTA0Ny44MDRkMTczLjcyOWQxMDU5LjA3OWQxNjUuMzc2ZDEwNjguMjY3ZDE2Mi4wMzVkMTA2OC4yNjdkMTQ3LjQxOWQxMDY4LjI2N2QxMTIuNzU2ZDEwNzcuMDM3ZDgxLjQzNWQxMDg0Ljk3MmQ2NC43M2QxMDgzLjMwMWQ3NS4xNzFkMTA4OS45ODNkNzguNTEyZDEwOTcuMDgzZDYxLjM4OWQxMTAyLjUxMmQxOS42MjhkMTEwOS4xOTRkLTI0LjYzOWQxMTE1Ljg3NmQtMzguODM4ZDExMTUuMDRkLTUwLjUzMWQxMTE0LjIwNWQtMjYuMzA5ZDEwODkuMTQ4ZDIzLjgwNGQxMDc2LjYxOWQ2OS43NDJkMTAxNS42NDdkNzQuMzM2ZDEwMDkuOGQxMzQuMDU1ZDkxMy4zMzFkMTgxLjI0NmQ4ODcuNDM4ZDE1Ny40NDJkODc0LjQ5MmQyMTYuNzQzZDc5Mi42MzlkMjQ1LjU1OWQ3OTAuOTY5ZDI1MC45ODhkNzU3Ljk3N2QyNjEuNDI5ZDc0Mi41MjVkMjk3LjM0NGQ2OTEuNTc1ZDMyNC40ODlkNjUyLjczN2QzNTIuMDUyZDYyOS4zNWQzOTAuNDczZDYyNS4xNzRkMzk2LjMxOWQ2MjAuMTYzZDM4Ny4xMzJkNjE2LjQwNGQzNjMuMzI3ZDYyMi4yNTFkMzYyLjA3NWQ2MjEuODMzZDM2OC4zMzlkNjA4Ljg4N2Q0MDcuNTk1ZDU4Ni43NTNkNDA4LjQzZDU4NS45MThkNDA3LjE3N2Q1ODUuOTE4ZDQwMC45MTNkNTg1LjkxOGQzODguMTc2ZDU4OS4wNWQzNzUuNDM4ZDU5Mi4xODJkMzY5LjE3NGQ1OTIuMTgyZDM2Ny41MDRkNTkyLjE4MmQzNjguMzM5ZDU5MS4zNDdkMzY3LjUwNGQ1ODUuMDgzZDM0Ni4yMDVkNTc5LjY1NGQzMjQuNDg5ZDU3OS42NTRkMjk5Ljg0OWQ1OTUuMTA2aFIzZDc5NC4zMDlSNGQ3NTIuOTY1UjVkLTUwLjUzMVI2ZDQ4OS40NDhSN2QtOTEuODc2UjhkNTM5Ljk4UjlkMFIxMGQyODMuOThSMTFpMTk4UjEyZC01MC41MzFSMTNkNzk0LjMwOVIxNGFpMWkzaTJpMmkyaTNpMmkyaTNpM2kzaTFpMmkzaTNpMmkzaTJpM2kzaTJpM2kzaTNpM2kzaTJpMmkyaTJpM2kzaTJpMmkzaTNpM2kzaTJpMmkzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTJpMmkzaTJpM2kyaTNpMmkyaTJpM2kyaTJpMmkyaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kyaTNpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpMmkyaTNpM2kyaTJpMmkyaTJpM2kzaTJpMmkyaTJpMmkyaTJpM2kzaTNpM2kyaTJpM2hnOjg1b1IxZDc0MC4wMTlSMmFkMjIuMTMzZDU2OS42MzFkMTIuMTFkNTQ3LjkxNWQzMi4xNTZkNTQzLjMyMWQzMy40MDlkNTQyLjQ4NmQ4My4xMDZkNTQyLjQ4NmQxNDcuNDE5ZDU2Mi45NDlkMTUwLjc2ZDU2Mi41MzFkMTUwLjc2ZDU1Ny4xMDJkMTUwLjc2ZDU1NC41OTdkMTQ5LjkyNGQ1NTAuODM4ZDE2Mi4wMzVkNTQzLjMyMWQyNTkuNzU4ZDU0Mi40ODZkMjY5Ljc4MWQ1NTYuMjY3ZDI2MC4xNzZkNTcxLjcxOWQyMzUuNTM2ZDU3Mi41NTRkMjI1LjUxM2Q1NzMuODA3ZDIwNS40NjhkNTc2LjMxM2QxOTIuMTA0ZDU4Mi45OTVkMTg4LjM0NWQ1OTguMDI5ZDE4OC4zNDVkNjIxLjQxNWQxODguMzQ1ZDY0OC45NzhkMTkzLjc3NGQ2ODguMjM0ZDE1NS4zNTNkNzIyLjg5N2QxODkuNTk4ZDcyNC41NjdkMTg3LjA5MmQ3NjMuODIzZDE4Ny4wOTJkNzk3LjIzM2QxODcuMDkyZDg1OS44NzZkMTk1LjQ0NWQ5MDIuODlkMTg2LjY3NWQ5MTcuOTI0ZDE3OC43NGQ5MzYuM2QxODAuNDExZDkzNy41NTNkMjAwLjQ1NmQ5MjguNzgzZDIwMi4xMjdkOTI5LjYxOGQyMjUuOTMxZDk5NS42MDFkMzA1LjY5NmQ5OTUuNjAxZDQ0NS41OThkOTk1LjYwMWQ0NDUuNTk4ZDgzMy41NjZkNDQ1LjU5OGQ3MzcuNTEzZDQzMy45MDVkNzAxLjU5OGQ0NDAuNTg3ZDY5OS4wOTJkNDUxLjQ0NWQ3MDEuNTk4ZDQ0OS4zNTdkNzAxLjU5OGQ0NTIuMjhkNjk4LjI1N2Q0NDAuMTY5ZDY3My42MThkNDM4LjQ5OWQ2MjcuNjhkNDM2LjgyOGQ1ODguMDA2ZDQyOC40NzZkNTc2LjczZDQxNC4yNzdkNTU3LjUyZDM2NC41OGQ1NTguNzczZDM1OS41NjlkNTU3LjkzOGQzNTUuODFkNTQzLjMyMWQzODkuNjM3ZDUyOS41MzlkNDcwLjY1NWQ1MjkuMTIyZDUxNC4wODhkNTI4LjcwNGQ1NDcuMDc5ZDU0Ny45MTVkNTQ3LjkxNWQ1NTcuMTAyZDQ4OS44NjZkNTY3Ljk2ZDQ3My41NzlkNTYxLjI3OGQ0NzIuMzI2ZDU2Mi45NDlkNDkyLjc4OWQ1OTAuMDk0ZDQ5Mi4zNzFkNTk0LjY4OGQ0ODkuNDQ4ZDYzNy4yODVkNDkxLjk1NGQ3MTkuMTM4ZDQ5NS43MTJkODQ0LjAwNmQ1MDEuNTU5ZDEwMzQuMDIyZDI4MS44OTJkMTAzNC4wMjJkOTAuNjIzZDEwMzQuMDIyZDg2Ljg2NGQ4NjMuMjE2ZDEwMi43MzRkODUxLjk0MWQ4Ni40NDZkODEyLjY4NWQ4Ni40NDZkNzk0LjcyN2QxMDAuNjQ2ZDc2Ni4zMjlkODAuNmQ3NTkuNjQ3ZDc3LjI1OWQ3MjYuMjM4ZDEyNC4wMzJkNjQxLjQ2MWQ4Ni44NjRkNjg4LjIzNGQ4Ni44NjRkNjU3LjMzMWQxMDEuODk4ZDYzOS43OTFkODYuNDQ2ZDYyMy4wODZkODQuNzc2ZDU4My44M2Q3MC45OTVkNTc4LjgxOGQyMi4xMzNkNTY5LjYzMWhSM2Q1NzcuOTgzUjRkNTQ3LjkxNVI1ZDEyLjExUjZkNDk1LjI5NVI3ZC0xMC4wMjJSOGQ0ODMuMTg0UjlkMFIxMGQyODMuOThSMTFpODVSMTJkMTIuMTFSMTNkNTc3Ljk4M1IxNGFpMWkyaTNpM2kzaTNpMmkyaTJpMmkzaTNpM2kzaTJpMmkzaTNpM2kyaTJpMmkzaTNpM2kyaTNpMmkzaTNpM2kyaTJpMmkyaTNpMmkyaTJpMmkzaTNpMmkzaTNpMmkzaTJpMmkyaTJpMmkyaTJpMmkzaTJoZzoxOTdvUjFkNzQwLjAxOVIyYWQxOS4yMWQxMTIyLjE0ZDM0LjY2MmQxMDk2LjY2NWQ4MC42ZDEwODMuMzAxZDEwNC44MjJkMTAyMS45MTFkMTA1LjY1N2QxMDIwLjI0MWQxMzMuMjJkOTE5LjE3N2QxNzEuMjIzZDg5Mi40NWQxNDIuODI1ZDg3OS45MjFkMTczLjMxMWQ3OTcuNjVkMjAxLjcwOWQ3OTUuNTYyZDE5NS40NDVkNzYyLjU3ZDIxOC40MTRkNjk0LjkxNmQyMzQuMjgzZDY1NC40MDdkMjUxLjQwNmQ2MzMuMTA5ZDMwMi4zNTVkNjI2LjQyN2QyNDMuNDcxZDYwNi43OTlkMjcxLjg2OWQ1ODAuNDg5ZDI4My41NjJkNTMxLjYyOGQzMTUuMzAxZDU2NS40NTVkMzAzLjYwOGQ1MjEuMTg3ZDMyOC4yNDdkNTI0Ljk0NmQ0MTIuMTg5ZDc0Mi45NDJkNDk5LjA1M2Q5NjguMDM5ZDUxMi44MzVkOTc4Ljg5N2Q1MjkuOTU3ZDk5Mi4yNjFkNTY4Ljc5NmQxMDEzLjE0MWQ1NjguMzc4ZDEwMjEuNDk0ZDU1OC4zNTVkMTAyMS40OTRkNTM4LjUxOGQxMDIwLjI0MWQ1MTguNjgxZDEwMTguOTg4ZDUwOC42NTlkMTAxOC45ODhkNDk3LjM4M2QxMDIyLjMyOWQ1MDIuMzk0ZDEwMzIuMzUyZDQ5OC42MzZkMTAzNC4wMjJkMzg4LjM4NGQxMDIxLjkxMWQzMzAuMzM2ZDEwMjEuOTExZDMxOC42NDJkMTAyMS45MTFkMzA5LjAzN2QxMDIyLjMyOWQzMjYuOTk1ZDEwMDAuNjEzZDM4OC44MDJkOTc5LjczMmQzOTIuNTYxZDk3MS4zOGQzODYuNzE0ZDk0OS4yNDZkMzc1Ljg1NmQ5MjUuMDI0ZDQyMi4yMTJkODgyLjQyN2QzNjIuMDc1ZDg5MC43NzlkMzQ2LjYyM2Q4NTkuNDU4ZDMwMi4zNTVkODQ5LjAxN2QyNzQuNzkyZDg0OS4wMTdkMjQ1LjE0MWQ4NDkuMDE3ZDIxNS45MDhkODU5LjA0ZDE4MC44MjhkOTUwLjA4MWQxNjIuNDUzZDk5Ny42OWQxNTQuMTAxZDEwNDMuNjI4ZDE1OS41M2QxMDU3LjQwOWQxNjIuNDUzZDEwNTguNjYyZDE2Ni42MjlkMTA1OC42NjJkMTcyLjA1OGQxMDU4LjY2MmQxODMuMTI1ZDEwNTUuMzIxZDE5NC4xOTJkMTA1MS45OGQxOTkuNjIxZDEwNTEuOThkMjEwLjQ3OWQxMDUxLjk4ZDIyMy4wMDhkMTA2My4yNTZkMjE3Ljk5NmQxMDcyLjQ0M2QyMTQuNjU1ZDEwNzIuNDQzZDIwMC4wMzlkMTA3Mi40NDNkMTY5Ljc2MWQxMDgxLjQyMmQxMzkuNDg0ZDEwOTAuNDAxZDEyMy4xOTdkMTA4OS4xNDhkMTM1LjcyNWQxMDk1LjgzZDE0MS41NzJkMTEwMi41MTJkMTI2Ljk1NWQxMTA3Ljk0MWQ4Ni40NDZkMTExNS40NThkNDQuNjg1ZDExMjIuOTc1ZDMwLjkwM2QxMTIyLjU1N2QxOS4yMWQxMTIyLjE0ZDIzMC41MjVkODEyLjY4NWQyNDEuMzgzZDgxNi4wMjZkMjUzLjQ5NGQ4MTYuMDI2ZDI2Ni40NGQ4MTYuMDI2ZDMyNC45MDdkODAxLjgyN2QzMTUuMzAxZDc2OC40MTdkMjg0LjM5OGQ2NjkuNDQyZDIzMC41MjVkODEyLjY4NWQyMTIuMTVkNDA3LjE3N2QyMTIuMTVkMzc3Ljk0NGQyMzguODc3ZDM1Ny4wNjNkMjYzLjUxN2QzMzcuNDM1ZDI5My41ODVkMzM3LjQzNWQzMjQuMDcxZDMzNy40MzVkMzQ4LjcxMWQzNTYuNjQ2ZDM3NS44NTZkMzc3LjEwOWQzNzUuODU2ZDQwNi43NmQzNzUuODU2ZDQzNS45OTNkMzQ4LjcxMWQ0NTYuODc0ZDMyMy42NTRkNDc2LjUwMmQyOTMuNTg1ZDQ3Ni41MDJkMjYzLjUxN2Q0NzYuNTAyZDIzOC44NzdkNDU3LjI5MmQyMTIuMTVkNDM2LjQxMWQyMTIuMTVkNDA3LjE3N2QyOTMuNTg1ZDQ0NC4zNDVkMzIzLjIzNmQ0NDQuMzQ1ZDMyMy4yMzZkNDA2Ljc2ZDMyMy4yMzZkMzY5LjE3NGQyOTQuNDJkMzY5LjE3NGQyNjQuNzY5ZDM2OS4xNzRkMjY0Ljc2OWQ0MDYuNzZkMjY0Ljc2OWQ0NDQuMzQ1ZDI5My41ODVkNDQ0LjM0NWhSM2Q1ODguMDA2UjRkNTY4Ljc5NlI1ZDE5LjIxUjZkNjg2LjU2NFI3ZC05OC45NzVSOGQ2NjcuMzUzUjlkMFIxMGQyODMuOThSMTFpMTk3UjEyZDE5LjIxUjEzZDU4OC4wMDZSMTRhaTFpMmkzaTNpMmkyaTJpMmkyaTJpM2kyaTJpM2kyaTJpM2kzaTNpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpMmkyaTJpM2kzaTJpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kyaTFpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNoZzo4NG9SMWQ3NDAuMDE5UjJhZDUzLjAzN2Q1NTAuODM4ZDQxLjc2MWQ0OTkuODg5ZDgyLjI3ZDU0OS41ODVkMTIxLjUyNmQ1NTIuNTA4ZDE0OC42NzJkNTUyLjUwOGQxNzYuMjM0ZDU1Mi41MDhkMTkxLjY4NmQ1NDkuNTg1ZDI1OC4wODhkNTgwLjQ4OWQyMjguODU0ZDUzNC41NTFkMjQwLjU0OGQ1MzQuNTUxZDI5NC40MmQ1NzAuODg0ZDI4Ny43MzhkNTQ3LjkxNWQzMzkuOTQxZDU1MC4wMDNkNDM1LjE1OGQ1NTAuMDAzZDQ1Ni44NzRkNTQ2LjY2MmQ0NzMuMTYxZDUxOS4wOTlkNDg3Ljc3OGQ1MDQuOWQ0OTkuMDUzZDUxOS41MTdkNDgyLjM0OWQ1NTIuMDkxZDQ4Mi4zNDlkNTg4LjAwNmQ0ODIuMzQ5ZDYyMi42NjhkNDk4LjYzNmQ2NDguMTQzZDQ5Ny44ZDY4Ni45ODJkNDc5Ljg0M2Q2NzUuNzA2ZDQ1MC42MWQ2MjYuODQ1ZDQyNy4yMjNkNTg3LjU4OGQzOTkuMjQzZDU4Ny41ODhkMzgyLjUzOGQ1ODcuNTg4ZDM1OS45ODZkNTg5LjI1OWQzMjAuNzNkNTkyLjE4MmQzMTIuMzc4ZDY1Mi43MzdkMzEyLjM3OGQ3ODUuNTM5ZDMxMi4zNzhkODI2LjQ2NmQzMTYuMTM3ZDk1Ni43NjNkMzIwLjMxM2QxMTAyLjA5NGQzMjQuNDg5ZDExMDUuODUzZDM0MS4xOTRkMTEwNy45NDFkMzUzLjMwNWQxMTA3Ljk0MWQzNzkuNjE1ZDExMDIuNTEyZDQwNC4yNTRkMTA5Ny4wODNkNDE4LjAzNWQxMDk3LjkxOGQ0MjYuMzg4ZDEwOTguMzM2ZDM5Mi45NzhkMTEzNC42NjhkMjg3LjMyMWQxMTYzLjA2NmQxOTIuNTIyZDExODguNTQxZDEyOS40NjFkMTE4OC41NDFkMTI1LjcwM2QxMTg4LjU0MWQxMTcuMTQxZDExODUuNjE4ZDEwOC41OGQxMTgyLjY5NGQxMDMuOTg2ZDExODMuMTEyZDExNi45MzNkMTE3MC4xNjZkMTMzLjYzN2QxMTY3LjY2ZDIxMy44MmQxMTE1LjA0ZDIxNS40OTFkMTA5Ny4wODNkMjE1LjQ5MWQxMDM5LjQ1MWQyMTUuNDkxZDk4MS40MDJkMjEzLjgyZDg4My4yNjJkMjE3Ljk5NmQ4NzkuOTIxZDI2OC4xMWQ4ODguNjkxZDI1MC4xNTNkODc3LjQxNWQyMjAuMDg0ZDg0OS40MzVkMjI4LjAxOWQ4MzkuODNkMjE1LjQ5MWQ4MTYuODYxZDI2OC4xMWQ3ODUuNTM5ZDIxNS45MDhkNzg3LjIxZDIxNS40OTFkNzY1LjkxMWQyMTcuOTk2ZDcyNi42NTVkMjIwLjUwMmQ2ODQuODkzZDIyMC41MDJkNjY2LjEwMWQyMjAuNTAyZDY0NS4yMmQyMTIuMTVkNTk5LjI4MmQyMDQuNjMyZDU5Mi4xODJkMTI5LjQ2MWQ1OTAuOTI5ZDg0Ljc3NmQ1OTAuMDk0ZDYwLjk3MmQ2MTQuNzM0ZDU5LjcxOWQ2MTUuOTg2ZDE1LjAzNGQ2ODAuNzE3ZDEwLjQ0ZDY3MC42OTRkMzMuNDA5ZDU5Ni4zNThkMzMuNDA5ZDU3NS4wNmQzMy40MDlkNTYyLjUzMWQzMS4zMjFkNTQ4Ljc1ZDM2LjMzMmQ1NDQuMTU2ZDUxLjc4NGQ1NTEuNjczZDUzLjAzN2Q1NTAuODM4aFIzZDUyMi44NThSNGQ0OTkuMDUzUjVkMTAuNDRSNmQ1MjQuMTFSN2QtMTY0LjU0MVI4ZDUxMy42N1I5ZDBSMTBkMjgzLjk4UjExaTg0UjEyZDEwLjQ0UjEzZDUyMi44NThSMTRhaTFpMmkyaTNpM2kyaTJpMmkyaTJpMmkyaTJpM2kyaTNpM2kyaTNpM2kzaTJpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpM2kzaTNpMmkyaTNpMmkyaTJpMmkzaTNpM2kyaTJpM2kzaTJpM2kzaTJpMmkyaGc6MTk2b1IxZDc0MC4wMTlSMmFkMTkuMjFkMTEyMi4xNGQzNC42NjJkMTA5Ni42NjVkODAuNmQxMDgzLjMwMWQxMDQuODIyZDEwMjEuOTExZDEwNS42NTdkMTAyMC4yNDFkMTMzLjIyZDkxOS4xNzdkMTcxLjIyM2Q4OTIuNDVkMTQyLjgyNWQ4NzkuOTIxZDE3My4zMTFkNzk3LjY1ZDIwMS43MDlkNzk1LjU2MmQxOTUuNDQ1ZDc2Mi41N2QyMTguNDE0ZDY5NC45MTZkMjM0LjI4M2Q2NTQuNDA3ZDI1MS40MDZkNjMzLjEwOWQzMDIuMzU1ZDYyNi40MjdkMjQzLjQ3MWQ2MDYuNzk5ZDI3MS44NjlkNTgwLjQ4OWQyODMuNTYyZDUzMS42MjhkMzE1LjMwMWQ1NjUuNDU1ZDMwMy42MDhkNTIxLjE4N2QzMjguMjQ3ZDUyNC45NDZkNDEyLjE4OWQ3NDIuOTQyZDQ5OS4wNTNkOTY4LjAzOWQ1MTIuODM1ZDk3OC44OTdkNTI5Ljk1N2Q5OTIuMjYxZDU2OC43OTZkMTAxMy4xNDFkNTY4LjM3OGQxMDIxLjQ5NGQ1NTguMzU1ZDEwMjEuNDk0ZDUzOC41MThkMTAyMC4yNDFkNTE4LjY4MWQxMDE4Ljk4OGQ1MDguNjU5ZDEwMTguOTg4ZDQ5Ny4zODNkMTAyMi4zMjlkNTAyLjM5NGQxMDMyLjM1MmQ0OTguNjM2ZDEwMzQuMDIyZDM4OC4zODRkMTAyMS45MTFkMzMwLjMzNmQxMDIxLjkxMWQzMTguNjQyZDEwMjEuOTExZDMwOS4wMzdkMTAyMi4zMjlkMzI2Ljk5NWQxMDAwLjYxM2QzODguODAyZDk3OS43MzJkMzkyLjU2MWQ5NzEuMzhkMzg2LjcxNGQ5NDkuMjQ2ZDM3NS44NTZkOTI1LjAyNGQ0MjIuMjEyZDg4Mi40MjdkMzYyLjA3NWQ4OTAuNzc5ZDM0Ni42MjNkODU5LjQ1OGQzMDIuMzU1ZDg0OS4wMTdkMjc0Ljc5MmQ4NDkuMDE3ZDI0NS4xNDFkODQ5LjAxN2QyMTUuOTA4ZDg1OS4wNGQxODAuODI4ZDk1MC4wODFkMTYyLjQ1M2Q5OTcuNjlkMTU0LjEwMWQxMDQzLjYyOGQxNTkuNTNkMTA1Ny40MDlkMTYyLjQ1M2QxMDU4LjY2MmQxNjYuNjI5ZDEwNTguNjYyZDE3Mi4wNThkMTA1OC42NjJkMTgzLjEyNWQxMDU1LjMyMWQxOTQuMTkyZDEwNTEuOThkMTk5LjYyMWQxMDUxLjk4ZDIxMC40NzlkMTA1MS45OGQyMjMuMDA4ZDEwNjMuMjU2ZDIxNy45OTZkMTA3Mi40NDNkMjE0LjY1NWQxMDcyLjQ0M2QyMDAuMDM5ZDEwNzIuNDQzZDE2OS43NjFkMTA4MS40MjJkMTM5LjQ4NGQxMDkwLjQwMWQxMjMuMTk3ZDEwODkuMTQ4ZDEzNS43MjVkMTA5NS44M2QxNDEuNTcyZDExMDIuNTEyZDEyNi45NTVkMTEwNy45NDFkODYuNDQ2ZDExMTUuNDU4ZDQ0LjY4NWQxMTIyLjk3NWQzMC45MDNkMTEyMi41NTdkMTkuMjFkMTEyMi4xNGQyMzAuNTI1ZDgxMi42ODVkMjQxLjM4M2Q4MTYuMDI2ZDI1My40OTRkODE2LjAyNmQyNjYuNDRkODE2LjAyNmQzMjQuOTA3ZDgwMS44MjdkMzE1LjMwMWQ3NjguNDE3ZDI4NC4zOThkNjY5LjQ0MmQyMzAuNTI1ZDgxMi42ODVkMjE4LjQxNGQzMzIuMDA2ZDI2Ni4wMjJkMzMyLjAwNmQyNjYuMDIyZDM3Mi45MzNkMjY2LjAyMmQ0MTIuMTg5ZDI0MC4xM2Q0MTIuMTg5ZDIwNS44ODVkNDEyLjE4OWQxOTYuMjhkNDA5LjI2NWQxNzQuNTY0ZDQwMi41ODRkMTc0LjU2NGQzNzYuNjkxZDE3NC41NjRkMzU5LjE1MWQxODcuNzE5ZDM0NS41NzlkMjAwLjg3NGQzMzIuMDA2ZDIxOC40MTRkMzMyLjAwNmQzNDguNzExZDMyOC4yNDdkMzk2LjMxOWQzMjguMjQ3ZDM5Ni4zMTlkMzY5LjE3NGQzOTYuMzE5ZDQwNy4xNzdkMzczLjc2OGQ0MDcuMTc3ZDM2OS41OTJkNDA3LjE3N2QzNjEuODY2ZDQwNS41MDdkMzU0LjE0ZDQwMy44MzZkMzUwLjM4MWQ0MDMuODM2ZDMyNC40ODlkNDAzLjQxOWQzMTcuODA3ZDQwMC40OTVkMzA0Ljg2MWQzOTQuNjQ5ZDMwNC44NjFkMzcyLjkzM2QzMDQuODYxZDM1NC45NzVkMzE3LjgwN2QzNDEuNjExZDMzMC43NTNkMzI4LjI0N2QzNDguNzExZDMyOC4yNDdoUjNkNTg4LjAwNlI0ZDU2OC43OTZSNWQxOS4yMVI2ZDY5NS43NTJSN2QtOTguOTc1UjhkNjc2LjU0MVI5ZDBSMTBkMjgzLjk4UjExaTE5NlIxMmQxOS4yMVIxM2Q1ODguMDA2UjE0YWkxaTJpM2kzaTJpMmkyaTJpMmkyaTNpMmkyaTNpMmkyaTNpM2kzaTJpM2kzaTJpMmkyaTNpM2kyaTJpMmkzaTJpMmkyaTNpM2kyaTNpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpMmkxaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjgzb1IxZDc0MC4wMTlSMmFkMzM5LjUyM2Q2OTAuMzIzZDMxNy44MDdkNjQ5LjgxNGQzMDkuODcyZDYyMC45OThkMzA1LjY5NmQ2MjguOTMzZDMwNy4zNjdkNjQ4LjU2MWQzMDMuMTlkNjU1LjI0M2QyNjMuOTM0ZDYwMC45NTJkMjU2LjQxN2Q1OTMuODUzZDIyOC4wMTlkNTY2LjI5ZDE4OS4xODFkNTY2LjI5ZDE1Ny4wMjRkNTY2LjI5ZDEzNC44OWQ1ODIuOTk1ZDExMC4yNTFkNjAxLjM3ZDExMC4yNTFkNjMyLjY5MWQxMTAuMjUxZDY3Ni41NDFkMTc1LjgxN2Q3MDQuNTIyZDI5Ni45MjZkNzU1Ljg4OWQzNjIuNDkyZDc5Ni4zOThkMzYyLjQ5MmQ4NzEuOTg2ZDM2Mi40OTJkOTUxLjc1MmQzMTguMjI1ZDk5NS4zOTNkMjczLjk1N2QxMDM5LjAzNGQxOTQuMTkyZDEwMzkuMDM0ZDE1OS41M2QxMDM5LjAzNGQ5NC4zODFkOTk1LjYwMWQyNi43MjdkOTUwLjQ5OWQyOC44MTVkOTIxLjY4M2QzMC40ODZkODk4LjcxNGQ0Mi41OTdkOTIzLjM1M2Q1My44NzJkOTM1LjQ2NGQ1Ni4zNzhkOTI3Ljk0N2Q1Ni4zNzhkOTE2LjY3MmQ0MC41MDhkODMzLjk4M2QxMTAuMjUxZDk5Ni4wMTlkMjAwLjg3NGQ5OTYuMDE5ZDIzOS43MTJkOTk2LjAxOWQyNjcuNjkzZDk3NS41NTZkMjk5LjAxNGQ5NTMuMDA0ZDI5OS4wMTRkOTE1LjQxOWQyOTkuMDE0ZDg3MS45ODZkMjEwLjQ3OWQ4MzkuNDEyZDE3Ny40ODdkODI3LjMwMWQ4Mi42ODhkNzkzLjQ3NGQxMzguMjMxZDc4Mi42MTZkMTEwLjY2OGQ3NzguODU4ZDU4LjQ2NmQ3NjQuNjU5ZDU4Ljg4NGQ3NjYuMzI5ZDU4Ljg4NGQ3NDYuMjgzZDU4Ljg4NGQ3MzMuNzU1ZDQ4LjQ0M2Q3MDguOTA3ZDM4LjAwM2Q2ODQuMDU4ZDM4LjAwM2Q2NzEuNTNkMzguMDAzZDYwMS4zN2Q4OC4xMTdkNTYzLjc4NGQxMzIuODAyZDUyOS45NTdkMjA1LjA1ZDUyOS45NTdkMjgwLjIyMWQ1MjkuOTU3ZDMwOC4yMDJkNTc2LjMxM2QzMjIuNDAxZDU5OS42OTlkMzM5LjUyM2Q2OTAuMzIzaFIzZDM4Ny45NjdSNGQzNjIuNDkyUjVkMjYuNzI3UjZkNDk0LjA0MlI3ZC0xNS4wMzRSOGQ0NjcuMzE0UjlkMFIxMGQyODMuOThSMTFpODNSMTJkMjYuNzI3UjEzZDM4Ny45NjdSMTRhaTFpM2kyaTJpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNoZzoxOTVvUjFkNzQwLjAxOVIyYWQxOS4yMWQxMTIyLjE0ZDM0LjY2MmQxMDk2LjY2NWQ4MC42ZDEwODMuMzAxZDEwNC44MjJkMTAyMS45MTFkMTA1LjY1N2QxMDIwLjI0MWQxMzMuMjJkOTE5LjE3N2QxNzEuMjIzZDg5Mi40NWQxNDIuODI1ZDg3OS45MjFkMTczLjMxMWQ3OTcuNjVkMjAxLjcwOWQ3OTUuNTYyZDE5NS40NDVkNzYyLjU3ZDIxOC40MTRkNjk0LjkxNmQyMzQuMjgzZDY1NC40MDdkMjUxLjQwNmQ2MzMuMTA5ZDMwMi4zNTVkNjI2LjQyN2QyNDMuNDcxZDYwNi43OTlkMjcxLjg2OWQ1ODAuNDg5ZDI4My41NjJkNTMxLjYyOGQzMTUuMzAxZDU2NS40NTVkMzAzLjYwOGQ1MjEuMTg3ZDMyOC4yNDdkNTI0Ljk0NmQ0MTIuMTg5ZDc0Mi45NDJkNDk5LjA1M2Q5NjguMDM5ZDUxMi44MzVkOTc4Ljg5N2Q1MjkuOTU3ZDk5Mi4yNjFkNTY4Ljc5NmQxMDEzLjE0MWQ1NjguMzc4ZDEwMjEuNDk0ZDU1OC4zNTVkMTAyMS40OTRkNTM4LjUxOGQxMDIwLjI0MWQ1MTguNjgxZDEwMTguOTg4ZDUwOC42NTlkMTAxOC45ODhkNDk3LjM4M2QxMDIyLjMyOWQ1MDIuMzk0ZDEwMzIuMzUyZDQ5OC42MzZkMTAzNC4wMjJkMzg4LjM4NGQxMDIxLjkxMWQzMzAuMzM2ZDEwMjEuOTExZDMxOC42NDJkMTAyMS45MTFkMzA5LjAzN2QxMDIyLjMyOWQzMjYuOTk1ZDEwMDAuNjEzZDM4OC44MDJkOTc5LjczMmQzOTIuNTYxZDk3MS4zOGQzODYuNzE0ZDk0OS4yNDZkMzc1Ljg1NmQ5MjUuMDI0ZDQyMi4yMTJkODgyLjQyN2QzNjIuMDc1ZDg5MC43NzlkMzQ2LjYyM2Q4NTkuNDU4ZDMwMi4zNTVkODQ5LjAxN2QyNzQuNzkyZDg0OS4wMTdkMjQ1LjE0MWQ4NDkuMDE3ZDIxNS45MDhkODU5LjA0ZDE4MC44MjhkOTUwLjA4MWQxNjIuNDUzZDk5Ny42OWQxNTQuMTAxZDEwNDMuNjI4ZDE1OS41M2QxMDU3LjQwOWQxNjIuNDUzZDEwNTguNjYyZDE2Ni42MjlkMTA1OC42NjJkMTcyLjA1OGQxMDU4LjY2MmQxODMuMTI1ZDEwNTUuMzIxZDE5NC4xOTJkMTA1MS45OGQxOTkuNjIxZDEwNTEuOThkMjEwLjQ3OWQxMDUxLjk4ZDIyMy4wMDhkMTA2My4yNTZkMjE3Ljk5NmQxMDcyLjQ0M2QyMTQuNjU1ZDEwNzIuNDQzZDIwMC4wMzlkMTA3Mi40NDNkMTY5Ljc2MWQxMDgxLjQyMmQxMzkuNDg0ZDEwOTAuNDAxZDEyMy4xOTdkMTA4OS4xNDhkMTM1LjcyNWQxMDk1LjgzZDE0MS41NzJkMTEwMi41MTJkMTI2Ljk1NWQxMTA3Ljk0MWQ4Ni40NDZkMTExNS40NThkNDQuNjg1ZDExMjIuOTc1ZDMwLjkwM2QxMTIyLjU1N2QxOS4yMWQxMTIyLjE0ZDIzMC41MjVkODEyLjY4NWQyNDEuMzgzZDgxNi4wMjZkMjUzLjQ5NGQ4MTYuMDI2ZDI2Ni40NGQ4MTYuMDI2ZDMyNC45MDdkODAxLjgyN2QzMTUuMzAxZDc2OC40MTdkMjg0LjM5OGQ2NjkuNDQyZDIzMC41MjVkODEyLjY4NWQzOTguNDA3ZDMxOS44OTVkNDE3LjYxOGQzMjYuNTc3ZDQzMy40ODdkMzUwLjM4MWQ0MzEuMzk5ZDQxOC40NTNkMzY1LjQxNWQ0MTguNDUzZDMzOS41MjNkNDE4LjQ1M2QyODcuMTEyZDM5NC4yMzFkMjM0LjcwMWQzNzAuMDA5ZDIwOS4yMjZkMzcwLjAwOWQxOTUuNDQ1ZDM3MC4wMDlkMTg0LjM3OGQzNzkuNDA2ZDE3My4zMTFkMzg4LjgwMmQxNzMuMzExZDQwMi4xNjZkMTczLjMxMWQ0MjAuNTQxZDE5Ni4yOGQ0MzQuMzIzZDE1NS4zNTNkNDIwLjU0MWQxNTUuMzUzZDQwMy44MzZkMTU1LjM1M2QzMzEuNTg4ZDIxNS40OTFkMzMxLjU4OGQyNDIuNjM2ZDMzMS41ODhkMjk1LjI1NmQzNTYuMDE5ZDM0Ny44NzZkMzgwLjQ1ZDM3NS4wMjFkMzgwLjQ1ZDQxNy4yZDM4MC40NWQ0MTcuMmQzNTIuNDY5ZDQxNy4yZDMzNy40MzVkMzk4LjQwN2QzMTkuODk1aFIzZDU4OC4wMDZSNGQ1NjguNzk2UjVkMTkuMjFSNmQ3MDQuMTA0UjdkLTk4Ljk3NVI4ZDY4NC44OTNSOWQwUjEwZDI4My45OFIxMWkxOTVSMTJkMTkuMjFSMTNkNTg4LjAwNlIxNGFpMWkyaTNpM2kyaTJpMmkyaTJpMmkzaTJpMmkzaTJpMmkzaTNpM2kyaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kyaTJpMmkzaTNpMmkzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTJpMWkzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjgyb1IxZDc0MC4wMTlSMmFkMTAzLjE1MWQxMDc0LjUzMWQxMDguOTk4ZDk4MS44MmQxMDguOTk4ZDkyNy45NDdkMTA4Ljk5OGQ4NjUuNzIyZDEwMS40ODFkODU2Ljk1MmQxMjUuMjg1ZDg2MC43MTFkMTI0Ljg2N2Q4NTkuODc2ZDEwOS40MTVkODMyLjczZDk2Ljg4N2Q4MTAuNTk3ZDk2Ljg4N2Q4MDguNTA4ZDk4LjE0ZDgwOC4wOTFkMTAxLjA2M2Q4MDguMDkxZDE1MS4xNzdkODE4LjUzMWQxMjkuNDYxZDgwNi4wMDNkMTA2LjA3NWQ3ODUuOTU3ZDEwOS44MzNkNzc1LjUxN2QxMzguNjQ5ZDczOC4zNDlkMTM2LjU2MWQ3MzcuOTMxZDEwMS44OThkNzQzLjM2ZDEwMC4yMjhkNzM5LjE4NGQ5OC45NzVkNjc5LjA0N2QxMTIuMzM5ZDY4NC44OTNkMTEzLjU5MmQ2ODMuMjIzZDExMy41OTJkNjg4LjIzNGQ5OC45NzVkNjU0LjQwN2QxMDUuMjM5ZDY1MC4yMzFkMTE4LjYwM2Q2NDYuODlkMTE4LjE4NWQ2NDYuMDU1ZDExOC42MDNkNjQ1LjYzN2QxMDguOTk4ZDYzNi40NWQxMDguMTYzZDYzNC43NzlkMTIwLjY5MWQ2MjUuNTkyZDE0NS43NDhkNjEzLjA2M2QxNTMuNjgzZDYxMy44OThkMTA5LjgzM2Q2MTMuODk4ZDk5LjgxZDYxMy44OThkOTQuMzgxZDYxMS44MWQxMTEuOTIxZDYwMC45NTJkMTAwLjY0NmQ1NzMuODA3ZDY4LjkwN2Q1NzAuODg0ZDMxLjMyMWQ1ODcuMTcxZDQxLjc2MWQ1NTAuNDJkMTQ3LjQxOWQ1NDAuMzk4ZDE4Mi45MTZkNTM3LjA1N2QyOTEuNDk3ZDUzNy4wNTdkMzU2LjIyOGQ1MzcuMDU3ZDQwMy4wMDFkNTY3Ljk2ZDQ1Ny4yOTJkNjAzLjg3NmQ0NTcuMjkyZDY2NC44NDhkNDU3LjI5MmQ3NDguMzcxZDM1OC4zMTZkNzc4Ljg1OGQ0MTYuNzgzZDg3NC4wNzVkNDg2LjUyNWQ5NzguNDc5ZDU0Mi40ODZkMTAxNC4zOTRkNTQ0LjU3NGQxMDE2LjA2NWQ1NzkuMjM2ZDEwNDMuMjFkNTc5LjIzNmQxMDcwLjM1NWQ1NzcuMTQ4ZDEwODcuMDZkNTcyLjU1NGQxMDQxLjEyMmQ0NzguNTlkMTAwNS42MjRkNDYzLjk3M2QxMDE4LjU3ZDQyNC4zZDEwMTcuMzE4ZDQwNC42NzJkMTAyNS42N2QzOTUuNDg0ZDEwMzguMTk5ZDM4OS4yMmQxMDM2LjUyOGQyOTguNTk3ZDc5MC45NjlkMjMwLjEwN2Q3OTIuNjM5ZDE5OS4yMDNkNzkzLjQ3NGQxOTguMzY4ZDgxMy4xMDJkMTk4Ljc4NmQ4MTUuNjA4ZDE5OC43ODZkODI3LjMwMWQxOTkuMjAzZDEwNjYuNTk3ZDIyMC41MDJkMTA3MC43NzNkMjYzLjUxN2QxMDgwLjM3OGQyODEuMDU3ZDEwOTkuMTcxZDI2Mi4yNjRkMTEwNS44NTNkMjA4LjgwOWQxMTA1Ljg1M2QxMzcuODE0ZDExMDUuODUzZDQxLjc2MWQxMTQwLjkzM2QzMC45MDNkMTEzMC45MWQ1Ni4zNzhkMTEwMC4wMDZkMTAzLjE1MWQxMDc0LjUzMWQxOTYuNjk4ZDc0NC42MTNkMTk4LjM2OGQ3NDUuNDQ4ZDE5Ni4yOGQ3NDkuNjI0ZDE2OC43MTdkNzc5LjI3NWQxNzAuMzg4ZDc3OS42OTNkMTc0LjU2NGQ3NzkuNjkzZDE5MC40MzNkNzY2LjMyOWQxOTIuMTA0ZDc3MC41MDVkMTk3LjUzM2Q3NzguMDIyZDE5OS4yMDNkNzc3LjE4N2QyMDkuNjQ0ZDc2MC4wNjVkMjU2LjgzNWQ3NjAuMDY1ZDI3Ni4wNDVkNzU1LjA1M2QzMDYuMTE0ZDc0Ny4xMTlkMzI4LjI0N2Q3MTkuMTM4ZDMzMS4xNzFkNzE5LjEzOGQzMzYuMTgyZDcxOS45NzNkMzYyLjQ5MmQ3MjQuOTg1ZDMzMS4xNzFkNjk1LjMzNGQzMzEuMTcxZDY5NC40OTlkMzM1LjM0N2Q2OTAuNzRkMzQwLjc3NmQ2ODUuMzExZDM0NC41MzVkNjc5LjQ2NGQzNDQuNTM1ZDY1Ny43NDhkMzQ0LjUzNWQ2MDMuNDU4ZDMxMS41NDNkNTg1LjVkMjg3LjczOGQ1NzIuNTU0ZDIyOC44NTRkNTcyLjU1NGQyMTMuNDAyZDU3Mi41NTRkMTk5LjYyMWQ1NzQuNjQyZDE5OS42MjFkNjAzLjA0ZDE5OC4xNTlkNjU5LjYyOGQxOTYuNjk4ZDcxNi4yMTVkMTk2LjY5OGQ3NDQuNjEzaFIzZDUzMC4zNzVSNGQ1NzkuMjM2UjVkMzAuOTAzUjZkNDg2Ljk0MlI3ZC0xMTYuOTMzUjhkNDU2LjAzOVI5ZDBSMTBkMjgzLjk4UjExaTgyUjEyZDMwLjkwM1IxM2Q1MzAuMzc1UjE0YWkxaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kyaTJpM2kzaTJpMmkzaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kyaTJpMmkyaTJpM2kyaTNpM2kyaTNpMWkyaTNpMmkzaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2kzaTNpM2kzaGc6MTk0b1IxZDc0MC4wMTlSMmFkMTkuMjFkMTEyMi4xNGQzNC42NjJkMTA5Ni42NjVkODAuNmQxMDgzLjMwMWQxMDQuODIyZDEwMjEuOTExZDEwNS42NTdkMTAyMC4yNDFkMTMzLjIyZDkxOS4xNzdkMTcxLjIyM2Q4OTIuNDVkMTQyLjgyNWQ4NzkuOTIxZDE3My4zMTFkNzk3LjY1ZDIwMS43MDlkNzk1LjU2MmQxOTUuNDQ1ZDc2Mi41N2QyMTguNDE0ZDY5NC45MTZkMjM0LjI4M2Q2NTQuNDA3ZDI1MS40MDZkNjMzLjEwOWQzMDIuMzU1ZDYyNi40MjdkMjQzLjQ3MWQ2MDYuNzk5ZDI3MS44NjlkNTgwLjQ4OWQyODMuNTYyZDUzMS42MjhkMzE1LjMwMWQ1NjUuNDU1ZDMwMy42MDhkNTIxLjE4N2QzMjguMjQ3ZDUyNC45NDZkNDEyLjE4OWQ3NDIuOTQyZDQ5OS4wNTNkOTY4LjAzOWQ1MTIuODM1ZDk3OC44OTdkNTI5Ljk1N2Q5OTIuMjYxZDU2OC43OTZkMTAxMy4xNDFkNTY4LjM3OGQxMDIxLjQ5NGQ1NTguMzU1ZDEwMjEuNDk0ZDUzOC41MThkMTAyMC4yNDFkNTE4LjY4MWQxMDE4Ljk4OGQ1MDguNjU5ZDEwMTguOTg4ZDQ5Ny4zODNkMTAyMi4zMjlkNTAyLjM5NGQxMDMyLjM1MmQ0OTguNjM2ZDEwMzQuMDIyZDM4OC4zODRkMTAyMS45MTFkMzMwLjMzNmQxMDIxLjkxMWQzMTguNjQyZDEwMjEuOTExZDMwOS4wMzdkMTAyMi4zMjlkMzI2Ljk5NWQxMDAwLjYxM2QzODguODAyZDk3OS43MzJkMzkyLjU2MWQ5NzEuMzhkMzg2LjcxNGQ5NDkuMjQ2ZDM3NS44NTZkOTI1LjAyNGQ0MjIuMjEyZDg4Mi40MjdkMzYyLjA3NWQ4OTAuNzc5ZDM0Ni42MjNkODU5LjQ1OGQzMDIuMzU1ZDg0OS4wMTdkMjc0Ljc5MmQ4NDkuMDE3ZDI0NS4xNDFkODQ5LjAxN2QyMTUuOTA4ZDg1OS4wNGQxODAuODI4ZDk1MC4wODFkMTYyLjQ1M2Q5OTcuNjlkMTU0LjEwMWQxMDQzLjYyOGQxNTkuNTNkMTA1Ny40MDlkMTYyLjQ1M2QxMDU4LjY2MmQxNjYuNjI5ZDEwNTguNjYyZDE3Mi4wNThkMTA1OC42NjJkMTgzLjEyNWQxMDU1LjMyMWQxOTQuMTkyZDEwNTEuOThkMTk5LjYyMWQxMDUxLjk4ZDIxMC40NzlkMTA1MS45OGQyMjMuMDA4ZDEwNjMuMjU2ZDIxNy45OTZkMTA3Mi40NDNkMjE0LjY1NWQxMDcyLjQ0M2QyMDAuMDM5ZDEwNzIuNDQzZDE2OS43NjFkMTA4MS40MjJkMTM5LjQ4NGQxMDkwLjQwMWQxMjMuMTk3ZDEwODkuMTQ4ZDEzNS43MjVkMTA5NS44M2QxNDEuNTcyZDExMDIuNTEyZDEyNi45NTVkMTEwNy45NDFkODYuNDQ2ZDExMTUuNDU4ZDQ0LjY4NWQxMTIyLjk3NWQzMC45MDNkMTEyMi41NTdkMTkuMjFkMTEyMi4xNGQyMzAuNTI1ZDgxMi42ODVkMjQxLjM4M2Q4MTYuMDI2ZDI1My40OTRkODE2LjAyNmQyNjYuNDRkODE2LjAyNmQzMjQuOTA3ZDgwMS44MjdkMzE1LjMwMWQ3NjguNDE3ZDI4NC4zOThkNjY5LjQ0MmQyMzAuNTI1ZDgxMi42ODVkMTg2LjY3NWQ0MzQuNzRkMTkzLjc3NGQ0MjguNDc2ZDI0My40NzFkMzc4Ljc3OWQyNTIuMjQxZDM3Ny4xMDlkMjY2Ljg1OGQzNzAuODQ1ZDI2NC4zNTJkMzY3LjUwNGQyNjAuMTc2ZDM2MC44MjJkMjcyLjcwNGQzNTQuMTRkMjczLjUzOWQzNDMuMjgyZDI4NS42NWQzMjAuMzEzZDMwMC4yNjdkMjkyLjc1ZDMwMi4zNTVkMjgzLjk4ZDMwNi45NDlkMjgzLjk4ZDM0NC41MzVkMzc3Ljk0NGQ0MTEuNzcxZDQzNC43NGQzNzIuMDk3ZDQzNC43NGQzNjguMzM5ZDQzNC43NGQzNTQuOTc1ZDQyNy4yMjNkMzQxLjYxMWQ0MTkuNzA2ZDM0MC43NzZkNDE2Ljc4M2QzNDMuMjgyZDQxMi4xODlkMzQ3LjA0ZDQwMi4xNjZkMzQ2LjYyM2Q0MDAuNDk1ZDMzOS45NDFkNDAyLjU4NGQzMzUuNzY1ZDQwMi4xNjZkMzMwLjc1M2Q0MDEuNzQ4ZDMyOS45MThkMzg5LjYzN2QzMjYuOTk1ZDM3NC4xODVkMzI0LjkwN2QzODIuMTJkMzIxLjU2NmQzODguODAyZDMxOC4yMjVkMzgzLjc5MWQzMDMuNjA4ZDM1Ny40ODFkMjc4LjEzM2QzOTguNDA3ZDIyNC42NzhkNDM0Ljc0ZDE4Ni42NzVkNDM0Ljc0aFIzZDU4OC4wMDZSNGQ1NjguNzk2UjVkMTkuMjFSNmQ3NDAuMDE5UjdkLTk4Ljk3NVI4ZDcyMC44MDlSOWQwUjEwZDI4My45OFIxMWkxOTRSMTJkMTkuMjFSMTNkNTg4LjAwNlIxNGFpMWkyaTNpM2kyaTJpMmkyaTJpMmkzaTJpMmkzaTJpMmkzaTNpM2kyaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kyaTJpMmkzaTNpMmkzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTJpMWkzaTNpM2kyaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6ODFvUjFkNzQwLjAxOVIyYWQzOTUuOTAyZDEwMjcuMzRkNDcwLjY1NWQxMTAwLjg0MWQ1MTQuOTIzZDExMDAuODQxZDUzOS4xNDVkMTEwMC44NDFkNTU3LjEwMmQxMDg4LjMxM2Q1NjUuNDU1ZDEwODIuNDY2ZDU4OS42NzZkMTA1Ny40MDlkNTgwLjA3MWQxMDgwLjc5NmQ1NzkuNjU0ZDEwNzkuMTI1ZDU0Ny45MTVkMTEzOC40MjdkNDk1LjI5NWQxMTM4LjQyN2Q0NDguNTIyZDExMzguNDI3ZDM3OS42MTVkMTEwMy43NjVkMzE2LjU1NGQxMDcyLjAyNmQyNzguOTY5ZDEwMzUuNjkzZDI3Mi4yODdkMTA1NS43MzhkMjU3LjY3ZDEwNTkuMDc5ZDI1MC41N2QxMDQ1LjcxNmQyMzguODc3ZDEwMzAuMjY0ZDIzMC45NDJkMTAzNi4xMWQyMjUuOTMxZDEwNTIuODE1ZDE1MS4xNzdkMTAzOS4wMzRkOTAuNjIzZDk0OS4yNDZkMzMuNDA5ZDg2NC40NjlkMzMuNDA5ZDc4NS4xMjJkMzMuNDA5ZDc0Mi45NDJkNDUuOTM4ZDY4OS40ODdkNjIuNjQyZDYxOC40OTJkOTAuMjA1ZDYxMC41NTdkOTkuMzkzZDYwOC4wNTJkMTE5LjQzOGQ2MTAuOTc1ZDE1MC4zNDJkNjE1LjU2OWQxNTEuMTc3ZDYxNS4xNTFkMTM3LjM5NmQ2MDguNDY5ZDEyMS4xMDlkNTkyLjZkMTM1LjMwOGQ1NzcuOTgzZDE4MC44MjhkNTMxLjIxZDI5OS4wMTRkNTMxLjIxZDQyMC41NDFkNTMxLjIxZDQ5MS41MzZkNTkzLjg1M2Q1NjUuODcyZDY1OS44MzZkNTY1Ljg3MmQ3ODAuMTFkNTY1Ljg3MmQ4NjQuODg3ZDUyMC43NjlkOTMxLjI4OGQ0NzUuMjQ5ZDk5OC45NDJkMzk1LjkwMmQxMDI3LjM0ZDQ2Mi4zMDNkODY5Ljg5OGQ0NzYuOTJkODU5LjA0ZDQ5MS45NTRkODQzLjU4OGQ0OTIuMzcxZDg0MS45MThkNDgyLjM0OWQ4MzYuMDcxZDQ2NC4zOTFkODM0LjgxOGQ0NjMuNTU2ZDgxMi42ODVkNDk2LjEzZDc5NS4xNDVkNTI3Ljg2OWQ3NzIuNTkzZDUyNi42MTZkNzYwLjA2NWQ1MDMuNjQ3ZDc2MC4wNjVkNDg2LjUyNWQ3NjAuMDY1ZDQ1Ny4yOTJkNzY3LjU4MmQ0NDIuNjc1ZDY5NC4wODFkMzk5LjY2ZDY0MC42MjZkMzQ4LjcxMWQ1NzcuNTY2ZDI4MS4wNTdkNTc3LjU2NmQyMDkuNjQ0ZDU3Ny41NjZkMTcwLjgwNWQ2MjUuNTkyZDEzNC44OWQ2NjkuNDQyZDEzNC44OWQ3NDIuNTI1ZDEzNC44OWQ4MzIuNzNkMTgxLjY2M2Q5MTYuMjU0ZDIzNi4zNzFkMTAxMy45NzdkMzIwLjMxM2QxMDEzLjk3N2Q0NDIuMjU3ZDEwMTMuOTc3ZDQ2Mi4zMDNkODY5Ljg5OGhSM2Q2MDEuNzg3UjRkNTg5LjY3NlI1ZDMzLjQwOVI2ZDQ5Mi43ODlSN2QtMTE0LjQyN1I4ZDQ1OS4zOFI5ZDBSMTBkMjgzLjk4UjExaTgxUjEyZDMzLjQwOVIxM2Q2MDEuNzg3UjE0YWkxaTNpM2kzaTJpMmkzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kyaTNpM2kzaTNpM2kxaTNpMmkzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE5M29SMWQ3NDAuMDE5UjJhZDE5LjIxZDExMjIuMTRkMzQuNjYyZDEwOTYuNjY1ZDgwLjZkMTA4My4zMDFkMTA0LjgyMmQxMDIxLjkxMWQxMDUuNjU3ZDEwMjAuMjQxZDEzMy4yMmQ5MTkuMTc3ZDE3MS4yMjNkODkyLjQ1ZDE0Mi44MjVkODc5LjkyMWQxNzMuMzExZDc5Ny42NWQyMDEuNzA5ZDc5NS41NjJkMTk1LjQ0NWQ3NjIuNTdkMjE4LjQxNGQ2OTQuOTE2ZDIzNC4yODNkNjU0LjQwN2QyNTEuNDA2ZDYzMy4xMDlkMzAyLjM1NWQ2MjYuNDI3ZDI0My40NzFkNjA2Ljc5OWQyNzEuODY5ZDU4MC40ODlkMjgzLjU2MmQ1MzEuNjI4ZDMxNS4zMDFkNTY1LjQ1NWQzMDMuNjA4ZDUyMS4xODdkMzI4LjI0N2Q1MjQuOTQ2ZDQxMi4xODlkNzQyLjk0MmQ0OTkuMDUzZDk2OC4wMzlkNTEyLjgzNWQ5NzguODk3ZDUyOS45NTdkOTkyLjI2MWQ1NjguNzk2ZDEwMTMuMTQxZDU2OC4zNzhkMTAyMS40OTRkNTU4LjM1NWQxMDIxLjQ5NGQ1MzguNTE4ZDEwMjAuMjQxZDUxOC42ODFkMTAxOC45ODhkNTA4LjY1OWQxMDE4Ljk4OGQ0OTcuMzgzZDEwMjIuMzI5ZDUwMi4zOTRkMTAzMi4zNTJkNDk4LjYzNmQxMDM0LjAyMmQzODguMzg0ZDEwMjEuOTExZDMzMC4zMzZkMTAyMS45MTFkMzE4LjY0MmQxMDIxLjkxMWQzMDkuMDM3ZDEwMjIuMzI5ZDMyNi45OTVkMTAwMC42MTNkMzg4LjgwMmQ5NzkuNzMyZDM5Mi41NjFkOTcxLjM4ZDM4Ni43MTRkOTQ5LjI0NmQzNzUuODU2ZDkyNS4wMjRkNDIyLjIxMmQ4ODIuNDI3ZDM2Mi4wNzVkODkwLjc3OWQzNDYuNjIzZDg1OS40NThkMzAyLjM1NWQ4NDkuMDE3ZDI3NC43OTJkODQ5LjAxN2QyNDUuMTQxZDg0OS4wMTdkMjE1LjkwOGQ4NTkuMDRkMTgwLjgyOGQ5NTAuMDgxZDE2Mi40NTNkOTk3LjY5ZDE1NC4xMDFkMTA0My42MjhkMTU5LjUzZDEwNTcuNDA5ZDE2Mi40NTNkMTA1OC42NjJkMTY2LjYyOWQxMDU4LjY2MmQxNzIuMDU4ZDEwNTguNjYyZDE4My4xMjVkMTA1NS4zMjFkMTk0LjE5MmQxMDUxLjk4ZDE5OS42MjFkMTA1MS45OGQyMTAuNDc5ZDEwNTEuOThkMjIzLjAwOGQxMDYzLjI1NmQyMTcuOTk2ZDEwNzIuNDQzZDIxNC42NTVkMTA3Mi40NDNkMjAwLjAzOWQxMDcyLjQ0M2QxNjkuNzYxZDEwODEuNDIyZDEzOS40ODRkMTA5MC40MDFkMTIzLjE5N2QxMDg5LjE0OGQxMzUuNzI1ZDEwOTUuODNkMTQxLjU3MmQxMTAyLjUxMmQxMjYuOTU1ZDExMDcuOTQxZDg2LjQ0NmQxMTE1LjQ1OGQ0NC42ODVkMTEyMi45NzVkMzAuOTAzZDExMjIuNTU3ZDE5LjIxZDExMjIuMTRkMjMwLjUyNWQ4MTIuNjg1ZDI0MS4zODNkODE2LjAyNmQyNTMuNDk0ZDgxNi4wMjZkMjY2LjQ0ZDgxNi4wMjZkMzI0LjkwN2Q4MDEuODI3ZDMxNS4zMDFkNzY4LjQxN2QyODQuMzk4ZDY2OS40NDJkMjMwLjUyNWQ4MTIuNjg1ZDI3Mi4yODdkNDQyLjY3NWQ0MDcuNTk1ZDM1NC45NzVkNDA3LjU5NWQzMjIuODE4ZDQwNy41OTVkMzIwLjczZDM4Ni45MjNkMzAyLjk4MmQzNjYuMjUxZDI4NS4yMzNkMzYzLjMyN2QyODUuMjMzZDM0NC41MzVkMjg1LjIzM2QzMTEuMTI1ZDM1My43MjJkMzA0LjAyNmQzNjcuOTIxZDI3Mi4yODdkNDQyLjY3NWhSM2Q1ODguMDA2UjRkNTY4Ljc5NlI1ZDE5LjIxUjZkNzM4Ljc2NlI3ZC05OC45NzVSOGQ3MTkuNTU2UjlkMFIxMGQyODMuOThSMTFpMTkzUjEyZDE5LjIxUjEzZDU4OC4wMDZSMTRhaTFpMmkzaTNpMmkyaTJpMmkyaTJpM2kyaTJpM2kyaTJpM2kzaTNpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpMmkyaTJpM2kzaTJpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kyaTFpM2kzaTNpMmkxaTNpM2kzaTNpM2hnOjgwb1IxZDc0MC4wMTlSMmFkNDQ2LjQzM2Q2NzAuMjc3ZDQ0Ni40MzNkODE1LjE5ZDI5NC44MzhkODE1LjE5ZDIxMi4xNWQ4MTUuMTlkMjEyLjE1ZDc2NS45MTFkMjEyLjE1ZDc0NS4wM2QyMjYuNzY2ZDcxMi4wMzlkMjI1LjkzMWQ3NzEuNzU4ZDI2MS44NDZkNzcxLjc1OGQyOTcuMzQ0ZDc3MS43NThkMzMwLjc1M2Q3MzIuOTJkMzQ3LjQ1OGQ3MzMuMzM3ZDM2MC44MjJkNzMyLjkyZDM2MS42NTdkNzMyLjA4NGQzNDIuNDQ2ZDcwMy42ODZkMzQ3LjQ1OGQ2NzkuODgyZDM0Ny40NThkNjY5LjAyNGQzNDcuNDU4ZDU4MS4zMjRkMjEwLjQ3OWQ1ODEuMzI0ZDE5NS44NjJkNTg5LjY3NmQxODcuOTI4ZDczMC44MzFkMTg3LjkyOGQ5MTIuOTEzZDE4Ny45MjhkMTA2NC45MjZkMTkyLjUyMmQxMTExLjI4MmQyNDYuODEyZDExMTYuMjkzZDI4MC4yMjFkMTExOS4yMTZkMjk2LjUwOGQxMTMzLjgzM2QxNTUuMzUzZDExODguOTU5ZDI1Ljg5MmQxMTk0LjgwNWQ0LjU5M2QxMTgyLjY5NGQyNC42MzlkMTE2OC40OTVkODguNTM1ZDExNDMuODU2ZDkyLjI5M2QxMTIxLjMwNWQ5Mi4yOTNkMTA2NC45MjZkOTIuMjkzZDEwMTguMTUzZDg5Ljc4N2Q5NDguNDExZDkzLjEyOGQ5NDYuMzIzZDEzOS4wNjZkOTYyLjYxZDEyMy4xOTdkOTQ5LjI0NmQ5My45NjRkOTIwLjAxM2Q5My45NjRkOTEwLjQwN2Q5My45NjRkODk5LjU0OWQ5Ni44ODdkODI3LjcxOWQ5OC45NzVkNzc2Ljc2OWQ5NS42MzRkNzQ1LjAzZDExMC42NjhkNzM1LjQyNWQxMzIuMzg0ZDcyNi42NTVkOTAuMjA1ZDcyNi42NTVkODcuNjk5ZDcyNC41NjdkOTYuNDY5ZDY5OC4yNTdkOTYuNDY5ZDY1Mi4zMTlkODAuMTgyZDU4Mi45OTVkNDguNDQzZDU3NC4yMjVkMTUuODY5ZDU2NC4yMDJkNzMuMDgzZDU0NC4xNTZkMTc3LjQ4N2Q1NDQuMTU2ZDI3MS4wMzRkNTQ0LjE1NmQ0NDYuNDMzZDU0NC4xNTZkNDQ2LjQzM2Q2NzAuMjc3aFIzZDQ2Ny4zMTRSNGQ0NDYuNDMzUjVkNC41OTNSNmQ0NzkuODQzUjdkLTE3MC44MDVSOGQ0NzUuMjQ5UjlkMFIxMGQyODMuOThSMTFpODBSMTJkNC41OTNSMTNkNDY3LjMxNFIxNGFpMWkzaTNpM2kzaTNpMmkyaTJpMmkzaTNpMmkzaTNpMmkzaTNpMmkzaTNpM2kyaTJpM2kyaTNpM2kzaTNpMmkzaTNpM2kyaTNoZzoxOTJvUjFkNzQwLjAxOVIyYWQxOS4yMWQxMTIyLjE0ZDM0LjY2MmQxMDk2LjY2NWQ4MC42ZDEwODMuMzAxZDEwNC44MjJkMTAyMS45MTFkMTA1LjY1N2QxMDIwLjI0MWQxMzMuMjJkOTE5LjE3N2QxNzEuMjIzZDg5Mi40NWQxNDIuODI1ZDg3OS45MjFkMTczLjMxMWQ3OTcuNjVkMjAxLjcwOWQ3OTUuNTYyZDE5NS40NDVkNzYyLjU3ZDIxOC40MTRkNjk0LjkxNmQyMzQuMjgzZDY1NC40MDdkMjUxLjQwNmQ2MzMuMTA5ZDMwMi4zNTVkNjI2LjQyN2QyNDMuNDcxZDYwNi43OTlkMjcxLjg2OWQ1ODAuNDg5ZDI4My41NjJkNTMxLjYyOGQzMTUuMzAxZDU2NS40NTVkMzAzLjYwOGQ1MjEuMTg3ZDMyOC4yNDdkNTI0Ljk0NmQ0MTIuMTg5ZDc0Mi45NDJkNDk5LjA1M2Q5NjguMDM5ZDUxMi44MzVkOTc4Ljg5N2Q1MjkuOTU3ZDk5Mi4yNjFkNTY4Ljc5NmQxMDEzLjE0MWQ1NjguMzc4ZDEwMjEuNDk0ZDU1OC4zNTVkMTAyMS40OTRkNTM4LjUxOGQxMDIwLjI0MWQ1MTguNjgxZDEwMTguOTg4ZDUwOC42NTlkMTAxOC45ODhkNDk3LjM4M2QxMDIyLjMyOWQ1MDIuMzk0ZDEwMzIuMzUyZDQ5OC42MzZkMTAzNC4wMjJkMzg4LjM4NGQxMDIxLjkxMWQzMzAuMzM2ZDEwMjEuOTExZDMxOC42NDJkMTAyMS45MTFkMzA5LjAzN2QxMDIyLjMyOWQzMjYuOTk1ZDEwMDAuNjEzZDM4OC44MDJkOTc5LjczMmQzOTIuNTYxZDk3MS4zOGQzODYuNzE0ZDk0OS4yNDZkMzc1Ljg1NmQ5MjUuMDI0ZDQyMi4yMTJkODgyLjQyN2QzNjIuMDc1ZDg5MC43NzlkMzQ2LjYyM2Q4NTkuNDU4ZDMwMi4zNTVkODQ5LjAxN2QyNzQuNzkyZDg0OS4wMTdkMjQ1LjE0MWQ4NDkuMDE3ZDIxNS45MDhkODU5LjA0ZDE4MC44MjhkOTUwLjA4MWQxNjIuNDUzZDk5Ny42OWQxNTQuMTAxZDEwNDMuNjI4ZDE1OS41M2QxMDU3LjQwOWQxNjIuNDUzZDEwNTguNjYyZDE2Ni42MjlkMTA1OC42NjJkMTcyLjA1OGQxMDU4LjY2MmQxODMuMTI1ZDEwNTUuMzIxZDE5NC4xOTJkMTA1MS45OGQxOTkuNjIxZDEwNTEuOThkMjEwLjQ3OWQxMDUxLjk4ZDIyMy4wMDhkMTA2My4yNTZkMjE3Ljk5NmQxMDcyLjQ0M2QyMTQuNjU1ZDEwNzIuNDQzZDIwMC4wMzlkMTA3Mi40NDNkMTY5Ljc2MWQxMDgxLjQyMmQxMzkuNDg0ZDEwOTAuNDAxZDEyMy4xOTdkMTA4OS4xNDhkMTM1LjcyNWQxMDk1LjgzZDE0MS41NzJkMTEwMi41MTJkMTI2Ljk1NWQxMTA3Ljk0MWQ4Ni40NDZkMTExNS40NThkNDQuNjg1ZDExMjIuOTc1ZDMwLjkwM2QxMTIyLjU1N2QxOS4yMWQxMTIyLjE0ZDIzMC41MjVkODEyLjY4NWQyNDEuMzgzZDgxNi4wMjZkMjUzLjQ5NGQ4MTYuMDI2ZDI2Ni40NGQ4MTYuMDI2ZDMyNC45MDdkODAxLjgyN2QzMTUuMzAxZDc2OC40MTdkMjg0LjM5OGQ2NjkuNDQyZDIzMC41MjVkODEyLjY4NWQzNzMuMzVkNDQ3LjI2OWQyMzguMDQyZDM1OS41NjlkMjM4LjA0MmQzMjcuNDEyZDIzOC4wNDJkMzI1Ljc0MmQyNTguOTIzZDMwNy43ODRkMjc5LjgwNGQyODkuODI3ZDI4Mi4zMDlkMjg5LjgyN2QzMDAuNjg1ZDI4OS44MjdkMzM0LjUxMmQzNTguMzE2ZDMzOC42ODhkMzY2LjY2OGQzNzMuMzVkNDQ3LjI2OWhSM2Q1ODguMDA2UjRkNTY4Ljc5NlI1ZDE5LjIxUjZkNzM0LjE3MlI3ZC05OC45NzVSOGQ3MTQuOTYyUjlkMFIxMGQyODMuOThSMTFpMTkyUjEyZDE5LjIxUjEzZDU4OC4wMDZSMTRhaTFpMmkzaTNpMmkyaTJpMmkyaTJpM2kyaTJpM2kyaTJpM2kzaTNpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpMmkyaTJpM2kzaTJpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kyaTFpM2kzaTNpMmkxaTNpM2kzaTNpM2hnOjc5b1IxZDc0MC4wMTlSMmFkNDIuNTk3ZDc4OS43MTZkNDIuNTk3ZDc4MS43ODFkMzkuMDQ3ZDc2Ny41ODJkMzUuNDk3ZDc1My4zODNkMzUuMDc5ZDc0Ni43MDFkMzkuNjczZDc0NS40NDhkNTQuNzA3ZDc0NS40NDhkNjkuMzI0ZDc0NS40NDhkOTQuNzk5ZDc0Ni43MDFkODYuMDI5ZDczNy41MTNkMzkuMjU2ZDcxOC4zMDNkNjAuMTM3ZDYyOC45MzNkMTM1LjMwOGQ1NzguNDAxZDIwNS4wNWQ1MzEuMjFkMzAwLjI2N2Q1MzEuMjFkNDEzLjQ0MmQ1MzEuMjFkNDg3Ljc3OGQ1OTUuMTA2ZDU2Ni4yOWQ2NjIuMzQyZDU2Ni4yOWQ3NzMuNDI5ZDU2Ni4yOWQ4ODkuMTA5ZDQ4OS4yMzlkOTYzLjIzNmQ0MTIuMTg5ZDEwMzcuMzYzZDI5Ni4wOTFkMTAzNy4zNjNkMjMzLjg2NmQxMDM3LjM2M2QxNzQuMTQ2ZDEwMDcuMDg2ZDExNC40MjdkOTc2LjgwOWQ3Ny4yNTlkOTI2LjY5NGQxMDEuODk4ZDkyNC4xODlkMTI0LjQ1ZDkxOC43NmQ5NC4zODFkOTEyLjkxM2Q2Mi4yMjVkOTAzLjcyNWQ0Mi41OTdkODY2Ljk3NWQ0Mi41OTdkNzg5LjcxNmQxNDEuOTlkNzIwLjM5MWQxNDEuOTlkODAwLjk5MWQxNjkuOTdkODU3Ljc4N2QxNTQuNTE4ZDg3NS4zMjdkMTM5LjQ4NGQ4OTYuNjI2ZDE1MS41OTVkOTA2LjIzMWQxOTQuMTkyZDkwOC43MzdkMjIyLjE3MmQ5NTEuMzM0ZDI0MC45NjVkOTY3LjIwM2QyNzAuNjE2ZDk5Mi4yNjFkMzEwLjI5ZDk5Mi4yNjFkMzc2LjI3NGQ5OTIuMjYxZDQxNy4yZDk1Mi41ODdkNDU4LjEyN2Q5MTIuOTEzZDQ1OC4xMjdkODQ2LjkyOWQ0NTguMTI3ZDgxNC43NzNkNDQ4LjUyMmQ3NzUuMDk5ZDQ1Ni44NzRkNzc0LjI2NGQ0NzMuMTYxZDc3NC4yNjRkNDg5Ljg2NmQ3NzQuMjY0ZDUxNC41MDVkNzc1LjA5OWQ0NDMuNTFkNzUzLjhkNDM4LjA4MWQ3MzUuNDI1ZDQ0My41MWQ3MzEuMjQ5ZDQ0Ni40MzNkNzIyLjQ3OWQ0NDYuMDE2ZDcyMC44MDlkNDI3LjY0MWQ3MDYuMTkyZDQ3MC42NTVkNjk5LjUxZDQ0MS40MjJkNjg0LjQ3NmQ0MDkuMjY1ZDY2NC4wMTNkMzU3LjQ4MWQ1NzcuOTgzZDI4OS44MjdkNTc3Ljk4M2QxNDEuOTlkNTc3Ljk4M2QxNDEuOTlkNzIwLjM5MWhSM2Q2MDEuNzg3UjRkNTY2LjI5UjVkMzUuMDc5UjZkNDkyLjc4OVI3ZC0xMy4zNjNSOGQ0NTcuNzA5UjlkMFIxMGQyODMuOThSMTFpNzlSMTJkMzUuMDc5UjEzZDYwMS43ODdSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2hnOjE5MW9SMWQ3NDAuMDE5UjJhZDE4Mi40OTlkODkxLjE5N2QxNzUuMzk5ZDg4OC4yNzRkMTY2LjIxMmQ4ODguMjc0ZDE1Ni4xODlkODg4LjI3NGQxNDMuNjZkODkxLjYxNWQxNzEuNjQxZDg2OS44OThkMTk2LjY5OGQ4NjkuODk4ZDI0MC41NDhkODY5Ljg5OGQyNDAuNTQ4ZDg5Ny40NjFkMjQwLjU0OGQ5MDkuNTcyZDIzNC4yODNkOTMzLjE2OGQyMjguMDE5ZDk1Ni43NjNkMjI4LjAxOWQ5NjguODc0ZDIyOC4wMTlkOTgzLjA3M2QyMzEuMzZkMTAwNS42MjRkMjM1Ljk1NGQxMDM2LjUyOGQyMzYuMzcxZDEwNDIuMzc1ZDIzNC4yODNkMTA0NS43MTZkMTc2LjIzNGQxMDIxLjQ5NGQxMjcuNzkxZDEwMjEuNDk0ZDYzLjg5NWQxMDIxLjQ5NGQ2My44OTVkMTA3OS4xMjVkNjMuODk1ZDExNzEuNDE5ZDE1MC4zNDJkMTE5MC42MjlkMjI5LjY5ZDEyMDguMTY5ZDIzMS43NzhkMTIwNi45MTZkMjMxLjc3OGQxMjAxLjkwNWQyMjUuMDk2ZDExOTguMTQ2ZDIxNS40OTFkMTE5Mi43MTdkMjE0LjIzOGQxMTkxLjA0N2QyMTQuNjU1ZDExODkuNzk0ZDIzNS41MzZkMTE3Ny42ODNkMjM1LjUzNmQxMTYzLjkwMmQyMzUuNTM2ZDExNTEuMzczZDIyMC45MmQxMTM4Ljg0NWQyMTYuMzI2ZDExMzUuMDg2ZDE5Ni42OThkMTEyMC4wNTJkMjIwLjA4NGQxMTIwLjA1MmQyNDguMDY1ZDExMzIuOTk4ZDI4MS4wNTdkMTE0OC40NWQyODEuMDU3ZDExNjguNDk1ZDI4MS4wNTdkMTI0MC4zMjZkMjAzLjM4ZDEyNDAuMzI2ZDExOS44NTZkMTI0MC4zMjZkNzAuNTc3ZDExOTQuODA1ZDE5LjIxZDExNDguMDMyZDE5LjIxZDEwNjUuMzQ0ZDE5LjIxZDEwMjAuMjQxZDY5LjMyNGQ5OTYuMDE5ZDEwNy43NDVkOTc3LjIyNmQxNjAuNzgzZDk3Ni4zOTFkMTgzLjMzNGQ5NzUuOTczZDE4NC4xNjlkOTY4Ljg3NGQxODguNzYzZDk0Ny41NzVkMTkyLjUyMmQ5MzAuMDM1ZDE5Mi41MjJkOTE5LjE3N2QxOTAuODUxZDkxNS40MTlkMTc3LjkwNWQ5MzAuMDM1ZDE3Ny40ODdkOTI5LjJkMTc3LjQ4N2Q5MTguNzZkMTgyLjQ5OWQ4OTEuMTk3ZDIwMi45NjJkODIzLjU0M2QxNTkuOTQ3ZDgyMy41NDNkMTU5Ljk0N2Q3ODAuNTI4ZDE1OS45NDdkNzM4Ljc2NmQyMDIuOTYyZDczOC43NjZkMjMxLjc3OGQ3MzguNzY2ZDIzNS4xMTlkNzU1LjA1M2QyMjIuNTlkNzgwLjExZDIyMS4zMzdkNzgwLjk0NmQyMjEuMzM3ZDc4Ni4zNzVkMjI5LjI3MmQ3ODYuMzc1ZDI0MS44ZDc4Ni4zNzVkMjQ2LjgxMmQ3ODcuMjFkMjQ2LjgxMmQ3OTEuODA0ZDI0Ni44MTJkODIzLjU0M2QyMDIuOTYyZDgyMy41NDNoUjNkMzAwLjI2N1I0ZDI4MS4wNTdSNWQxOS4yMVI2ZDI4NS4yMzNSN2QtMjE2LjMyNlI4ZDI2Ni4wMjJSOWQwUjEwZDI4My45OFIxMWkxOTFSMTJkMTkuMjFSMTNkMzAwLjI2N1IxNGFpMWkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTJpMmkzaTFpM2kzaTNpM2kzaTJpM2kzaGc6NzhvUjFkNzQwLjAxOVIyYWQ1Ljg0NmQ1OTEuMzQ3ZDExLjY5M2Q1NjcuNTQzZDM2Ljc1ZDU1My4zNDRkNTkuMzAxZDU0MC4zOThkODUuNjExZDU0MC4zOThkMTA0LjgyMmQ1NDAuMzk4ZDEzOS4wNjZkNTY3Ljk2ZDEzNC40NzNkNTYxLjI3OGQxMjguNjI2ZDU0Ny40OTdkMTMzLjIyZDU0My4zMjFkMTU1Ljc3MWQ1NDIuNDg2ZDE2Ny40NjRkNTQyLjkwM2QyMzIuNjEzZDYwMy4wNGQyMzIuMTk1ZDYyNC4zMzlkMjMyLjYxM2Q2NDYuNDczZDIzNC43MDFkNjQ3LjMwOGQyNDMuMDUzZDYzNi40NWQyNDguOWQ2MTQuNzM0ZDI1Ny42N2Q2NDkuODE0ZDI1OC45MjNkNjUwLjY0OWQyNzIuMjg3ZDY0Mi4yOTZkMjc2LjA0NWQ2NDIuMjk2ZDM0Ny4wNGQ3MTcuMDVkNTE2LjE3NmQ4OTQuOTU1ZDUxNi4xNzZkODg1LjM1ZDUxNi4xNzZkNjY1LjI2NWQ0OTcuMzgzZDU4OC44NDFkNDg2Ljk0MmQ1ODIuMTU5ZDQ2OC41NjdkNTc2LjczZDQzOC40OTlkNTY3Ljk2ZDQzMC45ODJkNTUzLjM0NGQ0NDguNTIyZDU0NC45OTFkNDg5LjQ0OGQ1NDQuOTkxZDUzMi44OGQ1NDUuODI3ZDU5Ni4zNThkNTQ3LjA3OWQ2MTIuNjQ2ZDU1NC41OTdkNjAxLjc4N2Q1NzEuMzAxZDU1My4zNDRkNTgwLjQ4OWQ1MzYuMjIxZDYyMS40MTVkNTM2LjYzOWQ2MjIuMjUxZDU1OS42MDhkNjExLjgxZDU2MC44NjFkNjEzLjA2M2Q1NTEuNjczZDY0Mi43MTRkNTUxLjY3M2Q2NTIuMzE5ZDU1MS42NzNkNzgxLjc4MWQ1NTIuOTI2ZDgxMy4xMDJkNTU2LjY4NWQ5MDYuNjQ5ZDU3Mi41NTRkOTY5LjcwOWQ1NDIuOTAzZDk3OC4wNjFkNTYwLjAyNmQ5OTQuNzY2ZDU2MS42OTZkMTAxMi43MjRkNTUyLjkyNmQxMDExLjA1M2Q1NTAuODM4ZDEwMTMuMTQxZDU1OS4xOWQxMDI4LjU5M2Q1NzQuMjI1ZDEwNTkuNDk3ZDUwNy44MjNkMTAxNS42NDdkNDcxLjA3M2Q5OTEuNDI1ZDQ0OS4zNTdkOTYzLjAyN2Q0MzkuMzM0ZDkxOS41OTVkNDI0LjcxN2Q5MzguMzg4ZDMzOC4yN2Q4NDQuMDA2ZDMwNS42OTZkODI4LjEzN2QzODkuMjJkODQ4LjE4MmQzMDYuMTE0ZDgxMC41OTdkMjUyLjY1OWQ3NjYuMzI5ZDIxOC40MTRkNzM3LjkzMWQxNDEuOTlkNjU1LjI0M2QxNDUuMzMxZDc5My40NzRkMTQ1LjMzMWQ3OTkuNzM4ZDE0MC4zMTlkODE0Ljc3M2QxMzQuNDczZDgzMS44OTVkMTMzLjYzN2Q4MzYuOTA3ZDEzNC40NzNkODM4LjE1OWQxNTIuNDNkODM2LjQ4OWQxNDcuNDE5ZDg5NC41MzhkMTQzLjY2ZDkzNi43MTdkMTU3Ljg1OWQ5ODUuNTc5ZDE4Mi45MTZkOTkwLjU5ZDIzMC4xMDdkMTAwOC4xM2QyMTUuMDczZDEwMjUuNjdkMjAwLjQ1NmQxMDI2LjA4OGQzMi41NzRkMTAyNC40MTdkMjUuODkyZDEwMjMuNTgyZDE5LjYyOGQxMDA4LjEzZDI1LjQ3NGQxMDA1LjYyNGQyOS4yMzNkOTk4LjEwN2QzOS42NzNkOTk5Ljc3OGQ1Ny42MzFkMTAwOS44ZDQxLjc2MWQ5OTMuMDk2ZDUxLjc4NGQ5OTMuNTEzZDY5Ljc0MmQ5OTQuMzQ5ZDg0LjM1OGQ5OTEuNDI1ZDk3LjcyMmQ5NzQuNzIxZDk3LjcyMmQ4OTIuMDMyZDk3LjcyMmQ4NzEuNTY5ZDk3LjMwNWQ2NzUuMjg4ZDk3LjMwNWQ1NzcuNTY2ZDM4LjAwM2Q1NzcuNTY2ZDIxLjcxNmQ1NzcuNTY2ZDUuODQ2ZDU5MS4zNDdoUjNkNjQxLjQ2MVI0ZDYxMi42NDZSNWQ1Ljg0NlI2ZDQ4My42MDFSN2QtMzUuNDk3UjhkNDc3Ljc1NVI5ZDBSMTBkMjgzLjk4UjExaTc4UjEyZDUuODQ2UjEzZDY0MS40NjFSMTRhaTFpM2kzaTNpM2kyaTJpMmkyaTJpMmkyaTNpMmkyaTJpM2kyaTJpM2kzaTJpMmkyaTNpM2kyaTNpMmkyaTJpM2kzaTNpMmkyaTJpMmkyaTNpMmkzaTJpMmkzaTJpM2kzaTJpM2kzaTJpMmkyaTNpM2kyaTJpMmkzaTNpM2kyaTJpM2kzaTJpMmkzaTNoZzoxOTBvUjFkNzQwLjAxOVIyYWQ1NS41NDNkNjE4LjA3NWQxMDguMTYzZDU4My44M2QxNDMuNjZkNTYwLjg2MWQxNDMuNjZkNTM5LjU2MmQxNDMuNjZkNTE2LjE3NmQxMzMuMjJkNTA4LjY1OWQxMjUuMjg1ZDUwMi44MTJkMTAxLjg5OGQ1MDIuODEyZDQ4LjAyNmQ1MDIuODEyZDQ4LjAyNmQ1NTEuMjU2ZDQ4LjAyNmQ1NTUuODQ5ZDQ4LjQ0M2Q1NjAuODYxZDM4LjQyZDU1My4zNDRkMzguNDJkNTM0Ljk2OWQzOC40MmQ0NzQuODMxZDEyOC42MjZkNDc0LjgzMWQxNDkuMDg5ZDQ3NC44MzFkMTYzLjcwNmQ0ODIuMzQ5ZDE2NC4xMjNkNDkyLjc4OWQxNjcuNDY0ZDUxMy42N2QxNzEuNjQxZDUwMy4yM2QxNzYuNjUyZDQ5My42MjRkMTg5LjU5OGQ1MDYuNTdkMTg5LjU5OGQ1MjUuNzgxZDE4OS41OThkNTYwLjAyNmQxMzkuOTAyZDU5My44NTNkMjEyLjE1ZDU5My44NTNkMjEyLjE1ZDY2Ni45MzZkMjEyLjE1ZDcxOC4zMDNkMTc3LjQ4N2Q3NDcuMTE5ZDE0NS43NDhkNzczLjg0NmQ5My4xMjhkNzczLjg0NmQxOS4yMWQ3NzMuODQ2ZDE5LjIxZDczOS4xODRkMTkuMjFkNzIyLjA2MWQ0MS43NjFkNzA5LjUzM2Q2MC45NzJkNjk4LjY3NWQ3OS43NjVkNjk4LjY3NWQ4My4xMDZkNjk5LjkyOGQ1NC43MDdkNzI3LjQ5MWQ1NC43MDdkNzM3LjA5NmQ1NC43MDdkNzU3LjE0MWQxMDMuOTg2ZDc1Ny4xNDFkMTMyLjgwMmQ3NTcuMTQxZDE2Mi40NTNkNjk3Ljg0ZDE3My4zMTFkNjkxLjU3NWQxODUuNDIyZDY4MC43MTdkMTgzLjc1MmQ2NzkuNDY0ZDE2NC45NTlkNjgzLjIyM2QxNjEuMmQ2NzYuMTIzZDE1Ny40NDJkNjYxLjkyNGQxNTguNjk0ZDY2MC4yNTRkMTY3Ljg4MmQ2NjIuMzQyZDE2OC43MTdkNjYxLjkyNGQxNjguNzE3ZDY1NS4yNDNkMTQ1LjMzMWQ2MzguOTU1ZDEyMy4xOTdkNjIzLjkyMWQxMTQuMDA5ZDYyMi4yNTFkMTA5LjgzM2Q2MTcuNjU3ZDc4LjkyOWQ2MTcuNjU3ZDY4LjkwN2Q2MTcuNjU3ZDU1LjU0M2Q2MTguMDc1ZDY1MS45MDJkOTIwLjQzZDY2Ny43NzFkOTUyLjE2OWQ2MjcuMjYyZDk1NC4yNTdkNjI4LjUxNWQ5NzguNDc5ZDYwOC44ODdkMTAwOC41NDhkNjI2Ljg0NWQ5OTIuNjc4ZDYyNy4yNjJkMTAwMi43MDFkNjI3LjI2MmQxMDA0Ljc4OWQ2MjYuMDA5ZDEwMzQuMDIyZDYwOC4wNTJkMTAyNS4yNTJkNTk5LjI4MmQxMDI1LjI1MmQ1ODguMDA2ZDEwMjUuMjUyZDU3OS4yMzZkMTAzNC4wMjJkNTc5LjIzNmQ5NTguODUxZDUyNi4xOTlkOTQzLjM5OWQ1MzcuMDU3ZDk1OS42ODZkNTI5LjUzOWQ5NjAuOTM5ZDUxMC43NDdkOTU5LjY4NmQ0ODEuNTEzZDk1Ny41OThkNDY2Ljg5N2Q5NTYuMzQ1ZDQ1OC41NDRkOTgzLjQ5MWQ0NDcuNjg2ZDk2My44NjJkNDQ3LjY4NmQ5NTUuNTFkNDQ3LjY4NmQ5NTAuMDgxZDQ1My41MzNkOTQyLjU2NGQ1MjcuNDUxZDg0Ni45MjlkNTg4LjAwNmQ3MzYuMjYxZDYxMi42NDZkNzM1LjAwOGQ2MjguNTE1ZDczNS44NDNkNjI4LjkzM2Q3MzguMzQ5ZDYyOC4wOTdkNzU1LjA1M2Q2MDUuOTY0ZDc1Ni4zMDZkNjMxLjg1NmQ3NjcuMTY0ZDYyNy42OGQ3NzYuNzY5ZDYyNi44NDVkODAwLjU3NGQ2MjYuNDI3ZDgyMi43MDdkNjE0LjczNGQ4MzQuODE4ZDYyNy42OGQ4MzQuODE4ZDYyMS44MzNkODQ4LjE4MmQ2MjkuNzY4ZDg0OS4wMTdkNjI3LjI2MmQ4ODIuODQ1ZDYyNy4yNjJkOTIxLjI2NWQ2MzguMTJkOTIxLjY4M2Q2NTEuOTAyZDkyMC40M2Q1NzkuMjM2ZDkyMC44NDhkNTg3LjU4OGQ4NTAuNjg4ZDU5MC41MTJkNzg1Ljk1N2Q1NzIuOTcyZDgxNi4wMjZkNTQ4LjMzMmQ4NTUuNjk5ZDUxNC41MDVkOTA5LjU3MmQ0OTUuMjk1ZDkyMi41MThkNDk5Ljg4OWQ5MjUuODU5ZDU2NC42MTlkOTIwLjQzZDU3OS4yMzZkOTIwLjg0OGQxNzcuMDdkMTA1Ny40MDlkMzQyLjg2NGQ3MzIuMDg0ZDQ3Ny4zMzdkNDE1LjUzZDQ4MS41MTNkNDQwLjU4N2Q1MjguNzA0ZDQyMC4xMjNkNTMwLjM3NWQ0MjAuNTQxZDI0MS44ZDEwNTcuNDA5ZDIzNy4yMDdkMTAzNy43ODFkMjA5LjIyNmQxMDU3LjgyN2QxODIuOTE2ZDEwNTcuODI3ZDE3OS45OTNkMTA1Ny44MjdkMTc3LjA3ZDEwNTcuNDA5aFIzZDY4Ni45ODJSNGQ2NjcuNzcxUjVkMTkuMjFSNmQ2MDguNDY5UjdkLTMzLjgyN1I4ZDU4OS4yNTlSOWQwUjEwZDI4My45OFIxMWkxOTBSMTJkMTkuMjFSMTNkNjg2Ljk4MlIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kyaTJpMmkzaTNpM2kzaTFpMmkyaTJpMmkyaTJpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpMmkyaTJpMmkyaTJpM2kzaTJpMmkyaTNpM2kxaTNpM2kzaTJpM2kxaTNpMmkzaTJpMmkzaTNoZzo3N29SMWQ3NDAuMDE5UjJhZDAuNDE3ZDEwMjEuNDk0ZDE2LjcwNGQxMDAyLjI4M2Q4NS42MTFkOTkzLjA5NmQ4NS42MTFkODA3LjI1NmQ4NS42MTFkNzk5LjMyMWQ4NS4xOTRkNzcxLjc1OGQ4NC43NzZkNzQ0LjE5NWQ4Mi42ODhkNjA2Ljc5OWQ3Mi42NjVkNTgzLjgzZDQ4LjAyNmQ1NzcuMTQ4ZDMyLjU3NGQ1ODMuODNkMTEuNjkzZDYwMC4xMTdkMTguNzkyZDU2NS40NTVkNDQuNjg1ZDU0Mi40ODZkODMuOTQxZDU0MS4yMzNkMTQxLjU3MmQ1NzcuMTQ4ZDEyNy4zNzNkNTU4Ljc3M2QxMjEuNTI2ZDU0NC41NzRkMTkwLjg1MWQ1NDEuMjMzZDI0OC45ZDYxNS41NjlkMjQ4LjlkNjMyLjI3NGQyNDguOWQ2NDEuODc5ZDIzMy40NDhkNjcyLjM2NWQyNTUuNTgyZDY2Ny4zNTNkMjY4Ljk0NmQ2OTcuMDA0ZDIxOC44MzFkNzA3LjAyN2QyODEuMDU3ZDcyMy4zMTRkMzA3Ljc4NGQ3ODEuMzYzZDI5NS42NzNkNzkyLjIyMWQyODUuNjVkODA2LjgzOGQyODguNTc0ZDgwOC45MjZkMjk5LjQzMmQ4MDcuMjU2ZDMwOC4yMDJkODA2LjAwM2QzMDkuODcyZDgwNS41ODVkMzE0LjA0OGQ4MDUuMTY4ZDMxOS40NzdkODA2LjgzOGQzMjUuNzQyZDgyMy45NmQzNDIuNDQ2ZDg1My4xOTRkNDEzLjAyNGQ3MDguMjhkNDQ4LjUyMmQ2MzUuMTk3ZDQ0OC41MjJkNTU0LjU5N2Q0NDkuNzc0ZDU0OS4xNjhkNDkxLjExOWQ1NDYuMjQ0ZDU2NS44NzJkNTQ0LjE1NmQ1NjYuMjlkNTQ0LjU3NGQ1NTkuMTlkNTU3LjEwMmQ1NTYuMjY3ZDU2NS44NzJkNTU3LjkzOGQ1NjcuOTZkNTc5LjIzNmQ1NjcuOTZkNjAyLjYyM2Q1MzYuMjIxZDYxOC45MWQ1MzguMzA5ZDY2NC4wMTNkNTQ4LjMzMmQ2NjMuMTc3ZDU1OS42MDhkNjU4LjU4NGQ1NjMuMzY3ZDYxOC45MWQ1NzguNDAxZDU5MC41MTJkNTg5LjI1OWQ1OTAuOTI5ZDYwOS4zMDVkNTk0LjI3ZDczNS40MjVkNjA4LjA1MmQ5NTYuNzYzZDU5My44NTNkOTY2LjM2OGQ1NzkuNjU0ZDk4MC45ODVkNTg0LjY2NWQ5ODUuMTYxZDYwNi43OTlkOTgyLjIzOGQ2MzUuNjE1ZDk4Mi4yMzhkNjY4LjYwNmQxMDA4LjEzZDY0My45NjdkMTAyNS4yNTJkNjAwLjExN2QxMDE2LjQ4MmQ1MjMuNjkzZDEwMTguMTUzZDQ2My4xMzhkMTAxOS40MDZkNDcwLjY1NWQxMDE5LjQwNmQ0MzguNDk5ZDEwMTIuMzA2ZDQ0Ni44NTFkMTAwMC4xOTVkNDcxLjkwOGQ5ODcuNjY3ZDQ5Ni45NjVkOTc1LjEzOGQ1MDEuOTc3ZDk2OC44NzRkNDk2Ljk2NWQ5MzkuNjQxZDQ5OS44ODlkOTM0LjIxMmQ1MDEuOTc3ZDkzNC4yMTJkNTMyLjA0NWQ5NTMuMDA0ZDUwMy42NDdkOTE0LjE2NmQ1MDIuODEyZDc2Ni43NDdkNDkyLjc4OWQ2MzYuMDMyZDQzOC4wODFkNzc1LjA5OWQzODUuNDYxZDkwOC43MzdkMzU4LjMxNmQ5NDIuOTgyZDM0NS4zN2Q5NTkuMjY5ZDI5Ny4zNDRkOTgwLjk4NWQyNzguNTUxZDk0Mi45ODJkMjU0Ljc0N2Q4ODkuOTQ0ZDIzOS43MTJkODU2LjUzNWQyMzEuNzc4ZDc4OC44OGQyMjIuMTcyZDgzNy4zMjRkMjIxLjc1NWQ4MzUuMjM2ZDEzMS45NjdkNjQxLjg3OWQxMzYuNTYxZDcwMi44NTFkMTM2LjU2MWQ3NzEuNzU4ZDEzNi41NjFkNzk5LjMyMWQxMzEuMzRkODU0LjAyOWQxMjYuMTJkOTA4LjczN2QxMjYuMTJkOTM2LjNkMTI2LjEyZDk2Ni43ODZkMTU1Ljc3MWQ5ODIuNjU1ZDE2Ny44ODJkOTg4LjkyZDIxMC40NzlkMTAxMC42MzZkMTg3LjUxZDEwMjEuMDc2ZDE2MS4yZDEwMjEuMDc2ZDAuNDE3ZDEwMjEuNDk0aFIzZDY5Ni41ODdSNGQ2NjguNjA2UjVkMC40MTdSNmQ0ODcuNzc4UjdkLTEuMjUyUjhkNDg3LjM2UjlkMFIxMGQyODMuOThSMTFpNzdSMTJkMC40MTdSMTNkNjk2LjU4N1IxNGFpMWkyaTNpM2kyaTNpMmkzaTNpMmkyaTNpMmkzaTNpMmkyaTJpMmkyaTNpM2kyaTNpMmkzaTJpM2kyaTNpMmkzaTJpM2kzaTJpM2kzaTNpM2kyaTJpM2kyaTNpMmkzaTNpM2kyaTJpM2kyaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kyaGc6MTg5b1IxZDc0MC4wMTlSMmFkMTMxLjEzMmQ0NzAuNjU1ZDEzOC42NDlkNDcxLjA3M2QxMzkuNDg0ZDQ4MS41MTNkMTM5LjkwMmQ0ODYuMTA3ZDEzNS4zMDhkNDk2Ljk2NWQxMjkuNDYxZDUxMS4xNjRkMTI5LjA0NGQ1MTMuMjUyZDEzMC43MTRkNTE0LjA4OGQxMzkuMDY2ZDUxMmQxMzEuNTQ5ZDU3OS42NTRkMTMxLjU0OWQ2MTkuMzI3ZDEzMS41NDlkNzQxLjI3MmQxNDQuMDc4ZDc0My43NzhkMTcwLjM4OGQ3NDkuMjA3ZDE4Ni4yNTdkNzU3Ljk3N2QxNzcuOTA1ZDc2Mi45ODhkMTY4LjcxN2Q3NjIuOTg4ZDc4LjkyOWQ3NjIuNTdkMTAzLjU2OWQ3NDcuNTM2ZDg3LjY5OWQ3NTQuMjE4ZDQ3LjYwOGQ3NjIuOTg4ZDQxLjc2MWQ3NTUuNDcxZDU1LjEyNWQ3NDMuMzZkODEuODUzZDczOC4zNDlkODkuNzg3ZDcyMS4yMjZkODguMTE3ZDY4MS45N2Q4Ni44NjRkNjUzLjk5ZDkwLjIwNWQ2NDQuODAyZDk0Ljc5OWQ2MjguNTE1ZDkzLjU0NmQ2MjcuNjhkODcuNjk5ZDYyOS43NjhkODUuNjExZDYxNy4yMzlkODEuODUzZDU5MS43NjVkODIuNjg4ZDU5MC41MTJkOTcuMzA1ZDYwMS4zN2QxMTUuMjYyZDYyMy41MDRkODcuMjgyZDU3NS4wNmQ4Ny42OTlkNTY5LjYzMWQxMDEuNDgxZDU3Ny45ODNkODQuNzc2ZDU1Ni4yNjdkODguMTE3ZDUzNy44OTJkODguMTE3ZDUzNC45NjlkODcuNjk5ZDUxNi41OTNkODYuMDI5ZDUxNi41OTNkNzcuNjc2ZDUxNi41OTNkNTQuNzA3ZDUzNS4zODZkMzAuNDg2ZDU1NS4wMTRkMTkuNjI4ZDU1Ny4xMDJkMTkuMjFkNTU2LjI2N2QyMC40NjNkNTYwLjQ0M2QyNy45OGQ1NTEuMjU2ZDM3LjU4NWQ1MjAuNzY5ZDQ2Ljc3M2Q0OTIuMzcxZDU1LjU0M2Q0ODQuODU0ZDcyLjY2NWQ0NzAuMjM4ZDExNC40MjdkNDcwLjIzOGQxMjMuNjE1ZDQ3MC4yMzhkMTMxLjEzMmQ0NzAuNjU1ZDU3Ni4zMTNkMTAzMS45MzRkNTg0LjI0N2QxMDEzLjk3N2Q1NjMuMzY3ZDEwMzQuODU4ZDUzNi42MzlkMTAzNC44NThkNTI3LjQ1MWQxMDM0Ljg1OGQ1MjAuMzUyZDEwMjAuMjQxZDUwNC40ODJkMTAzMi43NjlkNDU5LjM4ZDEwMzIuNzY5ZDQ0OC41MjJkMTAzMi43NjlkNDQxLjQyMmQxMDMxLjkzNGQ0NjQuODA5ZDEwMDIuMjgzZDUxMi44MzVkOTQ1LjQ4N2Q1MjIuNDRkOTQwLjg5M2Q1MzcuODkyZDkzMi4xMjNkNTMyLjg4ZDkyNy4xMTJkNTIyLjAyMmQ5MjcuNTNkNTQyLjA2OGQ5MDQuNTYxZDU0NS44MjdkOTAwLjgwMmQ1NTYuMjY3ZDg5MC43NzlkNTc0LjIyNWQ4NzkuMDg2ZDU2NC42MTlkODc5LjkyMWQ1NTcuNTJkODc5LjUwNGQ1ODAuMDcxZDgzOC45OTVkNTgwLjA3MWQ4MTQuMzU1ZDU4MC4wNzFkNzY5LjI1MmQ1MjYuMTk5ZDc2OS4yNTJkNTA4LjI0MWQ3NjkuMjUyZDQ5MS41MzZkNzgwLjExZDQ3Mi43NDNkNzkyLjIyMWQ0NzIuNzQzZDgwOS4zNDRkNDcyLjc0M2Q4MjguNTU0ZDUwMC4zMDZkODQ2LjkyOWQ0NzMuMTYxZDg0MS41ZDQ2My4xMzhkODMzLjE0OGQ0NDkuNzc0ZDgyMi4yOWQ0NDkuNzc0ZDc5NS45OGQ0NDkuNzc0ZDc2OC40MTdkNDg1LjY5ZDc1Mi4xM2Q1MTQuNTA1ZDczOS4xODRkNTQ1LjgyN2Q3MzkuMTg0ZDU4MS4zMjRkNzM5LjE4NGQ1OTcuMTk0ZDc1My4zODNkNTcyLjEzN2Q3NTguODEyZDU3Mi41NTRkNzU5LjIzZDU5Mi4xODJkNzYyLjU3ZDYxMy44OThkNzY4ZDYxMy40ODFkNzczLjQyOWQ2MTMuODk4ZDc3OS42OTNkNjI5Ljc2OGQ3ODcuNjI4ZDYyOS43NjhkODE3LjI3OGQ2MjkuNzY4ZDg1My42MTFkNTgxLjMyNGQ5MTYuMjU0ZDU0NS44MjdkOTYyLjE5MmQ1MDIuMzk0ZDEwMDEuNDQ4ZDUzNC41NTFkMTAwMy41MzZkNTU0LjE3OWQxMDAzLjUzNmQ2MzAuNjAzZDEwMDMuNTM2ZDYzMC42MDNkOTgzLjQ5MWQ2MzAuNjAzZDk3My40NjhkNjA4Ljg4N2Q5NTguMDE2ZDY0Ny43MjVkOTYzLjAyN2Q2NDcuNzI1ZDk5MS4wMDhkNjQ3LjcyNWQxMDI4LjU5M2Q1NzYuMzEzZDEwMzEuOTM0ZDEyMS41MjZkMTA2NC45MjZkMjg3LjMyMWQ3MzkuNjAxZDQyMS4zNzZkNDIzLjA0N2Q0MjUuOTdkNDQ4LjEwNGQ0NzMuMTYxZDQyNy42NDFkNDc0LjgzMWQ0MjguMDU4ZDE4Ni4yNTdkMTA2NC45MjZkMTgxLjI0NmQxMDQ1LjI5OGQxNTMuNjgzZDEwNjUuMzQ0ZDEyNy4zNzNkMTA2NS4zNDRkMTI0LjQ1ZDEwNjUuMzQ0ZDEyMS41MjZkMTA2NC45MjZoUjNkNjY2LjkzNlI0ZDY0Ny43MjVSNWQxOS4yMVI2ZDYwMC45NTJSN2QtNDEuMzQ0UjhkNTgxLjc0MlI5ZDBSMTBkMjgzLjk4UjExaTE4OVIxMmQxOS4yMVIxM2Q2NjYuOTM2UjE0YWkxaTJpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTJpMmkyaTNpMmkzaTJpMmkzaTJpM2kyaTJpMmkyaTNpMmkyaTNpM2kyaTJpM2kzaTNpM2kxaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kxaTNpMmkzaTJpMmkzaTNoZzo3Nm9SMWQ3NDAuMDE5UjJhZDExNS4yNjJkOTY1Ljk1MWQ5OC41NTdkOTYwLjEwNGQ4My45NDFkOTU5LjI2OWQ5Ny4zMDVkOTIxLjI2NWQ5OC45NzVkODYyLjc5OWQ5OS4zOTNkODQ4LjE4MmQxMDAuMjI4ZDc2NC4yNDFkMTI2LjUzOGQ3NjQuMjQxZDkxLjg3NmQ3MjEuNjQ0ZDkxLjg3NmQ2NjcuMzUzZDkyLjcxMWQ2NTguMTY2ZDk3LjMwNWQ2MDguODg3ZDExNi4wOTdkNjA4Ljg4N2QxMTkuMDIxZDYwOC44ODdkMTIxLjk0NGQ2MDkuNzIyZDEwNS4yMzlkNTg3LjE3MWQ2NS45ODNkNTgzLjQxMmQyMy4zODZkNTYzLjM2N2QyNS40NzRkNTYyLjk0OWQyOC44MTVkNTYyLjk0OWQzOC44MzhkNTYyLjk0OWQ2Mi4yMjVkNTY2LjI5ZDY0LjMxM2Q1NjUuNDU1ZDUwLjExNGQ1NTcuNTJkMjIuOTY5ZDUzOS41NjJkMzAuMDY4ZDUzNy44OTJkMjkuMjMzZDUzNy44OTJkMTQyLjQwN2Q1NDQuMTU2ZDIwNS4wNWQ1NDQuMTU2ZDIyNy42MDFkNTQ0LjE1NmQyNjYuNDRkNTM2LjYzOWQyODEuODkyZDU0NS40MDlkMjg4Ljk5MWQ1NjQuMjAyZDI0NC4zMDZkNTcxLjcxOWQyMzcuMjA3ZDU3My44MDdkMjAwLjAzOWQ1ODMuODNkMjAyLjEyN2Q2MDAuNTM1ZDE3OS4xNThkNjM0Ljc3OWQyMTUuNDkxZDYyMy4wODZkMTk5LjIwM2Q2MzIuMjc0ZDE3Mi40NzZkNjU1LjY2ZDE3Mi40NzZkNjgxLjU1M2QxODUuODRkNjU3LjMzMWQyMDAuNDU2ZDY2OS4wMjRkMTk4Ljc4NmQ5NTYuNzYzZDIwMi4xMjdkOTcxLjM4ZDI1MS40MDZkOTY4LjAzOWQyNDguMDY1ZDk5MC41OWQyNjQuMzUyZDk4Mi4yMzhkMzE0Ljg4NGQ5NzMuNDY4ZDM3MS42OGQ5NjMuNDQ1ZDM5Mi4xNDNkOTU1LjkyOGQ0MjkuMzExZDk0Mi4xNDZkNDI5LjMxMWQ5MTguNzZkNDI5LjMxMWQ5MDkuMTU0ZDQxMy44NTlkODY3LjgxZDQ0OS43NzRkODg4LjY5MWQ0NzUuMjQ5ZDkzNS44ODJkNDc1LjI0OWQ5NjUuNTMzZDQ3NS4yNDlkOTkzLjUxM2Q0NjguOTg1ZDEwMjAuNjU5ZDQ0NC4zNDVkMTAyMi4zMjlkNDI1Ljk3ZDEwMjMuNTgyZDQwMy40MTlkMTAyMy41ODJkMzcwLjAwOWQxMDIzLjU4MmQzMDIuOTgyZDEwMTguOTg4ZDIzNS45NTRkMTAxNC4zOTRkMjAyLjU0NGQxMDE0LjM5NGQxODkuMTgxZDEwMTQuMzk0ZDE2Mi42NjJkMTAxMy41NTlkMTM2LjE0M2QxMDEyLjcyNGQxMjIuNzc5ZDEwMTIuNzI0ZDIyLjk2OWQxMDEyLjcyNGQtMjQuMjIxZDEwNjUuNzYxZC0yMy4zODZkMTAxOC45ODhkNi4yNjRkOTk4LjUyNWQyMC44OGQ5ODguNTAyZDY0LjkzOWQ5NzkuNTIzZDEwOC45OThkOTcwLjU0NGQxMTUuMjYyZDk2NS45NTFoUjNkNDgyLjc2NlI0ZDQ3NS4yNDlSNWQtMjQuMjIxUjZkNDg3LjM2UjdkLTQxLjc2MVI4ZDUxMS41ODJSOWQwUjEwZDI4My45OFIxMWk3NlIxMmQtMjQuMjIxUjEzZDQ4Mi43NjZSMTRhaTFpM2kzaTNpMmkyaTNpM2kzaTJpM2kzaTNpMmkzaTJpMmkzaTNpMmkyaTNpM2kyaTJpM2kyaTJpMmkyaTJpMmkyaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2hnOjE4OG9SMWQ3NDAuMDE5UjJhZDEzMS4xMzJkNDcwLjY1NWQxMzguNjQ5ZDQ3MS4wNzNkMTM5LjQ4NGQ0ODEuNTEzZDEzOS45MDJkNDg2LjEwN2QxMzUuMzA4ZDQ5Ni45NjVkMTI5LjQ2MWQ1MTEuMTY0ZDEyOS4wNDRkNTEzLjI1MmQxMzAuNzE0ZDUxNC4wODhkMTM5LjA2NmQ1MTJkMTMxLjU0OWQ1NzkuNjU0ZDEzMS41NDlkNjE5LjMyN2QxMzEuNTQ5ZDc0MS4yNzJkMTQ0LjA3OGQ3NDMuNzc4ZDE3MC4zODhkNzQ5LjIwN2QxODYuMjU3ZDc1Ny45NzdkMTc3LjkwNWQ3NjIuOTg4ZDE2OC43MTdkNzYyLjk4OGQ3OC45MjlkNzYyLjU3ZDEwMy41NjlkNzQ3LjUzNmQ4Ny42OTlkNzU0LjIxOGQ0Ny42MDhkNzYyLjk4OGQ0MS43NjFkNzU1LjQ3MWQ1NS4xMjVkNzQzLjM2ZDgxLjg1M2Q3MzguMzQ5ZDg5Ljc4N2Q3MjEuMjI2ZDg4LjExN2Q2ODEuOTdkODYuODY0ZDY1My45OWQ5MC4yMDVkNjQ0LjgwMmQ5NC43OTlkNjI4LjUxNWQ5My41NDZkNjI3LjY4ZDg3LjY5OWQ2MjkuNzY4ZDg1LjYxMWQ2MTcuMjM5ZDgxLjg1M2Q1OTEuNzY1ZDgyLjY4OGQ1OTAuNTEyZDk3LjMwNWQ2MDEuMzdkMTE1LjI2MmQ2MjMuNTA0ZDg3LjI4MmQ1NzUuMDZkODcuNjk5ZDU2OS42MzFkMTAxLjQ4MWQ1NzcuOTgzZDg0Ljc3NmQ1NTYuMjY3ZDg4LjExN2Q1MzcuODkyZDg4LjExN2Q1MzQuOTY5ZDg3LjY5OWQ1MTYuNTkzZDg2LjAyOWQ1MTYuNTkzZDc3LjY3NmQ1MTYuNTkzZDU0LjcwN2Q1MzUuMzg2ZDMwLjQ4NmQ1NTUuMDE0ZDE5LjYyOGQ1NTcuMTAyZDE5LjIxZDU1Ni4yNjdkMjAuNDYzZDU2MC40NDNkMjcuOThkNTUxLjI1NmQzNy41ODVkNTIwLjc2OWQ0Ni43NzNkNDkyLjM3MWQ1NS41NDNkNDg0Ljg1NGQ3Mi42NjVkNDcwLjIzOGQxMTQuNDI3ZDQ3MC4yMzhkMTIzLjYxNWQ0NzAuMjM4ZDEzMS4xMzJkNDcwLjY1NWQ2MzEuODU2ZDkyMC40M2Q2NDcuNzI1ZDk1Mi4xNjlkNjA3LjIxNmQ5NTQuMjU3ZDYwOC40NjlkOTc4LjQ3OWQ1ODguODQxZDEwMDguNTQ4ZDYwNi43OTlkOTkyLjY3OGQ2MDcuMjE2ZDEwMDIuNzAxZDYwNy4yMTZkMTAwNC43ODlkNjA1Ljk2NGQxMDM0LjAyMmQ1ODguMDA2ZDEwMjUuMjUyZDU3OS4yMzZkMTAyNS4yNTJkNTY3Ljk2ZDEwMjUuMjUyZDU1OS4xOWQxMDM0LjAyMmQ1NTkuMTlkOTU4Ljg1MWQ1MDYuMTUzZDk0My4zOTlkNTE3LjAxMWQ5NTkuNjg2ZDUwOS40OTRkOTYwLjkzOWQ0OTAuNzAxZDk1OS42ODZkNDYxLjQ2OGQ5NTcuNTk4ZDQ0Ni44NTFkOTU2LjM0NWQ0MzguNDk5ZDk4My40OTFkNDI3LjY0MWQ5NjMuODYyZDQyNy42NDFkOTU1LjUxZDQyNy42NDFkOTUwLjA4MWQ0MzMuNDg3ZDk0Mi41NjRkNTA3LjQwNmQ4NDYuOTI5ZDU2Ny45NmQ3MzYuMjYxZDU5Mi42ZDczNS4wMDhkNjA4LjQ2OWQ3MzUuODQzZDYwOC44ODdkNzM4LjM0OWQ2MDguMDUyZDc1NS4wNTNkNTg1LjkxOGQ3NTYuMzA2ZDYxMS44MWQ3NjcuMTY0ZDYwNy42MzRkNzc2Ljc2OWQ2MDYuNzk5ZDgwMC41NzRkNjA2LjM4MWQ4MjIuNzA3ZDU5NC42ODhkODM0LjgxOGQ2MDcuNjM0ZDgzNC44MThkNjAxLjc4N2Q4NDguMTgyZDYwOS43MjJkODQ5LjAxN2Q2MDcuMjE2ZDg4Mi44NDVkNjA3LjIxNmQ5MjEuMjY1ZDYxOC4wNzVkOTIxLjY4M2Q2MzEuODU2ZDkyMC40M2Q1NTkuMTlkOTIwLjg0OGQ1NjcuNTQzZDg1MC42ODhkNTcwLjQ2NmQ3ODUuOTU3ZDU1MS42NzNkODE4LjExNGQ1MzEuMjFkODUxLjEwNmQ1MjguMjg3ZDg1NS42OTlkNDk0LjQ2ZDkwOS41NzJkNDc1LjI0OWQ5MjIuNTE4ZDQ3OS44NDNkOTI1Ljg1OWQ1NDQuNTc0ZDkyMC40M2Q1NTkuMTlkOTIwLjg0OGQxMjkuNDYxZDEwNzguMjlkMjk1LjI1NmQ3NTIuOTY1ZDQyOS4zMTFkNDM2LjQxMWQ0MzMuOTA1ZDQ2MS40NjhkNDgxLjA5NmQ0NDEuMDA0ZDQ4Mi43NjZkNDQxLjQyMmQxOTQuMTkyZDEwNzguMjlkMTg5LjE4MWQxMDU5LjA3OWQxNjEuMmQxMDc4LjcwN2QxMzUuMzA4ZDEwNzguNzA3ZDEzMi4zODRkMTA3OC43MDdkMTI5LjQ2MWQxMDc4LjI5aFIzZDY2Ni45MzZSNGQ2NDcuNzI1UjVkMTkuMjFSNmQ1ODcuNTg4UjdkLTU0LjcwN1I4ZDU2OC4zNzhSOWQwUjEwZDI4My45OFIxMWkxODhSMTJkMTkuMjFSMTNkNjY2LjkzNlIxNGFpMWkyaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kyaTJpMmkzaTJpM2kyaTJpM2kyaTNpMmkyaTJpMmkzaTJpMmkzaTNpMmkyaTNpM2kzaTNpMWkyaTJpMmkyaTJpMmkzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kyaTJpMmkyaTJpMmkzaTNpMmkyaTJpM2kzaTFpM2kzaTJpM2kyaTNpMWkzaTJpM2kyaTJpM2kzaGc6NzVvUjFkNzQwLjAxOVIyYWQyMC4wNDVkOTk4Ljk0MmQ1My40NTVkOTg0LjMyNmQ4Ni44NjRkOTcwLjEyN2Q5OC41NTdkOTYwLjUyMmQ5OC41NTdkOTAxLjIyZDEwOC45OThkODg3LjQzOGQxMjYuNTM4ZDg1Ny43ODdkMTI1LjcwM2Q4NTYuNTM1ZDExMS41MDRkODYyLjM4MWQ5Ny4zMDVkODc0LjQ5MmQ5Ny4zMDVkODY1LjMwNWQ5Ny4zMDVkNzAwLjc2M2Q5OC45NzVkNjgzLjIyM2QxMjMuNjE1ZDcwMS41OThkOTguNTU3ZDY2Ni4xMDFkOTguNTU3ZDY0OC4xNDNkOTguNTU3ZDYwOC40NjlkOTIuNzExZDU4OS42NzZkNzEuNDEyZDU3NC4yMjVkMjEuNzE2ZDU3MS4zMDFkMTEuNjkzZDU1My43NjFkMTMuMzYzZDU1Mi45MjZkMjUuMDU3ZDU0NC45OTFkMzUuNDk3ZDUzNy44OTJkMzcuMTY4ZDUzNy44OTJkNzcuNjc2ZDUzNy44OTJkODkuMzdkNTQwLjM5OGQxMTAuNjY4ZDU0NC45OTFkMTMzLjIyZDU2Ni43MDdkMTQ4LjY3MmQ1NjUuNDU1ZDE4NS4wMDRkNTUwLjAwM2QyMTkuNjY3ZDUzNS4zODZkMjM4LjQ2ZDUzNS4zODZkMjU3LjY3ZDUzNS4zODZkMjc4LjEzM2Q1NTUuMDE0ZDI3Mi4yODdkNTY0LjYxOWQyMzguODc3ZDU3Mi41NTRkMjAyLjk2MmQ1ODMuNDEyZDIwMS43MDlkNTg0LjY2NWQyMDUuODg1ZDYxMy4wNjNkMjAzLjc5N2Q2MTcuNjU3ZDE3NS44MTdkNjE3LjY1N2QxNzUuMzk5ZDYxOC4wNzVkMTkyLjEwNGQ2MzYuMDMyZDE5NS40NDVkNjQyLjcxNGQxOTkuNjIxZDY1MS40ODRkMTk5LjYyMWQ2NzIuMzY1ZDE5OS42MjFkNjc2LjEyM2QxNzUuODE3ZDczMi41MDJkMjAzLjc5N2Q3MDYuMTkyZDE5OC4zNjhkNzU1Ljg4OWQxOTguNzg2ZDc2MS4zMThkMjIwLjkyZDc0MS42OWQyOTkuODQ5ZDY2NC40M2QzODQuMjA4ZDU4MS43NDJkMzg2LjI5NmQ1NzYuNzNkMzYwLjQwNGQ1NzcuMTQ4ZDMwOS4wMzdkNTY2LjcwN2QzMDUuNjk2ZDU1My43NjFkMzA4LjIwMmQ1NDQuNTc0ZDMyNC4wNzFkNTM4LjcyN2QzNzYuMjc0ZDU1Ny4xMDJkMzYwLjgyMmQ1NDguMzMyZDM1Mi40NjlkNTQyLjA2OGQzNTQuOTc1ZDU0MS4yMzNkMzc5LjE5N2Q1NDEuMjMzZDQyNy4yMjNkNTQ0Ljc4M2Q0NzUuMjQ5ZDU0OC4zMzJkNDk5LjQ3MWQ1NDguMzMyZDUyMi4wMjJkNTY3LjEyNWQ0NDQuMzQ1ZDU4MS43NDJkMzg3LjEzMmQ2MjkuNzY4ZDM2NC4xNjNkNjQ4Ljk3OGQyODMuOThkNzM5LjE4NGQyOTkuNDMyZDc0Ny4xMTlkMzA3LjM2N2Q3ODUuMTIyZDMwOS44NzJkNzc1LjkzNGQzMTYuMTM3ZDc3MC41MDVkMzE5Ljg5NWQ3NzEuMzRkMzg1Ljg3OWQ4NTAuMjdkNDQ5LjM1N2Q5MjYuNjk0ZDQ2Mi4zMDNkOTQzLjgxN2Q0NjEuNDY4ZDk0NC4yMzRkNDMzLjkwNWQ5MzkuNjQxZDQzNS45OTNkOTQxLjMxMWQ0OTEuNTM2ZDk3My4wNWQ1MjMuMjc1ZDk5Mi4yNjFkNTQyLjQ4NmQxMDEwLjIxOGQ1MjcuMDM0ZDEwMjEuOTExZDUwOC42NTlkMTAyMS40OTRkNDc2LjUwMmQxMDEyLjMwNmQ0NDIuMjU3ZDEwMDIuNzAxZDQyNi4zODhkMTAwMS40NDhkNDMwLjU2NGQxMDA0LjM3MWQ0NTAuMTkyZDEwMjAuMjQxZDQyNS41NTNkMTAxNi45ZDM4Ny41NDlkMTAxOS40MDZkMzQzLjY5OWQxMDIyLjMyOWQzMjUuNzQyZDEwMjEuNDk0ZDMxNi41NTRkMTAyMS4wNzZkMzAyLjM1NWQxMDA4Ljk2NWQzMTEuMTI1ZDEwMDEuNDQ4ZDMzMC43NTNkOTk0Ljc2NmQzNTIuMDUyZDk4Ny42NjdkMzU5LjE1MWQ5ODIuNjU1ZDM1NC45NzVkOTcxLjM4ZDM0NS43ODdkOTQ4LjgyOGQzMDEuNTJkODgwLjc1NmQxOTkuMjAzZDc4My4wMzRkMTkzLjc3NGQ4MTEuODQ5ZDE4NS44NGQ4NzAuNzM0ZDE5OC4zNjhkODgzLjY4ZDE5OC43ODZkOTAxLjIyZDE5OC43ODZkOTA5Ljk5ZDE5OS42MjFkOTM1LjQ2NGQyMDEuMjkyZDk3Mi4yMTVkMjA4LjgwOWQ5ODAuNTY3ZDIzMy4wM2Q5OTEuMDA4ZDI1OS43NThkMTAwMi43MDFkMjY4LjExZDEwMTAuMjE4ZDI2MS44NDZkMTAxNC4zOTRkMjU1LjU4MmQxMDIwLjY1OWQyMjguODU0ZDEwMjEuNDk0ZDE4Ny4wOTJkMTAyMi43NDdkMTAxLjg5OGQxMDAwLjYxM2QxMDEuNDgxZDEwMDEuMDNkMTIxLjUyNmQxMDE4Ljk4OGQ1My4wMzdkMTAxOC41N2QyMC40NjNkMTAxOS40MDZkMjAuMDQ1ZDk5OC45NDJoUjNkNTE0LjkyM1I0ZDU0Mi40ODZSNWQxMS42OTNSNmQ0ODguNjEzUjdkMS4yNTJSOGQ0NzYuOTJSOWQwUjEwZDI4My45OFIxMWk3NVIxMmQxMS42OTNSMTNkNTE0LjkyM1IxNGFpMWkzaTNpM2kyaTNpMmkzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkyaTNpM2kzaTJpMmkyaTNpM2kzaTJpMmkyaTJpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTJpMmkyaTJpM2kyaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kyaTJpM2kyaGc6MTg3b1IxZDc0MC4wMTlSMmFkMTY1LjM3NmQxMDA1LjIwN2QxOTAuNDMzZDk3Ni44MDlkMjQzLjg4OWQ5MjUuODU5ZDI0NS45NzdkOTEzLjMzMWQyNTQuNzQ3ZDg5Mi44NjdkMjU5LjM0ZDg5Ni4yMDhkMjY5LjM2M2Q5MDEuNjM3ZDI3Mi4yODdkODk1Ljc5MWQyNzguMTMzZDg4NC41MTVkMjkxLjA3OWQ4ODMuNjhkMzI0LjkwN2Q4NjYuNTU3ZDM2My43NDVkODQ2LjkyOWQzNzYuNjkxZDg0My4xNzFkMzc2LjY5MWQ4MzYuMDcxZDI0NC43MjRkNzgzLjg2OWQxNjUuMzc2ZDY4OS45MDVkMTY1LjM3NmQ3NDUuNDQ4ZDE2NS4zNzZkNzYwLjQ4MmQxODcuOTI4ZDc4OC4wNDVkMTkwLjg1MWQ3ODguODhkMTk3LjUzM2Q3ODUuNTM5ZDIxMC44OTdkNzgwLjExZDIxMy40MDJkNzgxLjM2M2QyMTEuMzE0ZDc4OC40NjNkMjExLjMxNGQ3OTkuNzM4ZDIxMS4zMTRkODAzLjA3OWQyMjguODU0ZDgwNC43NWQyNTAuNTdkODA4LjkyNmQyMzguODc3ZDgxMS40MzJkMjI5LjY5ZDgxNi4wMjZkMjM3LjIwN2Q4MjAuNjE5ZDI3My41MzlkODQxLjA4M2QyMTYuMzI2ZDg3Ni45OThkMTY1LjM3NmQ5NTEuNzUyZDE2NS4zNzZkMTAwNS4yMDdkMTkuMjFkMTAwNS4yMDdkNDQuMjY3ZDk3Ni44MDlkOTcuNzIyZDkyNS44NTlkOTkuODFkOTEzLjMzMWQxMDguNThkODkyLjg2N2QxMTMuMTc0ZDg5Ni4yMDhkMTIzLjE5N2Q5MDEuNjM3ZDEyNi4xMmQ4OTUuNzkxZDEzMS45NjdkODg0LjUxNWQxNDQuOTEzZDg4My42OGQxNzguNzRkODY2LjU1N2QyMTcuNTc5ZDg0Ni45MjlkMjMwLjUyNWQ4NDMuMTcxZDIzMC41MjVkODM2LjA3MWQ5OC41NTdkNzgzLjg2OWQxOS4yMWQ2ODkuOTA1ZDE5LjIxZDc0NS40NDhkMTkuMjFkNzYwLjQ4MmQ0MS43NjFkNzg4LjA0NWQ0NC42ODVkNzg4Ljg4ZDUxLjM2N2Q3ODUuNTM5ZDY0LjczZDc4MC4xMWQ2Ny4yMzZkNzgxLjM2M2Q2NS4xNDhkNzg4LjQ2M2Q2NS4xNDhkNzk5LjczOGQ2NS4xNDhkODAzLjA3OWQ4Mi42ODhkODA0Ljc1ZDEwNC40MDRkODA4LjkyNmQ5Mi43MTFkODExLjQzMmQ4My41MjNkODE2LjAyNmQ5MS4wNGQ4MjAuNjE5ZDEyNy4zNzNkODQxLjA4M2Q3MC4xNTlkODc2Ljk5OGQxOS4yMWQ5NTEuNzUyZDE5LjIxZDEwMDUuMjA3aFIzZDM5NS45MDJSNGQzNzYuNjkxUjVkMTkuMjFSNmQzMzQuMDk0UjdkMTguNzkyUjhkMzE0Ljg4NFI5ZDBSMTBkMjgzLjk4UjExaTE4N1IxMmQxOS4yMVIxM2QzOTUuOTAyUjE0YWkxaTNpM2kzaTNpM2kzaTJpM2kyaTNpMmkzaTJpM2kyaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTJpM2kyaTNpMmkzaTJpM2kyaTNpM2kzaTNpMmhnOjc0b1IxZDc0MC4wMTlSMmFkOTguOTc1ZDEwMTguNTdkMTI5Ljg3OWQ5OTEuMDA4ZDk4Ljk3NWQ5NzMuMDVkOTguMTRkODMzLjk4M2QxMzguMjMxZDg1Ny4zN2QxMjMuNjE1ZDgyNi4wNDhkOTYuNDY5ZDc4Ny42MjhkMTAxLjA2M2Q2ODkuMDdkOTIuNzExZDU2NC42MTlkNTAuMTE0ZDU1OC43NzNkNDUuMTAyZDU1Ny4xMDJkMjIuMTMzZDU0OS4xNjhkMTUuMDM0ZDUyNC41MjhkNjguOTA3ZDUxNC41MDVkMjc4LjEzM2Q1NzEuMzAxZDI2MS44NDZkNTgyLjk5NWQxOTYuNjk4ZDU5MC4wOTRkMTk2LjI4ZDYwNi4zODFkMTk3LjExNWQ2MzMuNTI2ZDE5OC4zNjhkNjc2Ljk1OWQxOTkuNjIxZDcxOC4zMDNkMTczLjcyOWQ3NzMuNDI5ZDE5OC43ODZkNzg4Ljg4ZDIwMC4wMzlkODI2Ljg4NGQxOTYuMjhkODM2LjQ4OWQxNzMuMzExZDg4Ny4wMjFkMTc4Ljc0ZDg5Mi40NWQxODguMzQ1ZDg4NS43NjhkMjAxLjcwOWQ4NzEuOTg2ZDIwMy43OTdkODc4LjI1MWQyMDMuNzk3ZDEwMzIuMzUyZDE4MS4yNDZkMTA5NC41NzdkMTQxLjk5ZDEyMDIuNzRkMjAuMDQ1ZDEyMDIuNzRkLTE4Ljc5MmQxMjAyLjc0ZC01NC43MDdkMTE4OS4zNzZkLTEwMS44OThkMTE3MS44MzZkLTEwMS44OThkMTE0MC4wOTdkLTEwMS44OThkMTEwNS4wMTdkLTU3LjYzMWQxMDg3LjA2ZC01MC45NDlkMTA4NC41NTRkMTUuNDUxZDEwNjguMjY3ZC0yLjUwNWQxMDg2LjY0MmQtMzMuNDA5ZDExMjYuNzM0ZC0zNC4yNDRkMTEzOC40MjdkLTE2LjcwNGQxMTUwLjEyZC0wLjgzNWQxMTYwLjk3OGQxMS42OTNkMTE2MC45NzhkNTguODg0ZDExNjAuOTc4ZDc5LjM0N2QxMTQ1LjEwOWQxMDIuNzM0ZDExMjYuNzM0ZDEwMi4zMTZkMTA4MC43OTZkMTAyLjMxNmQxMDc2LjIwMmQ5OC45NzVkMTAxOC41N2hSM2QyODUuMjMzUjRkMjc4LjEzM1I1ZC0xMDEuODk4UjZkNTA5LjQ5NFI3ZC0xNzguNzRSOGQ2MTEuMzkzUjlkMFIxMGQyODMuOThSMTFpNzRSMTJkLTEwMS44OThSMTNkMjg1LjIzM1IxNGFpMWkyaTJpMmkyaTNpMmkyaTNpM2kyaTJpMmkyaTNpMmkzaTJpMmkzaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTg2b1IxZDc0MC4wMTlSMmFkMjQyLjYzNmQ1NzIuNTU0ZDI0Mi42MzZkNjM0Ljc3OWQyMTguODMxZDY2MS45MjRkMTkyLjkzOWQ2OTAuNzRkMTMxLjU0OWQ2OTAuNzRkOTAuNjIzZDY5MC43NGQ1OC40NjZkNjczLjYxOGQxOC43OTJkNjUyLjczN2QxOC43OTJkNjE1Ljk4NmQxOC43OTJkNjA4Ljg4N2QxOS44MzZkNTk0LjI3ZDIwLjg4ZDU3OS42NTRkMjAuODhkNTcyLjU1NGQyMC44OGQ1NDYuNjYyZDIwLjg4ZDUyOS4xMjJkMjAuMDQ1ZDUzMy43MTZkMjIuOTY5ZDUwMS41NTlkNjIuNjQyZDQ4NC4wMTlkOTQuMzgxZDQ2OS44MmQxMzAuNzE0ZDQ2OS44MmQyNDIuNjM2ZDQ2OS44MmQyNDIuNjM2ZDU3Mi41NTRkNzYuODQxZDU4OC4wMDZkNzYuODQxZDYwNS4xMjhkODIuNjg4ZDYyOS4zNWQ5MC4yMDVkNjYwLjY3MmQxMDEuODk4ZDY2MC42NzJkMTA0LjQwNGQ2NTguMTY2ZDExNy4zNWQ2MzYuODY3ZDEyOC4yMDhkNjE4LjkxZDEzMy42MzdkNjE4LjkxZDE0MS41NzJkNjE4LjkxZDE0OS45MjRkNjM1LjE5N2QxNTIuODQ4ZDY0MC42MjZkMTYyLjAzNWQ2NTguNTg0ZDE3MS4yMjNkNjUxLjkwMmQxNzcuNDg3ZDYxNy4yMzlkMTgyLjA4MWQ1OTEuNzY1ZDE4Mi4wODFkNTcwLjg4NGQxODIuMDgxZDUxMy4yNTJkMTYzLjI4OGQ1MDYuMTUzZDE2MS42MThkNTA4LjI0MWQxNDYuNTg0ZDUzMy43MTZkMTM0LjQ3M2Q1NTQuMTc5ZDEyNy43OTFkNTU0LjE3OWQxMjMuMTk3ZDU1NC4xNzlkMTEyLjc1NmQ1MzEuMjFkMTAwLjIyOGQ1MDMuNjQ3ZDk4Ljk3NWQ1MDEuOTc3ZDk3LjMwNWQ1MDIuMzk0ZDc2Ljg0MWQ1MTQuNTA1ZDc2Ljg0MWQ1ODguMDA2aFIzZDI2MS44NDZSNGQyNDIuNjM2UjVkMTguNzkyUjZkNTU0LjE3OVI3ZDMzMy4yNTlSOGQ1MzUuMzg2UjlkMFIxMGQyODMuOThSMTFpMTg2UjEyZDE4Ljc5MlIxM2QyNjEuODQ2UjE0YWkxaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaGc6NzNvUjFkNzQwLjAxOVIyYWQyMy44MDRkMTAxMi4zMDZkMzkuNjczZDEwMDIuMjgzZDkxLjA0ZDk3Ni4zOTFkOTcuMzA1ZDk2NS4xMTVkOTguOTc1ZDkzOC44MDVkOTkuODFkOTIxLjI2NWQ5OC45NzVkODg5LjEwOWQ5Ny43MjJkODQ4LjE4MmQxMzkuMDY2ZDg4Mi4wMDlkOTguMTRkODE2LjAyNmQ5OS4zOTNkNzQ3LjExOWQxMDAuNjQ2ZDc0MC44NTRkMTA2LjkxZDcxMC4zNjhkMTQwLjMxOWQ2ODQuMDU4ZDEwMS4wNjNkNjk4LjI1N2QxMDEuMDYzZDY0Ny43MjVkOTguNTU3ZDU3NC4yMjVkOTMuMTI4ZDU2NC42MTlkODIuNjg4ZDU1Ni42ODVkNjkuNzQyZDU2MS4yNzhkNTUuOTZkNTU3LjEwMmQ0Ni43NzNkNTQ1LjQwOWQxNy41MzlkNTQzLjczOGQzMC40ODZkNTI5LjEyMmQxMzguNjQ5ZDU0Mi40ODZkMTQ3LjQxOWQ1NTIuNTA4ZDE2NS43OTRkNTcxLjMwMWQxNjguM2Q1NjcuMTI1ZDE2Ni42MjlkNTUyLjA5MWQxNjIuODcxZDU0My4zMjFkMjQ4LjlkNTU0LjE3OWQyNjcuMjc1ZDU1Mi45MjZkMjY3LjY5M2Q1NjQuNjE5ZDI2NS4xODdkNTY1Ljg3MmQyMjcuNjAxZDU3NC4yMjVkMjI1LjUxM2Q1NzUuMDZkMjQ2LjM5NGQ1ODQuMjQ3ZDI0My44ODlkNTg1LjVkMjI0LjY3OGQ1ODEuNzQyZDIyMS43NTVkNTgxLjc0MmQyMTIuNTY3ZDU4MS43NDJkMjAxLjcwOWQ1ODUuNWQxOTIuMTA0ZDYwNS45NjRkMTg3LjUxZDYyNC4zMzlkMTkyLjUyMmQ2MzUuNjE1ZDIwMC40NTZkNjM5LjM3M2QxOTkuNjIxZDg0OS40MzVkMTc0Ljk4MmQ4NjkuMDYzZDE5OC43ODZkODgzLjY4ZDE5OS4yMDNkOTU4LjAxNmQxNzYuNjUyZDk4Mi4yMzhkMTk2LjY5OGQ5NzkuMzE0ZDIwNS40NjhkOTc4LjA2MWQyMTkuMjQ5ZDk4MS44MmQyMzcuNjI0ZDk4Ni44MzFkMjQxLjhkOTg3LjI0OWQyNDYuMzk0ZDk5MS44NDNkMjg0LjgxNWQxMDIyLjMyOWQyNDQuMzA2ZDEwMjIuMzI5ZDIyMS4zMzdkMTAyMi4zMjlkMTc2LjQ0M2QxMDExLjg4OWQxMzEuNTQ5ZDEwMDEuNDQ4ZDEwOC41OGQxMDAxLjQ0OGQxMDEuMDYzZDEwMDEuNDQ4ZDk0Ljc5OWQxMDAyLjI4M2QxMDAuMjI4ZDEwMTUuNjQ3ZDk2LjA1MmQxMDIwLjY1OWQ3My41ZDEwMjYuNTA1ZDcwLjk5NWQxMDI2LjkyM2Q2NC43M2QxMDI2LjkyM2Q0OC4wMjZkMTAyMC42NTlkMjguODE1ZDEwMTMuMTQxZDIzLjgwNGQxMDEyLjMwNmhSM2QzMDEuMTAyUjRkMjg0LjgxNVI1ZDE3LjUzOVI2ZDQ5NC44NzdSN2QtMi45MjNSOGQ0NzcuMzM3UjlkMFIxMGQyODMuOThSMTFpNzNSMTJkMTcuNTM5UjEzZDMwMS4xMDJSMTRhaTFpM2kzaTNpMmkyaTJpM2kzaTJpM2kzaTJpM2kyaTJpMmkzaTJpM2kzaTJpM2kyaTJpMmkzaTNpM2kzaTJpMmkyaTJpMmkyaTNpM2kzaTJpM2kzaTNpMmkyaTNpM2kzaGc6MTg1b1IxZDc0MC4wMTlSMmFkMTMxLjEzMmQ0NzAuNjU1ZDEzOC42NDlkNDcxLjA3M2QxMzkuNDg0ZDQ4MS41MTNkMTM5LjkwMmQ0ODYuMTA3ZDEzNS4zMDhkNDk2Ljk2NWQxMjkuNDYxZDUxMS4xNjRkMTI5LjA0NGQ1MTMuMjUyZDEzMC43MTRkNTE0LjA4OGQxMzkuMDY2ZDUxMmQxMzEuNTQ5ZDU3OC44MThkMTMxLjU0OWQ2MTkuMzI3ZDEzMS41NDlkNzQxLjI3MmQxNDQuMDc4ZDc0My43NzhkMTcwLjM4OGQ3NDkuMjA3ZDE4Ni4yNTdkNzU3Ljk3N2QxNzcuOTA1ZDc2Mi45ODhkMTY4LjcxN2Q3NjIuOTg4ZDc4LjkyOWQ3NjIuNTdkMTAzLjU2OWQ3NDcuNTM2ZDg3LjY5OWQ3NTQuMjE4ZDQ3LjYwOGQ3NjIuOTg4ZDQxLjc2MWQ3NTUuNDcxZDU1LjEyNWQ3NDMuMzZkODEuODUzZDczOC4zNDlkODkuNzg3ZDcyMS4yMjZkODguMTE3ZDY4MS45N2Q4Ni44NjRkNjUzLjk5ZDkwLjIwNWQ2NDQuODAyZDk0Ljc5OWQ2MjguNTE1ZDkzLjU0NmQ2MjcuNjhkODcuNjk5ZDYyOS43NjhkODUuNjExZDYxNy4yMzlkODEuODUzZDU5MS43NjVkODIuNjg4ZDU5MC41MTJkOTcuMzA1ZDYwMS4zN2QxMTUuMjYyZDYyMy41MDRkODcuMjgyZDU3NS4wNmQ4Ny42OTlkNTY5LjYzMWQxMDEuNDgxZDU3Ny45ODNkODQuNzc2ZDU1Ni4yNjdkODguMTE3ZDUzNy44OTJkODguMTE3ZDUzNC45NjlkODcuNjk5ZDUxNi41OTNkODYuMDI5ZDUxNi41OTNkNzcuNjc2ZDUxNi41OTNkNTQuNzA3ZDUzNS4zODZkMzAuNDg2ZDU1NS4wMTRkMTkuNjI4ZDU1Ny4xMDJkMTkuMjFkNTU1Ljg0OWQyMC40NjNkNTYwLjQ0M2QyNy45OGQ1NTEuMjU2ZDM3LjU4NWQ1MjAuNzY5ZDQ2Ljc3M2Q0OTIuMzcxZDU1LjU0M2Q0ODQuODU0ZDcyLjY2NWQ0NzAuMjM4ZDExNC40MjdkNDcwLjIzOGQxMjMuNjE1ZDQ3MC4yMzhkMTMxLjEzMmQ0NzAuNjU1aFIzZDIwNS40NjhSNGQxODYuMjU3UjVkMTkuMjFSNmQ1NTMuNzYxUjdkMjYxLjAxMVI4ZDUzNC41NTFSOWQwUjEwZDI4My45OFIxMWkxODVSMTJkMTkuMjFSMTNkMjA1LjQ2OFIxNGFpMWkyaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kyaTJpMmkzaTJpM2kyaTJpM2kyaTNpMmkyaTJpMmkzaTJpMmkzaTNpMmkyaTNpM2kzaTNoZzo3Mm9SMWQ3NDAuMDE5UjJhZDIzLjgwNGQxMDIwLjI0MWQxNS40NTFkMTAxNi45ZDEwLjg1OGQxMDA4LjEzZDM4LjAwM2Q5OTguMTA3ZDkyLjcxMWQ5NzkuNzMyZDkyLjcxMWQ4OTkuNTQ5ZDkyLjcxMWQ4MzYuMDcxZDEwMS44OThkODI1LjYzMWQxMDguNThkODI3LjMwMWQxMDguNThkODI1LjIxM2Q4OS43ODdkNzYyLjE1M2Q4OS43ODdkNzQxLjY5ZDg5Ljc4N2Q3MzAuNDE0ZDk3LjcyMmQ3MjYuNjU1ZDEzMy42MzdkNzM0LjU5ZDk3LjcyMmQ2ODQuODkzZDk3LjcyMmQ2MzEuNDM4ZDk3LjcyMmQ1OTQuNjg4ZDkxLjA0ZDU3Ny4xNDhkNjkuMzI0ZDU3My4zODlkMjUuNDc0ZDU2Ni4yOWQyNC42MzlkNTUyLjUwOGQyNi43MjdkNTQwLjM5OGQ2NS45ODNkNTM4LjMwOWQ3OC41MTJkNTM3LjQ3NGQ5OS44MWQ1NDAuMzk4ZDEyNC44NjdkNTQzLjMyMWQxMzMuMjJkNTQzLjczOGQxNDcuMDAxZDU1My43NjFkMTY5Ljk3ZDU2NC4yMDJkMTcyLjg5M2Q1NjAuODYxZDE3MS4yMjNkNTUwLjgzOGQxNzEuNjQxZDU0NC41NzRkMTc0Ljk4MmQ1NDQuMTU2ZDIxMC4wNjFkNTQwLjgxNWQyMzYuMzcxZDUzOC4zMDlkMjQ4LjQ4MmQ1MzkuMTQ1ZDI3MS40NTFkNTQwLjgxNWQyNzEuODY5ZDU1MS42NzNkMjcwLjE5OWQ1NjYuMjlkMjA1LjA1ZDU3Ni43M2QxOTYuNjk4ZDU4Ny41ODhkMTk4LjM2OGQ2MDcuMjE2ZDE3My43MjlkNjM4LjUzOGQxOTcuMTE1ZDYzNi4wMzJkMTk1Ljg2MmQ2NTkuODM2ZDE5NS44NjJkNjc2LjEyM2QxOTUuODYyZDY5NC40OTlkMTk3LjUzM2Q3MDMuMjY5ZDE4Mi40OTlkNzI3LjQ5MWQxODUuODRkNzI5LjE2MWQxOTUuNDQ1ZDcyNy4wNzNkMTk2LjI4ZDcyNy40OTFkMTk3LjUzM2Q3NTMuOGQyMTkuMjQ5ZDc1OC44MTJkMjUyLjI0MWQ3NjAuMDY1ZDI3Mi43MDRkNzYwLjlkMzA4LjQxMWQ3NTkuMjNkMzQ0LjExN2Q3NTcuNTU5ZDM2My4zMjdkNzU3LjU1OWQ0MTYuNzgzZDc1Ny41NTlkNDU1LjIwM2Q3NTIuOTY1ZDQ1MS4wMjdkNzA4LjI4ZDQ1MS4wMjdkNjg5LjkwNWQ0NzAuMjM4ZDY3NC44NzFkNDUyLjI4ZDYxMS44MWQ0NTIuMjhkNTg1LjA4M2Q0MjMuODgyZDU3NC42NDJkMzY5LjE3NGQ1NDkuNTg1ZDM4NC42MjZkNTM4LjcyN2QzOTQuNjQ5ZDUzOC4zMDlkNDEzLjg1OWQ1MzcuNDc0ZDQ2My45NzNkNTM5LjE0NWQ1MjcuNDUxZDU0MS4yMzNkNTYyLjExNGQ1NDEuMjMzZDU0Ny40OTdkNTYzLjM2N2Q1NDguNzVkNTY0LjIwMmQ1NTAuNDJkNTYzLjc4NGQ1NzQuNjQyZDU1MS4yNTZkNTkxLjc2NWQ1NDIuNDg2ZDU5OS42OTlkNTQyLjQ4NmQ1OTkuMjgyZDU0Mi40ODZkNjQzLjEzMmQ1NTcuMTAyZDYxNS4xNTFkNTY1Ljg3MmQ1NjAuNDQzZDU4NC4yNDdkNTYwLjQ0M2Q1ODguMDA2ZDUzNy44OTJkNjIyLjI1MWQ1NTguNzczZDYwNy42MzRkNTU3LjUyZDYyNC4zMzlkNTM0LjEzM2Q2NTguMTY2ZDU0NC4xNTZkNjQ4LjU2MWQ1NTUuODQ5ZDY0My45NjdkNTU3LjkzOGQ2NDQuODAyZDU1Ny45MzhkNjUxLjkwMmQ1NTcuOTM4ZDczMy4zMzdkNTQxLjIzM2Q4NDcuMzQ3ZDU0Mi4wNjhkODQ5LjAxN2Q1NDYuNjYyZDg0NS42NzZkNTcwLjQ2NmQ4MjUuMjEzZDU1OC43NzNkOTAxLjYzN2Q1NTguNzczZDk3NS4xMzhkNTgxLjc0MmQ5NzkuMzE0ZDYyNi4wMDlkOTkzLjkzMWQ2MzAuMTg1ZDEwMTEuODg5ZDYwOS43MjJkMTAyMC4yNDFkNDcwLjY1NWQxMDE0LjgxMmQ0NDcuMjY5ZDEwMTcuNzM1ZDQxMC41MThkMTAxNy43MzVkMzk1LjkwMmQxMDE3LjczNWQzNzkuMTk3ZDEwMTcuMzE4ZDM4NS4wNDRkMTAwMi4yODNkNDA5LjY4M2Q5ODYuNDE0ZDQyMy44ODJkOTg1LjE2MWQ0NTEuNDQ1ZDk3OC40NzlkNDU2Ljg3NGQ5MjkuMmQ0NTYuMDM5ZDg5Ny4wNDRkNDUzLjk1MWQ4MTguNTMxZDQzOS4zMzRkODE3LjI3OGQyNDUuOTc3ZDgxNC4zNTVkMjQ2LjgxMmQ4MTQuNzczZDIzMC4xMDdkODE0LjM1NWQxOTcuNTMzZDgxNy42OTZkMTk1Ljg2MmQ4NTAuMjdkMTkxLjY4NmQ5MzEuMjg4ZDE5Ny45NTFkOTc5LjMxNGQyMjAuNTAyZDk4NC4zMjZkMjU1LjU4MmQ5OTUuNjAxZDI2Mi42ODFkMTAwOC41NDhkMjcxLjAzNGQxMDE3LjMxOGQyNTAuMTUzZDEwMjEuNDk0ZDIzMi42MTNkMTAyMC42NTlkMTIxLjk0NGQxMDE1LjY0N2QxMjUuNzAzZDEwMDguMTNkMTM0LjQ3M2Q5OTQuMzQ5ZDk4Ljk3NWQxMDE0LjM5NGQ4MS44NTNkMTAxOC4xNTNkNzIuMjQ3ZDEwMjAuMjQxZDIzLjgwNGQxMDIwLjI0MWhSM2Q2NTcuMzMxUjRkNjQzLjEzMlI1ZDEwLjg1OFI2ZDQ4Ni41MjVSN2QyLjUwNVI4ZDQ3NS42NjdSOWQwUjEwZDI4My45OFIxMWk3MlIxMmQxMC44NThSMTNkNjU3LjMzMVIxNGFpMWkzaTNpMmkzaTJpMmkzaTNpMmkyaTJpM2kzaTJpMmkyaTNpM2kzaTJpMmkyaTNpM2kyaTJpMmkyaTJpMmkyaTJpM2kzaTJpMmkyaTJpMmkzaTNpM2kzaTJpM2kzaTNpMmkyaTNpM2kyaTJpM2kzaTNpM2kzaTJpMmkyaTNpM2kzaTJpM2kyaTJpM2kyaTJpMmkzaTNpM2kzaTNpMmkzaTJpM2kyaTNpM2kzaTNpMmkzaTNpM2hnOjE4NG9SMWQ3NDAuMDE5UjJhZDE0Ni41ODRkMTAwOS4zODNkMjA1LjQ2OGQxMDEwLjYzNmQxNzQuNTY0ZDEwNDMuNjI4ZDEzNS43MjVkMTA4OS41NjZkMTM3LjgxNGQxMDk0Ljk5NWQxODUuODRkMTA5OS41ODhkMjMxLjM2ZDExMDQuMTgyZDIzMS4zNmQxMTI4LjgyMmQyMzEuMzZkMTE3My4wODlkMTkyLjEwNGQxMTk5LjM5OWQxNTguMjc3ZDEyMjIuMzY4ZDExMS41MDRkMTIyMi4zNjhkMTkuMjFkMTIyMi4zNjhkMTkuMjFkMTE4OC4xMjNkMTkuMjFkMTE2Ny4yNDNkNDQuNjg1ZDExNTQuNzE0ZDY1Ljk4M2QxMTQ0LjI3NGQ4OC45NTJkMTE0NS45NDRkOTUuMjE2ZDExNDYuMzYyZDk1LjYzNGQxMTQ2LjM2MmQ5Ni4wNTJkMTE0Ni43NzlkOTQuMzgxZDExNDcuMTk3ZDU4Ljg4NGQxMTU1Ljk2N2Q1OC44ODRkMTE3OC41MThkNTguODg0ZDExOTQuMzg4ZDkwLjYyM2QxMTk0LjM4OGQxMTYuMDk3ZDExOTQuMzg4ZDEzOS45MDJkMTE4Ny43MDZkMTcyLjg5M2QxMTc4LjUxOGQxNzIuODkzZDExNTkuNzI1ZDE3Mi44OTNkMTEzOC40MjdkMTQ0LjA3OGQxMTIyLjU1N2QxMjMuNjE1ZDExMTEuMjgyZDk4LjE0ZDEwOTcuOTE4ZDEyMS45NDRkMTAzOC42MTZkMTQ2LjU4NGQxMDA5LjM4M2hSM2QyNTAuOTg4UjRkMjMxLjM2UjVkMTkuMjFSNmQxNC42MTZSN2QtMTk4LjM2OFI4ZC00LjU5M1I5ZDBSMTBkMjgzLjk4UjExaTE4NFIxMmQxOS4yMVIxM2QyNTAuOTg4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNoZzo3MW9SMWQ3NDAuMDE5UjJhZDQ1Ni4wMzlkNTY0LjYxOWQ0NzkuMDA4ZDY2OS4wMjRkNDc5LjAwOGQ3MDIuMDE2ZDQ3OS4wMDhkNzAzLjI2OWQ0NTEuODYyZDYyMC45OThkNDEyLjE4OWQ1OTguODY0ZDM4MC44NjdkNTgxLjMyNGQyOTEuOTE1ZDU4MS4zMjRkMTUxLjU5NWQ1ODEuMzI0ZDE1MS41OTVkNzkyLjIyMWQxNTEuNTk1ZDg3MS41NjlkMTg4LjM0NWQ5MjcuOTQ3ZDE1Ni4xODlkOTIzLjM1M2QxNDEuNTcyZDkyMy4zNTNkMTM2Ljk3OGQ5MjUuNDQyZDEzNi45NzhkOTMwLjg3MWQyMDUuNDY4ZDk0OS4yNDZkMjQ4LjA2NWQ5OTYuNDM3ZDMyNi41NzdkOTk2LjQzN2QzNzguNzc5ZDk5Ni40MzdkMzc4Ljc3OWQ5ODIuMjM4ZDM4My4zNzNkOTc2LjgwOWQzODUuODc5ZDk2Ny4yMDNkMzgwLjQ1ZDk1MS43NTJkMzU5Ljk4NmQ5MzIuNTQxZDM2Mi45MWQ5MTQuMTY2ZDM2NC41OGQ5MTAuODI1ZDM2Ny45MjFkOTAxLjIyZDM3OS4xOTdkODk0Ljk1NWQzODQuNjI2ZDg4Ni42MDNkMzkzLjgxNGQ4NjguNjQ2ZDM4MS43MDNkODc5LjUwNGQzNTcuMDYzZDkwMS4yMmQzNTQuOTc1ZDg5OS4xMzJkMzU0Ljk3NWQ4ODkuNTI2ZDM1My43MjJkODcwLjk0MmQzNTIuNDY5ZDg1Mi4zNThkMzUyLjQ2OWQ4NDIuNzUzZDM1NC41NTdkODQxLjA4M2QzNjMuMzI3ZDg0My4xNzFkMzcyLjkzM2Q4NDkuODUzZDM3My43NjhkODQ4LjZkMzYzLjMyN2Q4MjguOTcyZDM1OS45ODZkODI2LjA0OGQzNTMuMzA1ZDgyMC4yMDJkMzMyLjg0MWQ4MjAuMjAyZDMxMC4yOWQ4MjAuMjAyZDI4OC41NzRkODM2LjkwN2QyODcuNzM4ZDgzNC44MThkMjY4LjUyOGQ4NDQuNDI0ZDI2MC4xNzZkODc2Ljk5OGQyNTYuODM1ZDg1NS4yODJkMjU2LjgzNWQ4MzIuNzNkMjc1LjIxZDgwMS44MjdkMzA1LjI3OGQ3ODguNDYzZDMzMi40MjRkNzg4LjQ2M2QzODYuNTA1ZDc5My40NzRkNDQwLjU4N2Q3OTguNDg2ZDQ2Ny43MzJkNzk4LjQ4NmQ0ODguNjEzZDc5OC40ODZkNTEwLjMyOWQ3OTYuODE1ZDUxMi40MTdkNzk4LjA2OGQ1MDMuMjNkODEwLjU5N2Q0NTguOTYyZDgzOS44M2Q0NTMuOTUxZDg1OS44NzZkNDUzLjk1MWQ4NzkuNTA0ZDQ1My45NTFkOTAxLjIyZDQ3MS42OTlkOTQxLjUyZDQ4OS40NDhkOTgxLjgyZDQ4OS40NDhkMTAwMy41MzZkNDg5LjQ0OGQxMDIwLjI0MWQ0NTIuNjk4ZDEwMjkuMDExZDQyNi4zODhkMTAzNS4yNzVkNDAwLjQ5NWQxMDM1LjI3NWQyODEuODkyZDEwMzUuMjc1ZDE5MC40MzNkMTAzNS4yNzVkMTE1LjY4ZDk3NS41NTZkMTQxLjU3MmQ5NjguODc0ZDE2NC4xMjNkOTU5LjI2OWQxMjMuNjE1ZDk2MC41MjJkOTguNTU3ZDk2MC4xMDRkNzcuMjU5ZDkzOS4yMjNkNjIuMjI1ZDg5Ny44NzlkNDUuOTM4ZDg1Mi43NzZkMzQuNjYyZDgzOC41NzdkNDQuMjY3ZDgzMS44OTVkOTIuNzExZDgyNS4yMTNkNzAuNTc3ZDgxOC41MzFkMjYuMzA5ZDgwMy40OTdkNDAuMDkxZDc5OC45MDNkNTYuMzc4ZDc5MC4xMzNkNTAuMTE0ZDc4OC4wNDVkMzUuMDc5ZDc4Ni43OTJkMzUuMDc5ZDY2NS42ODNkMTAyLjEwN2Q1OTcuODJkMTY5LjEzNWQ1MjkuOTU3ZDI4OS44MjdkNTI5Ljk1N2QzOTcuOTlkNTI5Ljk1N2Q0NTYuMDM5ZDU2NC42MTloUjNkNTU0LjE3OVI0ZDUxMi40MTdSNWQyNi4zMDlSNmQ0OTQuMDQyUjdkLTExLjI3NVI4ZDQ2Ny43MzJSOWQwUjEwZDI4My45OFIxMWk3MVIxMmQyNi4zMDlSMTNkNTU0LjE3OVIxNGFpMWkzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTgzb1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTgzUjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3MG9SMWQ3NDAuMDE5UjJhZDQzNS4xNThkNjcxLjk0N2Q0MDMuODM2ZDYxMy4wNjNkMzczLjM1ZDU5Ny42MTFkMzQ3Ljg3NmQ1ODQuNjY1ZDI4MC42MzlkNTg0LjY2NWQyMjguMDE5ZDU4NC42NjVkMTg0LjU4N2Q1OTkuMjgyZDE4NC4xNjlkNjAyLjYyM2QxODkuMTgxZDYxMC45NzVkMTk1LjQ0NWQ2MTQuMzE2ZDE5NS40NDVkNjMzLjk0NGQxODcuOTI4ZDY3MS45NDdkMTgwLjQxMWQ3MDkuOTUxZDE4MC40MTFkNzI5LjU3OWQxODIuMDgxZDczMi41MDJkMjAwLjg3NGQ3MjEuNjQ0ZDIwOS4yMjZkNzM0LjE3MmQyMzAuMTA3ZDc1NC42MzZkMjc2LjQ2M2Q3NTQuNjM2ZDI5OC4xNzlkNzU0LjYzNmQzMTUuNzE5ZDc0NC4xOTVkMzM2LjZkNzMyLjA4NGQzMzYuNmQ3MTIuMDM5ZDMzNi42ZDY5MS41NzVkMzA2LjUzMWQ2NzQuNDUzZDM2MS4yMzlkNjk0LjkxNmQzNjcuOTIxZDcxOC4zMDNkMzU3LjQ4MWQ3NDkuMjA3ZDMyOS4wODNkNzcwLjUwNWQzNTQuNTU3ZDc2Mi41N2QzNjMuMzI3ZDc3MC41MDVkMzUyLjQ2OWQ4MjIuMjlkMzA5LjAzN2Q4NTUuNjk5ZDMyOS41ZDgzNC44MThkMzI5LjVkODE1LjE5ZDMyOS41ZDgwMi4yNDRkMzE2LjU1NGQ3OTMuODkyZDMwNS4yNzhkNzg2LjM3NWQyOTEuOTE1ZDc4Ni4zNzVkMjMxLjc3OGQ3ODYuMzc1ZDE5OS42MjFkNzkwLjk2OWQxOTIuMTA0ZDgzMi4zMTNkMTk0LjE5MmQ5ODkuNzU1ZDE5NC4xOTJkOTk1LjYwMWQxODcuNTFkMTAxNS4yM2QxODAuNDExZDEwMzcuMzYzZDE3OS4xNThkMTA0My4yMWQxNzguMzIzZDEwNDcuMzg2ZDE4MS42NjNkMTA0OC4yMjFkMTgzLjc1MmQxMDQ4LjIyMWQxODcuNTFkMTA0Ni43NmQxOTEuMjY5ZDEwNDUuMjk4ZDE5Mi41MjJkMTA0NS4yOThkMTkzLjc3NGQxMDQ2LjEzM2QxOTMuNzc0ZDEwOTkuMTcxZDIwOC44MDlkMTEyMC4wNTJkMjI2Ljc2NmQxMTQ0LjY5MWQyNzcuMjk4ZDExNDkuMjg1ZDI1Ni44MzVkMTE1Mi42MjZkMjA2LjcyMWQxMTc1LjU5NWQxNjIuMDM1ZDExOTYuMDU4ZDEzNC44OWQxMTk2LjA1OGQxMjUuMjg1ZDExOTMuNTUzZDEyOC4yMDhkMTE3Ny42ODNkMTU4LjI3N2QxMTc0Ljc2ZDE1NS4zNTNkMTE2NC43MzdkMTQ0LjkxM2QxMTUxLjc5MWQ5Ni4wNTJkMTE4MC42MDZkMjIuMTMzZDEyMDIuMzIzZDExLjI3NWQxMTkzLjEzNWQ2My4wNmQxMTgxLjg1OWQ4My4xMDZkMTE0My44NTZkOTcuNzIyZDExMTUuODc2ZDk3LjcyMmQxMDYyLjAwM2Q5Ny43MjJkMTA1MS41NjJkOTcuMDk2ZDEwMzAuODlkOTYuNDY5ZDEwMTAuMjE4ZDk2LjQ2OWQ5OTkuNzc4ZDk4LjU1N2Q5OTMuOTMxZDE1NS43NzFkOTgyLjIzOGQxMTkuMDIxZDk3NS45NzNkOTguMTRkOTY3LjIwM2QxMTYuOTMzZDk0NS40ODdkMTE2LjUxNWQ5NDQuNjUyZDEwMi4zMTZkOTQ0LjY1MmQ5NC4zODFkOTM4LjM4OGQ5NC4zODFkOTMwLjAzNWQ5OC45NzVkOTI1Ljg1OWQxMzcuODE0ZDk0MS43MjlkMTAyLjMxNmQ5MDUuMzk2ZDk0LjM4MWQ4NzQuNDkyZDk1LjIxNmQ3OTYuODE1ZDk2LjA1MmQ3MTEuNjIxZDEwOC45OThkNjk2LjU4N2QxNDQuMDc4ZDY3MS41M2QxMjkuNDYxZDY2Ni41MThkOTUuMjE2ZDY2MC42NzJkOTIuMjkzZDU4My44M2Q3OS4zNDdkNTgxLjMyNGQ2Ni44MThkNTgxLjMyNGQ1MC45NDlkNTkyLjZkMzMuODI3ZDYwNC4yOTNkMzMuODI3ZDYxNi40MDRkMzQuMjQ0ZDYxOS4zMjdkMzEuMzIxZDU0Mi45MDNkMTM0LjQ3M2Q1NDIuOTAzZDM1Mi40NjlkNTQyLjkwM2Q0MTUuNTNkNTM5LjE0NWQ0MDMuODM2ZDU3MC4wNDhkNDAzLjgzNmQ1NzQuNjQyZDQwMy44MzZkNTgwLjkwN2Q0MzUuMTU4ZDY3MS45NDdoUjNkNDE4LjQ1M1I0ZDQzNS4xNThSNWQxMS4yNzVSNmQ0ODQuODU0UjdkLTE3OC4zMjNSOGQ0NzMuNTc5UjlkMFIxMGQyODMuOThSMTFpNzBSMTJkMTEuMjc1UjEzZDQxOC40NTNSMTRhaTFpM2kzaTNpMmkzaTNpM2kyaTJpM2kyaTNpM2kzaTJpMmkzaTJpMmkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpMmkyaTNpMmkyaTJpMmkyaTJpMmkyaTNpMmkzaTNpMmkyaTNpM2kyaTNpM2kzaTNoZzoxODJvUjFkNzQwLjAxOVIyYWQ0NTMuNTMzZDExMTUuMDRkNDMwLjU2NGQxMTQ4Ljg2N2Q0MjEuNzk0ZDExNDguMDMyZDM4Ny41NDlkMTE2NS43ODFkMzUzLjMwNWQxMTgzLjUzZDMzNC41MTJkMTE4My41M2QzMjguNjY1ZDExODMuNTNkMzE3LjU5OGQxMTgxLjAyNGQzMDYuNTMxZDExNzguNTE4ZDMwMS45MzhkMTE3OC41MThkMzAxLjUyZDExOTAuMjEyZDI4Ni40ODZkMTE4OC45NTlkMjE2Ljc0M2QxMTk5LjgxN2QyMTcuNTc5ZDExOTYuNDc2ZDIxOC40MTRkMTE5Mi43MTdkMjE0LjIzOGQxMTkzLjEzNWQyMTAuMDYxZDExOTMuMTM1ZDIwNi4zMDNkMTE5My4xMzVkMjAyLjk2MmQxMTkyLjcxN2QxOTkuMjAzZDExOTcuMzExZDE5Ni42OThkMTIwMC42NTJkMTA4Ljk5OGQxMjE0LjAxNmQ5OC4xNGQxMTk5LjM5OWQxMjEuOTQ0ZDExOTcuNzI5ZDEyOS40NjFkMTE4Ni4wMzVkMTQwLjczN2QxMTgxLjg1OWQxNTEuMTc3ZDExODYuNDUzZDE1OS45NDdkMTE3OC41MThkMTY0LjEyM2QxMTY4LjkxM2QxNjYuMjEyZDEwOTUuNDEyZDE2Ni4yMTJkMTA0NC44OGQxOTguMzY4ZDEwNTkuMDc5ZDE3MC44MDVkMTAzMi4zNTJkMTY1Ljc5NGQxMDAyLjI4M2QxNjQuOTU5ZDk5Ny4yNzJkMTY0LjEyM2Q5MjcuMTEyZDE5Ny4xMTVkODYxLjEyOGQxNjMuNzA2ZDg5NC45NTVkMTY0LjU0MWQ4NTQuMDI5ZDE2NS4zNzZkODE5Ljc4NGQxNjQuOTU5ZDgxNC4zNTVkMzUuMDc5ZDgwNC4zMzJkMzUuMDc5ZDY3MC4yNzdkMzUuMDc5ZDU0NC4xNTZkMjEwLjA2MWQ1NDQuMTU2ZDMwMy42MDhkNTQ0LjE1NmQzODMuMzczZDU0NC4xNTZkNDQwLjU4N2Q1NjQuMjAyZDQwOC4wMTNkNTc0LjIyNWQzNzYuMjc0ZDU4Mi45OTVkMzU5Ljk4NmQ2NTIuMzE5ZDM1OS45ODZkNjk4LjI1N2QzNjguNzU2ZDcyNC41NjdkMzY2LjI1MWQ3MjYuNjU1ZDMyNC4wNzFkNzI2LjY1NWQzNDUuNzg3ZDczNS40MjVkMzYwLjgyMmQ3NDUuMDNkMzU3Ljg5OGQ3NzMuODQ2ZDM1OS41NjlkODI3LjcxOWQzNjIuNDkyZDkyMC4wMTNkMzMzLjI1OWQ5NDkuMjQ2ZDMxNy4zODlkOTYyLjYxZDM2My4zMjdkOTQ2LjMyM2QzNjYuNjY4ZDk0OC40MTFkMzY0LjE2M2QxMDE4LjE1M2QzNjQuMTYzZDEwNjQuOTI2ZDM2NC4xNjNkMTEwNC42ZDM2Ni42NjhkMTExOS42MzRkMzc5LjE5N2QxMTI0LjY0NmQzOTIuOTc4ZDExMjQuNjQ2ZDQwMi41ODRkMTEyNC42NDZkNDIwLjU0MWQxMTE5LjAwOGQ0MzguNDk5ZDExMTMuMzdkNDQ2Ljg1MWQxMTEzLjM3ZDQ1MC42MWQxMTEzLjM3ZDQ1My41MzNkMTExNS4wNGQyOTMuMTY4ZDkxMi45MTNkMjkzLjE2OGQ4NDguNmQyOTIuMzMyZDc4OS43MTZkMjc1LjYyOGQ4MDEuNDA5ZDI0NS45NzdkODA4LjUwOGQyNDUuOTc3ZDg1OS40NThkMjI2LjM0OWQ4NzQuMDc1ZDI0Ni4zOTRkODkzLjcwM2QyNDcuMjNkMTEwMy43NjVkMjQwLjU0OGQxMTA3LjUyM2QyMzYuNzg5ZDExMTguNzk5ZDI0MC41NDhkMTEzNy4xNzRkMjQ4LjA2NWQxMTU3LjYzN2QyNTUuMTY0ZDExNjAuNTYxZDI2MS40MjlkMTE2MS4zOTZkMjg4LjU3NGQxMTQ0LjY5MWQyOTMuMTY4ZDEwOTguMzM2ZDI5My4xNjhkOTEyLjkxM2QyMjAuOTJkMTE3Ni4wMTNkMjE4LjgzMWQxMTcxLjgzNmQyMDkuMjI2ZDExODMuOTQ3ZDIxMi45ODVkMTE4My41M2QyMjAuNTAyZDExODEuODU5ZDIyMC45MmQxMTc2LjAxM2hSM2Q0NTkuMzhSNGQ0NTMuNTMzUjVkMzUuMDc5UjZkNDc5Ljg0M1I3ZC0xOTAuMDE2UjhkNDQ0Ljc2M1I5ZDBSMTBkMjgzLjk4UjExaTE4MlIxMmQzNS4wNzlSMTNkNDU5LjM4UjE0YWkxaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTJpM2kzaTJpMmkyaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kyaTNpMmkyaTNpM2kzaTNpM2kzaTFpM2kzaTJpMmkyaTJpM2kzaTNpMmkzaTFpMmkyaTNpMmhnOjY5b1IxZDc0MC4wMTlSMmFkMjUuMDU3ZDU5NC42ODhkMjMuODA0ZDUzNi4yMjFkMTkyLjEwNGQ1MzYuMjIxZDM3NS40MzhkNTM2LjIyMWQ0MzguOTE2ZDU0Ny40OTdkNDQ1LjU5OGQ1NTguMzU1ZDQ1NS42MjFkNjEwLjU1N2Q0NjQuODA5ZDY1OS4wMDFkNDYzLjk3M2Q2NjYuOTM2ZDQzMC41NjRkNjM4LjEyZDM3MS4yNjJkNTgwLjA3MWQzNDUuMzdkNTc1LjA2ZDMwMi43NzNkNTc1Ljg5NWQyMDIuMTI3ZDU3Ny41NjZkMjAxLjI5MmQ2MzMuOTQ0ZDIwMi4xMjdkNzU5LjY0N2QzMDYuMTE0ZDc2OC40MTdkMzI5LjA4M2Q3NzAuNTA1ZDM0OS41NDZkNzQ5LjIwN2QzNTkuOTg2ZDczOC4zNDlkMzc3Ljk0NGQ3MDguMjhkMzc3LjUyNmQ3ODUuMTIyZDM2Ni42NjhkODAyLjY2MmQzODIuNTM4ZDg1NC44NjRkMzgyLjUzOGQ4NzEuMTUxZDM1OC4zMTZkODI2LjQ2NmQzMzkuOTQxZDgxMS40MzJkMzE1LjcxOWQ3OTEuMzg2ZDI3MS40NTFkNzkxLjM4NmQyNTAuOTg4ZDc5MS4zODZkMjE4LjQxNGQ3OTMuMDU3ZDIwMi4xMjdkNzkzLjg5MmQyMDAuMDM5ZDkxMC40MDdkMTk5LjIwM2Q5NTcuNTk4ZDIwOC44MDlkOTcxLjM4ZDIyMS4zMzdkOTg5LjMzN2QyNjQuNzY5ZDk4OS4zMzdkMjgwLjIyMWQ5ODkuMzM3ZDMxMC43MDdkOTg4LjUwMmQzNDEuMTk0ZDk4Ny42NjdkMzU2LjY0NmQ5ODcuNjY3ZDQxMS43NzFkOTg3LjY2N2Q0MzUuNTc1ZDk2NC4yOGQ0NTMuOTUxZDk0Ni4zMjNkNDczLjE2MWQ4ODguNjkxZDQ3OC4xNzJkOTAzLjcyNWQ0NzguMTcyZDkyNi4yNzdkNDY5LjQwMmQ5NjMuODYyZDQ1OC4xMjdkMTAxMi4zMDZkNDU2LjQ1NmQxMDIzLjU4MmQ0MDEuNzQ4ZDEwMjguNTkzZDMzOS4xMDZkMTAyOC41OTNkMjkwLjY2MmQxMDI4LjU5M2QxOTQuMTkyZDEwMjUuMjUyZDk3LjcyMmQxMDIxLjkxMWQ0OS4yNzhkMTAyMS45MTFkMTUuNDUxZDEwMjEuOTExZDExLjY5M2QxMDIzLjU4MmQ4OC41MzVkMTAxMC4yMThkOTguNTU3ZDkzMi45NTlkMTEyLjMzOWQ5MjUuODU5ZDExMi4zMzlkOTI0LjYwNmQxMDguNThkOTIwLjQzZDg3LjI4MmQ4OTcuMDQ0ZDEwMy45ODZkOTAxLjYzN2QxNTYuNjA2ZDkyMC44NDhkMTQ4LjI1NGQ5MTIuNDk1ZDk5LjM5M2Q4NjYuMTRkMTAzLjk4NmQ4MjEuMDM3ZDEwMy45ODZkNzgyLjE5OWQ5MC42MjNkNzQyLjUyNWQ5MS44NzZkNzQxLjY5ZDEwMS44OThkNzQ0LjE5NWQxMjYuNTM4ZDc1NC4yMThkOTUuMjE2ZDY5OS45MjhkOTUuMjE2ZDY3My42MThkOTUuMjE2ZDY0NS42MzdkMTAyLjczNGQ2MzYuMDMyZDEzMS41NDlkNjExLjM5M2Q4OC41MzVkNjIxLjgzM2Q4Ny4yODJkNjIxLjQxNWQ5NS4yMTZkNjA0LjcxMWQ5Mi43MTFkNTg0LjY2NWQ3MS40MTJkNTc5LjIzNmQ0Ni4zNTVkNTc5LjIzNmQyMS43MTZkNTk2Ljc3NmQyNS4wNTdkNTk0LjY4OGhSM2Q0OTcuOFI0ZDQ3OC4xNzJSNWQxMS42OTNSNmQ0ODcuNzc4UjdkLTQuNTkzUjhkNDc2LjA4NFI5ZDBSMTBkMjgzLjk4UjExaTY5UjEyZDExLjY5M1IxM2Q0OTcuOFIxNGFpMWkzaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kyaTNpMmkzaTNpM2kyaTJpMmkyaTJpMmkzaTJoZzoxODFvUjFkNzQwLjAxOVIyYWQtMTQuNjE2ZDEyMjQuMDM5ZDAuODM1ZDEyMDUuNjYzZDQyLjE3OWQxMTkwLjYyOWQ0My44NDlkMTE4OS4zNzZkNTguNDY2ZDExNzkuMzUzZDU2Ljc5NmQxMTUxLjc5MWQ1OC40NjZkMTE1MC45NTVkNTkuNzE5ZDExNTAuOTU1ZDY0LjMxM2QxMTQ5LjcwM2Q4My41MjNkMTE2MS44MTRkODUuMTk0ZDExNTkuMzA4ZDc4LjA5NGQxMTM5LjY4ZDY2LjQwMWQxMTE1LjA0ZDU4LjA0OGQxMDk3LjVkNTYuNzk2ZDEwNzMuNjk2ZDg3LjY5OWQxMDYxLjU4NWQ1Ni43OTZkMTAzNy43ODFkNTcuNjMxZDk3Ny4yMjZkNTUuNTQzZDk1My40MjJkNTQuNzA3ZDk1Mi4xNjlkNTQuNzA3ZDk0Ni43NGQ1NC43MDdkOTM3LjEzNWQ1OC4wNDhkOTE0LjE2NmQ1NC4yOWQ4OTIuNDVkNTQuMjlkODY1LjcyMmQ1NC4yOWQ4NDYuMDk0ZDU3LjAwNGQ4MDYuODM4ZDU5LjcxOWQ3NjcuNTgyZDU5LjcxOWQ3NDcuOTU0ZDU5LjcxOWQ3NDMuNzc4ZDU2Ljc5NmQ3MzMuNzU1ZDQyLjU5N2Q3MjkuMTYxZDE1LjAzNGQ3MTIuODc0ZDI5LjY1ZDcwNC41MjJkNTIuNjE5ZDcwNi42MWQ5MC42MjNkNzA0LjUyMmQxMzYuNTYxZDcwMi4wMTZkMTUxLjE3N2Q3MDIuMDE2ZDE3NC41NjRkNzAyLjAxNmQxODguNzYzZDcwOC42OThkMTc1LjgxN2Q3MjAuODA5ZDE1NS4zNTNkNzIzLjMxNGQxNDEuMTU0ZDczNS40MjVkMTM4LjIzMWQ3NDcuNTM2ZDEzOC4yMzFkNzU5LjY0N2QxMjcuNzkxZDc3NC4yNjRkMTE2LjkzM2Q4MDEuNDA5ZDExOS4wMjFkODAzLjkxNWQxMjkuMDQ0ZDc5OS4zMjFkMTM4LjIzMWQ3ODkuNzE2ZDEzOC4yMzFkODA1LjE2OGQxMzYuNTYxZDgzMC4yMjVkMTM0LjA1NWQ4NjEuNTQ2ZDEzMy42MzdkODcwLjMxNmQxMzUuNzI1ZDg3MC4zMTZkMTM3LjgxNGQ4NjkuNDgxZDEzNi4xNDNkODg3LjQzOGQxMzQuODlkOTAzLjcyNWQxNDEuNTcyZDk2NS45NTFkMTgwLjgyOGQ5NjUuOTUxZDIzNS41MzZkOTY1Ljk1MWQyNzkuMzg2ZDkyNS44NTlkMjc4LjU1MWQ5MjIuOTM2ZDI3OC41NTFkOTE4Ljc2ZDI3OC41NTFkODkyLjAzMmQzMDQuMDI2ZDg0OS4wMTdkMjc2LjA0NWQ4NzEuOTg2ZDI4MS44OTJkNzM2LjY3OGQyODIuMzA5ZDcyNC41NjdkMjY0LjM1MmQ3MTUuMzhkMjUwLjU3ZDcwOS45NTFkMjM2LjM3MWQ3MDQuNTIyZDI0MS4zODNkNjk5LjA5MmQyNTEuNDA2ZDY4OC42NTJkMjcyLjcwNGQ2OTMuNjYzZDI5OS4wMTRkNjk0LjkxNmQzMTYuOTcyZDY5NS43NTJkMzQ2LjYyM2Q2OTQuNDk5ZDM4My4zNzNkNjkzLjI0NmQzOTQuMjMxZDY5My4yNDZkNDA5LjY4M2Q2OTguNjc1ZDM5Mi4xNDNkNzA2LjE5MmQzNjAuNDA0ZDcyOS45OTZkMzU4LjMxNmQ3NDUuNDQ4ZDM1OC4zMTZkODA2LjAwM2QzMzguNjg4ZDgwMi42NjJkMzU5LjE1MWQ4MjcuMzAxZDM1OS4xNTFkODg5LjUyNmQzNTkuMTUxZDkxNy45MjRkMzU5LjE1MWQ5NTguODUxZDM3My4zNWQ5NTguODUxZDM4My4zNzNkOTU4Ljg1MWQ0MDIuNTg0ZDk0Ny4xNThkMzc3Ljk0NGQ5ODYuODMxZDM1MC43OTlkMTAwNS42MjRkMzI3LjQxMmQxMDIxLjkxMWQyODAuMjIxZDEwMzUuNjkzZDI4MC4yMjFkMTAyOC41OTNkMjgxLjQ3NGQ5ODguMDg0ZDMwNC4wMjZkOTY1LjUzM2QyOTUuNjczZDk2OS4yOTJkMjg2LjA2OGQ5NzAuNTQ0ZDI4MS4wNTdkOTY2LjM2OGQyNDMuNDcxZDk5OC45NDJkMjM2LjM3MWQxMDAzLjUzNmQyMTMuNDAyZDEwMTguMTUzZDE4MS4yNDZkMTAxOC4xNTNkMTUzLjI2NWQxMDE4LjE1M2QxMzEuNTQ5ZDEwMTAuNjM2ZDEzMi44MDJkMTEwNS40MzVkMTM5LjkwMmQxMTYyLjY0OWQxNTguNjk0ZDExNjIuMjMxZDE5Ni42OThkMTE2NS4xNTRkMTk5LjIwM2QxMTcyLjY3MmQxNzkuMTU4ZDExODQuMzY1ZDE1NC4xMDFkMTE5MS44ODJkMTM4LjY0OWQxMTk2LjQ3NmQxMDcuNzQ1ZDEyMDIuNzRkNzMuMDgzZDEyMDkuODRkNjEuMzg5ZDEyMTIuNzYzZDUwLjExNGQxMjE3LjM1N2QyNi43MjdkMTIyNS4yOTJkMTcuOTU3ZDEyMjcuMzhkNS44NDZkMTIyNS43MDlkLTEwLjAyMmQxMjIzLjYyMWQtMTQuNjE2ZDEyMjQuMDM5aFIzZDQxOS43MDZSNGQ0MDkuNjgzUjVkLTE0LjYxNlI2ZDMzNS4zNDdSN2QtMjAzLjM4UjhkMzQ5Ljk2NFI5ZDBSMTBkMjgzLjk4UjExaTE4MVIxMmQtMTQuNjE2UjEzZDQxOS43MDZSMTRhaTFpMmkzaTNpM2kzaTJpM2kzaTJpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNoZzo2OG9SMWQ3NDAuMDE5UjJhZDE4Ljc5MmQxMDIyLjMyOWQ2OC45MDdkMTAxMS4wNTNkODcuNjk5ZDk4My45MDhkMTAyLjczNGQ5NjIuMTkyZDEwMi43MzRkOTE5LjE3N2QxMDIuNzM0ZDkyNS40NDJkMTAwLjIyOGQ4NTQuNDQ2ZDExOS4wMjFkODM4LjE1OWQ5OS4zOTNkODE4LjUzMWQxMzMuNjM3ZDc4OC44OGQ5Ny43MjJkNzY0LjI0MWQ5NC4zODFkNzM4Ljc2NmQ5NC4zODFkNzA2LjE5MmQ5NC4zODFkNjg2LjE0NmQ5Ny4zMDVkNjAxLjc4N2QxMjMuNjE1ZDU4MS4zMjRkMTAzLjU2OWQ1ODMuODNkMTguNzkyZDYxMC41NTdkMTguNzkyZDYwOC4wNTJkMTguNzkyZDU2OC43OTZkODEuNDM1ZDU0Ny4wNzlkMTI3LjM3M2Q1MzEuMjFkMTc0LjE0NmQ1MzEuMjFkMzUxLjIxNmQ1MzEuMjFkNDMxLjM5OWQ1NjUuNDU1ZDU1NS44NDlkNjE4LjQ5MmQ1NTUuODQ5ZDc3MC45MjNkNTU1Ljg0OWQ4ODQuNTE1ZDQ5OS44ODlkOTUwLjkxNmQ0NDAuMTY5ZDEwMjEuOTExZDMyOC42NjVkMTAyMS45MTFkMTguNzkyZDEwMjIuMzI5ZDE5OC43ODZkNTc3Ljk4M2QxODQuMTY5ZDYwNi4zODFkMTg0LjE2OWQ2NDUuNjM3ZDE4NC4xNjlkNjcwLjY5NGQxOTEuNDc3ZDcxOS45NzNkMTk4Ljc4NmQ3NjkuMjUyZDE5OC43ODZkNzk0LjMwOWQxOTguNzg2ZDgxMy4xMDJkMTkzLjc3NGQ4NTAuMjdkMTg4Ljc2M2Q4ODcuNDM4ZDE4OC43NjNkOTA2LjIzMWQxODguNzYzZDk4NC43NDNkMjkzLjU4NWQ5ODQuNzQzZDQ0OC45MzlkOTg0Ljc0M2Q0NDguOTM5ZDc2Mi4xNTNkNDQ4LjkzOWQ3NDYuMjgzZDQ0MS42MzFkNzE1LjU4OGQ0MzQuMzIzZDY4NC44OTNkNDM0LjMyM2Q2NjkuMDI0ZDQ0MS40MjJkNjYwLjI1NGQ0NTYuMDM5ZDY1My4xNTRkNDM3LjY2M2Q2NDguNTYxZDQxMC45MzZkNjM4LjEyZDM0Ny4wNGQ1ODcuMTcxZDMxNy4zODlkNTY3LjU0M2QyNjQuMzUyZDU2Ny41NDNkMjI2LjM0OWQ1NjcuNTQzZDE5OC43ODZkNTc3Ljk4M2hSM2Q1OTMuODUzUjRkNTU1Ljg0OVI1ZDE4Ljc5MlI2ZDQ5Mi43ODlSN2QxLjY3UjhkNDczLjk5NlI5ZDBSMTBkMjgzLjk4UjExaTY4UjEyZDE4Ljc5MlIxM2Q1OTMuODUzUjE0YWkxaTNpM2kzaTJpMmkyaTJpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNoZzoxODBvUjFkNzQwLjAxOVIyYWQxOS4yMWQ2MjQuNzU2ZDE1NC41MThkNTM3LjA1N2QxNTQuNTE4ZDUwNC45ZDE1NC41MThkNTAyLjgxMmQxMzMuODQ2ZDQ4NS4wNjNkMTEzLjE3NGQ0NjcuMzE0ZDExMC4yNTFkNDY3LjMxNGQ5MS40NThkNDY3LjMxNGQ1OC4wNDhkNTM1LjgwNGQ1MC45NDlkNTUwLjAwM2QxOS4yMWQ2MjQuNzU2aFIzZDE3My43MjlSNGQxNTQuNTE4UjVkMTkuMjFSNmQ1NTYuNjg1UjdkMzk5LjI0M1I4ZDUzNy40NzRSOWQwUjEwZDI4My45OFIxMWkxODBSMTJkMTkuMjFSMTNkMTczLjcyOVIxNGFpMWkzaTNpM2kzaTNoZzo2N29SMWQ3NDAuMDE5UjJhZDQxMC41MThkNTQyLjkwM2Q0MzguMDgxZDU5Mi42ZDQ1OC41NDRkNjg4LjIzNGQzOTIuMTQzZDYxNi44MjJkMzgyLjUzOGQ2MDkuMzA1ZDM0MC4zNThkNTc2LjMxM2QyNzguNTUxZDU3Ni4zMTNkMjAyLjk2MmQ1NzYuMzEzZDE2Mi4wMzVkNjQzLjk2N2QxMjcuNzkxZDcwMC43NjNkMTI3Ljc5MWQ3ODIuNjE2ZDEyNy43OTFkODY0LjQ2OWQxNjcuMDQ3ZDkyNC4xODlkMjEyLjE1ZDk5My4wOTZkMjg4Ljk5MWQ5OTMuMDk2ZDMzNy4wMTdkOTkzLjA5NmQzOTIuMTQzZDk2OC40NTZkNDU4LjU0NGQ5MzguODA1ZDQ1OC41NDRkODk3LjQ2MWQ0NTguNTQ0ZDg4Mi40MjdkNDQ5LjM1N2Q4NTEuMTA2ZDQ3NS4yNDlkODg0LjUxNWQ0NzUuMjQ5ZDkxMS4yNDNkNDc1LjI0OWQ5MTkuMTc3ZDQ2Ni4wNjFkOTYyLjE5MmQ0MjUuNTUzZDk2My44NjJkNDEzLjg1OWQ5ODQuNzQzZDQ2Ni40NzlkOTg0Ljc0M2Q0MDkuMjY1ZDEwMjkuMDExZDI5MC42NjJkMTAyOS4wMTFkMjM5LjI5NWQxMDI5LjAxMWQxNzMuNzI5ZDEwMTAuNjM2ZDk0LjM4MWQ5ODguNTAyZDc2LjQyNGQ5NTUuNTFkNzguNTEyZDk1Mi4xNjlkNzguNTEyZDk1MC4wODFkNzguMDk0ZDk0OC40MTFkNzYuODQxZDk0Ny41NzVkODEuMDE3ZDkzOS42NDFkOTYuMDUyZDkxOC43NmQ5NC4zODFkOTEzLjc0OGQ3My45MThkOTA5Ljk5ZDUwLjk0OWQ5MDUuODE0ZDQ4LjAyNmQ5MDQuMTQzZDQwLjkyNmQ5MDAuMzg0ZDM1LjcwNmQ4ODEuMTc0ZDMwLjQ4NmQ4NjEuOTY0ZDI3Ljk4ZDg1OS40NThkMjguMzk4ZDg1NC4wMjlkMzguODM4ZDg1MC4yN2Q2MC41NTRkODQ2LjUxMmQ2MC4xMzdkODQ1LjY3NmQ2MC45NzJkODQ0Ljg0MWQyMC44OGQ4MDMuOTE1ZDE5LjIxZDc5NS4xNDVkMTkuMjFkNjY5LjAyNGQ4Ni42NTVkNTk5LjY5OWQxNTQuMTAxZDUzMC4zNzVkMjc5LjgwNGQ1MzAuMzc1ZDM2Mi4wNzVkNTMwLjM3NWQ0MTAuNTE4ZDU0Mi45MDNoUjNkNDk0LjQ2UjRkNDc1LjI0OVI1ZDE5LjIxUjZkNDkzLjYyNFI3ZC01LjAxMVI4ZDQ3NC40MTRSOWQwUjEwZDI4My45OFIxMWk2N1IxMmQxOS4yMVIxM2Q0OTQuNDZSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTJpMmkyaTJpM2kzaTNoZzoxNzlvUjFkNzQwLjAxOVIyYWQ1NS41NDNkNjE4LjA3NWQxMDguMTYzZDU4My44M2QxNDMuNjZkNTYwLjg2MWQxNDMuNjZkNTM5LjU2MmQxNDMuNjZkNTE2LjE3NmQxMzMuMjJkNTA4LjY1OWQxMjUuMjg1ZDUwMi44MTJkMTAxLjg5OGQ1MDIuODEyZDQ4LjAyNmQ1MDIuODEyZDQ4LjAyNmQ1NTEuMjU2ZDQ4LjAyNmQ1NTUuODQ5ZDQ4LjQ0M2Q1NjAuODYxZDM4LjQyZDU1My4zNDRkMzguNDJkNTM0Ljk2OWQzOC40MmQ0NzQuODMxZDEyOC42MjZkNDc0LjgzMWQxNDkuMDg5ZDQ3NC44MzFkMTYzLjcwNmQ0ODIuMzQ5ZDE2NC4xMjNkNDkyLjc4OWQxNjcuNDY0ZDUxMy42N2QxNzEuNjQxZDUwMy4yM2QxNzYuNjUyZDQ5My42MjRkMTg5LjU5OGQ1MDYuNTdkMTg5LjU5OGQ1MjUuNzgxZDE4OS41OThkNTYwLjAyNmQxMzkuOTAyZDU5My44NTNkMjEyLjE1ZDU5My44NTNkMjEyLjE1ZDY2Ni45MzZkMjEyLjE1ZDcxOC4zMDNkMTc3LjQ4N2Q3NDcuMTE5ZDE0NS43NDhkNzczLjg0NmQ5My4xMjhkNzczLjg0NmQxOS4yMWQ3NzMuODQ2ZDE5LjIxZDczOS4xODRkMTkuMjFkNzIyLjQ3OWQ0MS43NjFkNzA5Ljk1MWQ2MS4zODlkNjk4LjY3NWQ3OS43NjVkNjk4LjY3NWQ4My4xMDZkNjk5LjkyOGQ1NC43MDdkNzI3LjQ5MWQ1NC43MDdkNzM3LjA5NmQ1NC43MDdkNzU3LjE0MWQxMDMuOTg2ZDc1Ny4xNDFkMTMyLjgwMmQ3NTcuMTQxZDE2Mi40NTNkNjk3Ljg0ZDE3My4zMTFkNjkxLjU3NWQxODUuNDIyZDY4MC43MTdkMTgzLjc1MmQ2NzkuNDY0ZDE2NC45NTlkNjgzLjIyM2QxNjEuMmQ2NzYuMTIzZDE1Ny40NDJkNjYxLjkyNGQxNTguNjk0ZDY2MC4yNTRkMTY3Ljg4MmQ2NjIuMzQyZDE2OC43MTdkNjYxLjkyNGQxNjguNzE3ZDY1NC44MjVkMTQ1Ljc0OGQ2MzkuMTY0ZDEyMi43NzlkNjIzLjUwNGQxMTQuMDA5ZDYyMi4yNTFkMTA5LjgzM2Q2MTcuNjU3ZDc4LjkyOWQ2MTcuNjU3ZDY4LjkwN2Q2MTcuNjU3ZDU1LjU0M2Q2MTguMDc1aFIzZDIzMS4zNlI0ZDIxMi4xNVI1ZDE5LjIxUjZkNTQ5LjE2OFI3ZDI1MC4xNTNSOGQ1MjkuOTU3UjlkMFIxMGQyODMuOThSMTFpMTc5UjEyZDE5LjIxUjEzZDIzMS4zNlIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kyaTJpMmkzaTNpM2kzaGc6NjZvUjFkNzQwLjAxOVIyYWQyNy4xNDVkMTAyNC44MzVkMjcuNTYyZDEwMjMuNTgyZDQwLjA5MWQxMDE4LjU3ZDU4LjQ2NmQxMDAzLjk1NGQ4MC42ZDk4NS45OTZkODguNTM1ZDk4MS40MDJkOTUuMjE2ZDk2NS4xMTVkODkuMzdkOTUxLjMzNGQ4Ni40NDZkOTM1LjQ2NGQ4OC41MzVkOTM0LjYyOWQ5MS40NThkOTMxLjcwNmQxMTIuMzM5ZDk0MC40NzZkMTU0LjkzNmQ5NTQuNjc1ZDE1Ni4xODlkOTU0LjI1N2Q5OC41NTdkODY5LjA2M2Q5OC4xNGQ4MDguNTA4ZDEzNi4xNDNkNzYzLjgyM2QxMDYuOTFkNzUwLjA0MmQ5OC41NTdkNzM1LjYzNGQ5MC4yMDVkNzIxLjIyNmQ5MS44NzZkNjg4LjIzNGQ5Ni4wNTJkNjg0Ljg5M2QxMDcuMzI3ZDY4OC4yMzRkMTE1LjY4ZDY5Mi40MTFkMTE2LjkzM2Q2OTEuNTc1ZDExNS4yNjJkNjg4LjIzNGQ5OC45NzVkNjUxLjA2NmQ4OC41MzVkNjI3LjI2MmQ4OC41MzVkNjA4LjA1MmQ4OC41MzVkNTg4LjQyNGQxMDMuMTUxZDU3NC42NDJkODMuMTA2ZDU3NS4wNmQ2NS4xNDhkNTc0LjY0MmQ0My4wMTRkNTkyLjE4MmQyNi43MjdkNjAwLjUzNWQyNS40NzRkNTk5LjI4MmQyNS40NzRkNTkwLjA5NGQ1MS4zNjdkNTY0LjYxOWQ3Mi4yNDdkNTQ0LjE1NmQ4NS4xOTRkNTM1LjM4NmQxMDcuMzI3ZDUzMy4yOThkMTMxLjk2N2Q1MzMuMjk4ZDE0Ny40MTlkNTMzLjI5OGQxNzguNzRkNTMyLjQ2M2QyMTAuMDYxZDUzMS42MjhkMjI1LjUxM2Q1MzEuNjI4ZDQzMy4wN2Q1MzEuNjI4ZDQzMy4wN2Q2NDYuODlkNDMzLjA3ZDcyMC44MDlkMzYyLjQ5MmQ3NTIuOTY1ZDQ2My41NTZkNzc1LjkzNGQ0NjMuNTU2ZDg2Ny4zOTNkNDYzLjU1NmQ5NjcuNjIxZDM3NC42MDNkOTk5Ljc3OGQzMjQuOTA3ZDEwMTcuNzM1ZDIwMS43MDlkMTAxNy43MzVkMjAzLjM4ZDEwMTcuNzM1ZDIwMi4xMjdkMTAxOC4xNTNkMjAwLjg3NGQxMDE4LjE1M2QxOTQuMTkyZDEwMTguMTUzZDE2NC4xMjNkMTAxOS44MjNkMjcuMTQ1ZDEwMjQuODM1ZDIwMC4wMzlkNzQyLjk0MmQyMTcuMTYxZDc0NS4wM2QyMzUuMTE5ZDc0NS4wM2QyODYuMDY4ZDc0NS4wM2QzMTguMjI1ZDcyNS40MDJkMzU3Ljg5OGQ3MDEuNTk4ZDM1Ny44OThkNjUzLjk5ZDM1Ny44OThkNjA2LjM4MWQzMDEuMTAyZDU4My44M2QyNTkuMzRkNTY3LjEyNWQyMDMuNzk3ZDU2Ny4xMjVkMTk5LjIwM2Q1NjcuMTI1ZDE5NC4xOTJkNTY4LjM3OGQxOTEuMjY5ZDU3Mi4xMzdkMTkzLjM1N2Q1NzYuNzNkMTk4Ljc4NmQ1ODQuNjY1ZDE5OC43ODZkNjY5LjQ0MmQyMDAuMDM5ZDc0Mi45NDJkMjA1LjQ2OGQ5NjcuNjIxZDI0Ny4yM2Q5ODkuMzM3ZDI0OS4zMThkOTg5LjMzN2QzMTEuNTQzZDk4OS4zMzdkMzI4LjY2NWQ5NzMuMDVkMzQ5LjEyOGQ5NjguODc0ZDM2MS42NTdkOTQxLjMxMWQzNTcuODk4ZDkzMC4wMzVkMzU3Ljg5OGQ5MzMuNzk0ZDM1OS4xNTFkOTMyLjU0MWQzNjUuNDE1ZDkzNi4zZDM3Ni4yNzRkOTQxLjMxMWQzNjEuMjM5ZDkyMy4zNTNkMzYwLjQwNGQ5MjUuMDI0ZDM1OS41NjlkOTE4Ljc2ZDM1OS41NjlkOTA5Ljk5ZDM3My43NjhkOTE2LjY3MmQ0MDMuNDE5ZDkyNy41M2Q0MDMuODM2ZDkyNi4yNzdkNDA0LjY3MmQ5MjYuMjc3ZDM2OS41OTJkODgzLjI2MmQzNjkuNTkyZDc3NS45MzRkMjMyLjE5NWQ3NzUuOTM0ZDIwOC44MDlkNzc1LjkzNGQyMDAuMDM5ZDc3OS4yNzVkMTkxLjY4NmQ4OTYuNjI2ZDE4OS41OThkOTI3LjExMmQyMDUuNDY4ZDk2Ny42MjFoUjNkNTAyLjgxMlI0ZDQ2My41NTZSNWQyNS40NzRSNmQ0OTIuMzcxUjdkLTAuODM1UjhkNDY2Ljg5N1I5ZDBSMTBkMjgzLjk4UjExaTY2UjEyZDI1LjQ3NFIxM2Q1MDIuODEyUjE0YWkxaTJpM2kzaTJpM2kzaTNpMmkyaTJpMmkzaTNpMmkzaTJpM2kzaTNpMmkyaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTJpMmkxaTNpM2kzaTNpM2kzaTJpM2kzaTFpM2kzaTNpM2kyaTNpMmkyaTNpM2kzaTJpM2kzaTJpM2hnOjE3OG9SMWQ3NDAuMDE5UjJhZDE1NC4xMDFkNzY1LjQ5NGQxNjIuMDM1ZDc0Ny41MzZkMTQxLjE1NGQ3NjguNDE3ZDExNC40MjdkNzY4LjQxN2QxMDUuMjM5ZDc2OC40MTdkOTguMTRkNzUzLjhkODIuNjg4ZDc2Ni4zMjlkMzcuMTY4ZDc2Ni4zMjlkMjYuMzA5ZDc2Ni4zMjlkMTkuMjFkNzY1LjQ5NGQ0Mi41OTdkNzM1Ljg0M2Q5MC42MjNkNjc5LjA0N2QxMDAuMjI4ZDY3NC40NTNkMTE2LjA5N2Q2NjUuNjgzZDExMS4wODZkNjYwLjY3MmQ5OS44MWQ2NjEuMDg5ZDExOS44NTZkNjM4LjEyZDEyMy42MTVkNjM0LjM2MmQxMzQuMDU1ZDYyNC4zMzlkMTUyLjAxM2Q2MTIuNjQ2ZDE0Mi40MDdkNjEzLjQ4MWQxMzUuMzA4ZDYxMy4wNjNkMTU3Ljg1OWQ1NzIuNTU0ZDE1Ny44NTlkNTQ3LjkxNWQxNTcuODU5ZDUwMi44MTJkMTAzLjk4NmQ1MDIuODEyZDg2LjAyOWQ1MDIuODEyZDY5LjMyNGQ1MTMuNjdkNTAuNTMxZDUyNS43ODFkNTAuNTMxZDU0Mi45MDNkNTAuNTMxZDU2Mi4xMTRkNzguMDk0ZDU4MC40ODlkNTAuOTQ5ZDU3NS4wNmQ0MC45MjZkNTY2LjcwN2QyNy41NjJkNTU1Ljg0OWQyNy41NjJkNTI5LjUzOWQyNy41NjJkNTAxLjk3N2Q2My40NzdkNDg1LjY5ZDkyLjI5M2Q0NzIuNzQzZDEyMy42MTVkNDcyLjc0M2QxNTguNjk0ZDQ3Mi43NDNkMTc0Ljk4MmQ0ODYuOTQyZDE0OS45MjRkNDkyLjM3MWQxNTAuMzQyZDQ5Mi43ODlkMTY5Ljk3ZDQ5Ni4xM2QxOTEuNjg2ZDUwMS41NTlkMTkxLjI2OWQ1MDYuOTg4ZDE5MS42ODZkNTEzLjI1MmQyMDcuNTU2ZDUyMC43NjlkMjA3LjU1NmQ1NTAuODM4ZDIwNy41NTZkNTg3LjE3MWQxNTkuMTEyZDY0OS44MTRkMTIzLjYxNWQ2OTUuNzUyZDgwLjE4MmQ3MzUuMDA4ZDExMi4zMzlkNzM3LjA5NmQxMzEuOTY3ZDczNy4wOTZkMjA4LjM5MWQ3MzcuMDk2ZDIwOC4zOTFkNzE3LjA1ZDIwOC4zOTFkNzA3LjAyN2QxODYuNjc1ZDY5MS41NzVkMjI1LjUxM2Q2OTYuNTg3ZDIyNS41MTNkNzI0LjU2N2QyMjUuNTEzZDc2Mi4xNTNkMTU0LjEwMWQ3NjUuNDk0aFIzZDI0NC43MjRSNGQyMjUuNTEzUjVkMTkuMjFSNmQ1NTEuMjU2UjdkMjU1LjU4MlI4ZDUzMi4wNDVSOWQwUjEwZDI4My45OFIxMWkxNzhSMTJkMTkuMjFSMTNkMjQ0LjcyNFIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTJpMmkzaTNpM2kzaTNpM2kzaTNoZzo2NW9SMWQ3NDAuMDE5UjJhZC0zNS40OTdkMTEyMi4xNGQtMjAuMDQ1ZDEwOTYuNjY1ZDI1Ljg5MmQxMDgzLjMwMWQ1MC4xMTRkMTAyMS45MTFkNTAuOTQ5ZDEwMjAuMjQxZDc4LjUxMmQ5MTkuMTc3ZDExNi41MTVkODkyLjQ1ZDg4LjExN2Q4NzkuOTIxZDExOC42MDNkNzk3LjY1ZDE0Ny4wMDFkNzk1LjU2MmQxNDAuNzM3ZDc2Mi41N2QxNDUuMzMxZDc0OC43ODlkMTYzLjcwNmQ2OTUuNzUyZDE3Ny4wN2Q2NTYuOTEzZDE5Ni42OThkNjMzLjEwOWQyNDcuNjQ3ZDYyNi40MjdkMTg4Ljc2M2Q2MDYuNzk5ZDIxNy4xNjFkNTgwLjQ4OWQyMjguODU0ZDUzMS42MjhkMjYwLjU5M2Q1NjUuNDU1ZDI0OC45ZDUyMS4xODdkMjczLjUzOWQ1MjQuOTQ2ZDM1Ny40ODFkNzQyLjk0MmQ0NDQuMzQ1ZDk2OC4wMzlkNDU4LjEyN2Q5NzguODk3ZDQ3NS4yNDlkOTkyLjI2MWQ1MTQuMDg4ZDEwMTMuMTQxZDUxMy42N2QxMDIxLjQ5NGQ1MDMuNjQ3ZDEwMjEuNDk0ZDQ4My44MWQxMDIwLjI0MWQ0NjMuOTczZDEwMTguOTg4ZDQ1My45NTFkMTAxOC45ODhkNDQyLjY3NWQxMDIyLjMyOWQ0NDcuNjg2ZDEwMzIuMzUyZDQ0My45MjhkMTAzNC4wMjJkMzMzLjY3NmQxMDIxLjkxMWQyNzUuNjI4ZDEwMjEuOTExZDI2My45MzRkMTAyMS45MTFkMjU0LjMyOWQxMDIyLjMyOWQyNzIuMjg3ZDEwMDAuNjEzZDMzNC4wOTRkOTc5LjczMmQzMzcuODUzZDk3MS4zOGQzMzIuMDA2ZDk0OS4yNDZkMzIxLjE0OGQ5MjUuMDI0ZDM2Ny41MDRkODgyLjQyN2QzMDcuMzY3ZDg5MC43NzlkMjkxLjkxNWQ4NTkuNDU4ZDI0Ny42NDdkODQ5LjAxN2QyMjAuMDg0ZDg0OS4wMTdkMTkwLjQzM2Q4NDkuMDE3ZDE2MS4yZDg1OS4wNGQxMjUuNzAzZDk1MC4wODFkMTA4LjE2M2Q5OTQuNzY2ZDk5LjM5M2QxMDQzLjYyOGQxMDQuODIyZDEwNTcuNDA5ZDEwNy43NDVkMTA1OC42NjJkMTExLjkyMWQxMDU4LjY2MmQxMTcuMzVkMTA1OC42NjJkMTI4LjQxN2QxMDU1LjMyMWQxMzkuNDg0ZDEwNTEuOThkMTQ0LjkxM2QxMDUxLjk4ZDE1NS43NzFkMTA1MS45OGQxNjguM2QxMDYzLjI1NmQxNjMuMjg4ZDEwNzIuNDQzZDE1OS45NDdkMTA3Mi40NDNkMTQ1LjMzMWQxMDcyLjQ0M2QxMTUuMDUzZDEwODEuNDIyZDg0Ljc3NmQxMDkwLjQwMWQ2OC40ODlkMTA4OS4xNDhkODEuMDE3ZDEwOTUuODNkODYuODY0ZDExMDIuNTEyZDcyLjI0N2QxMTA3Ljk0MWQzMS43MzhkMTExNS40NThkLTEwLjAyMmQxMTIyLjk3NWQtMjMuODA0ZDExMjIuNTU3ZC0zNS40OTdkMTEyMi4xNGQxNzUuODE3ZDgxMi42ODVkMTg2LjY3NWQ4MTYuMDI2ZDE5OC43ODZkODE2LjAyNmQyMTEuNzMyZDgxNi4wMjZkMjcwLjE5OWQ4MDEuODI3ZDI2MC41OTNkNzY4LjQxN2QyMjkuNjlkNjY5LjQ0MmQxNzUuODE3ZDgxMi42ODVoUjNkNDk5LjA1M1I0ZDUxNC4wODhSNWQtMzUuNDk3UjZkNTAyLjgxMlI3ZC05OC45NzVSOGQ1MzguMzA5UjlkMFIxMGQyODMuOThSMTFpNjVSMTJkLTM1LjQ5N1IxM2Q0OTkuMDUzUjE0YWkxaTJpM2kzaTJpMmkyaTJpMmkzaTNpMmkyaTNpMmkyaTNpM2kzaTJpM2kzaTJpMmkyaTNpM2kyaTJpMmkzaTJpMmkyaTNpM2kyaTNpMmkzaTNpM2kzaTJpMmkzaTNpM2kzaTNpMmkxaTNpM2kzaTJoZzoxNzdvUjFkNzQwLjAxOVIyYWQ2OC40ODlkNzUzLjhkMTExLjkyMWQ3NjQuMjQxZDE0MC43MzdkNzY0LjI0MWQxNjcuODgyZDc2NC4yNDFkMjEyLjE1ZDc1My44ZDIxNC42NTVkNzM3LjUxM2QyMjcuMTg0ZDczNy41MTNkMjMwLjk0MmQ3MzUuODQzZDIyMy40MjVkNzI3LjQ5MWQyMTUuOTA4ZDcxNi4yMTVkMjE3LjE2MWQ2OTMuNjYzZDIxNy4xNjFkNjcyLjM2NWQyMTcuMTYxZDYyOS4zNWQyMTIuMTVkNTkwLjUxMmQyNzEuMDM0ZDU5MC41MTJkMjY1LjE4N2Q2NDIuNzE0ZDI2NS4xODdkNjgzLjIyM2QyNjUuMTg3ZDcyNC4xNWQyNzEuMDM0ZDc1My44ZDMxNC44ODRkNzYyLjE1M2QzNDUuNzg3ZDc2Mi4xNTNkMzc4Ljc3OWQ3NjIuMTUzZDQxNS45NDdkNzUzLjhkNDE1Ljk0N2Q3NzAuNTA1ZDM2Ny4wODZkNzkxLjgwNGQ0MTUuOTQ3ZDc4Ni43OTJkNDE1Ljk0N2Q4MTIuMjY3ZDM3OC43NzlkODA0Ljc1ZDM0NS4zN2Q4MDQuNzVkMzE0LjQ2NmQ4MDQuNzVkMjcxLjAzNGQ4MTIuMjY3ZDI2NC4zNTJkODUzLjYxMWQyNjQuMzUyZDg5NC4xMmQyNjQuMzUyZDkxMi4wNzhkMjY1LjYwNWQ5MjkuNjE4ZDM2Ny45MjFkOTI5LjJkMzcyLjA5N2Q5MjkuMmQzOTcuOTlkOTMwLjg3MWQzOTcuNTcyZDkzMi45NTlkMzk3LjU3MmQ5MzcuNTUzZDQxNS4xMTJkOTQyLjE0NmQ0MDguNDNkOTUxLjMzNGQ0MDEuNzQ4ZDk2MC4xMDRkMzk5LjI0M2Q5NjUuNTMzZDM5OS4yNDNkOTgwLjk4NWQzNTEuMjE2ZDk4MC45ODVkMzIzLjIzNmQ5NjMuODYyZDMxMS45NmQ5ODAuOTg1ZDg0LjM1OGQ5ODEuNDAyZDg1LjYxMWQ5NzkuMzE0ZDEwMC4yMjhkOTY5LjcwOWQ5NS42MzRkOTY4LjQ1NmQ5MC42MjNkOTYwLjkzOWQ4NS42MTFkOTYzLjQ0NWQ3Ni4wMDZkOTY3LjIwM2Q4Ni44NjRkOTMwLjAzNWQyMTcuOTk2ZDkyOS42MThkMjE4LjgzMWQ5MTQuNTg0ZDIxOC44MzFkODk3Ljg3OWQyMTguODMxZDg1MC42ODhkMjEyLjE1ZDgxMi4yNjdkMTgyLjkxNmQ4MDcuNjczZDEyMC42OTFkNzkwLjEzM2QxMjcuMzczZDc5NS41NjJkMTM1LjMwOGQ4MDUuMTY4ZDEwOC41OGQ4MDUuMTY4ZDY4LjQ4OWQ4MTIuMjY3ZDY4LjQ4OWQ3NTMuOGhSM2Q0NzMuNTc5UjRkNDE1Ljk0N1I1ZDY4LjQ4OVI2ZDQzMy40ODdSN2Q0Mi41OTdSOGQzNjQuOTk4UjlkMFIxMGQyODMuOThSMTFpMTc3UjEyZDY4LjQ4OVIxM2Q0NzMuNTc5UjE0YWkxaTNpM2kyaTJpMmkzaTNpM2kyaTNpM2kzaTNpMmkyaTJpMmkzaTNpM2kzaTJpM2kyaTNpM2kzaTJpMmkyaTJpM2kzaTNpMmkyaTNpM2kzaTNpM2kyaGc6NjRvUjFkNzQwLjAxOVIyYWQzMzUuNzY1ZDc2NC42NTlkMjUyLjY1OWQ3NzEuNzU4ZDI1Mi42NTlkODI2Ljg4NGQyMzEuNzc4ZDg0MC4yNDdkMjM3LjYyNGQ4MzkuODNkMjQzLjA1M2Q4MzkuODNkMjQ4LjlkODM5LjgzZDI1NS41ODJkODQwLjI0N2QyNTEuNDA2ZDg0Mi43NTNkMjQ4LjA2NWQ4NDYuOTI5ZDI1My40OTRkODQ2LjkyOWQyNjAuNTkzZDg0OC4xODJkMjY3LjY5M2Q4NTYuMTE3ZDI3OC41NTFkODU2LjExN2QzMDIuMzU1ZDg1Ni4xMTdkMzE5LjI2OWQ4NDEuNWQzMzYuMTgyZDgyNi44ODRkMzM2LjE4MmQ4MDMuNDk3ZDMzNi4xODJkNzczLjQyOWQzMzUuNzY1ZDc2NC42NTlkMzYyLjQ5MmQ1MzEuNjI4ZDQ1MS40NDVkNTMxLjYyOGQ0NTEuNDQ1ZDU3MC4wNDhkNDUxLjQ0NWQ1ODkuMjU5ZDQxMS4zNTNkNjQ5LjgxNGQzNzEuMjYyZDcxMC4zNjhkMzcxLjI2MmQ3MTIuMDM5ZDM3MS4yNjJkNzUwLjQ2ZDM3Ny41MjZkNzkwLjEzM2QzODcuMTMyZDg1MC42ODhkNDA0LjI1NGQ4NTEuMTA2ZDQxMy40NDJkODQyLjc1M2Q0MTguNDUzZDgyNS4yMTNkNDEzLjAyNGQ4MTEuNDMyZDQyMy4wNDdkODE2LjQ0M2Q0MjguMDU4ZDgzMS4wNmQ0MjguMDU4ZDg0My41ODhkNDI4LjA1OGQ4ODAuNzU2ZDM4Ni43MTRkODgwLjc1NmQzNzAuMDA5ZDg4MC43NTZkMzYxLjIzOWQ4NjguNjQ2ZDM1Ny44OThkODY0Ljg4N2QzNDguMjkzZDg0MS45MThkMzI1Ljc0MmQ4ODIuNDI3ZDI0OS43MzVkODgyLjQyN2QxODkuNTk4ZDg4Mi40MjdkMTg5LjU5OGQ4MzUuMjM2ZDE5NC4xOTJkODE1LjYwOGQyMTUuOTA4ZDgwNS41ODVkMjAyLjk2MmQ4MDAuNTc0ZDIxNS4wNzNkNzk0LjcyN2QyMTguODMxZDc4Ni43OTJkMjQ2LjM5NGQ3NzkuMjc1ZDI0NS41NTlkNzgwLjExZDIzNC43MDFkNzc2LjM1MmQyMzUuMTE5ZDc3NS41MTdkMjU1LjU4MmQ3NjMuODIzZDMzNS43NjVkNzM0LjE3MmQzMzYuMTgyZDcxMS4yMDNkMzY0Ljc4OWQ2NTcuNzQ4ZDM5My4zOTZkNjA0LjI5M2QzOTMuMzk2ZDU5MC41MTJkMzkzLjM5NmQ1NTkuMTlkMzM1LjM0N2Q1NTkuMTlkMjQ4LjlkNTU5LjE5ZDE5Ni4yOGQ1OTUuNTIzZDEzNC44OWQ2MzcuNzAzZDEzNC44OWQ3MjAuMzkxZDEzNC44OWQ3NzcuNjA1ZDE2MS42MThkODU2LjExN2QxNTUuNzcxZDg1OS4wNGQxMzYuMTQzZDg1MC42ODhkMTI4LjYyNmQ4NTUuNjk5ZDEzMy4yMmQ4NzQuOTFkMTU0LjEwMWQ4ODkuOTQ0ZDE2Ny4wNDdkODk5LjEzMmQxOTAuMDE2ZDkxNS40MTlkMjAyLjU0NGQ5MjQuMTg5ZDIyMC45MmQ5NTAuNDk5ZDIzOS4yOTVkOTc2LjgwOWQyNTIuNjU5ZDk4NS45OTZkMjczLjEyMmQ5OTkuNzc4ZDMxMC4yOWQ5OTkuNzc4ZDM4MC40NWQ5OTkuNzc4ZDQzNS43ODRkOTQ3LjU3NWQ0OTEuMTE5ZDg5NS4zNzNkNDkxLjExOWQ4MjYuMDQ4ZDQ5MS4xMTlkNzY4LjQxN2Q0MzkuMzM0ZDcxMy4yOTJkNDYzLjEzOGQ3MTYuNjMyZDQ5My42MjRkNzQyLjk0MmQ1MjUuNzgxZDc3MC41MDVkNTI1Ljc4MWQ3OTIuNjM5ZDUyNS43ODFkMTAyOS44NDZkMjk2LjA5MWQxMDI5Ljg0NmQyMzkuNzEyZDEwMjkuODQ2ZDE4My4xMjVkMTAwMi45MWQxMjYuNTM4ZDk3NS45NzNkOTEuMDRkOTMyLjU0MWQ5OC45NzVkOTMzLjc5NGQxMDkuNDE1ZDkzMy43OTRkMTM0Ljg5ZDkzMC40NTNkMTEzLjE3NGQ5MjYuMjc3ZDY3LjY1NGQ4OTcuNDYxZDUwLjExNGQ4NjEuNTQ2ZDUwLjExNGQ3ODkuNzE2ZDUwLjExNGQ3OTUuNTYyZDQyLjE3OWQ3NTEuMjk1ZDU0LjI5ZDc1MS4yOTVkOTkuMzkzZDc1NC42MzZkMTAwLjIyOGQ3NTAuMDQyZDEwMC4yMjhkNzM1Ljg0M2Q0OC4wMjZkNzE0LjEyN2Q5Ni4wNTJkNTMxLjYyOGQzNjIuNDkyZDUzMS42MjhoUjNkNTcyLjEzN1I0ZDUyNS43ODFSNWQ0Mi4xNzlSNmQ0OTIuMzcxUjdkLTUuODQ2UjhkNDUwLjE5MlI5ZDBSMTBkMjgzLjk4UjExaTY0UjEyZDQyLjE3OVIxM2Q1NzIuMTM3UjE0YWkxaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkxaTNpM2kzaTNpM2kyaTJpMmkyaTNpM2kzaTNpM2kzaTJpMmkyaTNpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNoZzoxNzZvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNzZSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjYzb1IxZDc0MC4wMTlSMmFkMTIxLjk0NGQ4NzguNjY4ZDEyOS4wNDRkODgxLjU5MmQxMzguNjQ5ZDg4MS41OTJkMTQ4LjY3MmQ4ODEuNTkyZDE2MS4yZDg3OC42NjhkMTMzLjIyZDg5OS45NjdkMTA4LjE2M2Q4OTkuOTY3ZDY0LjMxM2Q4OTkuOTY3ZDY0LjMxM2Q4NzIuNDA0ZDY0LjMxM2Q4NjAuMjkzZDcwLjM2OGQ4MzYuNjk4ZDc2LjQyNGQ4MTMuMTAyZDc2LjQyNGQ4MDAuOTkxZDc2LjQyNGQ3ODcuNjI4ZDczLjA4M2Q3NjQuMjQxZDY4LjkwN2Q3MzUuMDA4ZDY4LjQ4OWQ3MjcuOTA4ZDcwLjU3N2Q3MjQuNTY3ZDEyNy4zNzNkNzQ4LjM3MWQxNzYuNjUyZDc0OC4zNzFkMjQwLjk2NWQ3NDguMzcxZDI0MC45NjVkNjkxLjE1OGQyNDAuOTY1ZDU5OS42OTlkMTU0LjUxOGQ1NzkuMjM2ZDEzOS4wNjZkNTc1LjQ3N2Q3NS4xNzFkNTYxLjY5NmQ3Mi42NjVkNTYyLjk0OWQ3Mi42NjVkNTY2LjcwN2Q4MC4xODJkNTcxLjcxOWQ4OS43ODdkNTc3Ljk4M2Q5MC42MjNkNTc4LjgxOGQ2OC45MDdkNTk1LjEwNmQ2OC45MDdkNjA1Ljk2NGQ2OC45MDdkNjE4LjQ5MmQ4My45NDFkNjMxLjAyMWQ5MS44NzZkNjM3LjcwM2QxMDguMTYzZDY0OS44MTRkODUuNjExZDY0OS44MTRkNTYuNzk2ZDYzNi40NWQyMy4zODZkNjIwLjk5OGQyMy4zODZkNjAxLjM3ZDIzLjM4NmQ1MjkuNTM5ZDEwMS40ODFkNTI5LjUzOWQxODQuNTg3ZDUyOS41MzlkMjM0LjI4M2Q1NzUuNDc3ZDI4NS42NWQ2MjIuNjY4ZDI4NS42NWQ3MDQuOTM5ZDI4NS42NWQ3NTAuMDQyZDIzNS41MzZkNzczLjg0NmQxOTYuMjhkNzkyLjYzOWQxNDQuMDc4ZDc5My40NzRkMTIxLjUyNmQ3OTMuODkyZDExNy43NjhkODEzLjEwMmQxMTEuOTIxZDg1MC42ODhkMTE0LjAwOWQ4NTQuNDQ2ZDEyNi41MzhkODM5LjgzZDEyNi45NTVkODQwLjY2NWQxMjYuOTU1ZDg1MS41MjNkMTIxLjk0NGQ4NzguNjY4ZDEwMS44OThkOTQ2LjMyM2QxNDUuMzMxZDk0Ni4zMjNkMTQ1LjMzMWQ5ODkuMzM3ZDE0NS4zMzFkMTAzMS4wOTlkMTAxLjg5OGQxMDMxLjA5OWQ3NC43NTNkMTAzMS4wOTlkNjkuMzI0ZDEwMTQuODEyZDgxLjg1M2Q5ODkuNzU1ZDgzLjEwNmQ5ODguOTJkODMuMTA2ZDk4My40OTFkNzQuNzUzZDk4My40OTFkNjIuMjI1ZDk4My40OTFkNTguMDQ4ZDk4Mi4yMzhkNTguMDQ4ZDk3OC40NzlkNTguMDQ4ZDk0Ni4zMjNkMTAxLjg5OGQ5NDYuMzIzaFIzZDMxNi41NTRSNGQyODUuNjVSNWQyMy4zODZSNmQ0OTQuNDZSN2QtNy4wOTlSOGQ0NzEuMDczUjlkMFIxMGQyODMuOThSMTFpNjNSMTJkMjMuMzg2UjEzZDMxNi41NTRSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTJpMmkzaTFpM2kzaTNpM2kzaTJpM2kzaGc6MTc1b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTc1UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2Mm9SMWQ3NDAuMDE5UjJhZDAuODM1ZDkzMC4wMzVkMjAyLjEyN2Q4NDIuNzUzZDE5OC43ODZkODI4LjEzN2QyMjkuNjlkODMwLjY0MmQzNDYuMjA1ZDc4MC4xMWQzNDQuOTUyZDc4MC41MjhkMzQzLjY5OWQ3ODAuNTI4ZDMzOC42ODhkNzgwLjUyOGQyOTMuNTg1ZDc1OS40MzhkMjQ4LjQ4MmQ3MzguMzQ5ZDIyOS42OWQ3MzguMzQ5ZDIyMS4zMzdkNzM4LjM0OWQyMTUuNDkxZDc0MC44NTRkMjIzLjQyNWQ3MjkuMTYxZDIxNS4wNzNkNzIyLjg5N2QyMDMuMzhkNzIyLjg5N2QxOTcuMTE1ZDcyMi44OTdkMTkwLjQzM2Q3MjQuNTY3ZDE3MC44MDVkNzA3LjAyN2QxNTcuODU5ZDcxNC45NjJkMTM4LjIzMWQ2ODEuOTdkMC44MzVkNjM0Ljc3OWQyMi4xMzNkNjU5LjQxOWQyMi4xMzNkNjc2LjU0MWQyMi4xMzNkNjgzLjIyM2QxOS42MjhkNjg5LjkwNWQyMjMuNDI1ZDc4MC4xMWQxODguNzYzZDc5MS44MDRkMTUwLjc2ZDgxMS44NDlkOTkuODFkODM4LjU3N2Q4OC41MzVkODU5LjA0ZDkwLjIwNWQ4NDEuMDgzZDIxLjcxNmQ4NzEuOTg2ZDI0LjIyMWQ4ODYuMTg1ZDI0LjIyMWQ5MTIuMDc4ZDAuODM1ZDkzMC4wMzVoUjNkMzg2LjcxNFI0ZDM0Ni4yMDVSNWQwLjgzNVI2ZDM4OS4yMlI3ZDkzLjk2NFI4ZDM4OC4zODRSOWQwUjEwZDI4My45OFIxMWk2MlIxMmQwLjgzNVIxM2QzODYuNzE0UjE0YWkxaTJpMmkyaTJpM2kzaTNpM2kyaTNpM2kyaTJpM2kzaTNpMmkzaTNpMmkyaTJpM2hnOjE3NG9SMWQ3NDAuMDE5UjJhZDgwOC4wOTFkNzQ3Ljk1NGQ4MDYuODM4ZDc1MS43MTJkODA1LjE2OGQ3NDMuMzZkNzg3LjIxZDc4NC4yODdkNzY0LjI0MWQ3ODQuMjg3ZDc1My44ZDc4NC4yODdkNzMzLjMzN2Q3NzguMjMxZDcxMi44NzRkNzcyLjE3NmQ3MDIuNDMzZDc3Mi4xNzZkNjkwLjc0ZDc3Mi4xNzZkNjQxLjQ2MWQ3OTUuOThkNTg1LjA4M2Q4MjMuMTI1ZDU3MC44ODRkODI3LjMwMWQ1NjUuODcyZDc4OC4wNDVkNTY1Ljg3MmQ3NzIuMTc2ZDU2NS44NzJkNzUxLjcxMmQ1NzAuODg0ZDc0My4zNmQ1OTAuNTEyZDc0MS4yNzJkNjIwLjE2M2Q3MjcuMDczZDY2OC4xODlkNzA0LjEwNGQ2NzYuOTU5ZDYyNi40MjdkNzMzLjc1NWQ2MjYuNDI3ZDc3MS4zNGQ2MjYuNDI3ZDc3MS4zNGQ2NjkuODU5ZDc3MS4zNGQ2ODEuNTUzZDc2OC40MTdkNjk3LjAwNGQ3OTEuODA0ZDcwMS4xODFkODAwLjU3NGQ3MTIuODc0ZDgwOC4wOTFkNzIzLjMxNGQ4MDguMDkxZDc0Ny45NTRkNjI2LjQyN2Q2MTQuNzM0ZDYyNi40MjdkNjU1LjY2ZDYwMy40NThkNjg2Ljk4MmQ1ODAuNDg5ZDcxOC4zMDNkNTYwLjg2MWQ3NDUuODY2ZDU1Mi4wOTFkNzYyLjE1M2Q1NTIuMDkxZDc4OS4yOThkNTUyLjA5MWQ4MDEuODI3ZDU1NC44MDVkODI3LjMwMWQ1NTcuNTJkODUyLjc3NmQ1NTcuNTJkODY1LjMwNWQ1NTcuNTJkODkwLjc3OWQ1MDYuNTdkOTIzLjM1M2Q0NTguNTQ0ZDk1My44NGQ0MzEuMzk5ZDk1My44NGQzODEuMjg1ZDk1My44NGQzMjcuODNkOTMxLjI4OGQyNjIuMjY0ZDkwMy43MjVkMjYyLjI2NGQ4NjEuOTY0ZDI2Mi4yNjRkODQ4LjZkMjY2LjAyMmQ4MjEuODcyZDI2OS43ODFkNzk1LjE0NWQyNjkuNzgxZDc4MS43ODFkMjY5Ljc4MWQ3NTUuODg5ZDI0OS4zMThkNzMxLjY2N2QyMTAuODk3ZDY4Ni41NjRkMTkwLjAxNmQ2NTMuOTlkMTkwLjAxNmQ2MDcuNjM0ZDE5MC4wMTZkNTIyLjQ0ZDI1NC43NDdkNDY2Ljg5N2QzMTYuMTM3ZDQxNC4yNzdkNDAyLjU4NGQ0MTQuMjc3ZDQ5Ni41NDhkNDE0LjI3N2Q1NTkuMTlkNDY2LjQ3OWQ2MjYuNDI3ZDUyMi40NGQ2MjYuNDI3ZDYxNC43MzRkODAxLjgyN2QxMDAxLjg2NmQ4MDEuODI3ZDEwMjkuODQ2ZDc2MS4zMThkMTA0MS45NTdkNzY5LjI1MmQxMDU5LjQ5N2Q3NjkuMjUyZDEwNzIuNDQzZDc2OS4yNTJkMTEwNC4xODJkNzI5LjE2MWQxMTA0LjE4MmQ2OTEuNTc1ZDExMDQuMTgyZDY4MS41NTNkMTA4NS4zODlkNjY4LjE4OWQxMDM1LjI3NWQ2NDUuNjM3ZDEwMjYuMDg4ZDUwMC43MjRkOTU0LjY3NWQ1MDQuOWQ5NDguODI4ZDUwOC4yNDFkOTQxLjcyOWQ1MTMuNjdkOTM4LjM4OGQ1MzguMzA5ZDkxOS41OTVkNTU4Ljc3M2Q5MDQuMTQzZDU2Ny41NDNkOTA0LjE0M2Q1ODIuMTU5ZDkwNC4xNDNkNjk0LjkxNmQ5NjcuMjAzZDcxNy4wNWQ5NTIuMTY5ZDc0MS4yNzJkOTUyLjE2OWQ3NjQuNjU5ZDk1Mi4xNjlkNzgyLjE5OWQ5NjUuMTE1ZDgwMS44MjdkOTc5LjMxNGQ4MDEuODI3ZDEwMDEuODY2ZDI1MC4xNTNkNzQ2LjcwMWQyNTAuMTUzZDgyMS44NzJkMjM3LjIwN2Q4MjEuODcyZDIzMy44NjZkODIxLjg3MmQxODUuNDIyZDc5Ny4yMzNkMTI2LjEyZDc2Ny4xNjRkMTI0LjAzMmQ3NjcuNTgyZDk2Ljg4N2Q3NzcuNjA1ZDc0LjMzNmQ3ODUuOTU3ZDcwLjU3N2Q3ODUuOTU3ZDQ4Ljg2MWQ3ODUuOTU3ZDM0LjAzNWQ3NjkuMDQ0ZDE5LjIxZDc1Mi4xM2QxOS4yMWQ3MzAuNDE0ZDE5LjIxZDcxMi40NTZkMzEuNzM4ZDcwNC4xMDRkMzguNDJkNjk5LjUxZDU5LjcxOWQ2OTMuNjYzZDUxLjc4NGQ2NzcuMzc2ZDUxLjc4NGQ2NjEuOTI0ZDUxLjc4NGQ2MjYuODQ1ZDg5LjM3ZDYyNi44NDVkMTQ2LjU4NGQ2MjYuODQ1ZDE1Mi44NDhkNzA0LjEwNGQyMTUuOTA4ZDczMi45MmQyNTAuMTUzZDc0Ni43MDFkMzIwLjMxM2Q5NTEuMzM0ZDI3Ni4wNDVkOTY4LjQ1NmQyNDIuMjE4ZDk4Mi4yMzhkMTg1LjQyMmQxMDA1LjYyNGQxNjIuODcxZDEwMjQuODM1ZDE1Ni42MDZkMTAzMC4yNjRkMTM5LjQ4NGQxMDcxLjYwOGQxMjcuMzczZDExMDAuODQxZDk2LjQ2OWQxMTAwLjg0MWQ3OS4zNDdkMTEwMC44NDFkNjYuNDAxZDEwOTEuMjM2ZDUxLjc4NGQxMDgwLjc5NmQ1MS43ODRkMTA2NC4wOTFkNTEuNzg0ZDEwNTEuMTQ1ZDU5LjcxOWQxMDM1LjI3NWQyMS43MTZkMTAyMi43NDdkMjEuNzE2ZDk5My4wOTZkMjEuNzE2ZDk3MS43OTdkMzguMjEyZDk1Ny41OThkNTQuNzA3ZDk0My4zOTlkNzYuNDI0ZDk0My4zOTlkODEuODUzZDk0My4zOTlkMTAyLjczNGQ5NTQuMjU3ZDEyMy42MTVkOTY1LjExNWQxMjYuMTJkOTY1LjExNWQxMzIuODAyZDk2NS4xMTVkMTgzLjc1MmQ5MzQuNjI5ZDIzNC43MDFkOTA0LjE0M2QyNDQuNzI0ZDkwNC4xNDNkMjYyLjI2NGQ5MDQuMTQzZDI4Ny43MzhkOTE5LjgwNGQzMTMuMjEzZDkzNS40NjRkMzIwLjMxM2Q5NTEuMzM0ZDUyMy42OTNkNzMxLjI0OWQ1MzMuMjk4ZDcyNS40MDJkNTUwLjgzOGQ3MTEuNjIxZDU0NS40MDlkNzA3Ljg2MmQ1MjQuMTFkNjkxLjU3NWQ1MTAuMzI5ZDY4MS4xMzVkNDg5LjQ0OGQ2NDMuOTY3ZDQ2MC4yMTVkNTkxLjc2NWQ1MDkuNDk0ZDU3Ni43M2Q1MDkuNDk0ZDUzNC41NTFkNTA5LjQ5NGQ1MDMuMjNkNDgyLjc2NmQ0ODYuMTA3ZDQ1OS43OTdkNDcxLjA3M2Q0MjYuODA1ZDQ3MS4wNzNkMzAwLjY4NWQ0NzEuMDczZDI5Ni41MDhkNDk1LjcxMmQzMTUuMzAxZDQ4Ny43NzhkMzE4LjIyNWQ0ODkuNDQ4ZDMyOS41ZDQ5Mi4zNzFkMzM0LjUxMmQ0OTYuNTQ4ZDMzNy4wMTdkNTAyLjgxMmQzMjcuODNkNTA4LjI0MWQzMzYuNmQ1MDguMjQxZDM1My43MjJkNTA4LjY1OWQzNDcuMDRkNTEyZDMzNS4zNDdkNTIwLjM1MmQzNDAuMzU4ZDUyNC45NDZkMzM5Ljk0MWQ1MjUuMzYzZDM0MC4zNThkNTI1Ljc4MWQzMzQuMDk0ZDUyNy40NTFkMzMwLjMzNmQ1MjkuNTM5ZDMzNy40MzVkNTQ0LjE1NmQzMzcuMDE3ZDU0NC41NzRkMzMwLjMzNmQ1NDEuNjVkMzI5LjkxOGQ1NTUuODQ5ZDMzMi4wMDZkNTc0LjIyNWQzNTAuMzgxZDU3MS4zMDFkMzQ0LjExN2Q1NzguODE4ZDMzMy42NzZkNTk1LjEwNmQzMzQuOTI5ZDU5OC4wMjlkMzU2LjY0NmQ2MTEuMzkzZDMyOS45MThkNjA2LjM4MWQzMjkuNWQ2MDYuNzk5ZDMyOS41ZDYxMS44MWQzMzUuMzQ3ZDYyMC4xNjNkMzQyLjAyOWQ2MzAuMTg1ZDM0My42OTlkNjMyLjY5MWQzMzguNjg4ZDYzMS4wMjFkMzMxLjU4OGQ2MzAuNjAzZDMzNS4zNDdkNjM2Ljg2N2QzMzUuMzQ3ZDY5NC40OTlkMzMyLjQyNGQ3MzkuNjAxZDMxOC42NDJkNzQ3Ljk1NGQyOTYuNTA4ZDc2OGQzMDEuOTM4ZDc3Mi41OTNkMzQ2LjYyM2Q3NTUuODg5ZDQwNy4xNzdkNzU1Ljg4OWQ0MjEuMzc2ZDc1MS43MTJkNDEyLjYwNmQ3NDIuNTI1ZDQwMC45MTNkNzQxLjI3MmQzODAuNDVkNzM1LjQyNWQzODAuNDVkNTk4Ljg2NGQzOTUuOTAyZDU5OC40NDZkNDIwLjEyM2Q1OTcuNjExZDQ0My41MWQ2NDguOTc4ZDQ1MS40NDVkNjY3LjM1M2Q0NzUuNjY3ZDcyMC44MDlkNDc4LjU5ZDcyMS42NDRkNDg5LjAzZDcxMS4yMDNkNDk2LjU0OGQ3MTEuMjAzZDUxMy4yNTJkNzExLjIwM2Q1MjAuMzUyZDcwNC45MzlkNTMyLjA0NWQ3MDkuNTMzZDUzNy44OTJkNzE0Ljk2MmQ1MzEuNjI4ZDcxOS41NTZkNTIzLjY5M2Q3MzEuMjQ5ZDQ2Ny4zMTRkNTYzLjc4NGQ0NTAuMTkyZDU2MS4yNzhkNDQ5LjM1N2Q1NjIuNTMxZDQ0Ny4yNjlkNTY1LjQ1NWQ0MzguMDgxZDU4MS4zMjRkMzkwLjQ3M2Q1ODEuMzI0ZDM4OC4zODRkNTg1LjVkMzg0LjYyNmQ1OTAuMDk0ZDM4My4zNzNkNTg3LjU4OGQzODAuODY3ZDU4NC42NjVkMzc3Ljk0NGQ1ODQuNjY1ZDM3MC40MjdkNTkxLjM0N2QzNzYuNjkxZDU4NS4wODNkMzg1LjA0NGQ1NzQuMjI1ZDM4NC4yMDhkNTczLjgwN2QzODQuMjA4ZDU1OS42MDhkMzg1LjA0NGQ1MzEuMjFkMzg1Ljg3OWQ1MDIuODEyZDM4NS44NzlkNDg4LjYxM2QzOTEuNzI1ZDQ4Ny43NzhkNDAwLjQ5NWQ0ODcuNzc4ZDQzMC41NjRkNDg3Ljc3OGQ0NDEuODRkNDk0LjA0MmQ0NTguMTI3ZDUwMy4yM2Q0NTguMTI3ZDUzMC4zNzVkNDU4LjEyN2Q1NDAuODE1ZDQ1MS40NDVkNTQ4LjMzMmQ0NTEuNDQ1ZDU0OS4xNjhkNDY3LjMxNGQ1NjMuNzg0aFIzZDgyNy4zMDFSNGQ4MDguMDkxUjVkMTkuMjFSNmQ2MDkuNzIyUjdkLTgwLjE4MlI4ZDU5MC41MTJSOWQwUjEwZDI4My45OFIxMWkxNzRSMTJkMTkuMjFSMTNkODI3LjMwMVIxNGFpMWkyaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kyaTNpM2kzaTNpMmkzaTNpMmkzaTNpMmkyaTJpM2kyaTJpMmkzaTJpM2kzaTJpMmkzaTNpM2kyaTNpM2kyaTNpMmkyaTNpMmkyaTNpM2kyaTNpM2kzaTNpMWkyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkyaGc6NjFvUjFkNzQwLjAxOVIyYWQ1NS41NDNkNjg0LjQ3NmQxNTQuOTM2ZDY4NC4wNThkMTg3LjUxZDcwNy4wMjdkMTc3LjkwNWQ2ODQuMDU4ZDM1MC43OTlkNjgzLjY0MWQzNTUuODFkNjgzLjY0MWQzNzMuMzVkNjg0Ljg5M2QzNzUuODU2ZDY5Mi40MTFkMzg1Ljg3OWQ2OTcuMDA0ZDM3NS40MzhkNzE3LjA1ZDM3NC4xODVkNzIwLjM5MWQzNzQuMTg1ZDczNS44NDNkMzM4LjY4OGQ3MzUuODQzZDMxNy4zODlkNzE4LjMwM2QzMDkuMDM3ZDczNS44NDNkNTQuMjlkNzM2LjI2MWQ1Ni4zNzhkNzMzLjc1NWQ2NS45ODNkNzI0Ljk4NWQ2My40NzdkNzIxLjY0NGQ1OC40NjZkNzE1LjM4ZDU1LjEyNWQ3MTcuODg1ZDQ4LjAyNmQ3MjEuNjQ0ZDU1LjU0M2Q2ODQuNDc2ZDM4MC4wMzJkODc1LjMyN2QyODEuMDU3ZDg3NS43NDVkMjQ4LjQ4MmQ4NTIuNzc2ZDI1OC4wODhkODc1Ljc0NWQ4NS4xOTRkODc2LjE2M2Q3OS43NjVkODc2LjE2M2Q2Mi4yMjVkODc0LjkxZDYwLjEzN2Q4NjcuMzkzZDQ5LjY5NmQ4NjIuNzk5ZDYwLjk3MmQ4NDIuNzUzZDYxLjgwN2Q4MzkuODNkNjEuODA3ZDgyMy45NmQ5Ny4zMDVkODIzLjk2ZDExOC42MDNkODQxLjVkMTI2LjUzOGQ4MjMuOTZkMzgxLjcwM2Q4MjMuNTQzZDM4MC44NjdkODI1LjIxM2QzNjkuNTkyZDgzNS4yMzZkMzcyLjkzM2Q4MzcuMzI0ZDM3NC4xODVkODM5LjgzZDM3Ny4xMDlkODQ0LjQyNGQzODAuODY3ZDg0MS45MThkMzg3Ljk2N2Q4MzguMTU5ZDM4MC4wMzJkODc1LjMyN2hSM2Q0MzIuNjUyUjRkMzg3Ljk2N1I1ZDQ4LjAyNlI2ZDM0MC4zNThSN2QxNDcuODM2UjhkMjkyLjMzMlI5ZDBSMTBkMjgzLjk4UjExaTYxUjEyZDQ4LjAyNlIxM2Q0MzIuNjUyUjE0YWkxaTJpMmkyaTJpM2kyaTJpMmkzaTJpMmkyaTJpM2kzaTNpMmkxaTJpMmkyaTJpM2kyaTJpMmkzaTJpMmkyaTJpM2kyaTNpM2kyaGc6MTczb1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTczUjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2MG9SMWQ3NDAuMDE5UjJhZDM0Ni4yMDVkOTMwLjAzNWQxNDUuMzMxZDg0Mi43NTNkMTQ4LjY3MmQ4MjguMTM3ZDExNy4zNWQ4MzAuNjQyZDAuODM1ZDc4MC4xMWQyLjA4OGQ3ODAuNTI4ZDMuMzRkNzgwLjUyOGQ4Ljc2OWQ3ODAuNTI4ZDUzLjg3MmQ3NTkuNDM4ZDk4Ljk3NWQ3MzguMzQ5ZDExNy43NjhkNzM4LjM0OWQxMjUuNzAzZDczOC4zNDlkMTMxLjk2N2Q3NDAuODU0ZDEyNC4wMzJkNzI5LjE2MWQxMzIuMzg0ZDcyMi44OTdkMTQ0LjA3OGQ3MjIuODk3ZDE1MC4zNDJkNzIyLjg5N2QxNTcuMDI0ZDcyNC41NjdkMTc2LjY1MmQ3MDcuMDI3ZDE4OS41OThkNzE0Ljk2MmQyMDkuMjI2ZDY4MS45N2QzNDYuMjA1ZDYzNC43NzlkMzI1LjMyNGQ2NTkuNDE5ZDMyNS4zMjRkNjc2Ljk1OWQzMjUuMzI0ZDY4My4yMjNkMzI3LjQxMmQ2ODkuOTA1ZDEyNC4wMzJkNzgwLjExZDE1OC42OTRkNzkxLjgwNGQxOTYuNjk4ZDgxMS44NDlkMjQ3LjY0N2Q4MzguNTc3ZDI1OC45MjNkODU5LjA0ZDI1Ni44MzVkODQxLjA4M2QzMjUuNzQyZDg3MS45ODZkMzIzLjIzNmQ4ODYuMTg1ZDMyMy4yMzZkOTEyLjA3OGQzNDYuMjA1ZDkzMC4wMzVoUjNkMzg2LjcxNFI0ZDM0Ni4yMDVSNWQwLjgzNVI2ZDM4OS4yMlI3ZDkzLjk2NFI4ZDM4OC4zODRSOWQwUjEwZDI4My45OFIxMWk2MFIxMmQwLjgzNVIxM2QzODYuNzE0UjE0YWkxaTJpMmkyaTJpM2kzaTNpM2kyaTNpM2kyaTJpM2kzaTNpMmkzaTNpMmkyaTJpM2hnOjE3Mm9SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTE3MlIxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTlvUjFkNzQwLjAxOVIyYWQ4My41MjNkOTM4LjgwNWQxMDIuMzE2ZDkzOC44MDVkMTE2LjcyNGQ5NTAuMDgxZDEzMS4xMzJkOTYxLjM1N2QxMzEuMTMyZDk3OS43MzJkMTMxLjEzMmQ5ODEuODJkMTE5LjAyMWQxMDI5LjQyOWQxMDUuMjM5ZDEwODMuNzE5ZDg4Ljk1MmQxMTQ3LjE5N2Q4NC4zNThkMTE0Ny4xOTdkNzYuODQxZDExNDcuMTk3ZDY2LjgxOGQxMDg1LjM4OWQ2MS4zODlkMTA1My4yMzNkNTIuNjE5ZDEwMTYuNDgyZDM5LjY3M2QxMDAyLjI4M2QzOS42NzNkOTgzLjQ5MWQzOS42NzNkOTY1Ljk1MWQ1Mi44MjhkOTUyLjM3OGQ2NS45ODNkOTM4LjgwNWQ4My41MjNkOTM4LjgwNWQ4My41MjNkNjY3Ljc3MWQxMDIuMzE2ZDY2Ny43NzFkMTE2LjcyNGQ2NzkuMDQ3ZDEzMS4xMzJkNjkwLjMyM2QxMzEuMTMyZDcwOC42OThkMTMxLjEzMmQ3NTguMzk0ZDg1LjYxMWQ3NTguMzk0ZDM5LjY3M2Q3NTguMzk0ZDM5LjY3M2Q3MTIuNDU2ZDM5LjY3M2Q2OTQuOTE2ZDUyLjgyOGQ2ODEuMzQ0ZDY1Ljk4M2Q2NjcuNzcxZDgzLjUyM2Q2NjcuNzcxaFIzZDE2Ny4wNDdSNGQxMzEuMTMyUjVkMzkuNjczUjZkMzU2LjIyOFI3ZC0xMjMuMTk3UjhkMzE2LjU1NFI5ZDBSMTBkMjgzLjk4UjExaTU5UjEyZDM5LjY3M1IxM2QxNjcuMDQ3UjE0YWkxaTNpM2kzaTJpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2hnOjE3MW9SMWQ3NDAuMDE5UjJhZDIzMC41MjVkMTAwNS4yMDdkMjA1LjQ2OGQ5NzcuMjI2ZDE1Mi4wMTNkOTI1Ljg1OWQxNDkuOTI0ZDkxMy4zMzFkMTQxLjE1NGQ4OTIuODY3ZDEzNi41NjFkODk2LjIwOGQxMjYuNTM4ZDkwMS42MzdkMTI0Ljg2N2Q4OTguNzE0ZDExNy43NjhkODg0LjUxNWQxMDQuNDA0ZDg4My42OGQ3MC45OTVkODY2LjU1N2QzMS43MzhkODQ2LjUxMmQxOS4yMWQ4NDMuMTcxZDE5LjIxZDgzNi4wNzFkMTUxLjE3N2Q3ODMuODY5ZDIzMC41MjVkNjg5LjkwNWQyMzAuNTI1ZDc0NS40NDhkMjMwLjUyNWQ3NjAuOWQyMDcuNTU2ZDc4OC4wNDVkMjA1LjA1ZDc4OC44OGQxOTguNzg2ZDc4NS41MzlkMTg1LjAwNGQ3ODAuMTFkMTgyLjA4MWQ3ODEuMzYzZDE4NS4wMDRkNzg4Ljg4ZDE4NC41ODdkNzk2LjM5OGQxODQuMTY5ZDgwMy4wNzlkMTY3LjA0N2Q4MDQuNzVkMTQ1LjMzMWQ4MDguOTI2ZDE1Ni42MDZkODExLjQzMmQxNjYuMjEyZDgxNi4wMjZkMTU4LjY5NGQ4MjAuNjE5ZDEyMi4zNjJkODQxLjA4M2QxNzkuNTc1ZDg3Ni45OThkMjMwLjUyNWQ5NTEuNzUyZDIzMC41MjVkMTAwNS4yMDdkMzc2LjY5MWQxMDA1LjIwN2QzNTEuNjM0ZDk3Ny4yMjZkMjk4LjE3OWQ5MjUuODU5ZDI5Ni4wOTFkOTEzLjMzMWQyODcuMzIxZDg5Mi44NjdkMjgyLjcyN2Q4OTYuMjA4ZDI3Mi43MDRkOTAxLjYzN2QyNzEuMDM0ZDg5OC43MTRkMjYzLjkzNGQ4ODQuNTE1ZDI1MC41N2Q4ODMuNjhkMjE3LjE2MWQ4NjYuNTU3ZDE3Ny45MDVkODQ2LjUxMmQxNjUuMzc2ZDg0My4xNzFkMTY1LjM3NmQ4MzYuMDcxZDI5Ny4zNDRkNzgzLjg2OWQzNzYuNjkxZDY4OS45MDVkMzc2LjY5MWQ3NDUuNDQ4ZDM3Ni42OTFkNzYwLjlkMzUzLjcyMmQ3ODguMDQ1ZDM1MS4yMTZkNzg4Ljg4ZDM0NC45NTJkNzg1LjUzOWQzMzEuMTcxZDc4MC4xMWQzMjguMjQ3ZDc4MS4zNjNkMzMxLjE3MWQ3ODguODhkMzMwLjc1M2Q3OTYuMzk4ZDMzMC4zMzZkODAzLjA3OWQzMTMuMjEzZDgwNC43NWQyOTEuNDk3ZDgwOC45MjZkMzAyLjc3M2Q4MTEuNDMyZDMxMi4zNzhkODE2LjAyNmQzMDQuODYxZDgyMC42MTlkMjY4LjUyOGQ4NDEuMDgzZDMyNS43NDJkODc2Ljk5OGQzNzYuNjkxZDk1MS43NTJkMzc2LjY5MWQxMDA1LjIwN2hSM2QzOTUuOTAyUjRkMzc2LjY5MVI1ZDE5LjIxUjZkMzM0LjA5NFI3ZDE4Ljc5MlI4ZDMxNC44ODRSOWQwUjEwZDI4My45OFIxMWkxNzFSMTJkMTkuMjFSMTNkMzk1LjkwMlIxNGFpMWkzaTNpM2kzaTNpM2kyaTNpMmkzaTJpM2kyaTNpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kyaTNpMmkzaTJpM2kyaTNpMmkzaTNpM2kzaTJoZzo1OG9SMWQ3NDAuMDE5UjJhZDgzLjUyM2Q5MzguODA1ZDEwMi4zMTZkOTM4LjgwNWQxMTYuNzI0ZDk1MC4wODFkMTMxLjEzMmQ5NjEuMzU3ZDEzMS4xMzJkOTc5LjczMmQxMzEuMTMyZDEwMjkuMDExZDg1LjYxMWQxMDI5LjAxMWQzOS42NzNkMTAyOS4wMTFkMzkuNjczZDk4My40OTFkMzkuNjczZDk2NS45NTFkNTIuODI4ZDk1Mi4zNzhkNjUuOTgzZDkzOC44MDVkODMuNTIzZDkzOC44MDVkODMuNTIzZDY2Ny43NzFkMTAyLjMxNmQ2NjcuNzcxZDExNi43MjRkNjc5LjA0N2QxMzEuMTMyZDY5MC4zMjNkMTMxLjEzMmQ3MDguNjk4ZDEzMS4xMzJkNzU4LjM5NGQ4NS42MTFkNzU4LjM5NGQzOS42NzNkNzU4LjM5NGQzOS42NzNkNzEyLjQ1NmQzOS42NzNkNjk0LjkxNmQ1Mi44MjhkNjgxLjM0NGQ2NS45ODNkNjY3Ljc3MWQ4My41MjNkNjY3Ljc3MWhSM2QxNjUuMzc2UjRkMTMxLjEzMlI1ZDM5LjY3M1I2ZDM1Ni4yMjhSN2QtNS4wMTFSOGQzMTYuNTU0UjlkMFIxMGQyODMuOThSMTFpNThSMTJkMzkuNjczUjEzZDE2NS4zNzZSMTRhaTFpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2hnOjE3MG9SMWQ3NDAuMDE5UjJhZDMxNC44ODRkNjk0LjkxNmQzMjcuNDEyZDcwMS41OThkMzMzLjI1OWQ3MTIuNDU2ZDMzMy4yNTlkNzM1LjQyNWQzMzMuMjU5ZDc4MS43ODFkMjgxLjQ3NGQ3ODEuNzgxZDI2MC4xNzZkNzgxLjc4MWQyNDkuNzM1ZDc2Ny4xNjRkMjQ2LjM5NGQ3NjIuNTdkMjMzLjg2NmQ3MzMuNzU1ZDIwNS4wNWQ3ODMuODY5ZDExMC42NjhkNzgzLjg2OWQzNS40OTdkNzgzLjg2OWQzNS40OTdkNzI1LjQwMmQzNS40OTdkNzEyLjQ1NmQ0MC45MjZkNzAwLjM0NWQ1My44NzJkNjk2LjE2OWQ2OC40ODlkNjg4LjIzNGQ1OS4zMDFkNjg2LjE0NmQ1Mi4yMDJkNjgxLjU1M2Q1OS43MTlkNjc3LjM3NmQ3MS44M2Q2NjQuNDNkMTA2LjQ5MmQ2NTUuMjQzZDkxLjQ1OGQ2NTEuNDg0ZDkxLjg3NmQ2NTAuNjQ5ZDExNy43NjhkNjM1LjYxNWQyMTcuOTk2ZDU5OC40NDZkMjE4LjgzMWQ1ODYuMzM2ZDIxOS4yNDlkNTgwLjA3MWQyMTkuMjQ5ZDU3My44MDdkMjE5LjI0OWQ1MTUuMzRkMTgwLjgyOGQ1MTUuMzRkMTU1LjM1M2Q1MTUuMzRkMTE4LjYwM2Q1MzQuOTY5ZDc3LjY3NmQ1NTYuNjg1ZDc3LjY3NmQ1NzkuMjM2ZDgxLjQzNWQ1ODQuMjQ3ZDkwLjIwNWQ1ODQuMjQ3ZDEwNS4yMzlkNTg0LjI0N2QxMjguNjI2ZDU3OS4yMzZkMTA3Ljc0NWQ2MDMuODc2ZDk5LjM5M2Q2MTAuMTRkOTcuNzIyZDYxMS4zOTNkOTUuMjE2ZDYxMS4zOTNkODguNTM1ZDYxMS4zOTNkNzIuNjY1ZDYwMC45NTJkNTguODg0ZDU5MS43NjVkNTguODg0ZDU5NC4yN2Q1OC44ODRkNTk1LjEwNmQ1OS43MTlkNTk2Ljc3NmQ2OC45MDdkNjE2LjgyMmQzMi45OTFkNjA4LjQ2OWQzMi45OTFkNTUzLjM0NGQ5Ni44ODdkNTE5LjUxN2QxNDkuNTA3ZDQ5MS41MzZkMjEwLjQ3OWQ0OTEuNTM2ZDI5Mi4zMzJkNDkxLjUzNmQyOTIuMzMyZDU3OC44MThkMjkyLjMzMmQ1NjkuMjEzZDI4OS44MjdkNTkzLjg1M2QyODcuMzIxZDYxOC40OTJkMjg3LjMyMWQ2NDguOTc4ZDI4Ny4zMjFkNzQ0LjE5NWQzMDMuNjA4ZDc0NC42MTNkMzE1LjMwMWQ3MzQuNTlkMzIxLjU2NmQ3MTIuODc0ZDMxNC44ODRkNjk0LjkxNmQyMTcuOTk2ZDYzNi44NjdkMTE0LjQyN2Q2NDUuNjM3ZDExNC40MjdkNzE0LjU0NGQxMDUuMjM5ZDcxOS41NTZkODcuNjk5ZDczMS4yNDlkMTAyLjMxNmQ3MzAuODMxZDExNy43NjhkNzMxLjI0OWQxMTIuMzM5ZDczNC41OWQxMDguMTYzZDczOS42MDFkMTE1LjI2MmQ3MzkuNjAxZDEyNC4wMzJkNzQwLjg1NGQxMzIuODAyZDc1MS4yOTVkMTQ2LjE2NmQ3NTEuMjk1ZDE3OC43NGQ3NTEuMjk1ZDE5OC43ODZkNzMyLjUwMmQyMTguODMxZDcxMy43MDlkMjE4LjgzMWQ2ODEuNTUzZDIxOC44MzFkNjUxLjA2NmQyMTguODMxZDY0NC4zODRkMjE3Ljk5NmQ2MzYuODY3ZDYzLjg5NWQ4MzQuODE4ZDE2Mi44NzFkODM0LjQwMWQxOTUuNDQ1ZDg1Ny4zN2QxODUuODRkODM0LjQwMWQyNzMuNTM5ZDgzMy45ODNkMjc3LjI5OGQ4MzMuOTgzZDI5Ni4wOTFkODM1LjY1NGQyOTUuNjczZDgzNy43NDJkMjk1LjY3M2Q4NDIuMzM2ZDMwOC42MTlkODQ3LjM0N2QyOTcuNzYxZDg2Ny44MWQyOTYuOTI2ZDg3MC43MzRkMjk2LjkyNmQ4ODYuNjAzZDI2MS4wMTFkODg2LjYwM2QyNDAuMTNkODY5LjA2M2QyMzEuNzc4ZDg4Ni42MDNkNjIuMjI1ZDg4Ny4wMjFkNjMuMDZkODg0LjkzM2Q3My45MThkODc1LjMyN2Q3MC41NzdkODc0LjA3NWQ2Ni44MThkODY2LjE0ZDYzLjA2ZDg2OC42NDZkNTUuOTZkODcyLjQwNGQ2My44OTVkODM0LjgxOGhSM2QzNTQuOTc1UjRkMzMzLjI1OVI1ZDMyLjk5MVI2ZDUzMi40NjNSN2QxMzYuOTc4UjhkNDk5LjQ3MVI5ZDBSMTBkMjgzLjk4UjExaTE3MFIxMmQzMi45OTFSMTNkMzU0Ljk3NVIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkyaTJpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkyaTJpMmkyaTNpMmkzaTJpM2kyaTJpMmkyaTNpM2kzaTJoZzo1N29SMWQ3NDAuMDE5UjJhZDE3NS4zOTlkNjkxLjk5M2QyMjIuMTcyZDcxOS4xMzhkMjQ2LjgxMmQ3MzcuOTMxZDI0Ni44MTJkNzYyLjk4OGQyNDYuODEyZDc5OS43MzhkMjE5LjY2N2Q4MjAuMjAyZDE5NS4wMjdkODM4Ljk5NWQxNTcuNDQyZDgzOC45OTVkOTYuODg3ZDgzOC45OTVkNjQuMzEzZDc5Mi4yMjFkMzUuNDk3ZDc1MS4yOTVkMzUuNDk3ZDY4OC4yMzRkMzUuNDk3ZDY2MS41MDdkNDAuOTI2ZDYzOC45NTVkNjUuMTQ4ZDYyMS44MzNkOTEuMDRkNTk5LjY5OWQ4OC41MzVkNTk4LjAyOWQ3OC4wOTRkNjAwLjUzNWQ1Ni4zNzhkNjA0LjI5M2Q1NC43MDdkNjAzLjA0ZDg5Ljc4N2Q1NDEuMjMzZDE4Ny4wOTJkNTQxLjIzM2QyMjUuOTMxZDU0MS4yMzNkMjc2Ljg4ZDU3Ni4zMTNkMzMxLjE3MWQ2MTMuODk4ZDMzMS4xNzFkNjUwLjY0OWQzMjYuNTc3ZDY1My41NzJkMzI0LjA3MWQ2NTguNTg0ZDMzOS41MjNkNjc1LjI4OGQzMzcuODUzZDY3Ni41NDFkMzExLjU0M2Q2NzAuNjk0ZDMwOS4wMzdkNjcxLjk0N2QzMjcuNDEyZDY4Ny44MTdkMzQ1Ljc4N2Q3MDguMjhkMzM4LjI3ZDcyMC44MDlkMzMwLjc1M2Q3MzcuOTMxZDMzMi4wMDZkNzM4LjM0OWQzNDYuMjA1ZDczMi45MmQzNDcuNDU4ZDczNC4xNzJkMzQ3LjQ1OGQ4NTYuNTM1ZDI3MS4wMzRkOTM5LjY0MWQxOTIuNTIyZDEwMjQuNDE3ZDcwLjk5NWQxMDI0LjQxN2QzOC40MmQxMDI0LjQxN2QyMi41NTFkMTAxNC4zOTRkMjguODE1ZDEwMTIuMzA2ZDU3LjYzMWQxMDEyLjMwNmQxNjEuMmQxMDEyLjMwNmQyMjYuMzQ5ZDkyMi41MThkMjg1LjIzM2Q4NDEuNWQyODUuMjMzZDczNS4wMDhkMjg1LjIzM2Q2ODQuNDc2ZDI2Mi42ODFkNjM3LjcwM2QyMzUuMTE5ZDU4MC45MDdkMTkwLjQzM2Q1ODAuOTA3ZDE1MC4zNDJkNTgwLjkwN2QxMjIuNzc5ZDYxOC45MWQ5Ny4zMDVkNjUzLjk5ZDk3LjMwNWQ2OTUuMzM0ZDk3LjMwNWQ4MDMuNDk3ZDE2NS4zNzZkODAzLjQ5N2QyMjAuMDg0ZDgwMy40OTdkMjIwLjA4NGQ3NjAuMDY1ZDIyMC4wODRkNzI1LjQwMmQxNzUuMzk5ZDY5MS45OTNoUjNkMzU2LjIyOFI0ZDM0Ny40NThSNWQyMi41NTFSNmQ0ODIuNzY2UjdkLTAuNDE3UjhkNDYwLjIxNVI5ZDBSMTBkMjgzLjk4UjExaTU3UjEyZDIyLjU1MVIxM2QzNTYuMjI4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kyaTNpMmkzaTNpM2kzaTJpMmkyaTJpM2kzaTJpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNjlvUjFkNzQwLjAxOVIyYWQ4MDguMDkxZDc0Ny45NTRkODA2LjgzOGQ3NTEuNzEyZDgwNS4xNjhkNzQzLjM2ZDc4Ny4yMWQ3ODQuMjg3ZDc2NC4yNDFkNzg0LjI4N2Q3NTMuOGQ3ODQuMjg3ZDczMy4zMzdkNzc4LjIzMWQ3MTIuODc0ZDc3Mi4xNzZkNzAyLjQzM2Q3NzIuMTc2ZDY5MC43NGQ3NzIuMTc2ZDY0MS40NjFkNzk1Ljk4ZDU4NS4wODNkODIzLjEyNWQ1NzAuODg0ZDgyNy4zMDFkNTY1Ljg3MmQ3ODguMDQ1ZDU2NS44NzJkNzcyLjE3NmQ1NjUuODcyZDc1MS43MTJkNTcwLjg4NGQ3NDMuMzZkNTkwLjUxMmQ3NDEuMjcyZDYyMC4xNjNkNzI3LjA3M2Q2NjguMTg5ZDcwNC4xMDRkNjc2Ljk1OWQ2MjYuNDI3ZDczMy43NTVkNjI2LjQyN2Q3NzEuMzRkNjI2LjQyN2Q3NzEuMzRkNjY5Ljg1OWQ3NzEuMzRkNjgxLjU1M2Q3NjguNDE3ZDY5Ny4wMDRkNzkxLjgwNGQ3MDEuMTgxZDgwMC41NzRkNzEyLjg3NGQ4MDguMDkxZDcyMy4zMTRkODA4LjA5MWQ3NDcuOTU0ZDYyNi40MjdkNjE0LjczNGQ2MjYuNDI3ZDY1NS42NmQ2MDMuNDU4ZDY4Ni45ODJkNTgwLjQ4OWQ3MTguMzAzZDU2MC44NjFkNzQ1Ljg2NmQ1NTIuMDkxZDc2Mi4xNTNkNTUyLjA5MWQ3ODkuMjk4ZDU1Mi4wOTFkODAxLjgyN2Q1NTQuODA1ZDgyNy4zMDFkNTU3LjUyZDg1Mi43NzZkNTU3LjUyZDg2NS4zMDVkNTU3LjUyZDg5MC43NzlkNTA2LjU3ZDkyMy4zNTNkNDU4LjU0NGQ5NTMuODRkNDMxLjM5OWQ5NTMuODRkMzgxLjI4NWQ5NTMuODRkMzI3LjgzZDkzMS4yODhkMjYyLjI2NGQ5MDMuNzI1ZDI2Mi4yNjRkODYxLjk2NGQyNjIuMjY0ZDg0OC42ZDI2Ni4wMjJkODIxLjg3MmQyNjkuNzgxZDc5NS4xNDVkMjY5Ljc4MWQ3ODEuNzgxZDI2OS43ODFkNzU1Ljg4OWQyNDkuMzE4ZDczMS42NjdkMjEwLjg5N2Q2ODYuNTY0ZDE5MC4wMTZkNjUzLjk5ZDE5MC4wMTZkNjA3LjYzNGQxOTAuMDE2ZDUyMi40NGQyNTQuNzQ3ZDQ2Ni44OTdkMzE2LjEzN2Q0MTQuMjc3ZDQwMi41ODRkNDE0LjI3N2Q0OTYuNTQ4ZDQxNC4yNzdkNTU5LjE5ZDQ2Ni40NzlkNjI2LjQyN2Q1MjIuNDRkNjI2LjQyN2Q2MTQuNzM0ZDgwMS44MjdkMTAwMS44NjZkODAxLjgyN2QxMDI5Ljg0NmQ3NjEuMzE4ZDEwNDEuOTU3ZDc2OS4yNTJkMTA1OS40OTdkNzY5LjI1MmQxMDcyLjQ0M2Q3NjkuMjUyZDExMDQuMTgyZDcyOS4xNjFkMTEwNC4xODJkNjkxLjU3NWQxMTA0LjE4MmQ2ODEuNTUzZDEwODUuMzg5ZDY2OC4xODlkMTAzNS4yNzVkNjQ1LjYzN2QxMDI2LjA4OGQ1MDAuNzI0ZDk1NC42NzVkNTA0LjlkOTQ4LjgyOGQ1MDguMjQxZDk0MS43MjlkNTEzLjY3ZDkzOC4zODhkNTM4LjMwOWQ5MTkuNTk1ZDU1OC43NzNkOTA0LjE0M2Q1NjcuNTQzZDkwNC4xNDNkNTgyLjE1OWQ5MDQuMTQzZDY5NC45MTZkOTY3LjIwM2Q3MTcuMDVkOTUyLjE2OWQ3NDEuMjcyZDk1Mi4xNjlkNzY0LjY1OWQ5NTIuMTY5ZDc4Mi4xOTlkOTY1LjExNWQ4MDEuODI3ZDk3OS4zMTRkODAxLjgyN2QxMDAxLjg2NmQyNTAuMTUzZDc0Ni43MDFkMjUwLjE1M2Q4MjEuODcyZDIzNy4yMDdkODIxLjg3MmQyMzMuODY2ZDgyMS44NzJkMTg1LjQyMmQ3OTcuMjMzZDEyNi4xMmQ3NjcuMTY0ZDEyNC4wMzJkNzY3LjU4MmQ5Ni44ODdkNzc3LjYwNWQ3NC4zMzZkNzg1Ljk1N2Q3MC41NzdkNzg1Ljk1N2Q0OC44NjFkNzg1Ljk1N2QzNC4wMzVkNzY5LjA0NGQxOS4yMWQ3NTIuMTNkMTkuMjFkNzMwLjQxNGQxOS4yMWQ3MTIuNDU2ZDMxLjczOGQ3MDQuMTA0ZDM4LjQyZDY5OS41MWQ1OS43MTlkNjkzLjY2M2Q1MS43ODRkNjc3LjM3NmQ1MS43ODRkNjYxLjkyNGQ1MS43ODRkNjI2Ljg0NWQ4OS4zN2Q2MjYuODQ1ZDE0Ni41ODRkNjI2Ljg0NWQxNTIuODQ4ZDcwNC4xMDRkMjE1LjkwOGQ3MzIuOTJkMjUwLjE1M2Q3NDYuNzAxZDMyMC4zMTNkOTUxLjMzNGQyNzYuMDQ1ZDk2OC40NTZkMjQyLjIxOGQ5ODIuMjM4ZDE4NS40MjJkMTAwNS42MjRkMTYyLjg3MWQxMDI0LjgzNWQxNTYuNjA2ZDEwMzAuMjY0ZDEzOS40ODRkMTA3MS42MDhkMTI3LjM3M2QxMTAwLjg0MWQ5Ni40NjlkMTEwMC44NDFkNzkuMzQ3ZDExMDAuODQxZDY2LjQwMWQxMDkxLjIzNmQ1MS43ODRkMTA4MC43OTZkNTEuNzg0ZDEwNjQuMDkxZDUxLjc4NGQxMDUxLjE0NWQ1OS43MTlkMTAzNS4yNzVkMjEuNzE2ZDEwMjIuNzQ3ZDIxLjcxNmQ5OTMuMDk2ZDIxLjcxNmQ5NzEuNzk3ZDM4LjIxMmQ5NTcuNTk4ZDU0LjcwN2Q5NDMuMzk5ZDc2LjQyNGQ5NDMuMzk5ZDgxLjg1M2Q5NDMuMzk5ZDEwMi43MzRkOTU0LjI1N2QxMjMuNjE1ZDk2NS4xMTVkMTI2LjEyZDk2NS4xMTVkMTMyLjgwMmQ5NjUuMTE1ZDE4My43NTJkOTM0LjYyOWQyMzQuNzAxZDkwNC4xNDNkMjQ0LjcyNGQ5MDQuMTQzZDI2Mi4yNjRkOTA0LjE0M2QyODcuNzM4ZDkxOS44MDRkMzEzLjIxM2Q5MzUuNDY0ZDMyMC4zMTNkOTUxLjMzNGQ1MTcuNDI5ZDY2NS4yNjVkNTEwLjMyOWQ2NjkuMDI0ZDQ4Mi4zNDlkNjk4LjI1N2Q0NjMuOTczZDcxNy40NjhkNDIzLjg4MmQ3MTcuNDY4ZDM4NC4yMDhkNzE3LjQ2OGQzNjIuMDc1ZDY4My4yMjNkMzQyLjg2NGQ2NTMuOTlkMzQyLjg2NGQ2MTIuMjI4ZDM0Mi44NjRkNTcxLjMwMWQzNTkuNTY5ZDU0My4zMjFkMzc5LjYxNWQ1MDkuMDc2ZDQxOC4wMzVkNTA5LjA3NmQ0NDguOTM5ZDUwOS4wNzZkNDcwLjIzOGQ1MjUuMzYzZDQ3Ny4zMzdkNTMwLjc5MmQ1MDguMjQxZDU2NS4wMzdkNDk3LjhkNTE2LjE3NmQ0ODQuMDE5ZDQ5Mi4zNzFkNDYwLjIxNWQ0ODYuMTA3ZDQxOC44NzFkNDg2LjEwN2QyODguNTc0ZDQ4Ni4xMDdkMjg4LjU3NGQ2MTguNDkyZDI4OC41NzRkNjI2Ljg0NWQzMDkuNDU1ZDY0My4xMzJkMzA5LjAzN2Q2NDMuOTY3ZDMwOS40NTVkNjQ0LjM4NGQyOTguMTc5ZDY0Ni4wNTVkMjkyLjc1ZDY0OC45NzhkMjk3LjM0NGQ2NTkuNDE5ZDMwMS45MzhkNjcwLjI3N2QzMDMuMTlkNjcxLjk0N2QzMjYuOTk1ZDY3OS4wNDdkMzI2Ljk5NWQ2ODAuM2QzMjMuNjU0ZDY4NC44OTNkMzE3LjM4OWQ2OTQuOTE2ZDMxNy44MDdkNjk1LjMzNGQzMTcuODA3ZDY5NS43NTJkMzE3LjgwN2Q2OTcuMDA0ZDMxNi45NzJkNjk4LjI1N2QzMjYuMTU5ZDcxNC45NjJkMzY1LjgzM2Q3MjUuODJkMzk5LjI0M2Q3MzUuMDA4ZDQyNC4zZDczNS4wMDhkNDg0LjAxOWQ3MzUuMDA4ZDUxMi40MTdkNzEzLjI5MmQ0ODYuMTA3ZDcxMy4yOTJkNDkxLjk1NGQ3MDIuNDMzZDUxMmQ3MDIuMDE2ZDUxNC45MjNkNjg4LjIzNGQ1MTcuNDI5ZDY2NS4yNjVoUjNkODI3LjMwMVI0ZDgwOC4wOTFSNWQxOS4yMVI2ZDYwOS43MjJSN2QtODAuMTgyUjhkNTkwLjUxMlI5ZDBSMTBkMjgzLjk4UjExaTE2OVIxMmQxOS4yMVIxM2Q4MjcuMzAxUjE0YWkxaTJpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kxaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaGc6NTZvUjFkNzQwLjAxOVIyYWQzMjcuNDEyZDg5OC4yOTZkMzI5LjA4M2Q5NjIuNjFkMjg2LjkwM2Q5OTguNTI1ZDI0Ny42NDdkMTAzMi4zNTJkMTgyLjA4MWQxMDMyLjM1MmQxMTYuMDk3ZDEwMzIuMzUyZDc2LjQyNGQxMDAxLjQ0OGQzMi4xNTZkOTY3LjIwM2QzMi4xNTZkOTAzLjMwOGQzMi4xNTZkODYxLjEyOGQ1NC4yOWQ4MjYuMDQ4ZDc2Ljg0MWQ3ODkuMjk4ZDExNC44NDVkNzczLjg0NmQ0Mi41OTdkNzM2LjI2MWQ0Mi41OTdkNjY4LjE4OWQ0Mi41OTdkNjQyLjcxNGQ0OC4wMjZkNjQyLjcxNGQ0OC44NjFkNjQyLjcxNGQ1Mi42MTlkNjQ1Ljg0NmQ1Ni4zNzhkNjQ4Ljk3OGQ1Ny4yMTNkNjQ4Ljk3OGQ1OS43MTlkNjQ1LjYzN2Q1NS4xMjVkNjI5Ljc2OGQ1My4wMzdkNjA4Ljg4N2Q3Ni44NDFkNTk2Ljc3NmQxMDQuODIyZDU3OS4yMzZkNzIuMjQ3ZDU3Ny41NjZkMTA4LjU4ZDUzNi4yMjFkMTc5LjE1OGQ1MzYuMjIxZDIzNS45NTRkNTM2LjIyMWQyNzAuODI1ZDU3MC4wNDhkMzA1LjY5NmQ2MDMuODc2ZDMwNS42OTZkNjYwLjY3MmQzMDUuNjk2ZDczMS4yNDlkMjQzLjg4OWQ3NjguNDE3ZDI5NS42NzNkNzkyLjYzOWQzMTMuMjEzZDgyOC41NTRkMzA0LjQ0M2Q4MzYuMDcxZDI5OS4wMTRkODQzLjE3MWQzMjAuNzNkODQ2LjUxMmQzMTIuNzk2ZDg3MS45ODZkMzA1LjY5NmQ5MDIuODlkMzA2LjExNGQ5MDMuNzI1ZDMxNS43MTlkODkyLjAzMmQzMjYuNTc3ZDg4MC43NTZkMzI2Ljk5NWQ4ODEuNTkyZDMyNy40MTJkODk4LjI5NmQyNDQuNzI0ZDY2MS41MDdkMjQ0LjcyNGQ1ODQuMjQ3ZDE3Ni42NTJkNTg0LjI0N2QxMjEuOTQ0ZDU4NC4yNDdkMTE1LjI2MmQ2NjEuNTA3ZDEwOC41OGQ2NzEuMTEyZDk5LjgxZDY4OC42NTJkMTA4LjU4ZDY5MS4xNThkMTI0Ljg2N2Q2OTguNjc1ZDE0NC45MTNkNzQyLjEwN2QxNzcuMDdkNzQyLjEwN2QyMDguODA5ZDc0Mi4xMDdkMjI3LjYwMWQ3MTcuMDVkMjQ0LjcyNGQ2OTQuNDk5ZDI0NC43MjRkNjYxLjUwN2QyNTEuNDA2ZDkwMi40NzNkMjUxLjQwNmQ4NzEuMTUxZDIzMi4xOTVkODQyLjMzNmQyMTAuNDc5ZDgwOS43NjFkMTgxLjI0NmQ4MDkuNzYxZDE0Mi44MjVkODA5Ljc2MWQxMjQuNDVkODU0LjQ0NmQxMTAuMjUxZDkwNC41NjFkMTA1LjIzOWQ4OTkuMTMyZDkzLjEyOGQ4ODkuOTQ0ZDEwNS42NTdkOTE4Ljc2ZDExNy43NjhkOTQyLjk4MmQxMTQuNDI3ZDk1My40MjJkMTA5LjgzM2Q5NTkuNjg2ZDExOS40MzhkOTYzLjg2MmQxMjguMjA4ZDk2NC42OThkMTQ4LjI1NGQ5OTUuNjAxZDE4MS4yNDZkOTk1LjYwMWQyMTYuNzQzZDk5NS42MDFkMjM1LjUzNmQ5NjUuNTMzZDI1MS40MDZkOTQwLjA1OGQyNTEuNDA2ZDkwMi40NzNoUjNkMzU2LjIyOFI0ZDMyOS4wODNSNWQzMi4xNTZSNmQ0ODcuNzc4UjdkLTguMzUyUjhkNDU1LjYyMVI5ZDBSMTBkMjgzLjk4UjExaTU2UjEyZDMyLjE1NlIxM2QzNTYuMjI4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kyaTNpMmkzaTJpMmkxaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kyaTNpM2kzaTNpM2kzaTNoZzoxNjhvUjFkNzQwLjAxOVIyYWQ2My4wNmQ1MTQuMDg4ZDExMC42NjhkNTE0LjA4OGQxMTAuNjY4ZDU1NS4wMTRkMTEwLjY2OGQ1OTQuMjdkODQuNzc2ZDU5NC4yN2Q1MC41MzFkNTk0LjI3ZDQwLjkyNmQ1OTEuMzQ3ZDE5LjIxZDU4NC42NjVkMTkuMjFkNTU4Ljc3M2QxOS4yMWQ1NDEuMjMzZDMyLjM2NWQ1MjcuNjZkNDUuNTJkNTE0LjA4OGQ2My4wNmQ1MTQuMDg4ZDE5My4zNTdkNTEwLjMyOWQyNDAuOTY1ZDUxMC4zMjlkMjQwLjk2NWQ1NTEuMjU2ZDI0MC45NjVkNTg5LjI1OWQyMTguNDE0ZDU4OS4yNTlkMjE0LjIzOGQ1ODkuMjU5ZDIwNi41MTJkNTg3LjU4OGQxOTguNzg2ZDU4NS45MThkMTk1LjAyN2Q1ODUuOTE4ZDE2OS4xMzVkNTg1LjVkMTYyLjQ1M2Q1ODIuNTc3ZDE0OS41MDdkNTc2LjczZDE0OS41MDdkNTU1LjAxNGQxNDkuNTA3ZDUzNy4wNTdkMTYyLjQ1M2Q1MjMuNjkzZDE3NS4zOTlkNTEwLjMyOWQxOTMuMzU3ZDUxMC4zMjloUjNkMjYwLjE3NlI0ZDI0MC45NjVSNWQxOS4yMVI2ZDUxMy42N1I3ZDQyOS43MjlSOGQ0OTQuNDZSOWQwUjEwZDI4My45OFIxMWkxNjhSMTJkMTkuMjFSMTNkMjYwLjE3NlIxNGFpMWkzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjU1b1IxZDc0MC4wMTlSMmFkMzguNDJkNTQ3LjQ5N2Q4OC41MzVkNTUzLjc2MWQxNDIuNDA3ZDU1My43NjFkMTYzLjI4OGQ1NTMuNzYxZDIwNS4wNWQ1NDkuNzk0ZDI0Ni44MTJkNTQ1LjgyN2QyNjcuNjkzZDU0NS44MjdkMjc3LjcxNmQ1NDkuMTY4ZDI5NS42NzNkNTcwLjg4NGQzMTEuNTQzZDU0NS44MjdkMzMwLjc1M2Q1MjQuNTI4ZDMyNC45MDdkNjA4LjA1MmQyODguMTU2ZDcwOS4xMTVkMjQ4LjlkODE3LjI3OGQxOTguNzg2ZDg3NC4wNzVkMjA1Ljg4NWQ4NjguMjI4ZDIxNy41NzlkODY0LjA1MmQyMjEuMzM3ZDg2OC42NDZkMjIxLjMzN2Q4ODcuNDM4ZDIwMC42NjVkOTMzLjE2OGQxNzkuOTkzZDk3OC44OTdkMTc5Ljk5M2Q5OTMuOTMxZDE3OS45OTNkMTAyNGQyMzQuMjgzZDEwNTEuMTQ1ZDE2MC4zNjVkMTA1MS41NjJkMTI5LjQ2MWQxMDM0LjQ0ZDEzMi44MDJkMTAwOS4zODNkMTA3LjMyN2QxMDMxLjkzNGQxMjEuNTI2ZDk5OS4zNmQxNTguNjk0ZDkwMC4zODRkMjU5LjM0ZDYwNi4zODFkMTE4LjYwM2Q1OTguMDI5ZDYxLjM4OWQ1OTQuNjg4ZDYxLjM4OWQ2NDEuNDYxZDYxLjM4OWQ2NTEuOTAyZDg2LjQ0NmQ2NzcuMzc2ZDU4Ljg4NGQ2NzMuNjE4ZDQwLjA5MWQ2NTYuMDc4ZDIwLjA0NWQ2MzcuNzAzZDIwLjA0NWQ2MTAuNTU3ZDIwLjA0NWQ1ODUuOTE4ZDM4LjQyZDU0Ny40OTdoUjNkMzU2LjIyOFI0ZDMzMC43NTNSNWQyMC4wNDVSNmQ0OTkuNDcxUjdkLTI3LjU2MlI4ZDQ3OS40MjVSOWQwUjEwZDI4My45OFIxMWk1NVIxMmQyMC4wNDVSMTNkMzU2LjIyOFIxNGFpMWkzaTNpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkyaTNpMmkyaTNpM2kzaTNpM2hnOjE2N29SMWQ3NDAuMDE5UjJhZDIyMS4zMzdkODkxLjYxNWQyMTcuMTYxZDg4OS4xMDlkMjEzLjgyZDg4NS4zNWQyMTQuMjM4ZDg4NC41MTVkMjE4LjQxNGQ4ODQuMDk3ZDIyMi4xNzJkODgzLjY4ZDIyMS4zMzdkODYwLjcxMWQxOTAuNDMzZDg0OC42ZDE5OC4zNjhkODQxLjkxOGQyMDMuMzhkODM0LjQwMWQxOTAuMDE2ZDgzOC45OTVkMTczLjcyOWQ4NDIuNzUzZDE3Mi44OTNkODQxLjkxOGQxNzcuOTA1ZDgzNy4zMjRkMTg1LjQyMmQ4MjkuODA3ZDE3Ny40ODdkODI4Ljk3MmQxNDkuNTA3ZDgzMy45ODNkMTM4LjY0OWQ4MzMuOTgzZDEzMC4yOTZkODMzLjk4M2QxMjAuNjkxZDgzMS4wNmQ5MS44NzZkODM4LjU3N2Q5MS44NzZkODY0Ljg4N2Q5MS44NzZkODg3Ljg1NmQxMjkuODc5ZDkwMi44OWQxODcuMDkyZDkxOC43NmQxNzkuMTU4ZDkyMi4xMDFkMTcyLjQ3NmQ5MjUuODU5ZDE4NS44NGQ5MjMuMzUzZDE5Ny45NTFkOTE3LjUwN2QyMTguNDE0ZDkwNy40ODRkMjIxLjMzN2Q4OTEuNjE1ZDM1LjA3OWQxMDMzLjE4N2QzNy41ODVkMTAzMS41MTdkNTIuNjE5ZDEwMTUuNjQ3ZDYwLjU1NGQxMDA3LjI5NWQ3OS4zNDdkMTAwMy45NTRkNjMuODk1ZDEwMTQuMzk0ZDYzLjg5NWQxMDI5Ljg0NmQ2My44OTVkMTA1Ni45OTFkOTYuODg3ZDEwNzIuNDQzZDEyMy42MTVkMTA4NC45NzJkMTUzLjY4M2QxMDg0Ljk3MmQxNzcuMDdkMTA4NC45NzJkMTk2LjI4ZDEwNzUuMzY3ZDIyMC41MDJkMTA2My42NzNkMjIwLjUwMmQxMDQyLjc5MmQyMjAuNTAyZDEwMTguOTg4ZDE4OC43NjNkMTAwNi40NmQxOTYuNjk4ZDk5OS43NzhkMjAxLjcwOWQ5OTIuMjYxZDE4OC4zNDVkOTk2Ljg1NGQxNzIuMDU4ZDEwMDAuNjEzZDE3MS4yMjNkOTk5Ljc3OGQxNzEuMjIzZDk5OC45NDJkMTc3LjkwNWQ5OTMuMDk2ZDE4NC41ODdkOTg3LjI0OWQxODQuNTg3ZDk4Ni40MTRkMTgzLjc1MmQ5ODUuNTc5ZDE0OS41MDdkOTkxLjg0M2QxMzYuOTc4ZDk5MS44NDNkMTE0Ljg0NWQ5OTEuODQzZDgzLjMxNGQ5NzIuODQxZDUxLjc4NGQ5NTMuODRkNDMuNDMyZDkzNC4yMTJkNDMuNDMyZDkzMy43OTRkMzEuNzM4ZDkyMi4xMDFkMzEuNzM4ZDkwNC41NjFkMzEuNzM4ZDg5OS41NDlkMzMuNDA5ZDg5Mi4wMzJkMzMuNDA5ZDgzNy43NDJkNzYuODQxZDgwOC45MjZkNTIuMjAyZDc5Mi42MzlkNDUuMTAyZDc3Ni4zNTJkNTYuNzk2ZDc1NS44ODlkNjcuNjU0ZDcyOS45OTZkNjcuMjM2ZDcyOS41NzlkNTcuNjMxZDczOC4zNDlkMzYuNzVkNzUzLjhkMzYuMzMyZDc1My4zODNkMzUuMDc5ZDc0My4zNmQzNS4wNzlkNzM0LjE3MmQzNS4wNzlkNjg2LjU2NGQ2OC40ODlkNjU4LjU4NGQ5OS44MWQ2MzEuODU2ZDE0OC4yNTRkNjMxLjg1NmQxNTUuMzUzZDYzMS44NTZkMTY5LjM0NGQ2MzEuNDM4ZDE4My4zMzRkNjMxLjAyMWQxOTAuNDMzZDYzMS4wMjFkMjgzLjk4ZDYzMS4wMjFkMjgzLjk4ZDY5Mi44MjhkMjgzLjk4ZDcxMC43ODZkMjY5Ljk5ZDcyMy43MzJkMjU2ZDczNi42NzhkMjM3LjYyNGQ3MzYuNjc4ZDIyMy4wMDhkNzM2LjY3OGQyMTUuNDkxZDcyNy40OTFkMjE1LjkwOGQ3MjYuNjU1ZDI0Ny42NDdkNzIzLjczMmQyNDcuNjQ3ZDcwNy4wMjdkMjQ3LjY0N2Q2NzAuMjc3ZDE0OS4wODlkNjcwLjI3N2Q5My41NDZkNjcwLjI3N2Q5My41NDZkNzA3LjAyN2Q5My41NDZkNzI5Ljk5NmQxMzEuNTQ5ZDc0NS4wM2QxODguNzYzZDc2MC45ZDE3My4zMTFkNzY3LjU4MmQxNjIuMDM1ZDc3NC42ODFkMTkzLjM1N2Q3NzAuNTA1ZDIxNi43NDNkNzcwLjUwNWQyMjguMDE5ZDc3MC41MDVkMjQ4LjlkNzg4LjA0NWQyNjguMTFkODAzLjkxNWQyNzQuNzkyZDgxNi4wMjZkMjcyLjI4N2Q4MTYuODYxZDI4MC42MzlkODI4LjEzN2QyODEuODkyZDg0NC4wMDZkMjgzLjE0NWQ4NDQuNDI0ZDI4NS4yMzNkODU0Ljg2NGQyODUuMjMzZDg2Ni4xNGQyODUuMjMzZDkxOC43NmQyNDEuOGQ5NDEuNzI5ZDI2NS4xODdkOTU5LjY4NmQyNzMuMTIyZDk3My44ODVkMjM1LjExOWQ5ODguOTJkMjU3LjY3ZDk5Mi42NzhkMjgxLjQ3NGQxMDAyLjI4M2QyODMuNTYyZDEwMTIuNzI0ZDI4My41NjJkMTAyNGQyODMuNTYyZDExMTcuMTI4ZDE0Ny40MTlkMTExNy4xMjhkMzAuMDY4ZDExMTcuMTI4ZDMwLjA2OGQxMDYyLjQyZDMwLjA2OGQxMDU2Ljk5MWQzMi4xNTZkMTA0Ny44MDRkMzQuNjYyZDEwMzYuOTQ2ZDM1LjA3OWQxMDMzLjE4N2hSM2QzMTYuNTU0UjRkMjg1LjIzM1I1ZDMwLjA2OFI2ZDM5Mi45NzhSN2QtOTMuMTI4UjhkMzYyLjkxUjlkMFIxMGQyODMuOThSMTFpMTY3UjEyZDMwLjA2OFIxM2QzMTYuNTU0UjE0YWkxaTNpMmkzaTNpM2kzaTJpM2kyaTNpM2kzaTNpMmkzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kyaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNoZzo1NG9SMWQ3NDAuMDE5UjJhZDE5NC42MWQ4NzMuMjM5ZDE3MS4yMjNkODU5LjQ1OGQxNDcuODM2ZDg0Ni4wOTRkMTIzLjE5N2Q4MjcuMzAxZDEyMy4xOTdkODAyLjI0NGQxMjMuMTk3ZDc2NS40OTRkMTUwLjM0MmQ3NDUuMDNkMTc0Ljk4MmQ3MjYuMjM4ZDIxMi41NjdkNzI2LjIzOGQyNzMuMTIyZDcyNi4yMzhkMzA1LjY5NmQ3NzMuNDI5ZDMzNC41MTJkODE0LjM1NWQzMzQuNTEyZDg3Ny40MTVkMzM0LjUxMmQ5MDQuMTQzZDMyOS4wODNkOTI2LjI3N2QzMDQuODYxZDk0My44MTdkMjc4Ljk2OWQ5NjUuNTMzZDI4MS40NzRkOTY3LjIwM2QyOTEuOTE1ZDk2NC42OThkMzEzLjYzMWQ5NjAuOTM5ZDMxNS4zMDFkOTYyLjE5MmQyNzkuODA0ZDEwMjQuNDE3ZDE4Mi45MTZkMTAyNC40MTdkMTQ0LjA3OGQxMDI0LjQxN2Q5My4xMjhkOTg5LjMzN2QzOC44MzhkOTUxLjc1MmQzOC44MzhkOTE1LjAwMWQ0My40MzJkOTEyLjA3OGQ0NS45MzhkOTA2LjY0OWQzNi43NWQ4OTguMjk2ZDMwLjQ4NmQ4ODkuOTQ0ZDMyLjE1NmQ4ODguNjkxZDU4LjQ2NmQ4OTQuOTU1ZDYwLjU1NGQ4OTMuMjg1ZDQyLjU5N2Q4NzcuODMzZDI0LjIyMWQ4NTcuMzdkMzEuNzM4ZDg0NC44NDFkMzkuMjU2ZDgyNy43MTlkMzguNDJkODI2Ljg4NGQyMy44MDRkODMxLjg5NWQyMi41NTFkODMxLjQ3N2QyMi41NTFkNzA5LjExNWQ5OC45NzVkNjI2LjAwOWQxNzcuNDg3ZDU0MS4yMzNkMjk5LjAxNGQ1NDEuMjMzZDMzMS4xNzFkNTQxLjIzM2QzNDcuNDU4ZDU1MC44MzhkMzQwLjc3NmQ1NTIuOTI2ZDI5OS4wMTRkNTUyLjUwOGQyOTQuNDJkNTU0LjE3OWQ4NC43NzZkNjEwLjE0ZDg0Ljc3NmQ4MzAuMjI1ZDg0Ljc3NmQ4ODEuNTkyZDEwNi45MWQ5MjcuNTNkMTM0LjQ3M2Q5ODQuNzQzZDE3OS41NzVkOTg0Ljc0M2QyMTcuOTk2ZDk4NC43NDNkMjQ2LjM5NGQ5NDUuNDg3ZDI3Mi4yODdkOTA5LjU3MmQyNzIuMjg3ZDg2OS44OThkMjcyLjI4N2Q3NjEuNzM1ZDIwNC42MzJkNzYxLjczNWQxNDkuOTI0ZDc2MS43MzVkMTQ5LjkyNGQ4MDUuMTY4ZDE0OS45MjRkODM5LjgzZDE5NC42MWQ4NzMuMjM5aFIzZDM1Ni4yMjhSNGQzNDcuNDU4UjVkMjIuNTUxUjZkNDgyLjc2NlI3ZC0wLjQxN1I4ZDQ2MC4yMTVSOWQwUjEwZDI4My45OFIxMWk1NFIxMmQyMi41NTFSMTNkMzU2LjIyOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpMmkzaTJpM2kzaTNpM2kzaTJpMmkyaTNpM2kyaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaGc6MTY2b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTY2UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1M29SMWQ3NDAuMDE5UjJhZDI3MS4wMzRkNjEyLjY0NmQyMzAuOTQyZDYxMy4wNjNkMjA5LjY0NGQ2MTMuNDgxZDE2NC41NDFkNTk3LjYxMWQxNzEuMjIzZDYwMy4wNGQxNzkuNTc1ZDYxMi42NDZkMTYxLjJkNjEyLjY0NmQxMTQuODQ1ZDYxMy40ODFkMTEzLjU5MmQ2MzEuNDM4ZDEwOS44MzNkNzI5Ljk5NmQxNDEuOTlkNzE0LjU0NGQxNzkuOTkzZDcxNC41NDRkMjI1LjUxM2Q3MTQuNTQ0ZDI2My4wOTlkNzQwLjIyOGQzMDAuNjg1ZDc2NS45MTFkMzE2LjU1NGQ4MDguNTA4ZDMxNS43MTlkODA4LjkyNmQzMDUuMjc4ZDgwNS4xNjhkMjgzLjU2MmQ3OTkuMzIxZDI4Mi4zMDlkODAwLjE1NmQzMDIuNzczZDgxNS42MDhkMzI0LjA3MWQ4MzYuNDg5ZDMyNS43NDJkODU2LjUzNWQzMjYuMTU5ZDg2MS41NDZkMzI2LjE1OWQ4NjguNjQ2ZDMyNi4xNTlkOTE0LjE2NmQzMDEuNTJkOTU0LjY3NWQyODMuNTYyZDk2MC45MzlkMjYyLjI2NGQ5NzEuMzhkMjgyLjMwOWQ5NzkuNzMyZDIzMy44NjZkMTAyOS40MjlkMTM4LjIzMWQxMDI5LjQyOWQxMDAuNjQ2ZDEwMjkuNDI5ZDU5LjMwMWQxMDE2LjA2NWQ1LjAxMWQ5OTguNTI1ZDUuMDExZDk3MC4xMjdkNS4wMTFkOTQ5LjY2M2QzNy4xNjhkOTI2LjY5NGQ2Mi4yMjVkOTA4LjczN2Q4Ny4yODJkOTAwLjM4NGQ4Ny42OTlkOTAwLjgwMmQ4Ni4wMjlkODk2LjYyNmQ2Ny42NTRkOTExLjY2ZDU1LjU0M2Q5NDguODI4ZDczLjA4M2Q5OTYuNDM3ZDEzOC42NDlkOTk2LjQzN2QxODcuOTI4ZDk5Ni40MzdkMjIxLjk2NGQ5NjAuNTIyZDI1NmQ5MjQuNjA2ZDI1NmQ4NzQuOTFkMjU2ZDgzMi43M2QyMjQuMjYxZDgxMS4wMTRkMTk2LjY5OGQ3OTEuODA0ZDE1Mi44NDhkNzkxLjgwNGQxMzguNjQ5ZDc5MS44MDRkMTEyLjMzOWQ4MDEuODI3ZDg2LjAyOWQ4MTEuODQ5ZDcxLjgzZDgxMS44NDlkNTkuMzAxZDgxMS44NDlkNTkuNzE5ZDgwMS44MjdkNjAuOTcyZDc2Ni43NDdkNjEuODA3ZDc2Ni4zMjlkODEuODUzZDc3MC45MjNkODMuMTA2ZDc3MC4wODhkNzEuODNkNzU4LjM5NGQ2MS4zODlkNzQxLjY5ZDYxLjgwN2Q3MjUuODJkNjEuODA3ZDY0Mi4yOTZkNjEuODA3ZDY0MC4yMDhkNjguNDg5ZDYyOS43NjhkNzUuMTcxZDYxOS4zMjdkNzUuMTcxZDYxNy4yMzlkNzMuNWQ2MTcuNjU3ZDYzLjg5NWQ2MTcuNjU3ZDYxLjgwN2Q2MTUuNTY5ZDYxLjgwN2Q1NjIuNTMxZDYxLjgwN2Q1NTAuODM4ZDEwMi43MzRkNTQ5LjE2OGQxMDAuNjQ2ZDU0OS4xNjhkMTAwLjY0NmQ1NDkuNTg1ZDEwMi4zMTZkNTUwLjAwM2QxMDQuNDA0ZDU1MC4wMDNkMTEyLjc1NmQ1NTAuMDAzZDE1My42ODNkNTUwLjgzOGQyMzguODc3ZDU1MS42NzNkMjUyLjY1OWQ1NTEuNjczZDI3OS4xNzdkNTQ3LjkxNWQzMDUuNjk2ZDU0NC4xNTZkMzE5LjA2ZDU0NC4xNTZkMjgzLjU2MmQ1NzAuODg0ZDI2Ni4wMjJkNTk0LjI3ZDI3MS4wMzRkNjEyLjY0NmhSM2QzNTYuMjI4UjRkMzI2LjE1OVI1ZDUuMDExUjZkNDc5Ljg0M1I3ZC01LjQyOVI4ZDQ3NC44MzFSOWQwUjEwZDI4My45OFIxMWk1M1IxMmQ1LjAxMVIxM2QzNTYuMjI4UjE0YWkxaTJpM2kzaTJpMmkzaTNpM2kzaTJpM2kyaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpMmkzaTNpM2kzaTNpMmkyaTNpM2kzaTJpMmkyaTNpM2kzaTJoZzoxNjVvUjFkNzQwLjAxOVIyYWQzNjQuNThkOTM2LjNkMzg4LjM4NGQ5NDQuMjM0ZDQwOC40M2Q5NzMuODg1ZDQwNS41MDdkMTA1OC42NjJkMzI2LjE1OWQxMDU4LjY2MmQzMTcuODA3ZDEwNTguNjYyZDMwOS40NTVkMTA1Ny44MjdkMzA5Ljg3MmQxMTA0LjE4MmQzMjIuODE4ZDExMjAuNDY5ZDM0Mi44NjRkMTEyMC40NjlkMzc5LjE5N2QxMTI3LjE1MWQzOTMuODE0ZDExNDguNDVkMjQ4LjQ4MmQxMTUwLjUzOGQxMjYuMTJkMTIwMy45OTNkMTUyLjQzZDExNzIuNjcyZDEyNi4xMmQxMTY4LjQ5NWQxNTkuMTEyZDExNTMuMDQ0ZDE5NS40NDVkMTEyNy4xNTFkMjAyLjU0NGQxMTEyLjExN2QyMDkuNjQ0ZDEwMjYuOTIzZDIwOS4yMjZkMTAyMi4zMjlkMTUyLjQzZDk5OC41MjVkMTI3Ljc5MWQ5OTguNTI1ZDExMC4yNTFkOTk4LjUyNWQ5Ni42NzhkMTAxMC4yMThkODMuMTA2ZDEwMjEuOTExZDgzLjEwNmQxMDM5LjAzNGQ4My4xMDZkMTA2MS41ODVkMTExLjUwNGQxMDc5LjEyNWQ2MC41NTRkMTA2My42NzNkNjAuNTU0ZDEwNDEuMTIyZDYwLjU1NGQ5NTAuNDk5ZDEzNi4xNDNkOTUwLjQ5OWQxNjQuNTQxZDk1MC40OTlkMjE3LjU3OWQ5NzIuNjMyZDI0Mi42MzZkOTU5LjY4NmQyNDAuOTY1ZDk1OC40MzNkMjQwLjU0OGQ5NTcuNTk4ZDI0MC45NjVkOTU2Ljc2M2QyNDEuOGQ5NTYuNzYzZDIzNy4yMDdkOTUyLjE2OWQyMTguODMxZDk0OC40MTFkMjAyLjk2MmQ5NDUuMDdkMTk5LjIwM2Q5MzYuM2QyMDUuNDY4ZDkxMi4wNzhkMjA0LjIxNWQ4OTIuMDMyZDIwMi45NjJkODcwLjczNGQxNTQuNTE4ZDg1MS4xMDZkMTMyLjM4NGQ4NTEuMTA2ZDExNC44NDVkODUxLjEwNmQxMDEuMjcyZDg2Mi43OTlkODcuNjk5ZDg3NC40OTJkODcuNjk5ZDg5MS42MTVkODcuNjk5ZDkxNC4xNjZkMTE2LjA5N2Q5MzEuNzA2ZDY1LjE0OGQ5MTYuMjU0ZDY1LjE0OGQ4OTMuNzAzZDY1LjE0OGQ4MDMuMDc5ZDEzNy4zOTZkODAzLjA3OWQxNTYuMTg5ZDgwMy4wNzlkMTc5LjE1OGQ4MDkuNzYxZDE2OS45N2Q3ODguMDQ1ZDE0OS4wODlkNzQ3Ljk1NGQxMzcuMzk2ZDczOC43NjZkMTM4LjY0OWQ3MzguMzQ5ZDE2NC41NDFkNzMwLjQxNGQxNjQuMTIzZDcyOS41NzlkMTM2LjE0M2Q3MjIuMDYxZDEyMi4zNjJkNzE0LjU0NGQxNDIuODI1ZDcwMi4wMTZkMTQxLjk5ZDcwMC4zNDVkMTEyLjc1NmQ2OTQuOTE2ZDEwMC4yMjhkNjg0Ljg5M2Q4My41MjNkNjQ4LjU2MWQ1OS4zMDFkNTk1LjUyM2Q0MC41MDhkNTg1LjA4M2QtMTUuMDM0ZDU2OC43OTZkNS4wMTFkNTQ0LjU3NGQyMi41NTFkNTQyLjA2OGQ0My40MzJkNTQyLjA2OGQ2Mi42NDJkNTQyLjA2OGQxMDAuNDM3ZDU0NS4yZDEzOC4yMzFkNTQ4LjMzMmQxNTcuNDQyZDU0OC4zMzJkMTY5Ljk3ZDU0OC4zMzJkMTk0LjgxOGQ1NDIuNjk0ZDIxOS42NjdkNTM3LjA1N2QyMzIuMTk1ZDUzNy4wNTdkMjM1LjUzNmQ1MzcuODkyZDIzNS41MzZkNTQ1LjQwOWQyMDIuMTI3ZDU2Mi45NDlkMTY1LjM3NmQ1ODIuMTU5ZDE2MS4yZDU4OS4yNTlkMTg4LjM0NWQ2MzUuMTk3ZDI0NS41NTlkNzI0Ljk4NWQyNDUuNTU5ZDcyNy4wNzNkMjM1LjExOWQ3NjAuMDY1ZDIzNi4zNzFkNzYyLjE1M2QyNDQuNzI0ZDc1NC4yMThkMjU4LjUwNWQ3NDguMzcxZDI2Ny4yNzVkNzUwLjg3N2QyNzcuMjk4ZDc3Mi4xNzZkMzQxLjYxMWQ2ODEuOTdkMzczLjc2OGQ2MzYuODY3ZDM5NS40ODRkNTg1LjA4M2Q0MTguNDUzZDU4MC40ODlkMzc4LjM2MmQ1NDguMzMyZDM2My4zMjdkNTQyLjQ4NmQzNjAuNDA0ZDU0Mi40ODZkMzYwLjgyMmQ1NDEuMjMzZDM3My43NjhkNTQxLjIzM2Q0MzUuOTkzZDU0NC41NzRkNDgyLjM0OWQ1NDcuMDc5ZDUxMS41ODJkNTQzLjczOGQ1MTJkNTQ1LjgyN2Q0NTkuMzhkNTc3LjE0OGQzODQuNjI2ZDY4OC4yMzRkMzA3LjM2N2Q4MDMuMDc5ZDMwNy4zNjdkODU4LjYyM2QzMjYuNTc3ZDg2NC4wNTJkMzM5LjUyM2Q4NjQuMDUyZDM5Mi41NjFkODY0LjA1MmQzOTIuNTYxZDgyOC45NzJkMzkyLjU2MWQ4MTAuNTk3ZDM2OS4xNzRkNzg4Ljg4ZDM5Mi45NzhkNzk2LjgxNWQ0MTMuMDI0ZDgyNi40NjZkNDEwLjEwMWQ5MTAuODI1ZDMzMC4zMzZkOTEwLjgyNWQzMTkuNDc3ZDkxMC44MjVkMzA3Ljc4NGQ5MDkuMTU0ZDMwOC42MTlkMTAwNy43MTJkMzM0LjkyOWQxMDExLjQ3MWQzODcuOTY3ZDEwMTEuNDcxZDM4Ny45NjdkOTc2LjM5MWQzODcuOTY3ZDk1Ny41OThkMzY0LjU4ZDkzNi4zaFIzZDQ5OS4wNTNSNGQ1MTJSNWQtMTUuMDM0UjZkNDg2Ljk0MlI3ZC0xNzkuOTkzUjhkNTAxLjk3N1I5ZDBSMTBkMjgzLjk4UjExaTE2NVIxMmQtMTUuMDM0UjEzZDQ5OS4wNTNSMTRhaTFpM2kzaTNpMmkyaTNpMmkzaTJpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpMmkyaTJpM2kyaTNpM2kyaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTNpMmkzaTJpM2kyaTJpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNoZzo1Mm9SMWQ3NDAuMDE5UjJhZDM2NS44MzNkODQzLjE3MWQzOTIuNTYxZDg5NS4zNzNkMzI0LjQ4OWQ4OTkuMTMyZDMyNi45OTVkOTM5LjY0MWQyOTQuMDAzZDk4OS4zMzdkMzIzLjY1NGQ5NjMuNDQ1ZDMyNC40ODlkOTc5LjczMmQzMjQuNDg5ZDk4NC4zMjZkMzIyLjQwMWQxMDMyLjM1MmQyOTEuOTE1ZDEwMTcuNzM1ZDI3OC4xMzNkMTAxNy43MzVkMjU4LjkyM2QxMDE3LjczNWQyNDQuMzA2ZDEwMzIuMzUyZDI0NS4xNDFkOTYwLjEwNGQyNDUuMTQxZDk1MC40OTlkMjQ0LjcyNGQ5MzMuMzc2ZDI0NC4zMDZkOTE0LjU4NGQyNDQuMzA2ZDkwNi42NDlkMTU2LjE4OWQ4ODEuNTkyZDE3NC41NjRkOTA4LjMxOWQxNjEuNjE4ZDkxMS42NmQxMzEuMTMyZDkwOC43MzdkOTEuODc2ZDkwNC45NzhkODUuNjExZDkwNC45NzhkNTUuOTZkOTA0Ljk3OGQ0My40MzJkOTQ3Ljk5M2QyNS4wNTdkOTE1LjQxOWQyNS4wNTdkOTAxLjIyZDI1LjA1N2Q4OTIuODY3ZDM1LjA3OWQ4NzkuOTIxZDE1NS43NzFkNzI0LjE1ZDI1OS4zNGQ1MzUuODA0ZDMwMC4yNjdkNTM0LjEzM2QzMjYuNTc3ZDUzNC45NjlkMzI3LjQxMmQ1MzkuNTYyZDMyNS43NDJkNTY3LjEyNWQyODguOTkxZDU2OS4yMTNkMzMyLjQyNGQ1ODcuNTg4ZDMyNS43NDJkNjAxLjc4N2QzMjQuMDcxZDY0Mi4yOTZkMzIyLjgxOGQ2NzkuNDY0ZDMwNC4wMjZkNzAwLjM0NWQzMjUuMzI0ZDY5OS45MjhkMzE1LjcxOWQ3MjIuMDYxZDMyOS4wODNkNzIzLjczMmQzMjQuNDg5ZDc4MC41MjhkMzI0LjQ4OWQ4NDQuNDI0ZDM0Mi40NDZkODQ0Ljg0MWQzNjUuODMzZDg0My4xNzFkMjQ0LjMwNmQ4NDMuNTg4ZDI1OC41MDVkNzI2LjY1NWQyNjMuNTE3ZDYxOC45MWQyMzAuMTA3ZDY3NS4yODhkMTkyLjEwNGQ3MzYuMjYxZDEzNi41NjFkODI1LjYzMWQxMDQuODIyZDg0Ni41MTJkMTExLjkyMWQ4NTEuOTQxZDIyMC4wODRkODQzLjE3MWQyNDQuMzA2ZDg0My41ODhoUjNkNDEyLjE4OVI0ZDM5Mi41NjFSNWQyNS4wNTdSNmQ0ODkuODY2UjdkLTguMzUyUjhkNDY0LjgwOVI5ZDBSMTBkMjgzLjk4UjExaTUyUjEyZDI1LjA1N1IxM2Q0MTIuMTg5UjE0YWkxaTJpMmkyaTJpMmkyaTNpM2kzaTJpM2kzaTJpMmkzaTNpM2kzaTNpM2kyaTJpMmkyaTJpMmkzaTNpMmkyaTJpM2kzaTFpM2kzaTNpMmkzaGc6MTY0b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTY0UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1MW9SMWQ3NDAuMDE5UjJhZDcxLjgzZDc3NC4yNjRkMTIwLjI3NGQ3NDQuMTk1ZDE1OS41M2Q3MTcuNDY4ZDIxOC40MTRkNjc3LjM3NmQyMTguNDE0ZDY0My45NjdkMjE4LjQxNGQ2MDUuMTI4ZDIwMS4yOTJkNTkyLjZkMTg3LjkyOGQ1ODIuNTc3ZDE0OS4wODlkNTgyLjU3N2QxMDkuODMzZDU4Mi41NzdkODUuMTk0ZDYwMi42MjNkNTguNDY2ZDYyNC4zMzlkNTguNDY2ZDY2Mi43NmQ1OC40NjZkNjcwLjY5NGQ1OS43MTlkNjc5LjA0N2Q0My4wMTRkNjY2LjkzNmQ0My4wMTRkNjM1LjYxNWQ0My4wMTRkNTM1LjM4NmQxOTMuNzc0ZDUzNS4zODZkMjI3LjE4NGQ1MzUuMzg2ZDI1MS44MjNkNTQ4LjMzMmQyNTIuNjU5ZDU2Ni4yOWQyNTguNTA1ZDYwMC45NTJkMjY1LjE4N2Q1ODMuNDEyZDI3My4xMjJkNTY3LjU0M2QyOTUuMjU2ZDU4Ny4xNzFkMjk1LjI1NmQ2MjAuOTk4ZDI5NS4yNTZkNjc4LjIxMmQyMTIuMTVkNzM0LjU5ZDI2OS4zNjNkNzM0LjU5ZDMwMC44OTNkNzY2Ljc0N2QzMzIuNDI0ZDc5OC45MDNkMzMyLjQyNGQ4NTYuMTE3ZDMzMi40MjRkOTQyLjE0NmQyNzUuMjFkOTg5Ljc1NWQyMjIuMTcyZDEwMzQuNDRkMTM0LjQ3M2QxMDM0LjQ0ZDkzLjk2NGQxMDM0LjQ0ZDU4Ljg4NGQxMDIzLjE2NGQxMC44NThkMTAwNy43MTJkMTAuODU4ZDk3NS45NzNkMTAuODU4ZDk0OC40MTFkNDguODYxZDkyNy4xMTJkODEuODUzZDkwOC43MzdkMTExLjkyMWQ5MDguNzM3ZDExNy43NjhkOTEwLjgyNWQxMTQuODQ1ZDkxNi4yNTRkOTAuNjIzZDkzNy45N2Q3MC41NzdkOTU1LjkyOGQ3MC41NzdkOTczLjA1ZDcwLjU3N2QxMDA2LjA0MmQxNTIuMDEzZDEwMDYuMDQyZDE4NS40MjJkMTAwNi4wNDJkMjEyLjk4NWQ5NzEuMzhkMjI3LjYwMWQ5NTMuMDA0ZDI0OS43MzVkOTA3LjQ4NGQyNjguMTFkODk3LjA0NGQyODguMTU2ZDg3OS4wODZkMjg1LjIzM2Q4NzYuNThkMjc0Ljc5MmQ4NzkuMDg2ZDI1My45MTFkODgzLjI2MmQyNDcuNjQ3ZDg3MS41NjlkMjQxLjhkODQ3LjM0N2QyNDMuODg5ZDg0NC44NDFkMjU4LjkyM2Q4NDguNmQyNjAuNTkzZDg0Ny4zNDdkMjYwLjU5M2Q4MzYuOTA3ZDIyMC45MmQ4MDkuNzYxZDE4Mi45MTZkNzgzLjQ1MWQxNjkuMTM1ZDc4MS4zNjNkMTYyLjAzNWQ3NzMuNDI5ZDExMS45MjFkNzczLjQyOWQ5NC4zODFkNzczLjQyOWQ3MS44M2Q3NzQuMjY0aFIzZDM1Ni4yMjhSNGQzMzIuNDI0UjVkMTAuODU4UjZkNDg4LjYxM1I3ZC0xMC40NFI4ZDQ3Ny43NTVSOWQwUjEwZDI4My45OFIxMWk1MVIxMmQxMC44NThSMTNkMzU2LjIyOFIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpMmkyaTJpM2kzaTNpM2hnOjE2M29SMWQ3NDAuMDE5UjJhZDc2Ljg0MWQ5MTUuNDE5ZDc2Ljg0MWQ5MTEuNjZkNzEuODNkOTExLjY2ZDcxLjgzZDkxMi40OTVkNzYuODQxZDkxNS40MTlkMTU3LjQ0MmQ4MTkuMzY3ZDE1Ni4xODlkODIxLjg3MmQxMjYuOTU1ZDc4OC4wNDVkMTQ4LjY3MmQ4MTYuNDQzZDE1NC4xMDFkODc2Ljk5OGQxNTUuNzcxZDg3NS43NDVkMTU1Ljc3MWQ4NjYuNTU3ZDE1Ni42MDZkODQ4LjZkMTU3LjQ0MmQ4MzAuNjQyZDE1Ny40NDJkODIxLjQ1NWQxNTcuNDQyZDgxOS4zNjdkMTU3LjQ0MmQ4MTkuMzY3ZDE1Ny40NDJkODE5LjM2N2QyODguMTU2ZDgwMi42NjJkMjczLjk1N2Q3NzEuMzRkMjIzLjQyNWQ3NzEuMzRkMTgzLjc1MmQ3NzEuMzRkMTcxLjY0MWQ3OTAuMTMzZDE2OS4xMzVkNzk0LjMwOWQxNTcuNDQyZDgxOS4zNjdkMTU4LjI3N2Q4MzAuNjQyZDE1Ny4wMjRkODY4LjY0NmQxNTYuMTg5ZDg5NC41MzhkMTU0LjUxOGQ5NjYuNzg2ZDE2NC4xMjNkOTc2LjM5MWQyMTMuNDAyZDk3OS43MzJkMjM2LjM3MWQ5ODIuMjM4ZDI4OC41NzRkOTg3LjY2N2QzMDMuMTlkOTk0Ljc2NmQzNTYuMjI4ZDEwMDguNTQ4ZDM2Ny45MjFkMTAyMS45MTFkMzU0LjU1N2QxMDI4LjU5M2QyMzguMDQyZDEwMjkuNDI5ZDExNy4zNWQxMDMwLjY4MWQxMDEuODk4ZDEwMzMuMTg3ZDk4LjE0ZDEwMzQuMDIyZDkuMTg3ZDEwNDYuNTUxZDMxLjMyMWQxMDA1LjIwN2Q3MS44M2Q5ODkuNzU1ZDc1LjE3MWQ5NzQuNzIxZDc2LjQyNGQ5MzYuM2Q3My45MThkOTM2LjNkNzEuODNkOTM2LjNkNzAuNTc3ZDkzNi43MTdkNzEuODNkOTEyLjQ5NWQ3MC41NzdkOTExLjY2ZDcxLjgzZDkxMS42NmQ3My41ZDg5Ny4wNDRkNzIuMjQ3ZDg5NC45NTVkNzIuMjQ3ZDg4Ni42MDNkNzEuODNkODQyLjMzNmQtMC40MTdkODMwLjY0MmQtMC40MTdkNzYwLjlkLTAuNDE3ZDc0OS42MjRkMTEuOTAyZDczMy41NDZkMjQuMjIxZDcxNy40NjhkMzUuMDc5ZDcxNC45NjJkMjEuNzE2ZDczNS40MjVkMjEuNzE2ZDc1Mi4xM2QyMS43MTZkNzg4Ljg4ZDcwLjk5NWQ3OTYuODE1ZDcwLjU3N2Q3NDUuMDNkNjkuNzQyZDY1OS4wMDFkMTAxLjg5OGQ2MDEuNzg3ZDE0MS41NzJkNTMwLjc5MmQyMjEuNzU1ZDUzMC43OTJkMjkzLjU4NWQ1MzAuNzkyZDMxOS44OTVkNTM3Ljg5MmQzODAuNDVkNTU0LjE3OWQzODYuMjk2ZDYxMi4yMjhkMzg3LjEzMmQ2MjIuNjY4ZDM4MC42NTlkNjM2Ljg2N2QzNzQuMTg1ZDY1MS4wNjZkMzY1LjQxNWQ2NTYuMDc4ZDM1NS4zOTNkNjYxLjkyNGQzMTEuNTQzZDY2Ny43NzFkMjcwLjYxNmQ2NzMuMmQyNjEuMDExZDY3Mi4zNjVkMjU5LjM0ZDY3MS45NDdkMjU2LjQxN2Q2NzQuNDUzZDI1NC43NDdkNjcxLjExMmQyNTYuNDE3ZDY3MS41M2QyNTkuMzRkNjcxLjk0N2QzMDcuMzY3ZDY1NC44MjVkMzQ3Ljg3NmQ2NDAuMjA4ZDM0OS4xMjhkNjIyLjI1MWQzNDQuOTUyZDU3Ny41NjZkMjg2LjkwM2Q1NjUuODcyZDI2OC4xMWQ1NjIuMTE0ZDIwOS4yMjZkNTYyLjExNGQxNzkuOTkzZDU2Mi4xMTRkMTY0LjEyM2Q2MDAuMTE3ZDE1MS41OTVkNjMwLjYwM2QxNTIuMDEzZDY2My41OTVkMTUyLjQzZDY4Mi4zODhkMTU0LjUxOGQ3MjQuMTVkMTU1Ljc3MWQ3NDcuNTM2ZDE1Mi4wMTNkNzYyLjk4OGQxNzkuNTc1ZDc0MS4yNzJkMjE2Ljc0M2Q3NDEuMjcyZDIzNy42MjRkNzQxLjI3MmQyODMuOThkNzY5LjI1MmQyODguOTkxZDc4NS45NTdkMjg4LjU3NGQ3OTUuMTQ1ZDI4OC4xNTZkODAyLjY2MmhSM2Q0MTguNDUzUjRkMzg3LjEzMlI1ZC0wLjQxN1I2ZDQ5My4yMDdSN2QtMjIuNTUxUjhkNDkzLjYyNFI5ZDBSMTBkMjgzLjk4UjExaTE2M1IxMmQtMC40MTdSMTNkNDE4LjQ1M1IxNGFpMWkyaTJpMmkyaTFpMmkyaTNpMmkzaTNpMmkxaTJpMWkzaTNpM2kzaTJpMmkyaTNpM2kyaTJpM2kzaTNpM2kzaTJpM2kyaTJpMmkyaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjUwb1IxZDc0MC4wMTlSMmFkMjMyLjYxM2QxMDIzLjE2NGQyNDUuNTU5ZDk5My41MTNkMjEyLjk4NWQxMDI4LjU5M2QxNjYuMjEyZDEwMjguNTkzZDE1MS41OTVkMTAyOC41OTNkMTM5LjA2NmQxMDAzLjUzNmQxMTMuMTc0ZDEwMjQuODM1ZDM3LjU4NWQxMDI0LjgzNWQxOS42MjhkMTAyNC44MzVkNy45MzRkMTAyMy4xNjRkODUuMTk0ZDkyNS40NDJkMTI2Ljk1NWQ4NzguNjY4ZDE0Mi44MjVkODcxLjU2OWQxNjguNzE3ZDg1Ni41MzVkMTU5Ljk0N2Q4NDkuMDE3ZDE0MS45OWQ4NDkuMDE3ZDE3NS44MTdkODExLjAxNGQxODIuMDgxZDgwNC43NWQyMDAuMDM5ZDc4Ny4yMWQyMjkuMjcyZDc2OC40MTdkMjEyLjk4NWQ3NjkuNjdkMjAxLjI5MmQ3NjguODM1ZDIzOC44NzdkNzAxLjU5OGQyMzguODc3ZDY2MC42NzJkMjM4Ljg3N2Q1ODUuNWQxNDguNjcyZDU4NS41ZDExOC4xODVkNTg1LjVkOTEuMDRkNjAzLjA0ZDYwLjEzN2Q2MjMuMDg2ZDYwLjEzN2Q2NTEuOTAyZDYwLjEzN2Q2ODQuNDc2ZDEwNi4wNzVkNzE0Ljk2MmQ1OS43MTlkNzA1Ljc3NGQ0My44NDlkNjkyLjQxMWQyMS43MTZkNjc0LjAzNWQyMS43MTZkNjI5Ljc2OGQyMS43MTZkNTg0LjI0N2Q4MS40MzVkNTU3LjEwMmQxMjkuNDYxZDUzNS4zODZkMTgxLjY2M2Q1MzUuMzg2ZDIwMC4wMzlkNTM1LjM4NmQyMjcuNjAxZDU0MS42NWQyNjAuNTkzZDU0OS4xNjhkMjY3LjY5M2Q1NTkuMTlkMjI1LjUxM2Q1NjcuOTZkMjI1LjkzMWQ1NjguMzc4ZDI1OC45MjNkNTc0LjIyNWQyOTUuMjU2ZDU4My40MTJkMjk0LjQyZDU5Mi4xODJkMjk1LjI1NmQ2MDMuMDRkMzIxLjk4M2Q2MTYuNDA0ZDMyMS45ODNkNjY1LjI2NWQzMjEuOTgzZDcyNi42NTVkMjQxLjM4M2Q4MzAuNjQyZDE4My43NTJkOTA0Ljk3OGQxMDkuNDE1ZDk3Mi4yMTVkMTUyLjQzZDk3NS41NTZkMTk1Ljg2MmQ5NzUuNTU2ZDMyMy4yMzZkOTc1LjU1NmQzMjMuMjM2ZDk0Mi41NjRkMzIzLjIzNmQ5MjUuNDQyZDI4Ni45MDNkODk5Ljk2N2QzNTEuNjM0ZDkwOC43MzdkMzUxLjYzNGQ5NTUuNTFkMzUxLjYzNGQ5OTYuODU0ZDMwOS40NTVkMTAxMi4zMDZkMjg2LjQ4NmQxMDIwLjY1OWQyMzIuNjEzZDEwMjMuMTY0aFIzZDM1Ni4yMjhSNGQzNTEuNjM0UjVkNy45MzRSNmQ0ODguNjEzUjdkLTQuNTkzUjhkNDgwLjY3OFI5ZDBSMTBkMjgzLjk4UjExaTUwUjEyZDcuOTM0UjEzZDM1Ni4yMjhSMTRhaTFpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2hnOjE2Mm9SMWQ3NDAuMDE5UjJhZDEyNi45NTVkOTMyLjk1OWQxNzAuMzg4ZDg0My4xNzFkMjE3Ljk5NmQ3MzMuMzM3ZDE2NC45NTlkNzM1LjAwOGQxMzMuMjJkNzcxLjc1OGQxMDIuNzM0ZDgwNi44MzhkMTAyLjczNGQ4NjAuNzExZDEwMi43MzRkOTAyLjg5ZDEyNi45NTVkOTMyLjk1OWQ0NC42ODVkMTA5Ni42NjVkOTMuMTI4ZDEwMDEuMDNkODguMTE3ZDk5Ny42OWQ0MS43NjFkOTY2Ljc4NmQzMS43MzhkOTAzLjcyNWQ0Mi41OTdkODk3LjA0NGQ2My4wNmQ4ODIuMDA5ZDU4LjQ2NmQ4NzguNjY4ZDQxLjM0NGQ4NzYuMTYzZDI2LjcyN2Q4NzQuMDc1ZDI1LjA1N2Q4NjkuMDYzZDY2LjgxOGQ3MDQuOTM5ZDIyMC41MDJkNzA0LjkzOWQyMzAuMTA3ZDcwNC45MzlkMjY1LjE4N2Q2MjIuNjY4ZDI2OS4zNjNkNjQ3LjcyNWQzMTYuMTM3ZDYyNy4yNjJkMzE4LjIyNWQ2MjcuNjhkMjgxLjA1N2Q3MTAuNzg2ZDMzNS4zNDdkNzIzLjczMmQzMzUuMzQ3ZDc2NS4wNzZkMzM1LjM0N2Q3ODMuNDUxZDMwNy4zNjdkNzk4LjA2OGQyODIuNzI3ZDgxMS4wMTRkMjYyLjY4MWQ4MTEuMDE0ZDI2MS4wMTFkODExLjAxNGQyNTguMDg4ZDgxMy41MmQyNTZkODE0Ljc3M2QyNTMuOTExZDgxMC4xNzlkMjU2LjgzNWQ4MTEuMDE0ZDI2MS4wMTFkODExLjAxNGQyNjYuODU4ZDgwNi4wMDNkMjc4LjEzM2Q3OTIuMjIxZDI5My4xNjhkNzczLjg0NmQyOTMuMTY4ZDc2OGQyOTMuMTY4ZDc1Mi41NDhkMjY3LjI3NWQ3NDIuMTA3ZDE2Ny40NjRkOTY1LjExNWQxOTMuMzU3ZDk3Ny42NDRkMjI1LjUxM2Q5NzcuNjQ0ZDI3OC41NTFkOTc3LjY0NGQzMzYuMTgyZDkxMC40MDdkMzM5LjEwNmQ5MjAuMDEzZDMzOS4xMDZkOTI3Ljk0N2QzMzYuMTgyZDk0My4zOTlkMzI2LjE1OWQ5NTAuMDgxZDMwNy43ODRkOTY0LjI4ZDMwOS4wMzdkOTY0LjY5OGQzMjUuMzI0ZDk2MS4zNTdkMjc2LjA0NWQxMDA2Ljg3N2QyNjguOTQ2ZDEwMTEuNDcxZDI0MC41NDhkMTAyOS44NDZkMTk0LjE5MmQxMDI5Ljg0NmQxNjYuMjEyZDEwMjkuODQ2ZDE0MS41NzJkMTAyMy4xNjRkMTA4Ljk5OGQxMDk2LjY2NWQxMDQuNDA0ZDEwNzcuNDU1ZDc2LjAwNmQxMDk3LjA4M2Q1MC41MzFkMTA5Ny4wODNkNDcuMTlkMTA5Ny4wODNkNDQuNjg1ZDEwOTYuNjY1aFIzZDM1Ni4yMjhSNGQzMzkuMTA2UjVkMjUuMDU3UjZkNDAxLjMzMVI3ZC03My4wODNSOGQzNzYuMjc0UjlkMFIxMGQyODMuOThSMTFpMTYyUjEyZDI1LjA1N1IxM2QzNTYuMjI4UjE0YWkxaTNpM2kzaTNpMWkyaTJpM2kzaTNpM2kzaTJpMmkyaTNpMmkzaTNpM2kyaTNpMmkzaTNpM2kzaTJpM2kzaTJpM2kzaTJpMmkzaTNpM2kyaTJpM2kzaGc6NDlvUjFkNzQwLjAxOVIyYWQxNzQuOTgyZDUzNC41NTFkMTc0LjU2NGQ1MzQuNTUxZDE4My4zMzRkNTM0LjU1MWQyMDAuMDM5ZDUzNC4xMzNkMjEyLjk4NWQ1MzQuNTUxZDIxNC42NTVkNTUyLjA5MWQyMTQuNjU1ZDU1Ny4xMDJkMjA2LjcyMWQ1NzYuNzNkMTk3Ljk1MWQ1OTguNDQ2ZDE5Ni42OThkNjA0LjcxMWQxOTcuOTUxZDYwNS4xMjhkMTk5LjYyMWQ2MDUuMTI4ZDIwMy43OTdkNjA1LjEyOGQyMTMuNDAyZDYwMy40NThkMjAxLjI5MmQ3MTUuMzhkMjAxLjI5MmQ3ODEuNzgxZDIwMS4yOTJkOTc4Ljg5N2QyMjIuMTcyZDk4OC45MmQyNDUuOTc3ZDk5NS42MDFkMjkyLjMzMmQxMDEzLjE0MWQyNzcuMjk4ZDEwMjEuNDk0ZDI2My4wOTlkMTAyMS40OTRkMTEzLjU5MmQxMDIxLjA3NmQxNTQuNTE4ZDk5NS42MDFkMTE5LjAyMWQxMDEwLjYzNmQxMDguOTk4ZDEwMTMuNTU5ZDkxLjA0ZDEwMTguOTg4ZDYwLjk3MmQxMDIxLjQ5NGQ1MS43ODRkMTAwOC45NjVkNzMuOTE4ZDk4OC45MmQxMTguMTg1ZDk4MC4xNWQxMjYuMTJkOTYwLjUyMmQxMjguMjA4ZDkzNS40NjRkMTI5LjQ2MWQ5MjAuMDEzZDEyOC4yMDhkODg2LjE4NWQxMjYuNTM4ZDgzOS40MTJkMTMxLjk2N2Q4MjQuMzc4ZDEzOS40ODRkNzk3LjIzM2QxMzcuODE0ZDc5NS41NjJkMTI4LjIwOGQ3OTkuMzIxZDEyNy43OTFkNzk3LjY1ZDEyMi4zNjJkNzY3LjU4MmQxMTguNjAzZDc0Ny41MzZkMTE4LjYwM2Q3MzUuODQzZDExOS40MzhkNzMzLjc1NWQxNDMuNjZkNzUyLjEzZDE3NC4xNDZkNzg4LjQ2M2QxMjcuMzczZDcwOC4yOGQxMjguMjA4ZDY5OS4wOTJkMTUxLjE3N2Q3MTIuODc0ZDEyMy4xOTdkNjc2Ljk1OWQxMjguNjI2ZDY0Ny43MjVkMTI4LjYyNmQ2NDEuNDYxZDEyOC4yMDhkNjEwLjk3NWQxMjQuODY3ZDYxMC45NzVkMTA0LjQwNGQ2MTAuOTc1ZDczLjkxOGQ2NDEuMDQ0ZDQxLjM0NGQ2NzMuMmQxNS4wMzRkNjc4LjIxMmQxNC4xOTlkNjc2LjU0MWQxNS44NjlkNjg0LjA1OGQ0MS43NjFkNjUyLjczN2Q0OC40NDNkNjEzLjA2M2Q1NC4yOWQ1NzguNDAxZDY3LjY1NGQ1NjcuNTQzZDkxLjA0ZDU0OC43NWQxNzQuOTgyZDUzNC41NTFoUjNkMzAxLjEwMlI0ZDI5Mi4zMzJSNWQxNC4xOTlSNmQ0ODkuODY2UjdkMi41MDVSOGQ0NzUuNjY3UjlkMFIxMGQyODMuOThSMTFpNDlSMTJkMTQuMTk5UjEzZDMwMS4xMDJSMTRhaTFpMmkyaTJpMmkyaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTJpMmkyaTNpM2kyaTNpMmkyaTNpM2kyaTNpMmkyaTJpMmkzaTJpMmkzaTNpMmkyaTNpM2kzaGc6MTYxb1IxZDc0MC4wMTlSMmFkNjUuMTQ4ZDg2MS45NjRkNTIuMjAyZDkzMy43OTRkMjAuMDQ1ZDEwNzYuMjAyZDMzLjgyN2QxMDkyLjkwN2Q0Ni4zNTVkMTExNC4yMDVkNDMuMDE0ZDExMTUuODc2ZDI0LjIyMWQxMTEyLjk1MmQxOS4yMWQxMTMwLjkxZDE5LjIxZDExNjcuMjQzZDE5LjIxZDEyMTIuNzYzZDMyLjk5MWQxMjEyLjc2M2QzOS42NzNkMTIxMi43NjNkNTMuNDU1ZDEyMDcuNTQzZDY3LjIzNmQxMjAyLjMyM2Q3My45MThkMTIwMi4zMjNkNzkuNzY1ZDEyMDIuMzIzZDkyLjA4NGQxMjA3LjU0M2QxMDQuNDA0ZDEyMTIuNzYzZDEwOS44MzNkMTIxMi43NjNkMTIxLjEwOWQxMjEyLjc2M2QxMjEuMTA5ZDExNTYuMzg0ZDEyMS4xMDlkMTAxMS4wNTNkNjUuMTQ4ZDg2MS45NjRkMTkuMjFkNzY3LjE2NGQyMC44OGQ3NjguNDE3ZDU1LjU0M2Q3NjguNDE3ZDY3LjIzNmQ3NjguNDE3ZDY4LjQ4OWQ3NzEuMzRkNDUuNTJkNzgwLjUyOGQyMy4zODZkNzkwLjk2OWQzOC4wMDNkODA4LjkyNmQ0NS4xMDJkODA4LjkyNmQ0OS42OTZkODA4LjkyNmQ1OC4wNDhkODA2LjYyOWQ2Ni40MDFkODA0LjMzMmQ3MC45OTVkODA0LjMzMmQ3Mi42NjVkODA0LjMzMmQ3My45MThkODA1LjE2OGQ3MC41NzdkODEwLjE3OWQ2NC4zMTNkODIwLjIwMmQ2NS4xNDhkODIxLjAzN2QxMTQuODQ1ZDgyMS4wMzdkMTE0Ljg0NWQ3NjhkMTE0Ljg0NWQ3MTguMzAzZDY4LjQ4OWQ3MTguMzAzZDE5LjIxZDcxOC4zMDNkMTkuMjFkNzY3LjE2NGhSM2QxNDAuMzE5UjRkMTIxLjEwOVI1ZDE5LjIxUjZkMzA1LjY5NlI3ZC0xODguNzYzUjhkMjg2LjQ4NlI5ZDBSMTBkMjgzLjk4UjExaTE2MVIxMmQxOS4yMVIxM2QxNDAuMzE5UjE0YWkxaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNoZzo0OG9SMWQ3NDAuMDE5UjJhZDMzNy40MzVkODIzLjU0M2QzNTkuNTY5ZDc4OC4wNDVkMzYzLjMyN2Q3ODEuMzYzZDM3Ny4xMDlkNzU0LjYzNmQzNzcuNTI2ZDczNS40MjVkMzc0LjYwM2Q3MzQuMTcyZDM2NC41OGQ3MzQuMTcyZDM1NC45NzVkNzM0LjE3MmQzMzguMjdkNzM1LjQyNWQzNTYuNjQ2ZDcyMi44OTdkMzc0LjYwM2Q3MDcuNDQ1ZDM2Mi45MWQ2MzAuNjAzZDMyMi40MDFkNTc5LjY1NGQyNzUuMjFkNTIwLjM1MmQyMDIuOTYyZDUyMC4zNTJkMTE2LjkzM2Q1MjAuMzUyZDY4LjkwN2Q2MDEuMzdkMjguMzk4ZDY2OS40NDJkMjguMzk4ZDc2Mi4xNTNkMjguMzk4ZDg1Ni41MzVkNjguOTA3ZDkzMi41NDFkMTE4LjYwM2QxMDI1LjY3ZDIwNS40NjhkMTAyNS42N2QyNDkuNzM1ZDEwMjUuNjdkMjkxLjQ5N2Q5OTAuNTlkMzI4LjI0N2Q5NjAuMTA0ZDM0OS41NDZkOTE1LjQxOWQzMzMuNjc2ZDkxMi40OTVkMzE4LjY0MmQ5MDcuMDY2ZDMzOC42ODhkOTAxLjYzN2QzNTkuMTUxZDg5Mi4wMzJkMzc3Ljk0NGQ4NDAuNjY1ZDM3Ni4yNzRkODAzLjQ5N2QzNzUuODU2ZDc5My40NzRkMzczLjc2OGQ3OTEuODA0ZDMzNy44NTNkODIzLjk2ZDMzNy40MzVkODIzLjU0M2QzMDYuOTQ5ZDcwOS4xMTVkMzA2Ljk0OWQ3ODguNDYzZDI4OC41NzRkODQ2LjUxMmQyOTkuMDE0ZDg2NC40NjlkMzA4LjYxOWQ4ODUuMzVkMzAwLjY4NWQ4OTUuMzczZDI3Mi43MDRkODk3LjA0NGQyNTMuNDk0ZDk0MC4wNThkMjQ1LjU1OWQ5NTEuMzM0ZDIyNC42NzhkOTgwLjk4NWQxOTYuMjhkOTgwLjk4NWQxNDYuNTg0ZDk4MC45ODVkMTE5Ljg1NmQ5MzAuMDM1ZDk4Ljk3NWQ4ODkuOTQ0ZDk4Ljk3NWQ4MzUuNjU0ZDk4Ljk3NWQ4MDMuNDk3ZDEwNS4yMzlkNzY0LjI0MWQ5OS4zOTNkNzYyLjk4OGQ4Ni40NDZkNzYyLjk4OGQ3Ni40MjRkNzYyLjk4OGQ2MS44MDdkNzYzLjgyM2QxMDguOTk4ZDc0MS42OWQxMTIuMzM5ZDcyNC41NjdkMTA4LjE2M2Q3MTkuNTU2ZDEwNi40OTJkNzExLjYyMWQxMDYuOTFkNzA5Ljk1MWQxMTkuMDIxZDY5NC45MTZkOTEuMDRkNjg4LjIzNGQxMTAuMjUxZDY3Mi43ODNkMTMxLjU0OWQ2NTIuNzM3ZDE0Ny40MTlkNjEzLjA2M2QxNTkuMTEyZDU5Ni43NzZkMTgwLjQxMWQ1NjYuNzA3ZDIwOS42NDRkNTY2LjcwN2QyNjEuNDI5ZDU2Ni43MDdkMjg2LjkwM2Q2MTQuNzM0ZDMwNi45NDlkNjUyLjMxOWQzMDYuOTQ5ZDcwOS4xMTVoUjNkNDA1LjUwN1I0ZDM3Ny45NDRSNWQyOC4zOThSNmQ1MDMuNjQ3UjdkLTEuNjdSOGQ0NzUuMjQ5UjlkMFIxMGQyODMuOThSMTFpNDhSMTJkMjguMzk4UjEzZDQwNS41MDdSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2hnOjE2MG9SMWQ3NDAuMDE5UjJhaFIzZDQ5Ny4zODNSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDBSMTBkMjgzLjk4UjExaTE2MFIxMmQwUjEzZDQ5Ny4zODNSMTRhaGc6NDdvUjFkNzQwLjAxOVIyYWQzMS43MzhkMTEyNy45ODZkMTk3LjExNWQ4MDIuNjYyZDMzMS41ODhkNDg2LjEwN2QzMzUuNzY1ZDUxMS4xNjRkMzgyLjUzOGQ0OTAuNzAxZDM4NC42MjZkNDkxLjExOWQ5Ni4wNTJkMTEyNy45ODZkOTEuNDU4ZDExMDguNzc2ZDYzLjA2ZDExMjguNDA0ZDM3LjU4NWQxMTI4LjQwNGQzNC4yNDRkMTEyOC40MDRkMzEuNzM4ZDExMjcuOTg2aFIzZDQxOS43MDZSNGQzODQuNjI2UjVkMzEuNzM4UjZkNTM3Ljg5MlI3ZC0xMDQuNDA0UjhkNTA2LjE1M1I5ZDBSMTBkMjgzLjk4UjExaTQ3UjEyZDMxLjczOFIxM2Q0MTkuNzA2UjE0YWkxaTNpMmkzaTJpMmkzaTNoZzoxNTlvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNTlSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ2b1IxZDc0MC4wMTlSMmFkODMuNTIzZDkzOC44MDVkMTAyLjMxNmQ5MzguODA1ZDExNi43MjRkOTUwLjA4MWQxMzEuMTMyZDk2MS4zNTdkMTMxLjEzMmQ5NzkuNzMyZDEzMS4xMzJkMTAyOS4wMTFkODUuNjExZDEwMjkuMDExZDM5LjY3M2QxMDI5LjAxMWQzOS42NzNkOTgzLjQ5MWQzOS42NzNkOTY1Ljk1MWQ1Mi44MjhkOTUyLjM3OGQ2NS45ODNkOTM4LjgwNWQ4My41MjNkOTM4LjgwNWhSM2QxNjMuNzA2UjRkMTMxLjEzMlI1ZDM5LjY3M1I2ZDg1LjE5NFI3ZC01LjAxMVI4ZDQ1LjUyUjlkMFIxMGQyODMuOThSMTFpNDZSMTJkMzkuNjczUjEzZDE2My43MDZSMTRhaTFpM2kzaTNpM2kzaTNoZzoxNThvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNThSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ1b1IxZDc0MC4wMTlSMmFkMjguMzk4ZDgzMy4xNDhkMTI3LjM3M2Q4MzIuNzNkMTU5Ljk0N2Q4NTUuNjk5ZDE1MC4zNDJkODMyLjczZDIzOC4wNDJkODMyLjMxM2QyNDEuOGQ4MzIuMzEzZDI2MC41OTNkODMzLjk4M2QyNjAuMTc2ZDgzNi4wNzFkMjYwLjE3NmQ4NDAuNjY1ZDI3My4xMjJkODQ1LjY3NmQyNjIuMjY0ZDg2Ni4xNGQyNjEuNDI5ZDg2OS4wNjNkMjYxLjQyOWQ4ODQuOTMzZDIyNS41MTNkODg0LjkzM2QyMDQuNjMyZDg2Ny4zOTNkMTk2LjI4ZDg4NC45MzNkMjYuNzI3ZDg4NS4zNWQyNy41NjJkODgzLjI2MmQzOC40MmQ4NzMuNjU3ZDM1LjA3OWQ4NzIuNDA0ZDMxLjMyMWQ4NjQuNDY5ZDI3LjU2MmQ4NjYuOTc1ZDIwLjQ2M2Q4NzAuNzM0ZDI4LjM5OGQ4MzMuMTQ4aFIzZDI5MS40OTdSNGQyNzMuMTIyUjVkMjAuNDYzUjZkMTkxLjY4NlI3ZDEzOC42NDlSOGQxNzEuMjIzUjlkMFIxMGQyODMuOThSMTFpNDVSMTJkMjAuNDYzUjEzZDI5MS40OTdSMTRhaTFpMmkyaTJpMmkzaTJpM2kyaTNpMmkyaTJpMmkzaTNpM2kyaGc6MTU3b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTU3UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0NG9SMWQ3NDAuMDE5UjJhZDgzLjUyM2Q5MzguODA1ZDEwMi4zMTZkOTM4LjgwNWQxMTYuNzI0ZDk1MC4wODFkMTMxLjEzMmQ5NjEuMzU3ZDEzMS4xMzJkOTc5LjczMmQxMzEuMTMyZDk4MS44MmQxMTkuMDIxZDEwMjkuNDI5ZDEwNS4yMzlkMTA4My43MTlkODguOTUyZDExNDcuMTk3ZDg0LjM1OGQxMTQ3LjE5N2Q3Ni44NDFkMTE0Ny4xOTdkNjYuODE4ZDEwODUuMzg5ZDYxLjM4OWQxMDUzLjIzM2Q1Mi42MTlkMTAxNi40ODJkMzkuNjczZDEwMDIuMjgzZDM5LjY3M2Q5ODMuNDkxZDM5LjY3M2Q5NjUuOTUxZDUyLjgyOGQ5NTIuMzc4ZDY1Ljk4M2Q5MzguODA1ZDgzLjUyM2Q5MzguODA1aFIzZDE2My43MDZSNGQxMzEuMTMyUjVkMzkuNjczUjZkODUuMTk0UjdkLTEyMy4xOTdSOGQ0NS41MlI5ZDBSMTBkMjgzLjk4UjExaTQ0UjEyZDM5LjY3M1IxM2QxNjMuNzA2UjE0YWkxaTNpM2kzaTJpM2kzaTNpM2kzaTNoZzoxNTZvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNTZSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQzb1IxZDc0MC4wMTlSMmFkNjguNDg5ZDc1My44ZDExMS45MjFkNzY0LjI0MWQxNDAuNzM3ZDc2NC4yNDFkMTY3Ljg4MmQ3NjQuMjQxZDIxMi4xNWQ3NTMuOGQyMTQuNjU1ZDczNy41MTNkMjI3LjE4NGQ3MzcuNTEzZDIzMC45NDJkNzM1Ljg0M2QyMjMuNDI1ZDcyNy40OTFkMjE1LjkwOGQ3MTYuMjE1ZDIxNy4xNjFkNjkzLjY2M2QyMTcuMTYxZDY3Mi4zNjVkMjE3LjE2MWQ2MjkuMzVkMjEyLjE1ZDU5MC41MTJkMjcxLjAzNGQ1OTAuNTEyZDI2NS4xODdkNjQyLjcxNGQyNjUuMTg3ZDY4My4yMjNkMjY1LjE4N2Q3MjQuMTVkMjcxLjAzNGQ3NTMuOGQzMTQuODg0ZDc2Mi4xNTNkMzQ1Ljc4N2Q3NjIuMTUzZDM3OC43NzlkNzYyLjE1M2Q0MTUuOTQ3ZDc1My44ZDQxNS45NDdkNzcwLjUwNWQzNjcuMDg2ZDc5MS44MDRkNDE1Ljk0N2Q3ODYuNzkyZDQxNS45NDdkODEyLjI2N2QzNzguNzc5ZDgwNC43NWQzNDUuMzdkODA0Ljc1ZDMxNC40NjZkODA0Ljc1ZDI3MS4wMzRkODEyLjI2N2QyNjQuMzUyZDg1My42MTFkMjY0LjM1MmQ4OTQuMTJkMjY0LjM1MmQ5MzQuNjI5ZDI3MS4wMzRkOTc0LjMwM2QyMTIuMTVkOTc0LjMwM2QyMTguODMxZDk0MC44OTNkMjE4LjgzMWQ4OTcuODc5ZDIxOC44MzFkODUwLjY4OGQyMTIuMTVkODEyLjI2N2QxODIuOTE2ZDgwNy42NzNkMTIwLjY5MWQ3OTAuMTMzZDEyNy4zNzNkNzk1LjU2MmQxMzUuMzA4ZDgwNS4xNjhkMTA4LjU4ZDgwNS4xNjhkNjguNDg5ZDgxMi4yNjdkNjguNDg5ZDc1My44aFIzZDQ3My41NzlSNGQ0MTUuOTQ3UjVkNjguNDg5UjZkNDMzLjQ4N1I3ZDQ5LjY5NlI4ZDM2NC45OThSOWQwUjEwZDI4My45OFIxMWk0M1IxMmQ2OC40ODlSMTNkNDczLjU3OVIxNGFpMWkzaTNpMmkyaTJpM2kzaTNpMmkzaTNpM2kzaTJpMmkyaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kyaGc6MTU1b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTU1UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0Mm9SMWQ3NDAuMDE5UjJhZDIyMi41OWQ2ODIuMzg4ZDI0OC45ZDcwOS45NTFkMjQ4LjlkNzI1LjQwMmQyNDguOWQ3MzEuNjY3ZDIwMi41NDRkNzYwLjlkMTgyLjkxNmQ3NjAuOWQxNTcuMDI0ZDY5Ny4wMDRkMTMwLjI5NmQ3NjAuOWQxMDguOTk4ZDc2MC45ZDEwNS42NTdkNzU5LjY0N2Q5MS40NThkNzQ5LjIwN2Q3MS44M2Q3MzUuMDA4ZDYzLjQ3N2Q3MzAuNDE0ZDYzLjQ3N2Q3MjQuNTY3ZDYzLjQ3N2Q3MTAuMzY4ZDg4LjUzNWQ2ODQuODkzZDM5LjY3M2Q2ODQuNDc2ZDM5LjY3M2Q2NzEuOTQ3ZDM5LjY3M2Q2NjguMTg5ZDQxLjU1M2Q2NjEuMDg5ZDQzLjQzMmQ2NTMuOTlkNDMuNDMyZDY1MC4yMzFkNDMuNDMyZDY0Ni40NzNkNDEuNzYxZDYzOS4xNjRkNDAuMDkxZDYzMS44NTZkNDAuMDkxZDYyOC4wOTdkNDAuMDkxZDYxNS4xNTFkNjcuMjM2ZDYxNS4xNTFkNzguNTEyZDYxNS4xNTFkOTQuMzgxZDYxNy4yMzlkNjMuNDc3ZDU4Ny41ODhkNjMuNDc3ZDU3MS4zMDFkNjYuNDAxZDU2Ny4xMjVkODYuMjM4ZDU1MS4yNTZkMTA2LjA3NWQ1MzUuMzg2ZDEwOC45OThkNTM1LjM4NmQxMzAuMjk2ZDUzNS4zODZkMTU3LjAyNGQ1OTguODY0ZDE4My43NTJkNTM0Ljk2OWQyMDIuNTQ0ZDUzNC45NjlkMjE4LjgzMWQ1NDYuNjYyZDI0MC4xM2Q1NjAuODYxZDI0OC45ZDU2NS40NTVkMjQ4LjlkNTcwLjg4NGQyNDguOWQ1ODguMDA2ZDIxOC44MzFkNjE3LjIzOWQyMzcuNjI0ZDYxNC4zMTZkMjQyLjYzNmQ2MTQuMzE2ZDI4MC4yMjFkNjE0LjMxNmQyODAuMjIxZDYyNi44NDVkMjgwLjIyMWQ2MzAuNjAzZDI3OC41NTFkNjM3LjkxMWQyNzYuODhkNjQ1LjIyZDI3Ni44OGQ2NDguOTc4ZDI3Ni44OGQ2NTIuNzM3ZDI3OC43NmQ2NjAuMDQ1ZDI4MC42MzlkNjY3LjM1M2QyODAuNjM5ZDY3MS4xMTJkMjgwLjYzOWQ2ODIuMzg4ZDI1NS41ODJkNjg0LjA1OGQyMzguMDQyZDY4NS4zMTFkMjIyLjU5ZDY4Mi4zODhoUjNkMzExLjk2UjRkMjgwLjYzOVI1ZDM5LjY3M1I2ZDQ4OS4wM1I3ZDI2My4wOTlSOGQ0NDkuMzU3UjlkMFIxMGQyODMuOThSMTFpNDJSMTJkMzkuNjczUjEzZDMxMS45NlIxNGFpMWkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTU0b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTU0UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0MW9SMWQ3NDAuMDE5UjJhZC0zMS4zMjFkNDc5LjAwOGQxMTIuMzM5ZDYzNi4wMzJkMTI5LjQ2MWQ4MjcuNzE5ZDE0OC4yNTRkODQzLjE3MWQxMzEuNTQ5ZDg3MC4zMTZkMTMxLjU0OWQ5NjAuNTIyZDk2LjQ2OWQxMDUxLjE0NWQxMjYuOTU1ZDEwNDkuMDU3ZDEwNy43NDVkMTA2MC4zMzJkODYuNDQ2ZDEwNzUuNzg0ZDQ0LjI2N2QxMTcyLjY3MmQtMjkuMjMzZDEyNTAuMzQ5ZDg0Ljc3NmQxMjA3LjMzNGQxNTMuMjY1ZDExMDAuMDA2ZDIxOC44MzFkOTk2LjQzN2QyMTguODMxZDg3MS41NjlkMjE4LjgzMWQ4MjguOTcyZDIxMS4zMTRkNzg5LjI5OGQxOTUuMDI3ZDc3NC4yNjRkMTc3LjkwNWQ3NTMuOGQxODAuNDExZDc1Mi4xM2QyMDAuNDU2ZDc1NS4wNTNkMjAyLjU0NGQ3NTMuOGQxNTQuMTAxZDU4My40MTJkLTMxLjMyMWQ0NzkuMDA4aFIzZDI2OC45NDZSNGQyMTguODMxUjVkLTMxLjMyMVI2ZDU0NC45OTFSN2QtMjI2LjM0OVI4ZDU3Ni4zMTNSOWQwUjEwZDI4My45OFIxMWk0MVIxMmQtMzEuMzIxUjEzZDI2OC45NDZSMTRhaTFpM2kyaTJpM2kyaTNpM2kzaTNpM2kzaTJpMmkyaTNoZzoxNTNvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNTNSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQwb1IxZDc0MC4wMTlSMmFkMzA0LjQ0M2Q0NzkuMDA4ZDE2MC4zNjVkNjM2LjAzMmQxNDMuNjZkODI3LjcxOWQxMjQuODY3ZDg0My4xNzFkMTQxLjU3MmQ4NzAuMzE2ZDE0MS41NzJkOTYwLjUyMmQxNzYuMjM0ZDEwNTEuMTQ1ZDE0NS43NDhkMTA0OS4wNTdkMTgwLjQxMWQxMDY5LjEwMmQyMjYuMzQ5ZDExNDAuOTMzZDI4My45OGQxMjMxLjEzOGQzMDIuMzU1ZDEyNTAuMzQ5ZDE4OC4zNDVkMTIwNy4zMzRkMTE5Ljg1NmQxMTAwLjAwNmQ1NC4yOWQ5OTYuNDM3ZDU0LjI5ZDg3MS41NjlkNTQuMjlkODI4Ljk3MmQ2MS44MDdkNzg5LjI5OGQ3OC4wOTRkNzc0LjI2NGQ5NS4yMTZkNzUzLjhkOTIuMjkzZDc1Mi4xM2Q3Mi4yNDdkNzU1LjA1M2Q3MC4xNTlkNzUzLjhkMTE5LjAyMWQ1ODMuNDEyZDMwNC40NDNkNDc5LjAwOGhSM2QyNjguOTQ2UjRkMzA0LjQ0M1I1ZDU0LjI5UjZkNTQ0Ljk5MVI3ZC0yMjYuMzQ5UjhkNDkwLjcwMVI5ZDBSMTBkMjgzLjk4UjExaTQwUjEyZDU0LjI5UjEzZDI2OC45NDZSMTRhaTFpM2kyaTJpM2kyaTNpM2kzaTNpM2kzaTJpMmkyaTNoZzoxNTJvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNTJSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM5b1IxZDc0MC4wMTlSMmFkNzYuNDI0ZDc0NS44NjZkMjkuNjVkNTk4LjQ0NmQyOS42NWQ1NTQuNTk3ZDI5LjY1ZDUwMy4yM2Q0Ny4xOWQ1MDMuMjNkNTIuMjAyZDUwMy4yM2Q2MS41OThkNTA1LjczNWQ3MC45OTVkNTA4LjI0MWQ3Ni4wMDZkNTA4LjI0MWQ4MS4wMTdkNTA4LjI0MWQ5MS4wNGQ1MDUuOTQ0ZDEwMS4wNjNkNTAzLjY0N2QxMDYuMDc1ZDUwMy42NDdkMTIyLjc3OWQ1MDMuNjQ3ZDEyMi43NzlkNTQ2LjI0NGQxMjIuNzc5ZDU4Ny41ODhkMTA0LjgyMmQ2NDguOTc4ZDc2LjQyNGQ3NDUuODY2aFIzZDE1NC41MThSNGQxMjIuNzc5UjVkMjkuNjVSNmQ1MjAuNzY5UjdkMjc4LjEzM1I4ZDQ5MS4xMTlSOWQwUjEwZDI4My45OFIxMWkzOVIxMmQyOS42NVIxM2QxNTQuNTE4UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kyaGc6MTUxb1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTUxUjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozOG9SMWQ3NDAuMDE5UjJhZDIyOS42OWQ3MzcuMDk2ZDI1Ni44MzVkNzAyLjQzM2QyNTYuODM1ZDY2NS4yNjVkMjU2LjgzNWQ1OTcuNjExZDE3OC4zMjNkNTk3LjYxMWQxMjQuODY3ZDU5Ny42MTFkMTI0Ljg2N2Q2NTEuNDg0ZDEyNC44NjdkNjc1LjI4OGQxNTcuNDQyZDY5OC4yNTdkMTQ1Ljc0OGQ3MDQuOTM5ZDEzOC4yMzFkNzEzLjI5MmQxNTUuNzcxZDcxMi44NzRkMTc2LjY1MmQ3MTIuNDU2ZDE5NC42MWQ3MTguNzIxZDE5NS44NjJkNzE5LjU1NmQyMjkuNjlkNzM3LjA5NmQ0NTMuOTUxZDEyMjAuNjk4ZDM5MS43MjVkMTExMC44NjRkMzkxLjcyNWQxMDQ1LjcxNmQzOTEuNzI1ZDEwMjkuODQ2ZDQwNC4wNDVkOTk3Ljg5OGQ0MTYuMzY1ZDk2NS45NTFkNDE2LjM2NWQ5NTMuMDA0ZDQxNi4zNjVkOTM3Ljk3ZDQwMy4wMDFkOTI2LjI3N2QzODAuODY3ZDkwNi42NDlkNDAwLjkxM2Q4OTMuMjg1ZDQwMC40OTVkODkyLjQ1ZDM2Mi45MWQ4OTIuMDMyZDM1OS4xNTFkODkxLjE5N2QzNDkuOTY0ZDg4OS4xMDlkMzIyLjQwMWQ4NzIuODIyZDI1Ni44MzVkOTY4LjQ1NmQyMDkuMjI2ZDEwMjYuMDg4ZDE2NS43OTRkMTAyNi4wODhkMTA0LjgyMmQxMDI2LjA4OGQ3MC4xNTlkOTgyLjIzOGQ3MC45OTVkOTgwLjk4NWQ5NS42MzRkOTg1Ljk5NmQ5Ny43MjJkOTg0LjMyNmQ3NS4xNzFkOTY5LjI5MmQ1MS43ODRkOTQ4LjQxMWQ1OC4wNDhkOTMyLjEyM2Q2My40NzdkOTA5LjU3MmQ2Mi42NDJkOTA4LjMxOWQ2MC45NzJkOTA4LjMxOWQ1OC40NjZkOTA4LjMxOWQ1NS45NmQ5MDkuMTU0ZDQ5LjI3OGQ5MTEuMjQzZDQ3LjE5ZDkxMi4wNzhkNDUuMTAyZDkwOS41NzJkNDUuMTAyZDgyMi4yOWQxNTcuNDQyZDgxMy45MzhkMTIxLjEwOWQ4MzYuMDcxZDExMy4xNzRkODQ0Ljg0MWQ5Ni44ODdkODYyLjM4MWQ5Ni44ODdkODk0Ljk1NWQ5Ni44ODdkOTI1LjAyNGQxMTYuNTE1ZDk0My4xOWQxMzYuMTQzZDk2MS4zNTdkMTY2LjYyOWQ5NjEuMzU3ZDIzMC41MjVkOTYxLjM1N2QzMDUuNjk2ZDg2Mi43OTlkMTg3LjA5MmQ4MDcuMjU2ZDE2Ni4yMTJkNzk0LjMwOWQ3OS4zNDdkNzQwLjQzN2Q3OS4zNDdkNjgzLjIyM2Q3OS4zNDdkNjMyLjI3NGQxMTcuNzY4ZDU5Ny4xOTRkMTU0LjkzNmQ1NjIuNTMxZDIwNi4zMDNkNTYyLjUzMWQyNDcuNjQ3ZDU2Mi41MzFkMjc2LjI1NGQ1OTIuMTgyZDMwNC44NjFkNjIxLjgzM2QzMDQuODYxZDY2My4xNzdkMzA0Ljg2MWQ3MDguNjk4ZDI1OC41MDVkNzUxLjcxMmQzNjEuMjM5ZDgxMS44NDlkMzg1LjA0NGQ3NzMuMDExZDQwOC44NDhkNzU3Ljk3N2Q0MzUuMTU4ZDc0MS42OWQ0NzguNTlkNzQxLjY5ZDUxMC43NDdkNzQxLjY5ZDUzMi4wNDVkNzU4LjgxMmQ1NTUuNDMyZDc3Ny4xODdkNTU1LjQzMmQ4MDguNTA4ZDU1NS40MzJkODIyLjcwN2Q1MjkuMTIyZDg0OC42ZDUxMC43NDdkODUwLjI3ZDQ4My4xODRkODQ4LjZkNTI3LjQ1MWQ4MzUuNjU0ZDUyNy40NTFkODExLjAxNGQ1MjcuNDUxZDc5Mi4yMjFkNDk5Ljg4OWQ3ODAuMTFkNDc4LjE3MmQ3NzAuNTA1ZDQ1Ni44NzRkNzcwLjUwNWQ0MzUuOTkzZDc3MC41MDVkNDEzLjQ0MmQ3ODguNDYzZDQxMS4zNTNkNzkwLjEzM2QzNzguNzc5ZDgyMS44NzJkNDI0LjcxN2Q4NTAuMjdkNDQ0LjM0NWQ4NjcuODFkNDgwLjY3OGQ5MDAuMzg0ZDQ4MC42NzhkOTM0LjYyOWQ0ODAuNjc4ZDk0MS43MjlkNDUzLjExNWQxMDAyLjQ5MmQ0MjUuNTUzZDEwNjMuMjU2ZDQyNS41NTNkMTA5MC44MThkNDI1LjU1M2QxMTEyLjUzNWQ0NTMuOTUxZDEyMjAuNjk4aFIzZDU3My44MDdSNGQ1NTUuNDMyUjVkNDUuMTAyUjZkNDYxLjQ2OFI3ZC0xOTYuNjk4UjhkNDE2LjM2NVI5ZDBSMTBkMjgzLjk4UjExaTM4UjEyZDQ1LjEwMlIxM2Q1NzMuODA3UjE0YWkxaTNpM2kzaTNpM2kyaTNpM2kxaTNpM2kzaTNpMmkyaTJpM2kzaTJpM2kzaTJpMmkyaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNTBvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNTBSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM3b1IxZDc0MC4wMTlSMmFkODcuNjk5ZDEwMzMuNjA1ZDQwOS42ODNkNTI3Ljg2OWQ0MTAuOTM2ZDU0Ny45MTVkNDU3LjI5MmQ1MjcuNDUxZDQ1OS4zOGQ1MjcuODY5ZDEzNi45NzhkMTAzMy42MDVkMTMyLjgwMmQxMDE0LjM5NGQ5Mi4yOTNkMTAzNC40NGQ4Ny42OTlkMTAzMy42MDVkNDcxLjA3M2Q5MTcuOTI0ZDQ4MC42NzhkOTA0LjU2MWQ0OTEuMTE5ZDg3My42NTdkNDg5LjQ0OGQ4NzMuMjM5ZDQ4NC40MzdkODczLjIzOWQ0NzkuNDI1ZDg3My4yMzlkNDcxLjA3M2Q4NzMuNjU3ZDQ4MC42NzhkODY3LjgxZDQ4OS40NDhkODU5LjQ1OGQ0NzUuMjQ5ZDc2NS45MTFkNDAzLjgzNmQ3NjUuOTExZDM2MS4yMzlkNzY1LjkxMWQzMzYuNmQ4MDYuODM4ZDMxNi4xMzdkODQxLjA4M2QzMTYuMTM3ZDg4Ny4wMjFkMzE2LjEzN2Q5MzQuMjEyZDMzNi42ZDk3Mi42MzJkMzYxLjIzOWQxMDE4Ljk4OGQ0MDQuNjcyZDEwMTguOTg4ZDQ1MC42MWQxMDE4Ljk4OGQ0NzYuOTJkOTYzLjQ0NWQ0NjguOTg1ZDk2Mi4xOTJkNDYxLjA1ZDk1OS4yNjlkNDcxLjA3M2Q5NTYuNzYzZDQ4MS41MTNkOTUyLjE2OWQ0OTEuOTU0ZDkyOC43ODNkNDkwLjI4M2Q5MDcuNDg0ZDQ4OS44NjZkOTAyLjQ3M2Q0ODkuMDNkOTAyLjA1NWQ0ODMuMTg0ZDkwNy40ODRkNDcxLjA3M2Q5MTcuOTI0ZDQ1NS42MjFkODYwLjcxMWQ0NTUuNjIxZDg5NS4zNzNkNDQ2LjQzM2Q5MjkuMmQ0NTYuNDU2ZDk0OC44MjhkNDUyLjI4ZDk1My40MjJkNDM4LjQ5OWQ5NTQuNjc1ZDQyMS4zNzZkOTk2LjQzN2Q0MDAuNDk1ZDk5Ni40MzdkMzUxLjYzNGQ5OTYuNDM3ZDM1MS42MzRkOTIzLjc3MWQzNTEuNjM0ZDkwNy45MDJkMzU0LjU1N2Q4ODguMjc0ZDM0Ny44NzZkODg3LjAyMWQzMzMuMjU5ZDg4Ny44NTZkMzU2LjY0NmQ4NzYuNThkMzU4LjMxNmQ4NjguMjI4ZDM1Ni4yMjhkODY1LjMwNWQzNTUuMzkzZDg2MS45NjRkMzU2LjY0NmQ4NTkuODc2ZDM2MS42NTdkODUzLjYxMWQzNDcuNDU4ZDg1MC4yN2QzNTYuMjI4ZDg0My4xNzFkMzY3LjUwNGQ4MzIuMzEzZDM4MS43MDNkODA0LjMzMmQzOTIuMTQzZDc4OS4yOThkNDA3LjE3N2Q3ODkuMjk4ZDQ1NS42MjFkNzg5LjI5OGQ0NTUuNjIxZDg2MC43MTFkMjEwLjg5N2Q2ODEuNTUzZDIzMC45NDJkNjUwLjIzMWQyMzAuOTQyZDYzNy4yODVkMjI5LjI3MmQ2MzYuNDVkMjI0LjY3OGQ2MzYuNDVkMjE5LjY2N2Q2MzYuNDVkMjExLjMxNGQ2MzcuMjg1ZDIyMC41MDJkNjMxLjQzOGQyMjkuNjlkNjIzLjA4NmQyMTQuNjU1ZDUyOS41MzlkMTQzLjY2ZDUyOS41MzlkMTAwLjY0NmQ1MjkuNTM5ZDc2LjQyNGQ1NzAuNDY2ZDU2LjM3OGQ2MDQuMjkzZDU2LjM3OGQ2NTAuNjQ5ZDU2LjM3OGQ2OTguMjU3ZDc2Ljg0MWQ3MzYuMjYxZDEwMS40ODFkNzgyLjE5OWQxNDQuOTEzZDc4Mi4xOTlkMTkxLjI2OWQ3ODIuMTk5ZDIxNy4xNjFkNzI3LjA3M2QyMDkuMjI2ZDcyNS44MmQyMDEuMjkyZDcyMi44OTdkMjExLjMxNGQ3MjAuMzkxZDIyMS43NTVkNzE1LjM4ZDIzMi42MTNkNjkyLjQxMWQyMzAuNTI1ZDY3MC42OTRkMjMwLjEwN2Q2NjYuMTAxZDIyOS4yNzJkNjY1LjI2NWQyMjMuNDI1ZDY3MC42OTRkMjEwLjg5N2Q2ODEuNTUzZDE5NS44NjJkNjI0LjMzOWQxOTUuODYyZDY1MC42NDlkMTg2LjY3NWQ2OTIuODI4ZDE5MS42ODZkNzAxLjU5OGQxOTYuNjk4ZDcxMi4wMzlkMTkyLjUyMmQ3MTYuNjMyZDE3OC43NGQ3MTguMzAzZDE2MC4zNjVkNzYwLjA2NWQxNDAuMzE5ZDc2MC4wNjVkOTEuODc2ZDc2MC4wNjVkOTEuODc2ZDY4Ny4zOTlkOTEuODc2ZDY3MS41M2Q5NC43OTlkNjUxLjQ4NGQ4OC4xMTdkNjUwLjY0OWQ3My41ZDY1MS40ODRkOTYuODg3ZDY0MC4yMDhkOTguNTU3ZDYzMS40MzhkOTYuNDY5ZDYyOS4zNWQ5NS42MzRkNjI1LjE3NGQ5Ni44ODdkNjIzLjUwNGQxMDEuODk4ZDYxNy4yMzlkODcuNjk5ZDYxMy44OThkOTcuMzA1ZDYwNS45NjRkMTA3Ljc0NWQ1OTUuOTQxZDEyNi41MzhkNTUyLjkyNmQxNDcuMDAxZDU1Mi45MjZkMTk1Ljg2MmQ1NTIuOTI2ZDE5NS44NjJkNjI0LjMzOWhSM2Q1NDcuOTE1UjRkNDkxLjk1NFI1ZDU2LjM3OFI2ZDQ5Ni41NDhSN2QtMTAuNDRSOGQ0NDAuMTY5UjlkMFIxMGQyODMuOThSMTFpMzdSMTJkNTYuMzc4UjEzZDU0Ny45MTVSMTRhaTFpMmkyaTNpMmkyaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTFpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpMmkzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaGc6MTQ5b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTQ5UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozNm9SMWQ3NDAuMDE5UjJhZDE1OC42OTRkOTgxLjgyZDE2NC41NDFkOTQ1LjA3ZDE2NC41NDFkOTAyLjQ3M2QxNjQuNTQxZDg2My42MzRkMTU5LjUzZDgxOS43ODRkMTMwLjcxNGQ4MDcuMjU2ZDk4LjU1N2Q3ODkuNzE2ZDEzMS4xMzJkNzg4LjA0NWQxMzAuNzE0ZDc4Ny4yMWQ4My41MjNkNzc0LjI2NGQ3Ni40MjRkNzcwLjUwNWQ1My4wMzdkNzU4LjM5NGQ0MS43NjFkNzI3LjA3M2Q0My44NDlkNzI0Ljk4NWQ2My44OTVkNzI5LjE2MWQ2Ni44MThkNzI3LjA3M2Q1NS41NDNkNzE0Ljk2MmQzNS40OTdkNjg5LjA3ZDM1LjQ5N2Q1ODkuMjU5ZDE2MS4yZDU3MC44ODRkMTU3Ljg1OWQ1MjEuMTg3ZDE2NC4xMjNkNTMwLjM3NWQxNzMuMzExZDU0MC4zOThkMjA1LjQ2OGQ1MTkuNTE3ZDIwMi41NDRkNTY0LjIwMmQyMDMuMzhkNTcxLjMwMWQyNDQuNzI0ZDU3Ny41NjZkMjc3LjI5OGQ1OTYuMzU4ZDMxOS44OTVkNjIwLjk5OGQzMTkuODk1ZDY1Ni4wNzhkMzE5Ljg5NWQ2NzcuNzk0ZDI5Mi43NWQ2OTAuMzIzZDI3MS44NjlkNjk5LjkyOGQyNDYuMzk0ZDY5OS45MjhkMjM3LjYyNGQ2OTguMjU3ZDI3MC42MTZkNjc5Ljg4MmQyNzkuMzg2ZDY2NC4wMTNkMjc5LjM4NmQ2MTQuMzE2ZDIwMi45NjJkNjExLjgxZDE5Ny45NTFkNjQ5LjM5NmQxOTcuOTUxZDY2Ny43NzFkMTk3Ljk1MWQ2NjkuODU5ZDIwMi41NDRkNzM3LjUxM2QyNTIuMjQxZDc2My44MjNkMjYxLjAxMWQ3NjkuMjUyZDI4OC45OTFkNzg2LjM3NWQzMTEuMTI1ZDgxMS40MzJkMzA5Ljg3MmQ4MTEuODQ5ZDI5Ni41MDhkODExLjg0OWQyNzIuMjg3ZDgwMy45MTVkMjQ0LjMwNmQ3OTQuNzI3ZDIzNC4yODNkNzkzLjA1N2QyMzIuMTk1ZDc5NC43MjdkMjc2Ljg4ZDgxMi4yNjdkMzI0LjA3MWQ4MzYuMDcxZDMzMi40MjRkODU3LjM3ZDMzMi40MjRkODgyLjg0NWQzMzIuNDI0ZDk5Ny4yNzJkMjAxLjI5MmQxMDI1LjI1MmQyMDcuMTM4ZDEwNzEuMTlkMTU5LjUzZDEwNjkuNTJkMTU5LjExMmQxMDI0LjgzNWQxMTEuNTA0ZDEwMjAuNjU5ZDc0LjMzNmQ5OTUuNjAxZDMwLjA2OGQ5NjUuOTUxZDMwLjA2OGQ5MjIuNTE4ZDMwLjA2OGQ5MDAuODAyZDU3LjIxM2Q4ODguMjc0ZDc4LjkyOWQ4NzguMjUxZDEwMy4xNTFkODc4LjI1MWQxMTEuMDg2ZDg3OS45MjFkMTA5LjgzM2Q4ODEuNTkyZDg4LjExN2Q4OTQuOTU1ZDc0LjMzNmQ5MDMuMzA4ZDc0LjMzNmQ5MTkuNTk1ZDc0LjMzNmQ5NjkuNzA5ZDE1OC42OTRkOTgxLjgyZDE1OS45NDdkNzIyLjQ3OWQxNjQuMTIzZDY4Ny4zOTlkMTY0LjEyM2Q2NjEuNTA3ZDE2NC4xMjNkNjUxLjQ4NGQxNjIuODcxZDYzNy4yODVkMTYwLjc4M2Q2MTMuNDgxZDEwMi43MzRkNjE1LjU2OWQxMDIuNzM0ZDY2MS41MDdkMTAyLjczNGQ3MDUuMzU3ZDE1OS45NDdkNzIyLjQ3OWQyMDEuMjkyZDk4MC45ODVkMjYyLjI2NGQ5NzQuNzIxZDI2Mi4yNjRkOTE0LjU4NGQyNjIuMjY0ZDg4OS41MjZkMjQ0LjUxNWQ4NjUuOTMxZDIyNi43NjZkODQyLjMzNmQyMDIuNTQ0ZDgzNS4yMzZkMTgxLjY2M2Q3OTAuOTY5ZDIwMS43MDlkODcxLjE1MWQxOTUuNDQ1ZDg4NS4zNWQxOTUuNDQ1ZDkxMi4wNzhkMTk1LjQ0NWQ5MTYuMjU0ZDIwMS4yOTJkOTgwLjk4NWhSM2QzNTYuMjI4UjRkMzMyLjQyNFI1ZDMwLjA2OFI2ZDUwNC40ODJSN2QtNDcuMTlSOGQ0NzQuNDE0UjlkMFIxMGQyODMuOThSMTFpMzZSMTJkMzAuMDY4UjEzZDM1Ni4yMjhSMTRhaTFpM2kzaTNpMmkyaTNpM2kyaTJpMmkzaTNpMmkzaTJpMmkyaTNpM2kzaTNpMmkyaTJpM2kzaTNpM2kzaTJpM2kzaTJpM2kzaTNpMmkyaTJpM2kzaTNpM2kyaTNpM2kzaTFpM2kzaTJpM2kzaTFpM2kzaTNpMmkyaTNpM2hnOjE0OG9SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTE0OFIxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzVvUjFkNzQwLjAxOVIyYWQ4NC43NzZkNjgxLjk3ZDE3MS4yMjNkNjgxLjU1M2QxNzUuODE3ZDY2MC4yNTRkMTg4Ljc2M2Q2NjMuNTk1ZDE4Mi45MTZkNjI5Ljc2OGQxOTYuMjhkNTcwLjg4NGQyMzguODc3ZDU3MC44ODRkMjEzLjQwMmQ2ODEuNTUzZDI5NS42NzNkNjgxLjU1M2QzMjAuMzEzZDU3MC44ODRkMzYyLjQ5MmQ1NzAuODg0ZDM1Ni42NDZkNTk4LjAyOWQzMzIuMDA2ZDYyMy4wODZkMzUxLjIxNmQ2MjEuNDE1ZDMzNy40MzVkNjgxLjU1M2Q0MTIuNjA2ZDY4NS4zMTFkMzY5LjE3NGQ3MDUuMzU3ZDM4My43OTFkNzAyLjAxNmQzOTcuNTcyZDcwMC4zNDVkNDA1LjUwN2Q3MDQuOTM5ZDM5OS42NmQ3MjEuMjI2ZDQwMC45MTNkNzI0LjE1ZDMyOS41ZDcyNC4xNWQzMDcuNzg0ZDgyOC4xMzdkNDAwLjkxM2Q4MjguMTM3ZDM5Mi41NjFkODcwLjMxNmQyOTkuNDMyZDg3MC4zMTZkMzAwLjI2N2Q5MjUuODU5ZDI3NC43OTJkOTgwLjE1ZDIzMS43NzhkOTgwLjE1ZDI1Ni44MzVkOTIwLjQzZDI1Ni44MzVkODc1LjMyN2QyNTYuODM1ZDg3MC4zMTZkMTc0LjU2NGQ4NzAuMzE2ZDE3Mi44OTNkOTIyLjkzNmQxNTAuMzQyZDk4MC4xNWQxMDcuMzI3ZDk4MC4xNWQxMzEuNTQ5ZDkxNS40MTlkMTMxLjk2N2Q4NzAuMzE2ZDc2LjAwNmQ4NzAuMzE2ZDg2LjAyOWQ4MjguNTU0ZDE0MS4xNTRkODI4LjEzN2QxNjIuNDUzZDcyNC4xNWQ3Ni4wMDZkNzI0LjE1ZDg0Ljc3NmQ2ODEuOTdkMjA1LjQ2OGQ3MjQuMTVkMTgzLjMzNGQ4MjcuMzAxZDI2NS42MDVkODI3LjMwMWQyNjMuOTM0ZDc5OC45MDNkMzAxLjUyZDc1NS44ODlkMjc4LjEzM2Q3NjUuOTExZDI4Ni45MDNkNzI0LjE1ZDIwNS40NjhkNzI0LjE1aFIzZDQ3Ni41MDJSNGQ0MTIuNjA2UjVkNzYuMDA2UjZkNDUzLjExNVI3ZDQzLjg0OVI4ZDM3Ny4xMDlSOWQwUjEwZDI4My45OFIxMWkzNVIxMmQ3Ni4wMDZSMTNkNDc2LjUwMlIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTNpMmkyaTJpMmkyaTJpMmkyaTNpMmkzaTJpMmkzaTJpM2kyaTJpMmkyaTJpMmkxaTJpMmkzaTJpMmkyaGc6MTQ3b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTQ3UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozNG9SMWQ3NDAuMDE5UjJhZDIyNy4xODRkNzQxLjY5ZDE4MS4yNDZkNTg5LjY3NmQxODEuMjQ2ZDU0NS40MDlkMTgxLjI0NmQ1MDQuNDgyZDE5OC43ODZkNTA0LjQ4MmQyMDMuNzk3ZDUwNC40ODJkMjEzLjgyZDUwNi4zNjJkMjIzLjg0M2Q1MDguMjQxZDIyOC44NTRkNTA4LjI0MWQyMzMuNDQ4ZDUwOC4yNDFkMjQyLjAwOWQ1MDcuMTk3ZDI1MC41N2Q1MDYuMTUzZDI1NS4xNjRkNTA2LjE1M2QyNzUuNjI4ZDUwNi4xNTNkMjc1LjYyOGQ1NDEuMjMzZDI3NS42MjhkNTgxLjc0MmQyMjcuMTg0ZDc0MS42OWQ3Ni40MjRkNzQ1Ljg2NmQyOS42NWQ1OTguNDQ2ZDI5LjY1ZDU1NC41OTdkMjkuNjVkNTAzLjIzZDQ3LjE5ZDUwMy4yM2Q1Mi4yMDJkNTAzLjIzZDYxLjU5OGQ1MDUuNzM1ZDcwLjk5NWQ1MDguMjQxZDc2LjAwNmQ1MDguMjQxZDgxLjAxN2Q1MDguMjQxZDkxLjA0ZDUwNS45NDRkMTAxLjA2M2Q1MDMuNjQ3ZDEwNi4wNzVkNTAzLjY0N2QxMjIuNzc5ZDUwMy42NDdkMTIyLjc3OWQ1NDYuMjQ0ZDEyMi43NzlkNTg3LjU4OGQxMDQuODIyZDY0OC45NzhkNzYuNDI0ZDc0NS44NjZoUjNkMzE3LjgwN1I0ZDI3NS42MjhSNWQyOS42NVI2ZDUyMC43NjlSN2QyNzguMTMzUjhkNDkxLjExOVI5ZDBSMTBkMjgzLjk4UjExaTM0UjEyZDI5LjY1UjEzZDMxNy44MDdSMTRhaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTJoZzoxNDZvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNDZSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjMzb1IxZDc0MC4wMTlSMmFkOTIuNzExZDg4Mi4wMDlkNzkuMzQ3ZDgxMC41OTdkNDguMDI2ZDY2OC4xODlkNjEuODA3ZDY1MS40ODRkNzQuMzM2ZDYzMC4xODVkNzAuOTk1ZDYyOC41MTVkNTEuNzg0ZDYzMS40MzhkNDYuNzczZDYxMy44OThkNDYuNzczZDU3OC40MDFkNDYuNzczZDUzMS42MjhkNjAuNTU0ZDUzMS42MjhkNjcuNjU0ZDUzMS42MjhkODEuMjI2ZDUzNi44NDhkOTQuNzk5ZDU0Mi4wNjhkMTAxLjg5OGQ1NDIuMDY4ZDEwNy43NDVkNTQyLjA2OGQxMTkuNjQ3ZDUzNi42MzlkMTMxLjU0OWQ1MzEuMjFkMTM3LjM5NmQ1MzEuMjFkMTQ4LjY3MmQ1MzEuMjFkMTQ4LjY3MmQ1ODguMDA2ZDE0OC42NzJkNzM0LjU5ZDkyLjcxMWQ4ODIuMDA5ZDQ2Ljc3M2Q5NzcuMjI2ZDQ5LjI3OGQ5NzUuNTU2ZDgzLjEwNmQ5NzUuNTU2ZDk1LjIxNmQ5NzUuNTU2ZDk2LjA1MmQ5NzMuMDVkNzMuMDgzZDk2My44NjJkNTEuMzY3ZDk1My40MjJkNjUuMTQ4ZDkzNS40NjRkNzIuNjY1ZDkzNS40NjRkNzcuMjU5ZDkzNS40NjRkODUuODJkOTM3Ljc2MWQ5NC4zODFkOTQwLjA1OGQ5OC45NzVkOTQwLjA1OGQxMDEuMDYzZDk0MC4wNThkMTAxLjg5OGQ5MzkuMjIzZDkxLjg3NmQ5MjQuMTg5ZDkyLjcxMWQ5MjMuMzUzZDE0Mi40MDdkOTIzLjM1M2QxNDIuNDA3ZDk3Ni4zOTFkMTQyLjQwN2QxMDI2LjA4OGQ5Ni4wNTJkMTAyNi4wODhkNDYuNzczZDEwMjYuMDg4ZDQ2Ljc3M2Q5NzcuMjI2aFIzZDE5Ny45NTFSNGQxNDguNjcyUjVkNDYuNzczUjZkNDkyLjc4OVI3ZC0yLjA4OFI4ZDQ0Ni4wMTZSOWQwUjEwZDI4My45OFIxMWkzM1IxMmQ0Ni43NzNSMTNkMTk3Ljk1MVIxNGFpMWkzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTJpMmkyaTJpM2kzaTNoZzoxNDVvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNDVSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjMyb1IxZDc0MC4wMTlSMmFoUjNkMjEzLjgyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQwUjEwZDI4My45OFIxMWkzMlIxMmQwUjEzZDIxMy44MlIxNGFoZzoxNDRvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNDRSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0M29SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTE0M1IxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjU1b1IxZDc0MC4wMTlSMmFkMTQ2LjE2NmQ3NDAuODU0ZDEzNC4wNTVkNzIyLjQ3OWQxNjQuNTQxZDcxNy44ODVkMjU2LjgzNWQ3MTcuODg1ZDI4Ni40ODZkNzI0Ljk4NWQyNjguMTFkNzQ0LjE5NWQyNTguMDg4ZDc0NS44NjZkMjQ4LjA2NWQ3NTUuODg5ZDI1Ni40MTdkNzY4ZDI3Mi4yODdkNzk4LjQ4NmQyNTYuODM1ZDgwMC41NzRkMjQzLjA1M2Q4MDYuNDJkMjU4LjA4OGQ4MTEuNDMyZDI3Ni4wNDVkODIxLjQ1NWQzMDkuNDU1ZDg5NC41MzhkMzM0LjkyOWQ5NDUuNDg3ZDM1Mi44ODdkODgwLjMzOWQzNTkuMTUxZDg3Ny40MTVkMzY5LjE3NGQ4OTIuMDMyZDM3MS4yNjJkODkwLjM2MmQzNzIuMDk3ZDg2Ni4xNGQzOTQuODU4ZDgxMi40NzZkNDE3LjYxOGQ3NTguODEyZDQxNy42MThkNzQxLjY5ZDQxNS4xMTJkNzI5LjE2MWQ0MDEuMzMxZDcyMi44OTdkMzc1LjAyMWQ3MTcuODg1ZDM2NC41OGQ3MDQuMTA0ZDM5NS45MDJkNjkyLjgyOGQ0MjUuOTdkNjkyLjgyOGQ0MzguNDk5ZDY5Mi44MjhkNDYzLjU1NmQ2OTMuMjQ2ZDQ4OC42MTNkNjkzLjY2M2Q1MDEuMTQxZDY5My4yNDZkNTE2LjE3NmQ3MDQuMTA0ZDUxMi40MTdkNzE0LjU0NGQ0OTEuNTM2ZDcyNC45ODVkNDI3LjY0MWQ4NTguMjA1ZDM2NS44MzNkOTg3LjY2N2QzNjQuOTk4ZDEwMDguNTQ4ZDM2NC41OGQxMDE5LjgyM2QzNjIuNDkyZDEwMjEuNDk0ZDM2MS42NTdkMTAyMS40OTRkMzU3Ljg5OGQxMDE3LjUyNmQzNTQuMTRkMTAxMy41NTlkMzUyLjg4N2QxMDEzLjU1OWQzNTEuNjM0ZDEwMTYuNDgyZDM0OC4yOTNkMTAzMS45MzRkMzQ0Ljk1MmQxMDU1LjczOGQzMjAuNzNkMTA3OS45NmQzMTkuNDc3ZDEwOTIuNDg5ZDMyMy42NTRkMTEwNi4yN2QzMjMuNjU0ZDExNjIuMjMxZDI1OC41MDVkMTIwNy4zMzRkMTk3LjExNWQxMjQ5LjkzMWQxMzQuMDU1ZDEyNDkuOTMxZDYyLjY0MmQxMjQ5LjkzMWQyMi4xMzNkMTIwNy43NTJkMTkuMjFkMTE4MC42MDZkMTkuMjFkMTE0My44NTZkNzAuNTc3ZDExMDQuNmQxMDguMTYzZDEwNzUuNzg0ZDE1MS41OTVkMTA1OS4wNzlkODMuMTA2ZDExMTMuMzdkODMuMTA2ZDExNzUuNTk1ZDgzLjEwNmQxMTkxLjA0N2QxMDguMTYzZDEyMDMuNTc1ZDEyOS44NzlkMTIxNC40MzNkMTQ2LjU4NGQxMjE0LjQzM2QxNTUuNzcxZDEyMTQuNDMzZDE3My41MmQxMjA4LjU4N2QxOTEuMjY5ZDEyMDIuNzRkMjAwLjQ1NmQxMjAyLjc0ZDIwMi45NjJkMTIwMS45MDVkMjExLjczMmQxMjAwLjIzNGQyMTIuMTVkMTE5OC4xNDZkMjA3LjU1NmQxMTg5LjM3NmQyMDcuNTU2ZDExODYuNDUzZDIyNC42NzhkMTE3Ni4wMTNkMjUwLjE1M2QxMTYwLjU2MWQyNjYuODU4ZDExMDMuNzY1ZDI2OS43ODFkMTA5My4zMjRkMjkwLjY2MmQxMDE3LjMxOGQyNzIuNzA0ZDk3My4wNWQyNDguMDY1ZDkzNC42MjlkMjY2LjAyMmQ5MjkuNjE4ZDI0Ni44MTJkOTIwLjQzZDIwNi43MjFkODM0LjQwMWQxNjYuNjI5ZDc0OS42MjRkMTQ2LjE2NmQ3NDAuODU0ZDI2My4wOTlkNTE0LjA4OGQzMTAuNzA3ZDUxNC4wODhkMzEwLjcwN2Q1NTUuMDE0ZDMxMC43MDdkNTk0LjI3ZDI4NC44MTVkNTk0LjI3ZDI1MC41N2Q1OTQuMjdkMjQwLjk2NWQ1OTEuMzQ3ZDIxOS4yNDlkNTg0LjY2NWQyMTkuMjQ5ZDU1OC43NzNkMjE5LjI0OWQ1NDEuMjMzZDIzMi40MDRkNTI3LjY2ZDI0NS41NTlkNTE0LjA4OGQyNjMuMDk5ZDUxNC4wODhkMzkzLjM5NmQ1MTAuMzI5ZDQ0MS4wMDRkNTEwLjMyOWQ0NDEuMDA0ZDU1MS4yNTZkNDQxLjAwNGQ1ODkuMjU5ZDQxOC44NzFkNTg5LjI1OWQ0MTQuNjk0ZDU4OS4yNTlkNDA2Ljc2ZDU4Ny41ODhkMzk4LjgyNWQ1ODUuOTE4ZDM5NS4wNjZkNTg1LjkxOGQzNjkuNTkyZDU4NS41ZDM2Mi45MWQ1ODIuNTc3ZDM0OS41NDZkNTc2LjczZDM0OS41NDZkNTU1LjAxNGQzNDkuNTQ2ZDUzNy4wNTdkMzYyLjQ5MmQ1MjMuNjkzZDM3NS40MzhkNTEwLjMyOWQzOTMuMzk2ZDUxMC4zMjloUjNkNTM1LjM4NlI0ZDUxNi4xNzZSNWQxOS4yMVI2ZDUxMy42N1I3ZC0yMjUuOTMxUjhkNDk0LjQ2UjlkMFIxMGQyODMuOThSMTFpMjU1UjEyZDE5LjIxUjEzZDUzNS4zODZSMTRhaTFpMmkyaTNpMmkzaTNpM2kzaTNpM2kyaTJpM2kzaTJpM2kyaTNpM2kzaTJpMmkzaTNpMmkyaTNpM2kyaTJpMmkzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTFpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzoxNDJvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNDJSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NG9SMWQ3NDAuMDE5UjJhZDEzOS4wNjZkNzI0LjE1ZDE4NS44NGQ3MTIuNDU2ZDI0MC4xM2Q3MTIuNDU2ZDMwNS42OTZkNzEyLjQ1NmQzNjMuMzI3ZDczMy43NTVkNDMyLjIzNGQ3NTkuMjNkNDYxLjA1ZDgwNi4wMDNkNDI5LjMxMWQ4MTcuMjc4ZDM5OC44MjVkODMyLjMxM2Q0NDguNTIyZDgzMi4zMTNkNDYxLjA1ZDgzMi4zMTNkNDY4LjE1ZDgzMy41NjZkNDYzLjU1NmQ4MzguMTU5ZDQzNS45OTNkODYxLjU0NmQ0MzcuNjYzZDg2Mi4zODFkNDY1LjIyNmQ4NjIuMzgxZDQ3MS45MDhkODY0LjA1MmQ0NzEuOTA4ZDk0MS43MjlkNDEwLjkzNmQ5ODYuNDE0ZDM3MC40MjdkMTAxNi4wNjVkMTM5LjA2NmQxMDE2LjA2NWQxMzkuMDY2ZDEwMTguOTg4ZDEzOS4wNjZkMTA1Mi44MTVkMTQ4LjI1NGQxMDY3LjQzMmQxNzAuODA1ZDEwNzIuNDQzZDE3NC45ODJkMTA3My42OTZkMTg4Ljc2M2QxMDc4LjI5ZDE5Ny45NTFkMTA4Ny40NzdkMTY1LjM3NmQxMDk4LjMzNmQ2Ni40MDFkMTA5OC4zMzZkMTIuMTFkMTA5OC4zMzZkMi41MDVkMTA4MC43OTZkMjYuMzA5ZDEwNzQuNTMxZDUzLjg3MmQxMDY0LjA5MWQ2My40NzdkMTA1NC4wNjhkNjMuNDc3ZDkyMi41MThkNjMuNDc3ZDgxNS42MDhkNjEuMzg5ZDc2NS4wNzZkNjIuMjI1ZDc2My40MDZkNjMuODk1ZDc2My40MDZkNzEuNjIxZDc3MS41NDlkNzkuMzQ3ZDc3OS42OTNkODAuMTgyZDc3OS42OTNkODEuMDE3ZDc3OC40NGQ3Mi42NjVkNzYxLjczNWQ2Ni44MThkNzI3LjkwOGQ2MC45NzJkNjkxLjU3NWQ1NC43MDdkNjc2LjU0MWQ0MS4zNDRkNjY5Ljg1OWQyNC4yMjFkNjc4LjIxMmQ1Ljg0NmQ2OTQuNDk5ZDE4LjM3NWQ2NjMuNTk1ZDU0LjI5ZDY0MS44NzlkNjUuNTY2ZDYzNS4xOTdkMTE4LjYwM2Q2MDcuMjE2ZDExNy43NjhkNjI3LjI2MmQxMzguNjQ5ZDYwNy4yMTZkMTM4LjY0OWQ2NTEuMDY2ZDEzOS4wNjZkNzE5LjU1NmQxMzkuMDY2ZDcwNy44NjJkMTM5LjA2NmQ3MjQuMTVkMjUwLjU3ZDk5Ni40MzdkMzczLjc2OGQ5OTYuNDM3ZDM3My43NjhkOTAzLjMwOGQzNzMuNzY4ZDg5MS4xOTdkMzcxLjI2MmQ4NzguMjUxZDM3Mi4wOTdkODc3LjQxNWQzODkuNjM3ZDg3OS41MDRkNDE4LjQ1M2Q4ODAuMzM5ZDQxOS43MDZkODc5LjA4NmQzOTIuNTYxZDg2OC42NDZkMzY0Ljk5OGQ4NTQuMDI5ZDM0OS45NjRkODAyLjI0NGQyODIuNzI3ZDc3NC42ODFkMjI5LjY5ZDc1Mi45NjVkMTY1Ljc5NGQ3NTIuOTY1ZDE1Mi40M2Q3NTIuOTY1ZDEzOS40ODRkNzU0LjIxOGQxNDAuMzE5ZDgwOC4wOTFkMTM1LjMwOGQ4MjMuMTI1ZDEyOC42MjZkODQzLjU4OGQxNDAuMzE5ZDg1Ni45NTJkMTQwLjMxOWQ4NjAuMjkzZDE0MC4zMTlkODg3Ljg1NmQxMzcuMzk2ZDkxNy4wODlkMTI0Ljg2N2Q5MDcuOTAyZDEyMy42MTVkOTA5LjU3MmQxMzAuNzE0ZDkyOS4yZDEzOC4yMzFkOTY4LjAzOWQxMzguMjMxZDk3Mi42MzJkMjA1LjQ2OGQ5OTYuNDM3ZDI1MC41N2Q5OTYuNDM3aFIzZDE5Ny45NTFSNGQ0NzEuOTA4UjVkMi41MDVSNmQ0MTYuNzgzUjdkLTc0LjMzNlI4ZDQxNC4yNzdSOWQwUjEwZDI4My45OFIxMWkyNTRSMTJkMi41MDVSMTNkMTk3Ljk1MVIxNGFpMWkzaTNpM2kzaTJpM2kzaTJpMmkyaTNpM2kyaTNpM2kzaTNpMmkyaTNpM2kzaTJpM2kzaTJpM2kzaTJpM2kzaTNpMmkyaTJpM2kyaTFpM2kzaTJpM2kyaTNpM2kzaTNpMmkzaTNpM2kyaTJpM2kyaTNoZzoxNDFvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxNDFSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1M29SMWQ3NDAuMDE5UjJhZDE0Ni4xNjZkNzQwLjg1NGQxMzQuMDU1ZDcyMi40NzlkMTY0LjU0MWQ3MTcuODg1ZDI1Ni44MzVkNzE3Ljg4NWQyODYuNDg2ZDcyNC45ODVkMjY4LjExZDc0NC4xOTVkMjU4LjA4OGQ3NDUuODY2ZDI0OC4wNjVkNzU1Ljg4OWQyNTYuNDE3ZDc2OGQyNzIuMjg3ZDc5OC40ODZkMjU2LjgzNWQ4MDAuNTc0ZDI0My4wNTNkODA2LjQyZDI1OC4wODhkODExLjQzMmQyNzYuMDQ1ZDgyMS40NTVkMzA5LjQ1NWQ4OTQuNTM4ZDMzNC45MjlkOTQ1LjQ4N2QzNTIuODg3ZDg4MC4zMzlkMzU5LjE1MWQ4NzcuNDE1ZDM2OS4xNzRkODkyLjAzMmQzNzEuMjYyZDg5MC4zNjJkMzcyLjA5N2Q4NjYuMTRkMzk0Ljg1OGQ4MTIuNDc2ZDQxNy42MThkNzU4LjgxMmQ0MTcuNjE4ZDc0MS42OWQ0MTUuMTEyZDcyOS4xNjFkNDAxLjMzMWQ3MjIuODk3ZDM3NS4wMjFkNzE3Ljg4NWQzNjQuNThkNzA0LjEwNGQzOTUuOTAyZDY5Mi44MjhkNDI1Ljk3ZDY5Mi44MjhkNDM4LjQ5OWQ2OTIuODI4ZDQ2My41NTZkNjkzLjI0NmQ0ODguNjEzZDY5My42NjNkNTAxLjE0MWQ2OTMuMjQ2ZDUxNi4xNzZkNzA0LjEwNGQ1MTIuNDE3ZDcxNC41NDRkNDkxLjUzNmQ3MjQuOTg1ZDQyNy42NDFkODU4LjIwNWQzNjUuODMzZDk4Ny42NjdkMzY0Ljk5OGQxMDA4LjU0OGQzNjQuNThkMTAxOS44MjNkMzYyLjQ5MmQxMDIxLjQ5NGQzNjEuNjU3ZDEwMjEuNDk0ZDM1Ny44OThkMTAxNy41MjZkMzU0LjE0ZDEwMTMuNTU5ZDM1Mi44ODdkMTAxMy41NTlkMzUxLjYzNGQxMDE2LjQ4MmQzNDguMjkzZDEwMzEuOTM0ZDM0NC45NTJkMTA1NS43MzhkMzIwLjczZDEwNzkuOTZkMzE5LjQ3N2QxMDkyLjQ4OWQzMjMuNjU0ZDExMDYuMjdkMzIzLjY1NGQxMTYyLjIzMWQyNTguNTA1ZDEyMDcuMzM0ZDE5Ny4xMTVkMTI0OS45MzFkMTM0LjA1NWQxMjQ5LjkzMWQ2Mi42NDJkMTI0OS45MzFkMjIuMTMzZDEyMDcuNzUyZDE5LjIxZDExODAuNjA2ZDE5LjIxZDExNDMuODU2ZDcwLjU3N2QxMTA0LjZkMTA4LjE2M2QxMDc1Ljc4NGQxNTEuNTk1ZDEwNTkuMDc5ZDgzLjEwNmQxMTEzLjM3ZDgzLjEwNmQxMTc1LjU5NWQ4My4xMDZkMTE5MS4wNDdkMTA4LjE2M2QxMjAzLjU3NWQxMjkuODc5ZDEyMTQuNDMzZDE0Ni41ODRkMTIxNC40MzNkMTU1Ljc3MWQxMjE0LjQzM2QxNzMuNTJkMTIwOC41ODdkMTkxLjI2OWQxMjAyLjc0ZDIwMC40NTZkMTIwMi43NGQyMDIuOTYyZDEyMDEuOTA1ZDIxMS43MzJkMTIwMC4yMzRkMjEyLjE1ZDExOTguMTQ2ZDIwNy41NTZkMTE4OS4zNzZkMjA3LjU1NmQxMTg2LjQ1M2QyMjQuNjc4ZDExNzYuMDEzZDI1MC4xNTNkMTE2MC41NjFkMjY2Ljg1OGQxMTAzLjc2NWQyNjkuNzgxZDEwOTMuMzI0ZDI5MC42NjJkMTAxNy4zMThkMjcyLjcwNGQ5NzMuMDVkMjQ4LjA2NWQ5MzQuNjI5ZDI2Ni4wMjJkOTI5LjYxOGQyNDYuODEyZDkyMC40M2QyMDYuNzIxZDgzNC40MDFkMTY2LjYyOWQ3NDkuNjI0ZDE0Ni4xNjZkNzQwLjg1NGQyNTkuNzU4ZDYyNC43NTZkMzk1LjA2NmQ1MzcuMDU3ZDM5NS4wNjZkNTA0LjlkMzk1LjA2NmQ1MDIuODEyZDM3NC4zOTRkNDg1LjA2M2QzNTMuNzIyZDQ2Ny4zMTRkMzUwLjc5OWQ0NjcuMzE0ZDMzMi4wMDZkNDY3LjMxNGQyOTguNTk3ZDUzNS44MDRkMjkxLjQ5N2Q1NTAuMDAzZDI1OS43NThkNjI0Ljc1NmhSM2Q1MzUuMzg2UjRkNTE2LjE3NlI1ZDE5LjIxUjZkNTU2LjY4NVI3ZC0yMjUuOTMxUjhkNTM3LjQ3NFI5ZDBSMTBkMjgzLjk4UjExaTI1M1IxMmQxOS4yMVIxM2Q1MzUuMzg2UjE0YWkxaTJpMmkzaTJpM2kzaTNpM2kzaTNpMmkyaTNpM2kyaTNpMmkzaTNpM2kyaTJpM2kzaTJpMmkzaTNpMmkyaTJpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kxaTNpM2kzaTNpM2hnOjE0MG9SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTE0MFIxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUyb1IxZDc0MC4wMTlSMmFkMTQ3LjAwMWQ3MTkuNTU2ZDE0OS41MDdkNzY1LjkxMWQxMjYuNTM4ZDc5NS45OGQxNDcuMDAxZDc5OS43MzhkMTQ2LjU4NGQ4OTQuMTJkMTQ2LjU4NGQ5NDAuODkzZDE1MC43NmQ5NTUuOTI4ZDE2MC4zNjVkOTg4LjUwMmQxOTUuODYyZDk4OC41MDJkMjQ5LjMxOGQ5ODguNTAyZDI2OC41MjhkOTE1LjAwMWQyNzYuMDQ1ZDg4NS43NjhkMjgxLjA1N2Q4MDAuMTU2ZDI4MS40NzRkNzkwLjU1MWQzMDYuOTQ5ZDc5Mi42MzlkMjg0LjgxNWQ3NjQuMjQxZDI4My45OGQ3NTUuODg5ZDI3OC41NTFkNzUwLjQ2ZDI4Mi4zMDlkNzQ0LjYxM2QyOTkuMDE0ZDc0NC42MTNkMjcyLjcwNGQ3MjQuOTg1ZDMwMy4xOWQ3MTguNzIxZDM2NC41OGQ3MTguNzIxZDM2Ni42NjhkNzk5LjMyMWQzNDMuNjk5ZDgxNy42OTZkMzYyLjA3NWQ4MzIuMzEzZDM2MS4yMzlkODg3LjQzOGQzNjEuNjU3ZDkxNS44MzZkMzYyLjQ5MmQ5NzkuNzMyZDM3Ni42OTFkOTc5LjczMmQzOTUuMDY2ZDk3OS43MzJkNDA4LjQzZDkzOC44MDVkNDEwLjEwMWQ5NDguODI4ZDQxMC4xMDFkOTU3LjE4MWQ0MTAuMTAxZDk5Ni40MzdkMzc5LjYxNWQxMDEyLjMwNmQzNjAuODIyZDEwMjEuOTExZDMxMi4zNzhkMTAyNi45MjNkMjk5LjAxNGQxMDI4LjE3NmQyODUuNjVkMTAwMy4xMTlkMjg3LjMyMWQ5NzEuNzk3ZDIyMC45MmQxMDI5Ljg0NmQxNzMuNzI5ZDEwMjkuODQ2ZDYyLjY0MmQxMDI5Ljg0NmQ2Mi42NDJkODkxLjE5N2Q2Mi42NDJkODgwLjMzOWQ2NS45ODNkODcxLjk4NmQ5NS4yMTZkODU4LjYyM2Q2NC43M2Q4MjguNTU0ZDY0LjczZDgxMi4yNjdkNjQuNzNkODA0Ljc1ZDY1Ljk4M2Q3OTAuMzQyZDY3LjIzNmQ3NzUuOTM0ZDY3LjIzNmQ3NjguNDE3ZDY3LjIzNmQ3NjUuOTExZDYzLjQ3N2Q3NTUuMDUzZDQwLjA5MWQ3NDguNzg5ZDQyLjU5N2Q3NDguNzg5ZDMwLjQ4NmQ3NDguNzg5ZDE5LjIxZDc2OGQyOS42NWQ3MzguNzY2ZDQyLjE3OWQ3MjguNzQzZDU2LjM3OGQ3MTcuODg1ZDg2LjAyOWQ3MTguMzAzZDE0Ny4wMDFkNzE5LjU1NmQxMzkuMDY2ZDUxNC4wODhkMTU3Ljg1OWQ1MTQuMDg4ZDE3Mi4yNjdkNTI1LjM2M2QxODYuNjc1ZDUzNi42MzlkMTg2LjY3NWQ1NTUuMDE0ZDE4Ni42NzVkNTk0LjI3ZDE2MC43ODNkNTk0LjI3ZDEyNi41MzhkNTk0LjI3ZDExNi45MzNkNTkxLjM0N2Q5NS4yMTZkNTg0LjY2NWQ5NS4yMTZkNTU4Ljc3M2Q5NS4yMTZkNTQxLjIzM2QxMDguMzcxZDUyNy42NmQxMjEuNTI2ZDUxNC4wODhkMTM5LjA2NmQ1MTQuMDg4ZDI2OS4zNjNkNTEwLjMyOWQyODguMTU2ZDUxMC4zMjlkMzAyLjU2NGQ1MjEuNjA1ZDMxNi45NzJkNTMyLjg4ZDMxNi45NzJkNTUxLjI1NmQzMTYuOTcyZDU4OS4yNTlkMjk0LjQyZDU4OS4yNTlkMjkwLjI0NGQ1ODkuMjU5ZDI4Mi41MThkNTg3LjU4OGQyNzQuNzkyZDU4NS45MThkMjcxLjAzNGQ1ODUuOTE4ZDI0NS4xNDFkNTg1LjVkMjM4LjQ2ZDU4Mi41NzdkMjI1LjUxM2Q1NzYuNzNkMjI1LjUxM2Q1NTUuMDE0ZDIyNS41MTNkNTM3LjA1N2QyMzguNDZkNTIzLjY5M2QyNTEuNDA2ZDUxMC4zMjlkMjY5LjM2M2Q1MTAuMzI5aFIzZDQyOS4zMTFSNGQ0MTAuMTAxUjVkMTkuMjFSNmQ1MTMuNjdSN2QtNS44NDZSOGQ0OTQuNDZSOWQwUjEwZDI4My45OFIxMWkyNTJSMTJkMTkuMjFSMTNkNDI5LjMxMVIxNGFpMWkyaTJpMmkyaTNpM2kzaTNpM2kyaTJpMmkyaTJpMmkyaTJpMmkyaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMzlvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxMzlSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1MW9SMWQ3NDAuMDE5UjJhZDE0Ny4wMDFkNzE5LjU1NmQxNDkuNTA3ZDc2NS45MTFkMTI2LjUzOGQ3OTUuOThkMTQ3LjAwMWQ3OTkuNzM4ZDE0Ni41ODRkODk0LjEyZDE0Ni41ODRkOTQwLjg5M2QxNTAuNzZkOTU1LjkyOGQxNjAuMzY1ZDk4OC41MDJkMTk1Ljg2MmQ5ODguNTAyZDI0OS4zMThkOTg4LjUwMmQyNjguNTI4ZDkxNS4wMDFkMjc2LjA0NWQ4ODUuNzY4ZDI4MS4wNTdkODAwLjE1NmQyODEuNDc0ZDc5MC41NTFkMzA2Ljk0OWQ3OTIuNjM5ZDI4NC44MTVkNzY0LjI0MWQyODMuOThkNzU1Ljg4OWQyNzguNTUxZDc1MC40NmQyODIuMzA5ZDc0NC42MTNkMjk5LjAxNGQ3NDQuNjEzZDI3Mi43MDRkNzI0Ljk4NWQzMDMuMTlkNzE4LjcyMWQzNjQuNThkNzE4LjcyMWQzNjYuNjY4ZDc5OS4zMjFkMzQzLjY5OWQ4MTcuNjk2ZDM2Mi4wNzVkODMyLjMxM2QzNjEuMjM5ZDg4Ny40MzhkMzYxLjY1N2Q5MTUuODM2ZDM2Mi40OTJkOTc5LjczMmQzNzYuNjkxZDk3OS43MzJkMzk1LjA2NmQ5NzkuNzMyZDQwOC40M2Q5MzguODA1ZDQxMC4xMDFkOTQ4LjgyOGQ0MTAuMTAxZDk1Ny4xODFkNDEwLjEwMWQ5OTYuNDM3ZDM3OS42MTVkMTAxMi4zMDZkMzYwLjgyMmQxMDIxLjkxMWQzMTIuMzc4ZDEwMjYuOTIzZDI5OS4wMTRkMTAyOC4xNzZkMjg1LjY1ZDEwMDMuMTE5ZDI4Ny4zMjFkOTcxLjc5N2QyMjAuOTJkMTAyOS44NDZkMTczLjcyOWQxMDI5Ljg0NmQ2Mi42NDJkMTAyOS44NDZkNjIuNjQyZDg5MS4xOTdkNjIuNjQyZDg4MC4zMzlkNjUuOTgzZDg3MS45ODZkOTUuMjE2ZDg1OC42MjNkNjQuNzNkODI4LjU1NGQ2NC43M2Q4MTIuMjY3ZDY0LjczZDgwNC43NWQ2NS45ODNkNzkwLjM0MmQ2Ny4yMzZkNzc1LjkzNGQ2Ny4yMzZkNzY4LjQxN2Q2Ny4yMzZkNzY1LjkxMWQ2My40NzdkNzU1LjA1M2Q0MC4wOTFkNzQ4Ljc4OWQ0Mi41OTdkNzQ4Ljc4OWQzMC40ODZkNzQ4Ljc4OWQxOS4yMWQ3NjhkMjkuNjVkNzM4Ljc2NmQ0Mi4xNzlkNzI4Ljc0M2Q1Ni4zNzhkNzE3Ljg4NWQ4Ni4wMjlkNzE4LjMwM2QxNDcuMDAxZDcxOS41NTZkMTA3LjMyN2Q2MTYuODIyZDExNC4wMDlkNjEwLjU1N2QxNjQuMTIzZDU2MC44NjFkMTcyLjg5M2Q1NTkuMTlkMTg3LjUxZDU1Mi45MjZkMTg1LjAwNGQ1NDkuNTg1ZDE4MC44MjhkNTQyLjkwM2QxOTMuMzU3ZDUzNi4yMjFkMTk0LjE5MmQ1MjYuMTk5ZDIwNi4zMDNkNTAyLjM5NGQyMjAuMDg0ZDQ3NS4yNDlkMjIzLjAwOGQ0NjYuMDYxZDIyNy42MDFkNDY2LjA2MWQyNjUuMTg3ZDU2MC4wMjZkMzMyLjQyNGQ2MTYuODIyZDI5Mi43NWQ2MTYuODIyZDI4OC45OTFkNjE2LjgyMmQyNzUuNDE5ZDYwOS4zMDVkMjYxLjg0NmQ2MDEuNzg3ZDI2MS40MjlkNTk4Ljg2NGQyNjMuNTE3ZDU5NC4yN2QyNjcuNjkzZDU4NC4yNDdkMjY3LjI3NWQ1ODIuNTc3ZDI2MC41OTNkNTg0LjY2NWQyNTYuNDE3ZDU4NC4yNDdkMjUxLjQwNmQ1ODMuODNkMjUwLjU3ZDU3MS43MTlkMjQ3LjY0N2Q1NTYuMjY3ZDI0NS41NTlkNTY0LjIwMmQyNDIuMjE4ZDU3MC44ODRkMjM4LjQ2ZDU2NS44NzJkMjI0LjI2MWQ1MzkuNTYyZDE5OC43ODZkNTgwLjQ4OWQxNDUuMzMxZDYxNi44MjJkMTA3LjMyN2Q2MTYuODIyaFIzZDQyOS4zMTFSNGQ0MTAuMTAxUjVkMTkuMjFSNmQ1NTcuOTM4UjdkLTUuODQ2UjhkNTM4LjcyN1I5ZDBSMTBkMjgzLjk4UjExaTI1MVIxMmQxOS4yMVIxM2Q0MjkuMzExUjE0YWkxaTJpMmkyaTJpM2kzaTNpM2kzaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTJpM2kzaTJpM2kyaTNpM2kzaTJpM2kyaTNpM2kzaTNpMmhnOjEzOG9SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTEzOFIxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUwb1IxZDc0MC4wMTlSMmFkMTQ3LjAwMWQ3MTkuNTU2ZDE0OS41MDdkNzY1LjkxMWQxMjYuNTM4ZDc5NS45OGQxNDcuMDAxZDc5OS43MzhkMTQ2LjU4NGQ4OTQuMTJkMTQ2LjU4NGQ5NDAuODkzZDE1MC43NmQ5NTUuOTI4ZDE2MC4zNjVkOTg4LjUwMmQxOTUuODYyZDk4OC41MDJkMjQ5LjMxOGQ5ODguNTAyZDI2OC41MjhkOTE1LjAwMWQyNzYuMDQ1ZDg4NS43NjhkMjgxLjA1N2Q4MDAuMTU2ZDI4MS40NzRkNzkwLjU1MWQzMDYuOTQ5ZDc5Mi42MzlkMjg0LjgxNWQ3NjQuMjQxZDI4My45OGQ3NTUuODg5ZDI3OC41NTFkNzUwLjQ2ZDI4Mi4zMDlkNzQ0LjYxM2QyOTkuMDE0ZDc0NC42MTNkMjcyLjcwNGQ3MjQuOTg1ZDMwMy4xOWQ3MTguNzIxZDM2NC41OGQ3MTguNzIxZDM2Ni42NjhkNzk5LjMyMWQzNDMuNjk5ZDgxNy42OTZkMzYyLjA3NWQ4MzIuMzEzZDM2MS4yMzlkODg3LjQzOGQzNjEuNjU3ZDkxNS44MzZkMzYyLjQ5MmQ5NzkuNzMyZDM3Ni42OTFkOTc5LjczMmQzOTUuMDY2ZDk3OS43MzJkNDA4LjQzZDkzOC44MDVkNDEwLjEwMWQ5NDguODI4ZDQxMC4xMDFkOTU3LjE4MWQ0MTAuMTAxZDk5Ni40MzdkMzc5LjYxNWQxMDEyLjMwNmQzNjAuODIyZDEwMjEuOTExZDMxMi4zNzhkMTAyNi45MjNkMjk5LjAxNGQxMDI4LjE3NmQyODUuNjVkMTAwMy4xMTlkMjg3LjMyMWQ5NzEuNzk3ZDIyMC45MmQxMDI5Ljg0NmQxNzMuNzI5ZDEwMjkuODQ2ZDYyLjY0MmQxMDI5Ljg0NmQ2Mi42NDJkODkxLjE5N2Q2Mi42NDJkODgwLjMzOWQ2NS45ODNkODcxLjk4NmQ5NS4yMTZkODU4LjYyM2Q2NC43M2Q4MjguNTU0ZDY0LjczZDgxMi4yNjdkNjQuNzNkODA0Ljc1ZDY1Ljk4M2Q3OTAuMzQyZDY3LjIzNmQ3NzUuOTM0ZDY3LjIzNmQ3NjguNDE3ZDY3LjIzNmQ3NjUuOTExZDYzLjQ3N2Q3NTUuMDUzZDQwLjA5MWQ3NDguNzg5ZDQyLjU5N2Q3NDguNzg5ZDMwLjQ4NmQ3NDguNzg5ZDE5LjIxZDc2OGQyOS42NWQ3MzguNzY2ZDQyLjE3OWQ3MjguNzQzZDU2LjM3OGQ3MTcuODg1ZDg2LjAyOWQ3MTguMzAzZDE0Ny4wMDFkNzE5LjU1NmQxNjQuMTIzZDYyNC43NTZkMjk5LjQzMmQ1MzcuMDU3ZDI5OS40MzJkNTA0LjlkMjk5LjQzMmQ1MDMuMjNkMjc4LjU1MWQ0ODUuMjcyZDI1Ny42N2Q0NjcuMzE0ZDI1NS4xNjRkNDY3LjMxNGQyMzYuNzg5ZDQ2Ny4zMTRkMjAyLjU0NGQ1MzUuODA0ZDE5Ny4xMTVkNTQ2LjY2MmQxNjQuMTIzZDYyNC43NTZoUjNkNDI5LjMxMVI0ZDQxMC4xMDFSNWQxOS4yMVI2ZDU1Ni42ODVSN2QtNS44NDZSOGQ1MzcuNDc0UjlkMFIxMGQyODMuOThSMTFpMjUwUjEyZDE5LjIxUjEzZDQyOS4zMTFSMTRhaTFpMmkyaTJpMmkzaTNpM2kzaTNpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaGc6MTM3b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTM3UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDlvUjFkNzQwLjAxOVIyYWQxNDcuMDAxZDcxOS41NTZkMTQ5LjUwN2Q3NjUuOTExZDEyNi41MzhkNzk1Ljk4ZDE0Ny4wMDFkNzk5LjczOGQxNDYuNTg0ZDg5NC4xMmQxNDYuNTg0ZDk0MC44OTNkMTUwLjc2ZDk1NS45MjhkMTYwLjM2NWQ5ODguNTAyZDE5NS44NjJkOTg4LjUwMmQyNDkuMzE4ZDk4OC41MDJkMjY4LjUyOGQ5MTUuMDAxZDI3Ni4wNDVkODg1Ljc2OGQyODEuMDU3ZDgwMC4xNTZkMjgxLjQ3NGQ3OTAuNTUxZDMwNi45NDlkNzkyLjYzOWQyODQuODE1ZDc2NC4yNDFkMjgzLjk4ZDc1NS44ODlkMjc4LjU1MWQ3NTAuNDZkMjgyLjMwOWQ3NDQuNjEzZDI5OS4wMTRkNzQ0LjYxM2QyNzIuNzA0ZDcyNC45ODVkMzAzLjE5ZDcxOC43MjFkMzY0LjU4ZDcxOC43MjFkMzY2LjY2OGQ3OTkuMzIxZDM0My42OTlkODE3LjY5NmQzNjIuMDc1ZDgzMi4zMTNkMzYxLjIzOWQ4ODcuNDM4ZDM2MS42NTdkOTE1LjgzNmQzNjIuNDkyZDk3OS43MzJkMzc2LjY5MWQ5NzkuNzMyZDM5NS4wNjZkOTc5LjczMmQ0MDguNDNkOTM4LjgwNWQ0MTAuMTAxZDk0OC44MjhkNDEwLjEwMWQ5NTcuMTgxZDQxMC4xMDFkOTk2LjQzN2QzNzkuNjE1ZDEwMTIuMzA2ZDM2MC44MjJkMTAyMS45MTFkMzEyLjM3OGQxMDI2LjkyM2QyOTkuMDE0ZDEwMjguMTc2ZDI4NS42NWQxMDAzLjExOWQyODcuMzIxZDk3MS43OTdkMjIwLjkyZDEwMjkuODQ2ZDE3My43MjlkMTAyOS44NDZkNjIuNjQyZDEwMjkuODQ2ZDYyLjY0MmQ4OTEuMTk3ZDYyLjY0MmQ4ODAuMzM5ZDY1Ljk4M2Q4NzEuOTg2ZDk1LjIxNmQ4NTguNjIzZDY0LjczZDgyOC41NTRkNjQuNzNkODEyLjI2N2Q2NC43M2Q4MDQuNzVkNjUuOTgzZDc5MC4zNDJkNjcuMjM2ZDc3NS45MzRkNjcuMjM2ZDc2OC40MTdkNjcuMjM2ZDc2NS45MTFkNjMuNDc3ZDc1NS4wNTNkNDAuMDkxZDc0OC43ODlkNDIuNTk3ZDc0OC43ODlkMzAuNDg2ZDc0OC43ODlkMTkuMjFkNzY4ZDI5LjY1ZDczOC43NjZkNDIuMTc5ZDcyOC43NDNkNTYuMzc4ZDcxNy44ODVkODYuMDI5ZDcxOC4zMDNkMTQ3LjAwMWQ3MTkuNTU2ZDI1Mi42NTlkNjI5LjM1ZDExNy4zNWQ1NDEuNjVkMTE3LjM1ZDUwOS40OTRkMTE3LjM1ZDUwNy40MDZkMTM4LjAyMmQ0ODkuNjU3ZDE1OC42OTRkNDcxLjkwOGQxNjEuNjE4ZDQ3MS45MDhkMTgwLjgyOGQ0NzEuOTA4ZDIxMy44MmQ1NDAuMzk4ZDIxNS45MDhkNTQ0Ljk5MWQyNTIuNjU5ZDYyOS4zNWhSM2Q0MjkuMzExUjRkNDEwLjEwMVI1ZDE5LjIxUjZkNTUyLjA5MVI3ZC01Ljg0NlI4ZDUzMi44OFI5ZDBSMTBkMjgzLjk4UjExaTI0OVIxMmQxOS4yMVIxM2Q0MjkuMzExUjE0YWkxaTJpMmkyaTJpM2kzaTNpM2kzaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2hnOjEzNm9SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTEzNlIxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ4b1IxZDc0MC4wMTlSMmFkMjU4LjA4OGQ3NzMuMDExZDE2My43MDZkOTg1LjU3OWQxODcuNTFkOTk1LjE4NGQyMDcuOTczZDk5NS4xODRkMjk3LjM0NGQ5OTUuMTg0ZDI5Ny4zNDRkOTAwLjM4NGQyOTcuMzQ0ZDg4Ny44NTZkMjk1LjY3M2Q4NzQuNDkyZDI5Ni4wOTFkODczLjY1N2QzMDkuMDM3ZDg3NS43NDVkMzI5LjkxOGQ4NzYuNThkMzMwLjc1M2Q4NzUuMzI3ZDMxMS4xMjVkODY0Ljg4N2QyOTEuMDc5ZDg0OS44NTNkMjgwLjYzOWQ4MDAuMTU2ZDI1OC4wODhkNzczLjAxMWQxMTcuNzY4ZDk2MS4zNTdkMTY2LjYyOWQ4NjMuMjE2ZDIxNy41NzlkNzQ0LjE5NWQyMDIuMTI3ZDczOS4xODRkMTg0LjE2OWQ3MzkuMTg0ZDk5LjM5M2Q3MzkuMTg0ZDk5LjM5M2Q4MzQuODE4ZDk5LjM5M2Q4OTAuNzc5ZDEyNi4xMmQ5NDQuMjM0ZDEyNS4yODVkOTQ1LjQ4N2QxMDYuMDc1ZDk0MS43MjlkODEuNDM1ZDkzOS42NDFkODAuNmQ5NDAuNDc2ZDk5LjM5M2Q5NTAuOTE2ZDExNy43NjhkOTYxLjM1N2Q1MS43ODRkMTA5Mi45MDdkOTcuMzA1ZDEwMDIuNzAxZDI3Ljk4ZDk1Ny41OThkMjcuOThkODYzLjIxNmQzNy41ODVkODU4LjIwNWQ1NS41NDNkODQ3LjM0N2Q0My44NDlkODMxLjQ3N2QzNC4yNDRkODExLjAxNGQzNS4wNzlkODEwLjE3OWQzNy41ODVkODA4LjkyNmQ0My44NDlkODA4LjkyNmQ0OS4yNzhkODA4LjkyNmQ1Ny4yMTNkODA5Ljc2MWQ2Ni40MDFkODA0Ljc1ZDYwLjU1NGQ3OTYuODE1ZDQ5LjI3OGQ3ODAuOTQ2ZDY2LjQwMWQ3NDIuNTI1ZDExMy4xNzRkNzIyLjQ3OWQxNTIuNDNkNzA1LjM1N2QyMDAuNDU2ZDcwNS4zNTdkMjE3LjE2MWQ3MDUuMzU3ZDIzMy4wM2Q3MDcuODYyZDI2MS40MjlkNjQxLjA0NGQyNjUuNjA1ZDY2Ni4xMDFkMzEyLjM3OGQ2NDUuNjM3ZDMxNC40NjZkNjQ2LjA1NWQyODAuNjM5ZDcyMi40NzlkMzM4LjI3ZDc0OC43ODlkMzYwLjgyMmQ4MDAuOTkxZDMzNy44NTNkODEyLjI2N2QzMTUuNzE5ZDgyNy43MTlkMzUxLjYzNGQ4MjcuNzE5ZDM2MC44MjJkODI3LjcxOWQzNjUuODMzZDgyOC45NzJkMzYyLjQ5MmQ4MzMuNTY2ZDM0Mi40NDZkODU3LjM3ZDM0My42OTlkODU4LjYyM2QzNjMuNzQ1ZDg1OC42MjNkMzY4Ljc1NmQ4NjAuMjkzZDM2OC43NTZkOTQwLjQ3NmQzMjQuNjk4ZDk4NS4zN2QyODAuNjM5ZDEwMzAuMjY0ZDIwMC44NzRkMTAzMC4yNjRkMTcxLjY0MWQxMDMwLjI2NGQxNDYuNTg0ZDEwMjRkMTE2LjA5N2QxMDkyLjkwN2QxMTEuNTA0ZDEwNzMuNjk2ZDgzLjEwNmQxMDkzLjMyNGQ1Ny42MzFkMTA5My4zMjRkNTQuMjlkMTA5My4zMjRkNTEuNzg0ZDEwOTIuOTA3aFIzZDM5NS45MDJSNGQzNjguNzU2UjVkMjcuOThSNmQzODIuOTU1UjdkLTY5LjMyNFI4ZDM1NC45NzVSOWQwUjEwZDI4My45OFIxMWkyNDhSMTJkMjcuOThSMTNkMzk1LjkwMlIxNGFpMWkyaTNpM2kzaTJpM2kyaTNpM2kxaTNpM2kzaTNpMmkzaTJpM2kxaTJpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpMmkzaTJpM2kzaTJpM2kzaTJpMmkyaTNpM2kzaTJpMmkzaTNoZzoxMzVvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxMzVSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0N29SMWQ3NDAuMDE5UjJhZDI4LjM5OGQ4MzMuMTQ4ZDEyNy4zNzNkODMyLjczZDE1OS45NDdkODU1LjY5OWQxNTAuMzQyZDgzMi43M2QyMzguMDQyZDgzMi4zMTNkMjQxLjhkODMyLjMxM2QyNjAuNTkzZDgzMy45ODNkMjYwLjE3NmQ4MzYuMDcxZDI2MC4xNzZkODQwLjY2NWQyNzMuMTIyZDg0NS42NzZkMjYyLjI2NGQ4NjYuMTRkMjYxLjQyOWQ4NjkuMDYzZDI2MS40MjlkODg0LjkzM2QyMjUuNTEzZDg4NC45MzNkMjA0LjYzMmQ4NjcuMzkzZDE5Ni4yOGQ4ODQuOTMzZDI2LjcyN2Q4ODUuMzVkMjcuNTYyZDg4My4yNjJkMzguNDJkODczLjY1N2QzNS4wNzlkODcyLjQwNGQzMS4zMjFkODY0LjQ2OWQyNy41NjJkODY2Ljk3NWQyMC40NjNkODcwLjczNGQyOC4zOThkODMzLjE0OGQxNDcuODM2ZDc2Mi45ODhkMTUzLjI2NWQ3NjIuOTg4ZDE2My4yODhkNzQxLjQ4MWQxNzMuMzExZDcxOS45NzNkMTc2LjIzNGQ3MTkuOTczZDE3Ny4wN2Q3MTkuOTczZDE3Ny45MDVkNzIwLjgwOWQxOTIuNTIyZDczMi4wODRkMTkyLjUyMmQ3NTAuNDZkMTkyLjUyMmQ3OTkuNzM4ZDE0Ny4wMDFkNzk5LjczOGQxMDEuMDYzZDc5OS43MzhkMTAxLjA2M2Q3NTQuMjE4ZDEwMS4wNjNkNzQ3LjUzNmQxMjQuODY3ZDcyOS41NzlkMTU2LjYwNmQ3MDUuNzc0ZDE1Ny40NDJkNzA4LjY5OGQxNTIuMDEzZDcyNi4yMzhkMTQ0LjkxM2Q3NDkuNjI0ZDE0NC45MTNkNzU3LjU1OWQxNDQuOTEzZDc2Mi45ODhkMTQ3LjgzNmQ3NjIuOTg4ZDE0OS41MDdkOTEwLjQwN2QxNjguM2Q5MTAuNDA3ZDE4Mi43MDdkOTIxLjY4M2QxOTcuMTE1ZDkzMi45NTlkMTk3LjExNWQ5NTEuMzM0ZDE5Ny4xMTVkMTAwMC42MTNkMTUxLjU5NWQxMDAwLjYxM2QxMDUuNjU3ZDEwMDAuNjEzZDEwNS42NTdkOTU1LjA5MmQxMDUuNjU3ZDkzNy41NTNkMTE4LjgxMmQ5MjMuOThkMTMxLjk2N2Q5MTAuNDA3ZDE0OS41MDdkOTEwLjQwN2hSM2QyOTEuNDk3UjRkMjczLjEyMlI1ZDIwLjQ2M1I2ZDMxOC4yMjVSN2QyMy4zODZSOGQyOTcuNzYxUjlkMFIxMGQyODMuOThSMTFpMjQ3UjEyZDIwLjQ2M1IxM2QyOTEuNDk3UjE0YWkxaTJpMmkyaTJpM2kyaTNpMmkzaTJpMmkyaTJpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kxaTNpM2kzaTNpM2kzaGc6MTM0b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTM0UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDZvUjFkNzQwLjAxOVIyYWQzNTkuOTg2ZDg2MC4yOTNkMzU5Ljk4NmQ5NDAuNDc2ZDMxNi4xMzdkOTg1LjM3ZDI3Mi4yODdkMTAzMC4yNjRkMTkyLjEwNGQxMDMwLjI2NGQxMTQuMDA5ZDEwMzAuMjY0ZDY3LjIzNmQ5ODUuOTk2ZDE5LjIxZDk0MC44OTNkMTkuMjFkODYzLjIxNmQyOC44MTVkODU4LjIwNWQ0Ni43NzNkODQ3LjM0N2QzNS4wNzlkODMxLjQ3N2QyNS40NzRkODExLjAxNGQyNi4zMDlkODEwLjE3OWQyOC44MTVkODA4LjkyNmQzNS40OTdkODA4LjkyNmQ0MC41MDhkODA4LjkyNmQ0OC40NDNkODA5Ljc2MWQ1Ny42MzFkODA0Ljc1ZDUxLjc4NGQ3OTYuODE1ZDQwLjUwOGQ3ODAuOTQ2ZDU3LjYzMWQ3NDIuNTI1ZDEwNC40MDRkNzIyLjQ3OWQxNDMuNjZkNzA1LjM1N2QxOTEuNjg2ZDcwNS4zNTdkMjQzLjA1M2Q3MDUuMzU3ZDI4Ni40ODZkNzI5Ljk5NmQzMzIuNDI0ZDc1NS44ODlkMzUyLjA1MmQ4MDAuOTkxZDMyOS4wODNkODEyLjI2N2QzMDYuOTQ5ZDgyNy43MTlkMzQyLjg2NGQ4MjcuNzE5ZDM1Mi40NjlkODI3LjcxOWQzNTcuMDYzZDgyOC45NzJkMzUzLjcyMmQ4MzMuNTY2ZDMzMy42NzZkODU3LjM3ZDMzNC45MjlkODU4LjYyM2QzNTQuOTc1ZDg1OC42MjNkMzU5Ljk4NmQ4NjAuMjkzZDI4Ni45MDNkODc0LjQ5MmQyODcuMzIxZDg3My42NTdkMzAwLjI2N2Q4NzUuNzQ1ZDMyMS4xNDhkODc2LjU4ZDMyMS45ODNkODc1LjMyN2QzMDIuMzU1ZDg2NC44ODdkMjgyLjMwOWQ4NDkuODUzZDI1OS43NThkNzM5LjE4NGQxNzUuMzk5ZDczOS4xODRkOTAuNjIzZDczOS4xODRkOTAuNjIzZDgzNC44MThkOTAuNjIzZDg5MC43NzlkMTE3LjM1ZDk0NC4yMzRkMTE2LjUxNWQ5NDUuNDg3ZDk3LjMwNWQ5NDEuNzI5ZDcyLjY2NWQ5MzkuNjQxZDcxLjgzZDk0MC40NzZkMTM0LjA1NWQ5NzUuMTM4ZDE2OS45N2Q5OTUuMTg0ZDE5OS4yMDNkOTk1LjE4NGQyODguNTc0ZDk5NS4xODRkMjg4LjU3NGQ5MDAuMzg0ZDI4OC41NzRkODg3Ljg1NmQyODYuOTAzZDg3NC40OTJkMTMwLjcxNGQ1MTQuMDg4ZDE0OS41MDdkNTE0LjA4OGQxNjMuOTE1ZDUyNS4zNjNkMTc4LjMyM2Q1MzYuNjM5ZDE3OC4zMjNkNTU1LjAxNGQxNzguMzIzZDU5NC4yN2QxNTIuNDNkNTk0LjI3ZDExOC4xODVkNTk0LjI3ZDEwOC41OGQ1OTEuMzQ3ZDg2Ljg2NGQ1ODQuNjY1ZDg2Ljg2NGQ1NTguNzczZDg2Ljg2NGQ1NDEuMjMzZDEwMC4wMTlkNTI3LjY2ZDExMy4xNzRkNTE0LjA4OGQxMzAuNzE0ZDUxNC4wODhkMjYxLjAxMWQ1MTAuMzI5ZDI3OS44MDRkNTEwLjMyOWQyOTQuMjEyZDUyMS42MDVkMzA4LjYxOWQ1MzIuODhkMzA4LjYxOWQ1NTEuMjU2ZDMwOC42MTlkNTg5LjI1OWQyODYuMDY4ZDU4OS4yNTlkMjgxLjg5MmQ1ODkuMjU5ZDI3NC4xNjZkNTg3LjU4OGQyNjYuNDRkNTg1LjkxOGQyNjIuNjgxZDU4NS45MThkMjM2Ljc4OWQ1ODUuNWQyMzAuMTA3ZDU4Mi41NzdkMjE3LjE2MWQ1NzYuNzNkMjE3LjE2MWQ1NTUuMDE0ZDIxNy4xNjFkNTM3LjA1N2QyMzAuMTA3ZDUyMy42OTNkMjQzLjA1M2Q1MTAuMzI5ZDI2MS4wMTFkNTEwLjMyOWhSM2QzNzkuMTk3UjRkMzU5Ljk4NlI1ZDE5LjIxUjZkNTEzLjY3UjdkLTYuMjY0UjhkNDk0LjQ2UjlkMFIxMGQyODMuOThSMTFpMjQ2UjEyZDE5LjIxUjEzZDM3OS4xOTdSMTRhaTFpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTJpMmkxaTJpM2kyaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2kxaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2hnOjEzM29SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTEzM1IxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ1b1IxZDc0MC4wMTlSMmFkMzU5Ljk4NmQ4NjAuMjkzZDM1OS45ODZkOTQwLjQ3NmQzMTYuMTM3ZDk4NS4zN2QyNzIuMjg3ZDEwMzAuMjY0ZDE5Mi4xMDRkMTAzMC4yNjRkMTE0LjAwOWQxMDMwLjI2NGQ2Ny4yMzZkOTg1Ljk5NmQxOS4yMWQ5NDAuODkzZDE5LjIxZDg2My4yMTZkMjguODE1ZDg1OC4yMDVkNDYuNzczZDg0Ny4zNDdkMzUuMDc5ZDgzMS40NzdkMjUuNDc0ZDgxMS4wMTRkMjYuMzA5ZDgxMC4xNzlkMjguODE1ZDgwOC45MjZkMzUuNDk3ZDgwOC45MjZkNDAuNTA4ZDgwOC45MjZkNDguNDQzZDgwOS43NjFkNTcuNjMxZDgwNC43NWQ1MS43ODRkNzk2LjgxNWQ0MC41MDhkNzgwLjk0NmQ1Ny42MzFkNzQyLjUyNWQxMDQuNDA0ZDcyMi40NzlkMTQzLjY2ZDcwNS4zNTdkMTkxLjY4NmQ3MDUuMzU3ZDI0My4wNTNkNzA1LjM1N2QyODYuNDg2ZDcyOS45OTZkMzMyLjQyNGQ3NTUuODg5ZDM1Mi4wNTJkODAwLjk5MWQzMjkuMDgzZDgxMi4yNjdkMzA2Ljk0OWQ4MjcuNzE5ZDM0Mi44NjRkODI3LjcxOWQzNTIuNDY5ZDgyNy43MTlkMzU3LjA2M2Q4MjguOTcyZDM1My43MjJkODMzLjU2NmQzMzMuNjc2ZDg1Ny4zN2QzMzQuOTI5ZDg1OC42MjNkMzU0Ljk3NWQ4NTguNjIzZDM1OS45ODZkODYwLjI5M2QyODYuOTAzZDg3NC40OTJkMjg3LjMyMWQ4NzMuNjU3ZDMwMC4yNjdkODc1Ljc0NWQzMjEuMTQ4ZDg3Ni41OGQzMjEuOTgzZDg3NS4zMjdkMzAyLjM1NWQ4NjQuODg3ZDI4Mi4zMDlkODQ5Ljg1M2QyNTkuNzU4ZDczOS4xODRkMTc1LjM5OWQ3MzkuMTg0ZDkwLjYyM2Q3MzkuMTg0ZDkwLjYyM2Q4MzQuODE4ZDkwLjYyM2Q4OTAuNzc5ZDExNy4zNWQ5NDQuMjM0ZDExNi41MTVkOTQ1LjQ4N2Q5Ny4zMDVkOTQxLjcyOWQ3Mi42NjVkOTM5LjY0MWQ3MS44M2Q5NDAuNDc2ZDEzNC4wNTVkOTc1LjEzOGQxNjkuOTdkOTk1LjE4NGQxOTkuMjAzZDk5NS4xODRkMjg4LjU3NGQ5OTUuMTg0ZDI4OC41NzRkOTAwLjM4NGQyODguNTc0ZDg4Ny44NTZkMjg2LjkwM2Q4NzQuNDkyZDI5NC4wMDNkNTAxLjk3N2QzMTMuMjEzZDUwOC42NTlkMzI5LjA4M2Q1MzIuNDYzZDMyNi45OTVkNjAwLjUzNWQyNjEuMDExZDYwMC41MzVkMjM1LjExOWQ2MDAuNTM1ZDE4Mi43MDdkNTc2LjMxM2QxMzAuMjk2ZDU1Mi4wOTFkMTA0LjgyMmQ1NTIuMDkxZDkxLjA0ZDU1Mi4wOTFkNzkuOTczZDU2MS40ODdkNjguOTA3ZDU3MC44ODRkNjguOTA3ZDU4NC4yNDdkNjguOTA3ZDYwMi42MjNkOTEuODc2ZDYxNi40MDRkNTAuOTQ5ZDYwMi42MjNkNTAuOTQ5ZDU4NS45MThkNTAuOTQ5ZDUxMy42N2QxMTEuMDg2ZDUxMy42N2QxMzguNjQ5ZDUxMy42N2QxOTAuODUxZDUzOC4xMDFkMjQzLjA1M2Q1NjIuNTMxZDI3MC42MTZkNTYyLjUzMWQzMTIuNzk2ZDU2Mi41MzFkMzEyLjc5NmQ1MzQuNTUxZDMxMi43OTZkNTE5LjUxN2QyOTQuMDAzZDUwMS45NzdoUjNkMzc5LjE5N1I0ZDM1OS45ODZSNWQxOS4yMVI2ZDUyMi4wMjJSN2QtNi4yNjRSOGQ1MDIuODEyUjlkMFIxMGQyODMuOThSMTFpMjQ1UjEyZDE5LjIxUjEzZDM3OS4xOTdSMTRhaTFpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTJpMmkxaTJpM2kyaTNpM2kzaTNpMmkzaTJpMmkzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxMzJvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxMzJSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0NG9SMWQ3NDAuMDE5UjJhZDM1OS45ODZkODYwLjI5M2QzNTkuOTg2ZDk0MC40NzZkMzE2LjEzN2Q5ODUuMzdkMjcyLjI4N2QxMDMwLjI2NGQxOTIuMTA0ZDEwMzAuMjY0ZDExNC4wMDlkMTAzMC4yNjRkNjcuMjM2ZDk4NS45OTZkMTkuMjFkOTQwLjg5M2QxOS4yMWQ4NjMuMjE2ZDI4LjgxNWQ4NTguMjA1ZDQ2Ljc3M2Q4NDcuMzQ3ZDM1LjA3OWQ4MzEuNDc3ZDI1LjQ3NGQ4MTEuMDE0ZDI2LjMwOWQ4MTAuMTc5ZDI4LjgxNWQ4MDguOTI2ZDM1LjQ5N2Q4MDguOTI2ZDQwLjUwOGQ4MDguOTI2ZDQ4LjQ0M2Q4MDkuNzYxZDU3LjYzMWQ4MDQuNzVkNTEuNzg0ZDc5Ni44MTVkNDAuNTA4ZDc4MC45NDZkNTcuNjMxZDc0Mi41MjVkMTA0LjQwNGQ3MjIuNDc5ZDE0My42NmQ3MDUuMzU3ZDE5MS42ODZkNzA1LjM1N2QyNDMuMDUzZDcwNS4zNTdkMjg2LjQ4NmQ3MjkuOTk2ZDMzMi40MjRkNzU1Ljg4OWQzNTIuMDUyZDgwMC45OTFkMzI5LjA4M2Q4MTIuMjY3ZDMwNi45NDlkODI3LjcxOWQzNDIuODY0ZDgyNy43MTlkMzUyLjQ2OWQ4MjcuNzE5ZDM1Ny4wNjNkODI4Ljk3MmQzNTMuNzIyZDgzMy41NjZkMzMzLjY3NmQ4NTcuMzdkMzM0LjkyOWQ4NTguNjIzZDM1NC45NzVkODU4LjYyM2QzNTkuOTg2ZDg2MC4yOTNkMjg2LjkwM2Q4NzQuNDkyZDI4Ny4zMjFkODczLjY1N2QzMDAuMjY3ZDg3NS43NDVkMzIxLjE0OGQ4NzYuNThkMzIxLjk4M2Q4NzUuMzI3ZDMwMi4zNTVkODY0Ljg4N2QyODIuMzA5ZDg0OS44NTNkMjU5Ljc1OGQ3MzkuMTg0ZDE3NS4zOTlkNzM5LjE4NGQ5MC42MjNkNzM5LjE4NGQ5MC42MjNkODM0LjgxOGQ5MC42MjNkODkwLjc3OWQxMTcuMzVkOTQ0LjIzNGQxMTYuNTE1ZDk0NS40ODdkOTcuMzA1ZDk0MS43MjlkNzIuNjY1ZDkzOS42NDFkNzEuODNkOTQwLjQ3NmQxMzQuMDU1ZDk3NS4xMzhkMTY5Ljk3ZDk5NS4xODRkMTk5LjIwM2Q5OTUuMTg0ZDI4OC41NzRkOTk1LjE4NGQyODguNTc0ZDkwMC4zODRkMjg4LjU3NGQ4ODcuODU2ZDI4Ni45MDNkODc0LjQ5MmQ4Mi4yN2Q2MTYuODIyZDg4Ljk1MmQ2MTAuNTU3ZDEzOS4wNjZkNTYwLjg2MWQxNDcuODM2ZDU1OS4xOWQxNjIuNDUzZDU1Mi45MjZkMTU5Ljk0N2Q1NDkuNTg1ZDE1NS43NzFkNTQyLjkwM2QxNjguM2Q1MzYuMjIxZDE2OS4xMzVkNTI2LjE5OWQxODEuMjQ2ZDUwMi4zOTRkMTk1LjAyN2Q0NzUuMjQ5ZDE5Ny45NTFkNDY2LjA2MWQyMDIuNTQ0ZDQ2Ni4wNjFkMjQwLjEzZDU2MC4wMjZkMzA3LjM2N2Q2MTYuODIyZDI2Ny42OTNkNjE2LjgyMmQyNjMuOTM0ZDYxNi44MjJkMjUwLjM2MmQ2MDkuMzA1ZDIzNi43ODlkNjAxLjc4N2QyMzYuMzcxZDU5OC44NjRkMjM4LjQ2ZDU5NC4yN2QyNDIuNjM2ZDU4NC4yNDdkMjQyLjIxOGQ1ODIuNTc3ZDIzNS41MzZkNTg0LjY2NWQyMzEuMzZkNTg0LjI0N2QyMjYuMzQ5ZDU4My44M2QyMjUuNTEzZDU3MS43MTlkMjIyLjU5ZDU1Ni4yNjdkMjIwLjUwMmQ1NjQuMjAyZDIxNy4xNjFkNTcwLjg4NGQyMTMuNDAyZDU2NS44NzJkMTk5LjIwM2Q1MzkuNTYyZDE3My43MjlkNTgwLjQ4OWQxMjAuMjc0ZDYxNi44MjJkODIuMjdkNjE2LjgyMmhSM2QzNzkuMTk3UjRkMzU5Ljk4NlI1ZDE5LjIxUjZkNTU3LjkzOFI3ZC02LjI2NFI4ZDUzOC43MjdSOWQwUjEwZDI4My45OFIxMWkyNDRSMTJkMTkuMjFSMTNkMzc5LjE5N1IxNGFpMWkzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkyaTFpMmkzaTJpM2kzaTNpM2kyaTNpMmkyaTNpM2kzaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6MTMxb1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTMxUjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDNvUjFkNzQwLjAxOVIyYWQzNTkuOTg2ZDg2MC4yOTNkMzU5Ljk4NmQ5NDAuNDc2ZDMxNi4xMzdkOTg1LjM3ZDI3Mi4yODdkMTAzMC4yNjRkMTkyLjEwNGQxMDMwLjI2NGQxMTQuMDA5ZDEwMzAuMjY0ZDY3LjIzNmQ5ODUuOTk2ZDE5LjIxZDk0MC44OTNkMTkuMjFkODYzLjIxNmQyOC44MTVkODU4LjIwNWQ0Ni43NzNkODQ3LjM0N2QzNS4wNzlkODMxLjQ3N2QyNS40NzRkODExLjAxNGQyNi4zMDlkODEwLjE3OWQyOC44MTVkODA4LjkyNmQzNS40OTdkODA4LjkyNmQ0MC41MDhkODA4LjkyNmQ0OC40NDNkODA5Ljc2MWQ1Ny42MzFkODA0Ljc1ZDUxLjc4NGQ3OTYuODE1ZDQwLjUwOGQ3ODAuOTQ2ZDU3LjYzMWQ3NDIuNTI1ZDEwNC40MDRkNzIyLjQ3OWQxNDMuNjZkNzA1LjM1N2QxOTEuNjg2ZDcwNS4zNTdkMjQzLjA1M2Q3MDUuMzU3ZDI4Ni40ODZkNzI5Ljk5NmQzMzIuNDI0ZDc1NS44ODlkMzUyLjA1MmQ4MDAuOTkxZDMyOS4wODNkODEyLjI2N2QzMDYuOTQ5ZDgyNy43MTlkMzQyLjg2NGQ4MjcuNzE5ZDM1Mi40NjlkODI3LjcxOWQzNTcuMDYzZDgyOC45NzJkMzUzLjcyMmQ4MzMuNTY2ZDMzMy42NzZkODU3LjM3ZDMzNC45MjlkODU4LjYyM2QzNTQuOTc1ZDg1OC42MjNkMzU5Ljk4NmQ4NjAuMjkzZDI4Ni45MDNkODc0LjQ5MmQyODcuMzIxZDg3My42NTdkMzAwLjI2N2Q4NzUuNzQ1ZDMyMS4xNDhkODc2LjU4ZDMyMS45ODNkODc1LjMyN2QzMDIuMzU1ZDg2NC44ODdkMjgyLjMwOWQ4NDkuODUzZDI1OS43NThkNzM5LjE4NGQxNzUuMzk5ZDczOS4xODRkOTAuNjIzZDczOS4xODRkOTAuNjIzZDgzNC44MThkOTAuNjIzZDg5MC43NzlkMTE3LjM1ZDk0NC4yMzRkMTE2LjUxNWQ5NDUuNDg3ZDk3LjMwNWQ5NDEuNzI5ZDcyLjY2NWQ5MzkuNjQxZDcxLjgzZDk0MC40NzZkMTM0LjA1NWQ5NzUuMTM4ZDE2OS45N2Q5OTUuMTg0ZDE5OS4yMDNkOTk1LjE4NGQyODguNTc0ZDk5NS4xODRkMjg4LjU3NGQ5MDAuMzg0ZDI4OC41NzRkODg3Ljg1NmQyODYuOTAzZDg3NC40OTJkMTM5LjA2NmQ2MjQuNzU2ZDI3NC4zNzVkNTM3LjA1N2QyNzQuMzc1ZDUwNC45ZDI3NC4zNzVkNTAzLjIzZDI1My40OTRkNDg1LjI3MmQyMzIuNjEzZDQ2Ny4zMTRkMjMwLjEwN2Q0NjcuMzE0ZDIxMS43MzJkNDY3LjMxNGQxNzcuNDg3ZDUzNS44MDRkMTcyLjA1OGQ1NDYuNjYyZDEzOS4wNjZkNjI0Ljc1NmhSM2QzNzkuMTk3UjRkMzU5Ljk4NlI1ZDE5LjIxUjZkNTU2LjY4NVI3ZC02LjI2NFI4ZDUzNy40NzRSOWQwUjEwZDI4My45OFIxMWkyNDNSMTJkMTkuMjFSMTNkMzc5LjE5N1IxNGFpMWkzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkyaTFpMmkzaTJpM2kzaTNpM2kyaTNpMmkyaTNpM2kzaTFpM2kzaTNpM2kzaGc6MTMwb1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTMwUjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDJvUjFkNzQwLjAxOVIyYWQzNTkuOTg2ZDg2MC4yOTNkMzU5Ljk4NmQ5NDAuNDc2ZDMxNi4xMzdkOTg1LjM3ZDI3Mi4yODdkMTAzMC4yNjRkMTkyLjEwNGQxMDMwLjI2NGQxMTQuMDA5ZDEwMzAuMjY0ZDY3LjIzNmQ5ODUuOTk2ZDE5LjIxZDk0MC44OTNkMTkuMjFkODYzLjIxNmQyOC44MTVkODU4LjIwNWQ0Ni43NzNkODQ3LjM0N2QzNS4wNzlkODMxLjQ3N2QyNS40NzRkODExLjAxNGQyNi4zMDlkODEwLjE3OWQyOC44MTVkODA4LjkyNmQzNS40OTdkODA4LjkyNmQ0MC41MDhkODA4LjkyNmQ0OC40NDNkODA5Ljc2MWQ1Ny42MzFkODA0Ljc1ZDUxLjc4NGQ3OTYuODE1ZDQwLjUwOGQ3ODAuOTQ2ZDU3LjYzMWQ3NDIuNTI1ZDEwNC40MDRkNzIyLjQ3OWQxNDMuNjZkNzA1LjM1N2QxOTEuNjg2ZDcwNS4zNTdkMjQzLjA1M2Q3MDUuMzU3ZDI4Ni40ODZkNzI5Ljk5NmQzMzIuNDI0ZDc1NS44ODlkMzUyLjA1MmQ4MDAuOTkxZDMyOS4wODNkODEyLjI2N2QzMDYuOTQ5ZDgyNy43MTlkMzQyLjg2NGQ4MjcuNzE5ZDM1Mi40NjlkODI3LjcxOWQzNTcuMDYzZDgyOC45NzJkMzUzLjcyMmQ4MzMuNTY2ZDMzMy42NzZkODU3LjM3ZDMzNC45MjlkODU4LjYyM2QzNTQuOTc1ZDg1OC42MjNkMzU5Ljk4NmQ4NjAuMjkzZDI4Ni45MDNkODc0LjQ5MmQyODcuMzIxZDg3My42NTdkMzAwLjI2N2Q4NzUuNzQ1ZDMyMS4xNDhkODc2LjU4ZDMyMS45ODNkODc1LjMyN2QzMDIuMzU1ZDg2NC44ODdkMjgyLjMwOWQ4NDkuODUzZDI1OS43NThkNzM5LjE4NGQxNzUuMzk5ZDczOS4xODRkOTAuNjIzZDczOS4xODRkOTAuNjIzZDgzNC44MThkOTAuNjIzZDg5MC43NzlkMTE3LjM1ZDk0NC4yMzRkMTE2LjUxNWQ5NDUuNDg3ZDk3LjMwNWQ5NDEuNzI5ZDcyLjY2NWQ5MzkuNjQxZDcxLjgzZDk0MC40NzZkMTM0LjA1NWQ5NzUuMTM4ZDE2OS45N2Q5OTUuMTg0ZDE5OS4yMDNkOTk1LjE4NGQyODguNTc0ZDk5NS4xODRkMjg4LjU3NGQ5MDAuMzg0ZDI4OC41NzRkODg3Ljg1NmQyODYuOTAzZDg3NC40OTJkMjI3LjYwMWQ2MjkuMzVkOTIuMjkzZDU0MS42NWQ5Mi4yOTNkNTA5LjQ5NGQ5Mi4yOTNkNTA3LjQwNmQxMTIuOTY1ZDQ4OS42NTdkMTMzLjYzN2Q0NzEuOTA4ZDEzNi41NjFkNDcxLjkwOGQxNTUuNzcxZDQ3MS45MDhkMTg4Ljc2M2Q1NDAuMzk4ZDE5MC44NTFkNTQ0Ljk5MWQyMjcuNjAxZDYyOS4zNWhSM2QzNzkuMTk3UjRkMzU5Ljk4NlI1ZDE5LjIxUjZkNTUyLjA5MVI3ZC02LjI2NFI4ZDUzMi44OFI5ZDBSMTBkMjgzLjk4UjExaTI0MlIxMmQxOS4yMVIxM2QzNzkuMTk3UjE0YWkxaTNpM2kzaTNpM2kzaTJpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpMmkyaTJpMWkyaTNpMmkzaTNpM2kzaTJpM2kyaTJpM2kzaTNpMWkzaTNpM2kzaTNoZzoxMjlvUjFkNzQwLjAxOVIyYWQ2My44OTVkMTAyNGQ2My44OTVkMjgzLjk4ZDQ0OC4xMDRkMjgzLjk4ZDQ0OC4xMDRkMTAyNGQ2My44OTVkMTAyNGQxMjguMjA4ZDk2MC4xMDRkMzg0LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDM0Ny44NzZkMTI4LjIwOGQ5NjAuMTA0aFIzZDUxMlI0ZDQ0OC4xMDRSNWQ2My44OTVSNmQ3NDAuMDE5UjdkMFI4ZDY3Ni4xMjNSOWQwUjEwZDI4My45OFIxMWkxMjlSMTJkNjMuODk1UjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MW9SMWQ3NDAuMDE5UjJhZDY4LjQ4OWQ5OTQuMzQ5ZDcwLjU3N2Q5NzguODk3ZDcwLjU3N2Q5MTguMzQyZDkwLjIwNWQ5MjEuNjgzZDY5Ljc0MmQ4OTYuNjI2ZDY5Ljc0MmQ4MzQuODE4ZDY5Ljc0MmQ4MDYuNDJkNjkuNzQyZDc2NS40OTRkNTUuNTQzZDc2NS40OTRkNDUuOTM4ZDc2NS40OTRkMjYuMzA5ZDc3Ny4xODdkNTEuNzg0ZDczNy4wOTZkNzguMDk0ZDcxOC43MjFkMTAxLjQ4MWQ3MDIuNDMzZDE0OC42NzJkNjg4LjY1MmQxNDguNjcyZDY5NS43NTJkMTQ3LjQxOWQ3MzYuMjYxZDEyNC44NjdkNzU4LjgxMmQxMzMuMjJkNzU1LjA1M2QxNDIuODI1ZDc1My44ZDE0Ny44MzZkNzU3Ljk3N2QxODUuNDIyZDcyNS40MDJkMTkyLjUyMmQ3MjAuODA5ZDIxNS40OTFkNzA2LjE5MmQyNDcuNjQ3ZDcwNi4xOTJkMzc0LjYwM2Q3MDYuMTkyZDM3NC42MDNkODU4LjYyM2QzNzQuNjAzZDg3OC4yNTFkMzcxLjg4OWQ5MTcuNTA3ZDM2OS4xNzRkOTU2Ljc2M2QzNjkuMTc0ZDk3Ni4zOTFkMzY5LjE3NGQ5ODAuNTY3ZDM3Mi4wOTdkOTkwLjU5ZDM4Ni4yOTZkOTk1LjE4NGQ0MTMuODU5ZDEwMTEuNDcxZDM5OS4yNDNkMTAxOS44MjNkMzc2LjY5MWQxMDE3LjczNWQzMzguNjg4ZDEwMTkuODIzZDI5Mi43NWQxMDIyLjMyOWQyNzcuNzE2ZDEwMjIuMzI5ZDI1NC43NDdkMTAyMi4zMjlkMjQwLjEzZDEwMTUuNjQ3ZDI1My4wNzZkMTAwMy41MzZkMjczLjUzOWQxMDAxLjAzZDI4Ny43MzhkOTg4LjkyZDI5MC42NjJkOTc2LjgwOWQyOTAuNjYyZDk2NC42OThkMzAxLjUyZDk1MC4wODFkMzExLjk2ZDkyMi45MzZkMzA5Ljg3MmQ5MjAuNDNkMzAwLjI2N2Q5MjUuMDI0ZDI5MC42NjJkOTM0LjYyOWQyOTAuNjYyZDkyMC40M2QyOTIuOTU5ZDg5MS42MTVkMjk1LjI1NmQ4NjIuNzk5ZDI5NS4yNTZkODQ4LjZkMjk1LjI1NmQ3NTguMzk0ZDI0OC4wNjVkNzU4LjM5NGQxOTMuMzU3ZDc1OC4zOTRkMTQ5LjUwN2Q3OTguNDg2ZDE1MC4zNDJkODAxLjQwOWQxNTAuMzQyZDgwNS41ODVkMTUwLjM0MmQ4MzIuMzEzZDEyNC44NjdkODc1LjMyN2QxNTIuODQ4ZDg1Mi4zNThkMTQ3LjAwMWQ5ODcuNjY3ZDE0Ni41ODRkOTk5Ljc3OGQxNjQuNTQxZDEwMDguOTY1ZDE3OC43NGQxMDE0LjM5NGQxOTIuNTIyZDEwMTkuODIzZDE4Ny41MWQxMDI1LjI1MmQxNzcuNDg3ZDEwMzUuNjkzZDE1Ni42MDZkMTAzMC42ODFkMTMwLjI5NmQxMDI5LjQyOWQxMTIuMzM5ZDEwMjguNTkzZDgyLjY4OGQxMDI5Ljg0NmQ0NS41MmQxMDMxLjA5OWQzNC42NjJkMTAzMS4wOTlkMTkuMjFkMTAyNS42N2QzNi43NWQxMDE4LjE1M2Q2OC40ODlkOTk0LjM0OWQzMjAuNzNkNTAxLjk3N2QzMzkuOTQxZDUwOC42NTlkMzU1LjgxZDUzMi40NjNkMzUzLjcyMmQ2MDAuNTM1ZDI4Ny43MzhkNjAwLjUzNWQyNjEuODQ2ZDYwMC41MzVkMjA5LjQzNWQ1NzYuMzEzZDE1Ny4wMjRkNTUyLjA5MWQxMzEuNTQ5ZDU1Mi4wOTFkMTE3Ljc2OGQ1NTIuMDkxZDEwNi43MDFkNTYxLjQ4N2Q5NS42MzRkNTcwLjg4NGQ5NS42MzRkNTg0LjI0N2Q5NS42MzRkNjAyLjYyM2QxMTguNjAzZDYxNi40MDRkNzcuNjc2ZDYwMi42MjNkNzcuNjc2ZDU4NS45MThkNzcuNjc2ZDUxMy42N2QxMzcuODE0ZDUxMy42N2QxNjQuOTU5ZDUxMy42N2QyMTcuNTc5ZDUzOC4xMDFkMjcwLjE5OWQ1NjIuNTMxZDI5Ny4zNDRkNTYyLjUzMWQzMzkuNTIzZDU2Mi41MzFkMzM5LjUyM2Q1MzQuNTUxZDMzOS41MjNkNTE5LjUxN2QzMjAuNzNkNTAxLjk3N2hSM2Q0MzMuMDdSNGQ0MTMuODU5UjVkMTkuMjFSNmQ1MjIuMDIyUjdkLTExLjY5M1I4ZDUwMi44MTJSOWQwUjEwZDI4My45OFIxMWkyNDFSMTJkMTkuMjFSMTNkNDMzLjA3UjE0YWkxaTNpMmkzaTJpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTI4b1IxZDc0MC4wMTlSMmFkNjMuODk1ZDEwMjRkNjMuODk1ZDI4My45OGQ0NDguMTA0ZDI4My45OGQ0NDguMTA0ZDEwMjRkNjMuODk1ZDEwMjRkMTI4LjIwOGQ5NjAuMTA0ZDM4NC4yMDhkOTYwLjEwNGQzODQuMjA4ZDM0Ny44NzZkMTI4LjIwOGQzNDcuODc2ZDEyOC4yMDhkOTYwLjEwNGhSM2Q1MTJSNGQ0NDguMTA0UjVkNjMuODk1UjZkNzQwLjAxOVI3ZDBSOGQ2NzYuMTIzUjlkMFIxMGQyODMuOThSMTFpMTI4UjEyZDYzLjg5NVIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDBvUjFkNzQwLjAxOVIyYWQyMzcuMjA3ZDQ5MC4yODNkMjQ1Ljk3N2Q0ODkuNDQ4ZDI2Mi42ODFkNDg5LjQ0OGQyODIuNzI3ZDQ5OS44ODlkMjkzLjU4NWQ1MjEuMTg3ZDI5My41ODVkNTM4LjMwOWQyOTMuNTg1ZDU3OC40MDFkMjQyLjIxOGQ1OTguMDI5ZDM0NC4xMTdkNjkyLjgyOGQzNDQuMTE3ZDgyMy4xMjVkMzQyLjg2NGQ4MjMuOTZkMzI4LjY2NWQ4MTguNTMxZDMyNy40MTJkODE5LjM2N2QzMzQuOTI5ZDgzNi40ODlkMzQyLjQ0NmQ4NDkuMDE3ZDMyNC4wNzFkODY5LjQ4MWQzMDYuMTE0ZDg4NS4zNWQzMDguMjAyZDg4Ni42MDNkMzM0LjUxMmQ4ODAuNzU2ZDMzNi4xODJkODgyLjAwOWQzMzAuMzM2ZDg4OS45NDRkMzIwLjczZDg5OC43MTRkMzI3LjgzZDkwNi42NDlkMzI3LjgzZDk0My44MTdkMjczLjk1N2Q5ODAuOTg1ZDIyMy40MjVkMTAxNi4wNjVkMTgzLjc1MmQxMDE2LjA2NWQ4Ni44NjRkMTAxNi4wNjVkNTEuNzg0ZDk1NC4yNTdkNTMuMDM3ZDk1Mi41ODdkNjMuODk1ZDk1NS4wOTJkODUuMTk0ZDk1OC44NTFkODcuNjk5ZDk1Ny41OThkNjEuODA3ZDkzNS40NjRkMzcuNTg1ZDkxOC4zNDJkMzIuMTU2ZDg5NS43OTFkMzIuMTU2ZDg2OS4wNjNkMzIuMTU2ZDgwNi4wMDNkNjAuOTcyZDc2NS4wNzZkOTMuNTQ2ZDcxOC4zMDNkMTU0LjEwMWQ3MTguMzAzZDE5Mi41MjJkNzE4LjMwM2QyMTYuNzQzZDczNi42NzhkMjQzLjQ3MWQ3NTYuNzI0ZDI0My40NzFkNzk0LjMwOWQyNDMuNDcxZDgxOS4zNjdkMjE4LjgzMWQ4MzcuNzQyZDE3Mi4wNThkODY1LjMwNWQyMTYuNzQzZDgzMS44OTVkMjE2Ljc0M2Q3OTcuMjMzZDIxNi43NDNkNzUzLjhkMTYyLjAzNWQ3NTMuOGQ5NC4zODFkNzUzLjhkOTQuMzgxZDg2MS45NjRkOTQuMzgxZDkwMi40NzNkMTIwLjI3NGQ5MzcuNTUzZDE0OC4yNTRkOTc2LjM5MWQxODcuMDkyZDk3Ni4zOTFkMjMxLjc3OGQ5NzYuMzkxZDI1OS43NThkOTE5LjE3N2QyODIuMzA5ZDg3Mi44MjJkMjgyLjMwOWQ4MjEuODcyZDI4Mi4zMDlkNjg0Ljg5M2QxOTkuMjAzZDYwOC4wNTJkMTYyLjQ1M2Q2MTEuODFkMTI1LjI4NWQ2MTUuOTg2ZDc2LjQyNGQ2MjYuNDI3ZDc2LjQyNGQ2NTguMTY2ZDc2LjQyNGQ2ODcuMzk5ZDExNS42OGQ2ODguMjM0ZDk2Ljg4N2Q2OTIuNDExZDkwLjYyM2Q2OTIuNDExZDcwLjk5NWQ2OTIuNDExZDYwLjEzN2Q2NzEuNTNkNTEuMzY3ZDY1NC44MjVkNTEuMzY3ZDYzMy4xMDlkNTEuMzY3ZDU4Mi45OTVkMTUwLjM0MmQ1NzIuNTU0ZDExOC4xODVkNTU1LjQzMmQ4Mi4yN2Q1NTEuNjczZDMzLjgyN2Q1NDYuNjYyZDE5LjIxZDU0Mi40ODZkMzUuNDk3ZDUzMi44OGQ2Ny42NTRkNTMyLjg4ZDE0MC43MzdkNTMyLjg4ZDE5OS42MjFkNTY3LjU0M2QyNzEuODY5ZDU1Ni42ODVkMjcxLjg2OWQ1MjAuNzY5ZDI3MS44NjlkNDk5LjA1M2QyMzcuMjA3ZDQ5MC4yODNoUjNkMzYzLjMyN1I0ZDM0NC4xMTdSNWQxOS4yMVI2ZDUzNC41NTFSN2Q3LjkzNFI4ZDUxNS4zNFI5ZDBSMTBkMjgzLjk4UjExaTI0MFIxMmQxOS4yMVIxM2QzNjMuMzI3UjE0YWkxaTJpM2kzaTNpM2kyaTJpMmkzaTNpMmkyaTJpM2kyaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjEyN29SMWQ3NDAuMDE5UjJhZDYzLjg5NWQxMDI0ZDYzLjg5NWQyODMuOThkNDQ4LjEwNGQyODMuOThkNDQ4LjEwNGQxMDI0ZDYzLjg5NWQxMDI0ZDEyOC4yMDhkOTYwLjEwNGQzODQuMjA4ZDk2MC4xMDRkMzg0LjIwOGQzNDcuODc2ZDEyOC4yMDhkMzQ3Ljg3NmQxMjguMjA4ZDk2MC4xMDRoUjNkNTEyUjRkNDQ4LjEwNFI1ZDYzLjg5NVI2ZDc0MC4wMTlSN2QwUjhkNjc2LjEyM1I5ZDBSMTBkMjgzLjk4UjExaTEyN1IxMmQ2My44OTVSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjM5b1IxZDc0MC4wMTlSMmFkMTkuMjFkMTAxMS44ODlkMzUuNDk3ZDk5Ny42OWQ3Ni44NDFkOTkyLjY3OGQ3OS4zNDdkOTkxLjg0M2Q5My41NDZkOTg1LjU3OWQ5My41NDZkOTU4LjAxNmQ5NS4yMTZkOTU3LjU5OGQ5Ni44ODdkOTU3LjU5OGQxMDEuMDYzZDk1Ny41OThkMTE5LjQzOGQ5NzQuMzAzZDEyMS4xMDlkOTcyLjIxNWQxMTcuNzY4ZDk2Mi42MWQxMDMuMTUxZDkzNS40NjRkOTQuNzk5ZDkyMC4wMTNkOTMuNTQ2ZDg5NC4xMmQxMjQuNDVkODgyLjAwOWQ5My41NDZkODU4LjIwNWQ5NC4zODFkNzk3LjY1ZDkyLjI5M2Q3NzMuODQ2ZDgxLjg1M2Q3NTkuNjQ3ZDY1LjE0OGQ3NTkuNjQ3ZDUwLjUzMWQ3NTkuNjQ3ZDM5LjI1NmQ3NzUuMDk5ZDczLjkxOGQ3MjQuOTg1ZDk4LjE0ZDcxMy43MDlkMTM2LjU2MWQ3MDEuNTk4ZDE3NC41NjRkNjg5LjkwNWQxNjguNzE3ZDc1OC4zOTRkMTY4LjcxN2Q4MDEuODI3ZDE2OC43MTdkODk4LjI5NmQxNzQuOTgyZDk4OC45MmQxOTMuNzc0ZDk5My4wOTZkMjMwLjk0MmQxMDA1LjIwN2QyMzMuMDNkMTAxMy4xNDFkMjEyLjU2N2QxMDE5LjgyM2QxODcuOTI4ZDEwMjEuMDc2ZDE3MC44MDVkMTAyMS45MTFkMTQxLjE1NGQxMDIwLjY1OWQxMDEuODk4ZDEwMTguOTg4ZDk0Ljc5OWQxMDE4Ljk4OGQ4OC45NTJkMTAxOC45ODhkNzcuNDY4ZDEwMjEuMDc2ZDY1Ljk4M2QxMDIzLjE2NGQ2MC4xMzdkMTAyMy4xNjRkNTIuNjE5ZDEwMjMuMTY0ZDM5LjY3M2QxMDE4LjE1M2QyNS4wNTdkMTAxMi43MjRkMTkuMjFkMTAxMS44ODlkNjYuODE4ZDUxNC4wODhkMTE0LjQyN2Q1MTQuMDg4ZDExNC40MjdkNTU1LjAxNGQxMTQuNDI3ZDU5NC4yN2Q4OC41MzVkNTk0LjI3ZDU0LjI5ZDU5NC4yN2Q0NC42ODVkNTkxLjM0N2QyMi45NjlkNTg0LjY2NWQyMi45NjlkNTU4Ljc3M2QyMi45NjlkNTQxLjIzM2QzNi4xMjNkNTI3LjY2ZDQ5LjI3OGQ1MTQuMDg4ZDY2LjgxOGQ1MTQuMDg4ZDE5Ny4xMTVkNTEwLjMyOWQyNDQuNzI0ZDUxMC4zMjlkMjQ0LjcyNGQ1NTEuMjU2ZDI0NC43MjRkNTg5LjI1OWQyMjIuMTcyZDU4OS4yNTlkMjE3Ljk5NmQ1ODkuMjU5ZDIxMC4yN2Q1ODcuNTg4ZDIwMi41NDRkNTg1LjkxOGQxOTguNzg2ZDU4NS45MThkMTcyLjg5M2Q1ODUuNWQxNjYuMjEyZDU4Mi41NzdkMTUzLjI2NWQ1NzYuNzNkMTUzLjI2NWQ1NTUuMDE0ZDE1My4yNjVkNTM3LjA1N2QxNjYuMjEyZDUyMy42OTNkMTc5LjE1OGQ1MTAuMzI5ZDE5Ny4xMTVkNTEwLjMyOWhSM2QyNjMuOTM0UjRkMjQ0LjcyNFI1ZDE5LjIxUjZkNTEzLjY3UjdkMC44MzVSOGQ0OTQuNDZSOWQwUjEwZDI4My45OFIxMWkyMzlSMTJkMTkuMjFSMTNkMjYzLjkzNFIxNGFpMWkyaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTI2b1IxZDc0MC4wMTlSMmFkMzUyLjQ2OWQ2MTQuNzM0ZDM3Ni4yNzRkNjIyLjY2OGQzOTYuMzE5ZDY1Mi4zMTlkMzkzLjM5NmQ3MzcuNTEzZDMxMS4xMjVkNzM3LjUxM2QyNzguMTMzZDczNy41MTNkMjEzLjE5NGQ3MDcuMjM2ZDE0OC4yNTRkNjc2Ljk1OWQxMTUuNjhkNjc2Ljk1OWQ5OC4xNGQ2NzYuOTU5ZDg0LjU2N2Q2ODguNjUyZDcwLjk5NWQ3MDAuMzQ1ZDcwLjk5NWQ3MTcuNDY4ZDcwLjk5NWQ3NDAuMDE5ZDk5LjM5M2Q3NTcuNTU5ZDQ4LjQ0M2Q3NDAuMDE5ZDQ4LjQ0M2Q3MTkuNTU2ZDQ4LjQ0M2Q2MjguOTMzZDEyNC4wMzJkNjI4LjkzM2QxNTcuODU5ZDYyOC45MzNkMjIzLjQyNWQ2NTkuNDE5ZDI4OC45OTFkNjg5LjkwNWQzMjIuODE4ZDY4OS45MDVkMzc1Ljg1NmQ2ODkuOTA1ZDM3NS44NTZkNjU0LjgyNWQzNzUuODU2ZDYzNi40NWQzNTIuNDY5ZDYxNC43MzRoUjNkNDMyLjY1MlI0ZDM5Ni4zMTlSNWQ0OC40NDNSNmQ0MDkuMjY1UjdkMjY2LjQ0UjhkMzYwLjgyMlI5ZDBSMTBkMjgzLjk4UjExaTEyNlIxMmQ0OC40NDNSMTNkNDMyLjY1MlIxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM4b1IxZDc0MC4wMTlSMmFkMjAuMDQ1ZDEwMTEuODg5ZDM2LjMzMmQ5OTcuNjlkNzcuNjc2ZDk5Mi42NzhkODAuMTgyZDk5MS44NDNkOTQuMzgxZDk4NS41NzlkOTQuMzgxZDk1OC4wMTZkOTYuMDUyZDk1Ny41OThkOTcuNzIyZDk1Ny41OThkMTAxLjg5OGQ5NTcuNTk4ZDEyMC4yNzRkOTc0LjMwM2QxMjEuOTQ0ZDk3Mi4yMTVkMTE4LjYwM2Q5NjIuNjFkMTAzLjk4NmQ5MzUuNDY0ZDk1LjYzNGQ5MjAuMDEzZDk0LjM4MWQ4OTQuMTJkMTI1LjI4NWQ4ODIuMDA5ZDk0LjM4MWQ4NTguMjA1ZDk1LjIxNmQ3OTcuNjVkOTMuMTI4ZDc3My44NDZkODIuNjg4ZDc1OS42NDdkNjUuOTgzZDc1OS42NDdkNTEuMzY3ZDc1OS42NDdkNDAuMDkxZDc3NS4wOTlkNzQuNzUzZDcyNC45ODVkOTguOTc1ZDcxMy43MDlkMTM3LjM5NmQ3MDEuNTk4ZDE3NS4zOTlkNjg5LjkwNWQxNjkuNTUzZDc1OC4zOTRkMTY5LjU1M2Q4MDEuODI3ZDE2OS41NTNkODk4LjI5NmQxNzUuODE3ZDk4OC45MmQxOTQuNjFkOTkzLjA5NmQyMzEuNzc4ZDEwMDUuMjA3ZDIzMy44NjZkMTAxMy4xNDFkMjEzLjQwMmQxMDE5LjgyM2QxODguNzYzZDEwMjEuMDc2ZDE3MS42NDFkMTAyMS45MTFkMTQxLjk5ZDEwMjAuNjU5ZDEwMi43MzRkMTAxOC45ODhkOTUuNjM0ZDEwMTguOTg4ZDg5Ljc4N2QxMDE4Ljk4OGQ3OC4zMDNkMTAyMS4wNzZkNjYuODE4ZDEwMjMuMTY0ZDYwLjk3MmQxMDIzLjE2NGQ1My40NTVkMTAyMy4xNjRkNDAuNTA4ZDEwMTguMTUzZDI1Ljg5MmQxMDEyLjcyNGQyMC4wNDVkMTAxMS44ODlkMTkuMjFkNjE2LjgyMmQyNi4zMDlkNjEwLjU1N2Q3Ni4wMDZkNTYwLjg2MWQ4NC43NzZkNTU5LjE5ZDk5LjM5M2Q1NTIuOTI2ZDk2Ljg4N2Q1NDkuNTg1ZDkyLjcxMWQ1NDIuOTAzZDEwNS4yMzlkNTM2LjIyMWQxMDYuMDc1ZDUyNS4zNjNkMTE4LjE4NWQ1MDIuMzk0ZDEzMi44MDJkNDc0LjgzMWQxMzQuODlkNDY2LjA2MWQxMzkuNDg0ZDQ2Ni4wNjFkMTc3LjA3ZDU2MC4wMjZkMjQ0LjMwNmQ2MTYuODIyZDIwNC42MzJkNjE2LjgyMmQyMDAuODc0ZDYxNi44MjJkMTg3LjUxZDYwOS4zMDVkMTc0LjE0NmQ2MDEuNzg3ZDE3My4zMTFkNTk4Ljg2NGQxNzUuODE3ZDU5NC4yN2QxNzkuNTc1ZDU4NC4yNDdkMTc5LjE1OGQ1ODIuNTc3ZDE3Mi40NzZkNTg0LjY2NWQxNjguM2Q1ODQuMjQ3ZDE2My4yODhkNTgzLjgzZDE2Mi40NTNkNTcxLjcxOWQxNTkuNTNkNTU2LjI2N2QxNTcuNDQyZDU2NC4yMDJkMTU0LjEwMWQ1NzAuODg0ZDE1MC43NmQ1NjUuODcyZDEzNi4xNDNkNTM5LjU2MmQxMTAuNjY4ZDU4MC40ODlkNTcuMjEzZDYxNi44MjJkMTkuMjFkNjE2LjgyMmhSM2QyNjMuNTE3UjRkMjQ0LjMwNlI1ZDE5LjIxUjZkNTU3LjkzOFI3ZDAuODM1UjhkNTM4LjcyN1I5ZDBSMTBkMjgzLjk4UjExaTIzOFIxMmQxOS4yMVIxM2QyNjMuNTE3UjE0YWkxaTJpM2kzaTNpM2kyaTNpM2kyaTJpMmkyaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6MTI1b1IxZDc0MC4wMTlSMmFkMjIuOTY5ZDQ4OC4xOTVkLTMuMzRkNDg4LjE5NWQtNDguMDI2ZDUxMS41ODJkLTMwLjQ4NmQ1MDcuODIzZC0xMi4xMWQ1MDcuODIzZDI4LjM5OGQ1MDcuODIzZDY1Ljk4M2Q1MjYuMTk5ZDExMS45MjFkNTQ4Ljc1ZDExMS45MjFkNTg0LjY2NWQxMTEuOTIxZDYwOC44ODdkMTAxLjg5OGQ2NTYuMjg3ZDkxLjg3NmQ3MDMuNjg2ZDkxLjg3NmQ3MjcuOTA4ZDkxLjg3NmQ3NzYuNzY5ZDEwNy4zMjdkODAwLjU3NGQxMjQuNDVkODI2LjQ2NmQxNjkuOTdkODM4Ljk5NWQxMjMuNjE1ZDg1NC44NjRkMTA0LjYxM2Q4ODAuNTQ4ZDg1LjYxMWQ5MDYuMjMxZDg1LjYxMWQ5NTUuMDkyZDg1LjYxMWQ5NzYuODA5ZDk1Ljg0M2QxMDE5LjE5N2QxMDYuMDc1ZDEwNjEuNTg1ZDEwNi4wNzVkMTA4My4zMDFkMTA2LjA3NWQxMTI0LjIyOGQ1My44NzJkMTE1NC43MTRkOS42MDVkMTE4MC42MDZkLTM1LjkxNWQxMTgyLjI3N2QxMS4yNzVkMTE5NC44MDVkMzUuOTE1ZDExOTQuODA1ZDkyLjcxMWQxMTk0LjgwNWQxMzMuMjJkMTE2MS4zOTZkMTc2LjIzNGQxMTI1Ljg5OGQxNzYuMjM0ZDEwNzAuMzU1ZDE3Ni4yMzRkMTA0Ny4zODZkMTY2LjIxMmQxMDAyLjI4M2QxNTYuMTg5ZDk1Ny4xODFkMTU2LjE4OWQ5MzQuMjEyZDE1Ni4xODlkODk4LjI5NmQxNzguOTQ5ZDg3MC45NDJkMjAxLjcwOWQ4NDMuNTg4ZDIzNy4yMDdkODM3LjMyNGQyMDEuNzA5ZDgzMC42NDJkMTc4Ljk0OWQ4MDUuNTg1ZDE1Ni4xODlkNzgwLjUyOGQxNTYuMTg5ZDc0NS4wM2QxNTYuMTg5ZDcyMi44OTdkMTY2LjAwM2Q2NzkuNDY0ZDE3NS44MTdkNjM2LjAzMmQxNzUuODE3ZDYxMy44OThkMTc1LjgxN2Q1NTUuMDE0ZDEyNy4zNzNkNTE5LjUxN2Q4My45NDFkNDg4LjE5NWQyMi45NjlkNDg4LjE5NWhSM2QyODkuODI3UjRkMjM3LjIwN1I1ZC00OC4wMjZSNmQ1MzUuODA0UjdkLTE3MC44MDVSOGQ1ODMuODNSOWQwUjEwZDI4My45OFIxMWkxMjVSMTJkLTQ4LjAyNlIxM2QyODkuODI3UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM3b1IxZDc0MC4wMTlSMmFkMTkuMjFkMTAxMS44ODlkMzUuNDk3ZDk5Ny42OWQ3Ni44NDFkOTkyLjY3OGQ3OS4zNDdkOTkxLjg0M2Q5My41NDZkOTg1LjU3OWQ5My41NDZkOTU4LjAxNmQ5NS4yMTZkOTU3LjU5OGQ5Ni44ODdkOTU3LjU5OGQxMDEuMDYzZDk1Ny41OThkMTE5LjQzOGQ5NzQuMzAzZDEyMS4xMDlkOTcyLjIxNWQxMTcuNzY4ZDk2Mi42MWQxMDMuMTUxZDkzNS40NjRkOTQuNzk5ZDkyMC4wMTNkOTMuNTQ2ZDg5NC4xMmQxMjQuNDVkODgyLjAwOWQ5My41NDZkODU4LjIwNWQ5NC4zODFkNzk3LjY1ZDkyLjI5M2Q3NzMuODQ2ZDgxLjg1M2Q3NTkuNjQ3ZDY1LjE0OGQ3NTkuNjQ3ZDUwLjUzMWQ3NTkuNjQ3ZDM5LjI1NmQ3NzUuMDk5ZDczLjkxOGQ3MjQuOTg1ZDk4LjE0ZDcxMy43MDlkMTM2LjU2MWQ3MDEuNTk4ZDE3NC41NjRkNjg5LjkwNWQxNjguNzE3ZDc1OC4zOTRkMTY4LjcxN2Q4MDEuODI3ZDE2OC43MTdkODk4LjI5NmQxNzQuOTgyZDk4OC45MmQxOTMuNzc0ZDk5My4wOTZkMjMwLjk0MmQxMDA1LjIwN2QyMzMuMDNkMTAxMy4xNDFkMjEyLjU2N2QxMDE5LjgyM2QxODcuOTI4ZDEwMjEuMDc2ZDE3MC44MDVkMTAyMS45MTFkMTQxLjE1NGQxMDIwLjY1OWQxMDEuODk4ZDEwMTguOTg4ZDk0Ljc5OWQxMDE4Ljk4OGQ4OC45NTJkMTAxOC45ODhkNzcuNDY4ZDEwMjEuMDc2ZDY1Ljk4M2QxMDIzLjE2NGQ2MC4xMzdkMTAyMy4xNjRkNTIuNjE5ZDEwMjMuMTY0ZDM5LjY3M2QxMDE4LjE1M2QyNS4wNTdkMTAxMi43MjRkMTkuMjFkMTAxMS44ODlkNTguNDY2ZDYyNC43NTZkMTkzLjc3NGQ1MzcuMDU3ZDE5My43NzRkNTA0LjlkMTkzLjc3NGQ1MDIuODEyZDE3My4xMDJkNDg1LjA2M2QxNTIuNDNkNDY3LjMxNGQxNDkuNTA3ZDQ2Ny4zMTRkMTMwLjcxNGQ0NjcuMzE0ZDk3LjMwNWQ1MzUuODA0ZDkwLjIwNWQ1NTAuMDAzZDU4LjQ2NmQ2MjQuNzU2aFIzZDI1Mi4yNDFSNGQyMzMuMDNSNWQxOS4yMVI2ZDU1Ni42ODVSN2QwLjgzNVI4ZDUzNy40NzRSOWQwUjEwZDI4My45OFIxMWkyMzdSMTJkMTkuMjFSMTNkMjUyLjI0MVIxNGFpMWkyaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2hnOjEyNG9SMWQ3NDAuMDE5UjJhZDE0Mi44MjVkNTI2LjYxNmQxNjIuMDM1ZDUzOS4xNDVkMTgxLjY2M2Q1MzkuMTQ1ZDE5OS42MjFkNTM5LjE0NWQyMTIuOTg1ZDUyNi42MTZkMjEyLjk4NWQxMDI5LjAxMWQyMDIuOTYyZDEwNDEuOTU3ZDIxMi45ODVkMTA0OS44OTJkMTk0LjYxZDEwNzUuNzg0ZDIxMi45ODVkMTA3NS43ODRkMjEyLjk4NWQxMjIwLjY5OGQxOTQuMTkyZDEyMTEuOTI4ZDE3NS4zOTlkMTIxMS45MjhkMTU3LjAyNGQxMjExLjkyOGQxNDIuODI1ZDEyMjAuNjk4ZDE0Mi44MjVkNzg4LjA0NWQxNjAuNzgzZDgxMS4wMTRkMTQyLjgyNWQ3MzcuMDk2ZDE2Mi40NTNkNjg0LjA1OGQxNDIuODI1ZDY5OC42NzVkMTQyLjgyNWQ1MjYuNjE2aFIzZDMzMi4wMDZSNGQyMTIuOTg1UjVkMTQyLjgyNVI2ZDQ5Ny4zODNSN2QtMTk2LjY5OFI4ZDM1NC41NTdSOWQwUjEwZDI4My45OFIxMWkxMjRSMTJkMTQyLjgyNVIxM2QzMzIuMDA2UjE0YWkxaTNpM2kyaTJpMmkyaTJpMmkzaTNpMmkyaTJpMmkyaTJoZzoyMzZvUjFkNzQwLjAxOVIyYWQxOS4yMWQxMDExLjg4OWQzNS40OTdkOTk3LjY5ZDc2Ljg0MWQ5OTIuNjc4ZDc5LjM0N2Q5OTEuODQzZDkzLjU0NmQ5ODUuNTc5ZDkzLjU0NmQ5NTguMDE2ZDk1LjIxNmQ5NTcuNTk4ZDk2Ljg4N2Q5NTcuNTk4ZDEwMS4wNjNkOTU3LjU5OGQxMTkuNDM4ZDk3NC4zMDNkMTIxLjEwOWQ5NzIuMjE1ZDExNy43NjhkOTYyLjYxZDEwMy4xNTFkOTM1LjQ2NGQ5NC43OTlkOTIwLjAxM2Q5My41NDZkODk0LjEyZDEyNC40NWQ4ODIuMDA5ZDkzLjU0NmQ4NTguMjA1ZDk0LjM4MWQ3OTcuNjVkOTIuMjkzZDc3My44NDZkODEuODUzZDc1OS42NDdkNjUuMTQ4ZDc1OS42NDdkNTAuNTMxZDc1OS42NDdkMzkuMjU2ZDc3NS4wOTlkNzMuOTE4ZDcyNC45ODVkOTguMTRkNzEzLjcwOWQxMzYuNTYxZDcwMS41OThkMTc0LjU2NGQ2ODkuOTA1ZDE2OC43MTdkNzU4LjM5NGQxNjguNzE3ZDgwMS44MjdkMTY4LjcxN2Q4OTguMjk2ZDE3NC45ODJkOTg4LjkyZDE5My43NzRkOTkzLjA5NmQyMzAuOTQyZDEwMDUuMjA3ZDIzMy4wM2QxMDEzLjE0MWQyMTIuNTY3ZDEwMTkuODIzZDE4Ny45MjhkMTAyMS4wNzZkMTcwLjgwNWQxMDIxLjkxMWQxNDEuMTU0ZDEwMjAuNjU5ZDEwMS44OThkMTAxOC45ODhkOTQuNzk5ZDEwMTguOTg4ZDg4Ljk1MmQxMDE4Ljk4OGQ3Ny40NjhkMTAyMS4wNzZkNjUuOTgzZDEwMjMuMTY0ZDYwLjEzN2QxMDIzLjE2NGQ1Mi42MTlkMTAyMy4xNjRkMzkuNjczZDEwMTguMTUzZDI1LjA1N2QxMDEyLjcyNGQxOS4yMWQxMDExLjg4OWQxODIuMDgxZDYyOS4zNWQ0Ni43NzNkNTQxLjY1ZDQ2Ljc3M2Q1MDkuNDk0ZDQ2Ljc3M2Q1MDcuODIzZDY3LjY1NGQ0ODkuODY2ZDg4LjUzNWQ0NzEuOTA4ZDkxLjA0ZDQ3MS45MDhkMTA5LjQxNWQ0NzEuOTA4ZDE0My4yNDNkNTQwLjM5OGQxNDcuNDE5ZDU0OC43NWQxODIuMDgxZDYyOS4zNWhSM2QyNTIuMjQxUjRkMjMzLjAzUjVkMTkuMjFSNmQ1NTIuMDkxUjdkMC44MzVSOGQ1MzIuODhSOWQwUjEwZDI4My45OFIxMWkyMzZSMTJkMTkuMjFSMTNkMjUyLjI0MVIxNGFpMWkyaTNpM2kzaTNpMmkzaTNpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2hnOjEyM29SMWQ3NDAuMDE5UjJhZDI2Ny4yNzVkNDg5LjQ0OGQyOTMuNTg1ZDQ4OS40NDhkMzM4LjY4OGQ1MTIuODM1ZDMyMC43M2Q1MDkuMDc2ZDMwMi43NzNkNTA5LjA3NmQyNjIuNjgxZDUwOS4wNzZkMjI0LjY3OGQ1MjcuNDUxZDE3OC4zMjNkNTUwLjAwM2QxNzguMzIzZDU4NS41ZDE3OC4zMjNkNjA5LjcyMmQxODguNTU0ZDY1Ny4zMzFkMTk4Ljc4NmQ3MDQuOTM5ZDE5OC43ODZkNzI5LjE2MWQxOTguNzg2ZDc3Ny42MDVkMTgyLjkxNmQ4MDEuODI3ZDE2NS4zNzZkODI3LjcxOWQxMjAuMjc0ZDg0MC42NjVkMTY3LjA0N2Q4NTYuMTE3ZDE4NS44NGQ4ODEuNTkyZDIwNC42MzJkOTA3LjA2NmQyMDQuNjMyZDk1NS45MjhkMjA0LjYzMmQ5NzcuNjQ0ZDE5NC42MWQxMDIwLjI0MWQxODQuNTg3ZDEwNjIuODM4ZDE4NC41ODdkMTA4NC41NTRkMTg0LjU4N2QxMTI1Ljg5OGQyMzYuMzcxZDExNTUuOTY3ZDI4MC42MzlkMTE4MS44NTlkMzI2LjE1OWQxMTgzLjExMmQyNzkuMzg2ZDExOTYuMDU4ZDI1NC4zMjlkMTE5Ni4wNThkMTk4Ljc4NmQxMTk2LjA1OGQxNTcuODU5ZDExNjIuMjMxZDExNC4wMDlkMTEyNi43MzRkMTE0LjAwOWQxMDcyLjAyNmQxMTQuMDA5ZDEwNDkuMDU3ZDEyNC4wMzJkMTAwMy43NDVkMTM0LjA1NWQ5NTguNDMzZDEzNC4wNTVkOTM1LjQ2NGQxMzQuMDU1ZDg5OS4xMzJkMTExLjUwNGQ4NzEuNzc4ZDg4Ljk1MmQ4NDQuNDI0ZDUzLjQ1NWQ4MzguNTc3ZDg5LjM3ZDgzMS44OTVkMTExLjcxMmQ4MDYuODM4ZDEzNC4wNTVkNzgxLjc4MWQxMzQuMDU1ZDc0NS44NjZkMTM0LjA1NWQ3MjMuNzMyZDEyNC4yNDFkNjgwLjNkMTE0LjQyN2Q2MzYuODY3ZDExNC40MjdkNjE0LjczNGQxMTQuNDI3ZDU1NS40MzJkMTYyLjg3MWQ1MjAuNzY5ZDIwNS44ODVkNDg5LjQ0OGQyNjcuMjc1ZDQ4OS40NDhoUjNkMzAxLjEwMlI0ZDMzOC42ODhSNWQ1My40NTVSNmQ1MzQuNTUxUjdkLTE3Mi4wNThSOGQ0ODEuMDk2UjlkMFIxMGQyODMuOThSMTFpMTIzUjEyZDUzLjQ1NVIxM2QzMDEuMTAyUjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM1b1IxZDc0MC4wMTlSMmFkMjQuMjIxZDgyNS4yMTNkNjAuMTM3ZDcwNS43NzRkMTY3Ljg4MmQ3MDUuNzc0ZDMxMS4xMjVkNzA1Ljc3NGQzMTYuMTM3ZDgzOC45OTVkMjgxLjA1N2Q4NDguMTgyZDkyLjI5M2Q4NzQuMDc1ZDkwLjYyM2Q4ODkuOTQ0ZDkwLjYyM2Q5MDQuMTQzZDkyLjcxMWQ5MTQuNTg0ZDEwMi43MzRkOTE4Ljc2ZDEyMS45NDRkOTQ4LjgyOGQ4OC45NTJkOTcwLjEyN2QxNDcuODM2ZDk1MC45MTZkMTI1LjI4NWQ5NzQuNzIxZDEwOC45OThkOTgxLjgyZDEyNS4yODVkOTc5LjczMmQxMzguMjMxZDk2Mi4xOTJkMTUxLjE3N2Q5NjIuMTkyZDE1OS4xMTJkOTYyLjE5MmQxNzQuOTgyZDk2OC44NzRkMTkwLjg1MWQ5NzUuNTU2ZDE5OC43ODZkOTc1LjU1NmQyMzUuOTU0ZDk3NS41NTZkMjYwLjU5M2Q5NjMuODYyZDI3NC4zNzVkOTU2Ljc2M2QzMTguNjQyZDkzMy43OTRkMzIxLjU2NmQ5MzQuNjI5ZDI2NC43NjlkMTAzMC4yNjRkMTc3LjQ4N2QxMDMwLjI2NGQxMTAuMjUxZDEwMzAuMjY0ZDY1Ljk4M2Q5OTAuNTlkMTkuNjI4ZDk0OS42NjNkMTkuMjFkODgzLjI2MmQyMi45NjlkODc5LjkyMWQ0OC40NDNkODg4LjY5MWQ1MC45NDlkODg0LjkzM2Q0MC45MjZkODY1LjMwNWQyNC4yMjFkODI1LjIxM2QyNTEuNDA2ZDgyMS4wMzdkMjUwLjk4OGQ3ODMuMDM0ZDIyNi41NTdkNzU4LjYwM2QyMDIuMTI3ZDczNC4xNzJkMTY0LjEyM2Q3MzQuMTcyZDEwMi4zMTZkNzM0LjE3MmQ5NC4zODFkODUwLjI3ZDE5MS42ODZkODMzLjE0OGQxOTQuMTkyZDgyOC45NzJkMTkzLjM1N2Q4MjEuNDU1ZDE5My43NzRkODIxLjAzN2QyMDIuOTYyZDgyOC4xMzdkMjIxLjMzN2Q4NDAuNjY1ZDIyNS41MTNkODM3LjMyNGQyMjMuODQzZDgzMi43M2QyMjIuMTcyZDgyNi44ODRkMjIyLjU5ZDgyNi4wNDhkMjI0LjY3OGQ4MjcuNzE5ZDI1MS40MDZkODIxLjAzN2QxMTEuNTA0ZDUxNC4wODhkMTU5LjExMmQ1MTQuMDg4ZDE1OS4xMTJkNTU1LjAxNGQxNTkuMTEyZDU5NC4yN2QxMzMuMjJkNTk0LjI3ZDk4Ljk3NWQ1OTQuMjdkODkuMzdkNTkxLjM0N2Q2Ny42NTRkNTg0LjY2NWQ2Ny42NTRkNTU4Ljc3M2Q2Ny42NTRkNTQxLjIzM2Q4MC44MDlkNTI3LjY2ZDkzLjk2NGQ1MTQuMDg4ZDExMS41MDRkNTE0LjA4OGQyNDEuOGQ1MTAuMzI5ZDI4OS40MDlkNTEwLjMyOWQyODkuNDA5ZDU1MS4yNTZkMjg5LjQwOWQ1ODkuMjU5ZDI2Ni44NThkNTg5LjI1OWQyNjIuNjgxZDU4OS4yNTlkMjU0Ljk1NWQ1ODcuNTg4ZDI0Ny4yM2Q1ODUuOTE4ZDI0My40NzFkNTg1LjkxOGQyMTcuNTc5ZDU4NS41ZDIxMC44OTdkNTgyLjU3N2QxOTcuOTUxZDU3Ni43M2QxOTcuOTUxZDU1NS4wMTRkMTk3Ljk1MWQ1MzcuMDU3ZDIxMC44OTdkNTIzLjY5M2QyMjMuODQzZDUxMC4zMjlkMjQxLjhkNTEwLjMyOWhSM2QzNDAuNzc2UjRkMzIxLjU2NlI1ZDE5LjIxUjZkNTEzLjY3UjdkLTYuMjY0UjhkNDk0LjQ2UjlkMFIxMGQyODMuOThSMTFpMjM1UjEyZDE5LjIxUjEzZDM0MC43NzZSMTRhaTFpM2kzaTNpM2kyaTNpMmkyaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTFpM2kzaTNpMmkyaTJpMmkzaTJpM2kyaTJpMmkxaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTIyb1IxZDc0MC4wMTlSMmFkMjgwLjIyMWQxMDIzLjE2NGQxMy4zNjNkMTAyMC4yNDFkNy45MzRkMTAyMy4xNjRkMTkuMjFkMTAwMS44NjZkNDAuNTA4ZDk3NS41NTZkNzEuODNkOTc3LjIyNmQ0OC40NDNkOTYwLjkzOWQxMTEuOTIxZDg4Ny4wMjFkMTgzLjMzNGQ4NjQuMDUyZDEyMS4xMDlkODY3LjM5M2QxODEuNjYzZDc5OC45MDNkMjA3Ljk3M2Q3NTguODEyZDE2OS4xMzVkNzU0LjIxOGQxNjAuMzY1ZDc1NC4yMThkMTAyLjMxNmQ3NTQuMjE4ZDgxLjAxN2Q3NjQuMjQxZDU1LjEyNWQ3NzYuMzUyZDIyLjU1MWQ4MjYuMDQ4ZDI1Ljg5MmQ3NjIuNTdkNDkuMDdkNzMyLjI5M2Q3Mi4yNDdkNzAyLjAxNmQxMzIuMzg0ZDY4MS41NTNkMTMyLjM4NGQ2NzYuOTU5ZDEyOS40NjFkNjc2Ljk1OWQxMjIuMzYyZDY3Ni45NTlkNzUuMTcxZDc0MC44NTRkOTIuNzExZDcyMC44MDlkMTk4Ljc4NmQ3MTkuMTM4ZDIxNi43NDNkNzE4LjcyMWQyNjYuNDRkNzE5LjEzOGQzMzQuNTEyZDcxOS41NTZkMzI5LjVkNzI0LjE1ZDMxMy4yMTNkNzI4LjUzNWQyOTYuOTI2ZDczMi45MmQyOTEuOTE1ZDczNy41MTNkMzExLjU0M2Q3MzYuNjc4ZDMzMS4xNzFkNzM3LjUxM2QyNjEuMDExZDgxNi40NDNkMjQyLjIxOGQ4MzcuNzQyZDIwNS4wNWQ4OTMuMjg1ZDE3MC44MDVkOTQ0LjY1MmQxNDcuMDAxZDk2OC44NzRkMTQ1Ljc0OGQ5NjguNDU2ZDEyOS4wNDRkOTQ3LjU3NWQxMjUuNzAzZDk5MS44NDNkMTM3LjM5NmQ5NzguODk3ZDE0NS43NDhkOTc4Ljg5N2QxNTUuNzcxZDk3OC44OTdkMTc1LjE5ZDk4Mi4yMzhkMTk0LjYxZDk4NS41NzlkMjA0LjYzMmQ5ODUuNTc5ZDIyOC4wMTlkOTg1LjU3OWQyNTUuMTY0ZDk3NS45NzNkMjg5LjgyN2Q5NjMuODYyZDI4OS44MjdkOTQ0LjIzNGQyODkuODI3ZDkyOS42MThkMjYzLjkzNGQ5MTUuMDAxZDMwMi4zNTVkOTIwLjAxM2QzMTMuMjEzZDkyNC42MDZkMzM5LjEwNmQ5MzUuNDY0ZDMzOS4xMDZkOTYyLjYxZDMzOS4xMDZkOTgwLjk4NWQzMTguNjQyZDEwMDIuMDc1ZDI5OC4xNzlkMTAyMy4xNjRkMjgwLjIyMWQxMDIzLjE2NGhSM2QzNTYuMjI4UjRkMzM5LjEwNlI1ZDcuOTM0UjZkMzQ3LjA0UjdkMC44MzVSOGQzMzkuMTA2UjlkMFIxMGQyODMuOThSMTFpMTIyUjEyZDcuOTM0UjEzZDM1Ni4yMjhSMTRhaTFpM2kzaTJpMmkyaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkyaTNpM2kyaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM0b1IxZDc0MC4wMTlSMmFkMjQuMjIxZDgyNS4yMTNkNjAuMTM3ZDcwNS43NzRkMTY3Ljg4MmQ3MDUuNzc0ZDMxMS4xMjVkNzA1Ljc3NGQzMTYuMTM3ZDgzOC45OTVkMjgxLjA1N2Q4NDguMTgyZDkyLjI5M2Q4NzQuMDc1ZDkwLjYyM2Q4ODkuOTQ0ZDkwLjYyM2Q5MDQuMTQzZDkyLjcxMWQ5MTQuNTg0ZDEwMi43MzRkOTE4Ljc2ZDEyMS45NDRkOTQ4LjgyOGQ4OC45NTJkOTcwLjEyN2QxNDcuODM2ZDk1MC45MTZkMTI1LjI4NWQ5NzQuNzIxZDEwOC45OThkOTgxLjgyZDEyNS4yODVkOTc5LjczMmQxMzguMjMxZDk2Mi4xOTJkMTUxLjE3N2Q5NjIuMTkyZDE1OS4xMTJkOTYyLjE5MmQxNzQuOTgyZDk2OC44NzRkMTkwLjg1MWQ5NzUuNTU2ZDE5OC43ODZkOTc1LjU1NmQyMzUuOTU0ZDk3NS41NTZkMjYwLjU5M2Q5NjMuODYyZDI3NC4zNzVkOTU2Ljc2M2QzMTguNjQyZDkzMy43OTRkMzIxLjU2NmQ5MzQuNjI5ZDI2NC43NjlkMTAzMC4yNjRkMTc3LjQ4N2QxMDMwLjI2NGQxMTAuMjUxZDEwMzAuMjY0ZDY1Ljk4M2Q5OTAuNTlkMTkuNjI4ZDk0OS42NjNkMTkuMjFkODgzLjI2MmQyMi45NjlkODc5LjkyMWQ0OC40NDNkODg4LjY5MWQ1MC45NDlkODg0LjkzM2Q0MC45MjZkODY1LjMwNWQyNC4yMjFkODI1LjIxM2QyNTEuNDA2ZDgyMS4wMzdkMjUwLjk4OGQ3ODMuMDM0ZDIyNi41NTdkNzU4LjYwM2QyMDIuMTI3ZDczNC4xNzJkMTY0LjEyM2Q3MzQuMTcyZDEwMi4zMTZkNzM0LjE3MmQ5NC4zODFkODUwLjI3ZDE5MS42ODZkODMzLjE0OGQxOTQuMTkyZDgyOC45NzJkMTkzLjM1N2Q4MjEuNDU1ZDE5My43NzRkODIxLjAzN2QyMDIuOTYyZDgyOC4xMzdkMjIxLjMzN2Q4NDAuNjY1ZDIyNS41MTNkODM3LjMyNGQyMjMuODQzZDgzMi43M2QyMjIuMTcyZDgyNi44ODRkMjIyLjU5ZDgyNi4wNDhkMjI0LjY3OGQ4MjcuNzE5ZDI1MS40MDZkODIxLjAzN2Q2My4wNmQ2MTYuODIyZDcwLjE1OWQ2MTAuNTU3ZDExOS44NTZkNTYwLjg2MWQxMjguNjI2ZDU1OS4xOWQxNDMuMjQzZDU1Mi45MjZkMTQwLjczN2Q1NDkuNTg1ZDEzNi41NjFkNTQyLjkwM2QxNDkuMDg5ZDUzNi4yMjFkMTQ5LjkyNGQ1MjUuMzYzZDE2Mi4wMzVkNTAyLjM5NGQxNzYuNjUyZDQ3NC44MzFkMTc4Ljc0ZDQ2Ni4wNjFkMTgzLjMzNGQ0NjYuMDYxZDIyMC45MmQ1NjAuMDI2ZDI4OC4xNTZkNjE2LjgyMmQyNDguNDgyZDYxNi44MjJkMjQ0LjcyNGQ2MTYuODIyZDIzMS4zNmQ2MDkuMzA1ZDIxNy45OTZkNjAxLjc4N2QyMTcuMTYxZDU5OC44NjRkMjE5LjY2N2Q1OTQuMjdkMjIzLjQyNWQ1ODQuMjQ3ZDIyMy4wMDhkNTgyLjU3N2QyMTYuMzI2ZDU4NC42NjVkMjEyLjE1ZDU4NC4yNDdkMjA3LjEzOGQ1ODMuODNkMjA2LjMwM2Q1NzEuNzE5ZDIwMy4zOGQ1NTYuMjY3ZDIwMS4yOTJkNTY0LjIwMmQxOTcuOTUxZDU3MC44ODRkMTk0LjYxZDU2NS44NzJkMTc5Ljk5M2Q1MzkuNTYyZDE1NC41MThkNTgwLjQ4OWQxMDEuMDYzZDYxNi44MjJkNjMuMDZkNjE2LjgyMmhSM2QzNDAuNzc2UjRkMzIxLjU2NlI1ZDE5LjIxUjZkNTU3LjkzOFI3ZC02LjI2NFI4ZDUzOC43MjdSOWQwUjEwZDI4My45OFIxMWkyMzRSMTJkMTkuMjFSMTNkMzQwLjc3NlIxNGFpMWkzaTNpM2kzaTJpM2kyaTJpM2kyaTNpM2kzaTNpM2kyaTNpM2kzaTJpMmkyaTNpMWkzaTNpM2kyaTJpMmkyaTNpMmkzaTJpMmkyaTFpM2kzaTNpMmkzaTNpMmkzaTJpM2kzaTNpMmkzaTJpM2kzaTNpM2kyaGc6MTIxb1IxZDc0MC4wMTlSMmFkNi42ODFkNzQwLjg1NGQtNS40MjlkNzIyLjQ3OWQyNS4wNTdkNzE3Ljg4NWQxMTcuMzVkNzE3Ljg4NWQxNDcuMDAxZDcyNC45ODVkMTI4LjYyNmQ3NDQuMTk1ZDExOC4xODVkNzQ1Ljg2NmQxMDguNThkNzU1Ljg4OWQxMTYuOTMzZDc2OGQxMzIuODAyZDc5OC40ODZkMTE3LjM1ZDgwMC41NzRkMTAzLjU2OWQ4MDYuNDJkMTE4LjYwM2Q4MTEuNDMyZDEzNi41NjFkODIxLjQ1NWQxNjkuOTdkODk0LjUzOGQxOTUuNDQ1ZDk0NS40ODdkMjEzLjQwMmQ4ODAuMzM5ZDIxOS42NjdkODc3LjQxNWQyMjkuNjlkODkyLjAzMmQyMzEuNzc4ZDg5MC4zNjJkMjMyLjYxM2Q4NjYuMTRkMjU1LjM3M2Q4MTIuNDc2ZDI3OC4xMzNkNzU4LjgxMmQyNzguMTMzZDc0MS42OWQyNzUuNjI4ZDcyOS4xNjFkMjYxLjg0NmQ3MjIuODk3ZDIzNS41MzZkNzE3Ljg4NWQyMjUuMDk2ZDcwNC4xMDRkMjU2LjQxN2Q2OTIuODI4ZDI4Ni40ODZkNjkyLjgyOGQyOTkuMDE0ZDY5Mi44MjhkMzI0LjA3MWQ2OTMuMjQ2ZDM0OS4xMjhkNjkzLjY2M2QzNjEuNjU3ZDY5My4yNDZkMzc2LjY5MWQ3MDQuMTA0ZDM3Mi45MzNkNzE0LjU0NGQzNTIuMDUyZDcyNC45ODVkMjg4LjE1NmQ4NTguMjA1ZDIyNi4zNDlkOTg3LjY2N2QyMjUuNTEzZDEwMDguNTQ4ZDIyNS4wOTZkMTAxOS44MjNkMjIzLjAwOGQxMDIxLjQ5NGQyMjIuMTcyZDEwMjEuNDk0ZDIxOC4yMDVkMTAxNy41MjZkMjE0LjIzOGQxMDEzLjU1OWQyMTMuNDAyZDEwMTMuNTU5ZDIxMi41NjdkMTAxNC44MTJkMjEyLjE1ZDEwMTYuNDgyZDIwOC44MDlkMTAzMS45MzRkMjA1LjQ2OGQxMDU1LjczOGQxOTQuMTkyZDEwNjcuMDE0ZDE4OS41OThkMTA3Mi44NjFkMTgwLjgyOGQxMDg0LjEzN2QxNzkuOTkzZDEwOTIuNDg5ZDE4NC4xNjlkMTEwNi4yN2QxODQuMTY5ZDExNjIuMjMxZDExOS4wMjFkMTIwNy4zMzRkNTcuNjMxZDEyNDkuOTMxZC01LjQyOWQxMjQ5LjkzMWQtNzYuODQxZDEyNDkuOTMxZC0xMTcuMzVkMTIwNy43NTJkLTEyMC4yNzRkMTE4MC42MDZkLTEyMC4yNzRkMTE0My44NTZkLTY4LjkwN2QxMTA0LjZkLTMxLjMyMWQxMDc1Ljc4NGQxMi4xMWQxMDU5LjA3OWQtNTYuMzc4ZDExMTMuMzdkLTU2LjM3OGQxMTc1LjU5NWQtNTYuMzc4ZDExOTEuMDQ3ZC0zMS4zMjFkMTIwMy41NzVkLTkuNjA1ZDEyMTQuNDMzZDcuMDk5ZDEyMTQuNDMzZDE2LjI4N2QxMjE0LjQzM2QzNC4wMzVkMTIwOC41ODdkNTEuNzg0ZDEyMDIuNzRkNjAuOTcyZDEyMDIuNzRkNjMuNDc3ZDEyMDEuOTA1ZDcyLjI0N2QxMjAwLjIzNGQ3NC4zMzZkMTE5OS44MTdkNzAuOTk1ZDExOTQuMzg4ZDY4LjA3MWQxMTg5LjM3NmQ2OC4wNzFkMTE4Ni40NTNkODUuMTk0ZDExNzYuMDEzZDEwOC45OThkMTE2MS44MTRkMTI2Ljk1NWQxMTAzLjc2NWQxMzEuNTQ5ZDEwODguNzNkMTUxLjE3N2QxMDE3LjMxOGQxMzIuODAyZDk3My4wNWQxMDguNThkOTM0LjYyOWQxMjYuNTM4ZDkyOS42MThkMTA3LjMyN2Q5MjAuNDNkNjcuMjM2ZDgzNC40MDFkMjcuMTQ1ZDc0OS42MjRkNi42ODFkNzQwLjg1NGhSM2QzNzIuNTE1UjRkMzc2LjY5MVI1ZC0xMjAuMjc0UjZkMzMxLjE3MVI3ZC0yMjUuOTMxUjhkNDUxLjQ0NVI5ZDBSMTBkMjgzLjk4UjExaTEyMVIxMmQtMTIwLjI3NFIxM2QzNzIuNTE1UjE0YWkxaTJpMmkzaTJpM2kzaTNpM2kzaTNpMmkyaTNpM2kyaTNpMmkzaTNpM2kyaTJpM2kzaTJpMmkzaTNpM2kyaTJpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNoZzoyMzNvUjFkNzQwLjAxOVIyYWQyNC4yMjFkODI1LjIxM2Q2MC4xMzdkNzA1Ljc3NGQxNjcuODgyZDcwNS43NzRkMzExLjEyNWQ3MDUuNzc0ZDMxNi4xMzdkODM4Ljk5NWQyODEuMDU3ZDg0OC4xODJkOTIuMjkzZDg3NC4wNzVkOTAuNjIzZDg4OS45NDRkOTAuNjIzZDkwNC4xNDNkOTIuNzExZDkxNC41ODRkMTAyLjczNGQ5MTguNzZkMTIxLjk0NGQ5NDguODI4ZDg4Ljk1MmQ5NzAuMTI3ZDE0Ny44MzZkOTUwLjkxNmQxMjUuMjg1ZDk3NC43MjFkMTA4Ljk5OGQ5ODEuODJkMTI1LjI4NWQ5NzkuNzMyZDEzOC4yMzFkOTYyLjE5MmQxNTEuMTc3ZDk2Mi4xOTJkMTU5LjExMmQ5NjIuMTkyZDE3NC45ODJkOTY4Ljg3NGQxOTAuODUxZDk3NS41NTZkMTk4Ljc4NmQ5NzUuNTU2ZDIzNS45NTRkOTc1LjU1NmQyNjAuNTkzZDk2My44NjJkMjc0LjM3NWQ5NTYuNzYzZDMxOC42NDJkOTMzLjc5NGQzMjEuNTY2ZDkzNC42MjlkMjY0Ljc2OWQxMDMwLjI2NGQxNzcuNDg3ZDEwMzAuMjY0ZDExMC4yNTFkMTAzMC4yNjRkNjUuOTgzZDk5MC41OWQxOS42MjhkOTQ5LjY2M2QxOS4yMWQ4ODMuMjYyZDIyLjk2OWQ4NzkuOTIxZDQ4LjQ0M2Q4ODguNjkxZDUwLjk0OWQ4ODQuOTMzZDQwLjkyNmQ4NjUuMzA1ZDI0LjIyMWQ4MjUuMjEzZDI1MS40MDZkODIxLjAzN2QyNTAuOTg4ZDc4My4wMzRkMjI2LjU1N2Q3NTguNjAzZDIwMi4xMjdkNzM0LjE3MmQxNjQuMTIzZDczNC4xNzJkMTAyLjMxNmQ3MzQuMTcyZDk0LjM4MWQ4NTAuMjdkMTkxLjY4NmQ4MzMuMTQ4ZDE5NC4xOTJkODI4Ljk3MmQxOTMuMzU3ZDgyMS40NTVkMTkzLjc3NGQ4MjEuMDM3ZDIwMi45NjJkODI4LjEzN2QyMjEuMzM3ZDg0MC42NjVkMjI1LjUxM2Q4MzcuMzI0ZDIyMy44NDNkODMyLjczZDIyMi4xNzJkODI2Ljg4NGQyMjIuNTlkODI2LjA0OGQyMjQuNjc4ZDgyNy43MTlkMjUxLjQwNmQ4MjEuMDM3ZDEwMi43MzRkNjI0Ljc1NmQyMzguMDQyZDUzNy4wNTdkMjM4LjA0MmQ1MDQuOWQyMzguMDQyZDUwMi44MTJkMjE3LjM3ZDQ4NS4wNjNkMTk2LjY5OGQ0NjcuMzE0ZDE5My43NzRkNDY3LjMxNGQxNzQuOTgyZDQ2Ny4zMTRkMTQxLjU3MmQ1MzUuODA0ZDEzNC40NzNkNTUwLjAwM2QxMDIuNzM0ZDYyNC43NTZoUjNkMzQwLjc3NlI0ZDMyMS41NjZSNWQxOS4yMVI2ZDU1Ni42ODVSN2QtNi4yNjRSOGQ1MzcuNDc0UjlkMFIxMGQyODMuOThSMTFpMjMzUjEyZDE5LjIxUjEzZDM0MC43NzZSMTRhaTFpM2kzaTNpM2kyaTNpMmkyaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kyaTJpMmkzaTFpM2kzaTNpMmkyaTJpMmkzaTJpM2kyaTJpMmkxaTNpM2kzaTNpM2hnOjEyMG9SMWQ3NDAuMDE5UjJhZC0xMi4xMWQxMDM4LjYxNmQyNy41NjJkMTAyNS4yNTJkNzkuMzQ3ZDk2NC42OThkOTEuNDU4ZDk1MC40OTlkMTUxLjE3N2Q4NzguNjY4ZDkzLjU0NmQ4MjEuODcyZDEwMi4zMTZkODIxLjQ1NWQxMTkuODU2ZDgyMC4yMDJkMTIzLjYxNWQ4MTguOTQ5ZDEyMy4xOTdkODE4LjExNGQ3Mi42NjVkNzk4LjA2OGQ1NS41NDNkNzY3LjU4MmQ3LjkzNGQ3MzMuMzM3ZDMxLjczOGQ3MjAuMzkxZDY2LjQwMWQ3MTkuOTczZDgxLjg1M2Q3MTkuOTczZDEyNy43OTFkNzE5LjEzOGQxNTguNjk0ZDcxOC4zMDNkMTcwLjgwNWQ3MjguMzI2ZDE2Ny44ODJkNzQxLjI3MmQxNDQuNDk1ZDc0OC43ODlkMTMxLjU0OWQ3NTYuNzI0ZDE1My4yNjVkNzY0LjY1OWQyMDMuMzhkODIxLjQ1NWQyODMuOThkNzM2LjI2MWQyODMuMTQ1ZDcyMi4wNjFkMjcxLjg2OWQ3MTcuODg1ZDI1OC41MDVkNzE1Ljc5N2QyNTYuODM1ZDcwNS43NzRkMjU2LjgzNWQ2OTUuNzUyZDI4My4xNDVkNjk4LjI1N2QyODYuOTAzZDY5Ny44NGQzNTAuNzk5ZDY5MS4xNThkMzQyLjQ0NmQ2OTYuMTY5ZDMzMy4yNTlkNzA3LjAyN2QzNDIuNDQ2ZDcwOS4xMTVkMzY5LjU5MmQ2OTQuOTE2ZDM3Ny41MjZkNjk0LjkxNmQzODQuMjA4ZDY5Ni4xNjlkMzg0LjIwOGQ3MDEuNTk4ZDM4Mi4xMmQ3MTQuOTYyZDMyOS4wODNkNzM5LjE4NGQyOTQuODM4ZDc2OC44MzVkMjcwLjYxNmQ3ODkuNzE2ZDIyNS41MTNkODQ0LjQyNGQyMzYuNzg5ZDg2MS45NjRkMjk0LjQyZDkyNy45NDdkMjc3LjcxNmQ5MzUuNDY0ZDI2Mi42ODFkOTQ0LjY1MmQyODQuMzk4ZDk0Mi4xNDZkMzA4LjYxOWQ5NDIuMTQ2ZDMzNi42ZDk3MC4xMjdkMzc0LjE4NWQxMDAzLjUzNmQzNzAuMDA5ZDEwMTIuNzI0ZDM2Mi40OTJkMTAxOS44MjNkMzU3LjA2M2QxMDE5LjgyM2QzMzMuMjU5ZDEwMTkuODIzZDI4Ni4wNjhkMTAyNGQyMzguODc3ZDEwMjguMTc2ZDIxNS4wNzNkMTAyOC4xNzZkMjA1LjQ2OGQxMDI2LjUwNWQyMTUuMDczZDEwMjEuNDk0ZDIzNS4xMTlkMTAxNi40ODJkMjA3LjU1NmQxMDExLjQ3MWQyMzQuNzAxZDk5OS4zNmQyMzkuNzEyZDk4NS45OTZkMjE2Ljc0M2Q5NTAuOTE2ZDIyMC41MDJkOTQ3LjE1OGQyMjguODU0ZDk0MC40NzZkMjI1LjA5NmQ5MjkuNjE4ZDIwMy4zOGQ5MzIuOTU5ZDE5OS42MjFkOTIxLjY4M2QxODAuODI4ZDkwMy4zMDhkODkuMzdkOTg3LjI0OWQ4OS4zN2QxMDEyLjMwNmQ4OS4zN2QxMDI1LjI1MmQxMTguNjAzZDEwMzQuMDIyZDExOS4wMjFkMTAzOS40NTFkMTE2LjUxNWQxMDUxLjE0NWQ4OC4xMTdkMTAzOC4xOTlkNjUuMTQ4ZDEwMzEuOTM0ZDYwLjk3MmQxMDM0LjQ0ZDY0LjMxM2QxMDQxLjUzOWQ3MS40MTJkMTA0OC42MzlkMzguODM4ZDEwNDguNjM5ZC0xOS42MjhkMTA1MS41NjJkLTEyLjExZDEwMzguNjE2aFIzZDM4MC4wMzJSNGQzODQuMjA4UjVkLTE5LjYyOFI2ZDMzMi44NDFSN2QtMjcuNTYyUjhkMzUyLjQ2OVI5ZDBSMTBkMjgzLjk4UjExaTEyMFIxMmQtMTkuNjI4UjEzZDM4MC4wMzJSMTRhaTFpM2kzaTJpM2kyaTJpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTJpM2kyaTJpMmkzaTNpM2kzaTNpM2kzaTJpM2kzaTJpM2kyaTNpMmkzaTJpMmkzaTNpM2kyaTJpM2kyaTNpM2kyaGc6MjMyb1IxZDc0MC4wMTlSMmFkMjQuMjIxZDgyNS4yMTNkNjAuMTM3ZDcwNS43NzRkMTY3Ljg4MmQ3MDUuNzc0ZDMxMS4xMjVkNzA1Ljc3NGQzMTYuMTM3ZDgzOC45OTVkMjgxLjA1N2Q4NDguMTgyZDkyLjI5M2Q4NzQuMDc1ZDkwLjYyM2Q4ODkuOTQ0ZDkwLjYyM2Q5MDQuMTQzZDkyLjcxMWQ5MTQuNTg0ZDEwMi43MzRkOTE4Ljc2ZDEyMS45NDRkOTQ4LjgyOGQ4OC45NTJkOTcwLjEyN2QxNDcuODM2ZDk1MC45MTZkMTI1LjI4NWQ5NzQuNzIxZDEwOC45OThkOTgxLjgyZDEyNS4yODVkOTc5LjczMmQxMzguMjMxZDk2Mi4xOTJkMTUxLjE3N2Q5NjIuMTkyZDE1OS4xMTJkOTYyLjE5MmQxNzQuOTgyZDk2OC44NzRkMTkwLjg1MWQ5NzUuNTU2ZDE5OC43ODZkOTc1LjU1NmQyMzUuOTU0ZDk3NS41NTZkMjYwLjU5M2Q5NjMuODYyZDI3NC4zNzVkOTU2Ljc2M2QzMTguNjQyZDkzMy43OTRkMzIxLjU2NmQ5MzQuNjI5ZDI2NC43NjlkMTAzMC4yNjRkMTc3LjQ4N2QxMDMwLjI2NGQxMTAuMjUxZDEwMzAuMjY0ZDY1Ljk4M2Q5OTAuNTlkMTkuNjI4ZDk0OS42NjNkMTkuMjFkODgzLjI2MmQyMi45NjlkODc5LjkyMWQ0OC40NDNkODg4LjY5MWQ1MC45NDlkODg0LjkzM2Q0MC45MjZkODY1LjMwNWQyNC4yMjFkODI1LjIxM2QyNTEuNDA2ZDgyMS4wMzdkMjUwLjk4OGQ3ODMuMDM0ZDIyNi41NTdkNzU4LjYwM2QyMDIuMTI3ZDczNC4xNzJkMTY0LjEyM2Q3MzQuMTcyZDEwMi4zMTZkNzM0LjE3MmQ5NC4zODFkODUwLjI3ZDE5MS42ODZkODMzLjE0OGQxOTQuMTkyZDgyOC45NzJkMTkzLjM1N2Q4MjEuNDU1ZDE5My43NzRkODIxLjAzN2QyMDIuOTYyZDgyOC4xMzdkMjIxLjMzN2Q4NDAuNjY1ZDIyNS41MTNkODM3LjMyNGQyMjMuODQzZDgzMi43M2QyMjIuMTcyZDgyNi44ODRkMjIyLjU5ZDgyNi4wNDhkMjI0LjY3OGQ4MjcuNzE5ZDI1MS40MDZkODIxLjAzN2QyMzguMDQyZDYyOS4zNWQxMDIuNzM0ZDU0MS42NWQxMDIuNzM0ZDUwOS40OTRkMTAyLjczNGQ1MDcuODIzZDEyMy42MTVkNDg5Ljg2NmQxNDQuNDk1ZDQ3MS45MDhkMTQ3LjAwMWQ0NzEuOTA4ZDE2NS4zNzZkNDcxLjkwOGQxOTkuMjAzZDU0MC4zOThkMjAzLjM4ZDU0OC43NWQyMzguMDQyZDYyOS4zNWhSM2QzNDAuNzc2UjRkMzIxLjU2NlI1ZDE5LjIxUjZkNTUyLjA5MVI3ZC02LjI2NFI4ZDUzMi44OFI5ZDBSMTBkMjgzLjk4UjExaTIzMlIxMmQxOS4yMVIxM2QzNDAuNzc2UjE0YWkxaTNpM2kzaTNpMmkzaTJpMmkzaTJpM2kzaTNpM2kzaTJpM2kzaTNpMmkyaTJpM2kxaTNpM2kzaTJpMmkyaTJpM2kyaTNpMmkyaTJpMWkzaTNpM2kzaTNoZzoxMTlvUjFkNzQwLjAxOVIyYWQzODIuNTM4ZDkyOC43ODNkNDUzLjk1MWQ3OTAuMTMzZDQ1My45NTFkNzU4LjM5NGQ0NTIuNjk4ZDc1My44ZDQzOC4wODFkNzQ4LjM3MWQ0MTIuNjA2ZDc0MS42OWQ0MDAuOTEzZDcyNy4wNzNkNDM3LjY2M2Q3MTEuNjIxZDQ1MS40NDVkNzExLjYyMWQ0OTkuMDUzZDcxMS42MjFkNTQ1LjgyN2Q3MzEuNjY3ZDUyMy42OTNkNzQyLjk0MmQ0OTkuNDcxZDc2MC40ODJkNDYyLjcyMWQ4ODMuNjhkMzc3Ljk0NGQxMDUyLjM5OGQzNjkuMTc0ZDEwNDkuNDc0ZDM1MS44NDNkMTAxNy41MjZkMzM0LjUxMmQ5ODUuNTc5ZDMzNC41MTJkOTc0LjcyMWQzMzQuNTEyZDk3My4wNWQzMzkuOTQxZDk3MS43OTdkMzQ1LjM3ZDk3MC41NDRkMzQ1LjM3ZDk2OC44NzRkMzQ0Ljk1MmQ5NjYuNzg2ZDMyMy4yMzZkOTQ1LjQ4N2QzMDkuMDM3ZDkwOC4zMTlkMzA0LjQ0M2Q4OTYuMjA4ZDI4NS4yMzNkODQxLjkxOGQyNjcuNjkzZDg2OS40ODFkMjQyLjIxOGQ5MzUuODgyZDIxMi41NjdkMTAxMi43MjRkMjA0LjIxNWQxMDMxLjUxN2QxNjYuMjEyZDEwNDYuMTMzZDE2My4yODhkMTAzMC42ODFkMTM0LjA1NWQ5NjguNDU2ZDE1Ni4xODlkOTUzLjQyMmQxMTguNjAzZDk0Ni43NGQ3Ni44NDFkODU1LjY5OWQ5NS4yMTZkODEzLjEwMmQ3MC45OTVkODMyLjczZDUxLjc4NGQ3ODYuMzc1ZDQ4Ljg2MWQ3ODAuOTQ2ZDMzLjQwOWQ3NTIuNTQ4ZDEwLjg1OGQ3NDEuNjlkNS44NDZkNzMxLjY2N2QyMC44OGQ3MTUuMzhkNjMuODk1ZDcxNS4zOGQ5My41NDZkNzI3LjA3M2QxMzguMjMxZDcxOC43MjFkMTY0Ljk1OWQ3MzEuNjY3ZDE1MC43NmQ3MzguNzY2ZDEyNC44NjdkNzU1LjA1M2QxMzUuNzI1ZDc5Ny42NWQxNjAuNzgzZDg0OC4xODJkMTY1Ljc5NGQ4NTguNjIzZDIwNS44ODVkOTM3LjEzNWQyMjAuMDg0ZDkwNi4yMzFkMjI1LjA5NmQ5MjYuMjc3ZDIzMC4xMDdkOTE1LjgzNmQyMzQuNzAxZDg3OC4yNTFkMjM5LjcxMmQ4MzcuMzI0ZDI0My4wNTNkODI1LjIxM2QyNjEuNDI5ZDgxOC41MzFkMjYwLjU5M2Q4MDguMDkxZDI1OS4zNGQ3OTIuNjM5ZDI2OC4xMWQ3NzUuMDk5ZDMxOS4wNmQ3NzMuODQ2ZDM4Mi41MzhkOTI4Ljc4M2hSM2Q1MzguNzI3UjRkNTQ1LjgyN1I1ZDUuODQ2UjZkMzEyLjM3OFI3ZC0yOC4zOThSOGQzMDYuNTMxUjlkMFIxMGQyODMuOThSMTFpMTE5UjEyZDUuODQ2UjEzZDUzOC43MjdSMTRhaTFpM2kyaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kyaTJpMmkyaTJpM2kzaTJpM2kyaTJpMmkzaTNpM2kyaTJpM2kzaTJpMmkzaTJpMmhnOjIzMW9SMWQ3NDAuMDE5UjJhZDMzMC4zMzZkOTEwLjQwN2QzMzMuMjU5ZDkyMC4wMTNkMzMzLjI1OWQ5MjcuOTQ3ZDMzMC4zMzZkOTQzLjM5OWQzMjAuNzNkOTUwLjA4MWQzMDEuOTM4ZDk2NC4yOGQzMDMuMTlkOTY0LjY5OGQzMTkuNDc3ZDk2MS4zNTdkMjcwLjE5OWQxMDA2Ljg3N2QyNjMuMDk5ZDEwMTEuNDcxZDIzNC43MDFkMTAyOS44NDZkMTg4LjM0NWQxMDI5Ljg0NmQxMjYuMTJkMTAyOS44NDZkODIuMjdkOTk3LjY5ZDM1LjQ5N2Q5NjMuNDQ1ZDI1Ljg5MmQ5MDMuNzI1ZDM2Ljc1ZDg5Ny4wNDRkNTcuMjEzZDg4Mi4wMDlkMzkuNjczZDg3OS41MDRkMTkuMjFkODY5LjA2M2Q2MC45NzJkNzA0LjkzOWQyMTQuNjU1ZDcwNC45MzlkMzI5LjVkNzA0LjkzOWQzMjkuNWQ3NjUuMDc2ZDMyOS41ZDc4My40NTFkMzAxLjUyZDc5OC4wNjhkMjc2Ljg4ZDgxMS4wMTRkMjU2LjgzNWQ4MTEuMDE0ZDI1MS44MjNkODExLjAxNGQyNDguMDY1ZDgxMC4xNzlkMjUwLjE1M2Q4MTQuNzczZDI1Ny4yNTJkODEwLjU5N2QyNzIuMjg3ZDc5Mi40M2QyODcuMzIxZDc3NC4yNjRkMjg3LjMyMWQ3NjhkMjg3LjMyMWQ3NTEuNzEyZDI1OC45MjNkNzQxLjI3MmQyMzcuMjA3ZDczMy4zMzdkMjE2LjMyNmQ3MzMuMzM3ZDE2Mi4wMzVkNzMzLjMzN2QxMjkuMDQ0ZDc3MC41MDVkOTYuODg3ZDgwNi4wMDNkOTYuODg3ZDg2MC43MTFkOTYuODg3ZDkxMi40OTVkMTMyLjgwMmQ5NDUuNDg3ZDE2Ny40NjRkOTc3LjY0NGQyMTkuNjY3ZDk3Ny42NDRkMjcyLjcwNGQ5NzcuNjQ0ZDMzMC4zMzZkOTEwLjQwN2QxOTcuNTMzZDEwMDkuMzgzZDI1Ni40MTdkMTAxMC42MzZkMjI1LjUxM2QxMDQzLjYyOGQxODYuNjc1ZDEwODkuNTY2ZDE4OC4zNDVkMTA5NC45OTVkMjM2Ljc4OWQxMDk5LjU4OGQyODIuMzA5ZDExMDQuMTgyZDI4Mi4zMDlkMTEyOC44MjJkMjgyLjMwOWQxMTczLjA4OWQyNDMuMDUzZDExOTkuMzk5ZDIwOS4yMjZkMTIyMi4zNjhkMTYyLjQ1M2QxMjIyLjM2OGQ3MC4xNTlkMTIyMi4zNjhkNzAuMTU5ZDExODguMTIzZDcwLjE1OWQxMTY3LjI0M2Q5NS42MzRkMTE1NC43MTRkMTE2LjkzM2QxMTQ0LjI3NGQxMzkuOTAyZDExNDUuOTQ0ZDE0Ni4xNjZkMTE0Ni4zNjJkMTQ2LjU4NGQxMTQ2LjM2MmQxNDcuMDAxZDExNDYuNzc5ZDE0NS4zMzFkMTE0Ny4xOTdkMTA5LjgzM2QxMTU1Ljk2N2QxMDkuODMzZDExNzguNTE4ZDEwOS44MzNkMTE5NC4zODhkMTQxLjU3MmQxMTk0LjM4OGQxNjcuMDQ3ZDExOTQuMzg4ZDE5MC44NTFkMTE4Ny43MDZkMjIzLjg0M2QxMTc4LjUxOGQyMjMuODQzZDExNTkuNzI1ZDIyMy44NDNkMTEzOC40MjdkMTk1LjAyN2QxMTIyLjU1N2QxNzQuNTY0ZDExMTEuMjgyZDE0OS4wODlkMTA5Ny45MThkMTcyLjg5M2QxMDM4LjYxNmQxOTcuNTMzZDEwMDkuMzgzaFIzZDM1Mi40NjlSNGQzMzMuMjU5UjVkMTkuMjFSNmQzMTkuMDZSN2QtMTk4LjM2OFI4ZDI5OS44NDlSOWQwUjEwZDI4My45OFIxMWkyMzFSMTJkMTkuMjFSMTNkMzUyLjQ2OVIxNGFpMWkyaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpM2kzaTNpM2kyaTNpMmkzaTNpM2kzaTNpM2kzaGc6MTE4b1IxZDc0MC4wMTlSMmFkMTIyLjc3OWQ3MjUuNDAyZDEyNS4yODVkNzI1LjQwMmQxMjUuNzAzZDcyNC41NjdkMTI0Ljg2N2Q3MjMuMzE0ZDEyMS45NDRkNzIxLjY0NGQxMjkuODc5ZDcxNy44ODVkMTQ1LjMzMWQ3MTcuMDVkMTUyLjQzZDcyMC44MDlkMTY1LjM3NmQ3MjkuOTk2ZDE1Mi4wMTNkNzQwLjQzN2QxNDEuOTlkNzQxLjI3MmQxMjEuNTI2ZDc1Ni43MjRkMTI5LjQ2MWQ3NzguNDRkMTIxLjk0NGQ3ODYuMzc1ZDExNS4yNjJkNzk4LjQ4NmQxMjQuMDMyZDc5OC4wNjhkMTMxLjEzMmQ3OTcuNjVkMTQxLjk5ZDc5OS43MzhkMTU1LjM1M2Q4MzQuNDAxZDE5MC4wMTZkOTE3LjUwN2QyMDkuMjI2ZDg2MC4yOTNkMjEyLjE1ZDg1OC42MjNkMjE4LjgzMWQ4ODQuOTMzZDIxOS42NjdkODg0LjA5N2QyMjEuMzM3ZDg2MC43MTFkMjM2LjE2M2Q4MTYuMjM0ZDI1MC45ODhkNzcxLjc1OGQyNTIuNjU5ZDc0OC4zNzFkMjI4Ljg1NGQ3NDUuNDQ4ZDIxMi45ODVkNzMyLjUwMmQyMzkuMjk1ZDcxNy4wNWQyNDguMDY1ZDcyNC45ODVkMjY3LjI3NWQ3MzguMzQ5ZDI2Ny42OTNkNzM3LjkzMWQyNjUuNjA1ZDcyNy45MDhkMjcxLjAzNGQ3MjAuMzkxZDI4Mi4zMDlkNzIwLjM5MWQzMzIuNDI0ZDcyMC4zOTFkMzQyLjQ0NmQ3NDMuNzc4ZDMyOS45MThkNzQ1Ljg2NmQzMDIuMzU1ZDc1Ni43MjRkMjgxLjg5MmQ3OTkuNzM4ZDIzOC4wNDJkOTA5LjU3MmQxOTkuMjAzZDEwMDYuODc3ZDE3MS42NDFkMTA2MS4xNjhkMTU1Ljc3MWQxMDI5LjQyOWQxMjguMjA4ZDk2NS4xMTVkMTM4LjY0OWQ5NTAuNDk5ZDEyOC42MjZkOTQ4LjgyOGQxMDUuMjM5ZDkyMi4xMDFkMTE1LjI2MmQ5MTAuODI1ZDEwNi40OTJkOTAzLjMwOGQ5NS4yMTZkODkwLjc3OWQ5Ny4zMDVkODg5LjUyNmQxMDkuNDE1ZDg5Mi40NWQxMzMuNjM3ZDg5Ni42MjZkMTM1LjMwOGQ4OTUuNzkxZDEwOS40MTVkODc4LjY2OGQ4MS4wMTdkODU0LjQ0NmQ5Mi4yOTNkODQ3Ljc2NWQ3My41ZDgzMy41NjZkNTMuMDM3ZDc5Mi4yMjFkMzQuNjYyZDc1NS40NzFkNy45MzRkNzQwLjQzN2Q0LjU5M2Q3MjMuNzMyZDExLjY5M2Q3MTYuMjE1ZDE5LjIxZDcxNS43OTdkMzcuNTg1ZDcxNC45NjJkNzAuOTk1ZDcxOS45NzNkMTA2LjkxZDcyNS40MDJkMTIyLjc3OWQ3MjUuNDAyaFIzZDM0OC43MTFSNGQzNDIuNDQ2UjVkNC41OTNSNmQzMDkuMDM3UjdkLTM3LjE2OFI4ZDMwNC40NDNSOWQwUjEwZDI4My45OFIxMWkxMThSMTJkNC41OTNSMTNkMzQ4LjcxMVIxNGFpMWkzaTNpM2kzaTJpM2kyaTNpMmkzaTNpM2kyaTJpM2kzaTNpMmkzaTJpMmkzaTJpMmkzaTNpM2kzaTJpM2kyaTNpMmkzaTJpM2kyaTNpM2kyaTJpMmkzaTNoZzoyMzBvUjFkNzQwLjAxOVIyYWQxOTUuNDQ1ZDg3OC42NjhkMTA2LjA3NWQ4ODcuNDM4ZDEwNi4wNzVkOTU2LjM0NWQ5OC4xNGQ5NjEuMzU3ZDgzLjEwNmQ5NzMuMDVkOTUuNjM0ZDk3Mi42MzJkMTA4Ljk5OGQ5NzMuMDVkMTA0LjQwNGQ5NzYuMzkxZDEwMC42NDZkOTgxLjQwMmQxMDYuOTFkOTgxLjQwMmQxMTQuNDI3ZDk4Mi42NTVkMTIxLjk0NGQ5OTMuMDk2ZDEzMy4yMmQ5OTMuMDk2ZDE2Mi44NzFkOTkzLjA5NmQxNzkuOTkzZDk3Mi42MzJkMTk1Ljg2MmQ5NTMuODRkMTk1Ljg2MmQ5MjMuMzUzZDE5NS44NjJkODkyLjg2N2QxOTUuODYyZDg4Ni4xODVkMTk1LjQ0NWQ4NzguNjY4ZDI4Mi43MjdkOTYyLjE5MmQyNjcuMjc1ZDk3My44ODVkMjgxLjA1N2Q5NjguNDU2ZDI4Mi43MjdkOTYyLjE5MmQyNTAuOTg4ZDc0Ni4yODNkMjgzLjU2MmQ3MDkuNTMzZDMzNS4zNDdkNzA5LjUzM2Q0NTguNTQ0ZDcwOS41MzNkNDYyLjcyMWQ4NDIuNzUzZDQzMy40ODdkODUxLjUyM2QyNzAuMTk5ZDg3Ny44MzNkMjY4LjUyOGQ4OTMuNzAzZDI2OC41MjhkOTA3LjkwMmQyNzAuNjE2ZDkxOC4zNDJkMjc4Ljk2OWQ5MjIuNTE4ZDI5NS42NzNkOTUyLjU4N2QyOTIuNzVkOTU0LjY3NWQyOTMuNTg1ZDk1OC44NTFkMjk0LjAwM2Q5NjMuODYyZDI5OS4wMTRkOTg4LjA4NGQyOTcuNzYxZDk4OS4zMzdkMjk2LjA5MWQ5OTAuNTlkMjk1LjY3M2Q5OTAuMTcyZDI5NS42NzNkOTg4LjUwMmQyOTUuNjczZDk4Ni44MzFkMjk2LjNkOTg0LjMyNmQyOTYuOTI2ZDk4MS44MmQyOTYuOTI2ZDk3OS43MzJkMjk2LjUwOGQ5NzguMDYxZDI5Ni4wOTFkOTc4LjA2MWQyOTUuMjU2ZDk3OC4wNjFkMjk0LjQyZDk3OC44OTdkMjk0LjQyZDk4NC4zMjZkMjk4LjU5N2Q5ODMuNDkxZDMwOS40NTVkOTY1Ljk1MWQzMjAuNzNkOTY1Ljk1MWQzMjcuNDEyZDk2NS45NTFkMzQxLjE5NGQ5NzIuNjMyZDM1NC45NzVkOTc5LjMxNGQzNjEuNjU3ZDk3OS4zMTRkMzkxLjMwOGQ5NzkuMzE0ZDQxNS4xMTJkOTY3LjYyMWQ0MjIuNjI5ZDk2My4wMjdkNDY1LjIyNmQ5MzcuNTUzZDQ2Ny43MzJkOTM4LjM4OGQ0MTguNDUzZDEwMzQuMDIyZDM0My4yODJkMTAzNC4wMjJkMzA2LjExNGQxMDM0LjAyMmQyNzYuODhkMTAxNy4zMThkMjY2LjQ0ZDEwMjMuNTgyZDI0OS43MzVkMTAyMy41ODJkMjMxLjc3OGQxMDIzLjU4MmQyMjIuNTlkMTAwOC45NjVkMjE5LjY2N2QxMDA0LjM3MWQyMDguODA5ZDk3NS41NTZkMTg0LjE2OWQxMDI1LjY3ZDEwMi43MzRkMTAyNS42N2QzOC4wMDNkMTAyNS42N2QzOC4wMDNkOTY3LjIwM2QzOC4wMDNkOTU0LjI1N2Q0Mi41OTdkOTQyLjE0NmQ1My44NzJkOTM3Ljk3ZDY2LjQwMWQ5MzAuMDM1ZDU4LjQ2NmQ5MjcuOTQ3ZDUyLjYxOWQ5MjMuMzUzZDU4Ljg4NGQ5MTkuMTc3ZDY5LjMyNGQ5MDYuMjMxZDk5LjM5M2Q4OTcuMDQ0ZDg2LjQ0NmQ4OTMuMjg1ZDg2LjQ0NmQ4OTIuNDVkMTA4Ljk5OGQ4NzcuNDE1ZDE5NS40NDVkODQwLjI0N2QxOTUuODYyZDgwMy4wNzlkMTk2LjY5OGQ3MzIuMDg0ZDE2My4yODhkNzMyLjA4NGQxNDEuNTcyZDczMi4wODRkMTA5LjgzM2Q3NTEuNzEyZDc0LjMzNmQ3NzMuNDI5ZDc0LjMzNmQ3OTUuOThkNzcuNjc2ZDgwMC45OTFkODUuMTk0ZDgwMC45OTFkOTguMTRkODAwLjk5MWQxMTguMTg1ZDc5NS45OGQ5OS44MWQ4MjEuNDU1ZDkzLjEyOGQ4MjYuODg0ZDc4LjkyOWQ4MzguOTk1ZDU4Ljg4NGQ4MzguNTc3ZDQwLjA5MWQ4MzguMTU5ZDM1LjkxNWQ4MjUuMjEzZDM1LjkxNWQ3NzAuMDg4ZDkxLjA0ZDczNi4yNjFkMTM2LjU2MWQ3MDguMjhkMTg4Ljc2M2Q3MDguMjhkMjM1LjUzNmQ3MDguMjhkMjUwLjk4OGQ3NDYuMjgzZDQwNy4xNzdkODI0Ljc5NmQ0MDYuNzZkNzg4Ljg4ZDM4Ny41NDlkNzY0LjY1OWQzNjYuNjY4ZDczNy45MzFkMzMyLjAwNmQ3MzcuOTMxZDI3OC4xMzNkNzM3LjkzMWQyNzEuODY5ZDg1NC4wMjlkMzU1LjgxZDgzNi45MDdkMzU3Ljg5OGQ4MzIuNzNkMzU3LjA2M2Q4MjUuMjEzZDM1Ny40ODFkODI0Ljc5NmQzNjQuOTk4ZDgzMS44OTVkMzgxLjI4NWQ4NDQuNDI0ZDM4NC42MjZkODQxLjA4M2QzODMuMzczZDgzNi40ODlkMzgyLjEyZDgzMC42NDJkMzgyLjEyZDgyOS44MDdkMzg0LjIwOGQ4MzEuNDc3ZDQwNy4xNzdkODI0Ljc5NmhSM2Q0OTkuODg5UjRkNDY3LjczMlI1ZDM1LjkxNVI2ZDMxNS43MTlSN2QtMTAuMDIyUjhkMjc5LjgwNFI5ZDBSMTBkMjgzLjk4UjExaTIzMFIxMmQzNS45MTVSMTNkNDk5Ljg4OVIxNGFpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkyaTJpMmkxaTNpM2kzaTNpMmkzaTJpM2kyaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTFpM2kzaTNpMmkyaTJpMmkzaTJpM2kyaTJpMmhnOjExN29SMWQ3NDAuMDE5UjJhZDE0Mi44MjVkNzE5LjU1NmQxNDUuMzMxZDc2NS45MTFkMTIyLjM2MmQ3OTUuOThkMTQyLjgyNWQ3OTkuNzM4ZDE0Mi40MDdkODk0LjEyZDE0Mi40MDdkOTQwLjg5M2QxNDYuNTg0ZDk1NS45MjhkMTU2LjE4OWQ5ODguNTAyZDE5MS42ODZkOTg4LjUwMmQyNDUuMTQxZDk4OC41MDJkMjY0LjM1MmQ5MTUuMDAxZDI3MS44NjlkODg1Ljc2OGQyNzYuODhkODAwLjE1NmQyNzcuMjk4ZDc5MC41NTFkMzAyLjc3M2Q3OTIuNjM5ZDI4MC42MzlkNzY0LjI0MWQyNzkuODA0ZDc1NS44ODlkMjc0LjM3NWQ3NTAuNDZkMjc4LjEzM2Q3NDQuNjEzZDI5NC44MzhkNzQ0LjYxM2QyNjguNTI4ZDcyNC45ODVkMjk5LjAxNGQ3MTguNzIxZDM2MC40MDRkNzE4LjcyMWQzNjIuNDkyZDc5OS4zMjFkMzM5LjUyM2Q4MTcuNjk2ZDM1Ny44OThkODMyLjMxM2QzNTcuMDYzZDkxNS44MzZkMzU2LjIyOGQ5NzkuNzMyZDM3Mi4wOTdkOTc5LjczMmQzOTAuODlkOTc5LjczMmQ0MDQuMjU0ZDkzOC44MDVkNDA1LjkyNGQ5NDguODI4ZDQwNS45MjRkOTU3LjE4MWQ0MDUuOTI0ZDk5Ni40MzdkMzc1LjQzOGQxMDEyLjMwNmQzNTYuNjQ2ZDEwMjEuOTExZDMwOC4yMDJkMTAyNi45MjNkMjk0LjgzOGQxMDI4LjE3NmQyODEuNDc0ZDEwMDMuMTE5ZDI4My4xNDVkOTcxLjc5N2QyMTYuNzQzZDEwMjkuODQ2ZDE2OS41NTNkMTAyOS44NDZkNTguNDY2ZDEwMjkuODQ2ZDU4LjQ2NmQ4OTEuMTk3ZDU4LjQ2NmQ4ODAuMzM5ZDYxLjgwN2Q4NzEuOTg2ZDkxLjA0ZDg1OC42MjNkNjAuNTU0ZDgyOC41NTRkNjAuNTU0ZDgxMi4yNjdkNjAuNTU0ZDgwNC43NWQ2MS44MDdkNzkwLjM0MmQ2My4wNmQ3NzUuOTM0ZDYzLjA2ZDc2OC40MTdkNjMuMDZkNzY1LjkxMWQ1OS4zMDFkNzU1LjA1M2QzNS45MTVkNzQ4Ljc4OWQzOC40MmQ3NDguNzg5ZDI2LjMwOWQ3NDguNzg5ZDE1LjAzNGQ3NjhkMjUuNDc0ZDczNy45MzFkMzguMjEyZDcyNy42OTlkNTAuOTQ5ZDcxNy40NjhkODEuODUzZDcxOC4zMDNkMTQyLjgyNWQ3MTkuNTU2aFIzZDQxOS43MDZSNGQ0MDUuOTI0UjVkMTUuMDM0UjZkMzA2LjUzMVI3ZC01Ljg0NlI4ZDI5MS40OTdSOWQwUjEwZDI4My45OFIxMWkxMTdSMTJkMTUuMDM0UjEzZDQxOS43MDZSMTRhaTFpMmkyaTJpMmkzaTNpM2kzaTNpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaGc6MjI5b1IxZDc0MC4wMTlSMmFkMzAxLjEwMmQ5MzYuNzE3ZDMxMy42MzFkOTQzLjM5OWQzMTkuNDc3ZDk1NC4yNTdkMzE5LjQ3N2Q5NzcuMjI2ZDMxOS40NzdkMTAyMy41ODJkMjY3LjY5M2QxMDIzLjU4MmQyNDYuMzk0ZDEwMjMuNTgyZDIzNS45NTRkMTAwOC45NjVkMjMyLjYxM2QxMDA0LjM3MWQyMjAuMDg0ZDk3NS41NTZkMTkxLjI2OWQxMDI1LjY3ZDk2Ljg4N2QxMDI1LjY3ZDIxLjcxNmQxMDI1LjY3ZDIxLjcxNmQ5NjcuMjAzZDIxLjcxNmQ5NTQuMjU3ZDI3LjE0NWQ5NDIuMTQ2ZDQwLjA5MWQ5MzcuOTdkNTQuNzA3ZDkzMC4wMzVkNDUuNTJkOTI3Ljk0N2QzOC40MmQ5MjMuMzUzZDQ1LjkzOGQ5MTkuMTc3ZDU4LjA0OGQ5MDYuMjMxZDkyLjcxMWQ4OTcuMDQ0ZDc3LjY3NmQ4OTMuMjg1ZDc4LjA5NGQ4OTIuNDVkMTAzLjk4NmQ4NzcuNDE1ZDIwNC4yMTVkODQwLjI0N2QyMDUuNDY4ZDgwMy4wNzlkMjA3Ljk3M2Q3MzIuMDg0ZDE2Ny4wNDdkNzMyLjA4NGQxNDEuNTcyZDczMi4wODRkMTA0LjgyMmQ3NTEuNzEyZDYzLjg5NWQ3NzMuNDI5ZDYzLjg5NWQ3OTUuOThkNjcuNjU0ZDgwMC45OTFkNzYuNDI0ZDgwMC45OTFkOTEuNDU4ZDgwMC45OTFkMTE0Ljg0NWQ3OTUuOThkOTMuOTY0ZDgyMC42MTlkODUuNjExZDgyNi44ODRkNjkuMzI0ZDgzOC45OTVkNDUuOTM4ZDgzOC41NzdkMjQuMjIxZDgzOC4xNTlkMTkuMjFkODI1LjIxM2QxOS4yMWQ3NzAuMDg4ZDgzLjEwNmQ3MzYuMjYxZDEzNS43MjVkNzA4LjI4ZDE5Ni42OThkNzA4LjI4ZDI3OC41NTFkNzA4LjI4ZDI3OC41NTFkNzk1LjU2MmQyNzguNTUxZDgxMS40MzJkMjc2LjA0NWQ4NDMuMTcxZDI3My41MzlkODc0LjkxZDI3My41MzlkODkwLjc3OWQyNzMuNTM5ZDk4NS45OTZkMjg5LjgyN2Q5ODYuNDE0ZDMwMS41MmQ5NzYuMzkxZDMwNy43ODRkOTU0LjY3NWQzMDEuMTAyZDkzNi43MTdkMjA0LjIxNWQ4NzguNjY4ZDEwMC42NDZkODg3LjQzOGQxMDAuNjQ2ZDk1Ni4zNDVkOTEuNDU4ZDk2MS4zNTdkNzMuOTE4ZDk3My4wNWQ4OC41MzVkOTcyLjYzMmQxMDMuOTg2ZDk3My4wNWQ5OC41NTdkOTc2LjM5MWQ5NC4zODFkOTgxLjQwMmQxMDEuNDgxZDk4MS40MDJkMTEwLjI1MWQ5ODIuNjU1ZDExOS4wMjFkOTkzLjA5NmQxMzIuMzg0ZDk5My4wOTZkMTY0Ljk1OWQ5OTMuMDk2ZDE4NS4wMDRkOTc0LjMwM2QyMDUuMDVkOTU1LjUxZDIwNS4wNWQ5MjMuMzUzZDIwNS4wNWQ4OTIuODY3ZDIwNS4wNWQ4ODYuMTg1ZDIwNC4yMTVkODc4LjY2OGQ4Ny42OTlkNTU1LjAxNGQ4Ny42OTlkNTI1Ljc4MWQxMTQuNDI3ZDUwNC45ZDEzOS4wNjZkNDg1LjI3MmQxNjkuMTM1ZDQ4NS4yNzJkMTk5LjYyMWQ0ODUuMjcyZDIyNC4yNjFkNTA0LjQ4MmQyNTEuNDA2ZDUyNC45NDZkMjUxLjQwNmQ1NTQuNTk3ZDI1MS40MDZkNTgzLjgzZDIyNC4yNjFkNjA0LjcxMWQxOTkuMjAzZDYyNC4zMzlkMTY5LjEzNWQ2MjQuMzM5ZDEzOS4wNjZkNjI0LjMzOWQxMTQuNDI3ZDYwNS4xMjhkODcuNjk5ZDU4NC4yNDdkODcuNjk5ZDU1NS4wMTRkMTY5LjEzNWQ1OTIuMTgyZDE5OC43ODZkNTkyLjE4MmQxOTguNzg2ZDU1NC41OTdkMTk4Ljc4NmQ1MTcuMDExZDE2OS45N2Q1MTcuMDExZDE0MC4zMTlkNTE3LjAxMWQxNDAuMzE5ZDU1NC41OTdkMTQwLjMxOWQ1OTIuMTgyZDE2OS4xMzVkNTkyLjE4MmhSM2QzMzguNjg4UjRkMzE5LjQ3N1I1ZDE5LjIxUjZkNTM4LjcyN1I3ZC0xLjY3UjhkNTE5LjUxN1I5ZDBSMTBkMjgzLjk4UjExaTIyOVIxMmQxOS4yMVIxM2QzMzguNjg4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkyaTJpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaGc6MTE2b1IxZDc0MC4wMTlSMmFkNjYuNDAxZDc2NC42NTlkNTEuNzg0ZDc3My44NDZkMjEuNzE2ZDc5MC4xMzNkMjIuNTUxZDc3Ni4zNTJkMjIuNTUxZDc2OGQyMi41NTFkNzU4LjM5NGQyMS4yOThkNzU3LjE0MWQ0My40MzJkNzI5LjE2MWQ4MS4wMTdkNzIyLjg5N2Q4MS4wMTdkNjM4LjEyZDgxLjAxN2Q2MjcuNjhkNzkuNzY1ZDYwNi4zODFkNzguNTEyZDU4NS4wODNkNzguNTEyZDU3NC42NDJkMTA4LjU4ZDYwNS41NDZkMTEyLjMzOWQ2NDQuODAyZDEyNC4wMzJkNjAxLjM3ZDE0NC4wNzhkNjM2LjQ1ZDE0Ny40MTlkNjU4LjU4NGQxNDkuOTI0ZDcxNS43OTdkMTU3LjQ0MmQ3MTYuMjE1ZDIyMS4zMzdkNzA2LjYxZDIwOS42NDRkNzE0LjU0NGQxODQuNTg3ZDcyMy4zMTRkMTg5LjU5OGQ3MjMuNzMyZDIxNC4yMzhkNzIzLjczMmQyMjMuNDI1ZDcyNS40MDJkMjE4LjQxNGQ3MjguMzI2ZDE4Ny4wOTJkNzQyLjk0MmQxNzAuMzg4ZDc1MC44NzdkMTQ2LjU4NGQ3NTIuOTY1ZDE0My42NmQ5ODguNTAyZDEyNS43MDNkMTAxNy4zMThkMTI5Ljg3OWQxMDIzLjE2NGQxNDIuODI1ZDEwMjUuNjdkMTQyLjQwN2QxMDUzLjIzM2QxNDEuOTlkMTA3OS45NmQxNTUuMzUzZDEwOTkuMTcxZDE3MC4zODhkMTEyMC44ODdkMTk2LjI4ZDExMjAuODg3ZDIxMC40NzlkMTEyMC44ODdkMjI5LjY5ZDExMDcuOTQxZDI1MS40MDZkMTA5My4zMjRkMjYwLjU5M2QxMDkxLjIzNmQyNTQuNzQ3ZDEwODcuNDc3ZDIwNy45NzNkMTA1NC4wNjhkMjEyLjk4NWQxMDUzLjIzM2QyMTguODMxZDEwNTMuMjMzZDI1OC45MjNkMTA1My4yMzNkMjg2LjA2OGQxMDc3LjQ1NWQyODYuMDY4ZDExMTkuNjM0ZDI1Mi4yNDFkMTE0My4wMjFkMjIyLjU5ZDExNjMuOTAyZDE3OC43NGQxMTYzLjkwMmQxMjQuODY3ZDExNjMuOTAyZDkyLjcxMWQxMTI4LjQwNGQ2MS4zODlkMTA5NC4xNTlkNjEuMzg5ZDEwMzkuODY5ZDYxLjM4OWQxMDI1LjY3ZDYzLjQ3N2QxMDA5LjM4M2Q3NS41ODhkMTAwOC4xM2Q4My4xMDZkOTk2LjAxOWQ4MC4xODJkOTgzLjQ5MWQ2NS4xNDhkOTYzLjQ0NWQ2My40NzdkOTE5LjU5NWQ4Ni44NjRkOTQzLjM5OWQ3Ny42NzZkOTE3LjUwN2Q2Ny4yMzZkODY3LjM5M2Q2NS45ODNkODQ4LjZkNjYuNDAxZDc2NC42NTloUjNkMjQwLjEzUjRkMjg2LjA2OFI1ZDIxLjI5OFI2ZDQ0OS4zNTdSN2QtMTM5LjkwMlI4ZDQyOC4wNThSOWQwUjEwZDI4My45OFIxMWkxMTZSMTJkMjEuMjk4UjEzZDI0MC4xM1IxNGFpMWkzaTNpM2kyaTNpM2kzaTJpMmkyaTNpMmkyaTJpM2kzaTJpM2kzaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNoZzoyMjhvUjFkNzQwLjAxOVIyYWQzMDEuMTAyZDkzNi43MTdkMzEzLjYzMWQ5NDMuMzk5ZDMxOS40NzdkOTU0LjI1N2QzMTkuNDc3ZDk3Ny4yMjZkMzE5LjQ3N2QxMDIzLjU4MmQyNjcuNjkzZDEwMjMuNTgyZDI0Ni4zOTRkMTAyMy41ODJkMjM1Ljk1NGQxMDA4Ljk2NWQyMzIuNjEzZDEwMDQuMzcxZDIyMC4wODRkOTc1LjU1NmQxOTEuMjY5ZDEwMjUuNjdkOTYuODg3ZDEwMjUuNjdkMjEuNzE2ZDEwMjUuNjdkMjEuNzE2ZDk2Ny4yMDNkMjEuNzE2ZDk1NC4yNTdkMjcuMTQ1ZDk0Mi4xNDZkNDAuMDkxZDkzNy45N2Q1NC43MDdkOTMwLjAzNWQ0NS41MmQ5MjcuOTQ3ZDM4LjQyZDkyMy4zNTNkNDUuOTM4ZDkxOS4xNzdkNTguMDQ4ZDkwNi4yMzFkOTIuNzExZDg5Ny4wNDRkNzcuNjc2ZDg5My4yODVkNzguMDk0ZDg5Mi40NWQxMDMuOTg2ZDg3Ny40MTVkMjA0LjIxNWQ4NDAuMjQ3ZDIwNS40NjhkODAzLjA3OWQyMDcuOTczZDczMi4wODRkMTY3LjA0N2Q3MzIuMDg0ZDE0MS41NzJkNzMyLjA4NGQxMDQuODIyZDc1MS43MTJkNjMuODk1ZDc3My40MjlkNjMuODk1ZDc5NS45OGQ2Ny42NTRkODAwLjk5MWQ3Ni40MjRkODAwLjk5MWQ5MS40NThkODAwLjk5MWQxMTQuODQ1ZDc5NS45OGQ5My45NjRkODIwLjYxOWQ4NS42MTFkODI2Ljg4NGQ2OS4zMjRkODM4Ljk5NWQ0NS45MzhkODM4LjU3N2QyNC4yMjFkODM4LjE1OWQxOS4yMWQ4MjUuMjEzZDE5LjIxZDc3MC4wODhkODMuMTA2ZDczNi4yNjFkMTM1LjcyNWQ3MDguMjhkMTk2LjY5OGQ3MDguMjhkMjc4LjU1MWQ3MDguMjhkMjc4LjU1MWQ3OTUuNTYyZDI3OC41NTFkODExLjQzMmQyNzYuMDQ1ZDg0My4xNzFkMjczLjUzOWQ4NzQuOTFkMjczLjUzOWQ4OTAuNzc5ZDI3My41MzlkOTg1Ljk5NmQyODkuODI3ZDk4Ni40MTRkMzAxLjUyZDk3Ni4zOTFkMzA3Ljc4NGQ5NTQuNjc1ZDMwMS4xMDJkOTM2LjcxN2QyMDQuMjE1ZDg3OC42NjhkMTAwLjY0NmQ4ODcuNDM4ZDEwMC42NDZkOTU2LjM0NWQ5MS40NThkOTYxLjM1N2Q3My45MThkOTczLjA1ZDg4LjUzNWQ5NzIuNjMyZDEwMy45ODZkOTczLjA1ZDk4LjU1N2Q5NzYuMzkxZDk0LjM4MWQ5ODEuNDAyZDEwMS40ODFkOTgxLjQwMmQxMTAuMjUxZDk4Mi42NTVkMTE5LjAyMWQ5OTMuMDk2ZDEzMi4zODRkOTkzLjA5NmQxNjQuOTU5ZDk5My4wOTZkMTg1LjAwNGQ5NzQuMzAzZDIwNS4wNWQ5NTUuNTFkMjA1LjA1ZDkyMy4zNTNkMjA1LjA1ZDg5Mi44NjdkMjA1LjA1ZDg4Ni4xODVkMjA0LjIxNWQ4NzguNjY4ZDExMC4yNTFkNTE0LjA4OGQxNTcuODU5ZDUxNC4wODhkMTU3Ljg1OWQ1NTUuMDE0ZDE1Ny44NTlkNTk0LjI3ZDEzMS45NjdkNTk0LjI3ZDk3LjcyMmQ1OTQuMjdkODguMTE3ZDU5MS4zNDdkNjYuNDAxZDU4NC42NjVkNjYuNDAxZDU1OC43NzNkNjYuNDAxZDU0MS4yMzNkNzkuNTU2ZDUyNy42NmQ5Mi43MTFkNTE0LjA4OGQxMTAuMjUxZDUxNC4wODhkMjQwLjU0OGQ1MTAuMzI5ZDI4OC4xNTZkNTEwLjMyOWQyODguMTU2ZDU1MS4yNTZkMjg4LjE1NmQ1ODkuMjU5ZDI2NS42MDVkNTg5LjI1OWQyNjEuNDI5ZDU4OS4yNTlkMjUzLjcwM2Q1ODcuNTg4ZDI0NS45NzdkNTg1LjkxOGQyNDIuMjE4ZDU4NS45MThkMjE2LjMyNmQ1ODUuNWQyMDkuNjQ0ZDU4Mi41NzdkMTk2LjY5OGQ1NzYuNzNkMTk2LjY5OGQ1NTUuMDE0ZDE5Ni42OThkNTM3LjA1N2QyMDkuNjQ0ZDUyMy42OTNkMjIyLjU5ZDUxMC4zMjlkMjQwLjU0OGQ1MTAuMzI5aFIzZDMzOC42ODhSNGQzMTkuNDc3UjVkMTkuMjFSNmQ1MTMuNjdSN2QtMS42N1I4ZDQ5NC40NlI5ZDBSMTBkMjgzLjk4UjExaTIyOFIxMmQxOS4yMVIxM2QzMzguNjg4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkyaTJpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjExNW9SMWQ3NDAuMDE5UjJhZDM2Ljc1ZDk0Ni4zMjNkMzkuMjU2ZDk0NC42NTJkNTQuMjlkOTI4Ljc4M2Q2Mi4yMjVkOTIwLjQzZDgxLjAxN2Q5MTcuMDg5ZDY1LjU2NmQ5MjcuNTNkNjUuNTY2ZDk0Mi45ODJkNjUuNTY2ZDk3MC4xMjdkOTguNTU3ZDk4NS41NzlkMTI1LjI4NWQ5OTguMTA3ZDE1NS4zNTNkOTk4LjEwN2QxNzguNzRkOTk4LjEwN2QxOTcuOTUxZDk4OC41MDJkMjIyLjE3MmQ5NzYuODA5ZDIyMi4xNzJkOTU1LjkyOGQyMjIuMTcyZDkzMi4xMjNkMTkwLjQzM2Q5MTkuNTk1ZDE5OC4zNjhkOTEyLjkxM2QyMDMuMzhkOTA1LjM5NmQxOTAuMDE2ZDkwOS45OWQxNzMuNzI5ZDkxMy43NDhkMTcyLjg5M2Q5MTIuOTEzZDE3Mi44OTNkOTEyLjA3OGQxNzkuNTc1ZDkwNi4yMzFkMTg2LjI1N2Q5MDAuMzg0ZDE4Ni4yNTdkODk5LjU0OWQxODUuNDIyZDg5OC43MTRkMTUxLjE3N2Q5MDQuOTc4ZDEzOC42NDlkOTA0Ljk3OGQxMTYuNTE1ZDkwNC45NzhkODQuOTg1ZDg4NS45NzdkNTMuNDU1ZDg2Ni45NzVkNDUuMTAyZDg0Ny4zNDdkNTYuNzk2ZDgyNi44ODRkNjcuNjU0ZDgwMC45OTFkNjcuMjM2ZDgwMC41NzRkNTcuNjMxZDgwOS4zNDRkMzYuNzVkODI0Ljc5NmQzNi4zMzJkODI0LjM3OGQzNS4wNzlkODE0LjM1NWQzNS4wNzlkODA1LjE2OGQzNS4wNzlkNzU3LjU1OWQ2OC40ODlkNzI5LjU3OWQ5OS44MWQ3MDIuODUxZDE0OC4yNTRkNzAyLjg1MWQxNTUuMzUzZDcwMi44NTFkMTY5LjM0NGQ3MDIuNDMzZDE4My4zMzRkNzAyLjAxNmQxOTAuNDMzZDcwMi4wMTZkMjgzLjk4ZDcwMi4wMTZkMjgzLjk4ZDc2My44MjNkMjgzLjk4ZDc4MS43ODFkMjY5Ljk5ZDc5NC43MjdkMjU2ZDgwNy42NzNkMjM3LjYyNGQ4MDcuNjczZDIyMy4wMDhkODA3LjY3M2QyMTUuNDkxZDc5OC40ODZkMjE1LjkwOGQ3OTcuNjVkMjQ3LjY0N2Q3OTQuNzI3ZDI0Ny42NDdkNzc4LjAyMmQyNDcuNjQ3ZDc0MS4yNzJkMTQ5LjA4OWQ3NDEuMjcyZDkzLjU0NmQ3NDEuMjcyZDkzLjU0NmQ3NzguMDIyZDkzLjU0NmQ4MDAuOTkxZDEzMS41NDlkODE2LjAyNmQxODguNzYzZDgzMS44OTVkMTczLjMxMWQ4MzguNTc3ZDE2Mi4wMzVkODQ1LjY3NmQxOTMuMzU3ZDg0MS41ZDIxNi43NDNkODQxLjVkMjI4LjAxOWQ4NDEuNWQyNDguOWQ4NTkuMDRkMjY4LjExZDg3NC45MWQyNzQuNzkyZDg4Ny4wMjFkMjM2Ljc4OWQ5MDIuMDU1ZDI1OS4zNGQ5MDUuODE0ZDI4My4xNDVkOTE1LjQxOWQyODUuMjMzZDkyNS44NTlkMjg1LjIzM2Q5MzcuMTM1ZDI4NS4yMzNkMTAzMC4yNjRkMTQ5LjA4OWQxMDMwLjI2NGQzMS43MzhkMTAzMC4yNjRkMzEuNzM4ZDk3NS41NTZkMzEuNzM4ZDk3MC4xMjdkMzMuODI3ZDk2MC45MzlkMzYuMzMyZDk1MC4wODFkMzYuNzVkOTQ2LjMyM2hSM2QzMTYuNTU0UjRkMjg1LjIzM1I1ZDMxLjczOFI2ZDMyMS45ODNSN2QtNi4yNjRSOGQyOTAuMjQ0UjlkMFIxMGQyODMuOThSMTFpMTE1UjEyZDMxLjczOFIxM2QzMTYuNTU0UjE0YWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTJpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2hnOjIyN29SMWQ3NDAuMDE5UjJhZDMwMS4xMDJkOTM2LjcxN2QzMTMuNjMxZDk0My4zOTlkMzE5LjQ3N2Q5NTQuMjU3ZDMxOS40NzdkOTc3LjIyNmQzMTkuNDc3ZDEwMjMuNTgyZDI2Ny42OTNkMTAyMy41ODJkMjQ2LjM5NGQxMDIzLjU4MmQyMzUuOTU0ZDEwMDguOTY1ZDIzMi42MTNkMTAwNC4zNzFkMjIwLjA4NGQ5NzUuNTU2ZDE5MS4yNjlkMTAyNS42N2Q5Ni44ODdkMTAyNS42N2QyMS43MTZkMTAyNS42N2QyMS43MTZkOTY3LjIwM2QyMS43MTZkOTU0LjI1N2QyNy4xNDVkOTQyLjE0NmQ0MC4wOTFkOTM3Ljk3ZDU0LjcwN2Q5MzAuMDM1ZDQ1LjUyZDkyNy45NDdkMzguNDJkOTIzLjM1M2Q0NS45MzhkOTE5LjE3N2Q1OC4wNDhkOTA2LjIzMWQ5Mi43MTFkODk3LjA0NGQ3Ny42NzZkODkzLjI4NWQ3OC4wOTRkODkyLjQ1ZDEwMy45ODZkODc3LjQxNWQyMDQuMjE1ZDg0MC4yNDdkMjA1LjQ2OGQ4MDMuMDc5ZDIwNy45NzNkNzMyLjA4NGQxNjcuMDQ3ZDczMi4wODRkMTQxLjU3MmQ3MzIuMDg0ZDEwNC44MjJkNzUxLjcxMmQ2My44OTVkNzczLjQyOWQ2My44OTVkNzk1Ljk4ZDY3LjY1NGQ4MDAuOTkxZDc2LjQyNGQ4MDAuOTkxZDkxLjQ1OGQ4MDAuOTkxZDExNC44NDVkNzk1Ljk4ZDkzLjk2NGQ4MjAuNjE5ZDg1LjYxMWQ4MjYuODg0ZDY5LjMyNGQ4MzguOTk1ZDQ1LjkzOGQ4MzguNTc3ZDI0LjIyMWQ4MzguMTU5ZDE5LjIxZDgyNS4yMTNkMTkuMjFkNzcwLjA4OGQ4My4xMDZkNzM2LjI2MWQxMzUuNzI1ZDcwOC4yOGQxOTYuNjk4ZDcwOC4yOGQyNzguNTUxZDcwOC4yOGQyNzguNTUxZDc5NS41NjJkMjc4LjU1MWQ4MTEuNDMyZDI3Ni4wNDVkODQzLjE3MWQyNzMuNTM5ZDg3NC45MWQyNzMuNTM5ZDg5MC43NzlkMjczLjUzOWQ5ODUuOTk2ZDI4OS44MjdkOTg2LjQxNGQzMDEuNTJkOTc2LjM5MWQzMDcuNzg0ZDk1NC42NzVkMzAxLjEwMmQ5MzYuNzE3ZDIwNC4yMTVkODc4LjY2OGQxMDAuNjQ2ZDg4Ny40MzhkMTAwLjY0NmQ5NTYuMzQ1ZDkxLjQ1OGQ5NjEuMzU3ZDczLjkxOGQ5NzMuMDVkODguNTM1ZDk3Mi42MzJkMTAzLjk4NmQ5NzMuMDVkOTguNTU3ZDk3Ni4zOTFkOTQuMzgxZDk4MS40MDJkMTAxLjQ4MWQ5ODEuNDAyZDExMC4yNTFkOTgyLjY1NWQxMTkuMDIxZDk5My4wOTZkMTMyLjM4NGQ5OTMuMDk2ZDE2NC45NTlkOTkzLjA5NmQxODUuMDA0ZDk3NC4zMDNkMjA1LjA1ZDk1NS41MWQyMDUuMDVkOTIzLjM1M2QyMDUuMDVkODkyLjg2N2QyMDUuMDVkODg2LjE4NWQyMDQuMjE1ZDg3OC42NjhkMjczLjUzOWQ1MDEuOTc3ZDI5Mi43NWQ1MDguNjU5ZDMwOC42MTlkNTMyLjQ2M2QzMDYuNTMxZDYwMC41MzVkMjQwLjU0OGQ2MDAuNTM1ZDIxNC42NTVkNjAwLjUzNWQxNjIuMjQ0ZDU3Ni4zMTNkMTA5LjgzM2Q1NTIuMDkxZDg0LjM1OGQ1NTIuMDkxZDcwLjU3N2Q1NTIuMDkxZDU5LjUxZDU2MS40ODdkNDguNDQzZDU3MC44ODRkNDguNDQzZDU4NC4yNDdkNDguNDQzZDYwMi42MjNkNzEuNDEyZDYxNi40MDRkMzAuNDg2ZDYwMi42MjNkMzAuNDg2ZDU4NS45MThkMzAuNDg2ZDUxMy42N2Q5MC42MjNkNTEzLjY3ZDExNy43NjhkNTEzLjY3ZDE3MC4zODhkNTM4LjEwMWQyMjMuMDA4ZDU2Mi41MzFkMjUwLjE1M2Q1NjIuNTMxZDI5Mi4zMzJkNTYyLjUzMWQyOTIuMzMyZDUzNC41NTFkMjkyLjMzMmQ1MTkuNTE3ZDI3My41MzlkNTAxLjk3N2hSM2QzMzguNjg4UjRkMzE5LjQ3N1I1ZDE5LjIxUjZkNTIyLjAyMlI3ZC0xLjY3UjhkNTAyLjgxMlI5ZDBSMTBkMjgzLjk4UjExaTIyN1IxMmQxOS4yMVIxM2QzMzguNjg4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkyaTJpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTE0b1IxZDc0MC4wMTlSMmFkNy4wOTlkMTAwMy41MzZkMjMuODA0ZDk5Ny42OWQ1NS41NDNkOTgyLjY1NWQ2OC4wNzFkODc2LjE2M2Q2OC4wNzFkNzkzLjA1N2Q2OC4wNzFkNzU5LjIzZDU0LjcwN2Q3NDkuNjI0ZDQwLjA5MWQ3NjIuOTg4ZDcuNTE3ZDc4My40NTFkMzguNDJkNzI5LjE2MWQ5Ni4wNTJkNjkyLjQxMWQxMTYuMDk3ZDcwNy40NDVkMTIxLjEwOWQ3MjUuODJkMTI0LjAzMmQ3MzYuMjYxZDEyMy42MTVkNzY4ZDE0OS41MDdkNzIzLjMxNGQxNTUuNzcxZDcxNi4yMTVkMTc1LjgxN2Q2OTMuMjQ2ZDIwOC4zOTFkNjkzLjI0NmQyNjMuMDk5ZDY5My4yNDZkMjYzLjA5OWQ3NTAuODc3ZDI2My4wOTlkNzcwLjA4OGQyNDkuOTQ0ZDc4NC4yODdkMjM2Ljc4OWQ3OTguNDg2ZDIxNy41NzlkNzk4LjQ4NmQyMTguODMxZDc5NS41NjJkMjI5LjI3MmQ3ODIuNjE2ZDIzNi4zNzFkNzczLjQyOWQyMzYuMzcxZDc2NS4wNzZkMjM2LjM3MWQ3NDIuNTI1ZDIwNS44ODVkNzQyLjUyNWQxNzMuNzI5ZDc0Mi41MjVkMTQ4LjY3MmQ3NzcuMTg3ZDEyNS4yODVkODA4LjkyNmQxMjUuMjg1ZDg0Mi4zMzZkMTI1LjI4NWQ5NzMuMDVkMTM1LjMwOGQ5ODMuOTA4ZDEzOC42NDlkOTg3LjY2N2QxNjkuOTdkOTk0LjM0OWQxOTcuNTMzZDEwMDAuMTk1ZDE5Ny41MzNkMTAwOS44ZDE5NS40NDVkMTAyMC42NTlkNy4wOTlkMTAyMS4wNzZkNS44NDZkMTAxMi4zMDZkNy4wOTlkMTAwMy41MzZoUjNkMjYzLjUxN1I0ZDI2My4wOTlSNWQ1Ljg0NlI2ZDMzMS41ODhSN2QyLjkyM1I4ZDMyNS43NDJSOWQwUjEwZDI4My45OFIxMWkxMTRSMTJkNS44NDZSMTNkMjYzLjUxN1IxNGFpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpMmhnOjIyNm9SMWQ3NDAuMDE5UjJhZDMwMS4xMDJkOTM2LjcxN2QzMTMuNjMxZDk0My4zOTlkMzE5LjQ3N2Q5NTQuMjU3ZDMxOS40NzdkOTc3LjIyNmQzMTkuNDc3ZDEwMjMuNTgyZDI2Ny42OTNkMTAyMy41ODJkMjQ2LjM5NGQxMDIzLjU4MmQyMzUuOTU0ZDEwMDguOTY1ZDIzMi42MTNkMTAwNC4zNzFkMjIwLjA4NGQ5NzUuNTU2ZDE5MS4yNjlkMTAyNS42N2Q5Ni44ODdkMTAyNS42N2QyMS43MTZkMTAyNS42N2QyMS43MTZkOTY3LjIwM2QyMS43MTZkOTU0LjI1N2QyNy4xNDVkOTQyLjE0NmQ0MC4wOTFkOTM3Ljk3ZDU0LjcwN2Q5MzAuMDM1ZDQ1LjUyZDkyNy45NDdkMzguNDJkOTIzLjM1M2Q0NS45MzhkOTE5LjE3N2Q1OC4wNDhkOTA2LjIzMWQ5Mi43MTFkODk3LjA0NGQ3Ny42NzZkODkzLjI4NWQ3OC4wOTRkODkyLjQ1ZDEwMy45ODZkODc3LjQxNWQyMDQuMjE1ZDg0MC4yNDdkMjA1LjQ2OGQ4MDMuMDc5ZDIwNy45NzNkNzMyLjA4NGQxNjcuMDQ3ZDczMi4wODRkMTQxLjU3MmQ3MzIuMDg0ZDEwNC44MjJkNzUxLjcxMmQ2My44OTVkNzczLjQyOWQ2My44OTVkNzk1Ljk4ZDY3LjY1NGQ4MDAuOTkxZDc2LjQyNGQ4MDAuOTkxZDkxLjQ1OGQ4MDAuOTkxZDExNC44NDVkNzk1Ljk4ZDkzLjk2NGQ4MjAuNjE5ZDg1LjYxMWQ4MjYuODg0ZDY5LjMyNGQ4MzguOTk1ZDQ1LjkzOGQ4MzguNTc3ZDI0LjIyMWQ4MzguMTU5ZDE5LjIxZDgyNS4yMTNkMTkuMjFkNzcwLjA4OGQ4My4xMDZkNzM2LjI2MWQxMzUuNzI1ZDcwOC4yOGQxOTYuNjk4ZDcwOC4yOGQyNzguNTUxZDcwOC4yOGQyNzguNTUxZDc5NS41NjJkMjc4LjU1MWQ4MTEuNDMyZDI3Ni4wNDVkODQzLjE3MWQyNzMuNTM5ZDg3NC45MWQyNzMuNTM5ZDg5MC43NzlkMjczLjUzOWQ5ODUuOTk2ZDI4OS44MjdkOTg2LjQxNGQzMDEuNTJkOTc2LjM5MWQzMDcuNzg0ZDk1NC42NzVkMzAxLjEwMmQ5MzYuNzE3ZDIwNC4yMTVkODc4LjY2OGQxMDAuNjQ2ZDg4Ny40MzhkMTAwLjY0NmQ5NTYuMzQ1ZDkxLjQ1OGQ5NjEuMzU3ZDczLjkxOGQ5NzMuMDVkODguNTM1ZDk3Mi42MzJkMTAzLjk4NmQ5NzMuMDVkOTguNTU3ZDk3Ni4zOTFkOTQuMzgxZDk4MS40MDJkMTAxLjQ4MWQ5ODEuNDAyZDExMC4yNTFkOTgyLjY1NWQxMTkuMDIxZDk5My4wOTZkMTMyLjM4NGQ5OTMuMDk2ZDE2NC45NTlkOTkzLjA5NmQxODUuMDA0ZDk3NC4zMDNkMjA1LjA1ZDk1NS41MWQyMDUuMDVkOTIzLjM1M2QyMDUuMDVkODkyLjg2N2QyMDUuMDVkODg2LjE4NWQyMDQuMjE1ZDg3OC42NjhkNzQuMzM2ZDYxNi44MjJkODEuNDM1ZDYxMC41NTdkMTMxLjEzMmQ1NjAuODYxZDEzOS45MDJkNTU5LjE5ZDE1NC41MThkNTUyLjkyNmQxNTIuMDEzZDU0OS41ODVkMTQ3LjgzNmQ1NDIuOTAzZDE2MC4zNjVkNTM2LjIyMWQxNjEuMmQ1MjUuMzYzZDE3My4zMTFkNTAyLjM5NGQxODcuOTI4ZDQ3NC44MzFkMTkwLjAxNmQ0NjYuMDYxZDE5NC42MWQ0NjYuMDYxZDIzMi4xOTVkNTYwLjAyNmQyOTkuNDMyZDYxNi44MjJkMjU5Ljc1OGQ2MTYuODIyZDI1NmQ2MTYuODIyZDI0Mi42MzZkNjA5LjMwNWQyMjkuMjcyZDYwMS43ODdkMjI4LjQzN2Q1OTguODY0ZDIzMC45NDJkNTk0LjI3ZDIzNC43MDFkNTg0LjI0N2QyMzQuMjgzZDU4Mi41NzdkMjI3LjYwMWQ1ODQuNjY1ZDIyMy40MjVkNTg0LjI0N2QyMTguNDE0ZDU4My44M2QyMTcuNTc5ZDU3MS43MTlkMjE0LjY1NWQ1NTYuMjY3ZDIxMi41NjdkNTY0LjIwMmQyMDkuMjI2ZDU3MC44ODRkMjA1Ljg4NWQ1NjUuODcyZDE5MS4yNjlkNTM5LjU2MmQxNjUuNzk0ZDU4MC40ODlkMTEyLjMzOWQ2MTYuODIyZDc0LjMzNmQ2MTYuODIyZDMzNC41MTJkNDk3LjM4M2QzNTMuMzA1ZDQ5Ny4zODNkMzY3LjcxMmQ1MDguNjU5ZDM4Mi4xMmQ1MTkuOTM0ZDM4Mi4xMmQ1MzguMzA5ZDM4Mi4xMmQ1ODcuNTg4ZDMzNi42ZDU4Ny41ODhkMjkwLjY2MmQ1ODcuNTg4ZDI5MC42NjJkNTQyLjA2OGQyOTAuNjYyZDUyNC41MjhkMzAzLjgxN2Q1MTAuOTU1ZDMxNi45NzJkNDk3LjM4M2QzMzQuNTEyZDQ5Ny4zODNoUjNkMzM4LjY4OFI0ZDM4Mi4xMlI1ZDE5LjIxUjZkNTU3LjkzOFI3ZC0xLjY3UjhkNTM4LjcyN1I5ZDBSMTBkMjgzLjk4UjExaTIyNlIxMmQxOS4yMVIxM2QzMzguNjg4UjE0YWkxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpMmkzaTJpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpMmkyaTJpMWkzaTNpMmkyaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kyaTNpM2kyaTNpMmkzaTNpM2kyaTNpMmkzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2hnOjExM29SMWQ3NDAuMDE5UjJhZDMxOC4yMjVkNzQ3Ljk1NGQzMTYuMTM3ZDczMC44MzFkMzE2LjEzN2Q2OTcuNDIyZDMzNC4wOTRkNjk3LjQyMmQzNTkuOTg2ZDY5Ny40MjJkMzgwLjI0MWQ3MTcuMjU5ZDQwMC40OTVkNzM3LjA5NmQ0MDMuNDE5ZDc2Mi45ODhkMzg3LjEzMmQ3NDYuMjgzZDM3NC4xODVkNzQ3LjUzNmQzNTkuNTY5ZDc0OC43ODlkMzU0Ljk3NWQ3ODUuMTIyZDM1NC45NzVkODQ5Ljg1M2QzNTQuOTc1ZDg2Ni45NzVkMzU4Ljk0MmQ5MDAuNTkzZDM2Mi45MWQ5MzQuMjEyZDM2Mi45MWQ5NTEuMzM0ZDM1MS4yMTZkOTYwLjUyMmQzMzAuNzUzZDk4MS40MDJkMzQyLjg2NGQ5ODYuNDE0ZDM2NS40MTVkOTk4LjUyNWQzNjQuNThkMTA3NC4xMTRkMzY0LjE2M2QxMTE3LjEyOGQzNjguNzU2ZDExNDMuODU2ZDM5Ny45OWQxMTY0LjczN2Q0MzEuODE3ZDExNzIuMjU0ZDQyMC45NTlkMTE4Ny4yODhkMzQyLjg2NGQxMjA1LjY2M2QzMTQuNDY2ZDEyMTIuMzQ1ZDI0My4wNTNkMTIyNy43OTdkMjE3LjE2MWQxMjIzLjYyMWQyMTguODMxZDEyMDEuNDg3ZDI4Ny43MzhkMTE4OC4xMjNkMjg3LjczOGQxMTI5LjY1N2QyODcuNzM4ZDExMTQuMjA1ZDI4My41NjJkMTA5Mi40ODlkMjg2LjQ4NmQxMDkwLjgxOGQzMDYuNTMxZDEwOTQuOTk1ZDMwOS40NTVkMTA5Mi40ODlkMjg5LjgyN2QxMDcwLjM1NWQyODUuMjMzZDEwNDkuODkyZDI4My4xNDVkMTA0MC43MDRkMjgxLjQ3NGQxMDAwLjYxM2QyMzcuMjA3ZDEwMjkuMDExZDE3Ny45MDVkMTAyOS4wMTFkMTA5LjgzM2QxMDI5LjAxMWQ3MC41NzdkOTgzLjkwOGQzMi45OTFkOTQxLjMxMWQzMi45OTFkODcyLjQwNGQzMi45OTFkNzk1LjU2MmQ4NS4xOTRkNzUxLjcxMmQxMzQuNDczZDcxMC4zNjhkMjEyLjU2N2Q3MTAuMzY4ZDI1NS4xNjRkNzEwLjM2OGQzMTguMjI1ZDc0Ny45NTRkMjE2Ljc0M2Q5ODIuNjU1ZDIzOS43MTJkOTgyLjY1NWQyNTcuMjUyZDk4Mi42NTVkMjcxLjI0M2Q5NjguMDM5ZDI4NS4yMzNkOTUzLjQyMmQyODIuNzI3ZDkzNS44ODJkMjgyLjMwOWQ5MzUuNDY0ZDI4Mi4zMDlkOTIyLjEwMWQyODMuNzcxZDg5NC45NTVkMjg1LjIzM2Q4NjcuODFkMjg1LjIzM2Q4NTQuNDQ2ZDI4NS4yMzNkNzQxLjY5ZDIwNy41NTZkNzQxLjY5ZDE1NS4zNTNkNzQxLjY5ZDEzMS41NDlkNzg4Ljg4ZDExOC42MDNkODE0Ljc3M2QxMDguNThkODc2LjU4ZDEwMS4wNjNkOTI0LjE4OWQ4Ny4yODJkOTI0LjE4OWQ4NC4zNThkOTIxLjY4M2Q4Ny4yODJkOTIzLjM1M2QxMDIuMzE2ZDkxOC4zNDJkMTIyLjc3OWQ5MTEuNjZkMTI1LjI4NWQ5MTIuOTEzZDEyOS40NjFkOTQ2Ljc0ZDE1Ni42MDZkOTY1LjUzM2QxODEuMjQ2ZDk4Mi42NTVkMjE2Ljc0M2Q5ODIuNjU1aFIzZDQxOS43MDZSNGQ0MzEuODE3UjVkMzIuOTkxUjZkMzI2LjU3N1I3ZC0yMDMuNzk3UjhkMjkzLjU4NVI5ZDBSMTBkMjgzLjk4UjExaTExM1IxMmQzMi45OTFSMTNkNDE5LjcwNlIxNGFpMWkyaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTJpMmkzaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kzaTFpMmkzaTNpMmkzaTNpM2kzaTNpM2kyaTNpMmkyaTNpM2hnOjIyNW9SMWQ3NDAuMDE5UjJhZDMwMS4xMDJkOTM2LjcxN2QzMTMuNjMxZDk0My4zOTlkMzE5LjQ3N2Q5NTQuMjU3ZDMxOS40NzdkOTc3LjIyNmQzMTkuNDc3ZDEwMjMuNTgyZDI2Ny42OTNkMTAyMy41ODJkMjQ2LjM5NGQxMDIzLjU4MmQyMzUuOTU0ZDEwMDguOTY1ZDIzMi42MTNkMTAwNC4zNzFkMjIwLjA4NGQ5NzUuNTU2ZDE5MS4yNjlkMTAyNS42N2Q5Ni44ODdkMTAyNS42N2QyMS43MTZkMTAyNS42N2QyMS43MTZkOTY3LjIwM2QyMS43MTZkOTU0LjI1N2QyNy4xNDVkOTQyLjE0NmQ0MC4wOTFkOTM3Ljk3ZDU0LjcwN2Q5MzAuMDM1ZDQ1LjUyZDkyNy45NDdkMzguNDJkOTIzLjM1M2Q0NS45MzhkOTE5LjE3N2Q1OC4wNDhkOTA2LjIzMWQ5Mi43MTFkODk3LjA0NGQ3Ny42NzZkODkzLjI4NWQ3OC4wOTRkODkyLjQ1ZDEwMy45ODZkODc3LjQxNWQyMDQuMjE1ZDg0MC4yNDdkMjA1LjQ2OGQ4MDMuMDc5ZDIwNy45NzNkNzMyLjA4NGQxNjcuMDQ3ZDczMi4wODRkMTQxLjU3MmQ3MzIuMDg0ZDEwNC44MjJkNzUxLjcxMmQ2My44OTVkNzczLjQyOWQ2My44OTVkNzk1Ljk4ZDY3LjY1NGQ4MDAuOTkxZDc2LjQyNGQ4MDAuOTkxZDkxLjQ1OGQ4MDAuOTkxZDExNC44NDVkNzk1Ljk4ZDkzLjk2NGQ4MjAuNjE5ZDg1LjYxMWQ4MjYuODg0ZDY5LjMyNGQ4MzguOTk1ZDQ1LjkzOGQ4MzguNTc3ZDI0LjIyMWQ4MzguMTU5ZDE5LjIxZDgyNS4yMTNkMTkuMjFkNzcwLjA4OGQ4My4xMDZkNzM2LjI2MWQxMzUuNzI1ZDcwOC4yOGQxOTYuNjk4ZDcwOC4yOGQyNzguNTUxZDcwOC4yOGQyNzguNTUxZDc5NS41NjJkMjc4LjU1MWQ4MTEuNDMyZDI3Ni4wNDVkODQzLjE3MWQyNzMuNTM5ZDg3NC45MWQyNzMuNTM5ZDg5MC43NzlkMjczLjUzOWQ5ODUuOTk2ZDI4OS44MjdkOTg2LjQxNGQzMDEuNTJkOTc2LjM5MWQzMDcuNzg0ZDk1NC42NzVkMzAxLjEwMmQ5MzYuNzE3ZDIwNC4yMTVkODc4LjY2OGQxMDAuNjQ2ZDg4Ny40MzhkMTAwLjY0NmQ5NTYuMzQ1ZDkxLjQ1OGQ5NjEuMzU3ZDczLjkxOGQ5NzMuMDVkODguNTM1ZDk3Mi42MzJkMTAzLjk4NmQ5NzMuMDVkOTguNTU3ZDk3Ni4zOTFkOTQuMzgxZDk4MS40MDJkMTAxLjQ4MWQ5ODEuNDAyZDExMC4yNTFkOTgyLjY1NWQxMTkuMDIxZDk5My4wOTZkMTMyLjM4NGQ5OTMuMDk2ZDE2NC45NTlkOTkzLjA5NmQxODUuMDA0ZDk3NC4zMDNkMjA1LjA1ZDk1NS41MWQyMDUuMDVkOTIzLjM1M2QyMDUuMDVkODkyLjg2N2QyMDUuMDVkODg2LjE4NWQyMDQuMjE1ZDg3OC42NjhkMTM2LjE0M2Q2MjQuNzU2ZDI3MS40NTFkNTM3LjA1N2QyNzEuNDUxZDUwNC45ZDI3MS40NTFkNTAyLjgxMmQyNTAuNzc5ZDQ4NS4wNjNkMjMwLjEwN2Q0NjcuMzE0ZDIyNy4xODRkNDY3LjMxNGQyMDguMzkxZDQ2Ny4zMTRkMTc0Ljk4MmQ1MzUuODA0ZDE2Ny44ODJkNTUwLjAwM2QxMzYuMTQzZDYyNC43NTZoUjNkMzM4LjY4OFI0ZDMxOS40NzdSNWQxOS4yMVI2ZDU1Ni42ODVSN2QtMS42N1I4ZDUzNy40NzRSOWQwUjEwZDI4My45OFIxMWkyMjVSMTJkMTkuMjFSMTNkMzM4LjY4OFIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTJpMmkyaTFpM2kzaTJpMmkzaTNpM2kzaTNpMmkzaTFpM2kzaTNpM2kzaGc6MTEyb1IxZDc0MC4wMTlSMmFkMjE3LjE2MWQ5OTkuNzc4ZDI0MS4zODNkOTk5Ljc3OGQyNjQuMzUyZDk4My4wNzNkMjk0LjgzOGQ5NjAuOTM5ZDI5Ny4zNDRkOTYwLjEwNGQzMDIuMzU1ZDk2Mi42MWQzMTIuMzc4ZDk2Ni43ODZkMzE2Ljk3MmQ5NjMuODYyZDMwNi45NDlkOTQ1LjQ4N2QzMDYuOTQ5ZDk0MS4zMTFkMzA2Ljk0OWQ5MzAuNDUzZDMxNC40NjZkOTA5LjU3MmQzMjEuOTgzZDg4OC42OTFkMzIxLjk4M2Q4NzcuODMzZDMyMS45ODNkODI0LjM3OGQyODguOTkxZDc5My44OTJkMjU2ZDc2My40MDZkMjAxLjcwOWQ3NjMuNDA2ZDE4Ni4yNTdkNzYzLjQwNmQxNjYuNjI5ZDc3My40MjlkMTQ0LjkxM2Q3ODQuMjg3ZDE0MC43MzdkNzk3LjY1ZDEzOC42NDlkODA0LjMzMmQxMzguNjQ5ZDgzMi4zMTNkMTM4LjY0OWQ4NDMuNTg4ZDEzNy44MTRkODY1LjUxM2QxMzYuOTc4ZDg4Ny40MzhkMTM2Ljk3OGQ4OTguNzE0ZDEzNi45NzhkOTk5Ljc3OGQyMTcuMTYxZDk5OS43NzhkMTIuMTFkMTIxOS40NDVkLTEuMjUyZDEyMDQuODI4ZDMyLjU3NGQxMTg4LjEyM2QzOS42NzNkMTE4Mi42OTRkNTkuNzE5ZDExNjcuMjQzZDU5LjcxOWQxMTQ0LjI3NGQ1OS43MTlkMTEzNS4wODZkNTguNjc1ZDExMTYuMjkzZDU3LjYzMWQxMDk3LjVkNTcuNjMxZDEwODguMzEzZDU5LjMwMWQxMDgyLjQ2NmQ4MS40MzVkMTEwNi42ODhkNDkuNjk2ZDEwMDAuNjEzZDQ5LjY5NmQ5NTQuMjU3ZDQ5LjY5NmQ5MzIuNTQxZDU1LjEyNWQ4NTEuOTQxZDU1Ljk2ZDg0OC4xODJkNjIuMjI1ZDg0OS40MzVkNjQuNzNkODQ5Ljg1M2Q3MC45OTVkODUxLjEwNmQ3NC4zMzZkODQ3Ljc2NWQ1Mi42MTlkNzU0LjIxOGQzMC4wNjhkNzU0LjIxOGQxMy4zNjNkNzYzLjgyM2QtMC44MzVkNzgzLjg2OWQtMC44MzVkNzc4Ljg1OGQtMC44MzVkNzQyLjk0MmQ1Mi4yMDJkNzExLjIwM2QxMDAuNjQ2ZDY4MS45N2QxMzcuMzk2ZDY4NC4wNThkMTM2Ljk3OGQ3MTAuNzg2ZDEzNy44MTRkNzQ1LjQ0OGQxOTQuMTkyZDcxMC43ODZkMjU4LjA4OGQ3MTAuNzg2ZDI1OS43NThkNzExLjYyMWQyNDkuNzM1ZDcyOC43NDNkMjUxLjQwNmQ3MzAuNDE0ZDI1OC41MDVkNzI5LjU3OWQyNzcuNzE2ZDcyNC4xNWQyOTQuMDAzZDcxOS41NTZkMzA0LjAyNmQ3MTkuNTU2ZDMzOS45NDFkNzE5LjU1NmQzNjcuOTIxZDc3My44NDZkMzkxLjcyNWQ4MjAuMjAyZDM5MS43MjVkODU5Ljg3NmQzOTEuNzI1ZDkzNS4wNDdkMzUxLjYzNGQ5ODAuNTY3ZDMwOS40NTVkMTAyOS4wMTFkMjM1LjUzNmQxMDI5LjAxMWQxODYuNjc1ZDEwMjkuMDExZDE0Mi44MjVkMTAwNC43ODlkMTM5LjkwMmQxMDE5LjgyM2QxMzkuOTAyZDEwMjkuODQ2ZDEzOS45MDJkMTEyMC40NjlkMTQ2LjU4NGQxMTI4LjQwNGQyMTUuNDkxZDExNjguNDk1ZDIwMC4wMzlkMTE3Ny42ODNkMTYyLjg3MWQxMTc3LjI2NWQxMDUuMjM5ZDExOTQuMzg4ZDMyLjE1NmQxMjE2LjEwNGQxMi4xMWQxMjE5LjQ0NWhSM2Q0MTkuNzA2UjRkMzkxLjcyNVI1ZC0xLjI1MlI2ZDM0Mi4wMjlSN2QtMTk1LjQ0NVI4ZDM0My4yODJSOWQwUjEwZDI4My45OFIxMWkxMTJSMTJkLTEuMjUyUjEzZDQxOS43MDZSMTRhaTFpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkzaTNpMmkzaTNpMmkyaTNpMmkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2hnOjIyNG9SMWQ3NDAuMDE5UjJhZDMwMS4xMDJkOTM2LjcxN2QzMTMuNjMxZDk0My4zOTlkMzE5LjQ3N2Q5NTQuMjU3ZDMxOS40NzdkOTc3LjIyNmQzMTkuNDc3ZDEwMjMuNTgyZDI2Ny42OTNkMTAyMy41ODJkMjQ2LjM5NGQxMDIzLjU4MmQyMzUuOTU0ZDEwMDguOTY1ZDIzMi42MTNkMTAwNC4zNzFkMjIwLjA4NGQ5NzUuNTU2ZDE5MS4yNjlkMTAyNS42N2Q5Ni44ODdkMTAyNS42N2QyMS43MTZkMTAyNS42N2QyMS43MTZkOTY3LjIwM2QyMS43MTZkOTU0LjI1N2QyNy4xNDVkOTQyLjE0NmQ0MC4wOTFkOTM3Ljk3ZDU0LjcwN2Q5MzAuMDM1ZDQ1LjUyZDkyNy45NDdkMzguNDJkOTIzLjM1M2Q0NS45MzhkOTE5LjE3N2Q1OC4wNDhkOTA2LjIzMWQ5Mi43MTFkODk3LjA0NGQ3Ny42NzZkODkzLjI4NWQ3OC4wOTRkODkyLjQ1ZDEwMy45ODZkODc3LjQxNWQyMDQuMjE1ZDg0MC4yNDdkMjA1LjQ2OGQ4MDMuMDc5ZDIwNy45NzNkNzMyLjA4NGQxNjcuMDQ3ZDczMi4wODRkMTQxLjU3MmQ3MzIuMDg0ZDEwNC44MjJkNzUxLjcxMmQ2My44OTVkNzczLjQyOWQ2My44OTVkNzk1Ljk4ZDY3LjY1NGQ4MDAuOTkxZDc2LjQyNGQ4MDAuOTkxZDkxLjQ1OGQ4MDAuOTkxZDExNC44NDVkNzk1Ljk4ZDkzLjk2NGQ4MjAuNjE5ZDg1LjYxMWQ4MjYuODg0ZDY5LjMyNGQ4MzguOTk1ZDQ1LjkzOGQ4MzguNTc3ZDI0LjIyMWQ4MzguMTU5ZDE5LjIxZDgyNS4yMTNkMTkuMjFkNzcwLjA4OGQ4My4xMDZkNzM2LjI2MWQxMzUuNzI1ZDcwOC4yOGQxOTYuNjk4ZDcwOC4yOGQyNzguNTUxZDcwOC4yOGQyNzguNTUxZDc5NS41NjJkMjc4LjU1MWQ4MTEuNDMyZDI3Ni4wNDVkODQzLjE3MWQyNzMuNTM5ZDg3NC45MWQyNzMuNTM5ZDg5MC43NzlkMjczLjUzOWQ5ODUuOTk2ZDI4OS44MjdkOTg2LjQxNGQzMDEuNTJkOTc2LjM5MWQzMDcuNzg0ZDk1NC42NzVkMzAxLjEwMmQ5MzYuNzE3ZDIwNC4yMTVkODc4LjY2OGQxMDAuNjQ2ZDg4Ny40MzhkMTAwLjY0NmQ5NTYuMzQ1ZDkxLjQ1OGQ5NjEuMzU3ZDczLjkxOGQ5NzMuMDVkODguNTM1ZDk3Mi42MzJkMTAzLjk4NmQ5NzMuMDVkOTguNTU3ZDk3Ni4zOTFkOTQuMzgxZDk4MS40MDJkMTAxLjQ4MWQ5ODEuNDAyZDExMC4yNTFkOTgyLjY1NWQxMTkuMDIxZDk5My4wOTZkMTMyLjM4NGQ5OTMuMDk2ZDE2NC45NTlkOTkzLjA5NmQxODUuMDA0ZDk3NC4zMDNkMjA1LjA1ZDk1NS41MWQyMDUuMDVkOTIzLjM1M2QyMDUuMDVkODkyLjg2N2QyMDUuMDVkODg2LjE4NWQyMDQuMjE1ZDg3OC42NjhkMjM3LjIwN2Q2MjkuMzVkMTAxLjg5OGQ1NDEuNjVkMTAxLjg5OGQ1MDkuNDk0ZDEwMS44OThkNTA3LjQwNmQxMjIuNTdkNDg5LjY1N2QxNDMuMjQzZDQ3MS45MDhkMTQ2LjE2NmQ0NzEuOTA4ZDE2NS4zNzZkNDcxLjkwOGQxOTguMzY4ZDU0MC4zOThkMjAwLjQ1NmQ1NDQuOTkxZDIzNy4yMDdkNjI5LjM1aFIzZDMzOC42ODhSNGQzMTkuNDc3UjVkMTkuMjFSNmQ1NTIuMDkxUjdkLTEuNjdSOGQ1MzIuODhSOWQwUjEwZDI4My45OFIxMWkyMjRSMTJkMTkuMjFSMTNkMzM4LjY4OFIxNGFpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTJpM2kyaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTJpMmkyaTFpM2kzaTJpMmkzaTNpM2kzaTNpMmkzaTFpM2kzaTNpM2kzaGdoeTg6Zm9udE5hbWV5MTA6RnJlZWJvb3Rlcmc"}];
flash.display.DisplayObject.GRAPHICS_INVALID = 2;
flash.display.DisplayObject.MATRIX_INVALID = 4;
flash.display.DisplayObject.MATRIX_CHAIN_INVALID = 8;
flash.display.DisplayObject.MATRIX_OVERRIDDEN = 16;
flash.display.DisplayObject.TRANSFORM_INVALID = 32;
flash.display.DisplayObject.BOUNDS_INVALID = 64;
flash.display.DisplayObject.RENDER_VALIDATE_IN_PROGRESS = 1024;
flash.display.DisplayObject.ALL_RENDER_FLAGS = 98;
flash.Lib.HTML_ACCELEROMETER_EVENT_TYPE = "devicemotion";
flash.Lib.HTML_ORIENTATION_EVENT_TYPE = "orientationchange";
flash.Lib.DEFAULT_HEIGHT = 500;
flash.Lib.DEFAULT_WIDTH = 500;
flash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseover","mouseout","mousewheel","dblclick","click"];
flash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES = ["mousedown","mousemove","mouseup"];
flash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize","blur","focus"];
flash.Lib.NME_IDENTIFIER = "haxe:jeash";
flash.Lib.VENDOR_HTML_TAG = "data-";
flash.Lib.starttime = haxe.Timer.stamp();
flash.display._BitmapData.MinstdGenerator.a = 16807;
flash.display._BitmapData.MinstdGenerator.m = -2147483648 - 1;
flash.display.BitmapDataChannel.ALPHA = 8;
flash.display.BitmapDataChannel.BLUE = 4;
flash.display.BitmapDataChannel.GREEN = 2;
flash.display.BitmapDataChannel.RED = 1;
flash.display.Graphics.TILE_SCALE = 1;
flash.display.Graphics.TILE_ROTATION = 2;
flash.display.Graphics.TILE_RGB = 4;
flash.display.Graphics.TILE_ALPHA = 8;
flash.display.Graphics.TILE_TRANS_2x2 = 16;
flash.display.Graphics.TILE_BLEND_NORMAL = 0;
flash.display.Graphics.TILE_BLEND_ADD = 65536;
flash.display.Graphics.BMP_REPEAT = 16;
flash.display.Graphics.BMP_SMOOTH = 65536;
flash.display.Graphics.CORNER_ROUND = 0;
flash.display.Graphics.CORNER_MITER = 4096;
flash.display.Graphics.CORNER_BEVEL = 8192;
flash.display.Graphics.CURVE = 2;
flash.display.Graphics.END_NONE = 0;
flash.display.Graphics.END_ROUND = 256;
flash.display.Graphics.END_SQUARE = 512;
flash.display.Graphics.LINE = 1;
flash.display.Graphics.MOVE = 0;
flash.display.Graphics.NME_MAX_DIM = 5000;
flash.display.Graphics.PIXEL_HINTING = 16384;
flash.display.Graphics.RADIAL = 1;
flash.display.Graphics.SCALE_HORIZONTAL = 2;
flash.display.Graphics.SCALE_NONE = 0;
flash.display.Graphics.SCALE_NORMAL = 3;
flash.display.Graphics.SCALE_VERTICAL = 1;
flash.display.Graphics.SPREAD_REPEAT = 2;
flash.display.Graphics.SPREAD_REFLECT = 4;
flash.display.GraphicsPathCommand.LINE_TO = 2;
flash.display.GraphicsPathCommand.MOVE_TO = 1;
flash.display.GraphicsPathCommand.CURVE_TO = 3;
flash.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
flash.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
flash.display.GraphicsPathCommand.NO_OP = 0;
flash.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
flash.events.Event.ACTIVATE = "activate";
flash.events.Event.ADDED = "added";
flash.events.Event.ADDED_TO_STAGE = "addedToStage";
flash.events.Event.CANCEL = "cancel";
flash.events.Event.CHANGE = "change";
flash.events.Event.CLOSE = "close";
flash.events.Event.COMPLETE = "complete";
flash.events.Event.CONNECT = "connect";
flash.events.Event.CONTEXT3D_CREATE = "context3DCreate";
flash.events.Event.DEACTIVATE = "deactivate";
flash.events.Event.ENTER_FRAME = "enterFrame";
flash.events.Event.ID3 = "id3";
flash.events.Event.INIT = "init";
flash.events.Event.MOUSE_LEAVE = "mouseLeave";
flash.events.Event.OPEN = "open";
flash.events.Event.REMOVED = "removed";
flash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
flash.events.Event.RENDER = "render";
flash.events.Event.RESIZE = "resize";
flash.events.Event.SCROLL = "scroll";
flash.events.Event.SELECT = "select";
flash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
flash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
flash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
flash.events.Event.UNLOAD = "unload";
flash.events.Event.SOUND_COMPLETE = "soundComplete";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
flash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
flash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
flash.events.MouseEvent.MOUSE_OUT = "mouseOut";
flash.events.MouseEvent.MOUSE_OVER = "mouseOver";
flash.events.MouseEvent.MOUSE_UP = "mouseUp";
flash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
flash.events.MouseEvent.RIGHT_CLICK = "rightClick";
flash.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
flash.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
flash.events.MouseEvent.ROLL_OUT = "rollOut";
flash.events.MouseEvent.ROLL_OVER = "rollOver";
flash.display.Stage.NAME = "Stage";
flash.display.Stage.nmeAcceleration = { x : 0.0, y : 1.0, z : 0.0};
flash.display.Stage.OrientationPortrait = 1;
flash.display.Stage.OrientationPortraitUpsideDown = 2;
flash.display.Stage.OrientationLandscapeRight = 3;
flash.display.Stage.OrientationLandscapeLeft = 4;
flash.display.Stage.DEFAULT_FRAMERATE = 0.0;
flash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
flash.display.Stage.nmeMouseChanges = [flash.events.MouseEvent.MOUSE_OUT,flash.events.MouseEvent.MOUSE_OVER,flash.events.MouseEvent.ROLL_OUT,flash.events.MouseEvent.ROLL_OVER];
flash.display.Stage.nmeTouchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
flash.display.StageQuality.BEST = "best";
flash.display.StageQuality.HIGH = "high";
flash.display.StageQuality.MEDIUM = "medium";
flash.display.StageQuality.LOW = "low";
flash.errors.Error.DEFAULT_TO_STRING = "Error";
flash.events.TextEvent.LINK = "link";
flash.events.TextEvent.TEXT_INPUT = "textInput";
flash.events.ErrorEvent.ERROR = "error";
flash.events.Listener.sIDs = 1;
flash.events.EventPhase.CAPTURING_PHASE = 0;
flash.events.EventPhase.AT_TARGET = 1;
flash.events.EventPhase.BUBBLING_PHASE = 2;
flash.events.FocusEvent.FOCUS_IN = "focusIn";
flash.events.FocusEvent.FOCUS_OUT = "focusOut";
flash.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
flash.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
flash.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
flash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
flash.events.IOErrorEvent.IO_ERROR = "ioError";
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";
flash.events.ProgressEvent.PROGRESS = "progress";
flash.events.ProgressEvent.SOCKET_DATA = "socketData";
flash.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
flash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
flash.events.TouchEvent.TOUCH_END = "touchEnd";
flash.events.TouchEvent.TOUCH_MOVE = "touchMove";
flash.events.TouchEvent.TOUCH_OUT = "touchOut";
flash.events.TouchEvent.TOUCH_OVER = "touchOver";
flash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
flash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
flash.events.TouchEvent.TOUCH_TAP = "touchTap";
flash.filters.DropShadowFilter.DEGREES_FULL_RADIUS = 360.0;
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
flash.media.Sound.EXTENSION_MP3 = "mp3";
flash.media.Sound.EXTENSION_OGG = "ogg";
flash.media.Sound.EXTENSION_WAV = "wav";
flash.media.Sound.EXTENSION_AAC = "aac";
flash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
flash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
flash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
flash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
flash.net.URLRequestMethod.DELETE = "DELETE";
flash.net.URLRequestMethod.GET = "GET";
flash.net.URLRequestMethod.HEAD = "HEAD";
flash.net.URLRequestMethod.OPTIONS = "OPTIONS";
flash.net.URLRequestMethod.POST = "POST";
flash.net.URLRequestMethod.PUT = "PUT";
flash.system.ApplicationDomain.currentDomain = new flash.system.ApplicationDomain(null);
flash.system.Capabilities.hasAccessibility = false;
flash.system.SecurityDomain.currentDomain = new flash.system.SecurityDomain();
flash.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
flash.text.Font.DEFAULT_FONT_SCALE = 9.0;
flash.text.Font.DEFAULT_FONT_NAME = "Bitstream_Vera_Sans";
flash.text.Font.DEFAULT_CLASS_NAME = "flash.text.Font";
flash.text.Font.nmeRegisteredFonts = new Array();
flash.text.TextField.mDefaultFont = "Bitstream_Vera_Sans";
flash.text.FontInstance.mSolidFonts = new haxe.ds.StringMap();
flash.text.TextFieldAutoSize.CENTER = "CENTER";
flash.text.TextFieldAutoSize.LEFT = "LEFT";
flash.text.TextFieldAutoSize.NONE = "NONE";
flash.text.TextFieldAutoSize.RIGHT = "RIGHT";
flash.text.TextFieldType.DYNAMIC = "DYNAMIC";
flash.text.TextFieldType.INPUT = "INPUT";
flash.ui.Keyboard.NUMBER_0 = 48;
flash.ui.Keyboard.NUMBER_1 = 49;
flash.ui.Keyboard.NUMBER_2 = 50;
flash.ui.Keyboard.NUMBER_3 = 51;
flash.ui.Keyboard.NUMBER_4 = 52;
flash.ui.Keyboard.NUMBER_5 = 53;
flash.ui.Keyboard.NUMBER_6 = 54;
flash.ui.Keyboard.NUMBER_7 = 55;
flash.ui.Keyboard.NUMBER_8 = 56;
flash.ui.Keyboard.NUMBER_9 = 57;
flash.ui.Keyboard.A = 65;
flash.ui.Keyboard.B = 66;
flash.ui.Keyboard.C = 67;
flash.ui.Keyboard.D = 68;
flash.ui.Keyboard.E = 69;
flash.ui.Keyboard.F = 70;
flash.ui.Keyboard.G = 71;
flash.ui.Keyboard.H = 72;
flash.ui.Keyboard.I = 73;
flash.ui.Keyboard.J = 74;
flash.ui.Keyboard.K = 75;
flash.ui.Keyboard.L = 76;
flash.ui.Keyboard.M = 77;
flash.ui.Keyboard.N = 78;
flash.ui.Keyboard.O = 79;
flash.ui.Keyboard.P = 80;
flash.ui.Keyboard.Q = 81;
flash.ui.Keyboard.R = 82;
flash.ui.Keyboard.S = 83;
flash.ui.Keyboard.T = 84;
flash.ui.Keyboard.U = 85;
flash.ui.Keyboard.V = 86;
flash.ui.Keyboard.W = 87;
flash.ui.Keyboard.X = 88;
flash.ui.Keyboard.Y = 89;
flash.ui.Keyboard.Z = 90;
flash.ui.Keyboard.NUMPAD_0 = 96;
flash.ui.Keyboard.NUMPAD_1 = 97;
flash.ui.Keyboard.NUMPAD_2 = 98;
flash.ui.Keyboard.NUMPAD_3 = 99;
flash.ui.Keyboard.NUMPAD_4 = 100;
flash.ui.Keyboard.NUMPAD_5 = 101;
flash.ui.Keyboard.NUMPAD_6 = 102;
flash.ui.Keyboard.NUMPAD_7 = 103;
flash.ui.Keyboard.NUMPAD_8 = 104;
flash.ui.Keyboard.NUMPAD_9 = 105;
flash.ui.Keyboard.NUMPAD_MULTIPLY = 106;
flash.ui.Keyboard.NUMPAD_ADD = 107;
flash.ui.Keyboard.NUMPAD_ENTER = 108;
flash.ui.Keyboard.NUMPAD_SUBTRACT = 109;
flash.ui.Keyboard.NUMPAD_DECIMAL = 110;
flash.ui.Keyboard.NUMPAD_DIVIDE = 111;
flash.ui.Keyboard.F1 = 112;
flash.ui.Keyboard.F2 = 113;
flash.ui.Keyboard.F3 = 114;
flash.ui.Keyboard.F4 = 115;
flash.ui.Keyboard.F5 = 116;
flash.ui.Keyboard.F6 = 117;
flash.ui.Keyboard.F7 = 118;
flash.ui.Keyboard.F8 = 119;
flash.ui.Keyboard.F9 = 120;
flash.ui.Keyboard.F10 = 121;
flash.ui.Keyboard.F11 = 122;
flash.ui.Keyboard.F12 = 123;
flash.ui.Keyboard.F13 = 124;
flash.ui.Keyboard.F14 = 125;
flash.ui.Keyboard.F15 = 126;
flash.ui.Keyboard.BACKSPACE = 8;
flash.ui.Keyboard.TAB = 9;
flash.ui.Keyboard.ENTER = 13;
flash.ui.Keyboard.SHIFT = 16;
flash.ui.Keyboard.CONTROL = 17;
flash.ui.Keyboard.CAPS_LOCK = 18;
flash.ui.Keyboard.ESCAPE = 27;
flash.ui.Keyboard.SPACE = 32;
flash.ui.Keyboard.PAGE_UP = 33;
flash.ui.Keyboard.PAGE_DOWN = 34;
flash.ui.Keyboard.END = 35;
flash.ui.Keyboard.HOME = 36;
flash.ui.Keyboard.LEFT = 37;
flash.ui.Keyboard.RIGHT = 39;
flash.ui.Keyboard.UP = 38;
flash.ui.Keyboard.DOWN = 40;
flash.ui.Keyboard.INSERT = 45;
flash.ui.Keyboard.DELETE = 46;
flash.ui.Keyboard.NUMLOCK = 144;
flash.ui.Keyboard.BREAK = 19;
flash.ui.Keyboard.SEMICOLON = 186;
flash.ui.Keyboard.EQUAL = 187;
flash.ui.Keyboard.COMMA = 188;
flash.ui.Keyboard.MINUS = 189;
flash.ui.Keyboard.PERIOD = 190;
flash.ui.Keyboard.SLASH = 191;
flash.ui.Keyboard.BACKQUOTE = 192;
flash.ui.Keyboard.LEFTBRACKET = 219;
flash.ui.Keyboard.BACKSLASH = 220;
flash.ui.Keyboard.RIGHTBRACKET = 221;
flash.ui.Keyboard.DOM_VK_CANCEL = 3;
flash.ui.Keyboard.DOM_VK_HELP = 6;
flash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
flash.ui.Keyboard.DOM_VK_TAB = 9;
flash.ui.Keyboard.DOM_VK_CLEAR = 12;
flash.ui.Keyboard.DOM_VK_RETURN = 13;
flash.ui.Keyboard.DOM_VK_ENTER = 14;
flash.ui.Keyboard.DOM_VK_SHIFT = 16;
flash.ui.Keyboard.DOM_VK_CONTROL = 17;
flash.ui.Keyboard.DOM_VK_ALT = 18;
flash.ui.Keyboard.DOM_VK_PAUSE = 19;
flash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
flash.ui.Keyboard.DOM_VK_ESCAPE = 27;
flash.ui.Keyboard.DOM_VK_SPACE = 32;
flash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
flash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
flash.ui.Keyboard.DOM_VK_END = 35;
flash.ui.Keyboard.DOM_VK_HOME = 36;
flash.ui.Keyboard.DOM_VK_LEFT = 37;
flash.ui.Keyboard.DOM_VK_UP = 38;
flash.ui.Keyboard.DOM_VK_RIGHT = 39;
flash.ui.Keyboard.DOM_VK_DOWN = 40;
flash.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
flash.ui.Keyboard.DOM_VK_INSERT = 45;
flash.ui.Keyboard.DOM_VK_DELETE = 46;
flash.ui.Keyboard.DOM_VK_0 = 48;
flash.ui.Keyboard.DOM_VK_1 = 49;
flash.ui.Keyboard.DOM_VK_2 = 50;
flash.ui.Keyboard.DOM_VK_3 = 51;
flash.ui.Keyboard.DOM_VK_4 = 52;
flash.ui.Keyboard.DOM_VK_5 = 53;
flash.ui.Keyboard.DOM_VK_6 = 54;
flash.ui.Keyboard.DOM_VK_7 = 55;
flash.ui.Keyboard.DOM_VK_8 = 56;
flash.ui.Keyboard.DOM_VK_9 = 57;
flash.ui.Keyboard.DOM_VK_SEMICOLON = 59;
flash.ui.Keyboard.DOM_VK_EQUALS = 61;
flash.ui.Keyboard.DOM_VK_A = 65;
flash.ui.Keyboard.DOM_VK_B = 66;
flash.ui.Keyboard.DOM_VK_C = 67;
flash.ui.Keyboard.DOM_VK_D = 68;
flash.ui.Keyboard.DOM_VK_E = 69;
flash.ui.Keyboard.DOM_VK_F = 70;
flash.ui.Keyboard.DOM_VK_G = 71;
flash.ui.Keyboard.DOM_VK_H = 72;
flash.ui.Keyboard.DOM_VK_I = 73;
flash.ui.Keyboard.DOM_VK_J = 74;
flash.ui.Keyboard.DOM_VK_K = 75;
flash.ui.Keyboard.DOM_VK_L = 76;
flash.ui.Keyboard.DOM_VK_M = 77;
flash.ui.Keyboard.DOM_VK_N = 78;
flash.ui.Keyboard.DOM_VK_O = 79;
flash.ui.Keyboard.DOM_VK_P = 80;
flash.ui.Keyboard.DOM_VK_Q = 81;
flash.ui.Keyboard.DOM_VK_R = 82;
flash.ui.Keyboard.DOM_VK_S = 83;
flash.ui.Keyboard.DOM_VK_T = 84;
flash.ui.Keyboard.DOM_VK_U = 85;
flash.ui.Keyboard.DOM_VK_V = 86;
flash.ui.Keyboard.DOM_VK_W = 87;
flash.ui.Keyboard.DOM_VK_X = 88;
flash.ui.Keyboard.DOM_VK_Y = 89;
flash.ui.Keyboard.DOM_VK_Z = 90;
flash.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
flash.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
flash.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
flash.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
flash.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
flash.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
flash.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
flash.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
flash.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
flash.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
flash.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
flash.ui.Keyboard.DOM_VK_MULTIPLY = 106;
flash.ui.Keyboard.DOM_VK_ADD = 107;
flash.ui.Keyboard.DOM_VK_SEPARATOR = 108;
flash.ui.Keyboard.DOM_VK_SUBTRACT = 109;
flash.ui.Keyboard.DOM_VK_DECIMAL = 110;
flash.ui.Keyboard.DOM_VK_DIVIDE = 111;
flash.ui.Keyboard.DOM_VK_F1 = 112;
flash.ui.Keyboard.DOM_VK_F2 = 113;
flash.ui.Keyboard.DOM_VK_F3 = 114;
flash.ui.Keyboard.DOM_VK_F4 = 115;
flash.ui.Keyboard.DOM_VK_F5 = 116;
flash.ui.Keyboard.DOM_VK_F6 = 117;
flash.ui.Keyboard.DOM_VK_F7 = 118;
flash.ui.Keyboard.DOM_VK_F8 = 119;
flash.ui.Keyboard.DOM_VK_F9 = 120;
flash.ui.Keyboard.DOM_VK_F10 = 121;
flash.ui.Keyboard.DOM_VK_F11 = 122;
flash.ui.Keyboard.DOM_VK_F12 = 123;
flash.ui.Keyboard.DOM_VK_F13 = 124;
flash.ui.Keyboard.DOM_VK_F14 = 125;
flash.ui.Keyboard.DOM_VK_F15 = 126;
flash.ui.Keyboard.DOM_VK_F16 = 127;
flash.ui.Keyboard.DOM_VK_F17 = 128;
flash.ui.Keyboard.DOM_VK_F18 = 129;
flash.ui.Keyboard.DOM_VK_F19 = 130;
flash.ui.Keyboard.DOM_VK_F20 = 131;
flash.ui.Keyboard.DOM_VK_F21 = 132;
flash.ui.Keyboard.DOM_VK_F22 = 133;
flash.ui.Keyboard.DOM_VK_F23 = 134;
flash.ui.Keyboard.DOM_VK_F24 = 135;
flash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
flash.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
flash.ui.Keyboard.DOM_VK_COMMA = 188;
flash.ui.Keyboard.DOM_VK_PERIOD = 190;
flash.ui.Keyboard.DOM_VK_SLASH = 191;
flash.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
flash.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
flash.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
flash.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
flash.ui.Keyboard.DOM_VK_QUOTE = 222;
flash.ui.Keyboard.DOM_VK_META = 224;
flash.ui.Keyboard.DOM_VK_KANA = 21;
flash.ui.Keyboard.DOM_VK_HANGUL = 21;
flash.ui.Keyboard.DOM_VK_JUNJA = 23;
flash.ui.Keyboard.DOM_VK_FINAL = 24;
flash.ui.Keyboard.DOM_VK_HANJA = 25;
flash.ui.Keyboard.DOM_VK_KANJI = 25;
flash.ui.Keyboard.DOM_VK_CONVERT = 28;
flash.ui.Keyboard.DOM_VK_NONCONVERT = 29;
flash.ui.Keyboard.DOM_VK_ACEPT = 30;
flash.ui.Keyboard.DOM_VK_MODECHANGE = 31;
flash.ui.Keyboard.DOM_VK_SELECT = 41;
flash.ui.Keyboard.DOM_VK_PRINT = 42;
flash.ui.Keyboard.DOM_VK_EXECUTE = 43;
flash.ui.Keyboard.DOM_VK_SLEEP = 95;
flash.utils.Endian.BIG_ENDIAN = "bigEndian";
flash.utils.Endian.LITTLE_ENDIAN = "littleEndian";
flash.utils.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
motion.actuators.SimpleActuator.actuators = new Array();
motion.actuators.SimpleActuator.actuatorsLength = 0;
motion.actuators.SimpleActuator.addedEvent = false;
motion.Actuate.defaultActuator = motion.actuators.SimpleActuator;
motion.Actuate.defaultEase = motion.easing.Expo.get_easeOut();
motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
nme.AssetData.className = new haxe.ds.StringMap();
nme.AssetData.library = new haxe.ds.StringMap();
nme.AssetData.path = new haxe.ds.StringMap();
nme.AssetData.type = new haxe.ds.StringMap();
nme.AssetData.initialized = false;
openfl.Assets.cachedBitmapData = new haxe.ds.StringMap();
openfl.Assets.initialized = false;
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
piratepig.PiratePigGame.NUM_COLUMNS = 8;
piratepig.PiratePigGame.NUM_ROWS = 8;
piratepig.PiratePigGame.tileImages = ["images/game_bear.png","images/game_bunny_02.png","images/game_carrot.png","images/game_lemon.png","images/game_panda.png","images/game_piratePig.png"];
ApplicationMain.main();
})();
