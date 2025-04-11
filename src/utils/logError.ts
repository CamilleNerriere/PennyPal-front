const isDev = import.meta.env.DEV;

export function logError(source: string, err: any): void {
  if (isDev) {
    console.error(`${source} : ${err}`);
  }
}
