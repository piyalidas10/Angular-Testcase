export interface FakeUser {
    email: string,
    gender: string | null,
    phone_number: string,
    birthdate: number,
    location: FakeUserLocation,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    married: boolean | null,
    picture: string
}

export interface FakeUserLocation {
    street: string,
    city: string,
    state: string,
    postcode: any
}