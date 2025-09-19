  export const getLevelWithRepeatNumber = (repeat) => {
    let level = "level1";
    if (repeat > 3) {
      level = "level3";
    } else if (repeat > 0) {
      level = "level2";
    } else {
      level = "level1";
    }
    return level;
  };