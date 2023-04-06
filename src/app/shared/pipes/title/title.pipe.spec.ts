import { TitlePipe } from './title.pipe';
import { mockFakeUsers } from 'src/app/mockdata/fakeusers';

describe('TitlePipe', () => {
  let pipe: TitlePipe;
  beforeEach(() => {
    pipe = new TitlePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('if gender is null or "" ', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, null, null);
    expect(str).toBe(mockFakeUsers[0].first_name);
  });
  it('if gender is male & married is true', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, 'male', true);
    expect(str).toBe('Mr.' + mockFakeUsers[0].first_name);
  });
  it('if gender is male & married is false', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, 'male', false);
    expect(str).toBe('Mr.' + mockFakeUsers[0].first_name);
  });
  it('if gender is female & married is true', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, 'female', true);
    expect(str).toBe('Mrs.' + mockFakeUsers[0].first_name);
  });
  it('if gender is female & married is false', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, 'female', false);
    expect(str).toBe('Miss.' + mockFakeUsers[0].first_name);
  });
  it('if gender is female & married is null', () => {
    const str = pipe.transform(mockFakeUsers[0].first_name, 'female', null);
    expect(str).toBe('Miss.' + mockFakeUsers[0].first_name);
  });
});
