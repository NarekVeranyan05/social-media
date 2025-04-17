import {rest} from "msw"
import { withSearchParams } from "./customPredicates"

export const handlers = [
    rest.get("/auth/me", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data":{
                    "id":2079,
                    "login":"dad's best friend",
                    "email":"free@samuraijs.ru"
                },
                "messages":[],
                "fieldsErrors":[],
                "resultCode":0
            })
        )
    }),
    rest.get("/profile", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "aboutMe": "ÐÑƒ ÐºÐ°Ðº Ñ Ð¿Ð¾Ð¸ÑÐºÐ¾Ð¼ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹?",
                "contacts": {
                  "facebook": "https://www.facebook.com/",
                  "website": "https://github.com/",
                  "vk": "https://vk.com/",
                  "twitter": "https://twitter.com/",
                  "instagram": "https://www.instagram.com/",
                  "youtube": "https://www.youtube.com/",
                  "github": "https://github.com",
                  "mainLink": ""
                },
                "lookingForAJob": true,
                "lookingForAJobDescription": "for job",
                "fullName": "Suk Madik",
                "userId": 2079,
                "photos": {
                  "small": null,
                  "large": null
                }
            })
        )
    }),
    rest.get("/profile/", withSearchParams(
        (params) => params.has("userId"),
        ({req, res, ctx}) => {
            return res(
                ctx.status(200),
                ctx.json({
                    "aboutMe": "ÐÑƒ ÐºÐ°Ðº Ñ Ð¿Ð¾Ð¸ÑÐºÐ¾Ð¼ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹?",
                    "contacts": {
                      "facebook": "https://www.facebook.com/",
                      "website": "https://github.com/",
                      "vk": "https://vk.com/",
                      "twitter": "https://twitter.com/",
                      "instagram": "https://www.instagram.com/",
                      "youtube": "https://www.youtube.com/",
                      "github": "https://github.com",
                      "mainLink": ""
                    },
                    "lookingForAJob": true,
                    "lookingForAJobDescription": "for job",
                    "fullName": "Suk Madik",
                    "userId": 2079,
                    "photos": {
                      "small": null,
                      "large": null
                    }
                })
            )
        }
    )),
    rest.post("/auth/login", (req, res, ctx) => {
        return res(
            ctx.status(402),
            ctx.json({
                resultCode: 1,
            })
        )
    }),
    rest.get("/users", (req, res, ctx) => {
        return res(
            ctx.status(402),
            ctx.json({
                items: []
            })
        )
    })
]

withJsonBody()