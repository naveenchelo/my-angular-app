pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
    IMAGE_NAME = "my-angular-app"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Node.js Version') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }


    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test -- --watch=false --browsers=ChromeHeadless || true'
      }
    }

    stage('Build Angular App') {
      steps {
        sh 'npm run build -- --configuration=production'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
        }
      }
    }

    stage('Push Docker Image') {
      when {
        branch 'main'
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} $DOCKER_USER/${IMAGE_NAME}:${IMAGE_TAG}"
            sh "docker push $DOCKER_USER/${IMAGE_NAME}:${IMAGE_TAG}"
          }
        }
      }
    }

    stage('Deploy (Optional)') {
      when {
        branch 'main'
      }
      steps {
        echo "Deploy step - add your deployment scripts here"
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**/*'
      cleanWs()
    }
  }
}
