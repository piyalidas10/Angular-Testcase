import { TestBed } from '@angular/core/testing';
import { MaskDataPipe } from './mask-data.pipe';

describe('MaskDataPipe', () => {
  let pipe: MaskDataPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaskDataPipe]
    })
    pipe = TestBed.inject(MaskDataPipe);
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('show mask data with default * character', () => {
    const str = pipe.transform('1234567890');
    expect(str).toBe('**********');
  });
  it('show mask data without startPos', () => {
    const str = pipe.transform('1234567890', '*');
    expect(str).toBe('**********');
  });
  it('show mask data without startPos < 1', () => {
    const str = pipe.transform('1234567890', '$', -1, 6);
    expect(str).toBe('$$$$$$7890');
  });
  it('show mask data without endPos', () => {
    const str = pipe.transform('1234567890', '$', 1);
    expect(str).toBe('$$$$$$$$$$');
  });
  it('show mask data with endPos > value.length', () => {
    const str = pipe.transform('1234567890', '*', 0, 12);
    expect(str).toBe('**********');
  });
  it('show mask data without value', () => {
    const str = pipe.transform('', '*', 0);
    expect(str).toBe('');
  });
  it('show mask data with $ character', () => {
    const str = pipe.transform('1234567890', '$', 0, 6);
    expect(str).toBe('$$$$$$7890');
  });
});
