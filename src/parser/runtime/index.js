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

function $__inject(vueContext) {
  let cubeDataDirty = false;
  let cubeData = $__deepClone(vueContext.data.call(vueContext.methods))
  const cube = { data: cubeData };
  const LifecycleHooksMap = {
    'created': 'onLoad',
    'mounted': 'onReady',
    'destroyed': 'onUnload'
  }

  function observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(function(key) {
      defineReactive(data, key, data[key]);
    });
  };

  function defineReactive(data, key, val) {
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        cubeDataDirty = false
        return val;
      },
      set: function(newVal) {
        if (val === newVal) return;
        cubeDataDirty = true;
        val = newVal;
      }
    });
  }

  observe(cubeData);

  Object.keys(vueContext).map(method => {
    if (['data', 'methods'].indexOf(method) !== -1) {
      return
    }
    cube[LifecycleHooksMap[method] ? LifecycleHooksMap[method] : method] = vueContext[method].bind(cubeData)
  })

  Object.keys(vueContext.methods).map(method => {
    cubeData[method] = vueContext.methods[method]
    cube[method] = function() {
      vueContext.methods[method].call(cubeData, ...arguments)
      if (cubeDataDirty) {
        this.setTimeout(() => {
          this.setData(cubeData);
        }, 0)
      }
    }
  })

  return cube;
}