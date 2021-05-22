// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '@/styles/Home.module.css';
import { createClient } from 'contentful';
import RecipeCard from '@/components/RecipeCard';
import Layout from '@/components/Layout';
export default function Home({ recipes }) {
	console.log(recipes);
	return (
		<Layout>
			<div className="recipe-list">
				{recipes &&
					recipes.map((recipe) => (
						<RecipeCard key={recipe.sys.id} recipe={recipe} />
					))}
				<style jsx>{`
					.recipe-list {
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						gap: 1.5rem;
					}
				`}</style>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const client = createClient({
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
		space: process.env.CONTENTFUL_SPACE_ID,
	});

	const res = await client.getEntries({ content_type: 'recipe' });
	return {
		props: {
			recipes: res.items,
		},
	};
}
