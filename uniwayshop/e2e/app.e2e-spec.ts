import { UniwayshopPage } from './app.po';

describe('uniwayshop App', () => {
  let page: UniwayshopPage;

  beforeEach(() => {
    page = new UniwayshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
