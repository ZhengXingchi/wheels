import { Message } from "element-ui";

export const notify = function({
  type = "info",
  message = "",
  duration = 2000,
  showClose = false,
  onClose = function() {}
}) {
  Message({
    type,
    message,
    duration,
    showClose,
    onClose
  });
};

export const closeNotify = function() {
  Message.close();
};

export function debounce(func, wait = 1000, immediate = true) {
  let timeout;
  let result;
  return function(...args) {
    const context = this;
    if (timeout) window.clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = false;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
}
let CityArray = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
/**
 * 传入身份证号码和num.获取出生日期,性别跟年龄
 * @param UUserCard 身份证号码
 * @param type 1获取出生日期
 *            2 获取性别
 *            3 获取年龄,年龄小于1岁的时候默认为1岁
 * @returns {*}
 * @constructor
 */
export function IdCard(UUserCard,type){

  if(type==1){
    //获取出生日期
    birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
    return birth;
  }
  if(type==2){
    //获取性别
    if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
      //男
      return "男";
    } else {
      //女
      return "女";
    }
  }
  if(type==3){
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() -   UUserCard.substring(6, 10) - 1;
    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
      age++;
    }
    if(age <= 0){
      age = 1;
    }
    return age;
  }
  if(type==4){
    return CityArray[parseInt(UUserCard.substr(0, 2))]
  }
}

export const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
              return window.setTimeout(callback, 1000/60);
          }
      );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
      if (start === end) {
          endCallback && endCallback();
          return;
      }

      let d = (start + step > end) ? end : start + step;
      if (start > end) {
          d = (start - step < end) ? end : start - step;
      }

      if (el === window) {
          window.scrollTo(d, d);
      } else {
          el.scrollTop = d;
      }
      window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}
// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
          return true;
      }
  }
  return false;
}
/**
 * 百度地图 webapi
 * @param {*} ak 
 */
export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}