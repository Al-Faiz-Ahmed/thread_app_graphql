const { PORT, DATABASE_URL } = process.env;

export const config = {
  PORT: parseInt(PORT ?? "4000", 10),
  DATABASE_URL: DATABASE_URL,
};
