function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getData() {
  const data = await fetch("http://localhost:8080/test", { method: "POST" });
  // return sleep(5000).then(() => {
  //   return data.json();
  // });
  return data.json();
}

const Hi = async () => {
  const data = await getData();

  return (
    <div>
      <h1>data : {data?.hello}</h1>
    </div>
  );
};

export default Hi;
