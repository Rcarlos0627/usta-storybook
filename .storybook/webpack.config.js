module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          options: {
            removeTags: true,
            removingTags: ['title', 'desc'],
            removeSVGTagAttrs: false,
            removingTagAttrs: ['fill']
          }
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [
              {
                loader: 'file-loader',
                query: {
                  name: '[name].[ext]'
                }
              }
            ]
          }
        ]
      }
    };