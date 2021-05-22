import Link from 'next/link';
import Image from 'next/image';

const RecipeCard = ({ recipe }) => {
	const { title, slug, cookingTime, thumbnail } = recipe.fields;
	return (
		<div className="card">
			<div className="featured">
				{' '}
				<Image
					src={`https:${thumbnail.fields.file.url}`}
					alt="Picture of the author"
					width={400}
					height={400}
					// width={thumbnail.fields.file.details.image.width}
					// height={thumbnail.fields.file.details.image.height}
				/>
			</div>
			<div className="content">
				<div className="info">
					<h4>{title}</h4>
					<p>Takes about {cookingTime} minutes to make</p>

					{/* <img width="200" src={thumbnail.fields.file?.url} /> */}
				</div>
				<div className="action">
					<Link href={`/recipes/${slug}`}>Go</Link>
					{/* link to details */}
				</div>
			</div>
			<style jsx>
				{`
					.cards {
						transform: rotateZ(-1deg);
					}
					.content {
						background: #fff;
						box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
						margin: 0;
						position: relative;
						top: -40px;
						left: -10px;
					}
					.info {
						padding: 16px;
					}
					.info h4 {
						margin: 4px 0;
					}
					.actions {
						margin-top: 20px;
						display: flex;
						justify-content: flex-end;
					}
					.actions a {
						color: #fff;
						background: #f01b29;
						padding: 16px 24px;
						text-decoration: none;
					}
				`}
			</style>
		</div>
	);
};

export default RecipeCard;
