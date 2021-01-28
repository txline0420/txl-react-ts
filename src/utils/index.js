import { useEffect } from "react";

export const isFalse = (value) => (value === 0 ? false : !value);

// 在一个函数里,改变传入的对象是不好的,因为js的对象是引用对象
export const cleanObject = (object) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isFalse(value)) {
      delete res[key];
    }
  });
  return res;
};

// 抽象出组件加载时执行的函数
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
