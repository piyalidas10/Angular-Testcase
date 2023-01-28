import { DataRangePipe } from './data-range.pipe';
import { mockFakeUsers } from 'src/app/mockdata/fakeusers';

describe('DataRangePipe', () => {
  let pipe: DataRangePipe;
  beforeEach(() => {
    pipe = new DataRangePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('if pass blank data array', () => {
    const arr = pipe.transform([], 5);
    expect(arr.length).toBe(0);
  });
  it('fetch data array of first 2 rows', () => {
    const mockData = [
      {
        "email": "melany.wijngaard@example.com",
        "gender": "female",
        "phone_number": "(727)-033-9347",
        "birthdate": 608022796,
        "location": {
          "street": "2431 predikherenkerkhof",
          "city": "staphorst",
          "state": "gelderland",
          "postcode": 64265
        },
        "username": "bigpeacock217",
        "password": "eagle",
        "first_name": "melany",
        "last_name": "wijngaard",
        "married": true,
        "picture": "women/70.jpg"
      },
      {
        "email": "nanna.pedersen@example.com",
        "gender": "female",
        "phone_number": "43672992",
        "birthdate": 591428535,
        "location": {
          "street": "2177 fåborgvej",
          "city": "aarhus",
          "state": "syddanmark",
          "postcode": 87547
        },
        "username": "purpleduck599",
        "password": "davids",
        "first_name": "nanna",
        "last_name": "pedersen",
        "married": false,
        "picture": "women/68.jpg"
      },
    ];
    const arr = pipe.transform(mockFakeUsers, 2);
    expect(arr.length).toBe(2);
    expect(arr).toEqual(mockData);
  });
  it('fetch data array of 2 rows from 3 no of row', () => {
    const arr = pipe.transform(mockFakeUsers, 2, 3);
    const mockData = [
      {
        "email": "sarah.oliver@example.com",
        "gender": "female",
        "phone_number": "0761-814-654",
        "birthdate": 1038915780,
        "location": {
          "street": "3503 manor road",
          "city": "manchester",
          "state": "highlands and islands",
          "postcode": "I30 5ZF"
        },
        "username": "purplebear893",
        "password": "boat",
        "first_name": "sarah",
        "last_name": "oliver",
        "married": false,
        "picture": "women/73.jpg"
      },
      {
        "email": "عسل.مرادی@example.com",
        "gender": "female",
        "phone_number": "0925-326-2063",
        "birthdate": 417058382,
        "location": {
          "street": "4981 شهید بهشتی",
          "city": "پاکدشت",
          "state": "مرکزی",
          "postcode": 68555
        },
        "username": "ticklishfish813",
        "password": "zaq12wsx",
        "first_name": "عسل",
        "last_name": "مرادی",
        "married": true,
        "picture": "women/65.jpg"
      },
    ];
    expect(arr.length).toBe(2);
    expect(arr).toEqual(mockData);
  });
});
