<template>
  <div>
    <navbar ref="navbar"></navbar>
    <page ref="page"></page>
  </div>
</template>

<script>
  import Navbar from './BrowserMainView/Navbar';
  import Page from './BrowserMainView/Page';

  export default {
    name: 'browser-main-view',
    components: {
      Page,
      Navbar,
    },
    methods: {
      onLoadCommit(event) {
        // we don't care about subframe document-level loads
        if (event.isMainFrame) {
          // get Navbar by its reference id
          const navbar = this.$refs.navbar;
          // update value of 'inputValue'
          navbar.inputValue = event.url;
        }
      },
      onDidStartLoading() {
        // https://electron.atom.io/docs/api/ipc-renderer/#ipcrenderersendchannel-arg1-arg2-
        this.$electron.ipcRenderer.send('set-title', 'Loading...');
      },
      onDomReady(event) {
        // get the corresponding webview
        const webview = event.target;
        // get Navbar by its reference id
        const navbar = this.$refs.navbar;
        // update values of 'canGoBack' and 'canGoForward'
        navbar.canGoBack = webview.canGoBack();
        navbar.canGoForward = webview.canGoForward();
      },
      onPagetitleUpdated() {
        // https://electron.atom.io/docs/api/ipc-renderer/#ipcrenderersendchannel-arg1-arg2-
        this.$electron.ipcRenderer.send('set-title', event.title);
      },
      onContextMenu(event) {
        const { Menu, MenuItem } = this.$electron.remote;
        const menu = new Menu();

        // get the corresponding webview
        const webview = event.target;
        // get Navbar by its reference id
        const navbar = this.$refs.navbar;

        const params = event.params;

        // add the 'Backward' menu item
        menu.append(new MenuItem({
          label: 'Backward',
          click: () => {
            this.onClickBack();
          },
          enabled: navbar.canGoBack,
        }));
        // add the 'Forward' menu item
        menu.append(new MenuItem({
          label: 'Forward',
          click: () => {
            this.onClickForward();
          },
          enabled: navbar.canGoForward,
        }));
        // add the 'Reload' menu item
        menu.append(new MenuItem({
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            this.onClickReload();
          },
        }));

        menu.append(new MenuItem({ type: 'separator' }));

        // add the 'Undo' menu item
        if (params.editFlags.canUndo) {
          menu.append(new MenuItem({
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo',
          }));
        }
        // add the 'Redo' menu item
        if (params.editFlags.canRedo) {
          menu.append(new MenuItem({
            label: 'Redo',
            accelerator: 'CmdOrCtrl+Shift+Z',
            role: 'redo',
          }));
        }

        menu.append(new MenuItem({ type: 'separator' }));

        // add the 'Cut' menu item
        if (params.editFlags.canCut) {
          menu.append(new MenuItem({
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut',
          }));
        }
        // add the 'Copy' menu item
        if (params.editFlags.canCopy) {
          menu.append(new MenuItem({
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy',
          }));
        }
        // add the 'Paste' & 'Paste and Match Style' menu item
        if (params.editFlags.canPaste) {
          menu.append(new MenuItem({
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste',
          }));
          menu.append(new MenuItem({
            label: 'Paste and Match Style',
            accelerator: 'CmdOrCtrl+Shift+V',
            role: 'pasteandmatchstyle',
          }));
        }
        // add the 'Select All' menu item
        menu.append(new MenuItem({
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall',
        }));

        menu.append(new MenuItem({ type: 'separator' }));

        // add the 'Inspect Element' menu item
        menu.append(new MenuItem({
          label: 'Inspect Element',
          click: () => {
            webview.inspectElement(params.x, params.y);
          },
        }));

        // popup the context menu
        menu.popup(this.$electron.remote.getCurrentWindow(), { async: true });
      },
      handleSelect(value) {
        // call page's navigateTo method to do the rest
        this.$refs.page.navigateTo(value);
      },
      onClickBack() {
        // get webview <- Page <- BrowserMainView
        const webview = this.$refs.page.$refs.webview;
        // https://electron.atom.io/docs/api/webview-tag/#webviewgoback
        webview.goBack();
      },
      onClickForward() {
        // get webview <- Page <- BrowserMainView
        const webview = this.$refs.page.$refs.webview;
        // https://electron.atom.io/docs/api/webview-tag/#webviewgoforward
        webview.goForward();
      },
      onClickReload() {
        // get webview <- Page <- BrowserMainView
        const webview = this.$refs.page.$refs.webview;
        // https://electron.atom.io/docs/api/webview-tag/#webviewreload
        webview.reload();
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
