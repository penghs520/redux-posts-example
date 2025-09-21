import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostList } from './features/posts/PostList'
import { AddPostForm } from './features/posts/AddPostForm'
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
                <AddPostForm />
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
