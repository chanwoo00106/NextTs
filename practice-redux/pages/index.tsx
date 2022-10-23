import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import wrapper, { RootState } from '../store'
import { decreament, increament } from '../store/counter'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(increament())
  store.dispatch(increament())
  return { props: { cnt: 2 } }
})

const Home: NextPage<{ cnt: number }> = ({ cnt }) => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()
  console.log(cnt)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increament())}>+</button>
      <button onClick={() => dispatch(decreament())}>-</button>
    </div>
  )
}

export default Home
