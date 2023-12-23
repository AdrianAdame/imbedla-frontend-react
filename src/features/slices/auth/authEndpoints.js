import { apiSlice } from "../../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/sign',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: (values) => ({
                url: '/auth/register', 
                method: 'POST',
                body: {...values}
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url : '/auth/logout',
                method: 'POST',
                body: {}
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice