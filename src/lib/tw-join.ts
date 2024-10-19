export function twJoin(...classNames: Array<string | null | undefined | boolean>) {
  let res = "";

  for (const className of classNames) {
    if (Boolean(className)) {
      res += " " + className;
    }
  }

  return res;
}
