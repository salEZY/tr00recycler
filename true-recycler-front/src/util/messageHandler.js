export const messageHandler = (func, msg, clearFunc) => {
  func(msg);
  setTimeout(() => {
    func("");
  }, 1000);
  clearFunc();
};
