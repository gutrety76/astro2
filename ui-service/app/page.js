import Image from "next/image";

const getData = async () => {
  const date = new Date();
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Convert month to two-digit number
  const day = String(date.getDate()).padStart(2, '0'); // Convert day to two-digit number

  const currentDate = `${day}.${month}.${year}`;

  const params = new URLSearchParams();
  params.append('zodiac', 'Scorpio');
  params.append('date_now', currentDate);
  params.append('days_to_get', 10000);

  const url = `http://api-service:3003/`;
  // const url = `http://api-service:3003/get_zodiac_predictions?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('failed to fetch data');
  }

  return response.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && data.map((value, key)=> {
        return (<>
        <div key={value.id}>
          zodiac: {value.zodiac}
          <br/>
          prediction_text: {value.prediction_text}
          </div>
          </>)
      })}
    </main>
  );
}
