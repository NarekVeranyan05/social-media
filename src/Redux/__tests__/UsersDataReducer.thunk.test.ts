import { state } from "../Store"
import { createUsersDataThunkCreator } from "../UsersDataReducer"
import { usersAPI } from "../../api/api"
import { resolve } from "path"
jest.mock("../../api/api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


beforeEach(() => {
    usersAPIMock.getUsers.mockReturnValue(
        new Promise((resolve) => {
            return resolve({
                items: [
                    {
                        id: 10,
                        name: "name",
                        status: null,
                        photos: {small: null, large: null},
                        followed: false
                    }
                ],
                totalCount: 100,
                error: null
            })
        })
    )
})

it('createUsersData thunk works correctly', async() => {
    const dispatchMock = jest.fn()
    const thunk = createUsersDataThunkCreator(9, 5, false) 
    await thunk(dispatchMock, () => state, {})

    expect(dispatchMock).toHaveBeenCalledTimes(3)
})