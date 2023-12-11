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
