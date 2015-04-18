module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        opt: {
            "tsDir": "test",
            "outDir": "test"
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                noImplicitAny: true
            },
            main: {
                src: ['<%= opt.tsDir %>/*.ts'],
                out: '<%= opt.outDir %>/js/Main.js'
            }
        },
        dtsm: {
            main: {
                options: {
                    config: "./conf/dtsm.json"
                }
            }
        }
    });
    
    grunt.registerTask('setup', ['dtsm']);
    grunt.registerTask('default', ['ts']);
    
    /*
    // This feature has not yet been reflected in the NPM.
    // https://github.com/elsassph/createjs-def/pull/8/files?short_path=04c6e90
    
    grunt.registerTask('cjsdef', 'create d.ts file(s) from an output of the Toolkit for CreateJS', function() {
        var config = grunt.config();
        
        module.paths.push('./node_modules');
        var fs = require("fs");
        var createjs = require('createjs-def');
        
        var animation_data = fs.readFileSync(config.opt.outDir + 'assets/shape.js');
        var data = createjs.createDef(animation_data, 'typescript');
        fs.writeFile(config.opt.srcDir + 'shape.d.ts', data);
        
    });
    */
    
    // 
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-dtsm');
};