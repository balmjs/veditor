window.setVEditor({
  HOME_URL: `/veditor/`
});

const loadVEditor = (callback = () => {}) => {
  import('veditor/config');
  import('veditor').then(() => {
    callback(window.UE);
  });
};

export default loadVEditor;
