export const normalizeUrl = (url: string) => {
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
};
