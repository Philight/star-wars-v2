export const createArrayGroups = (groupSize: number, initialArray: any[]): any[][] => {
  const arrayGroups: any[][] = [];

  // Divide the initial array into groups of size `groupSize`
  for (let i = 0; i < initialArray.length; i = i + groupSize) {
    // Use Array.slice to extract the current group from the initial array
    const currentGroup = initialArray.slice(i, i + groupSize);
    arrayGroups.push(currentGroup);
  }

  return arrayGroups;
};

export const arrayUniqueValues = array => {
  return array.filter((item, pos) => array.indexOf(item) === pos);
};

// @ts-ignore
Array.prototype.css = function (): string {
  return this?.filter(Boolean).join(' ');
};

// @ts-ignore
Array.prototype.sortAsc = function (): Array {
  return this?.sort((a, b) => a - b);
};

// @ts-ignore
Array.prototype.sortDesc = function (): Array {
  return this?.sort((a, b) => b - a);
};
