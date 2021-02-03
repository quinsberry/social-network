import { actions, UsersInitialState, usersReducer } from './usersReducer'

let state: UsersInitialState

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Name1',
        followed: false,
        photos: { small: null, large: null },
        status: 'Status1',
        uniqueUrlName: 'Test1',
      },
      {
        id: 1,
        name: 'Name2',
        followed: false,
        photos: { small: null, large: null },
        status: 'Status2',
        uniqueUrlName: 'Test2',
      },
      {
        id: 2,
        name: 'Name3',
        followed: true,
        photos: { small: null, large: null },
        status: 'Status3',
        uniqueUrlName: 'Test3',
      },
      {
        id: 3,
        name: 'Name4',
        followed: true,
        photos: { small: null, large: null },
        status: 'Status4',
        uniqueUrlName: 'Test4',
      },
    ],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    onFollowing: [],
  }
})

it('Follow correctly', () => {
  const newState = usersReducer(state, actions.followToggle(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

it('Unfollow correctly', () => {
  const newState = usersReducer(state, actions.followToggle(2))

  expect(newState.users[1].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeFalsy()
  expect(newState.users[3].followed).toBeTruthy()
})
