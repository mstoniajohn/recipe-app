// import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Skeleton from '@/components/Skeleton';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { createClient } from 'contentful';
import Image from 'next/image';
const client = createClient({
	accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	space: process.env.CONTENTFUL_SPACE_ID,
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({ content_type: 'recipe' });

	// map items for slugs
	const paths = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug },
		};
	});

	return {
		paths,
		fallback: true, //show 404 of page not exists
	};
};

// fetch single items separate
export async function getStaticProps({ params }) {
	// returns array
	const { items } = await client.getEntries({
		content_type: 'recipe',
		'fields.slug': params.slug,
	});
	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			recipe: items[0],
			revalidate: 1,
		},
	};
}

export default function RecipeDetails({ recipe }) {
	if (!recipe) return <Skeleton />;
	console.log(recipe);
	const { title, cookingTime, ingredients, method, featuredImage } =
		recipe.fields;
	return (
		<Layout>
			<div className="banner">
				<Image
					src={`https:${featuredImage.fields.file.url}`}
					height={featuredImage.fields.file.details.image.height}
					width={featuredImage.fields.file.details.image.width}
				/>
				<h2>{title}</h2>
			</div>

			<div className="info">
				<p>Takes about {cookingTime} minutes to cook</p>
				<h3>Ingredients</h3>
				<div>
					{ingredients.map((ing) => (
						<span key={ing}>{ing}</span>
					))}
				</div>
				<div className="method">
					<h3>Directions</h3>
					<div>{documentToReactComponents(method)}</div>
				</div>
			</div>

			<style jsx>{`
				h2,
				h3 {
					text-transform: uppercase;
				}
				.banner h2 {
					margin: 0;
					background: #fff;
					display: inline-block;
					padding: 20px;
					position: relative;
					top: -60px;
					left: -10px;

					box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
				}
				.info p {
					margin: 0;
				}
				.info span::after {
					content: ', ';
				}
				.info span:last-child::after {
					content: '.';
				}
			`}</style>
		</Layout>
	);
}

// export default function EventPage() {
// 	const router = useRouter();
// 	return (
// 		<div>
// 			<p>{router.query.slug}</p>
// 		</div>
// 	);
// }
