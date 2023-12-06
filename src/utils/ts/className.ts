/*
import './className';

[
  `company-values__inner-container blabla hello`,
  isFixed && 'scroll-fixed',
  showContent && 'show-content',
  isRevealed && 'revealed'
].css()
*/

/*
declare global {
  interface Array<T> {
    css(): Array<T>;
  }
}
*/

// @ts-ignore
Array.prototype.css = function (): string {
  return this?.filter(Boolean).join(' ');
};
