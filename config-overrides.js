const rewireMobX = require('react-app-rewire-mobx');
//const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireMobX(config, env);

    if (env === 'production') {
        //console.log("⚡ Production build with uglify and code merging.");

        config.plugins = [
            ...config.plugins,
            new Visualizer()
            
            // new webpack.DefinePlugin({ // <-- key to reducing React's size
            //     'process.env': {
            //         'NODE_ENV': JSON.stringify('production')
            //     }
            // }),
            // new webpack.optimize.DedupePlugin(), //dedupe similar code 
            // new webpack.optimize.UglifyJsPlugin(), //minify everything
            // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
            
            
        ]
    }
    else 
    {
        config.plugins = [
            ...config.plugins,
            new Visualizer()   
        ]
    }

    return config;
}