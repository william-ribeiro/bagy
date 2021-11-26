import { createConnection } from 'typeorm';

const Connection = async (): Promise<void> => {
  const getConnection = await createConnection();
  await getConnection.synchronize();
};
export { Connection };
