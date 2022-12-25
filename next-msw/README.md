# Nextjs with msw

next의 msw의 경우 mock 폴더를 만들어 server 쪽과 browser 쪽을 따로 작업해 줘야 한다

또한 msw가 실행되기 전에는 사용이 불가해서 getServerSideProps 같은 곳이나 사용자에 의한 이벤트에 의해 실행되는 fetch 같은 것만 mocking이 가능하다

예를 들어 아래의 경우 컴포넌트 렌더링 시점에 생성이 되는데 이 경우 msw가 실행되기 이전에 fetching을 하기 때문에 이 경우 에러가 난다

```js
const Home: NextPage = () => {
  useEffect(() => {
    (async () => {
      await axios.get("/hello");
    })();
  }, []);

  return <div>Hello</div>;
};
```

하지만 다음 예제의 경우 fetch 함수는 msw가 실행이 완료된 이후에 실행이 됨으로 잘 동작하는 걸 볼 수 있고 getServerSideProps도 마찬가지로 server 쪽 msw를 만들어 줘서 잘 동작하는 걸 볼 수 있다

```js
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/hello");
  return { props: { data } };
};

const Home: NextPage = ({ data }) => {
  const fetch = async () => {
    await axios.get("/hello");
  };

  return <button onClick={fetch}>Hello</button>;
};
```
