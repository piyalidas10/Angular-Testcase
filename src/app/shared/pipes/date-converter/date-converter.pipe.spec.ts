import { DateConverterPipe } from './date-converter.pipe';

describe('DateConverterPipe', () => {
  let pipe: DateConverterPipe;
  beforeEach(() => {
    pipe = new DateConverterPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('If value is coming null', () => {
    const str = pipe.transform(null);
    expect(str).toBe('');
  });
  it('If value is coming number', () => {
    const str = pipe.transform(1038915780);
    expect(str).toBe('1/13/1970');
  });
});
