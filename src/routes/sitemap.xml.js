export async function get() {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	return {
		headers,
		body: `<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
				<loc>https://chromaword.com</loc>
				<changefreq>daily</changefreq>
        		<priority>0.7</priority>
			</url>
			<url>
				<loc>https://chromaword.com/login</loc>
				<changefreq>monthly</changefreq>
			</url>
			<url>
				<loc>https://chromaword.com/signup</loc>
				<changefreq>monthly</changefreq>
			</url>
			<url>
				<loc>https://chromaword.com/instructions</loc>
				<changefreq>monthly</changefreq>
			</url>
		</urlset> `
	};
}
