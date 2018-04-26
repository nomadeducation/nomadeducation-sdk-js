const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

const git = new GitRevisionPlugin({
    commithashCommand: "rev-parse --short HEAD"
});

module.exports = {
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            __PROD__: JSON.stringify(false),
            __GATEWAY_URL__: JSON.stringify("http://localhost:3000/v2"),
            __VERSION__: JSON.stringify("dev"),
            __COMMITHASH__: JSON.stringify(git.commithash())
        })
    ]
};
