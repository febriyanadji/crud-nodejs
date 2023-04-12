pipeline {
    agent any
    stages {
        stage('build') {
            script {
                docker.build "belajar:$BUILD_NUMBER"
            }
        }
    }
}