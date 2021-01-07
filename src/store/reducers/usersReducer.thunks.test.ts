import { TServerResponse } from '@api/api'
import { usersAPI } from '@api/users-api'
import { ResultCodes } from '@typings/types'
import { followingToggleTC } from './usersReducer'
jest.mock('@api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: TServerResponse = {
  resultCode: ResultCodes.Success,
  data: {},
  messages: [],
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))

it('testing follow/unfollow thunk', async () => {
  const thunk = followingToggleTC(true, 1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})
