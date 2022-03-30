import Head from "next/head";
import NextImage from "next/image";

export default function Home({ shows, currentTime }) {
  return (
    <div className="container">
      <Head>
        <title>tvDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Welcome to tvDB</h1>

        <p className="description">
          Get started by editing <code className="code">pages/index.js</code>
        </p>

        <p className="description">The time is {currentTime}</p>

        <div className="grid">
          {shows?.map((show) => (
            <a className="card" key={show.name}>
              <div className="image">
                <NextImage
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  width={100}
                  height={150}
                />
              </div>
              <div className="content">
                <h2>{show.name}</h2>
                <p>{show.overview.slice(0, 50)}...</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

// export async function getStaticProps() {
export async function getServerSideProps() {

  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1"
  );
  const showsRes = await res.json();

  const currentTime = new Date().toISOString();
  
  return {
    props: {
      shows: showsRes.results,
      currentTime,
    },
  }
}
