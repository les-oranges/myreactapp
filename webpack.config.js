// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
// path是node.js中提供的处理文件路径的小工具。 (http://www.runoob.com/nodejs/nodejs-path-module.html)
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    // 项目入口，webpack从此处开始构建
    entry: {
        main: path.join(__dirname, 'src/main.js'), // 指定入口，可以指定多个。参考webpack文档
    },
    // 出口文件
    output: {
        // path: path.join(__dirname, "dist"), // bundle生成(emit)到哪里
        // filename: "bundle.js", // bundle生成文件的名称

        path: path.join(__dirname, "dist"),
	    publicPath: '/',
	    filename: "js/[name]-[hash]" + ".js",
	    chunkFilename: "js/[name]-[hash]" + ".js",
    },
    // 服务器
    devServer: {
    	// contentBase: './dist'
    	// contentBase: path.join(__dirname, ""),
	    contentBase: false, //since we use CopyWebpackPlugin.
	    clientLogLevel: 'warning',
	    publicPath: '/',
	    hot: true,
	    progress: true,
	    overlay: { warnings: false, errors: true },
	    historyApiFallback: {
	        rewrites: [
	            { from: /.*/, to: path.posix.join('/', 'index.html') },
	        ],
	    },
	    // historyApiFallback: true,
	    // quiet: true, // necessary for FriendlyErrorsPlugin
	    compress: true,
	    inline: true,
	    port: 8083,
	    host: 'http://localhost',
	    watchOptions: {
	        poll: false,
	    }
    },
    module: {
    	rules: [
    		{
    			test: /\.(js|jsx)$/,
    			exclude: /node_modules/,
    			enforce: 'pre',
    			use: [
    				{
    					loader: 'babel-loader',
    					query: {
    						presets: ['env', 'react']
    					}
    				},
    				loader: 'eslin-loader',
    				options: {
    					formatter: require('esline-friendly-formatter'),
    					emitWarning: false
    				}
    			]
    		},
    		{
    			test: /\.(css|less)$/,
				exclude: /node_modules/,
				include: /src/,
				use: [
				    {loader: "style-loader"},
				    {
				        loader: 'css-loader',
				        options: {
				            minimize: process.env.NODE_ENV === 'production',
				            importLoaders: 2,
				            localIdentName: '[name]-[local]-[hash:base64:5]',
				            modules:true
				        }
				    }, 
				    {
				        loader: 'postcss-loader',
				        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
				            plugins: (loader) => [
				                require('autoprefixer')(), //CSS浏览器兼容
				            ]
				        }
				    },
				    {
				        loader: 'less-loader',
				        options: {
				            javascriptEnabled: true,
				        }
				    }
			    ]
    		},
    		{
			    test: /\.less$/,
			    exclude: /node_modules/,
			    include: /src/,
			    // loader:['style-loader','css-loader']
			    use: ExtractTextWebapckPlugin.extract({
			        fallback:'style-loader',
			        use: [
			            {
			                loader: 'css-loader',
			                options: {
			                    minimize: process.env.NODE_ENV === 'production',
			                    importLoaders: 2,
			                    localIdentName: '[name]-[local]-[hash:base64:5]',
			                    modules:true
			                }
			            }, {
			                loader: 'postcss-loader',
			                options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
			                    plugins: (loader) => [
			                        require('autoprefixer')(), //CSS浏览器兼容
			                    ]
			                }
			            },{
			                loader: 'less-loader',
			                options: {
			                    javascriptEnabled: true,
			                }
			            }],
			        }
			    )
			},
			{
			    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			    loader: 'url-loader',
			    options: {
			        limit: 10000,
			        name: 'static/img/[name].[hash:7].[ext]'
			    }
			},
			{
			    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			    loader: 'url-loader',
			    options: {
			        limit: 10000,
			        name: 'static/media/[name].[hash:7].[ext]'
			    }
			},
			{
			    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			    loader: 'url-loader',
			    options: {
			        limit: 10000,
			        name: 'static/fonts/[name].[hash:7].[ext]'
			    }
			},
    	]
    },
    plugins: [
    	// plugins 下新增
		new ExtractTextWebapckPlugin({
		    filename: 'css/[name]-[hash].css',
		    // Setting the following option to `false` will not extract CSS from codesplit chunks.
		    // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
		    // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
		    allChunks: true
		}),

		new HtmlWebPackPlugin({
		    template: './src/index.html',
		    minify: {
		        removeComments: true,
		        collapseWhitespace: true,
		        removeAttributeQuotes: true
		        // more options:
		        // https://github.com/kangax/html-minifier#options-quick-reference
		    },
		    filename: 'index.html'
		}),

		// copy custom static assets
		new CopyWebpackPlugin([
		    {
		        from: path.resolve(__dirname, './src/static'),
		        to: 'static',
		        ignore: ['.*']
		    }
		]),
    ]
}


 