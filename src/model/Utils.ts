export function genId(val = ""): string {
  const randomString = function() {
    return Math.random().toString(16);
  };
  return `${val ? val + "_" : ""}${new Date().getTime()}_${randomString()}`;
}
