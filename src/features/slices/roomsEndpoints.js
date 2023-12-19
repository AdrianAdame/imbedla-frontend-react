import { apiSlice } from "../apiSlice";

export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRooms: builder.query({
            query: (userid) => `/rooms/user/${userid}`, keepUnusedDataFor: 1,
        }),
        getRoomById: builder.query({
            query: (id) => `/rooms/${id}`
        }),
        createRoom: builder.mutation({
            query: (values) => ({
                url: '/rooms',
                method: 'POST',
                body: { ...values }
            })
        }),
        deleteRoom: builder.mutation({
            query: (values) => ({
                url: '/rooms',
                method: 'DELETE',
                body: { ...values },
            })
        }),
        updateRoom: builder.mutation({
            query: (values) => ({
                url: '/rooms',
                method: 'PATCH',
                body: { ...values },
            })
        })
    })
})

export const {
    useLazyGetRoomsQuery,
    useGetRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useDeleteRoomMutation,
    useUpdateRoomMutation,
} = roomsApiSlice