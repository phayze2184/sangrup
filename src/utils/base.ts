export const base = import.meta.env.BASE_URL;

export const withBase = (path: string) => {
  if (!path || path.startsWith("#") || /^[a-z]+:/i.test(path) || path.startsWith("//")) {
    return path;
  }

  return `${base}${path.replace(/^\//, "")}`;
};
