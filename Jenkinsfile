pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "myrepo/bff:${env.BUILD_NUMBER}"
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }
        stage('Deploy to Testing') {
            steps {
                sh "kubectl apply -f ../k8s/templates/bff/deployment-testing.yaml"
                sh "kubectl apply -f ../k8s/templates/bff/service-testing.yaml"
            }
        }
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh "kubectl apply -f ../k8s/templates/bff/deployment-production.yaml"
                sh "kubectl apply -f ../k8s/templates/bff/service-production.yaml"
            }
        }
    }
}
