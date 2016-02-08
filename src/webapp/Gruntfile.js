module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    livereload: false,
                    open: {
                        target: 'http://localhost:8080'
                    }
                }
            }
        },
        uglify: {
            options: {
               banner: "/*<%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> \n Made by <%= pkg.author %> */\n"
            },
            build: {
                files: {
                    'build/js/app.min.js': 'js/**/*.js'
                }
            }
        },
        sass: {
           dist: {
               files: {
                   'css/style.css': 'scss/**/*.scss'
               }
           }
        },
        cssmin: {
            target: {
                files: {
                    'build/css/style.css': ['css/style.css']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html', 'js/**/*.html'],
                tasks: []
            },
            js: {
                files: ['js/**/*.js'],
                tasks: []
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        }
    });

    //Loading Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');




    //Register Tasks
    grunt.registerTask('default', ['uglify', 'sass', 'cssmin', 'connect', 'watch']);
};