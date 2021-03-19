function Slider(options) {
  this.el = options.el;
  this.container_width = parseInt(getComputedStyle(this.el).width); // 计算外层容器的总宽度
  this.container_height = parseInt(getComputedStyle(this.el).height); // 计算外层容器的总高度
  this.slice_num = options.slice_num || 1; //切成几份
  this.time = options.time || 5; //默认5秒轮播一次
  this.index = 0;
  this.transition_time = options.transition_time || 0.25; //动画时间
  this.transition_delay = options.transition_delay || 0.25; //间隔时间
  this.mode = options.mode || 'flat';
  this.init();
  this.count = 0;
}

function $(condition, context) {
  if (context == null) {
    context = document;
  }
  return Array.prototype.slice.call(context.querySelectorAll(condition), 0);
}

function Delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

/**
 * 初始化
 */
Slider.prototype.init = function () {
  const eles = $('.item', this.el);
  eles.forEach((ele, index) => {
    if (index > 0) {
      ele.style.display = 'none';
    }
  });
  this.eles = eles; // dom元素集合
  this.num = eles.length; //有几个元素执行轮播
  this.rate = 1 / this.slice_num; // 计算每个切块占比
  this.unit_width = this.container_width * this.rate; // 每一个切块的宽度
  eles.length > 1 && this.autoScroll();
};

/**
 * 启动自动轮播
 */
Slider.prototype.autoScroll = function () {
  function Handler() {
    const index = (this.new_index =
      this.index + 1 >= this.num ? 0 : this.index + 1); //计算出最新索引

    const src = $('img', this.eles[index])[0].getAttribute('src');

    const render = this.mode + 'Render'; //获取渲染函数

    const animateFun = this.mode + 'Animate'; // 获取动画函数

    this[render](src);

    this[animateFun](); //执行动画
  }
  this.Handler = Handler.bind(this);
  this.Handler();
};

/**
 *  渲染图形
 */
Slider.prototype.flatRender = function (src) {
  
  this.clearHtml();

  this.el.style.overflow = "hidden";

  let html = '';

  Array.from(Array(this.slice_num)).forEach((v, i) => {
    html += `
       <div style="position:absolute;width:${
         this.unit_width
       }px;height:100%;left:${
      i * this.unit_width
    }px;overflow:hidden;top:-100%;transition:top linear ${
      this.transition_time
    }s ${i * this.transition_delay}s;">
            <img src="${src}" style="position:absolute;height:100%;width:${
      100 * this.slice_num
    }%;left:${-i * this.unit_width}px"/>
       </div>
    `;
  });

  const wrapper = document.createElement('DIV');

  wrapper.setAttribute('class', 'hook');

  wrapper.setAttribute('style', 'position:absolute;width:100%;height:100%;');

  wrapper.innerHTML = html;

  this.el.appendChild(wrapper);
};

/**
 * 渲染3d图形
 */
Slider.prototype.cubeRender = function () {
  this.clearHtml();

  let html = '';

  const current_img = $('img', this.eles[this.index])[0].getAttribute('src'); //当前图片路径

  const next_img = $('img', this.eles[this.new_index])[0].getAttribute('src'); //下一张图片路径

  Array.from(Array(this.slice_num)).forEach((v, i) => {
    html += `
      <div class="container" style="left:${i * this.unit_width}px;width:${
      this.unit_width
    }px">
       <div class="wrapper" style="width:${
         this.unit_width
       }px;transition:transform linear ${this.transition_time}s">
            <div class="left"></div>
            <div class="right" style="transform: translateX(${
              this.unit_width
            }px) rotateY(90deg);width:${this.container_height}px"></div>
                    <div class="front"><img src="${current_img}" style="position:absolute;height:100%;width:${
      100 * this.slice_num
    }%;left:${-i * this.unit_width}px"/></div>
                    <div class="up" style="transform: rotateX(90deg) translateZ(${
                      this.container_height
                    }px);"><img src="${next_img}" style="position:absolute;height:100%;width:${
      100 * this.slice_num
    }%;left:${-i * this.unit_width}px"/></div>
       </div>
      </div> 
    `;
  });

  const wrapper = document.createElement('DIV');

  wrapper.setAttribute('class', 'hook');

  wrapper.setAttribute('style', 'position:absolute;width:100%;height:100%;');

  wrapper.innerHTML = html;

  this.el.appendChild(wrapper);
};

/**
 * 执行3d翻转动画
 */
Slider.prototype.cubeAnimate = async function () {
  const eles = $('.hook .wrapper', this.el);
  this.eles[this.index].style.display = 'none';
  let el;
  await Delay(0);
  while ((el = eles.shift())) {
    el.style.transform = `translateZ(${
      -this.container_height / 2
    }px) rotateX(-90deg) translateZ(${this.container_height / 2}px)`;
    this.bindleftAnimate(el);
    el.addEventListener('transitionend', this.completeAnimate.bind(this));
    await Delay(this.transition_delay * 1000);
  }
};

/**
 * 绑定左侧动画
 */
Slider.prototype.bindleftAnimate = function (el) {
  const distance = this.unit_width*2.5;

  const time = this.transition_time * 1000;

  const a = (-4*distance)/(3*time*time);

  const b = (4*distance)/(time*3);

  let t = 0;

  function updateDom() {
    el.style.left = -1*(a*t*t + b*t) +"px";
    setTimeout(() => {
      t += 20;
      if (t <= time) {
        updateDom();
      }
    }, 20);
  }

  updateDom();

};

/**
 * 执行平面动画
 */
Slider.prototype.flatAnimate = async function () {
  const eles = $('.hook div', this.el);
  await Delay(0);
  eles.forEach((el) => {
    el.style.top = 0; //启动动画
    el.addEventListener('transitionend', this.completeAnimate.bind(this));
  });
};

/**
 * 执行完毕动画
 */
Slider.prototype.completeAnimate = async function () {
  this.count++;
  if (this.count >= this.slice_num) {
    //所有切块都已完成
    this.count = 0;
    this.eles[this.new_index].style.display = 'block';
    this.eles[this.index].style.display = 'none';
    this.index = this.new_index;
    this.clearHtml();
    await Delay(this.time * 1000);
    this.Handler();
  }
};

Slider.prototype.clearHtml = function () {
  const elements = $('.hook', this.el);
  elements.length > 0 &&
    elements.forEach((element) => {
      this.el.removeChild(element);
    });
};
