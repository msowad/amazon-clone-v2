import slugify from "slugify";

export const defaultDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const stringToSlug = (value: string) => slugify(value, { lower: true });
