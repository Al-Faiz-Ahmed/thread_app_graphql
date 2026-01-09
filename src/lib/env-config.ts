const { PORT, DATABASE_URL } = process.env;

export const config = {
  PORT: PORT ? parseInt(PORT ?? "4000", 10) : undefined,
  DATABASE_URL: DATABASE_URL,
};
