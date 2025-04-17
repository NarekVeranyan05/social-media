import usersDataReducer, { InitialType, usersDataActionCreators } from "../UsersDataReducer";

describe("UsersData", () => {
    it('follow is false when not logged in', () => {
        let items = [
            {
                "name": "FReeeZzz",
                "id": 3865,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": false
            },
            {
                "name": "bestiloch",
                "id": 3864,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": "ghgdddsdsllll",
                "followed": false
            },
            {
                "name": "pfhz97",
                "id": 3863,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": false
            },
            {
                "name": "pfhz",
                "id": 3862,
                "uniqueUrlName": null,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": false
            },
        ];
        let action = usersDataActionCreators.createUsersDataActionCreator(items, 1000, false)
        let state: InitialType = {
            users:[],
            isLoading: false, 
            amountOfUsers: 1000,
            count: 9,
            maxPage: 6,
            disabledFollowButtons: []
        }
        let newState = usersDataReducer(state, action)
        expect(newState.users[0].isFollowed).toBe(false)
    })
})