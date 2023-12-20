

import { apiSlice } from "../apiSlice";

export const plantsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlants: builder.query({
            query: (roomid) => `/plants/room/${roomid}`,
            keepUnusedDataFor: 1,
        }),
        getPlantById: builder.query({
            query: (plantId) => `/plants/rooms/${plantId}`
        }),
        createPlant: builder.mutation({
            query: (values) => ({
                url: '/plants',
                method: 'POST',
                body: { ...values }
            })
        }),
        deletePlant: builder.mutation({
            query: (values) => ({
                url: '/plants',
                method: 'DELETE',
                body: { ...values },
            })
        }),
        updatePlant: builder.mutation({
            query: (values) => ({
                url: '/plants',
                method: 'PATCH',
                body: { ...values },
            })
        })
    })
})

export const {
    useLazyGetPlantByIdQuery,
    useLazyGetPlantsQuery,
    useCreatePlantMutation,
    useDeletePlantMutation,
    useUpdatePlantMutation
} = plantsApiSlice