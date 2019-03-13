const path = require('path');

const removeWorkspace = async (shipit) => {
  if (shipit.config.shallowClone) {
    shipit.log(`Removing workspace "${shipit.workspace}"`)
    await shipit.local(`rm -rf "${shipit.workspace}"`);
    shipit.log('Workspace removed.');
  }
}

const setUpDeploy = async shipit => {
  shipit.blTask('gs-deploy', async () => {
    const source = path.resolve(shipit.workspace, shipit.config.dirToCopy);
    await shipit.local(`gsutil -m cp -r ${source}/** gs://${shipit.config.gcs.bucket}/`, { cwd: shipit.workspace });
    await removeWorkspace(shipit);
    await shipit.emit('updated')
  });
};

module.exports = setUpDeploy