import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostList } from './features/posts/PostList'
import { AddPost } from './features/posts/AddPost'
import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPost />
                <PostList />
              </>
            }
          />
          {/* <Route path="/posts/:postId" element={SinglePostPage} /> */}
          <Route path="/posts/:postId" element={<SinglePostPage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
