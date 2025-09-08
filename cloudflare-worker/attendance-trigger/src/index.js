/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async scheduled(event, env, ctx) {
		let action = null;

		// Match cron schedules (UTC times)
		if (event.cron === "30 2 * * 1-5") {
			action = "signin";   // 08:00 IST
		} else if (event.cron === "30 12 * * 1-5") {
			action = "signout";  // 18:00 IST
		}

		if (!action) {
			console.log("No matching cron:", event.cron);
			return;
		}

		const url = `https://api.github.com/repos/${env.GH_REPO}/actions/workflows/${env.GH_WORKFLOW}/dispatches`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/vnd.github+json",
				"Authorization": `Bearer ${env.GH_TOKEN}`
			},
			body: JSON.stringify({
				ref: env.GH_BRANCH,
				inputs: { action }
			})
		});

		console.log(`Triggered GitHub workflow for action=${action}, status=${response.status}`);
	}
}
