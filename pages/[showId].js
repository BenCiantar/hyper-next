import { useRouter } from 'next/router';

export default function ShowsPage({ show }) {
    
    const router = useRouter();

    const { showId } = router.query;
    
    return (
        <main className="main">
            <img
                src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                alt={show.name}
                width={200}
                height={300}
            />
                <h1 className="title">{show.name}</h1>
                <p className="description">{show.overview}</p>
        </main>
    );
}

export async function getStaticProps({ params }) {
    
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${params.showId}?api_key=3c81d3d434a13d39edaea832df6550a3&page=1`
    );
    const show = await res.json();
    
    
    return {
        props: {
            show: show,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1`
    );
    const shows = await res.json();

    const paths = shows.results.map((show => {
        return {
            params: {
                showId: show.id.toString(),
            },
        }
    }));

    return {
        paths,
        fallback: false,
    }
}

