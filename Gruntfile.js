module.exports = function(grunt) {
   
    grunt.initConfig({
         pkg: grunt.file.readJSON('package.json'),
         uglify: {
            // 这里是uglify任务的配置信息
            options: {
                banner: '/*!create by yaopan <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            static_mappings: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: '.min.js'
                }],
            }
        },
         cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        },

    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify','cssmin']);

};