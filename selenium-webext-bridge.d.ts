declare module "selenium-webext-bridge" {
	import http from "http";
	import type { WebDriver } from "selenium-webdriver";

	export class TestResults {
		pass(testName: string): void;
		fail(testName: string, reason: string): void;
		error(testName: string, error: unknown): void;
		summary(): void;
		exitCode(): 0 | 1;
	}

	export interface TestWebDriver extends WebDriver {
		installAddon(path: string, temporary?: boolean): Promise<string>;
		uninstallAddon(id: string): Promise<void>;
	}

	export class TestBridge {
		driver: any;
		ready: boolean;

		constructor(driver: any);

		init(): Promise<void>;
		ensureReady(): Promise<void>;
		ping(): Promise<any>;
		reset(): Promise<void>;
		captureScreenshot(format?: string): Promise<any>;
		getExtensionUrl(extensionId: string): Promise<string | null>;
		getExtensionUrlByName(name: string): Promise<string | null>;
		clickBrowserAction(extensionId: string): Promise<void>;
		clickPageAction(extensionId: string): Promise<void>;
		sendToExtension(targetExtensionId: string, payload: any): Promise<any>;
		getTabs(): Promise<any[]>;
		getTabById(tabId: number | string): Promise<any>;
		getActiveTab(): Promise<any>;
		getTabGroups(): Promise<any[]>;
		createTab(url: string, active?: boolean): Promise<any>;
		closeTab(tabId: number | string): Promise<any>;
		closeOtherTabsAndWindows(): Promise<void>;
		updateTab(
			tabId: number | string,
			props: Record<string, any>,
		): Promise<any>;
		reloadTab(tabId: number | string): Promise<any>;
		moveTab(tabId: number | string, index: number): Promise<any>;
		moveTabToWindow(
			tabId: number | string,
			windowId: number | string,
			index?: number,
		): Promise<any>;
		pinTab(tabId: number | string): Promise<any>;
		unpinTab(tabId: number | string): Promise<any>;
		muteTab(tabId: number | string): Promise<any>;
		unmuteTab(tabId: number | string): Promise<any>;
		groupTabs(
			tabIds: (number | string)[],
			title: string,
			color?: string,
			groupId?: number | string | null,
		): Promise<any>;
		ungroupTabs(tabIds: (number | string)[]): Promise<any>;
		executeInTab(tabId: number | string, code: string): Promise<any>;
		getTabEvents(clear?: boolean): Promise<any[]>;
		waitForTabCount(
			expectedCount: number,
			timeout?: number,
		): Promise<boolean>;
		waitForTabUrl(pattern: string, timeout?: number): Promise<any | null>;
		waitForTabEvent(
			eventType: string,
			timeout?: number,
		): Promise<any | null>;
		waitForTabLoad(
			tabId: number | string,
			timeout?: number,
		): Promise<any | null>;
		getWindows(): Promise<any[]>;
		createWindow(url: string, options?: Record<string, any>): Promise<any>;
		closeWindow(windowId: number | string): Promise<any>;
		getWindowById(windowId: number | string): Promise<any>;
		updateWindow(
			windowId: number | string,
			props: Record<string, any>,
		): Promise<any>;
		getWindowEvents(clear?: boolean): Promise<any[]>;
		waitForWindowCount(
			expectedCount: number,
			timeout?: number,
		): Promise<boolean>;
	}

	export type TestBrowser = { driver: TestWebDriver; testBridge: TestBridge };

	export function launchBrowser(options: {
		extensions?: string[];
		BridgeClass?: typeof TestBridge;
		headless?: boolean;
		waitForInit?: number;
		preferences?: Record<string, string | number | boolean>;
		firefoxArgs?: string[];
	}): Promise<TestBrowser>;

	export function createTestServer(options: {
		port?: number;
		host?: string;
	}): Promise<http.Server>;

	export function cleanupBrowser(browser: TestBrowser | null): Promise<void>;

	export function sleep(ms: number): Promise<void>;
}
