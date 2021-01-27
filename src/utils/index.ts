export const isFalse = (value: any) => (value === 0 ? false : !value);

// 在一个函数里,改变传入的对象是不好的,因为js的对象是引用对象
export const cleanObject = (object: any) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isFalse(value)) {
      delete res[key];
    }
  });
  return res;
};
