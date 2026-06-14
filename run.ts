#!/usr/bin/env node

import {
	TestResults,
	cleanupBrowser,
	launchBrowser,
	createTestServer,
} from "selenium-webext-bridge";
import type { TestBrowser } from "selenium-webext-bridge";

async function main() {
	const results = new TestResults();
	const server = await createTestServer({});
	let browser: TestBrowser | null = null;

	try {
		browser = await launchBrowser({
			headless: true,
			firefoxArgs: ["-remote-allow-system-access"],
		});
		const { driver, testBridge: bridge } = browser;
		await driver.get(`http://127.0.0.1:8080/test-${Date.now()}`);
		results.pass(await bridge.ping());
	} catch (error) {
		results.error("Test", error);
	} finally {
		console.log();
		await cleanupBrowser(browser);
		server.close();
	}

	results.summary();
	process.exit(results.exitCode());
}

main().catch((error) => {
	console.error("Fatal error:", error);
	process.exit(1);
});
