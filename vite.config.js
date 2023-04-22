import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/OpenAI_Article_Summarizer/",
	plugins: [react()],
});
