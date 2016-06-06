import {StringWrapper} from '@angular/core/src/facade/lang';

const _cssSelectorRe: RegExp = /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/gmi;

export function encapsulateCss(css: string, prefix: string): string {
  return StringWrapper.replaceAllMapped(css, _cssSelectorRe, function(m: any): string {
    const rule = m[0];
    return `${prefix} ${rule}`;
  });
}

export function formatTwitterFollowersAmount(amount: number): string {
  if (amount > 1000) {
    return (Math.round((amount / 1000) * 10) / 10) + 'K';
  }
  return String(amount);
}
