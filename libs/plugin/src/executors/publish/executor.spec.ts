import { PublishExecutorSchema } from './schema';
import executor from './executor';

const options: PublishExecutorSchema = {};

describe('Publish Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});