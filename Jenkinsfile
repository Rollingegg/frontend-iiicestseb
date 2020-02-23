node{
    stage('git clone'){
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], browser: [$class: 'GitLab', repoUrl: 'http://212.129.149.40'], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '3', url: 'http://212.129.149.40/171250507_IIICEStseB/frontend-iiicestseb']]])
        echo '=== git clone end ==='
    }

    stage('yarn build'){
        sh encoding: 'UTF-8', label: '', returnStdout: true, script: '''cd /var/lib/jenkins/workspace/frontend
bash /etc/shell/env.sh
/usr/local/bin/yarn install
/usr/local/bin/yarn build
cd dist
tar -zcvf frontend.tar.gz *
cd ../'''
        echo '=== yarn build end ==='
    }

        stage('depoly'){
        sshPublisher(publishers: [sshPublisherDesc(configName: 'tencent', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd /var/www
rm -rf frontend
mkdir frontend
cp frontend.tar.gz frontend/
cd frontend
pwd
tar -zxvf frontend.tar.gz
rm -rf frontend.tar.gz
rm -rf ../frontend.tar.gz''', execTimeout: 5000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/*.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        echo '=== depoly end ==='
        }

}