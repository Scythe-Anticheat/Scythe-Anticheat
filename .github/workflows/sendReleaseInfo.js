const eventData = JSON.parse(process.env.GITHUB_EVENT_DATA);

fetch(process.env.RELEASE_WEBHOOK, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		content: `[ <@&900578947371270164> ]\n\n${eventData.repository.html_url}/releases/tag/${eventData.release.tag_name}`,
		embeds: [{
			title: eventData.release.name,
			description: eventData.release.body,
			timestamp: eventData.release.created_at,
			color: 7067
		}]
	})
});