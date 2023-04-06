import { mockUsers, mockUsersOrderByAsc, mockUsersOrderByDesc } from 'src/app/mockdata/users';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  beforeEach(() => {
    pipe = new OrderByPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('ascending orderby with blank arr', () => {
    const arrFinal = pipe.transform([], 'name');
    expect(arrFinal).toEqual([]);
  });
  it('ascending orderby a[field] < b[field]', () => {
    const arrFinal = pipe.transform(mockUsers, 'name');
    expect(arrFinal).toEqual(mockUsersOrderByAsc);
  });
  it('ascending orderby a[field] > b[field]', () => {
    const arrFinal = pipe.transform(mockUsersOrderByAsc, 'name');
    expect(arrFinal).toEqual(mockUsersOrderByAsc);
  });
  it('ascending for return 0', () => {
    const arrFinal = pipe.transform(mockUsers, 'test');
    expect(arrFinal).toEqual(mockUsers);
  });
  it('descending orderby with blank arr', () => {
    const arrFinal = pipe.transform([], 'name', 'desc');
    expect(arrFinal).toEqual([]);
  });
  it('descending orderby a[field] < b[field]', () => {
    const arrFinal = pipe.transform(mockUsers, 'name', 'desc');
    expect(arrFinal).toEqual(mockUsersOrderByDesc);
  });
  it('descending for return 0', () => {
    const arrFinal = pipe.transform(mockUsers, 'test');
    expect(arrFinal).toEqual(mockUsers);
  });
});
