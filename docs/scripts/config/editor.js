window.UEDITOR_HOME_URL = `/veditor/`;

const loadVEditor = (callback = () => {}) => {
  import('../../../src/config');
  import('../../../src').then(() => {
    callback(window.UE);
  });
};

export default loadVEditor;
