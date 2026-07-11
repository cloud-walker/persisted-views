import { describe, expect, it } from "vitest";
import {
	createView,
	deleteView,
	getView,
	getViews,
	updateView,
	ViewApiError,
} from "./index";

describe("view service", () => {
	it("only one view can be default per scope on create", async () => {
		const a = await createView({ name: "A", scope: "s1", isDefault: true });
		const b = await createView({ name: "B", scope: "s1", isDefault: true });

		const list = await getViews("s1");
		expect(list.filter((v) => v.isDefault)).toEqual([
			{ ...b, isDefault: true },
		]);
		expect(list.find((v) => v.id === a.id)?.isDefault).toBe(false);
	});

	it("only one view can be default per scope on update", async () => {
		const a = await createView({ name: "A", scope: "s2", isDefault: true });
		const b = await createView({ name: "B", scope: "s2" });

		await updateView(b.id, { isDefault: true });

		const list = await getViews("s2");
		expect(list.find((v) => v.id === a.id)?.isDefault).toBe(false);
		expect(list.find((v) => v.id === b.id)?.isDefault).toBe(true);
	});

	it("does not affect defaults in other scopes", async () => {
		const a = await createView({ name: "A", scope: "s3", isDefault: true });
		await createView({ name: "B", scope: "s4", isDefault: true });

		const list = await getViews("s3");
		expect(list.find((v) => v.id === a.id)?.isDefault).toBe(true);
	});

	it("getViews without scope returns everything", async () => {
		await createView({ name: "A", scope: "s5" });
		await createView({ name: "B", scope: "s6" });

		const list = await getViews();
		expect(list.length).toBeGreaterThanOrEqual(2);
	});

	it("generates id server-side and defaults version/definition/isDefault", async () => {
		const view = await createView({ name: "A", scope: "s7" });
		expect(view.id).toBeTruthy();
		expect(view.version).toBe(1);
		expect(view.definition).toEqual({});
		expect(view.isDefault).toBe(false);
	});

	it("uses client-provided version when given", async () => {
		const view = await createView({ name: "A", scope: "s8", version: 42 });
		expect(view.version).toBe(42);
	});

	it("getView throws 404 for missing id", async () => {
		await expect(getView("missing")).rejects.toMatchObject({
			status: 404,
		});
		await expect(getView("missing")).rejects.toBeInstanceOf(ViewApiError);
	});

	it("createView throws 400 for missing name or scope", async () => {
		await expect(createView({ name: "", scope: "s9" })).rejects.toMatchObject({
			status: 400,
		});
		await expect(createView({ name: "A", scope: "" })).rejects.toMatchObject({
			status: 400,
		});
	});

	it("deleteView removes the view", async () => {
		const view = await createView({ name: "A", scope: "s10" });
		await deleteView(view.id);
		await expect(getView(view.id)).rejects.toMatchObject({ status: 404 });
	});

	it("client cannot mutate store state by reference", async () => {
		const view = await createView({
			name: "A",
			scope: "s11",
			definition: { foo: "bar" },
		});
		view.definition.foo = "mutated";

		const fetched = await getView(view.id);
		expect(fetched.definition.foo).toBe("bar");
	});
});
