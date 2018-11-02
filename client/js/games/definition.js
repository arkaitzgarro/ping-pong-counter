export default {
  free: {
    points: Infinity,
    switchServe: Infinity
  },
  short() {
    return {
      name: 'short',
      points: 11,
      switchServe: 2
    };
  },
  long() {
    return {
      name: 'long',
      points: 21,
      switchServe: 5
    };
  }
};
