import Link from "next/link";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getData() {
  const data = await fetch("http://localhost:8080/test", { method: "POST" });
  return sleep(5000).then(() => {
    return data.json();
  });
}

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>Hello world</h1>
      <Link href="/hi">hi</Link>
      <div>{data.hello}</div>
    </div>
  );
}
