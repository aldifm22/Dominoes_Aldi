export const sort = (dominoes, order = "asc") => {
  return dominoes.sort((a, b) => {
    const sumA = a[0] + a[1];
    const sumB = b[0] + b[1];

    // Ascending order
    if (order === "asc") {
      if (sumA !== sumB) {
        return sumA - sumB; 
      }
      
      return a[0] - b[0];
    }
    // Descending order
    else {
      if (sumA !== sumB) {
        return sumB - sumA; 
      }
      
      return b[0] - a[0];
    }
  });
};


export const countDoubleNumber = (dominoes) => {
  return dominoes.filter(([a, b]) => a === b).length;
};
