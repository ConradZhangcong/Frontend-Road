let fn = function (set) {
  let This = this;
  let o = {
    /*
    elem:"css selector" //自动显示到dom，并以此dom大小为显示大小
      //或者配置显示大小，手动把waveviewObj.elem显示到别的地方
    ,width:0 //显示宽度
    ,height:0 //显示高度
  	
    以上配置二选一
    */

    scale: 2, //缩放系数，应为正整数，使用2(3? no!)倍宽高进行绘制，避免移动端绘制模糊
    speed: 8, //移动速度系数，越大越快

    lineWidth: 3, //线条基础粗细

    //渐变色配置：[位置，css颜色，...] 位置: 取值0.0-1.0之间
    linear1: [
      0,
      "rgba(150,96,238,1)",
      0.2,
      "rgba(170,79,249,1)",
      1,
      "rgba(53,199,253,1)",
    ], //线条渐变色1，从左到右
    linear2: [0, "rgba(209,130,255,0.6)", 1, "rgba(53,199,255,0.6)"], //线条渐变色2，从左到右
    linear3: [0, "rgba(209,130,255,0.6)", 1, "rgba(53,199,255,0.6)"], //线条渐变色3，从左到右
    linearBg: [0, "rgba(255,255,255,0.2)", 1, "rgba(54,197,252,0.2)"], //背景渐变色，从上到下
  };
  for (let k in set) {
    o[k] = set[k];
  }
  This.set = set = o;

  let elem = set.elem;
  if (elem) {
    if (typeof elem == "string") {
      elem = document.querySelector(elem);
    } else if (elem.length) {
      elem = elem[0];
    }
  }
  if (elem) {
    set.width = elem.offsetWidth;
    set.height = elem.offsetHeight;
  }

  let scale = set.scale;
  let width = set.width * scale;
  let height = set.height * scale;

  let thisElem = (This.elem = document.createElement("div"));
  let lowerCss = [
    "",
    "transform-origin:0 0;",
    "transform:scale(" + 1 / scale + ");",
  ];
  thisElem.innerHTML =
    '<div style="width:' +
    set.width +
    "px;height:" +
    set.height +
    'px;overflow:hidden"><div style="width:' +
    width +
    "px;height:" +
    height +
    "px;" +
    lowerCss.join("-webkit-") +
    lowerCss.join("-ms-") +
    lowerCss.join("-moz-") +
    lowerCss.join("") +
    '"><canvas/></div></div>';

  let canvas = (This.canvas = thisElem.querySelector("canvas"));
  let ctx = (This.ctx = canvas.getContext("2d"));
  canvas.width = width;
  canvas.height = height;

  This.linear1 = This.genLinear(ctx, width, set.linear1);
  This.linear2 = This.genLinear(ctx, width, set.linear2);
  This.linearBg = This.genLinear(ctx, height, set.linearBg, true);

  if (elem) {
    elem.innerHTML = "";
    elem.appendChild(thisElem);
  }

  This._phase = 0;
};

let WaveView = function (set) {
  return new fn(set);
};

fn.prototype = WaveView.prototype = {
  genLinear: function (ctx, size, colors, top) {
    let rtv = ctx.createLinearGradient(0, 0, top ? 0 : size, top ? size : 0);
    for (let i = 0; i < colors.length; ) {
      rtv.addColorStop(colors[i++], colors[i++]);
    }
    return rtv;
  },
  genPath: function (frequency, amplitude, phase) {
    //曲线生成算法参考 https://github.com/HaloMartin/MCVoiceWave/blob/f6dc28975fbe0f7fc6cc4dbc2e61b0aa5574e9bc/MCVoiceWave/MCVoiceWaveView.m#L268
    let rtv = [];
    let This = this,
      set = This.set;
    let scale = set.scale;
    let width = set.width * scale;
    let maxAmplitude = (set.height * scale) / 2;

    for (let x = 0; x < width; x += scale) {
      let scaling = (1 + Math.cos(Math.PI + (x / width) * 2 * Math.PI)) / 2;
      let y =
        scaling *
          maxAmplitude *
          amplitude *
          Math.sin(2 * Math.PI * (x / width) * frequency + phase) +
        maxAmplitude;
      rtv.push(y);
    }
    return rtv;
  },
  input: function (pcmData, powerLevel, sampleRate) {
    let This = this,
      set = This.set;
    let ctx = This.ctx;
    let scale = set.scale;
    let width = set.width * scale;
    let height = set.height * scale;

    let speedx = (set.speed * pcmData.length) / sampleRate;
    let phase = (This._phase -= speedx); //位移速度
    let amplitude = powerLevel / 100;
    let path1 = This.genPath(2, amplitude, phase);
    let path2 = This.genPath(1.8, amplitude, phase + speedx * 5);
    let path3 = This.genPath(1.6, amplitude, phase + speedx * 10);

    //开始绘制图形
    ctx.clearRect(0, 0, width, height);

    //绘制包围背景
    ctx.beginPath();

    for (var i = 0, x = 0; x < width; i++, x += scale) {
      if (x == 0) {
        ctx.moveTo(x, path1[i]);
      } else {
        ctx.lineTo(x, path1[i]);
      }
    }
    i--;
    for (var x = width - 1; x >= 0; i--, x -= scale) {
      ctx.lineTo(x, path2[i]);
    }
    ctx.closePath();
    ctx.fillStyle = This.linearBg;
    // ctx.fill();

    //绘制线
    This.drawPath(path3, This.linear2);
    This.drawPath(path2, This.linear2);
    This.drawPath(path1, This.linear1);
  },
  drawPath: function (path, linear) {
    let This = this,
      set = This.set;
    let ctx = This.ctx;
    let scale = set.scale;
    let width = set.width * scale;

    ctx.beginPath();
    for (let i = 0, x = 0; x < width; i++, x += scale) {
      if (x == 0) {
        ctx.moveTo(x, path[i]);
      } else {
        ctx.lineTo(x, path[i]);
      }
    }
    ctx.lineWidth = set.lineWidth * scale;
    ctx.strokeStyle = linear;
    ctx.stroke();
  },
};

let wave = new WaveView({
  elem: "#wave",
  linear1: [0, "#4DD250", 1, "#4DD250"],
  linear2: [0, "#97EF99", 1, "#97EF99"],
  linear3: [0, "#0b1", 1, "#0b1"],
  linearBg: [0, "gold", 1, "#0b1"],
});

setInterval(() => {
  wave.input(new Array(1365), Math.random() * 100, 16000);
}, 100);
