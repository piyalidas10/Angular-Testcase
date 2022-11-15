import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;
  beforeEach(() => {
    pipe = new TruncatePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('truncate a string if its too long (>10)’', () => {
    const str = pipe.transform('This is a long sentence, please make it small.', 10);
    expect(str.length).toBe(13); // 
    expect(str).toBe('This is a ...');
  });
});
