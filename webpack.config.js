const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	devtool:
		process.env.NODE_ENV !== "production"
			? "inline-source-map"
			: "hidden-source-map",
	entry: "./src/index.tsx",
	module: {
		rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "index_bundle.js",
		publicPath: "/",
	},
	plugins: [
		new ESLintPlugin({
			context: path.resolve(__dirname, "src"),
			extensions: ["ts", "tsx"],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
		}),
	],
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
