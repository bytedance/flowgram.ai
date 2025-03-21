import { createRoot } from 'react-dom/client';

import { EditorContainer } from './editor-container';

const app = createRoot(document.getElementById('root')!);
app.render(
  <>
    <EditorContainer />
  </>
);
