function $__deepClone(obj) {
  var key, i, result;
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    result = [];
    i = obj.length;
    while ( i-- ) {
      if (obj.hasOwnProperty(i)) {
        if (typeof obj[i] === 'object') {
          result[i] = $__deepClone(obj[i]);
        } else {
          result[i] = obj[i];
        }
      }
    }
  } else {
    result = {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[ key ] === 'object') {
          result[key] = $__deepClone(obj[key]);
        }else {
          result[key] = obj[key];
        }
      }
    }
  }
  return result;
}

function $__isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]"
}

function $__observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function(key) {
    $__defineReactive(data, key, data[key]);
  });
};

function $__defineReactive(data, key, val) {
  $__observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      $__runtime.cubeDataDirty = false
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      $__runtime.cubeDataDirty = true;
      val = newVal;
    }
  });
}

const LifecycleHooksMap = {
  'created': 'onLoad',
  'mounted': 'onReady',
  'destroyed': 'onUnload'
};

function $__runtime(vueContext, type) {
  let cubeData = $__deepClone($__isFunction(vueContext.data) ? vueContext.data.call(vueContext.methods) : vueContext.data)
  const cube = {
    name: vueContext.name || '',
    template: vueContext.template || '',
    data: cubeData
  };

  $__observe(cubeData);

  Object.keys(vueContext).map(method => {
    if (['name', 'data', 'methods', 'components', 'template'].indexOf(method) !== -1) {
      return
    }
    if (['created'].indexOf(method) !== -1) {
      cube[LifecycleHooksMap[method]] = function() {
        cubeData.$cube = this;
        vueContext[method].bind(cubeData)
      }
      return
    }
    cube[LifecycleHooksMap[method] ? LifecycleHooksMap[method] : method] = vueContext[method].bind(cubeData)
  })

  vueContext.methods && Object.keys(vueContext.methods).map(method => {
    cubeData[method] = vueContext.methods[method]
    cube[method] = function() {
      vueContext.methods[method].call(cubeData, ...arguments)
      if ($__runtime.cubeDataDirty) {
        this.setTimeout(() => {
          this.setData(cubeData);
        }, 0)
      }
    }
  })

  if (vueContext.components && vueContext.components.length > 0) {
    cube.components = vueContext.components.map((component) => {
      return $__runtime(component, 'component');
    });
  }

  return cube;
}

$__runtime.cubeDataDirty = false;

function $__inject(vueContext) {
  return $__runtime(vueContext, 'page')
}