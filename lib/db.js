import mysql from 'serverless-mysql';
import { DATABASE_CONFIG } from './constants';
const db = mysql({
  config: {
    host: DATABASE_CONFIG.HOST,
    port: '3306',
    database: DATABASE_CONFIG.DATABASE,
    user: DATABASE_CONFIG.USER,
    password: DATABASE_CONFIG.PASSWORD
  }
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}