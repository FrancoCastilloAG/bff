pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "bff-service:${env.BUILD_NUMBER}"
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
        
        stage('Deploy to Testing') {
            steps {
                script {
                    dir("${WORKSPACE}/k8s/bff") {
                        sh "kubectl apply -f deployment-testing.yml --validate=false"
                        sh "kubectl apply -f service-testing.yml --validate=false"
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    dir("${WORKSPACE}/k8s/bff") {
                        sh "kubectl apply -f deployment-production.yaml"
                        sh "kubectl apply -f service-production.yaml"
                    }
                }
            }
        }
    }
}
