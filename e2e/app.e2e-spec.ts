import { App2Page } from './app.po';

describe('app2 App', () => {
  let page: App2Page;

  beforeEach(() => {
    page = new App2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
