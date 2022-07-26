import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Beer } from '../beer'
import { BasketState } from './models'

const initialState: BasketState = {
    list: [],
    amount: 0,
    summ: 0,
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addTobasket: (state, action: PayloadAction<Beer>) => {
            const existed = state.list.find((i) => i.id === action.payload.id)

            if (existed) {
                state.list = state.list.map((item) => {
                    if (item.id === action.payload.id) {
                        return {...item, amount: item.amount + 1}
                    }
                    return item
                })
            }

            state.list.push({ ...action.payload, amount: 1 })

            state.amount = state.list.length
            state.summ = state.list.reduce((acc, item) => {
                acc += item.target_fg * item.amount
                return acc
            }, 0)
        },
        deleteFromBasket: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((i) => i.id !== action.payload)

            state.amount = state.list.length
            state.summ = state.list.reduce((acc, item) => {
                acc += item.target_fg * item.amount
                return acc
            }, 0)
        }
    },
})

export const { addTobasket, deleteFromBasket } = basketSlice.actions

export default basketSlice.reducer