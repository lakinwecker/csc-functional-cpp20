export const pp = <T>(t: T): T => {
  console.log(JSON.stringify(t, null, 2))
  return t
}
