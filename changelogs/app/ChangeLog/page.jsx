import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { RequestInfo } from 'undici-types'



function Changelog() {
    const [posts, setPosts] = useState([])
    const importAllPost = (r) => r.keys().map(r)
    const markdownFiles = importAllPost(require.context('./ChangeLogArchives', false, /\.md$/)).sort().reverse()

    useEffect(() => {
        const getPosts = async () => {
            await Promise.all(
                markdownFiles.map((file) => {
                    return fetch(file).then((res) => res.text())
                })
            )
                .then((res) => setPosts(res))
                .catch((err) => console.error(err))
        }
        getPosts()
    }, [])

    const card = {
        width: '100%',
        margin: '30px auto 80px auto',
        padding: '10px 10px 10px 10px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        minHeight: '200px',
        boxSizing: 'border-box'
    }

    return (
        <>
            <div>
                {posts.map((post, idx) => (
                    <div style={card} key={idx}>
                        <ReactMarkdown>
                             {post}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Changelog