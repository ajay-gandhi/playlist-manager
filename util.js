
module.exports.fyShuffle = (list) => {
  const newList = clone(list);
  for (let i = newList.length; i >= 0; i--) {
    const which = Math.floor(Math.random() * (newList.length - 1));
    const temp = newList[which];
    newList[which] = newList[i];
    newList[i] = temp;
  }
  return newList;
};

const clone = (list, n) => {
  return list.slice(n || list.length);
};
module.exports.clone = clone;
