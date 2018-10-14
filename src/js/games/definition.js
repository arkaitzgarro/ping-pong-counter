export default {
  free: {
    points: Infinity,
    switchServe: Infinity
  },
  short() {
    return {
      points: 11,
      switchServe: 2
    };
  },
  long() {
    return {
      points: 21,
      switchServe: 5
    };
  }
};
