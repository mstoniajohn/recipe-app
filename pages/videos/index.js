import { createClient } from 'contentful';
export default function index({ movies }) {
	console.log(movies);

	return (
		<div>
			<h1>Hi</h1>
			{movies.map((movie) => (
				<div>
					<h4>{movie.fields.name}</h4>
					<video controls loop style={{ width: '500px', height: '300px' }}>
						<source src={`https:${movie.fields.videoFile.fields.file.url}`} />
					</video>
				</div>
			))}
		</div>
	);
}
export async function getStaticProps() {
	const client = createClient({
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
		space: process.env.CONTENTFUL_SPACE_ID,
	});

	const res = await client.getEntries({ content_type: 'movies' });
	return {
		props: {
			movies: res.items,
			revalidate: 1,
		},
	};
}
