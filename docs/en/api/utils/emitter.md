# Emitter

Event module

## Usage

```tsx pure
import { Emitter } from '@flowgram.ai/utils'

class Doc {
  private _content = ''
  private _onContentChangeEmitter = new Emitter<string>()
  readonly onContentChange = this._onContentChangeEmitter.event
  setContent(content: string) {
    this._content = content
    this._onContentChangeEmitter.fire(content)
  }
  get content() {
    return this._content
  }
}

function App() {
  const doc1 = useMemo(() => new Doc(), [])
  const [content, updateContent] = useState(doc1.content)
  useEffect(() => {
    const toDispose = doc1.onContentChange((content) => {
      updateContent(content)
    })
    return () => toDispose.dispose()
  }, [doc1])
  return <div>{content}</div>
}


```

## Source Code

https://github.com/bytedance/flowgram.ai/blob/main/packages/common/utils/src/event.ts
