/**
 * @type T - generic type to type the field typr
 * @param field - the current column to sort
 * @param currentDirection - current direction, can be 'asc' or 'desc'
 * @param data - data that will be sorted
 * @returns {Direction, sortedData}
 */
export function sortData<T>(
  field: keyof T,
  currentDirection: "asc" | "desc",
  data: any[]
): { direction: "asc" | "desc"; sortedData: any[] } {
  const direction = currentDirection === "asc" ? "desc" : "asc";
  const sortedData = data.sort((a, b) => {
    console.log(a,b )
    if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return { direction, sortedData };
}

export function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
