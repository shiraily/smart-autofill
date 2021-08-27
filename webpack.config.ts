import { Configuration } from "webpack";
import path from "path";
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
  mode: "development",
  entry: {
    content_scripts: path.join(__dirname, 'src', 'content_scripts.ts')
  },
  output: {
    // distディレクトリにcontent_scripts.jsを吐く
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {  
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    // publicディレクトリにあるファイルをdistディレクトリにコピーする
    new CopyPlugin(
      {
        patterns: [{
          from: "public", to: '.' },
        ],
      }
    )
  ]
};

export default config;
