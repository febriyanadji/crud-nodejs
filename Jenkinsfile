pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                script {
                    docker.build "belajar:$BUILD_NUMBER"
                }
            }
        }
    }
}