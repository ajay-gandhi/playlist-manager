
module.exports.fyShuffle = (list) => {
  const newList = clone(list);
  for (let i = newList.length - 1; i >= 0; i--) {
    const which = Math.floor(Math.random() * (newList.length - 1));
    const temp = newList[which];
    newList[which] = newList[i];
    newList[i] = temp;
  }
  return newList;
};

module.exports.argsToArray = (args) => {
  const list = [];
  const numArgs = Object.keys(args).length;
  for (let i = 0; i < numArgs; i++) list.push(args[i]);
  return list;
};

const cloneGeneric = (input) => {
  if (typeof input === "object") {
    if (input instanceof Array) {
      return input.map(cloneGeneric);
    } else if (input.clone) {
      return input.clone();
    } else {
      const newObj = {};
      Object.keys(input).forEach(key => newObj[key] = cloneGeneric(input[key]));
      return newObj;
    }
  } else {
    return input;
  }
};
const clone = (list, n) => {
  if (!(list instanceof Array)) return cloneGeneric(list);

  const newLength = n || list.length;
  const newList = [];
  for (let i = 0; i < newLength; i++) {
    newList.push(cloneGeneric(list[i]));
  }
  return newList;
};
module.exports.clone = clone;
