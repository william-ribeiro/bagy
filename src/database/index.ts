import { createConnection } from 'typeorm';

const cconnection = async (): Promise<void> => {
  const connection = await createConnection();
  await connection.synchronize();
};
export { cconnection };
