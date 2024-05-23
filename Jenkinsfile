pipeline {
    agent any
    tools {
        maven 'Maven'
    }
    stages {
        stage('Git checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/HarshMT2023164/SPE_FINAL_PROJECT']])
                // sh 'mvn clean install'
            }
        }
        
        stage('Maven Build') {
            steps {
                dir('./BackendPizza') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dir('./FrontendPizzapp') {
                    sh 'docker build -t salonisoni/frontend-pizzapp-image-saloni .'
                }
                dir('./BackendPizza') {
                    sh 'docker build -t salonisoni/backend-harsh-pizzapp .'
                }
            }
        }
        
        stage('Push Docker image To Docker hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-hub-password-saloni', variable: 'dockerhubPassSaloni')]) {
                        sh 'docker login -u salonisoni -p ${dockerhubPassSaloni}'
                    }
                    sh 'docker push salonisoni/frontend-pizzapp-image-saloni:latest'
                    sh 'docker push salonisoni/backend-pizzapp-c2:latest'
                }
            }
        }
        
        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    // Stop and remove existing containers if they exist
                    sh 'docker rm -f frontend || true'
                    sh 'docker rm -f backend || true'
                    sh 'docker rm -f db || true'
                }
            }
        }
        
        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory.ini'
                    )
                }
            }
        }
    }
}
