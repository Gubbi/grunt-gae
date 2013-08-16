/*
 * grunt-gae
 * https://github.com/maciejzasada/grunt-gae
 *
 * Copyright (c) 2013 Maciej Zasada
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        gae: {

            options: {
                application: 'grunt-gae',
                path: 'app/',
                auth: 'gae.auth'
            },

            run_default: {
                action: 'run'
            },

            run_custom: {
                action: 'run',
                options: {
                    path: 'app',
                    args: {
                        port: 8081,
                        host: '0.0.0.0'
                    }
                }
            },

            run_async: {
                action: 'run',
                options: {
                    async: true
                }
            },

            kill: {
                action: 'kill'
            },

            deploy_default: {
                action: 'update'
            },

            deploy_custom: {

            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'gae', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};