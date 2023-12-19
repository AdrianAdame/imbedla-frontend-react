import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, setLogout } from "./userSlice"

// const BASE_URL = "http://192.168.1.116:3000/api";
const BASE_URL = "http://localhost:3000/api";


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL + "/",
    credentials: 'same-origin', //credentials: 'same-origin'
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
            headers.append('Content-Type', 'application/json')
            headers.append('Access-Control-Allow-Origin', '*')
            headers.append('Access-Control-Allow-Headers', '*')
        }

        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log("Sending refresh token...")

        //Send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)

        console.log(refreshResult)

        if (refreshResult?.data) {
            console.log(refreshResult.data)

            const user = api.getState().user.user

            //Store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }))

            //Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(setLogout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})