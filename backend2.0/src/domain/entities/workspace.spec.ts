import { Workspace } from './workspace';

describe('Workspace', () => {
  it('should be able to create a new workspace entity', () => {
    const workspace = new Workspace({
      title: 'Workspace test',
      ownerId: '12345678',
    });

    expect(workspace).toBeDefined();
  });
});
