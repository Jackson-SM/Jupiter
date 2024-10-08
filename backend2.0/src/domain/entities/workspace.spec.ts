import { Workspace } from './workspace';

describe('Workspace', () => {
  it('should be able to create a new workspace entity', () => {
    const workspace = new Workspace({ title: 'Workspace test' });

    expect(workspace).toBeDefined();
  });
});
