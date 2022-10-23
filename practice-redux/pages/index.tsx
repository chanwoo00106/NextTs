import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { decreament, increament } from '../store/counter'

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increament())}>+</button>
      <button onClick={() => dispatch(decreament())}>-</button>
    </div>
  )
}

export default Home
