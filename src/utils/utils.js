/**
 * [typeFor 判断类型]
 */
export function typeFor(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

/**
 * [isValidVal 判断是否为有效值]
 */
export function isValidVal(val) {
  let boo = true;
  if (
    typeof val === "undefined" ||
    val === "undefined" ||
    val === null ||
    val === "null" ||
    val === ""
  )
    boo = false;
  return boo;
}

/*
 * 根据key获取对应的name
 * @param {String} key
 * @param {Arr} enum
 * @returns String
 */
export function getName(key, enums, map = { id: "id", name: "name" }) {
  let name;
  let keyArr = String(key).split(",");
  let items = enums.filter((item) => {
    return keyArr.includes(item[map["id"]] + "");
  });
  name = items.length > 0 ? items.map(($item) => $item[map["name"]]).join(",") : "";
  return name;
}

/**
 * 获取图标
 */
export function getIcon(str) {
  let suffix = str.substring(str.lastIndexOf(".") + 1).toLowerCase();
  if (suffix === "pdf") {
    return "pdf";
  }
  if (["jpg", "jpeg", "png", "gif", "bmp"].includes(suffix)) {
    return "img";
  }
  if (["doc", "docx"].includes(suffix)) {
    return "word";
  }
}

/**
 * 关闭页面-支持飞书浏览器
 */
export function closePage() {
  if (window.h5sdk) {
    window.h5sdk.ready(function () {
      window.h5sdk.biz.navigation.close({
        onSuccess: function (result) {
          console.log(result);
        },
      });
    });
  } else {
    window.close();
  }
}

/**
 * 退出登录
 */
export function logOut() {
  const { VUE_APP_WEB_BASE_URL, VUE_APP_LOGIN_URL } = process.env;
  const { origin } = window.location;
  const url = `${VUE_APP_LOGIN_URL}?from=${origin}${VUE_APP_WEB_BASE_URL}index`;
  window.location.href = url;
}

export function tFormErrorScrollIntoView() {
  const element = document.querySelectorAll(".t-is-error")[0];
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
