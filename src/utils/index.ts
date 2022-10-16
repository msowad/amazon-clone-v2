import slugify from "slugify";

export const defaultDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const stringToSlug = (value: string) => slugify(value, { lower: true });

export const handleFormError = (e: any) => {
  if (typeof e === "string") {
    return e;
  } else if (e instanceof Error) {
    return e.message;
  }
  return "Something went wrong. Please try again later.";
};
