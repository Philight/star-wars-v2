declare global {
  interface Array<T> {
    css(): string;
    sortAsc(): Array<T>;
    sortDesc(): Array<T>;
  }
}

export {};